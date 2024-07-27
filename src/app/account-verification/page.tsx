"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageBody from "../../components/PageBody";
import { Box, Button, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import CheckSVG from "/public/graphics/check2.svg";

const AccountVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email: string = searchParams.get("email") || "";
  const code: string = searchParams.get("code") || "";

  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState({ big: `Verifying account `, small: "" });

  const handleNavigate = async (route: string) => {
    router.push(route);
  };

  const verifyAccount = async (email_: string, code_: string) => {};

  useEffect(() => {
    if (email === undefined || code === undefined) {
      return;
    }

    setMessage({ big: `Verifying account ${email}`, small: "" });
    setTimeout(() => {
      verifyAccount(email, code);
    }, 2000);
  }, [email, code]);

  return (
    <>
      <PageBody>
        <Box
          component={"div"}
          sx={{
            height: "80vh",
            display: "block",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
            fontSize: "17px",
            fontFamily: "THICCCBOI, sans-serif",
            fontWeight: "500",
            color: "#605dba",
            p: {
              xs: "2rem 1rem",
              sm: "2rem 4rem",
              md: "2rem 8rem",
            },
          }}
        >
          <Card
            sx={{
              position: "relative",
              top: {
                xs: "20px",
                sm: "50px",
                md: "50px",
              },
              width: "100%",
              height: "auto",
              padding: "1rem 1rem 3rem",
              ".text": {
                fontFamily: "THICCCBOI, sans-serif",
                color: "#343f52",
              },
              ".img": {
                width: "50px",
                height: "100%",
              },
            }}
            elevation={2}
          >
            <CardContent>
              <Typography>
                {isLoading && <CircularProgress sx={{ mt: 4, mb: 2 }} />}
                {isVerified && <Image src={CheckSVG} alt="" sizes={"100vw"} objectFit={"contain"} className="img" />}
              </Typography>

              {isVerified && (
                <Typography
                  className="text"
                  sx={{
                    mt: { xs: "-10px", sm: "0px", md: "0px" },
                    mb: 1.5,
                    fontSize: { xs: "16px", sm: "18px", md: "21px" },
                    fontWeight: "600",
                  }}
                >
                  Success
                </Typography>
              )}
              <Typography
                className="text"
                sx={{
                  fontSize: { xs: "16px", sm: "18px", md: "21px" },
                  fontWeight: "300",
                  widht: "40%",
                  mb: { xs: 1, sm: 0, md: 0 },
                }}
              >
                {message.big}
              </Typography>
              <Typography
                className="text"
                sx={{ fontSize: { xs: "16px", sm: "18px", md: "21px" }, fontWeight: "300", widht: "40%" }}
              >
                {message.small}
              </Typography>
              <Typography className="text" sx={{ mb: 1.5 }}>
                {isVerified && (
                  <Button
                    onClick={() => handleNavigate("/signin")}
                    sx={{
                      background: "#605dba",
                      borderRadius: "18px",
                      color: "white",
                      fontFamily: "THICCCBOI, sans-serif",
                      fontWeight: "600",
                      fontSize: "15px",
                      mt: "35px",
                      padding: "0.75rem 1.5rem",
                      textTransform: "none",
                      ":hover": {
                        background: "#605dba",
                      },
                      ":active": {
                        background: "#605dba",
                      },
                      ":focus": {
                        background: "#605dba",
                      },
                      "&:focus-visible": {
                        backgroundColor: "#605dba",
                      },
                      "&.Mui-selected": {
                        background: "#605dba",
                      },
                      "&.Mui-focusVisible": {
                        background: "#605dba",
                      },
                      ":disabled": {
                        borderColor: "gray",
                        background: "#8986cc",
                        color: "#ebebeb",
                      },
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </PageBody>
    </>
  );
};

export default AccountVerification;
