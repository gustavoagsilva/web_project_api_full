const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const name = Joi.string().min(2).max(30);
const about = Joi.string().min(2).max(30);
const url = Joi.string().custom(validateURL);
const id = Joi.string().hex().length(24).required();
const credentials = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

module.exports.validateSignup = celebrate({
  [Segments.BODY]: Joi.object({
    ...credentials,
    name,
    about,
    avatar: url,
  }).required(),
});

module.exports.validateSignin = celebrate({
  [Segments.BODY]: Joi.object(credentials).required(),
});

module.exports.validateProfile = celebrate({
  [Segments.BODY]: Joi.object({ name, about, avatar: url }).min(1).required(),
});

module.exports.validateAvatar = celebrate({
  [Segments.BODY]: Joi.object({ avatar: url.required() }).required(),
});

module.exports.validateCard = celebrate({
  [Segments.BODY]: Joi.object({
    name: name.required(),
    link: url.required(),
  }).required(),
});

module.exports.validateUserId = celebrate({
  [Segments.PARAMS]: Joi.object({ userId: id }).required(),
});

module.exports.validateCardId = celebrate({
  [Segments.PARAMS]: Joi.object({ cardId: id }).required(),
});
