// src/controllers/apiController.js
const axios = require("axios");
const ApiResponse = require("../models/ApiResponse");
const { saveDataToDatabase } = require("../db/postgres");
const { sendErrorMessage } = require("../services/twilioService");

const apiList = [
  "https://658c8c9e859b3491d3f634e6.mockapi.io/tester",
  "https://658c8c9e859b3491d3f634e6.mockapi.io/tester",
  // Add more API endpoints as needed
];

async function fetchAndSaveData(req, res) {
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

    res.json({ success: true, responses });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { fetchAndSaveData };
