import mysql.connector
from mysql.connector import Error

def connect_to_db():
    """Establish a connection to the database."""
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