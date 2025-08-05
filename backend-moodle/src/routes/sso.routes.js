const express = require("express");
const ssoController = require("../controllers/sso.controller.js");
const { isAuthenticated } = require("../middlewares/auth.middleware.js");
const router = express.Router();

// Redirigir directamente a Moodle
router.get(
  "/moodle/course/:courseId/section/:sectionId",
  isAuthenticated,
  ssoController.redirectToMoodle
);
router.get("/moodle", isAuthenticated, ssoController.redirectToMoodle);
router.get(
  "/moodle/course/:courseId",
  isAuthenticated,
  ssoController.redirectToMoodle
);
router.get(
  "/moodle/module/:moduleId",
  isAuthenticated,
  ssoController.redirectToMoodle
);

// Generar URL SSO (para AJAX)
router.get("/url/moodle", isAuthenticated, ssoController.generateSSOUrl);
router.get(
  "/url/moodle/course/:courseId",
  isAuthenticated,
  ssoController.generateSSOUrl
);
router.get(
  "/url/moodle/module/:moduleId",
  isAuthenticated,
  ssoController.generateSSOUrl
);

module.exports = router;
