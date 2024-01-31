const cardRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  checkCardIdValid, createCardValid,
} = require('../middlewares/validation');

cardRouter.get('/', getCards);
cardRouter.post('/', createCardValid, createCard);
cardRouter.delete('/:cardId', checkCardIdValid, deleteCard);
cardRouter.put('/:cardId/likes', checkCardIdValid, likeCard);
cardRouter.delete('/:cardId/likes', checkCardIdValid, dislikeCard);

module.exports = cardRouter;
