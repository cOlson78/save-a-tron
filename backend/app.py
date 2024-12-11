from flask import Flask, request, jsonify
#from whisperAI import transcribe_audio
from scraper import scraper
from best_buy import scraper_bestbuy
from db import connect_to_db,create_user,login,add_wishlist,smtp_send, password_reset, fetch_keywords,remove_wishlist,change_username
from flask_cors import CORS
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import tempfile
import mysql.connector




app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Allows the app to be ran in debug
if __name__ == '__main__':
	app.run(debug=True)


# Searching with best buy
@app.route('/search_bestbuy')
def search_bestbuy():
    query = request.args.get('query')
    dept = request.args.get('dept')

    results = scraper_bestbuy(query,dept)
    return jsonify(results)

# Normal scaper (amazon)
@app.route('/search')
def search():
   query = request.args.get('query')
   dept = request.args.get('dept')
  
   results = scraper(query,dept)
   return jsonify(results)

@app.route('/returning_result')
def returning_result():
   query = request.args.get('query')
   return "You searched for " + str(query)

@app.route('/send_to_transcribe', methods=['POST'])
def send_to_transcribe():

   audio_file = request.files['audio']
   with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio:
      audio_file.save(temp_audio.name)
      transcription = transcribe_audio(temp_audio.name)
    
   return jsonify({"transcription": transcription['text']})

@app.route('/create', methods=['POST'])
def handle_create_account():
    
    connection = connect_to_db()
    if connection is None:
        return jsonify({'error': 'Database connection failed'}), 500

    user_data = request.json
    result = create_user(connection, user_data)
    
    connection.close()
    
    if result == "User already exists.":
        return jsonify({'error': result}), 400
    return jsonify({'message': 'Account created successfully!'}), 201

@app.route('/login',methods=['POST'])
def handle_login(): 
    
    connection = connect_to_db()

    if connection is None:
        return jsonify({'error': 'Database connection failed'}),500
    
    user_data = request.json 
    result = login(connection, user_data)

    connection.close()

    if result == "Login failed.":
        return jsonify({'error': result}),400
    return jsonify({'message':'Login succesful!'}),201

@app.route('/',methods=['POST'])
def handle_wishlist():
    
   
    connection = connect_to_db()

    
    if connection is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
       
        item_user_data = request.json
        print(item_user_data)
        result = add_wishlist(connection, item_user_data)
        print(result)
        if result == "Fail":
            return jsonify({'error': 'Failed to add item to wishlist'}), 400

        return jsonify({'message': 'Added to wishlist'}), 201

    finally:

        if connection:
            connection.close()

@app.route('/wishlist', methods=['GET'])
def get_wishlist():
  
    user_email = request.args.get('email')
    
    if not user_email:
        return jsonify({'error': 'User email is required'}), 400
    
    connection = connect_to_db()
    
    if connection is None:
        return jsonify({'error': 'Database connection failed'}), 500

    try:
        cursor = connection.cursor()
        
  
        sql_user = """SELECT user_id FROM users WHERE email = %s"""
        cursor.execute(sql_user, (user_email,))
        user_id_result = cursor.fetchone()

        if not user_id_result:
            return jsonify({'error': 'User not found'}), 404

        user_id = user_id_result[0]
        
        sql_items = """
              SELECT items.img, items.title, items.price, items.url
                FROM items
                JOIN wishlist ON items.item_id = wishlist.item_id
                WHERE wishlist.user_id = %s
        """
        cursor.execute(sql_items, (user_id,))
        wishlist_items = cursor.fetchall()
        
        if not wishlist_items:
            return jsonify({'message': 'No items in wishlist'}), 404

   
        items = [
            {
                
                'img': item[0],
                'title': item[1],
                'price': item[2],
                'url': item[3]
            }
            for item in wishlist_items
        ]
        
        return jsonify(items)

    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    
    finally:
        cursor.close()
        connection.close()

@app.route('/forgot',methods = ['POST'])
def handle_forgot():
    
    email = request.json.get('email')
    
    if not email:
        return {"error": "Email is required"}, 400

   
    smtp_send(email)
    
    return {"message": "Password reset instructions sent"}, 200

@app.route('/reset', methods = ['POST'])
def handle_reset():
    connection = connect_to_db()
    data = request.json
    email = data.get('email')
    password = data.get('password')
    print(email)
    print(password)
    password_reset(connection, email, password)

    connection.close()

    return{"message": "Password was reset"}, 200

@app.route('/suggest', methods=['GET'])
def get_keywords():
    term = request.args.get('term')  # Get query parameter
    connection = connect_to_db()
    if connection:
        keywords = fetch_keywords(connection, term)
        connection.close()
        return jsonify(keywords)
    else:
        return jsonify([]), 500
    
@app.route('/wishlist', methods=['POST'])
def handel_remove():
       
    connection = connect_to_db()

    
    if connection is None:
        return jsonify({'error': 'Database connection failed'}), 500
    
    try:
       
        item_user_data = request.json
        
        result = remove_wishlist(connection, item_user_data)

        if result == "Fail":
            return jsonify({'error': 'Failed to remove item to wishlist'}), 400

        return jsonify({'message': 'Removed from wishlist'}), 201

    finally:

        if connection:
            connection.close()
@app.route('/feedback',methods=['POST'])
def send_email():
    SENDER_EMAIL = "saveatron@gmail.com" 
    SENDER_PASSWORD = "lkzm iztk fksd ythv"  
    SMTP_SERVER = "smtp.gmail.com"  
    SMTP_PORT = 587  
   
    data = request.get_json()

    # Extract form data from the request
    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')

    

    body = f"""
    <html>
    <body>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Message:</strong><br>{message}</p>
        
    </body>
    </html>
    """

    # Setting up the MIME message
    msg = MIMEMultipart()
    msg['From'] = SENDER_EMAIL
    msg['To'] = "saveatron@gmail.com"  # Sending email to save-a-tron
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'html'))
    print(email,subject,message)
    try:
        # Connect to the Gmail SMTP server and send the email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Start TLS encryption
            server.login(SENDER_EMAIL, SENDER_PASSWORD)  # Login with your email credentials
            server.sendmail(SENDER_EMAIL, "saveatron@gmail.com", msg.as_string())  # Send email
        return jsonify({"success": True, "message": "Email sent successfully!"})
    except Exception as e:
        return jsonify({"success": False, "message": f"Failed to send email: {str(e)}"}), 500
    
@app.route('/profile',methods=['PUT'])
def change_username_handle():
# Connect to the database
    connection = connect_to_db()
    if connection is None:
        return jsonify({'error': 'Database connection failed'}), 500

    # Get the JSON data from the request
    user_data = request.json
    user_email = user_data.get('email')
    new_username = user_data.get('newUsername')

    if not user_email or not new_username:
        return jsonify({'error': 'Email and new username are required'}), 400

    # Call the change_username function to update the username
    result = change_username(connection, user_email, new_username)
    
    # Close the database connection
    connection.close()
    
    # Return response based on the result
    if result == "User already exists.":
        return jsonify({'error': result}), 400
    return jsonify({'message': result}), 200