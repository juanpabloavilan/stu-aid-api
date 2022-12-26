const { Sequelize } = require("sequelize");
const { USERS_TABLE_NAME, USERS_SCHEMA } = require("./user.model");

async function setUpModels(sequelize) {
  sequelize.define("User", USERS_SCHEMA, {
    sequelize,
    tableName: USERS_TABLE_NAME,
  });
  await sequelize.sync();
  console.log("modelos sincronizados con la db");
}

module.exports = { setUpModels };
