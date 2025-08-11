const { callMoodleApi } = require("../utils/apiClient");
const MOODLE_CONFIG = require("../config/moodle.js");
const { API_BASE_URL } = require("../utils/apiConfig.js");

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

    const filteredCourses = courses.map((course) => ({
      id: course.id,
      shortname: course.shortname,
      fullname: course.fullname,
      viewurl: `${API_BASE_URL}/sso/moodle/course/${course.id}`,
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
    return result.statuses || [];
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
      viewurl: `${API_BASE_URL}/sso/moodle/course/${courseId}/section/${section.id}`,
    }));
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUserCourses,
  getCourseCompletionStatus,
  getCourseContents,
};
