const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cards = require('./routes/cards');
const users = require('./routes/users');
const { login, createUser } = require('./controllers/user');

const PORT = 3000;

mongoose
  .connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.log('Erro ao conectar ao MongoDB', err);
  });

/* app.use((req, res, next) => {
  req.user = {
    _id:
  };
  next();
}); */

app.use(express.json());
app.post('/signup', createUser);
app.post('/signin', login);
app.use(users);
app.use(cards);

// Qualquer outra rota não encontrada
app.use((req, res) => {
  res.status(404).json({
    message: 'A solicitação não foi encontrada',
  });
});

app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
