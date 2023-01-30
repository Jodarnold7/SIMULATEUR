import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import { Cog as CogIcon } from "../icons/cog";
import { Selector as SelectorIcon } from "../icons/selector";
import { User as UserIcon } from "../icons/user";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const items = [
    {
      href: `/loans`,
      icon: <UserIcon fontSize="small" />,
      title: "Les prets",
    },
    {
      href: `/add/loan`,
      icon: <CogIcon fontSize="small" />,
      title: "Nouveau pret",
    },
  ];
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });
  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );
  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ px: 1 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "#00cc99",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "3px",
                borderRadius: 3,
              }}
            >
              <div>
                <Typography color="#16497c" fontWeight={800} variant="subtitle1">
                  SIMULATEUR DE PRET
                </Typography>
                <Typography color="black" fontWeight={800} variant="body2">
                  BOCCO COFFI ARNOLD{" "}
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: "black",
                  width: 15,
                  height: 15,
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "white",
            my: 2,
          }}
        />
        <Box sx={{ flexGrow: 3 }}>
          {items.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
        <Divider sx={{ borderColor: "white" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "#004d66",
            color: "#004d66",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "#004d66",
          color: "#004d66",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 200 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  token: PropTypes.string,
};
