const axios = require('axios');
const { APIError } = require('./util');
const pkg = require('../package');
const { getBuilder } = require('./auth');

const BASE_URL = 'https://api.sallinggroup.com';
const USER_AGENT = `Salling Group SDK v${pkg.version}`;

/**
 * Create a new Axios instance with Salling Group API support.
 * This automatically injects authorization and sets the base URL.
 * Furthermore, it also wraps API errors into a designated error type.
 * The instance can be used directly on resources (e.g. 'instance.get('/v1/stores/')').
 *
 * @param {Object} options Options for the instance.
 * @param {Object} options.auth Credentials for the instance.
 * @param {String} options.auth.type The type of authentication.
 * @param {String} [options.auth.email] The email used for JWT.
 * @param {String} [options.auth.secret] The secret used for JWT.
 * @param {String} [options.auth.token] The token used for Bearer.
 * @param {String} [options.applicationName]
 * The name of the application which will use this instance.
 * This will be sent in the user-agent header.
 * @param {String} [options.baseName] The base name. (For internal use.)
 * @returns {Object} An Axios instance that can access the Salling Group API.
 */
function createInstance(options) {
  if (!options.auth) {
    throw new Error('No authentication in options.');
  }

  const {
    applicationName = null,
    baseName = USER_AGENT,
    auth,
  } = options;

  const authBuilder = getBuilder(auth);

  const instance = axios.create({
    'baseURL': BASE_URL,
    'headers': {
      'User-Agent': (applicationName) ? `${baseName} - ${applicationName}` : baseName,
    },
  });

  instance.interceptors.request.use((config) => {
    config.headers.Authorization = authBuilder(config);
    return config;
  });

  instance.interceptors.response.use(null, (error) => {
    if (error.response) {
      return Promise.reject(new APIError(error.response));
    }
    return Promise.reject(error);
  });

  // Do not allow wrapping an already wrapped instance.
  if (applicationName === null) {
    instance.wrap = (name) => createInstance(authBuilder, name);
  }

  return instance;
}

module.exports = createInstance;
