# Import flask and datetime module for showing date and time
from flask import Flask
import datetime

# Store the date in a variable
x = datetime.datetime.now()

# Initialize the Flask APP
app = Flask(__name__)

# Route for seeing the data, acting as an API call
@app.route('/data')
def get_time():

	# Return the specified data to the frontend
	return {
		'flaskConnected':"If you see this message on react, the connection works", 
		"Date":x, 
		}

	
# Run the app
if __name__ == '__main__':
	app.run(debug=True)