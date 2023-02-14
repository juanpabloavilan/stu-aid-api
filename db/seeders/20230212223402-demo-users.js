"use strict";

const { faker } = require("@faker-js/faker");
const { models } = require("../../lib/sequelize");
const { USERS_TABLE_NAME } = require("../models/user.model");
const { COURSES_TABLE_NAME } = require("../models/course.model");

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
    user_id: userId,
    priority: faker.datatype.number({ min: 1, max: 5 }),
    description: faker.commerce.productDescription(),
  };
};

const createUsers = () => {
  let users = [];
  for (let index = 0; index < 20; index++) {
    users.push(createRandomUser());
  }
  return users;
};

const createCourses = (usersIds) => {
  let courses = [];
  usersIds.forEach(({ id }) => {
    for (let index = 0; index < 3; index++) {
      courses.push(createRandomCourse(id));
    }
  });
  return courses;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    let usersIds = await queryInterface.bulkInsert(
      USERS_TABLE_NAME,
      createUsers(),
      {
        returning: ["id"],
      }
    );
    console.log("userIds", usersIds);
    let courses = createCourses(usersIds);
    console.log("courses", courses);
    let coursesIds = await queryInterface.bulkInsert(
      COURSES_TABLE_NAME,
      courses,
      { returning: ["id"] }
    );
    console.log("coursesIds", coursesIds);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete(USERS_TABLE_NAME, null, {});
    queryInterface.bulkDelete(COURSES_TABLE_NAME, null, {});
    console.log("Records borrados");
  },
};
