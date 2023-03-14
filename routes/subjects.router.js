const express = require("express");
const router = express.Router({ mergeParams: true });
const SubjectService = require("../services/subjects.service");
const {
  CREATE_SUBJECT_SCHEMA,
  GET_SUBJECT_SCHEMA,
  UPDATE_SUBJECT_SCHEMA,
  DELETE_SUBJECT_SCHEMA,
} = require("../schemas/subjects.schema");
const validatorHandler = require("../middlewares/validator.handler");
const passport = require("passport");
const checkOwnerPermission = require("../middlewares/auth.handler");

// courses/:id/subjects/
const Subject = new SubjectService();

router.get("/", (req, res) => {
  console.log(req.params);
  res.json({
    params: req.params,
  });
});
/**
 * Get subject info including flashcards
 */
router.get(
  "/:subjectId",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(GET_SUBJECT_SCHEMA, "params"),
  checkOwnerPermission(Subject, "params", "courseId"),
  async (req, res, next) => {
    const { subjectId } = req.params;

    try {
      const subject = await Subject.findById(subjectId);
      return res.json(subject);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(CREATE_SUBJECT_SCHEMA, "body"),
  checkOwnerPermission(Subject, "body", "courseId"),
  async (req, res, next) => {
    const payload = req.body;

    try {
      const newSubject = await Subject.create(payload);
      return res.json(newSubject);
    } catch (error) {
      next(error);
    }
  }
);

router.put("/");

router.delete(
  "/:subjectId",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(DELETE_SUBJECT_SCHEMA, "params"),
  checkOwnerPermission(Subject, "params", "courseId"),
  async (req, res, next) => {
    const { subjectId } = req.params;

    try {
      const deletedSubject = await Subject.delete(subjectId);
      return res.json(deletedSubject);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
