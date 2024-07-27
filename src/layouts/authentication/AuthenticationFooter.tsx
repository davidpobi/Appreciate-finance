"use client";

import { Box, Container, Typography } from "@mui/material";

const AuthenticationFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "#1e2228",
        color: "#ffffff",
        fontFamily: "THICCCBOI, sans-serif",
        minHeight: "200px",
        padding: {
          xs: "5rem 0",
          sm: "5rem 0",
          md: "5rem 0",
          lg: "5rem 0",
        },
        ".copyright": {
          color: "#cacaca",
          fontSize: "17px",
          fontFamily: "THICCCBOI, sans-serif",
          lineHeight: "30px",
        },
        ".social": {
          mt: "20px",
          display: "flex",
          gap: "10px",
          ".socialLink": {
            color: "#ffffff",
          },
        },
        ".touch": {
          fontFamily: "THICCCBOI, sans-serif",
        },
        ".address": {
          fontFamily: "THICCCBOI, sans-serif",
          textTransform: "none",
          color: "#cacaca",
        },
        ".info": {
          color: "#cacaca",
          position: "relative",
          top: "20px",
          fontFamily: "THICCCBOI, sans-serif",
        },
        ".more": {
          fontFamily: "THICCCBOI, sans-serif",
          color: "#cacaca",
          ".list": {
            display: "block",
            position: "relative",
            color: "#cacaca",
            listStyleType: "none",
            ml: "-40px",
            li: {
              mb: "10px",
            },
            ".item": {
              position: "relative",
              textDecoration: "none",
              color: "#cacaca",
            },
          },
        },
        ".news": {
          mt: {
            xs: "-10px",
            sm: "-10px",
            md: "20px",
            lg: "-20px",
          },
          color: "#cacaca",
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          component={"div"}
          className="copyright"
          sx={{
            span: {
              display: "block",
              fontSize: "13px",
            },
          }}
        >
          <span>&copy;2023 AB&amp;David. All rights reserved.</span>
        </Typography>
      </Container>
    </Box>
  );
};

export default AuthenticationFooter;
