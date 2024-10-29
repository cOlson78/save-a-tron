# Import flask and datetime module for showing date and time
from flask import Flask
import datetime
import whisper
import os

# Store the date in a variable
x = datetime.datetime.now()

# Get the file path
mypath = os.path.abspath(__file__)
mydir = os.path.dirname(mypath)
audioFile = os.path.join(mydir, "Recording.webm")

# Loads in whisper audio to be transcribed
model = whisper.load_model("tiny.en")
result = whisper.transcribe(model=model, audio=audioFile)
print(result["text"])

# Initialize the Flask APP
app = Flask(__name__)

# Route for seeing the data, acting as an API call
@app.route('/data')
def get_time():

	# Return the specified data to the frontend
	return {
		'flaskConnected': result["text"], 
		"Date":x, 
	}
	
# Run the app
if __name__ == '__main__':
	app.run(debug=True)