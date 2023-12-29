// src/controllers/apiController.js
const axios = require('axios');
const ApiResponse = require('../models/ApiResponse');
const { saveDataToDatabase } = require('../db/postgres');
const { sendErrorMessage } = require('../services/twilioService');

const apiList = [
];

async function checkApiHealth() {
  try {
    const responses = [];

    for (const apiUrl of apiList) {
      const response = await axios.get(apiUrl);

      const dataToSave = new ApiResponse({
        api: apiUrl,
        response: response.data,
        status: response.status,
      });
      await saveDataToDatabase(dataToSave);

      responses.push(dataToSave);

      if (response.status !== 200) {
        const errorMessage = `Error in API: ${apiUrl}. Status: ${response.status}`;
        sendErrorMessage(errorMessage);
      }
    }

    console.log("API health check completed.");
  } catch (error) {
    console.error("Error during API health check:", error.message);
  }
}
module.exports = {  checkApiHealth };
