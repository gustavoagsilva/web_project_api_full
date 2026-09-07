const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports.getUser = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) =>
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next({
          statusCode: 404,
          message: 'Usuário não encontrado',
          isOperational: true,
        });
      }

      return next(err);
    });

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next({
          statusCode: 404,
          message: 'Usuário não encontrado',
          isOperational: true,
        });
      }

      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }),
    )
    .then((user) => {
      const data = user.toObject();
      delete data.password;
      return res.status(201).send({ data });
    })
    .catch((err) => {
      const ERROR_CODE = 400;

      if (err.name === 'ValidationError') {
        return next({
          statusCode: ERROR_CODE,
          message: 'Invalid data',
          isOperational: true,
        });
      }

      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar: req.body.avatar,
    },
    {
      new: true, // então o manipulador recebe o documento atualizado
      runValidators: true, // valide os dados antes de atualizar
    },
  )
    .orFail()
    .then((avatar) => res.status(201).send({ data: avatar }))
    .catch((err) => {
      const ERROR_CODE = 404;

      if (err.name === 'ValidationError') {
        return next({
          statusCode: ERROR_CODE,
          message: 'Invalid data',
          isOperational: true,
        });
      }

      if (err.name === 'DocumentNotFoundError') {
        return next({
          statusCode: 404,
          message: 'Usuário não encontrado',
          isOperational: true,
        });
      }

      return next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    },
    {
      new: true, // então o manipulador recebe o documento atualizado
      runValidators: true, // valide os dados antes de atualizar
    },
  )
    .orFail()
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      const ERROR_CODE = 404;

      if (err.name === 'ValidationError') {
        return next({
          statusCode: ERROR_CODE,
          message: 'Invalid data',
          isOperational: true,
        });
      }

      if (err.name === 'DocumentNotFoundError') {
        return next({
          statusCode: 404,
          message: 'Usuário não encontrado',
          isOperational: true,
        });
      }

      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (typeof email !== 'string' || typeof password !== 'string') {
    return next({
      statusCode: 401,
      message: 'E-mail ou senha incorretos',
      isOperational: true,
    });
  }

  return User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return next({
          statusCode: 401,
          message: 'E-mail ou senha incorretos',
          isOperational: true,
        });
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return next({
            statusCode: 401,
            message: 'E-mail ou senha incorretos',
            isOperational: true,
          });
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: '7d',
        });

        return res.send({ token });
      });
    })
    .catch(next);
};
