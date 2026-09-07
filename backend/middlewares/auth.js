const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization === undefined) {
    return next({
      statusCode: 403,
      message: 'Autorização necessária',
      isOperational: true,
    });
  }

  const match = typeof authorization === 'string'
    ? authorization.match(/^Bearer ([^\s]+)$/i)
    : null;

  if (!match) {
    return next({
      statusCode: 401,
      message: 'Token inválido ou expirado',
      isOperational: true,
    });
  }

  try {
    const payload = jwt.verify(match[1], JWT_SECRET, {
      algorithms: ['HS256'],
    });

    if (!payload || typeof payload._id !== 'string'
      || !/^[a-f\d]{24}$/i.test(payload._id)) {
      return next({
        statusCode: 401,
        message: 'Token inválido ou expirado',
        isOperational: true,
      });
    }

    req.user = payload;
  } catch {
    return next({
      statusCode: 401,
      message: 'Token inválido ou expirado',
      isOperational: true,
    });
  }

  return next();
};
