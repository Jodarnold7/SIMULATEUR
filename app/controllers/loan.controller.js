const db = require("../models");
const config = require("../config/auth.config");
const { loan: Loan, user: User } = db;
var jwt = require("jsonwebtoken");
exports.addLoan = async (req, res) => {
  Loan.create({
    type: req.body.type,
    monthlyIncome: req.body.monthlyIncome,
    amount: req.body.amount,
    description: req.body.description,
    interest: req.body.interest,
    tenure: req.body.tenure,
    emiMonthly: req.body.emiMonthly,
    totalInterest: req.body.totalInterest,
    totalPayment: req.body.totalPayment,
    userId: req.user,
  })
    .then((loan) => {
      const jwtToken = jwt.sign({ loanToken: loan.id }, config.loanToken);
      Loan.update({ loanToken: jwtToken }, { where: { id: loan.id } })
        .then(() => {
          return res.status(200).send({
            message: "Successful Loan",
            loanToken: jwtToken,
          });
        })
        .catch((err) => {
          return res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};
exports.allLoans = (req, res) => {
  Loan.findAll({ where: { id: req.user } })
    .then((loans) => {
      res.status(200).send({ loans });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};
exports.Loans = (req, res) => {
  Loan.findAll()
    .then((loans) => {
      res.status(200).send({ loans });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};
exports.oneLoan = async (req, res) => {
  if (!req.params.loanToken) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(req.params.loanToken, config.loanToken, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    Loan.findOne({
      where: { id: decoded.loanToken },
    })
      .then((loan) => {
        return res.status(200).json({
          loan,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });
};
