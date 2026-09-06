const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

module.exports.getUser = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Error' }));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Usuário não encontrado' });
      }

      return res.status(500).send({ message: 'Error' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }),
    )
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      const ERROR_CODE = 400;

      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Invalid data' });
      }

      return res.status(500).send({ message: 'Internal server error' });
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar: req.body.avatar,
    },
    {
      new: true, // então o manipulador recebe o documento atualizado
      runValidators: true, // valide os dados antes de atualizar
    },
  )
    .orFail()
    .then((avatar) => res.status(201).send({ data: avatar }))
    .catch((err) => {
      const ERROR_CODE = 404;

      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Invalid data' });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Usuário não encontrado' });
      }

      return res.status(500).send({ message: 'Internal server error' });
    });
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    },
    {
      new: true, // então o manipulador recebe o documento atualizado
      runValidators: true, // valide os dados antes de atualizar
    },
  )
    .orFail()
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      const ERROR_CODE = 404;

      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Invalid data' });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Usuário não encontrado' });
      }

      return res.status(500).send({ message: 'Internal server error' });
    });

  module.exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findOne({email})
    .select("+password")
    .then((user) => {
      if(!user){
        return res.status(401).send({message: "E-mail ou senha incorretos "});
      }
      return bcrypt.compare(password, user.password).then((matched) =>{
        if (!matched){
          return res.status(401)
          .send({message: "E-mail ou senha incorretos"});
        }
        const token = jwt.sign(
          {_id: user._id},
          "dev-secret",
          { expiresIn: "7d"}
        );

        return res.send({token});
      })
      .catch((err) =>{
        res.status(500).send({message: "Erro interno do servidor"});
      });
    });
  };