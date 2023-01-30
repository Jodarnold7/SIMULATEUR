import Head from "next/head";
import NextLink from "next/link";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import {
  CircularProgress,
  Alert,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { useRouter } from "next/router";
export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      await UserService.getUserBoard().catch((err) => {
        router.push("/signup");
      });
    };
    fetchUser();
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().required("Email is required"),
    }),
    onSubmit: () => {
      setLoading(true);
      AuthService.Signup(formik.values.email, formik.values.password).then(
        (response) => {
          setSuccessful(true);
          setMessage(response.data.message);
          setLoading(false);
          router.push(`/loans`);
        },
        (error) => {
          setSuccessful(false);
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setLoading(false);
        }
      );
    },
  });
  return (
    <>
      <>
        <Head>
          <title>Creer un compte | SIMULATEUR DE PRET</title>
        </Head>
        <Box
          component="main"
          sx={{
            alignItems: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
          }}
        >
          {" "}
          <Container maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
              <stack sx={{ width: "100%" }} spacing={4}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Your email"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                />{" "}
                <TextField
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Your Password"
                  margin="normal"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  variant="outlined"
                />
              </stack>
              <Box>
                <Button color="info" fullWidth size="large" type="submit" variant="contained">
                  <PlayCircleFilledIcon />{" "}
                  {loading && (
                    <CircularProgress color="primary" thickness={8} value={50} size={20} />
                  )}
                </Button>
              </Box>
              {message && <Alert severity={successful ? "success" : "error"}>{message}</Alert>}
            </form>{" "}
            <Typography color="textSecondary" variant="body2">
              Avez vous un compte?{" "}
              <NextLink href="/signin" passHref>
                <Link variant="subtitle2" underline="hover">
                  Connectez-vous
                </Link>
              </NextLink>
            </Typography>{" "}
          </Container>
        </Box>
      </>
    </>
  );
}
