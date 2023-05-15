require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./router/user");
const postRouter = require("./router/post");

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/", userRouter);
app.use("/", postRouter);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("database connection established");
  })
  .catch((err) => {
    console.log("database connection error: " + err);
  });

app.listen(port, () => {
  console.log("server is listen on port" + port);
});
