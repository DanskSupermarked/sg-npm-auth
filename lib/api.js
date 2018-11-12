const createInstance = require('./instance');
const { bearerBuilder, jwtBuilder } = require('./auth/builders');

/**
 * Creates an API instance with JWT authorization.
 *
 * @param {string} issuer The issuer for the JWT.
 * @param {string} secret The secret for the JWT.
 */
function jwt(issuer, secret) {
  return createInstance(jwtBuilder(issuer, secret));
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
