require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");

const userRouter = require("./router/user");
const postRouter = require("./router/post");

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(helmet());

app.use("/", userRouter);
app.use("/", postRouter);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("database connection established");
  })
  .catch((err) => {
    console.log(`database connection error: ${err}`);
  });

app.listen(port, () => {
  console.log(`server is listen on port${port}`);
});
