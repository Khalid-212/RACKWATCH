// src/app.js
require("dotenv").config();
// src/app.js
const express = require("express");
const bodyParser = require("body-parser");
const { fetchAndSaveData, checkApiHealth } = require("./controllers/apiController");
const { Pool } = require("pg");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Run the fetchAndSaveData function at the start of the server
fetchAndSaveData();

// Run health checks every 5 minutes (300,000 milliseconds)
const healthCheckInterval = 3000;
setInterval(checkApiHealth, healthCheckInterval);

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
