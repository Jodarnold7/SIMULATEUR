import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { LoansLists } from "src/components/loans/loans-lists";
import { DashboardLayout } from "src/components/dashboard-layout";

function Loans() {
  return (
    <>
      <Head>
        <title>Les demandes de prets | SIMULATEUR DE PRET</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#004d66",
          color: "#004d66",
        }}
      >
        <Container>
          <Grid container spacing={2} paddingTop={12}>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <LoansLists />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

Loans.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Loans;
