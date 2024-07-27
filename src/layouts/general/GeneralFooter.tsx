"use client";

import { Box, Container, Grid, Link, Typography } from "@mui/material";
import Twitter from "@mui/icons-material/Twitter";
import Facebook from "@mui/icons-material/Facebook";
import Web from "@mui/icons-material/Web";
import Instagram from "@mui/icons-material/Instagram";
import Youtube from "@mui/icons-material/YouTube";
import Input from "../../components/Input";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "#1e2228",
        color: "#ffffff",
        fontFamily: "THICCCBOI, sans-serif",
        minHeight: "300px",
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
          p: 0,
          padding: {
            xs: "0 4%",
            sm: "0 5%",
            md: "0 5%",
            lg: "0 10%",
          },
        }}
      >
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <Typography
              component={"div"}
              className="copyright"
              sx={{
                ".mobile": {
                  display: {
                    xs: "block",
                    sm: "none",
                    md: "none",
                  },
                },
                ".desktop": {
                  display: {
                    xs: "none",
                    sm: "block",
                    md: "block",
                  },
                },
              }}
            >
              <span className="mobile">&copy;2023 AB&amp;David. All rights reserved.</span>

              <span className="desktop">
                {" "}
                &copy;2023 AB&amp;David.
                <br className="d-none d-lg-block" />
                All rights reserved.
              </span>
            </Typography>
            <Box component="nav" className={"social"}>
              <Link href="#" className={"socialLink"}>
                <Twitter />
              </Link>
              <Link href="#" className={"socialLink"}>
                <Facebook />
              </Link>
              <Link href="#" className={"socialLink"}>
                <Web />
              </Link>
              <Link href="#" className={"socialLink"}>
                <Instagram />
              </Link>
              <Link href="#" className={"socialLink"}>
                <Youtube />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <Box>
              <Typography variant="h6" className="touch" gutterBottom>
                Get in Touch
              </Typography>
              <Typography className="address">8 Dr. Isert Road, North Ridge, Accra, Greater Accra, Ghana.</Typography>
            </Box>
            <Typography className="info">
              info@abdavid.com
              <br />
              00 (123) 456 78 90
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <Box className="more">
              <Typography variant="h6" className="touch" color={"white"} gutterBottom>
                Learn More
              </Typography>
              <ul className="list">
                <li>
                  <Link href="/" className="item">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/" className="item">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/" className="item">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/" className="item">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <Box className="news" sx={{ ".form": { position: "relative", top: { xs: "15px", sm: "5px", md: "5px" } } }}>
              <Typography variant="h6" className="touch" color={"white"} gutterBottom>
                Our Newsletter
              </Typography>
              <Typography variant="body1" gutterBottom>
                Subscribe to our newsletter to get our news &amp; deals delivered to you.
              </Typography>
              <form className="form">
                <Input label={""} name="email" value={"email"} type={"text"} showJoin={true} onChange={(e) => {}} placeholder="Email Address" />
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
