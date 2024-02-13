/* eslint-disable max-len */
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

const loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const checkUserIdValid = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24)
      .messages({
        'string.length': 'Ошибка валидации ID пользователя',
        'string.alphanum': 'Ошибка валидации ID пользователя',
        'any.required': 'Поле является обязательным',
      }),
  }),
});

const updateUserInfoValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateUserAvatarValid = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

const checkCardIdValid = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24)
      .messages({
        'string.length': 'Ошибка валидации ID карточки',
        'string.alphanum': 'Ошибка валидации ID карточки',
        'any.required': 'Поле является обязательным',
      }),
  }),
});

const createCardValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});

module.exports = {
  loginValid, createUserValid, checkUserIdValid, updateUserInfoValid, updateUserAvatarValid, checkCardIdValid, createCardValid,
};
