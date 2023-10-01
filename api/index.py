import json
from flask_cors import CORS
from flask import Flask, request, abort
import numpy as np
import requests
import time
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/test', methods=['POST'])
def check_url():
    url = request.form.get('url')  # Get the URL from the POST request
    response_data = {}

    try:
        start_time = time.time()
        response = requests.get(url)
        end_time = time.time()
        response_time = round((end_time - start_time) * 1000, 2)  # Round off to two digits
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        if response.status_code == 200:
            response_data = {'timestamp': timestamp, 'ping': response_time, 'response': response.status_code}
        else:
            response_data = {'timestamp': timestamp, 'ping': response_time, 'response': response.status_code}

    except requests.ConnectionError:
        print(f"Timestamp: {timestamp}")
        print(f"Could not connect to URL: {url}")

    def np_encoder(object):
        if isinstance(object, np.generic):
            return object.item()

    json_object = json.dumps(response_data, default=np_encoder)
    return json_object

if __name__ == "__main__":
    app.run(host='0.0.0.0', threaded=False, port=2303, debug=False)
