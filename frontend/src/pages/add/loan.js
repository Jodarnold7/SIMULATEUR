import Head from "next/head";
import React, { useState, useEffect } from "react";
import Slider from "@material-ui/core/Slider";
import { useRouter } from "next/router";
import { withStyles } from "@material-ui/core";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

import {
  Box,
  Paper,
  Stack,
  TextField,
  CircularProgress,
  Button,
  Grid,
  Alert,
  CardContent,
  Container,
} from "@mui/material";
import { Pie } from "react-chartjs-2";
import SliderMarks from "src/components/loan/SliderMarks";
import TableDetails from "src/components/loan/TableDetails";
import { TableCell, Table, TableRow } from "@mui/material";
import UserService from "src/services/user.service";
import { DashboardLayout } from "src/components/dashboard-layout";
import LoanService from "src/services/loan.service";
const ProttoSlider = withStyles({
  root: { color: "white" },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "white",
    border: "3px solid black",
    marginTop: -6,
    marginLeft: -6,
  },
  track: { height: 5, borderRadius: 4 },
  rail: { height: 8, borderRadius: 4 },
})(Slider);
import { styled } from "@mui/material/styles";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Loan() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("Business");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [description, setDescription] = useState("");
  const [loanToken, setLoanToken] = useState("");
  const [calculatorPage, setCalculatorPage] = useState(true);
  const [loanJustifyPage, setLoanJustifyPage] = useState(false);
  const [amount, setAmount] = useState(3000000);
  const [tenure, setTenure] = useState(147);
  const [interest, setInterest] = useState(7);
  const maxAmount = 15000000;
  const maxInterest = 20;
  const maxTenure = 240;
  const intr = interest / 1200;
  const emi = tenure ? Math.round((amount * intr) / (1 - Math.pow(1 / (1 + intr), tenure))) : 0;
  const totalAmount = tenure * emi;
  var totalAmountOfCredit = Math.round((emi / intr) * (1 - Math.pow(1 + intr, -tenure)));
  const TotalAmountOfInterest = Math.round(totalAmount - totalAmountOfCredit);
  useEffect(() => {
    const fetchUser = async () => {
      await UserService.getUserBoard().catch((err) => {
        router.push("/signin");
      });
    };
    fetchUser();
  }, []);
  const onNextPage = (e) => {
    setCalculatorPage(false);
    setLoanJustifyPage(true);
  };
  const handleChange = (e) => {
    setType(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangeMonthlyIncome = (e) => {
    setMonthlyIncome(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    LoanService.addLoan(
      type,
      monthlyIncome,
      description,
      amount,
      interest,
      tenure,
      emi,
      TotalAmountOfInterest,
      totalAmount
    ).then(
      (response) => {
        setCalculatorPage(false);
        setLoanJustifyPage(false);
        setSuccessful(true);
        setLoanToken(response.data.loanToken);
        setLoading(false);
        setMessage(response.data.message);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };
  return (
    <>
      <Head>
        <title>Nouveau pret | SIMULATEUR DE PRET</title>
      </Head>
      {calculatorPage && (
        <Box
          component="main"
          sx={{
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
            backgroundColor: "#004d66",
          }}
        >
          <Container maxWidth="sm">
            <Grid container>
              <>
                <form onSubmit={onNextPage}>
                  <stack sx={{ width: "100%" }} spacing={2}>
                    <Grid item lg={12} md={12} xs={12}>
                      <strong>Loan Amount</strong>
                      <ProttoSlider
                        marks={SliderMarks.marksAmount}
                        value={amount}
                        onChange={(event, vAmount) => {
                          setAmount(vAmount);
                        }}
                        defaultValue={amount}
                        max={maxAmount}
                      ></ProttoSlider>
                      <strong>Interest Rate %</strong>
                      <ProttoSlider
                        marks={SliderMarks.marksInterest}
                        value={interest}
                        onChange={(event, vInterest) => {
                          setInterest(vInterest);
                        }}
                        defaultValue={interest}
                        max={maxInterest}
                      ></ProttoSlider>
                      <strong>Tenure (Months)</strong>
                      <ProttoSlider
                        marks={SliderMarks.marksTenure}
                        value={tenure}
                        onChange={(event, vTenure) => {
                          setTenure(vTenure);
                        }}
                        defaultValue={tenure}
                        max={maxTenure}
                      ></ProttoSlider>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12}>
                      <CardContent>
                        <Grid container>
                          <Grid item md={8} xs={12}>
                            <Table>
                              <TableRow>
                                <TableCell>
                                  <TableDetails
                                    amount={amount}
                                    interest={interest}
                                    tenure={tenure}
                                    emi={emi}
                                    totalAmount={totalAmount}
                                    TotalAmountOfInterest={TotalAmountOfInterest}
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
                                    data: [TotalAmountOfInterest, amount],
                                    backgroundColor: ["#00cc99", "blue"],
                                  },
                                ],
                              }}
                              width={300}
                              height={300}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Grid>
                    <Box>
                      <Button color="info" fullWidth size="large" type="submit" variant="contained">
                        <PlayCircleFilledIcon />
                        {loading && (
                          <CircularProgress color="primary" thickness={8} value={50} size={20} />
                        )}
                      </Button>
                    </Box>
                  </stack>
                </form>
              </>
            </Grid>
          </Container>
        </Box>
      )}
      {loanJustifyPage && (
        <Box
          component="main"
          sx={{
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
            backgroundColor: "#004d66",
            paddingTop: 10,
            alignItems: "center",
          }}
        >
          <Container maxWidth="md">
            <Grid container>
              <>
                <form onSubmit={onSubmit}>
                  <Grid item sm={12} lg={12} md={12} xs={12}>
                    <Stack spacing={4}>
                      <Item>
                        <FormControl>
                          <InputLabel id="demo-controlled-open-select-label">
                            Type of Loan
                          </InputLabel>
                          <Select
                            fullWidth
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={type}
                            label="Type"
                            onChange={handleChange}
                          >
                            <MenuItem value={"Personal Loans"}>Personal Loans</MenuItem>
                            <MenuItem value={"Auto Loans"}>Auto Loans</MenuItem>
                            <MenuItem value={"Student Loans"}> Student Loans</MenuItem>
                            <MenuItem value={"Mortgage Loans"}>Mortgage Loans</MenuItem>
                            <MenuItem value={"Home Equity Loans"}>Home Equity Loans</MenuItem>
                            <MenuItem value={"Credit-builder Loans"}>Credit-builder Loans</MenuItem>
                            <MenuItem value={"Debt Consolidation Loans"}>
                              Debt Consolidation Loans
                            </MenuItem>
                            <MenuItem value={"Small Business Loans"}>Small Business Loans</MenuItem>
                            <MenuItem value={"Title Loans"}>Title Loans</MenuItem>
                            <MenuItem value={"Pawnshop Loans"}>Pawnshop Loans</MenuItem>
                            <MenuItem value={"Boat Loans"}>Boat Loans</MenuItem>
                            <MenuItem value={"Recreational Vehicle (RV) Loans"}>
                              Recreational Vehicle (RV) Loans
                            </MenuItem>
                            <MenuItem value={"Land Loans"}>Land Loans</MenuItem>
                            <MenuItem value={"Pool Loans"}>Pool Loans</MenuItem>
                            <MenuItem value={"Payday Loans"}>Payday Loans</MenuItem>
                          </Select>
                        </FormControl>
                      </Item>
                    </Stack>
                    <Stack spacing={2}>
                      <Item>
                        <FormControl>
                          <TextField
                            fullWidth
                            label="Monthly Income"
                            required
                            value={monthlyIncome}
                            onChange={onChangeMonthlyIncome}
                            type="number"
                          />
                        </FormControl>
                      </Item>
                    </Stack>
                    <Stack spacing={2}>
                      <Item>
                        <FormControl>
                          <TextField
                            fullWidth
                            label="Description"
                            required
                            value={description}
                            onChange={onChangeDescription}
                            type="text"
                          />
                        </FormControl>
                      </Item>
                    </Stack>
                    <Box>
                      <Button color="info" fullWidth size="large" type="submit" variant="contained">
                        <PlayCircleFilledIcon />
                        {loading && (
                          <CircularProgress color="primary" thickness={8} value={50} size={20} />
                        )}
                      </Button>
                    </Box>
                    {message && (
                      <Alert severity={successful ? "success" : "error"}>{message}</Alert>
                    )}
                  </Grid>
                </form>
              </>
            </Grid>
          </Container>
        </Box>
      )}
      {successful && (
        <>
          <Button
            color="info"
            onClick={() => {
              router.push(`http://localhost:3000/loan/${loanToken}`);
            }}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Aller vers le detail de ce pret{" "}
          </Button>
        </>
      )}
    </>
  );
}
Loan.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Loan;
