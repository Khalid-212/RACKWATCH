// src/app.js
require("dotenv").config();

// src/app.js
const express = require("express");
const bodyParser = require("body-parser");
const {
  fetchAndSaveData,
  checkApiHealth,
} = require("./controllers/apiController");
const cors = require("cors");

const { Pool } = require("pg");
const {
  saveUserToDatabase,
  getApiResponsesforUser,
  getApiListforUser,
  getAllApis,
  userExists,
  getApiResponses,
} = require("./db/postgres");
const { addApiToDatabase } = require("./db/postgres");

const app = express();
const port = 3232;

app.use(bodyParser.json());
app.use(cors());

checkApiHealth();

// Run health checks every 5 minutes (300,000 milliseconds)
const healthCheckInterval = 300000;
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
  const { api, api_name, email } = req.body;
  const datatosave = {
    api: api,
    api_name: api_name,
    email: email,
  };
  await addApiToDatabase(datatosave);
  res.json("Api added");
});

// get api list for user
app.get("/apis", async (req, res) => {
  const { email } = req.body; // Use req.query to get data from query parameters
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/all-responses", async (req, res) => {
  const apiResponses = await getApiResponses();
  res.json(apiResponses);
});

app.get("/api-responses", async (req, res) => {
  const { email } = req.body; // Use req.query to get data from query parameters
  const data = {
    email: email,
  };
  const apiResponses = await getApiResponsesforUser(data);
  res.json(apiResponses);
});
app.get("all-api-responses", async (req, res) => {});
