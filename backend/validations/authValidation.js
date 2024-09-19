const joi = require("joi");

//validation schema for user
const registerValidationSchema = joi.object({
  username: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const loginValidationSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

module.exports = { registerValidationSchema, loginValidationSchema };
