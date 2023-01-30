module.exports = (sequelize, Sequelize) => {
  const Loan = sequelize.define(
    "loan",
    {
      type: {
        type: Sequelize.STRING,
      },
      monthlyIncome: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      interest: {
        type: Sequelize.STRING,
      },
      tenure: {
        type: Sequelize.STRING,
      },
      emiMonthly: {
        type: Sequelize.STRING,
      },
      loanToken: {
        type: Sequelize.STRING,
      },
      totalInterest: {
        type: Sequelize.STRING,
      },
      totalPayment: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "pending",
        validate: {
          isIn: [["pending", "accepted", "refused"]],
        },
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Loan;
};
