const createInstance = require('./instance');
const { bearerBuilder, jwtBuilder } = require('./auth/builders');

/**
 * Creates an API instance with JWT authorization.
 *
 * @param {string} email The email for the JWT.
 * @param {string} secret The secret for the JWT.
 */
function jwt(email, secret) {
  return createInstance(jwtBuilder(email, secret));
}

/**
 * Creates an API instance with Bearer authorization.
 *
 * @param {string} token The Bearer token to use.
 */
function bearer(token) {
  return createInstance(bearerBuilder(token));
}

module.exports = {
  bearer,
  jwt,
};
