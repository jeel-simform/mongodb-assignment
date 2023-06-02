require("dotenv").config();

const express = require("express");

const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const { responseHelper } = require("./utils/response");
const { errorMiddleware } = require("./utils/errorMiddleware");

const userRouter = require("./router/user");
const postRouter = require("./router/post");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(responseHelper);
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());

app.use(userRouter);
app.use(postRouter);

app.use(errorMiddleware);
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
