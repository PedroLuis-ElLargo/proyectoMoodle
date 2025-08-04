// routes/log.routes.js
const express = require("express");
const router = express.Router();
const logController = require("../controllers/log.controller.js");

const { isAuthenticated } = require("../middlewares/auth.middleware.js");

router.get("/logs", isAuthenticated, logController.getLogs);

module.exports = router;
