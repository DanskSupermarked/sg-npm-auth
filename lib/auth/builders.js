const signJWT = require('./sign');
const { URL, URLSearchParams } = require('url');

/**
 * Builds JWT authorization.
 *
 * @param issuer The issuer to use.
 * @param secret The secret to use.
 * @returns {function(config: Object): string}
 */
function jwtBuilder(issuer, secret) {
  return (config) => {
    const url = new URL(config.url, config.baseURL);
    url.search = (new URLSearchParams(config.params)).toString();
    config.url = url.toString();
    config.params = {};
    return `JWT ${signJWT(issuer, config.method, decodeURIComponent(url.pathname + url.search), secret)}`;
  };
}

/**
 * Builds Bearer authorization.
 *
 * @param token The token to use.
 * @returns {function(config: Object): string}
 */
function bearerBuilder(token) {
  return () => `Bearer ${token}`;
}

module.exports = {
  bearerBuilder,
  jwtBuilder,
};
