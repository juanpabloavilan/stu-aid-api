const Joi = require("joi");

const courseId = Joi.number().positive();
const name = Joi.string().min(1).max(255);
const status = Joi.string().valid("active", "dismissed");
const priority = Joi.number().integer().min(1).max(5);
const userId = Joi.number().integer();
const description = Joi.string();

const createCourseSchema = Joi.object({
  name: name.required(),
  status: status,
  priority: priority,
  description: description,
});

const updateCourseSchema = Joi.object({
  name: name,
  status: status,
  priority: priority,
  description: description,
});

const getCourseSchema = Joi.object({
  courseId: courseId.required(),
});

const deletedCourseSchema = Joi.object({
  courseId: courseId.required(),
});

module.exports = {
  createCourseSchema,
  updateCourseSchema,
  getCourseSchema,
  deletedCourseSchema,
};
