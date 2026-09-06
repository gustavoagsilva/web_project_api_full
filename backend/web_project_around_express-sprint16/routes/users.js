const users = require('express').Router();
const {
  // createUser,
  getUser,
  getUserId,
  updateAvatar,
  updateProfile,
} = require('../controllers/user');

users.get('/users', getUser);
users.get('/users/:userId', getUserId);
// users.post('/users', createUser);
users.patch('/users/me', updateProfile);
users.patch('/users/me/avatar', updateAvatar);

module.exports = users;
