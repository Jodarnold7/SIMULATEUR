import React from "react";
import { Table, TableCell, TableRow, TableHead } from "@mui/material";
const LoanDetails = (props) => {
  return (
    <>
      <Table style={{ border: "25px solid #CCCC" }} aria-label="Simple tabled">
        <TableHead>
          <TableRow>
            <TableCell className="ETableCellText">
              <strong>Loan Amount</strong>
            </TableCell>
            <TableCell className="ETableCellVal">
              <strong>{props.amount}</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="ETableCellText">
              <strong>Type Loan</strong>
            </TableCell>
            <TableCell className="ETableCellVal">
              <strong>{props.type}</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="ETableCellText">
              <strong>Interest %</strong>
            </TableCell>
            <TableCell className="ETableCellVal">
              <strong>{props.interest}</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="ETableCellText">
              <strong>Tenure (Months)</strong>
            </TableCell>
            <TableCell className="ETableCellVal">
              <strong>{props.tenure}</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="ETableCellText">
              <strong>EMI (Monthly)</strong>
            </TableCell>
            <TableCell className="ETableCellVal">
              <strong>{props.emi}</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="ETableCellText">
              <strong>Total Interest</strong>
            </TableCell>
            <TableCell className="ETableCellVal">
              <strong>{props.TotalAmountOfInterest}</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="ETableCellText">
              <strong>Total Payment</strong>
              <br /> (Loan Amount + Interest)
            </TableCell>
            <TableCell className="ETableCellVal">
              <strong>{props.totalAmount ? props.totalAmount : 0}</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="ETableCellText">
              <strong>Loan Status</strong>
            </TableCell>
            <TableCell className="ETableCellVal">
              <strong>{props.status}</strong>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </>
  );
};

export default LoanDetails;
