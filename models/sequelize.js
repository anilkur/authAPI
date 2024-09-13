const { Sequelize } = require('sequelize');
require('dotenv').config();
// .env dosyasındaki bilgileri alır

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

sequelize.authenticate()
  .then(() => {
    console.log('Veritabanına başarıyla bağlanıldı.');
  })
  .catch(err => {
    console.error('Veritabanına bağlanılamadı:', err);
  });

module.exports = sequelize;
