const jwt = require("jsonwebtoken");
const { Error } = require("../utils/error");

const auth = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(" ");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    return next();
  } catch (err) {
    return Error(res, 500, "Internal Server Error");
  }
};
module.exports = auth;
