const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    // unique: [true, "username is unique"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    // unique: [true, "email is unique"],
  },
  password: {
    type: String,
    required: [true, "password must be required"],
    // min: 8,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  // console.log(candidatePassword, userPassword);
  return await bcrypt.compare(candidatePassword, userPassword);
  // console.log(await bcrypt.compare(candidatePassword, userPassword));
};
userSchema.methods.generateAuthToken = async function () {
  // console.log("function called");
  const user = { ...this };
  console.log("this ", this);
  console.log("user", user);
  user.password = undefined;
  // console.log(user);
  const token = jwt.sign({ user }, process.env.JWT_SECRET);
  // console.log(token);
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
