const users = require('express').Router();
const {
  getUser,
  getCurrentUser,
  getUserId,
  updateAvatar,
  updateProfile,
} = require('../controllers/user');
const {
  validateUserId,
  validateProfile,
  validateAvatar,
} = require('../middlewares/validation');

users.get('/users', getUser);
users.get('/users/me', getCurrentUser);
users.get('/users/:userId', validateUserId, getUserId);
users.patch('/users/me', validateProfile, updateProfile);
users.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = users;
