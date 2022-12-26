const { Pool } = require("pg");
const config = require("../config/config");

const USER = encodeURIComponent(config.dbUser); //Codifica caracteres especiales en UTF-8 ex " " (espacio) --> "%20"
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
console.log(URI);
const pool = new Pool({
  connectionString: URI,
});

module.exports = pool;
