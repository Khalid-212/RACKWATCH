from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # This will enable CORS for the entire app

@app.route("/hello")
def hello():
    return "Hello World!"

@app.route("/records")
def records():
    ls = [{'timestamp': '2023-10-01 07:22:00', 'ping': 3000.34, 'response': 200},{'timestamp': '2023-10-01 07:23:00', 'ping': 4000.34, 'response': 200},{'timestamp': '2023-10-01 07:24:00', 'ping': 1000.34, 'response': 200}]
    return ls

if __name__ == "__main__":
    app.run(debug=True)