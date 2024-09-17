const express = require('express');
const app = express();
const User = require('./models/userModel');
const sequelize = require('./models/sequelize');
const bcrypt = require('bcrypt');
const errorHandler = require('./middleware/errorMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes'); // Kayıt ve Giriş rotalarını ekledik

app.use(express.json()); // JSON verileri almak için

// Auth rotalarını kullan
app.use('/auth', authRoutes);

// Veritabanındaki tüm kullanıcıları getir (JWT doğrulaması ekledik)
app.get('/users', authMiddleware, async (req, res) => {
  try {
    const users = await User.findAll();  // Veritabanındaki tüm kullanıcıları çek
    res.status(200).json(users);  // JSON formatında döndür
  } catch (err) {
    console.error('Veritabanından veri çekme hatası:', err);
    res.status(500).json({ error: 'Veritabanından veri çekilemedi' });
  }
});

// Veritabanı tablolarını senkronize etme
sequelize.sync({ force: false })  // force: true olursa tabloyu sıfırlar
  .then(() => {
    console.log('Veritabanı senkronize edildi');
  })
  .catch(err => {
    console.error('Veritabanı senkronize edilemedi:', err);
  });

// Belirli bir kullanıcıyı silme (JWT doğrulaması ekledik)
app.delete('/users/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);  // ID'ye göre kullanıcıyı bul
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }
    
    await user.destroy();  // Kullanıcıyı sil
    res.status(200).json({ message: 'Kullanıcı başarıyla silindi' });
  } catch (err) {
    console.error('Kullanıcı silme hatası:', err);
    res.status(500).json({ error: 'Kullanıcı silinemedi' });
  }
});

const port = 20002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
