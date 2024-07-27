"use client";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Logo from "/public/images/alpacalogo.png";
import Image from "next/image";
import BackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { SignInPayload } from "../../interfaces/auth";
import { SignOut, signInCustomer } from "../../services/auth.services";
import Input from "../Input";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { loginSuccess, logoutSuccess, setUser } from "../../redux/authSlice";
import { ToastTypes } from "../../interfaces/notifications";
import { handleNotify } from "../../redux/helpers";
import { IProfile, OnboardingStatus } from "../../interfaces/user";

const LoginInfoDefault: SignInPayload = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState<SignInPayload>(LoginInfoDefault);
  const [errors, setErrors] = useState<any>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRoute = (route: string) => {
    router.push(`/${route}`);
  };

  const validate = async () => {
    let state: boolean = false;
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setIsFormValid(true);
      setErrors({});
      state = true;
    } catch (err: any) {
      setIsFormValid(false);
      state = false;
      const errors_: any = {};
      err.inner.forEach((e: any) => {
        errors_[e.path] = e.message;
      });
      setErrors(errors_);
    }
    return state;
  };

  const handleChange = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;

    setFormData((info: any) => ({
      ...info,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (formData.email) {
      const state = await validate();
      if (state) {
        setIsLoading(true);
        const { state, data, message } = await signInCustomer(formData);
        if (state) {
          handleNotify("Sign in success", 1000, ToastTypes.Success, dispatch);
          const profile: IProfile = data;
          if (profile.onboardingStatus !== OnboardingStatus.completed) {
            handleNotify("Complete onbarding to proceed", 1000, ToastTypes.Warning, dispatch);
            handleRoute("onboarding");
            return;
          }

          dispatch(setUser({ user: data }));
          dispatch(loginSuccess());
          setTimeout(() => {
            handleRoute("/");
          }, 1500);
          return;
        }

        handleNotify(message || "Error", 3000, ToastTypes.Error, dispatch);
        setIsLoading(false);
      } else {
        console.log("not ready");
        dispatch(logoutSuccess());
      }
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      onSubmit(event);
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    if (formData.email && formData.password) {
      validate();
    }
  }, [formData]);

  useEffect(() => {
    SignOut();
  }, []);

  return (
    <Box
      component={"div"}
      sx={{
        border: "1px solid #cecece",
        borderRadius: "16px",
        width: "40%",
        position: "relative",
        mt: 1,
        mb: 2,
        p: {
          xs: "1rem",
          sm: "2rem",
          md: "2rem",
        },
        ".header": {
          display: "flex",
          justifyContent: "space-between",
          ".img": {
            position: "relative",
            top: "-5px",
            ml: "-2px",
            width: "41px",
            height: "100%",
            borderRadius: "50%",
          },
          ".txt": {
            cursor: "pointer",
            color: "gray",
            fontSize: "12px",
            fontWeight: "400",
            p: "0 0 0",
            right: "5px",
            fontFamily: "THICCCBOI, sans-serif",
            ".icon": { fontSize: "18px", position: "relative", top: "5px", mr: "3px" },
          },
          mb: {
            xs: "1rem",
            sm: "2rem",
            md: "2.5rem",
          },
        },
        ".title": {
          width: "100%",
          display: "block",
          ".big": {
            fontSize: {
              xs: "30px",
              sm: "40px",
              md: "40px",
            },
            fontWeight: "500",
            textAlign: "left",
          },
          ".small": {
            position: "relative",
            top: "-3px",
            fontSize: {
              xs: "14px",
              sm: "16px",
              md: "16px",
            },
            fontWeight: "500",
            textAlign: "left",
          },
          mb: {
            xs: "2rem",
            sm: "2rem",
            md: "3rem",
          },
        },
        ".formDiv": {
          width: "100%",
          position: "relative",
          mt: "0px",
          p: 0,
          ".field": {
            border: "1px solid #b5b5b5",
            borderRadius: "18px",
            width: {
              xs: "100%",
              sm: "100%",
              md: "100%",
            },
            mb: "0.5rem",
          },
          ".save": {
            position: "relative",
            top: "1rem",
          },
        },
      }}
    >
      <Typography className="header">
        <Image src={Logo} alt="" sizes={"100vw"} className="img" />
        <span
          className="txt"
          onClick={() => {
            handleRoute("");
          }}
        >
          <BackIcon className="icon" /> cancel
        </span>
      </Typography>

      <Typography className="title">
        <label className="big">Welcome Back!</label>
        <br />
        <label className="small">Enter your details to sign into your account</label>
      </Typography>
      <div className="formDiv">
        <form onSubmit={onSubmit}>
          <Input
            label={"Email"}
            name="email"
            value={formData.email}
            type={"text"}
            onChange={(e) => handleChange(e)}
            placeholder=""
            helperText={errors.email}
          />

          <Input
            label={"Password"}
            name="password"
            value={formData.password}
            type={"password"}
            onChange={(e) => handleChange(e)}
            placeholder=""
            helperText={errors.password}
          />

          <div className="save">
            <Button
              type="submit"
              sx={{
                position: "relative",
                top: "0px",
                padding: "10px 5px 10px 5px",
                borderRadius: "18px",
                width: "100%",
                height: "60px",
                fontsize: "16px",
                background: "#3A3366",
                color: "white",
                mb: "15px",
                ":disabled": {
                  color: "white",
                  background: "#333333",
                },
                "&:hover, &:active, &:focus, &:focus-visible, &.Mui-selected, &.Mui-focusVisible": {
                  background: "#3A3366",
                  color: "white",
                },
              }}
              disabled={isLoading || !isFormValid}
            >
              {isLoading && <CircularProgress size={"20px"} sx={{ color: "white" }} />}

              {!isLoading && "Login"}
            </Button>

            <Typography
              component={"div"}
              className="item"
              sx={{
                position: "relative",
                top: {
                  xs: "5px",
                  sm: "20px",
                  md: "20px",
                },
                fontSize: "13px",
                fontWeight: "400",
                color: "black",
                ".txt": {
                  position: "relative",
                  top: "2px",
                },
                ".link": {
                  color: "#5E81FF",
                  fontWeight: "600",
                  cursor: "pointer",
                },
                mb: "2rem",
              }}
            >
              <span className="txt">
                {"Don't have an account? "}
                <span
                  className="link"
                  onClick={() => {
                    handleRoute("signup");
                  }}
                >
                  Sign Up
                </span>
              </span>
            </Typography>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default LoginForm;
