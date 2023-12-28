// src/models/ApiResponse.js
class ApiResponse {
  constructor({ api, response, status }) {
    this.api = api;
    this.response = response;
    this.status = status;
  }
}

module.exports = ApiResponse;
