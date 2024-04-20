// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const transporter = require('./config/emailConfig');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/myapp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Failed to connect to MongoDB', err));


app.get('/', (req, res) => {
  res.send('Welcome to the Authentication API!');
});

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already registered');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate OTP
    const user = new User({ email, password: hashedPassword, isVerified: false, otp: otp });
    await user.save();
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Verify Your Email',
      text: `Your OTP for email verification is: ${otp}`
    });
    res.status(201).send('User registered. Please verify your email.');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/login', async (req, res) => {
  try {
    console.log('Request Headers:', req.headers);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).send('Invalid credentials');
    }
    if (!user.isVerified) {
      return res.status(403).send('Please verify your email first');
    }
    const JWT_SECRET = '383290605e178261b3c96a6209859742f6d2a78c79617b3ed7bccabecedd72b0dd6c81b69c49315f1dca94777f650a68836ade42fa955fe55a231f00f07bfeae';
    console.log('JWT Secret Key:', JWT_SECRET);
    const token = jwt.sign({ userId: user._id },JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ token });
    
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, otp });
    if (!user) {
      return res.status(400).send('Invalid OTP or email');
    }
    user.isVerified = true;
    user.otp = null; // Clear OTP after successful verification
    await user.save();
    res.status(200).send('Email verified successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/user', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const JWT_SECRET = '383290605e178261b3c96a6209859742f6d2a78c79617b3ed7bccabecedd72b0dd6c81b69c49315f1dca94777f650a68836ade42fa955fe55a231f00f07bfeae';
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).send('No user found');
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
