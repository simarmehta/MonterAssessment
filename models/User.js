// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  otp: Number,
  location: String,
  age: Number,
  work: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;
