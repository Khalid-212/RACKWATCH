// src/db/postgres.js
require("dotenv").config();
const { Pool } = require("pg");


const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  ssl: {
    rejectUnauthorized: false, // Use this if Render requires it, but be cautious with this option
  },
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) =>
    console.error("Error connecting to PostgreSQL database:", err)
  );

async function saveDataToDatabase(data) {
  const query =
    "INSERT INTO api_responses (api, response, status) VALUES ($1, $2, $3)";
  const values = [data.api, JSON.stringify(data.response), data.status];

  await pool.query(query, values);
}

module.exports = { saveDataToDatabase };
