const db = require("../models");
const config = require("../config/auth.config");
const { user: User, refreshToken: RefreshToken } = db;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { validationResult, body } = require("express-validator");
exports.validate = (method) => {
  switch (method) {
    case "signup": {
      return [
        body("email", "Invalid Email").isEmail(),
        body("password", "Invalid Password").isStrongPassword(),
      ];
    }
    case "signin": {
      return [
        body("email", "Invalid Email").isEmail(),
        body("password", "Invalid Password").isStrongPassword(),
      ];
    }
  }
};
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  User.findOne({
    where: { email: req.body.email },
  }).then((user) => {
    if (user) {
      return res.status(200).send({
        message: "Email already exist",
      });
    } else {
      User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      })
        .then(async (user) => {
          const token = jwt.sign({ userId: user.id }, config.secret, {
            expiresIn: config.jwtExpiration,
          });
          let refreshToken = await RefreshToken.createToken(user);
          res.status(200).send({
            id: user.id,
            email: user.email,
            accessToken: token,
            refreshToken: refreshToken,
            message: "Signup Success",
          });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    }
  });
};
exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      const token = jwt.sign({ userId: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
      let refreshToken = await RefreshToken.createToken(user);
      res.status(200).send({
        id: user.id,
        email: user.email,
        accessToken: token,
        refreshToken: refreshToken,
        message: "Signin Success",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }
  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });
    console.log(refreshToken);
    if (!refreshToken) {
      return res
        .status(403)
        .json({ message: "Refresh token is not in database!" });
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });
      return res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
    }
    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ userId: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
