// models/userModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

// User model tanımlaması
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
