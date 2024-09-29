from flask import Flask
from flask import Flask
from scraper import scraper

app = Flask(__name__)


@app.route("/")
def result():
  query = "iphone" 
  #request.form.get('query')
  #for when frontend is set up

  result = scraper(query)
  return result