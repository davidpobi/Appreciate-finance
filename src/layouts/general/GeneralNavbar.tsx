"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import DarkIcon from "@mui/icons-material/Nightlight";
import LightIcon from "@mui/icons-material/LightMode";
import AnalyticsIcon from "@mui/icons-material/TrendingUp";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import Logo from "/public/images/alpacalogo.png";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { changeTheme } from "../../redux/themeSlice";
import { Themes } from "../../interfaces/theme";
import { setLiveStatus } from "../../redux/alpacaSlice";
import { AppTitle } from "../../globals";
import { SignOut } from "../../services/auth.services";
import { CircularProgress } from "@mui/material";

export const pages = [];

const textStyle = {
  ".nav-link": {
    my: 2,
    display: "block",
    fontWeight: 600,
    color: "#605dba",
  },
};

const GeneralNavBar = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);
  const selectedTheme = useAppSelector((state: RootState) => state.theme.selectedTheme);
  const isLive = useAppSelector((state: RootState) => state.alpaca.isLive);
  const [anchorMenuNav, setAnchorMenuNav] = React.useState<null | HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const switchOnLiveState = () => {
    dispatch(setLiveStatus({ status: true, uid: user?.id }));
  };

  const switchOffLiveState = () => {
    dispatch(setLiveStatus({ status: false, uid: user?.id }));
  };

  const toggleLive = () => {
    if (isLive) {
      switchOffLiveState();
      return;
    }
    switchOnLiveState();
  };

  React.useEffect(() => {
    setTitle(AppTitle);
  }, []);

  const toggleTheme = (event: React.SyntheticEvent) => {
    dispatch(changeTheme({ selectedTheme: selectedTheme === Themes.dark ? Themes.light : Themes.dark, uid: user?.id }));
  };

  const toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenuNav(event.currentTarget);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    setAnchorMenuNav(null);
  };

  const navigateToPage = (event: React.SyntheticEvent, page: string | null) => {
    if (page === null) {
      return;
    }
    router.push(page === "home" ? "/" : page);
  };

  const signOut = async () => {
    console.log("sign out");
    await SignOut();
    router.push("/signin");
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: theme.palette.background.default,
          boxShadow: "none",
          opacity: 1,
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            padding: {
              xs: "0 10px",
              sm: "0 2rem",
              md: "0 3rem",
              lg: "0 4rem",
            },
          }}
        >
          <Toolbar disableGutters>
            <Box
              onClick={(e: any) => navigateToPage(e, "/")}
              component={"div"}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                position: "relative",
                ml: {
                  xs: "5px",
                  sm: "10px",
                  md: "10px",
                },
                ".logo": {
                  background: "white",
                  borderRadius: "50%",
                  border: "2px solid transparent",
                  position: "relative",
                  width: {
                    xs: "25px",
                    sm: "30px",
                    md: "30px",
                  },
                  height: {
                    xs: "25px",
                    sm: "30px",
                    md: "30px",
                  },
                  cursor: "pointer",
                  objectFit: "cover",
                  mr: {
                    xs: "5px",
                    sm: "10px",
                    md: "10px",
                  },
                },
                ".logo-text": {
                  cursor: "pointer",
                  fontFamily: "THICCCBOI",
                  fontSize: {
                    xs: "19px",
                    sm: "25px",
                    md: "28px",
                  },
                  fontWeight: 900,
                  color: "#808080",
                },
              }}
            >
              <Image src={Logo} alt="" width="100" height="100" className="logo" />{" "}
              {/* <label className="logo-text">AfricanArt.ai</label> */}
              <br />
              <label className="logo-text">{title}</label>
            </Box>

            <Box
              component={"div"}
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                gap: {
                  md: "30px",
                  xl: "40px",
                },
                width: "auto",
                minWidth: "400px",
                position: "absolute",
                right: "190px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              {pages.map((page: string) => (
                <Button
                  key={page}
                  onClick={(e: any) => {
                    console.log("aa");
                    navigateToPage(e, page.toLowerCase());
                  }}
                  sx={{
                    my: 2,
                    display: "block",
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  <Typography sx={textStyle}>
                    <span className="nav-link">{page}</span>
                  </Typography>
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleMenu}
                sx={{
                  color: "#b1b1b1",
                  position: "absolute",
                  top: {
                    xs: "3px",
                    sm: "0px",
                    md: "0px",
                  },
                  right: "0px",
                  fontSize: "21px",
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={false}
                onClose={() => {}}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page: string) => (
                  <MenuItem key={page} href={page !== "Home" ? page.toLowerCase() : "/"} onClick={() => {}}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Button
                  onClick={toggleLive}
                  sx={{
                    padding: {
                      md: "3px 8px",
                    },
                    border: "1px solid #cecece",
                    borderRadius: "12px",
                    color: "#808080",
                    position: "absolute",
                    top: "50%",
                    transform: "translate(0%,-50%)",
                    fontFamily: "THICCCBOI",
                    fontSize: "16px",
                    fontWeight: 600,
                    textTransform: "none",
                    textAlign: "center",
                    minWidth: "0px",
                    width: {
                      xs: "55px",
                      sm: "60px",
                      md: "65px",
                    },
                    height: {
                      xs: "26px",
                      sm: "30px",
                      md: "36px",
                    },
                    mt: {
                      xs: "-1px",
                      sm: "-8px",
                      md: "-0px",
                    },
                    right: {
                      xs: "45px",
                      sm: "45px",
                      md: "65px",
                    },
                  }}
                >
                  {isLive !== null && isLive && "Live"}
                  {isLive !== null && !isLive && "Paper"}

                  {isLive === null && <CircularProgress size={"15px"} sx={{ color: "grey" }} />}
                </Button>
              </Tooltip>

              <Button
                onClick={toggleMenu}
                sx={{
                  fontFamily: "THICCCBOI",
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "flex",
                  },
                  justifyContent: "center",
                  alignItems: "center",
                  background: "transparent",
                  border: "1px solid #a6a6a6",
                  borderRadius: "50%",
                  width: {
                    md: "40px",
                  },
                  height: {
                    md: "40px",
                  },
                  minWidth: "0",
                  minHeight: "0",
                  position: "absolute",
                  color: "#808080",
                  top: "50%",
                  transform: "translate(0%,-50%)",
                  right: {
                    xs: "0px",
                    md: "0px",
                  },
                  fontSize: {
                    md: "16px",
                  },
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#f4f4f4" },
                  ":active": { backgroundColor: "#f4f4f4" },
                  "&.Mui-selected": {
                    backgroundColor: "#f4f4f4",
                  },
                  "&.Mui-focusVisible": {
                    background: "#f4f4f4",
                  },
                }}
              >
                <MenuIcon />
              </Button>

              <Menu
                sx={{
                  mt: "45px",
                  ml: "0px",
                  ".MuiList-root": {
                    padding: "0",
                    margin: "0",
                  },
                  ".MuiPaper-root": {
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "12px",
                    width: "auto",
                    height: "auto",
                    padding: "0",
                    margin: "0",
                  },
                  ".item": {
                    padding: "15px 12px",
                    gap: "8px",
                    "&:hover": { background: "#cecece" },
                    ":active": { background: "#cecece" },
                    "&.Mui-selected": {
                      background: "#cecece",
                    },
                    "&.Mui-focusVisible": {
                      background: "#cecece",
                    },
                    fontSize: {
                      xs: "14px",
                      md: "14px",
                    },
                    ml: 0,
                    mr: 0,
                    ".icon": {
                      position: "relative",
                    },
                  },
                }}
                id="menu-appbar"
                anchorEl={anchorMenuNav}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={isMenuOpen}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu} className="item">
                  <AnalyticsIcon className="icon" />
                  <Typography>Markets</Typography>
                </MenuItem>
                <MenuItem onClick={toggleTheme} className="item" disableRipple={true}>
                  {selectedTheme === Themes.dark ? <DarkIcon className="icon" /> : <LightIcon className="icon" />}

                  <Typography>{`${selectedTheme === Themes.dark ? "Dark" : "Light"}`}</Typography>
                </MenuItem>

                <MenuItem
                  onClick={(e: any) => {
                    console.log("aa");
                    !isAuthenticated ? navigateToPage(e, "signin") : signOut();
                  }}
                  className="item"
                >
                  {!isAuthenticated ? (
                    <>
                      {" "}
                      <LoginIcon className="icon" />
                      <Typography> {"Sign in"}</Typography>
                    </>
                  ) : (
                    <>
                      {" "}
                      <LogoutIcon className="icon" />
                      <Typography> {"Sign out"}</Typography>
                    </>
                  )}
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* <NavDrawer open={isDrawerOpen} closeCallback={handleDrawerClose} /> */}
    </>
  );
};
export default GeneralNavBar;
