// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Daha sonra oluşturacağımız user model
const config = require('../config');

// Signup işlemi
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Şifreyi hashleme
    const hashedPassword = await bcrypt.hash(password, 10);
    // Yeni kullanıcı oluşturma
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Login işlemi
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Kullanıcıyı email ile bulma
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Şifre doğrulama
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // JWT oluşturma
    const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: config.jwtExpire });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
