const Joi = require("joi");

const baseSchema = Joi.object({
  username: Joi.string().alphanum().min(3),
  email: Joi.string().email(),
  password: Joi.string(),
});

const registerUserSchema = baseSchema.options({
  presence: "required",
});

const updateUserSchema = baseSchema.keys({});

const loginUserSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().required(),
});

module.exports = { registerUserSchema, updateUserSchema, loginUserSchema };
