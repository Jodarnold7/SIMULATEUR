import PropTypes from "prop-types";
import { AppBar, Avatar, Box, IconButton, Toolbar, Tooltip, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const router = useRouter();
  const [i, setI] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.logout();
    setI(true);
  };
  useEffect(() => {
    const fetchUser = async () => {
      await UserService.getUserBoard().catch((err) => {
        router.push("/signin");
      });
    };
    fetchUser();
  }, [i]);
  return (
    <>
      <AppBar
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
            backgroundColor: "#004d66",
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
              color: "white",
            }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Tooltip title="Balance">
            <IconButton sx={{ ml: 1 }}>
              <Button color="info" type="submit" variant="contained">
                {props.balance} {""}
              </Button>
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar
            onClick={onSubmit}
            sx={{
              height: 30,
              width: 30,
              ml: 1,
            }}
          >
            <Button badgeContent={4} color="info" type="submit" variant="contained">
              <LogoutIcon fontSize="small" />
            </Button>
          </Avatar>
        </Toolbar>
      </AppBar>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
