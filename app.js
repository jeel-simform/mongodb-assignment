require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? "test.env" : ".env",
});

const express = require("express");

const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const { responseHelper } = require("./utils/response");
const { errorMiddleware } = require("./utils/errorMiddleware");

const swaggerJsDocs = YAML.load("./api.yaml");

const userRouter = require("./router/user");
const postRouter = require("./router/post");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

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
    console.log(`database connection established${process.env.DATABASE_URL}`);
  })
  .catch((err) => {
    console.log(`database connection error: ${err}`);
  });
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`server is listen on port${port}`);
  });
}
module.exports = app;
