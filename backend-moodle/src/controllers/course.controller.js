// controllers/course.controller.js
const courseService = require("../services/course.service.js");
const { logRequestToFile } = require("../utils/requestLogger");

/**
 * Maneja la solicitud para obtener los cursos del usuario logueado.
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
async function getUserCourses(req, res) {
  const userId = req.user.moodleUserId;
  const username = req.user.username;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "ID de usuario de Moodle no encontrado en el token de sesión.",
    });
  }

  try {
    // courseService.getUserCourses ahora devuelve cursos ya filtrados
    const courses = await courseService.getUserCourses(userId);

    // Registrar en archivo JSON (puedes decidir si quieres el objeto completo o el filtrado aquí)
    logRequestToFile("/api/moodle/courses", username, {
      courses: courses.map((c) => ({ id: c.id, fullname: c.fullname })),
    });

    res.status(200).json({
      success: true,
      username: username,
      courses: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error al obtener los cursos del usuario.",
    });
  }
}

/**
 * Maneja la solicitud para obtener el progreso de un curso específico.
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
async function getCourseCompletion(req, res) {
  const userId = req.user.moodleUserId;
  const courseId = parseInt(req.params.courseId);

  if (!userId || isNaN(courseId)) {
    return res.status(400).json({
      success: false,
      message: "ID de usuario o de curso inválido.",
    });
  }

  try {
    const completionStatus = await courseService.getCourseCompletionStatus(
      userId,
      courseId
    );

    // Registrar en archivo JSON
    logRequestToFile(
      `/api/moodle/courses/${courseId}/completion`,
      req.user.username,
      completionStatus
    );

    res.status(200).json({
      success: true,
      completionStatus: completionStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error al obtener el progreso del curso.",
    });
  }
}

/**
 * Obtiene los módulos de un curso específico
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 */
// async function getCourseContents(req, res) {
//   const { courseId } = req.params;

//   if (!courseId || isNaN(courseId)) {
//     return res.status(400).json({
//       success: false,
//       message: "ID de curso inválido",
//     });
//   }

//   try {
//     const contents = await courseService.getCourseContents(courseId);

//     res.status(200).json({
//       success: true,
//       courseId: Number(courseId),
//       contents, // Cambiado de "modules" a "contents" para reflejar la estructura jerárquica
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message || "Error al obtener módulos del curso",
//     });
//   }
// }

async function getCourseContents(req, res) {
  const { courseId } = req.params;

  if (!courseId || isNaN(courseId)) {
    return res.status(400).json({
      success: false,
      message: "ID de curso inválido",
    });
  }

  try {
    const contents = await courseService.getCourseContents(courseId);

    res.status(200).json({
      success: true,
      courseId: Number(courseId),
      contents, // Estructura simplificada
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error al obtener contenidos del curso",
    });
  }
}

module.exports = {
  getUserCourses,
  getCourseCompletion,
  getCourseContents,
};
