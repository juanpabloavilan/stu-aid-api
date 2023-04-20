const Joi = require("joi");
const { UPSERT_FLASHCARD_SCHEMA, FLASHCARD } = require("./flashcard.schema");

const subjectId = Joi.number().integer();
const courseId = Joi.number().integer();
const name = Joi.string().min(2).max(255);
const status = Joi.string().valid("active", "unactive");
const createdAt = Joi.string().isoDate().allow(null);
const updatedAt = Joi.string().isoDate().allow(null);

const CREATE_SUBJECT_SCHEMA = Joi.object({
  courseId: courseId.required(),
  name: name.required(),
  status: status,
});

const GET_SUBJECT_SCHEMA = Joi.object({
  subjectId: subjectId.required(),
  courseId: courseId.required(),
});

const UPSERT_SUBJECT_FLASHCARD_SCHEMA = Joi.object({
  courseId: courseId.required(),
  id: subjectId,
  name: name.required(),
  status,
  flashcards: Joi.array().items(UPSERT_FLASHCARD_SCHEMA),
});

const DELETE_SUBJECT_SCHEMA = Joi.object({
  subjectId: subjectId.required(),
  courseId: courseId.required(),
});

module.exports = {
  UPSERT_SUBJECT_FLASHCARD_SCHEMA,
  GET_SUBJECT_SCHEMA,
  DELETE_SUBJECT_SCHEMA,
};
