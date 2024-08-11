"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import Logo from "/public/images/logo-alt.png";
import Image from "next/image";
import NavDrawer from "../../components/Drawer";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../redux/authSlice";
import ProfilPhoto from "/public/images/profile.png";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { IProfile } from "../../interfaces/user";

export const pages = [""];

const settings = [{ label: "Notifications" }];

interface NavbarProps {
  pageTitle: string;
  isDashboardRoute: boolean | null;
}
const AppNavbar = ({ pageTitle, isDashboardRoute }: NavbarProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isDashboard, setIsDashboard] = React.useState<boolean | null>(isDashboardRoute);
  const [anchorLangugeNav, setAnchorLangugeNav] = React.useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = React.useState(false);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [profile, setProfile] = React.useState<IProfile | null>(null);
  const [title, setTitle] = React.useState<string>("");

  const toggleSettings = () => {
    setNotificationsOpen(!isNotificationsOpen);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleOpenNotifications = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorLangugeNav(event.currentTarget);
    setNotificationsOpen(true);
  };

  const handleCloseNotifications = () => {
    setNotificationsOpen(false);
    setAnchorLangugeNav(null);
  };

  const navigateToPage = (event: React.SyntheticEvent, page: string | null) => {
    if (page === null) {
      return;
    }
    router.push(page === "home" ? "/" : page);
  };

  const navigateToExternal = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleSignOut = async () => {
    // await signOut();
    dispatch(logoutSuccess());
    router.push("/signin");
  };

  React.useEffect(() => {
    setTitle(pageTitle);
  }, [pageTitle]);

  React.useEffect(() => {
    setIsDashboard(isDashboardRoute);
  }, [isDashboardRoute]);

  React.useEffect(() => {
    if (user !== null) {
      setProfile(user);
    }
  }, []);
  return (
    <>
      <AppBar
        elevation={0}
        position="static"
        sx={{
          backgroundColor: "#F7F6FF",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            padding: { xs: "3rem 1rem 1rem", sm: "3rem 2rem 1rem", md: "3rem 2rem 1rem" },
          }}
        >
          <Toolbar disableGutters>
            <Box
              component={"div"}
              sx={{
                position: "relative",
                top: !isDashboard ? "-10px" : "0",
                cursor: "default",
                display: "flex",
                alignItems: "center",
                ".txt": {
                  position: "relative",
                  display: "flex",
                  fontSize: "15px",
                  fontWeight: "400",
                  color: "#000",
                  padding: "1rem 0",
                  cursor: "pointer",
                },
                ".title": {
                  fontSize: "20px",
                  fontWeight: "400",
                  color: "black",
                },
                ".count": {
                  fontSize: "15px",
                  color: "rgba(0, 0, 0, 0.40)",
                  ml: "10px",
                },
                ".img": {
                  position: "relative",
                  top: "-5px",
                  ml: "8px",
                  width: "80px",
                  height: "100%",
                },
              }}
            >
              {isDashboard && (
                <Typography
                  textAlign="left"
                  className="txt"
                  component={"div"}
                  onClick={() => navigateToExternal("https://abdavid.com/")}
                >
                  Powered by <Image src={Logo} alt="" sizes={"100vw"} className="img" />
                </Typography>
              )}
            </Box>

            <Box
              component={"div"}
              sx={{
                position: "absolute",
                right: "10px",
                ".icon": {
                  color: "#3A3366",
                },
                mb: 0,
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                gap: {
                  xs: "20px",
                  sm: "30px",
                  md: "30px",
                },
              }}
            >
              {" "}
              <div onClick={handleOpenNotifications}>
                <NotificationsIcon className="icon" />
              </div>
              {!isDashboard && (
                <Typography
                  component={"div"}
                  sx={{
                    position: "relative",
                    top: "-10px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    ".img_": {
                      width: {
                        xs: "40px",
                        sm: "40px",
                        md: "40px",
                      },
                      height: {
                        xs: "40px",
                        sm: "40px",
                        md: "40px",
                      },
                      borderRadius: "50%",
                      objectFit: "cover",
                    },
                    ".txts": {
                      display: {
                        xs: "none",
                        sm: "flex",
                        md: "flex",
                      },
                      flexDirection: "column",
                    },
                    ".name": {
                      color: "black",
                      fontSize: "17px",
                      fontWeight: "500",
                    },
                    ".email": {
                      color: "rgba(0, 0, 0, 0.40)",
                      fontSize: "14px",
                    },
                  }}
                >
                  <Image src={ProfilPhoto} alt="" sizes={"100vw"} className="img_" />
                  <div className="txts">
                    <label className="name">
                      {" "}
                      {profile?.firstName} {profile?.lastName}
                    </label>
                    <label className="email"> {profile?.email}</label>
                  </div>
                </Typography>
              )}
            </Box>

            <Menu
              sx={{
                mt: "45px",
                ml: "20px",
                ".MuiPaper-root": {
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "12px",
                  width: "auto",
                  height: "auto",
                  p: "0 0.4rem",
                },
                ".item": {
                  p: "0.6rem 1rem",
                  ":hover": {
                    background: "#f5f5f5 !important",
                  },
                },
              }}
              id="menu-appbar"
              anchorEl={anchorLangugeNav}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={isNotificationsOpen}
              onClose={handleCloseNotifications}
            >
              {settings.map((x) => (
                <MenuItem key={x.label} onClick={(e: any) => navigateToPage(e, x.label.toLowerCase())} className="item">
                  <Typography textAlign="center" sx={{ color: "#343f52" }}>
                    {x.label}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleSignOut} className="item">
                <Typography textAlign="center" sx={{ color: "#343f52" }}>
                  Signout
                </Typography>
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
      <NavDrawer open={isDrawerOpen} closeCallback={handleDrawerClose} />
    </>
  );
};
export default AppNavbar;
