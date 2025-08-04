// controllers/log.controller.js
const fs = require("fs");
const path = require("path");

const logsPath = path.join(__dirname, "../logs/requestsLog.json");

exports.getLogs = (req, res) => {
  try {
    const data = fs.readFileSync(logsPath, "utf-8");
    const logs = JSON.parse(data);
    res.json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error leyendo logs." });
  }
};
