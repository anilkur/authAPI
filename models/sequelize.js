const { Sequelize } = require('sequelize');
require('dotenv').config();
// .env dosyasındaki bilgileri alır

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
  dialect: 'postgres', // Dialect olarak 'postgres' belirtiyoruz
  logging: false, // SQL sorgularını konsolda görmek istemiyorsanız 'false' yapabilirsiniz
  dialectOptions: {
    ssl: {
      require: true, // SSL kullanmanız gerekebilir, bu yüzden bunu belirtelim
      rejectUnauthorized: false
    }
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Veritabanına başarıyla bağlanıldı.');
  })
  .catch(err => {
    console.error('Veritabanına bağlanılamadı:', err);
  });

module.exports = sequelize;
