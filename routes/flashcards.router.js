const express = require("express");
const router = express.Router({ mergeParams: true });
const validatorHandler = require("../middlewares/validator.handler");
const passport = require("passport");
const checkOwnerPermission = require("../middlewares/auth.handler");
const FlashcardService = require("../services/flashcards.service");
const {
  UPSERT_FLASHCARD_SCHEMA,
  DELETE_FLASHCARD_SCHEMA,
} = require("../schemas/flashcard.schema");

const Flashcard = new FlashcardService();
/**
 * /courses/:courseId/subjects/subjectId
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(UPSERT_FLASHCARD_SCHEMA, "body"),
  checkOwnerPermission(Flashcard, "params", "courseId"),
  async (req, res, next) => {
    const payload = req.body;
    const userId = Number(req.user.sub);

    try {
      const newFlashcard = await Flashcard.upsert({ ...payload, userId });
      return res.json(newFlashcard);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:flashcardId",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(DELETE_FLASHCARD_SCHEMA, "params"),
  checkOwnerPermission(Flashcard, "params", "courseId"),
  async (req, res, next) => {
    const { flashcardId } = req.params;
    try {
      const deletedFlashcard = await Flashcard.delete(flashcardId);
      return res.json(deletedFlashcard);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
