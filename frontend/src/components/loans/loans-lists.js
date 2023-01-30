import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import { SeverityPill } from "../severity-pill";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import LoanService from "../../services/loan.service";
import VisibilityIcon from "@mui/icons-material/Visibility";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
export const LoansLists = (props) => {
  const router = useRouter();
  const [loans, setLoans] = useState([]);
  useEffect(() => {
    const fetchLists = async () => {
      const lists = await LoanService.loans();
      const Loans = await JSON.parse(JSON.stringify(lists.data.loans));
      setLoans(Loans);
    };
    fetchLists();
  }, []);
  return (
    <>
      <Card sx={{ mt: 5 }} {...props}>
        <CardHeader title="Vos demandes de prets" />
        <PerfectScrollbar>
          <TableContainer component={Paper}>
            <Box sx={{ minWidth: 10 }}>
              <Table sx={{ minWidth: 10 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Numero de pret</TableCell>
                    <TableCell align="center">Statut</TableCell>
                    <TableCell align="center">Voir</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loans.map((loan) => (
                    <TableRow hover key={loan.id}>
                      <TableCell>{loan.id}</TableCell>
                      <TableCell align="center">
                        <SeverityPill
                          color={
                            (loan.status === "accepted" && "success") ||
                            (loan.status === "refused" && "error") ||
                            (loan.status === "pending" && "warning") ||
                            "warning"
                          }
                        >
                          {loan.status}
                        </SeverityPill>
                      </TableCell>
                      <TableCell align="center">
                        <Box>
                          <Button
                            color="info"
                            onClick={() => {
                              router.push(`http://localhost:3000/loan/${loan.loanToken}`);
                            }}
                            type="submit"
                            variant="contained"
                          >
                            <VisibilityIcon />
                          </Button>
                        </Box>
                      </TableCell>{" "}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </TableContainer>
        </PerfectScrollbar>
      </Card>
    </>
  );
};
