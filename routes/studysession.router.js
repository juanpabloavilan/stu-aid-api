const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const validatorHandler = require("../middlewares/validator.handler");
const checkOwnerPermission = require("../middlewares/auth.handler");
const {
  TODAY_SESSION,
  SUBJECTS_TO_REVIEW,
} = require("../schemas/studysession.schema");
const StudySessionService = require("../services/studysession.service");

const StudySession = new StudySessionService();

router.get(
  "/today",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(TODAY_SESSION, "query"),
  async (req, res, next) => {
    try {
      const userId = Number(req.user.sub);
      const flashcardsToReview = await StudySession.today(userId, req.query);
      // console.log(
      //   "🚀 ~ file: studysession.router.js:19 ~ flashcardsToReview:",
      //   flashcardsToReview,
      //   flashcardsToReview.length
      // );
      return res.json({ flashcards: flashcardsToReview });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/subjects-to-review",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(SUBJECTS_TO_REVIEW, "query"),
  async (req, res, next) => {
    try {
      const userId = Number(req.user.sub);
      const subjectsToReview = await StudySession.subjectsNeedRevision(
        userId,
        req.query
      );
      return res.json({ subjects: subjectsToReview });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
