const config = require("../config/config");

const USER = encodeURIComponent(config.dbUser); //Codifica caracteres especiales en UTF-8 ex " " (espacio) --> "%20"
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: "postgres",
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeSeeders",
  },
  production: {
    url: URI,
    dialect: "postgres",
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeSeeders",
  },
};
