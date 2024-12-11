import mysql.connector
import smtplib
import random
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from mysql.connector import Error
from werkzeug.security import generate_password_hash, check_password_hash



#connect to db
def connect_to_db():
    
    try:
        connection = mysql.connector.connect(
            host='wayne.cs.uwec.edu',  
            user='KRELLJC3490',
            password='L5BGBWPC',
            database='cs485group3'
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error: {e}")
        return None

#insert product
def insert_product(connection, product):
    """Insert product into the database, avoiding duplicates."""
    cursor = connection.cursor()
    try:
        sql = """
        INSERT INTO items (img, title, price, url)
        VALUES (%s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
        img = VALUES(img), price = VALUES(price);
        """
        cursor.execute(sql, (product['img'], product['title'], product['price'], product['url']))
        connection.commit()
    except Error as e:
        print(f"Error inserting product: {e}")
    finally:
        cursor.close()


def create_user(connection, user):
    with connection.cursor() as cursor:
    
        cursor.execute("SELECT * FROM users WHERE email = %s", (user['email'],))
        if cursor.fetchone():
            return "User already exists."

    sql = "INSERT INTO users (email, password_hash) VALUES (%s, %s)"
    with connection.cursor() as cursor:
        try:
            cursor.execute(sql, (user['email'], generate_password_hash(user['password'], method='scrypt',salt_length=16)))
            connection.commit()
        except Error as e:
            print(f"Error inserting user: {e}")
            return "Error inserting user."
    return None  
# sign in
def login(connection, user):
    cursor = connection.cursor()
    
    try:
       
        sql = "SELECT password_hash FROM users WHERE email = %s"
        
        cursor.execute("SELECT password_hash FROM users WHERE email = %s", (user['email'],))
        result = cursor.fetchone()
        

        if result is None:
            return "Login failed."  
        password_hash = result[0]
        
        if check_password_hash(password_hash, user['password']):
            return "Login successful!" 
        else:
            return "Login failed."  

    except Error as e:
        print(f"Error signing in user: {e}")
        return "Login failed." 
    
    finally:
        cursor.close()  


def add_wishlist(connection, item_user_data):
    cursor = connection.cursor()
    
    
    user_email = item_user_data['userEmail']
    product_url = item_user_data['productUrl']

   
    sql_user = """SELECT user_id FROM users WHERE email = %s;"""

   
    sql_item = """SELECT item_id FROM items WHERE url = %s;"""

    
    sql_insert = """INSERT INTO wishlist (user_id, item_id) VALUES (%s, %s);"""

    try:
      
        cursor.execute(sql_user, (user_email,))
        user_id_result = cursor.fetchone()  
        
       
        if user_id_result is None:
            raise ValueError("User not found with the provided email.")

        user_id = user_id_result[0]  

        
        cursor.execute(sql_item, (product_url,))
        item_id_result = cursor.fetchone() 
        
        if item_id_result is None:
            raise ValueError("Item not found with the provided URL.")

        item_id = item_id_result[0]  
        cursor.execute(sql_insert, (user_id, item_id))

       
        connection.commit()

        

    except mysql.connector.Error as err:
      
        connection.rollback()
        print(f"Error: {err}")

    except ValueError as ve:
        print(f"ValueError: {ve}")

    finally:
    
        cursor.close()
    
def password_reset(connection,email,unhashed_password):

    cursor = connection.cursor()
    
   
    
    hashed_password = generate_password_hash(unhashed_password, method='scrypt', salt_length=16)
    print(hashed_password)
    sql = """UPDATE users SET password_hash = %s WHERE email = %s"""
    
    try:
       
        cursor.execute(sql, (hashed_password, email))
        
      
        connection.commit()
        
        print("Password reset successful.")
        
    except Exception as e:
       
        connection.rollback()
        print(f"An error occurred: {e}")
    
    finally:
        
        cursor.close()
    #todo 
def smtp_send(email):

    sender_email = "saveatron@gmail.com" 
    sender_password = "lkzm iztk fksd ythv"  
    smtp_server = "smtp.gmail.com"  
    smtp_port = 587  
    

    recipient_email = email
    subject = "Password Reset Request"
    reset_link = f"http://localhost:3000/reset?token=key&email={recipient_email}"  

    body = f"""
    <html>
    <body>
        <p>Hello,</p>
        <p>You have requested to reset your password. Click the link below to reset your password:</p>
        <a href="{reset_link}">Reset your password</a>
        <p>If you didn't request this, please ignore this email.</p>
    </body>
    </html>
    """


    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'html'))

    try:
    
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()  
            server.login(sender_email, sender_password)  
            server.sendmail(sender_email, recipient_email, msg.as_string())  
            print(f"Password reset email sent to {recipient_email}")
    
    except Exception as e:
        print(f"Failed to send email: {e}")
    
    

def cache_search(connection, key_word):
    cursor = connection.cursor()
   
    sql = """SELECT * FROM items WHERE title LIKE %s;"""
  
    cursor.execute(sql, ('%' + key_word + '%',)) 
    
    rows = cursor.fetchall()

    results = []
    brands = set()  # Using a set to avoid duplicates
    
    for row in rows:
        # Extract brand from the title (assuming it's the first word)
        brand = row[2].split()[0]  # Assuming title is at index 2
        
        # Add brand to the set of brands
        brands.add(brand)
        
        result_item = {
            "img": row[1],   
            "title": row[2],  
            "price": row[3],  
            "url": row[4]     
        }
     
        results.append(result_item)

    cursor.close()

    # Now format the output in the requested way: append the brands list as a separate entry
    results.append(list(brands))  # Append the list of brands
    
    return results

def cache_query(connection, query):
    cursor = connection.cursor()
    sql = """SELECT * FROM items WHERE title LIKE %s;"""
    
  
    cursor.execute(sql, ('%' + query + '%',))

    
    results = cursor.fetchall()
    
    return len(results) > 0

def fetch_keywords(connection, term):
    """Fetch up to 10 keywords from the database."""
    cursor = connection.cursor()
    try:
        # SQL query to fetch 10 keywords
        sql = """SELECT keyword FROM keyword WHERE keyword LIKE %s LIMIT 10;"""
        cursor.execute(sql, (term + '%',))
        results = cursor.fetchall()
        # Return keywords as a list
        return [row[0] for row in results]
    except Error as e:
        print(f"Error fetching sample keywords: {e}")
        return []
    finally:
        cursor.close()

def brand_search(connection, item):
    cursor = connection.cursor()
    try:
        # Using SUBSTRING_INDEX to get the first word from the title
        sql = """SELECT SUBSTRING_INDEX(title, ' ', 1) FROM items """
        cursor.execute(sql, (item,))  # Using parameterized query to prevent SQL injection
        result = cursor.fetchall()  # Fetch all rows that match the query
    except Exception as e:
        print(f"Error: {e}")
        result = None
    finally:
        cursor.close()  # Always close the cursor
    return result

def remove_wishlist(connection, item_user_data):
    
    cursor = connection.cursor()
    
    user_email = item_user_data['userEmail']
    product_url = item_user_data['productUrl']

    # SQL queries to get the user_id and item_id based on email and URL
    sql_user = """SELECT user_id FROM users WHERE email = %s;"""
    sql_item = """SELECT item_id FROM items WHERE url = %s;"""

    # SQL query to remove the item from the wishlist
    sql_delete = """DELETE FROM wishlist WHERE user_id = %s AND item_id = %s;"""

    try:
        # Get user_id using user_email
        cursor.execute(sql_user, (user_email,))
        user_id_result = cursor.fetchone()  

        if user_id_result is None:
            raise ValueError("User not found with the provided email.")

        user_id = user_id_result[0]  # Extract user_id from the result

        # Get item_id using product_url
        cursor.execute(sql_item, (product_url,))
        item_id_result = cursor.fetchone() 

        if item_id_result is None:
            raise ValueError("Item not found with the provided URL.")

        item_id = item_id_result[0]  # Extract item_id from the result

        # Remove the item from the wishlist
        cursor.execute(sql_delete, (user_id, item_id))

        # Commit the transaction to save changes
        connection.commit()

    except mysql.connector.Error as err:
        connection.rollback()  # Rollback in case of an error
        print(f"Error: {err}")

    except ValueError as ve:
        print(f"ValueError: {ve}")

    finally:
        cursor.close()  # Always close the cursor to free resources

def change_username(connection,user_email, new_username):

       # Create a cursor object
    cursor = connection.cursor()

    # SQL query with placeholders for user_email and new_username
    sql = """UPDATE users SET email = %s WHERE email = %s;"""
    
    # Execute the query with the new username and user email as parameters
    cursor.execute(sql, (new_username, user_email))

    # Commit the transaction to apply changes
    connection.commit()

    # Close the cursor
    cursor.close()