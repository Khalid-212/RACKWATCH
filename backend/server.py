from flask import Flask
from flask_cors import CORS
import json
app = Flask(__name__)
CORS(app)  # This will enable CORS for the entire app

@app.route("/hello")
def hello():
    return "Hello World!"

@app.route("/records")
def records():
    ls = [{
        "ping": 5312,
        "response": 200,
        "timestamp": "2023-10-01 07:20:00"
    },
    {
        "ping": 416,
        "response": 200,
        "timestamp": "2023-10-01 07:25:00"
    },
    {
        "ping": 6326,
        "response": 200,
        "timestamp": "2023-10-01 07:30:00"
    },
    {
        "ping": 342,
        "response": 200,
        "timestamp": "2023-10-01 07:35:00"
    },
    {
        "ping": 8492,
        "response": 200,
        "timestamp": "2023-10-01 07:40:00"
    },
    {
        "ping": 620,
        "response": 200,
        "timestamp": "2023-10-01 07:45:00"
    },
    {
        "ping": 4334,
        "response": 200,
        "timestamp": "2023-10-01 07:50:00"
    },
    {
        "ping": 4747,
        "response": 200,
        "timestamp": "2023-10-01 07:55:00"
    },
    {
        "ping": 5200,
        "response": 200,
        "timestamp": "2023-10-01 07:60:00"
    },
    {
        "ping": 314,
        "response": 200,
        "timestamp": "2023-10-01 08:00:00"
    },
    {
        "ping": 777,
        "response": 200,
        "timestamp": "2023-10-01 08:05:00"
    },
    {
        "ping": 4832,
        "response": 200,
        "timestamp": "2023-10-01 08:10:00"
    },
    {
        "ping": 529,
        "response": 200,
        "timestamp": "2023-10-01 08:15:00"
    },
    {
        "ping": 373,
        "response": 200,
        "timestamp": "2023-10-01 08:20:00"
    },
    {
        "ping": 216,
        "response": 200,
        "timestamp": "2023-10-01 08:25:00"
    },
    {
        "ping": 365,
        "response": 200,
        "timestamp": "2023-10-01 08:30:00"
    },
    {
        "ping": 318,
        "response": 200,
        "timestamp": "2023-10-01 08:35:00"
    },
    {
        "ping": 556,
        "response": 200,
        "timestamp": "2023-10-01 08:40:00"
    },
    {
        "ping": 6406,
        "response": 200,
        "timestamp": "2023-10-01 08:45:00"
    },
    {
        "ping": 1995,
        "response": 200,
        "timestamp": "2023-10-01 08:50:00"
    },
    {
        "ping": 2231,
        "response": 200,
        "timestamp": "2023-10-01 08:55:00"
    },
    {
        "ping": 542,
        "response": 200,
        "timestamp": "2023-10-01 08:60:00"
    },
    {
        "ping": 389,
        "response": 200,
        "timestamp": "2023-10-01 09:00:00"
    },
    {
        "ping": 395,
        "response": 200,
        "timestamp": "2023-10-01 09:05:00"
    },
    {
        "ping": 6330,
        "response": 200,
        "timestamp": "2023-10-01 09:10:00"
    },
    {
        "ping": 329,
        "response": 200,
        "timestamp": "2023-10-01 09:15:00"
    },
    {
        "ping": 329,
        "response": 200,
        "timestamp": "2023-10-01 09:20:00"
    },
    {
        "ping": 2210,
        "response": 200,
        "timestamp": "2023-10-01 09:25:00"
    },
    {
        "ping": 5053,
        "response": 200,
        "timestamp": "2023-10-01 09:30:00"
    },
    {
        "ping": 5677,
        "response": 200,
        "timestamp": "2023-10-01 09:35:00"
    },
    {
        "ping": 986,
        "response": 200,
        "timestamp": "2023-10-01 09:40:00"
    },
    {
        "ping": 260,
        "response": 200,
        "timestamp": "2023-10-01 09:45:00"
    },
    {
        "ping": 324,
        "response": 200,
        "timestamp": "2023-10-01 09:50:00"
    },
    {
        "ping": 449,
        "response": 200,
        "timestamp": "2023-10-01 09:55:00"
    },
    {
        "ping": 4146,
        "response": 200,
        "timestamp": "2023-10-01 09:60:00"
    },
    {
        "ping": 372,
        "response": 200,
        "timestamp": "2023-10-01 10:00:00"
    },
    {
        "ping": 418,
        "response": 200,
        "timestamp": "2023-10-01 10:05:00"
    },
    {
        "ping": 3138,
        "response": 200,
        "timestamp": "2023-10-01 10:10:00"
    },
    {
        "ping": 448,
        "response": 200,
        "timestamp": "2023-10-01 10:15:00"
    },
    {
        "ping": 4904,
        "response": 200,
        "timestamp": "2023-10-01 10:20:00"
    },
    {
        "ping": 305,
        "response": 200,
        "timestamp": "2023-10-01 10:25:00"
    },
    {
        "ping": 213,
        "response": 200,
        "timestamp": "2023-10-01 10:30:00"
    }]
    return ls

@app.route("/data")
def data():
    f = open('data.json')
    data = json.load(f)
    return data


if __name__ == "__main__":
    app.run(debug=True)