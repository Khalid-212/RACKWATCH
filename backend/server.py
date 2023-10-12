from flask import Flask
from flask_cors import CORS
import json
app = Flask(__name__)
CORS(app)  # This will enable CORS for the entire app

@app.route("/hello")
def hello():
    return "Hello World!"

fl = open('backend/data.json','r')
json_data = json.load(fl)

@app.route("/records")
def records():
    return json_data['data']

@app.route("/data")
def data():
    f = open('data.json')
    data = json.load(f)
    return data


if __name__ == "__main__":
    app.run(debug=True)