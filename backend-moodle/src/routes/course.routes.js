// routes/course.routes.js
const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

// Rutas existentes...
router.get("/courses", isAuthenticated, courseController.getUserCourses);
router.get(
  "/courses/:courseId/completion",
  isAuthenticated,
  courseController.getCourseCompletion
);

// Nueva ruta para módulos
router.get(
  "/courses/:courseId/modules",
  isAuthenticated,
  courseController.getCourseContents
);

module.exports = router;
