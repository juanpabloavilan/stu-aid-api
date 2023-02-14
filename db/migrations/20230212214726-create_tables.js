"use strict";
const { USERS_SCHEMA, USERS_TABLE_NAME } = require("../models/user.model");
const {
  COURSES_SCHEMA,
  COURSES_TABLE_NAME,
} = require("../models/course.model");
const {
  SUBJECTS_SCHEMA,
  SUBJECTS_TABLE_NAME,
} = require("../models/subject.model");
const {
  FLASHCARDS_SCHEMA,
  FLASHCARDS_TABLE_NAME,
} = require("../models/flashcard.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USERS_TABLE_NAME, USERS_SCHEMA);
    await queryInterface.createTable(COURSES_TABLE_NAME, COURSES_SCHEMA);
    await queryInterface.createTable(SUBJECTS_TABLE_NAME, SUBJECTS_SCHEMA);
    await queryInterface.createTable(FLASHCARDS_TABLE_NAME, FLASHCARDS_SCHEMA);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  },
};
