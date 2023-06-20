const { statusCode, messages } = require("./constant");

const responseHelper = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");

  res.success = (message, data = null) => {
    res.status(statusCode.SUCCESS).json({
      code: statusCode.SUCCESS,
      message,
      data,
    });
  };
  res.serverError = (err) => {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      code: statusCode.INTERNAL_SERVER_ERROR,
      message: messages.SERVER_ERROR,
      error: err.message,
    });
  };

  res.validationError = (message) => {
    res.status(statusCode.BAD_REQUEST).json({
      code: statusCode.BAD_REQUEST,
      message,
    });
  };
  res.notFound = (message) => {
    res.status(statusCode.NOT_FOUND).json({
      code: statusCode.NOT_FOUND,
      message,
    });
  };

  next();
};

module.exports = { responseHelper };
