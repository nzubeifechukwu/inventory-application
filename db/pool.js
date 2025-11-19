require("dotenv").config();
const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: process.env.CONNECTION_STRING || process.env.DATABASE_URL,
});
