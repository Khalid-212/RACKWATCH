// src/db/postgres.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "avnadmin",
  host: "pg-1b26674e-khalidtech-b218.aivencloud.com",
  database: "defaultdb",
  password: "AVNS_JuNydJMlaLBNqWsNqWf",
  port: 19306,
});

async function saveDataToDatabase(data) {
  const query =
    "INSERT INTO api_responses (api, response, status) VALUES ($1, $2, $3)";
  const values = [data.api, JSON.stringify(data.response), data.status];

  await pool.query(query, values);
}

module.exports = { saveDataToDatabase };
