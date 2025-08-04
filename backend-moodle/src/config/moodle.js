// src/config/moodle.js
require("dotenv").config();

const MOODLE_CONFIG = {
  url: process.env.MOODLE_URL,
  authService: process.env.MOODLE_AUTH_SERVICE || "moodle_mobile_app",
  adminToken: process.env.MOODLE_ADMIN_TOKEN,
  restFormat: "json",
};

module.exports = MOODLE_CONFIG;
