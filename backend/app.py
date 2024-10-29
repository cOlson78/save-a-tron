from flask import Flask, request, jsonify
from whisperAI import transcribe_audio
from scraper import scraper
from flask_cors import CORS
import tempfile



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

@app.route('/send_to_transcribe', methods=['POST'])
def send_to_transcribe():

    audio_file = request.files['audio']
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio:
        audio_file.save(temp_audio.name)
        transcription = transcribe_audio(temp_audio.name)
    
    return jsonify({"transcription": transcription['text']})
