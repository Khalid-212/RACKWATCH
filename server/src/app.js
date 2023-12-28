// src/app.js
const express = require("express");
const bodyParser = require("body-parser");
const { fetchAndSaveData } = require("./controllers/apiController");
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/fetch-and-save-data", fetchAndSaveData);

 const pool = new Pool({
  user: "avnadmin",
  host: "pg-1b26674e-khalidtech-b218.aivencloud.com",
  database: "defaultdb",
  password: "AVNS_JuNydJMlaLBNqWsNqWf",
  port: 19306,
});

app.get("/", (req, res) => {
  pool.query("SELECT * FROM api_responses", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(result.rows);
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
