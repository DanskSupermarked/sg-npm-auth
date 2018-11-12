const crypto = require('crypto');
const { toBase64URL, objectToBase64 } = require('../util');

/**
 * Creates a JWT.
 *
 * @param {string} issuer The issuer to use.
 * @param {string} method The HTTP method on the path.
 * @param {string} path The path. This should include the query parameters. Hash is not supported.
 * @param {string} key The private key.
 * @returns {string} A token to use in authorization.
 */
function signJWT(issuer, method, path, key) {
  const header = {
    'alg': 'HS256',
    'typ': 'JWT',
  };
  const payload = {
    'exp': Date.now() / 1000 | 0,
    'iss': issuer,
    'mth': method,
    'sub': path,
  };

  const unsignedToken = `${toBase64URL(objectToBase64(header))}.${toBase64URL(objectToBase64(payload))}`;

  const hmac = crypto.createHmac('sha256', key);
  hmac.update(unsignedToken);
  const signature = hmac.digest('base64');
  return toBase64URL(`${unsignedToken}.${signature}`);
}

module.exports = signJWT;
