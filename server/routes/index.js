// const router = require("express").Router();
// const Router = require('express-promise-router')
module.exports = {
  usersRouter: require("./users"),
  recordsRouter: require("./records"),
  quotesRouter: require('./quotes')
  // graphsRouter: require("./graphs"),
};
