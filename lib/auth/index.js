const builders = require('./builders');

function getBuilder(auth) {
  const { type } = auth;
  if (!type) {
    throw new Error('The authentication type cannot be empty.');
  }

  if (type === 'jwt') {
    const { email, secret } = auth;
    if (!email || !secret) {
      throw new Error('JWT authentication requires an email and a secret.');
    }
    return builders.jwtBuilder(email, secret);
  } else if (type === 'bearer') {
    const { token } = auth;
    if (!token) {
      throw new Error('Bearer authentication requires a token.');
    }
    return builders.bearerBuilder(token);
  }
  throw new Error(`The authenticatin type '${type}' is not valid. (Must be either 'jwt' or 'bearer')`);
}

module.exports = {
  getBuilder,
};
