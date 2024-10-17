from flask import Flask, request, jsonify
from scraper import scraper

from flask_cors import CORS



app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/search')
def search():
   query = request.args.get('query')
  
   results = scraper(query)
   return jsonify(results)
