"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";
import Logo from "/public/images/logo.png";
import Image from "next/image";
import NavDrawer from "../../components/Drawer";
// import { signOut } from "../../services/auth.services";

export const pages = [""];

const languages = [
  { label: "English", code: "En" },
  { label: "French", code: "Fr" },
];

const textStyle = {
  ".logo": {
    color: "#8d8d8d",
    mr: 2,
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    textDecoration: "none",
    fontSize: {
      xs: "20px",
      sm: "20px",
      md: "22px",
      lg: "22px",
      xl: "22px",
    },
  },
  ".nav-link": {
    my: 2,
    display: "block",
    fontWeight: 600,
    color: "#605dba",
  },
};

const AuthenticationNavBar = () => {
  const router = useRouter();
  const [anchorLangugeNav, setAnchorLangugeNav] = React.useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isLanguagesOpen, setIsLanguagesOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleOpenLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorLangugeNav(event.currentTarget);
    setIsLanguagesOpen(true);
  };

  const handleCloseLanguageMenu = () => {
    setIsLanguagesOpen(false);
    setAnchorLangugeNav(null);
  };

  const navigateToPage = async (event: React.SyntheticEvent, page: string | null) => {
    if (page === null) {
      return;
    }
    // await signOut();
    router.push(page === "home" ? "/" : page);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#f8f8f8",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            padding: {
              xs: "0 1rem",
              sm: "0 5rem",
              md: "0 8rem",
              xl: "0 10rem",
            },
          }}
        >
          <Toolbar disableGutters>
            <Box
              onClick={(e: any) => navigateToPage(e, "/signin")}
              component={"div"}
              sx={{
                flexGrow: 1,
                padding: 0,
                margin: 0,
                display: { xs: "flex", md: "flex" },
                position: "absolute",
                width: "auto",
                height: "60px",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: `0px 0px 0px 0px `,
                },
                "&.Mui-focusVisible": {
                  boxShadow: `0px 0px 0px 50px `,
                },
                "&.Mui-active": {
                  boxShadow: `0px 0px 0px 8px `,
                },
                ".img": {
                  width: "200px",
                  height: "100%",
                },
              }}
            >
              <Image src={Logo} alt="" sizes={"100vw"} objectFit={"contain"} className="img" />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <NavDrawer open={isDrawerOpen} closeCallback={handleDrawerClose} />
    </>
  );
};
export default AuthenticationNavBar;
