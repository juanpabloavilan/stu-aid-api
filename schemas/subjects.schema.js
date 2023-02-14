const Joi = require("joi");

const id = Joi.number().integer();
const courseId = Joi.number().integer();
const name = Joi.string().min(2).max(255);
const status = Joi.string().valid("active", "unactive");

const CREATE_SUBJECT_SCHEMA = Joi.object({
  courseId: courseId.required(),
  name: name.required(),
  status: status,
});

const GET_SUBJECT_SCHEMA = Joi.object({
  id: id.required(),
  courseId: courseId.required(),
});

const UPDATE_SUBJECT_SCHEMA = Joi.object({
  id: id.required(),
  name,
  status,
});

const DELETE_SUBJECT_SCHEMA = Joi.object({
  id: id.required(),
});

module.exports = {
  CREATE_SUBJECT_SCHEMA,
  GET_SUBJECT_SCHEMA,
  UPDATE_SUBJECT_SCHEMA,
  DELETE_SUBJECT_SCHEMA,
};
