const db = require("../models");
const config = require("../config/auth.config");
const { user: User } = db;
var jwt = require("jsonwebtoken");
exports.userBoard = (req, res) => {
  User.findOne({ where: { id: req.user } })
    .then((user) => {
      return res.status(200).json({ user });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
