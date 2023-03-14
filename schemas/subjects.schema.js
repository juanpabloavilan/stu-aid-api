const Joi = require("joi");

const subjectId = Joi.number().integer();
const courseId = Joi.number().integer();
const name = Joi.string().min(2).max(255);
const status = Joi.string().valid("active", "unactive");

const CREATE_SUBJECT_SCHEMA = Joi.object({
  courseId: courseId.required(),
  name: name.required(),
  status: status,
});

const GET_SUBJECT_SCHEMA = Joi.object({
  subjectId: subjectId.required(),
  courseId: courseId.required(),
});

const UPDATE_SUBJECT_SCHEMA = Joi.object({
  subjectId: subjectId.required(),
  name,
  status,
});

const DELETE_SUBJECT_SCHEMA = Joi.object({
  subjectId: subjectId.required(),
  courseId: courseId.required(),
});

module.exports = {
  CREATE_SUBJECT_SCHEMA,
  GET_SUBJECT_SCHEMA,
  UPDATE_SUBJECT_SCHEMA,
  DELETE_SUBJECT_SCHEMA,
};
