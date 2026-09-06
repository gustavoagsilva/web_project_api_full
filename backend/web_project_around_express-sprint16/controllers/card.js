const Card = require('../models/card');

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

module.exports.deleteCardId = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Card não encontrado' });
      }

      return res.status(500).send({ message: 'Error' });
    });
};

module.exports.createCard = (req, res) => {
  // console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      const ERROR_CODE = 400;

      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Invalid data' });
      }

      return res.status(500).send({ message: 'Internal server error' });
    });
};

module.exports.likeCard = (req, res) => {
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
        return res.status(ERROR_CODE).send({ message: 'Invalid data' });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Card não encontrado' });
      }

      return res.status(500).send({ message: 'Internal server error' });
    });
};

module.exports.dislikeCard = (req, res) => {
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
        return res.status(ERROR_CODE).send({ message: 'Invalid data' });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Card não encontrado' });
      }

      return res.status(500).send({ message: 'Internal server error' });
    });
};
