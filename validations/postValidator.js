const { createPostSchema, updatePostSchema } = require("./postSchema");

const createPostValidator = async (req, res, next) => {
  const { error } = createPostSchema.validate(req.body);
  if (error) {
    return res.validationError(error.details[0].message);
  }
  return next();
};

const updatePostValidator = async (req, res, next) => {
  const { error } = updatePostSchema.validate(req.body);
  if (error) {
    return res.validationError(error.details[0].message);
  }
  return next();
};

module.exports = {
  createPostValidator,
  updatePostValidator,
};
