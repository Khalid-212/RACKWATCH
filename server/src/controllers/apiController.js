const axios = require("axios");
const ApiResponse = require("../models/ApiResponse");
const { saveDataToDatabase, getAllApis } = require("../db/postgres");
const { sendErrorMessage } = require("../services/twilioService");

// Get all API list from the database
async function getAllApisList() {
  try {
    const apis = await getAllApis();
    return apis.map((api) => ({
      api_id: api.id,
      api: api.api,
      api_name: api.api_name,
      user_id: api.email,
    }));
  } catch (error) {
    console.error("Error fetching API list from the database:", error.message);
    return [];
  }
}

// Perform API health check
async function checkApiHealth() {
  const apiList = await getAllApisList();

  try {
    const responses = await Promise.all(
      apiList.map(async (api) => {
        try {
          const response = await axios.get(api.api, { timeout: 5000 });

          const dataToSave = new ApiResponse({
            api: api.api,
            response: response.data,
            status: response.status,
            api_id: api.api_id,
            user_id: api.email,
          });

          await saveDataToDatabase(dataToSave);

          if (response.status !== 200) {
            const errorMessage = `Error in API: ${api.api}. Status: ${response.status}`;
            sendErrorMessage(errorMessage);
          }

          return dataToSave;
        } catch (apiError) {
          // Handle errors for individual APIs
          console.error(`Error for API ${api.api}:`, apiError.message);
          return null; // Return null for failed API requests
        }
      })
    );

    console.log("API health check completed.");
    return responses.filter((response) => response !== null); // Filter out failed API requests
  } catch (error) {
    console.error("Error during API health check:", error.message);
    return [];
  }
}

module.exports = { checkApiHealth };
