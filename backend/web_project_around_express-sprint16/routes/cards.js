const cards = require('express').Router();
const {
  createCard,
  getCard,
  deleteCardId,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

cards.get('/cards', getCard);
cards.post('/cards', createCard);
cards.delete('/cards/:cardId', deleteCardId);
cards.put('/cards/:cardId/likes', likeCard);
cards.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cards;
