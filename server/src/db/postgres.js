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
    "INSERT INTO api_responses (api, response, status, timestamp) VALUES ($1, $2, $3, $4)";
  const values = [
    data.api,
    JSON.stringify(data.response),
    data.status,
    new Date(),
  ];
  await pool.query(query, values).then((res) => console.log(res));
}

async function getApiResponses(){
  const query = "SELECT * FROM api_responses";
  const values = [];
  const { rows } = await pool.query(query, values);
  return rows;
}

async function getAllApis() {
  const query = "SELECT * FROM apis";
  const values = [];
  const { rows } = await pool.query(query, values);
  return rows;
}

async function getApiResponsesforUser(user) {
  const query = "SELECT * FROM api_responses WHERE user_id = $1";
  const values = [user.email];
}

async function userExists(user) {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [user];
  const { rows } = await pool.query(query, values);
  console.log(rows)
  if (rows.length > 0) {
    return "user exists";
  } else {
    saveUserToDatabase(user);
  }
}

async function saveUserToDatabase(user) {
  const query = "INSERT INTO users (email) VALUES ($1)";
  const values = [user];
  const {rows} = await pool.query(query, values);
  console.log(rows)
  return "user added";
}


async function addApiToDatabase(data) {
  const query = "INSERT INTO apis (api,api_name,email) VALUES ($1,$2,$3)";
  const values = [data.api, data.api_name, data.email];
  await pool.query(query, values);
}

async function getApiListforUser(user) {
  const query = "SELECT * FROM apis WHERE email = $1";
  const values = [user.email];
  const { rows } = await pool.query(query, values);
  console.log(user.email)
  console.log(rows);
  return rows;
}

module.exports = {
  saveDataToDatabase,
  getApiResponses,
  saveUserToDatabase,
  getApiResponsesforUser,
  addApiToDatabase,
  getApiListforUser,
  getAllApis,
  userExists,
};
