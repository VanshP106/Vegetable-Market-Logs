require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/contact';

module.exports = {
  MONGODB_URI,
};
