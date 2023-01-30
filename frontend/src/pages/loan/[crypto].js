import Head from "next/head";
import React, { useEffect } from "react";
import LoanService from "src/services/loan.service";
import LoanDetails from "src/components/loan/LoanDetails";
import UserService from "src/services/user.service";
import { DashboardLayout } from "src/components/dashboard-layout";
import { useRouter } from "next/router";
import { Pie } from "react-chartjs-2";
import { Grid, Table, TableRow, TableCell, CardContent } from "@mui/material";
function Loan({ Loan }) {
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      await UserService.getUserBoard().catch((err) => {
        router.push("/signin");
      });
    };
    fetchUser();
  }, []);

  return (
    <>
      <Head>
        <title>Loan Details</title>
      </Head>
      <Grid item lg={12} md={12} xs={12}>
        <CardContent>
          <Grid container>
            <Grid item md={8} xs={12}>
              <Table>
                <TableRow>
                  <TableCell>
                    <LoanDetails
                      amount={Loan.loan.amount}
                      status={Loan.loan.status}
                      type={Loan.loan.type}
                      interest={Loan.loan.totalInterest}
                      tenure={Loan.loan.tenure}
                      emi={Loan.loan.emiMonthly}
                      totalAmount={Loan.loan.totalPayment}
                      TotalAmountOfInterest={Loan.loan.totalInterest}
                    />
                  </TableCell>
                </TableRow>
              </Table>
            </Grid>
            <Grid item md={4} xs={12}>
              <Pie
                data={{
                  labels: ["Total Interest", "Total Amount"],
                  datasets: [
                    {
                      data: [Loan.loan.totalInterest, Loan.loan.amount],
                      backgroundColor: ["red", "blue"],
                    },
                  ],
                }}
                width={300}
                height={300}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Grid>{" "}
    </>
  );
}
export async function getStaticPaths() {
  const loans = await fetch("http://localhost:5000/all/loans");
  const loansJson = await loans.json();
  const paths = await loansJson.loans.map((loan) => ({
    params: { crypto: loan.loanToken },
  }));
  return { paths, fallback: "blocking" };
}
export async function getStaticProps({ params }) {
  const loan = await LoanService.oneLoan(params.crypto);
  const Loan = loan.data;
  return {
    props: { Loan },
    revalidate: 10,
  };
}
Loan.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Loan;
