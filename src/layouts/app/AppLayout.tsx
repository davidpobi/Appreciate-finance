"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import GeneralLayout from "../general/GeneralLayout";
import AuthenticationLayout from "../authentication/AuthenticationLayout";
import Logo from "/public/images/alpacalogo.png";
import Image from "next/image";

const generalRoutes = ["", "dashboard"];
const authRoutes = ["", "signin", "signup"];

const AppLayout = ({ children }: any) => {
  const pathname = usePathname();
  const [isAuthRoute, setIsAuthRoute] = useState<null | boolean>(null);
  const [isGeneralRoute, setIsGeneralRoute] = useState<null | boolean>(null);

  const checkRoute = (route: string, routes: string[]) => {
    return routes.includes(route);
  };

  useEffect(() => {
    const currentRoute = pathname.split("/")[1];
    if (checkRoute(currentRoute, generalRoutes)) {
      setIsGeneralRoute(true);
      setIsAuthRoute(false);
      return;
    }
    if (checkRoute(currentRoute, authRoutes)) {
      setIsAuthRoute(true);
      setIsGeneralRoute(false);
      return;
    }
    setIsGeneralRoute(false);
    setIsAuthRoute(false);
  }, [pathname]);

  if (isGeneralRoute === true) {
    return <GeneralLayout>{children}</GeneralLayout>;
  }

  if (isAuthRoute === true) {
    return <AuthenticationLayout>{children}</AuthenticationLayout>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        ".loader": {
          position: "relative",
          ".img": {
            position: "relative",
            top: "-20px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          },
        },
      }}
    >
      <Typography component={"div"} className="loader">
        <Image src={Logo} alt="" sizes={"100%"} className="img" />
      </Typography>
    </Box>
  );
};

export default AppLayout;
