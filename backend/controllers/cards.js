const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const UserRightsError = require('../errors/UserRightsError');

const getCards = async (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => next(new InternalServerError('Ошибка со стороны сервера')));
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
      return next(new InternalServerError('Ошибка со стороны сервера'));
    });
};

const deleteCard = async (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((deletedCard) => {
      if (!deletedCard) {
        return next(new NotFoundError('Карточка по указанному ID не найдена'));
      }
      if (deletedCard.owner.toString() !== req.user._id.toString()) {
        return next(new UserRightsError('Недостаточно прав для удаления карточки'));
      }
      return deletedCard.deleteOne()
        .then(() => res.send({ message: `Карточка с ID: ${deletedCard._id} была успешно удалена` }))
        .catch(next);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new BadRequestError('Передан не валидный ID карточки'));
      }
      return next(new InternalServerError('Ошибка со стороны сервера'));
    });
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.send({ card });
    })
    .catch((error) => {
      if (error.message === 'NotValidId') {
        return next(new NotFoundError('Карточка по указанному ID не найдена'));
      }
      if (error.name === 'CastError') {
        return next(new BadRequestError('Передан не валидный ID карточки'));
      }
      return next(new InternalServerError('Ошибка со стороны сервера'));
    });
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.send({ card });
    })
    .catch((error) => {
      if (error.message === 'NotValidId') {
        return next(new NotFoundError('Карточка по указанному ID не найдена'));
      }
      if (error.name === 'CastError') {
        return next(new BadRequestError('Передан не валидный ID карточки'));
      }
      return next(new InternalServerError('Ошибка со стороны сервера'));
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
