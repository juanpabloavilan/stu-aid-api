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

const CREATE_FLASHCARD_SCHEMA = Joi.object({
  subjectId: subjectId.required(),
  type: type.required(),
  status,
  payload: payload.required(),
});
