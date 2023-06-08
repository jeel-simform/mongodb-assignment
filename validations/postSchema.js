const Joi = require("joi");

const baseSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  // creator: Joi.string(),
});

const createPostSchema = baseSchema
  .keys({
    creator: Joi.string().optional(),
  })
  .options({
    presence: "required",
  });

const updatePostSchema = baseSchema.keys({});

module.exports = {
  createPostSchema,
  updatePostSchema,
};
