import Head from "next/head";
import React from "react";
import { Divider, Grid } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

export default function Index() {
  return (
    <>
      <Head>
        <title>BOCCO COFFI ARNOLD / SIMULATEUR DE PRET </title>
      </Head>{" "}
      <Chip label="SIMULATEUR DE PRET" />
      <Divider />
      <Grid display="flex" justifyContent="center" alignItems="center">
        <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
          <Button href="/signup">Signup</Button>
          <Button href="/signin">Signin</Button>
        </ButtonGroup>{" "}
      </Grid>
    </>
  );
}
