const cards = require('express').Router();
const {
  createCard,
  getCard,
  deleteCardId,
  likeCard,
  dislikeCard,
} = require('../controllers/card');
const { validateCard, validateCardId } = require('../middlewares/validation');

cards.get('/cards', getCard);
cards.post('/cards', validateCard, createCard);
cards.delete('/cards/:cardId', validateCardId, deleteCardId);
cards.put('/cards/:cardId/likes', validateCardId, likeCard);
cards.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

module.exports = cards;
