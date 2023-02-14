const express = require("express");
const cookieParser = require("cookie-parser");

const logger = require("morgan");
const {
  logHttpError,
  boomErrorHandler,
  errorHandler,
} = require("./error.handler");

function apiMiddlewares(app) {
  app.use(logger("dev"));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(logHttpError);
  app.use(boomErrorHandler);
  app.use(errorHandler);
}

module.exports = apiMiddlewares;
