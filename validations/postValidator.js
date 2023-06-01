const { createPostSchema, updatePostSchema } = require("./postSchema");
const { Error } = require("../utils/error");

const createPostValidator = async (req, res, next) => {
  const { error } = createPostSchema.validate(req.body);
  if (error) {
    return Error(res, 404, error.details[0].message);
  }
  return next();
};

const updatePostValidator = async (req, res, next) => {
  const { error } = updatePostSchema.validate(req.body);
  if (error) {
    return Error(res, 404, error.details[0].message);
  }
  return next();
};

module.exports = {
  createPostValidator,
  updatePostValidator,
};
