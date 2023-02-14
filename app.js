const express = require("express");
const cors = require("cors");
const passport = require("passport");
const apiMiddlewares = require("./middlewares");
const routesApi = require("./routes");
const setUpAuthStrategies = require("./utils/auth/");

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
setUpAuthStrategies();

//Añadiendo rutas del api
routesApi(app);
//Añadiendo middlewares
apiMiddlewares(app);

module.exports = app;
