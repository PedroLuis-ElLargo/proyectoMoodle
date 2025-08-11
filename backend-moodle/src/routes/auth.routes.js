// routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/auth.controller.js");
const { isAuthenticated } = require("../middlewares/auth.middleware.js");
const router = express.Router();

// Middleware to check if user is authenticated
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Moodle-specific routes
router.post("/moodle-logout", authController.moodleLogout);
router.get(
  "/session-status",
  isAuthenticated,
  authController.checkSessionStatus
);

module.exports = router;
