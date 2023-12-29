// src/controllers/apiController.js
const axios = require('axios');
const ApiResponse = require('../models/ApiResponse');
const { saveDataToDatabase } = require('../db/postgres');
const { sendErrorMessage } = require('../services/twilioService');

const apiList = [
  'https://658c8c9e859b3491d3f634e6.mockapi.io/tester',
  'https://658c8c9e859b3491d3f634e6.mockapi.io/tester'
];

async function fetchAndSaveData() {
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

    console.log('Data fetched and saved:', responses);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
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

      if (response.status == 200) {
        const errorMessage = `Error in API: ${apiUrl}. Status: ${response.status}`;
        sendErrorMessage(errorMessage);
      }
    }

    console.log("API health check completed.");
  } catch (error) {
    console.error("Error during API health check:", error.message);
  }
}
module.exports = { fetchAndSaveData, checkApiHealth };
