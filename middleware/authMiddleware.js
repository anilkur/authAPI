// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token eksik, erişim reddedildi.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Token'dan gelen kullanıcı bilgisini request'e ekle
    next();
  } catch (err) {
    res.status(401).json({ message: 'Geçersiz token, erişim reddedildi.' });
  }
};

module.exports = authMiddleware;
