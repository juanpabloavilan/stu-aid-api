const Joi = require("joi");

const limit = Joi.number().integer();
const offset = Joi.number().integer();
const subject = Joi.number().integer();
const course = Joi.number().integer();

const TODAY_SESSION = Joi.object({
  limit,
  offset,
  subject,
  course,
});

const SUBJECTS_TO_REVIEW = Joi.object({
  limit,
  offset,
});

module.exports = {
  TODAY_SESSION,
  SUBJECTS_TO_REVIEW,
};
