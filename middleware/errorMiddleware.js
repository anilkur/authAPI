// middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Hata loglama
  
    res.status(500).json({
      message: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.'
    });
  };
  
  module.exports = errorHandler;
  