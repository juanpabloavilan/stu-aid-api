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

/**
 * Ruta de cursos
 * /courses/
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    console.log("entro");
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
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getCourseSchema, "params"),
  checkOwnerPermission(Course, "params", "id"),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const course = await Course.findById(id);
      return res.json(course);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getCourseSchema, "params"),
  validatorHandler(updateCourseSchema, "body"),
  checkOwnerPermission(Course, "params", "id"),
  async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;
    try {
      const updatedCourse = await Course.update(id, payload);
      res.json(updatedCourse);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(deletedCourseSchema, "params"),
  checkOwnerPermission(Course, "params", "id"),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedCourse = await Course.delete(id);
      return res.json(deletedCourse);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
