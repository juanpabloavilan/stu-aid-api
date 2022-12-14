const express = require("express");
const apiMiddlewares = require("./middlewares");
const routesApi = require("./routes");

const app = express();

//Añadiendo rutas del api
routesApi(app);
//Añadiendo middlewares
apiMiddlewares(app);

module.exports = app;
