const Card = require('../models/card');

module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCardId = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return next({
          statusCode: 403,
          message: 'Você só pode excluir seus próprios cartões',
          isOperational: true,
        });
      }

      return Card.findOneAndDelete({ _id: card._id, owner: req.user._id })
        .orFail()
        .then((deletedCard) => res.send({ data: deletedCard }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next({
          statusCode: 400,
          message: 'ID de cartão inválido',
          isOperational: true,
        });
      }

      if (err.name === 'DocumentNotFoundError') {
        return next({
          statusCode: 404,
          message: 'Card não encontrado',
          isOperational: true,
        });
      }

      return next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  // console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
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

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // adicione _id ao array se ele não estiver lá
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send({ data: card }))
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
          message: 'Card não encontrado',
          isOperational: true,
        });
      }

      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id do array
    { new: true },
  )
    .orFail()
    .then((card) => res.status(201).send({ data: card }))
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
          message: 'Card não encontrado',
          isOperational: true,
        });
      }

      return next(err);
    });
};
