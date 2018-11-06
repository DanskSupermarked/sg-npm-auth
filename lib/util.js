/**
 * An error caused by the API.
 */
class APIError extends Error {
  /**
   * Construct a new API error.
   *
   * @param {Object} response The response from the request to the API.
   */
  constructor(response) {
    super(response.data.developerMessage || response.data.error);
    this.name = 'APIError';
    this.response = response;
    this.statusCode = response.statusCode;
  }
}

/**
 * Convert a base64-encoding into base64URL.
 *
 * @param {string} base64 A base64 string.
 * @returns {string} The base64 string converted to base64URL.
 */
function toBase64URL(base64) {
  return base64
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Encode an object into base64.
 *
 * @param {Object} object The object to base64 encode.
 * @returns {string} The object in base64.
 */
function objectToBase64(object) {
  return (new Buffer(JSON.stringify(object))).toString('base64');
}

module.exports = {
  APIError,
  objectToBase64,
  toBase64URL,
};
