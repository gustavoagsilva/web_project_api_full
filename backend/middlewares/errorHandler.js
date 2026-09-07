const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    return res.status(400).send({ message: 'Dados da solicitação inválidos' });
  }

  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).send({ message: 'JSON inválido' });
  }

  const isExpected = err && err.isOperational === true
    && Number.isInteger(err.statusCode)
    && err.statusCode >= 400 && err.statusCode < 500;

  const statusCode = isExpected ? err.statusCode : 500;
  const message = isExpected ? err.message : 'Erro interno do servidor';

  return res.status(statusCode).send({ message });
};
