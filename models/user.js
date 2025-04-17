const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
});

module.exports = mongoose.model('User', UserSchema , 'users');