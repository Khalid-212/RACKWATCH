require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { checkApiHealth } = require("./controllers/apiController");
const cors = require("cors");

const {
  userExists,
  addApi,
  getApiListforUser,
  getAllApis,
  getApiResponses,
  getApiResponsesForUser,
} = require("./db/postgres");

const app = express();
const port = 3232;

app.use(bodyParser.json());
app.use(cors());

checkApiHealth();

// Run health checks every 5 minutes (300,000 milliseconds)
const healthCheckInterval = 3000;
setInterval(checkApiHealth, healthCheckInterval);

app.get("/", (req, res) => {
  res.json("Server is running.");
});

// create user if not exists
app.post("/user", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const result = await userExists(email);
  res.json(result);
});

// add api to list
app.post("/add-api", async (req, res) => {
  try {
    const { api, api_name, user_email } = req.body;

    // Ensure all required fields are present
    if (!api || !api_name || !user_email) {
      return res
        .status(400)
        .json({ error: "Missing required fields: api, api_name, user_email." });
    }

    const apiData = {
      api: api,
      api_name: api_name,
      user_email: user_email,
    };

    const addedApi = await addApi(apiData);
    res.status(201).json(addedApi);
  } catch (error) {
    console.error("Error adding API:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

// get api list for user
app.post("/userapis", async (req, res) => {
  const { email } = req.body;
  const data = {
    email: email,
  };
  const apis = await getApiListforUser(data);
  res.json(apis);
});

app.get("/getallapis", async (req, res) => {
  const apis = await getAllApis();
  res.json(apis);
});

app.get("/all-responses", async (req, res) => {
  const apiResponses = await getApiResponses();
  res.json(apiResponses);
});

app.post("/user-api-responses", async (req, res) => {
  const { email } = req.body;
  const data = {
    email: email,
  };
  const apiResponses = await getApiResponsesForUser(data);
  res.json(apiResponses);
});

app.get("/all-api-responses", async (req, res) => {
  // Your code for handling all API responses
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
