const ssoService = require("../services/sso.service.js");
const { logRequestToFile } = require("../utils/requestLogger");

/**
 * Maneja la redirección SSO a Moodle
 */
async function redirectToMoodle(req, res) {
  const { courseId, moduleId } = req.params;
  const userData = {
    username: req.user.username,
    moodleUserId: req.user.moodleUserId,
  };

  try {
    let redirectUrl = `${process.env.MOODLE_URL}/my/`;

    if (courseId) {
      redirectUrl = `${process.env.MOODLE_URL}/course/view.php?id=${courseId}`;
    }

    if (moduleId) {
      redirectUrl = `${process.env.MOODLE_URL}/mod/resource/view.php?id=${moduleId}`;
    }

    const ssoUrl = ssoService.createSSOUrl(userData, redirectUrl);

    // Log de la redirección
    logRequestToFile("/api/sso/moodle", req.user.username, {
      action: "SSO redirect",
      courseId: courseId || null,
      moduleId: moduleId || null,
      redirectUrl: redirectUrl,
    });

    // Redirigir directamente
    res.redirect(ssoUrl);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generando redirección SSO: " + error.message,
    });
  }
}

/**
 * Genera URL de SSO sin redirigir (para AJAX)
 */
async function generateSSOUrl(req, res) {
  const { courseId, moduleId } = req.params;
  const userData = {
    username: req.user.username,
    moodleUserId: req.user.moodleUserId,
  };

  try {
    let redirectUrl = `${process.env.MOODLE_URL}/my/`;

    if (courseId) {
      redirectUrl = `${process.env.MOODLE_URL}/course/view.php?id=${courseId}`;
    }

    if (moduleId) {
      redirectUrl = `${process.env.MOODLE_URL}/mod/resource/view.php?id=${moduleId}`;
    }

    const ssoUrl = ssoService.createSSOUrl(userData, redirectUrl);

    res.json({
      success: true,
      ssoUrl: ssoUrl,
      redirectUrl: redirectUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generando URL SSO: " + error.message,
    });
  }
}

module.exports = {
  redirectToMoodle,
  generateSSOUrl,
};
