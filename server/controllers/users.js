const models = require("../models/users");
module.exports = {
  login: function (req, res) {
    models
      .login(req.query)
      .then((response) => {
        console.log("login response", response);
        res.send(response);
      })
      .catch((err) => {
        console.log("err code", err);
        res.status(401).send(err);
      });
  },
  register: function (req, res) {
    models
      .register(req.query)
      .then((response) => {
        console.log("register response", response);
        res.send(response);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(402).send(err);
      });
  },

  storeUserData: function (req, res) {
    models
      .storeUserData(req.body)
      .then((response) => {
        res.send(response);
      })
      .catch((err) => {
        console.log("err", err);
        res.status(403).send(err);
      });
  },
};
