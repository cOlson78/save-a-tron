from flask import Flask, request, jsonify
from scraper import scraper
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import User

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

app.config['SQLALCHEMY_DATABASE_URI'] = (
    'mysql+pymysql://krelljc3490:L5BGBWPC@wayne.cs.uwec.edu:3306/CS485group3'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

new_user = User(username='johndoe', email='johndoe@example.com')
db.session.add(new_user)
db.session.commit()

@app.route('/search')
def search():
   query = request.args.get('query')
   dept = request.args.get('dept')
  
   results = scraper(query,dept)
   return jsonify(results)
