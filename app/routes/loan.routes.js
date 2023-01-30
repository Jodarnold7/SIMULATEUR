const { userAuthJwt } = require("../middleware");
const controller = require("../controllers/loan.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/add/loan", [userAuthJwt.verifyUserToken], controller.addLoan);
  app.get("/loan/:loanToken", controller.oneLoan);
  app.get("/loans", [userAuthJwt.verifyUserToken], controller.allLoans);
  app.get("/all/loans", controller.Loans);
};
