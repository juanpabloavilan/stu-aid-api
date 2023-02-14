const Joi = require("joi");

const id = Joi.number().positive();
const fullname = Joi.string().min(2).max(255);
const email = Joi.string().email();
const password = Joi.string().min(8).max(32);

const createUserSchema = Joi.object({
  fullname: fullname.required(),
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  id: id.required(),
  fullname: fullname,
  email: email,
  password: password,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
