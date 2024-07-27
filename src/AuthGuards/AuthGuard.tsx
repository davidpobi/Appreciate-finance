"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box, CircularProgress, Typography } from "@mui/material";

const AuthGuard = ({ children }: any) => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/signin");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "90vh",
          ".loader": {
            position: "relative",
            mt: "-5rem",
          },
        }}
      >
        <Typography component={"div"} className="loader">
          <CircularProgress size={"20px"} sx={{ mt: 4, opacity: 1 }} />
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
