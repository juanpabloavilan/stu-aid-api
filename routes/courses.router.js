const express = require("express");
const router = express.Router();
const CourseService = require("../services/course.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createCourseSchema,
  getCourseSchema,
  updateCourseSchema,
  deletedCourseSchema,
} = require("../schemas/course.schema");
const passport = require("passport");
const checkOwnerPermission = require("../middlewares/auth.handler");
const Course = new CourseService();

const subjectsRouter = require("./subjects.router");

router.use("/:courseId/subjects", subjectsRouter);

/**
 * Ruta de cursos
 * /courses/
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let coursesList = [];
      const { sub } = req.user;
      coursesList = await Course.findAllByStudentId(Number(sub));
      console.log(sub);
      res.json(coursesList);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createCourseSchema, "body"),
  async (req, res, next) => {
    const data = req.body;
    const { sub } = req.user;
    try {
      const newCourse = await Course.create({ ...data, userId: Number(sub) });
      return res.json(newCourse);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/:courseId",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getCourseSchema, "params"),
  checkOwnerPermission(Course, "params", "courseId"),
  async (req, res, next) => {
    const { courseId } = req.params;
    try {
      const course = await Course.findById(courseId);
      return res.json(course);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:courseId",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getCourseSchema, "params"),
  validatorHandler(updateCourseSchema, "body"),
  checkOwnerPermission(Course, "params", "courseId"),
  async (req, res, next) => {
    const { courseId } = req.params;
    const payload = req.body;
    try {
      const updatedCourse = await Course.update(courseId, payload);
      res.json(updatedCourse);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:courseId",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(deletedCourseSchema, "params"),
  checkOwnerPermission(Course, "params", "courseId"),
  async (req, res, next) => {
    const { courseId } = req.params;
    try {
      const deletedCourse = await Course.delete(courseId);
      return res.json(deletedCourse);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
