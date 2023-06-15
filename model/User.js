const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password must be required"],
    min: 8,
    select: false,
  },
});

userSchema.pre("save", async function hashPassword(next) {
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

userSchema.methods.correctPassword = async function correctPassword(
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.generateAuthToken = async function generateToken() {
  const user = this.toObject();
  delete user.password;
  const token = jwt.sign(user, process.env.JWT_SECRET);
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
