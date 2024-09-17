const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // sequelize.js ile bağlantıyı getiriyoruz

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'users'  // Veritabanındaki tablo adı
});

module.exports = User;
