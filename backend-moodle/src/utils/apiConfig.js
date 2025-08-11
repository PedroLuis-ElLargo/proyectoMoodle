require("dotenv").config();

const API_BASE_URL = `http://localhost:${process.env.PORT || 3000}/api`;

module.exports = { API_BASE_URL };
