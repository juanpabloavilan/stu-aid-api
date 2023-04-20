const Joi = require("joi");

const id = Joi.number().integer();
const subjectId = Joi.number().integer();
const type = Joi.string().valid("front-reverse", "true-false", "elaborated");
const status = Joi.string().valid("active", "unactive");
const payload = Joi.when("type", [
  {
    is: "front-reverse",
    then: Joi.object().keys({
      front: Joi.string().required(),
      back: Joi.string().required(),
    }),
  },
  {
    is: "true-false",
    then: Joi.object().keys({
      front: Joi.string().required(),
      back: Joi.object().keys({
        answer: Joi.string().valid("true", "false"),
      }),
    }),
  },
  {
    is: "elaborated",
    then: Joi.object().keys({
      front: Joi.string().required(),
      back: Joi.object().keys({
        answer: Joi.string().required(),
      }),
    }),
  },
]);

const lastReviewed = Joi.string().isoDate().allow(null);
const lastScore = Joi.number().allow(null);
const createdAt = Joi.string().isoDate().allow(null);
const updatedAt = Joi.string().isoDate().allow(null);

const UPSERT_FLASHCARD_SCHEMA = Joi.object({
  id: id,
  subjectId: subjectId.required(),
  type: type.required(),
  status,
  payload: payload.required(),
  lastReviewed,
  lastScore,
  createdAt,
  updatedAt,
});

const FLASHCARD = {
  id: id,
  subjectId: subjectId.required(),
  type: type.required(),
  status,
  payload: payload.required(),
  lastReviewed,
  lastScore,
  createdAt,
  updatedAt,
};

const DELETE_FLASHCARD_SCHEMA = Joi.object({
  flashcardId: id.required(),
  courseId: id.required(),
  subjectId: id.required(),
});
module.exports = {
  UPSERT_FLASHCARD_SCHEMA,
  FLASHCARD,
  DELETE_FLASHCARD_SCHEMA,
};
