const express = require('express');
const app = express();
const User = require('./models/userModel');
 // Kullanıcı modelini doğru şekilde getiriyoruz
const sequelize = require('./models/sequelize'); // Sequelize bağlantısını getir

app.use(express.json()); // JSON verileri almak için

// Veritabanındaki tüm kullanıcıları getir
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();  // Veritabanındaki tüm kullanıcıları çek
    console.log(users);  // Terminalde göster
    res.status(200).json(users);  // JSON formatında döndür
  } catch (err) {
    console.error('Veritabanından veri çekme hatası:', err);
    res.status(500).json({ error: 'Veritabanından veri çekilemedi' });
  }
});

const port = 20002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
