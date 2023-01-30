import api from "./api";
import ap from "./ap";
const addLoan = (
  type,
  monthlyIncome,
  description,
  amount,
  interest,
  tenure,
  emiMonthly,
  totalInterest,
  totalPayment
) => {
  return api.post("/add/loan", {
    type,
    monthlyIncome,
    description,
    amount,
    interest,
    tenure,
    emiMonthly,
    totalInterest,
    totalPayment,
  });
};
const oneLoan = (loanToken) => {
  return ap.get(`http://localhost:5000/loan/${loanToken}`);
};
const loans = () => {
  return api.get("http://localhost:5000/loans");
};
const LoanService = { addLoan, oneLoan, loans };
export default LoanService;
