const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // const token = req.header("Authorization").replace("Bearer", "");
    [, token] = req.headers.authorization.split(" ");
    // console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(500).json({
      message: "please authenticate",
    });
  }
};
module.exports = auth;
