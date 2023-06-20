/* eslint-disable no-underscore-dangle */
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        message: "please provide authorization",
      });
    }
    const [, token] = req.headers.authorization.split(" ");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return next(err);
  }
};
module.exports = auth;
