const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator(v) {
        return /^https?:\/\/(www\.)?[a-zA-Z0-9.-]+(?:\/[\w._~:/?%#[\]@!$&'()*+,;=-]*)?$/.test(
          v,
        );
      },
      message: (props) => `${props.value} is not a valid avatar`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validateEmail(email) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
