const Joi = require("joi");

const id = Joi.number().positive();
const nombreCompleto = Joi.string().min(2).max(255);
const correo = Joi.string().email();
const password = Joi.string().alphanum().min(8).max(32);

const createUserSchema = Joi.object({
  nombreCompleto: nombreCompleto.required(),
  correo: correo.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  id: id.required(),
  nombreCompleto: nombreCompleto,
  correo: correo,
  password: password,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
