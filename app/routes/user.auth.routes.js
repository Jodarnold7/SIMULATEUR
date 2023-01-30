const controller = require("../controllers/user.auth.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/signup", controller.validate("signup"), controller.signup);
  app.post("/refreshtoken", controller.refreshToken);
  app.post("/signin", controller.validate("signin"), controller.signin);
};
