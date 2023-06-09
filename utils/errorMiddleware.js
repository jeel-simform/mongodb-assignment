const errorMiddleware = (err, req, res, next) => {
  res.serverError(err);
  next();
};

module.exports = { errorMiddleware };
