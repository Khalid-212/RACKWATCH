// src/models/ApiResponse.js
class ApiResponse {
  constructor({ api, response, status, timestamp, api_id, user_id }) {
    this.api = api;
    this.response = response;
    this.status = status;
    this.timestamp = timestamp;
    this.api_id = api_id;
    this.user_id = user_id;
  }
}

module.exports = ApiResponse;
