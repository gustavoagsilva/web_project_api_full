const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');

const format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

module.exports.requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, '..', 'request.log') }),
  ],
  format,
  requestWhitelist: ['method', 'path'],
  responseWhitelist: ['statusCode'],
  msg: 'HTTP {{req.method}} {{req.path}}',
});

module.exports.errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, '..', 'error.log') }),
  ],
  format,
  requestWhitelist: ['method', 'path'],
  exceptionToMeta: (err) => ({
    name: err.name || 'Error',
    message: err.type === 'entity.parse.failed' ? 'JSON inválido' : err.message,
    statusCode: err.statusCode,
  }),
  msg: 'Erro em {{req.method}} {{req.path}}',
});
