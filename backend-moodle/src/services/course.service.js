// services/courseService.js
const { callMoodleApi } = require("../utils/apiClient");
const MOODLE_CONFIG = require("../config/moodle.js");

/**
 * Obtiene la lista de cursos de un usuario específico desde Moodle y los filtra.
 * @param {number} userId - El ID del usuario de Moodle.
 * @returns {Promise<Array<object>>} Un array de objetos de curso ligeros.
 * @throws {Error} Si la obtención de cursos falla.
 */
async function getUserCourses(userId) {
  try {
    const courses = await callMoodleApi("core_enrol_get_users_courses", {
      userid: userId,
    });

    // Filtrar y mapear solo los campos necesarios para el frontend
    const filteredCourses = courses.map((course) => ({
      id: course.id,
      shortname: course.shortname,
      fullname: course.fullname,
      viewurl: `/api/sso/moodle/course/${course.id}`,
      progress: course.progress || null,
      completed: course.completed || false,
    }));

    return filteredCourses;
  } catch (error) {
    throw error;
  }
}

/**
 * Obtiene el estado de finalización de un curso para un usuario específico.
 * @param {number} userId - El ID del usuario de Moodle.
 * @param {number} courseId - El ID del curso de Moodle.
 * @returns {Promise<object>} El objeto de estado de finalización del curso.
 * @throws {Error} Si la obtención del estado de finalización falla.
 */
async function getCourseCompletionStatus(userId, courseId) {
  try {
    const result = await callMoodleApi(
      "core_completion_get_activities_completion_status",
      { userid: userId, courseid: courseId }
    );
    return result.statuses || []; // Siempre retorna array
  } catch (error) {
    if (error.message.includes("nocriteriaset")) {
      return [];
    }
    throw error;
  }
}

/**
 * Obtiene los módulos/contenidos de un curso específico y los filtra.
 * @param {number} courseId - ID del curso en Moodle
 * @returns {Promise<Array>} Lista de módulos ligeros con sus detalles
 */
async function getCourseContents(courseId) {
  try {
    const contents = await callMoodleApi("core_course_get_contents", {
      courseid: courseId,
    });

    return contents.map((section) => ({
      id: section.id,
      name: section.name,
      moduleCount: section.modules?.length || 0,
    }));
  } catch (error) {
    throw error;
  }
  /*
    // Mantener la estructura original de Moodle
    return contents.map((section) => ({
      id: section.id,
      name: section.name,
      modules: section.modules.map((module) => ({
        id: module.id,
        name: module.name,
        modname: module.modname,
        url:
          module.url ||
          `${MOODLE_CONFIG.url}/mod/${module.modname}/view.php?id=${module.id}`,
        completion: module.completion || 0,
        available: module.uservisible !== false,
        description: module.description || "",
        dates: module.dates || [],
        contents: module.contents || [],
      })),
    }));
*/
}
module.exports = {
  getUserCourses,
  getCourseCompletionStatus,
  getCourseContents,
};
