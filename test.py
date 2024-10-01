from flask import Flask, render_template, request
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        url = request.form["url"]
        try:
            response = requests.get(url)
            response.raise_for_status()  
            soup = BeautifulSoup(response.content, "html.parser")

            
            title = soup.title.string

            return render_template("index.html", title=title, url=url)
        except requests.exceptions.RequestException as e:
            return render_template("index.html", error=str(e))

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)