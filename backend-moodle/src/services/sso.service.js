const crypto = require("crypto");
const MOODLE_CONFIG = require("../config/moodle.js");

/**
 * Genera un token SSO para Moodle usando HMAC
 * @param {Object} userData - Datos del usuario
 * @param {string} secret - Clave secreta compartida con Moodle
 * @returns {string} Token SSO
 */
function generateSSOToken(userData, secret) {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = crypto.randomBytes(16).toString("hex");

  const payload = {
    id: userData.moodleUserId,
    username: userData.username,
    email: userData.email || `${userData.username}@yourdomain.com`,
    firstname: userData.firstname || userData.username,
    lastname: userData.lastname || "",
    timestamp: timestamp,
    nonce: nonce,
  };

  const payloadString = JSON.stringify(payload);
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payloadString)
    .digest("hex");

  return Buffer.from(
    JSON.stringify({
      payload: payloadString,
      signature: signature,
    })
  ).toString("base64");
}

/**
 * Crea una URL de SSO para acceder a Moodle
 * @param {Object} userData - Datos del usuario
 * @param {string} redirectUrl - URL de destino en Moodle
 * @returns {string} URL completa de SSO
 */
function createSSOUrl(userData, redirectUrl = null) {
  const ssoSecret = process.env.MOODLE_SSO_SECRET;
  const token = generateSSOToken(userData, ssoSecret);

  let ssoUrl = `${
    MOODLE_CONFIG.url
  }/auth/external/login.php?token=${encodeURIComponent(token)}`;

  if (redirectUrl) {
    ssoUrl += `&redirect=${encodeURIComponent(redirectUrl)}`;
  }

  return ssoUrl;
}

module.exports = {
  generateSSOToken,
  createSSOUrl,
};
