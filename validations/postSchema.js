const Joi = require("joi");

const baseSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
});

const createPostSchema = baseSchema.options({
  presence: "required",
});

const updatePostSchema = baseSchema;

module.exports = {
  createPostSchema,
  updatePostSchema,
};
