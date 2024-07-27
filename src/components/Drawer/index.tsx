"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AppsIcon from "@mui/icons-material/Apps";
import LoginIcon from "@mui/icons-material/Login";
import { pages } from "../../layouts/general/GeneralNavbar";
import { useRouter } from "next/navigation";

export interface NavDrawerProps {
  open: boolean;
  closeCallback: () => void;
}

const NavDrawer = ({ open, closeCallback }: NavDrawerProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(open);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    closeCallback();
  };

  const navigateToPage = (event: React.SyntheticEvent, page: string | null) => {
    if (page === null) {
      return;
    }
    router.push(page === "home" ? "/" : page);
    handleClose();
  };

  return (
    <div>
      <React.Fragment>
        <Drawer
          open={isOpen}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: {
                xs: "70vw",
                sm: "30vw",
                md: "30vw",
              },
              background: "#1e2228",
            },
          }}
        >
          <Box
            component={"div"}
            sx={{
              width: "100%",
              height: "80px",
              mt: "15%",
              padding: "0rem 1.2rem 0rem 1.2rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              component={"label"}
              sx={{
                color: "white",
                position: "relative",
                textAlign: "left",
                fontSize: "29px",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
              ABDavid
            </Typography>

            <Typography
              onClick={handleClose}
              component={"label"}
              sx={{
                color: "white",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                fontSize: "29px",
                marginTop: "auto",
                marginBottom: "auto",
                background: "#ffffff14",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
              }}
            >
              <CloseIcon sx={{ marginTop: "auto", marginBottom: "auto", fontSize: "18px" }} />
            </Typography>
          </Box>

          <Box
            component={"div"}
            sx={{
              width: "100%",
              height: "calc(100%-80px)",
              mt: "15%",
              padding: "0rem 0rem 0rem 0rem",
              ".icon": {
                color: "white",
              },
            }}
          >
            <List>
              {pages.map((page: string, i: number) => (
                <ListItem key={page} sx={{ mb: 2, paddingLeft: 0, marginLeft: 0, color: "white" }}>
                  <ListItemButton onClick={(e: any) => navigateToPage(e, page.toLowerCase())}>
                    <ListItemIcon>
                      {i === 0 ? <HomeIcon className="icon" /> : <></>}
                      {i === 1 ? <AppsIcon className="icon" /> : <></>}
                      {i === 2 ? <MenuIcon className="icon" /> : <></>}
                    </ListItemIcon>
                    <ListItemText primary={page} />
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem sx={{ mb: 2, paddingLeft: 0, marginLeft: 0, color: "white" }}>
                <ListItemButton disableRipple={true}>
                  <ListItemIcon>
                    <LoginIcon className="icon" />
                  </ListItemIcon>
                  <Button
                    onClick={(e: any) => navigateToPage(e, "/signin")}
                    sx={{
                      background: "#605dba",
                      borderRadius: "8px",
                      width: "90px",
                      height: "40px",
                      position: "relative",
                      color: "white",
                      textTransform: "none",
                      fontSize: {
                        md: "16px",
                      },
                      "&:hover": { backgroundColor: "#605dba" },
                      ":active": { backgroundColor: "#605dba" },
                      "&.Mui-selected": {
                        backgroundColor: "#605dba",
                      },
                      "&.Mui-focusVisible": {
                        background: "#605dba",
                      },
                    }}
                  >
                    Signin
                  </Button>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default NavDrawer;
