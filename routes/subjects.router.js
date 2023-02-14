const express = require("express");
const router = express.Router();
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

// /subjects/
const Subject = new SubjectService();

/**
 *
 */
router.get(
  "/:id/course/:courseId",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(GET_SUBJECT_SCHEMA, "params"),
  checkOwnerPermission(Subject, "params", "courseId"),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const subject = await Subject.findById(id);
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
    //courseId, name, status=null
    const payload = req.body;

    try {
      const newSubject = await Subject.create(payload);
      return res.json(newSubject);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
