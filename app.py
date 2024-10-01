from flask import Flask
from flask import Flask
from scraper import scraper

app = Flask(__name__)


@app.route("/")
def result():
  query = "mirror" 
  #request.form.get('query')
  #for when frontend is set up

  result = scraper(query)
  return result