const { Sequelize } = require("sequelize");
const config = require("../config/config");
const { setUpModels } = require("../models/index");

const USER = encodeURIComponent(config.dbUser); //Codifica caracteres especiales en UTF-8 ex " " (espacio) --> "%20"
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const sequelize = new Sequelize(URI, {
  dialect: "postgres",
});

setUpModels(sequelize);

module.exports = sequelize;
