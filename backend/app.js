const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT, MONGODB_URI } = require('./config');

const app = express();
const cards = require('./routes/cards');
const users = require('./routes/users');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { validateSignup, validateSignin } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(requestLogger);
app.use(cors());
app.use(express.json());

// Rota exigida para a revisão. Remover depois da aprovação do projeto.
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('O servidor travará agora');
  }, 0);
});

app.post('/signup', validateSignup, createUser);
app.post('/signin', validateSignin, login);
app.use(auth);
app.use(users);
app.use(cards);

// Qualquer outra rota não encontrada
app.use((req, res, next) => {
  next({
    statusCode: 404,
    message: 'A solicitação não foi encontrada',
    isOperational: true,
  });
});

app.use(errorLogger);
app.use(errorHandler);
console.log(MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(() => {
    console.error('Não foi possível conectar ao MongoDB');
    process.exit(1);
  });
