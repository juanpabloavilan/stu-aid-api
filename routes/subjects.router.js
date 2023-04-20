const express = require("express");
const router = express.Router({ mergeParams: true });
const SubjectService = require("../services/subjects.service");
const {
  CREATE_SUBJECT_SCHEMA,
  GET_SUBJECT_SCHEMA,
  UPSERT_SUBJECT_FLASHCARD_SCHEMA,
  DELETE_SUBJECT_SCHEMA,
} = require("../schemas/subjects.schema");
const validatorHandler = require("../middlewares/validator.handler");
const passport = require("passport");
const checkOwnerPermission = require("../middlewares/auth.handler");

router.use("/:subjectId/flashcards", require("./flashcards.router"));

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
  validatorHandler(UPSERT_SUBJECT_FLASHCARD_SCHEMA, "body"),
  checkOwnerPermission(Subject, "body", "courseId"),
  async (req, res, next) => {
    console.log(req.body);
    const payload = req.body;
    try {
      const newSubject = await Subject.upsert(payload);
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
