from flask import Flask, request, jsonify
#from whisperAI import transcribe_audio
from scraper import scraper
from db import connect_to_db,create_user,login,add_wishlist,smtp_send, password_reset, fetch_keywords
from flask_cors import CORS
import tempfile
import mysql.connector




app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Allows the app to be ran in debug
if __name__ == '__main__':
	app.run(debug=True)



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

#@app.route('/send_to_transcribe', methods=['POST'])
#def send_to_transcribe():

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
        
        result = add_wishlist(connection, item_user_data)

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
    
