const mongoose = require("mongoose");

const id = new mongoose.Types.ObjectId();
const user = {
  _id: id,
  username: "jeel",
  email: "jeel@gmail.com",
  password: "1234",
};
const post1 = {
  _id: new mongoose.Types.ObjectId(),
  title: "new post1 of jeel",
  description: "this is post releated coding",
  creator: id,
};
const post2 = {
  _id: new mongoose.Types.ObjectId(),
  title: "new post2 of jeel",
  description: "this is post releated coding",
  creator: id,
};
const post3 = {
  _id: new mongoose.Types.ObjectId(),
  title: "new post3 of jeel",
  description: "this is post releated coding",
  creator: id,
};

module.exports = {
  user,
  post1,
  post2,
  post3,
};
