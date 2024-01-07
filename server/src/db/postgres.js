require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  ssl: {
    rejectUnauthorized: false,
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
    "INSERT INTO api_responses (api, response, status, timestamp, api_id, user_id) VALUES ($1, $2, $3, $4, $5, $6)";
  const values = [
    data.api,
    JSON.stringify(data.response),
    data.status,
    new Date(),
    data.api_id,
    data.user_id,
  ];
  console.log("values")
  console.log(values)

  try {
    const res = await pool.query(query, values);
    console.log(res);
  } catch (error) {
    console.error("Error saving data to the database:", error.message);
  }
}

async function getApiResponses() {
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

async function getApiResponsesForUser(user_email) {
  const query = `
    SELECT ar.id, ar.api, ar.response, ar.status, ar.timestamp
    FROM api_responses ar
    JOIN users u ON ar.user_id = u.id
    WHERE u.user_email = $1;
  `;
  const values = [user_email];

  const result = await pool.query(query, values);
  return result.rows;
}

async function userExists(user) {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [user];

  try {
    const { rows } = await pool.query(query, values);

    if (rows.length > 0) {
      return "User exists";
    } else {
      await saveUserToDatabase(user);
      return "User added";
    }
  } catch (error) {
    console.error("Error checking user existence:", error.message);
    throw error; // Rethrow the error for handling in the calling code
  }
}

async function saveUserToDatabase(user) {
  const query = "INSERT INTO users (email) VALUES ($1)";
  const values = [user];

  try {
    await pool.query(query, values);
    console.log("User added to the database:", user);
  } catch (error) {
    console.error("Error adding user to the database:", error.message);
    throw error; // Rethrow the error for handling in the calling code
  }
}

async function addApi(apiData) {
  const query =
    "INSERT INTO apis (api, api_name, user_email) VALUES ($1, $2, $3) RETURNING *";
  const values = [apiData.api, apiData.api_name, apiData.user_email];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the inserted API
  } catch (error) {
    console.error("Error adding API to the database:", error.message);
    throw error; // Rethrow the error for handling in the calling code
  }
}

async function getApiListforUser(user) {
  const query = "SELECT * FROM apis WHERE user_email = $1";
  const values = [user.email];
  const { rows } = await pool.query(query, values);
  console.log(user.email);
  console.log(rows);
  return rows;
}

module.exports = {
  saveDataToDatabase,
  getApiResponses,
  saveUserToDatabase,
  getApiResponsesForUser,
  addApi,
  getApiListforUser,
  getAllApis,
  userExists,
};
