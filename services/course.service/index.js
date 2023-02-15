const boom = require("@hapi/boom");
const { models } = require("../../lib/sequelize");

class CourseService {
  constructor() {}

  async isOwner(userLoggedId, courseId) {
    const isCourseOwner = await models.Course.findOne({
      where: {
        id: courseId,
        userId: userLoggedId,
      },
    });
    console.log(isCourseOwner);
    return Boolean(isCourseOwner);
  }

  async findAll() {
    const courses = await models.Course.findAll();
    return courses;
  }
  async findAllByStudentId(studentId) {
    console.log("FindAllByStudentId");
    const studentCourses = await models.Course.findAll({
      where: {
        userId: studentId,
      },
    });
    return studentCourses;
  }
  async findById(id) {
    const course = await models.Course.findByPk(id, { include: "subjects" });
    console.log(course, "From service");
    if (!course) throw boom.notFound("Course not found by this id");
    return course;
  }
  async create(data) {
    const newCourse = await models.Course.create(data);
    return newCourse;
  }
  async update(id, payload) {
    const oldCourse = await this.findById(id);
    const updatedCourse = await oldCourse.update(payload);
    return updatedCourse;
  }
  async delete(id) {
    const courseFound = await this.findById(id);
    const deletedCourse = await courseFound.destroy();
    return { deletedCourse, id };
  }
}

module.exports = CourseService;
