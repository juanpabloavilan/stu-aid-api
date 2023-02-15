"use strict";

const { faker } = require("@faker-js/faker");
const { models } = require("../../lib/sequelize");
const { USERS_TABLE_NAME } = require("../models/user.model");
const { COURSES_TABLE_NAME } = require("../models/course.model");
const { SUBJECTS_TABLE_NAME } = require("../models/subject.model");

/** @type {import('sequelize-cli').Migration} */
const createRandomUser = () => {
  const fullname = faker.name.fullName();
  const email = faker.helpers.unique(faker.internet.email, [fullname]);
  const password = faker.internet.password(8);
  return {
    fullname,
    email,
    password,
  };
};

const createRandomCourse = (userId) => {
  return {
    name: faker.commerce.department(),
    userId: userId,
    priority: faker.datatype.number({ min: 1, max: 5 }),
    description: faker.commerce.productDescription(),
  };
};

const createUsers = () => {
  let users = [
    { fullname: "Test", email: "test@gmail.com", password: "hola1234" },
  ];
  for (let index = 0; index < 20; index++) {
    users.push(createRandomUser());
  }
  return users;
};

const createCourses = async (usersIds) => {
  const testUserId = await models.User.findOne({
    where: {
      email: "test@gmail.com",
    },
    returning: ["id"],
  });

  let courses = [
    {
      name: "Computer Science",
      userId: testUserId.id,
      priority: 2,
      description: "Monday through Friday from 8am to 10am",
    },
    {
      name: "Algorithms",
      userId: testUserId.id,
      priority: 3,
      description: "Monday through Friday from 10am to 11am",
    },
    {
      name: "Literature",
      userId: testUserId.id,
      priority: 3,
      description: "Saturda through Sunday from 10am to 11am",
    },
  ];
  usersIds.forEach(({ id }) => {
    for (let index = 0; index < 3; index++) {
      courses.push(createRandomCourse(id));
    }
  });
  return courses;
};

const createRandomSubject = (courseId) => {
  return {
    courseId: courseId,
    name: faker.hacker.noun(),
    status: faker.helpers.arrayElement(["active", "unactive"]),
  };
};

const createSubjects = async (courseId) => {
  const testUserId = await models.User.findOne({
    where: {
      email: "test@gmail.com",
    },
    returning: ["id"],
  });
  const literatureCourseId = await models.Course.findOne({
    where: {
      name: "Literature",
      userId: testUserId.id,
    },
    returning: ["id"],
  });

  const algorithmCourseId = await models.Course.findOne({
    where: {
      name: "Algorithms",
      userId: testUserId.id,
    },
    returning: ["id"],
  });

  let subjects = [
    {
      courseId: algorithmCourseId.id,
      name: "Prim's algorithm",
    },
    {
      courseId: algorithmCourseId.id,
      name: "Kruskal's algorithm",
    },
    {
      courseId: literatureCourseId.id,
      name: "Macbeth",
    },
    {
      courseId: literatureCourseId.id,
      name: "Romeo y Julieta",
    },
  ];

  courseId.forEach(({ id }) => {
    subjects.push(createRandomSubject(id));
  });

  return subjects;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    let users = await models.User.bulkCreate(createUsers(), {
      returning: ["id"],
    });
    console.log("userIds", users);

    let courses = await createCourses(users);
    console.log("courses", courses);
    let coursesIds = await models.Course.bulkCreate(courses, {
      returning: ["id"],
    });
    console.log("coursesIds", coursesIds);

    let subjects = await createSubjects(coursesIds);
    let subjectsIds = await models.Subject.bulkCreate(subjects, {
      returning: ["id"],
    });

    console.log("subjectsIds", subjectsIds);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete(SUBJECTS_TABLE_NAME, null, {});
    queryInterface.bulkDelete(COURSES_TABLE_NAME, null, {});
    queryInterface.bulkDelete(USERS_TABLE_NAME, null, {});
    console.log("Records borrados");
  },
};
