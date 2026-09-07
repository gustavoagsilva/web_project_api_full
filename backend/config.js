const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: [path.join(__dirname, '.env'), '/etc/secrets/.env'],
  quiet: true,
});

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && !process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET deve ser definida em produção');
}

if (isProduction && !process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI deve ser definida em produção');
}

module.exports = {
  PORT: Number(process.env.PORT || 3000),
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/aroundb',
};
