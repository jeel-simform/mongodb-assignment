const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(" ");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    return next();
  } catch (err) {
    return next(err);
  }
};
module.exports = auth;
