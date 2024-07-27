"use client";

import { Grid } from "@mui/material";
import React from "react";
import LoginForm from "../../../components/Authentication/login";

const SignIn = () => {
  return (
    <>
      <React.Fragment>
        <Grid
          container
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            ".container": {
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              position: "relative",
              width: "100%",
              height: "auto",
              padding: {
                xs: "1rem",
                sm: "2rem",
                md: "2rem",
              },
            },
          }}
        >
          <Grid item xs={12}>
            <div className="container">
              <LoginForm />
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    </>
  );
};

export default SignIn;
