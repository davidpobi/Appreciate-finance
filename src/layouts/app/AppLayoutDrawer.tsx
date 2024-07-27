"use client";

import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowFwdIcon from "@mui/icons-material/ArrowForward";
import AppsIcon from "@mui/icons-material/Apps";
import HireALawyerIcon from "@mui/icons-material/School";
import DIYIcon from "@mui/icons-material/Construction";
import SubscriptionsIcon from "@mui/icons-material/ContentCopyRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Fab, Tooltip } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../redux/authSlice";

const drawerWidth = 210;

const pages = [{ title: "Dashboard", link: "dashboard", active: true }];

const subPages = ["Messages", "In Review", "Account"];

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  border: "none",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  border: "none",
  [theme.breakpoints.up("sm")]: {
    width: "120px",
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AppLayoutDrawer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [currentRoute, setCurrentRoute] = useState("");
  const [open, setOpen] = useState(false);

  const routeTo = (page: string) => {
    router.push(page);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSignOut = async () => {
    // await signOut();
    dispatch(logoutSuccess());
    router.push("/signin");
  };

  useEffect(() => {
    setCurrentRoute(pathname.split("/")[1]);
  }, [pathname]);
  return (
    <>
      <CssBaseline />
      <Drawer
        variant={"permanent"}
        open={open}
        sx={{
          display: { xs: "none", sm: "flex", md: "flex" },
          ".nav": {
            "&:hover, &:active, &:focus, &:focus-visible, &.Mui-selected, &.Mui-focusVisible": {
              background: "transparent",
            },
            mb: 5,
            ".active_badge": {
              background: "#3A3366",
              padding: "7px",
              borderRadius: "8px",
              color: "white",
              position: "relative",
              left: "-5px",
            },
            ".active_text": {
              position: "relative",
              left: "-15px",
            },
            ".icon": {
              color: "#3A3366",
            },
          },
        }}
      >
        <List sx={{ paddingTop: "50px" }}>
          <ListItem disablePadding sx={{ display: "block", mb: "100px" }}>
            <ListItemButton
              className="nav"
              disableRipple={true}
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
            >
              <Fab
                onClick={toggleDrawer}
                className="actionBtn"
                sx={{
                  ml: 2,
                  width: "50px",
                  height: "50px",
                  boxShadow: "none",
                  background: "#3A3366",
                  color: "white",
                  "&:hover, &:active, &:focus, &:focus-visible, &.Mui-selected, &.Mui-focusVisible": {
                    width: "50px",
                    height: "50px",
                    boxShadow: "none",
                    background: "#3A3366",
                    color: "white",
                  },
                }}
              >
                <ArrowFwdIcon />
              </Fab>
            </ListItemButton>
          </ListItem>

          {pages.map((page, index) => (
            <ListItem key={page.link} disablePadding sx={{ display: "block" }}>
              <Tooltip title={!page.active ? `${page.title}  available soon` : ""} arrow>
                <div>
                  <ListItemButton
                    disableRipple={true}
                    onClick={() => {
                      routeTo(page.link);
                    }}
                    disabled={!page.active}
                    className="nav"
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        ml: 3,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                      className={`${currentRoute === page.link ? "active_badge" : "icon"}`}
                    >
                      {index === 0 && <AppsIcon />}
                      {index === 1 && <HireALawyerIcon />}
                      {index === 2 && <DIYIcon />}
                      {index === 3 && <SubscriptionsIcon />}
                      {index === 4 && <SettingsIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={page.title}
                      sx={{ opacity: open ? 1 : 0, fontFamily: "THICCCBOI", color: "#898989" }}
                      className={`${currentRoute === page.link ? "active_text" : " "}`}
                    />
                  </ListItemButton>
                </div>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        <ListItem
          onClick={handleSignOut}
          disablePadding
          sx={{ display: "block", position: "absolute", bottom: "10px", right: "0px" }}
        >
          <ListItemButton
            disableRipple={true}
            className="nav"
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                ml: 3,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
              className={"icon"}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Sign Out"}
              sx={{ opacity: open ? 1 : 0, fontFamily: "THICCCBOI", color: "#898989" }}
            />
          </ListItemButton>
        </ListItem>
      </Drawer>
    </>
  );
};

export default AppLayoutDrawer;
