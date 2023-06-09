const express = require("express");

const auth = require("../middleware/auth");
const {
  registerValidator,
  updateValidator,
  uniqueFieldChecker,
  loginValidator,
} = require("../validations/userValidator");

const router = express.Router();
const { register, login, updateUser } = require("../controller/user");

router.post("/register", registerValidator, uniqueFieldChecker, register);

router.post("/login", loginValidator, login);

router.put("/update-me", auth, updateValidator, uniqueFieldChecker, updateUser);
module.exports = router;
