"use client";

import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IRegister } from "../../interfaces/auth";
import Logo from "/public/images/alpacalogo.png";
import Image from "next/image";
import BackIcon from "@mui/icons-material/ArrowBack";
import * as yup from "yup";
import Input from "../Input";
import { useAppDispatch } from "../../redux/hooks";
import { IToastNotification, ToastTypes } from "../../interfaces/notifications";
import { notify } from "../../redux/notificationsSlice";
import { SignOut, registerNewCustomer } from "../../services/auth.services";
import { useRouter } from "next/navigation";
import { validatePasswordInput } from "../../utils/helpers";
import ValidatePasswordInput from "./validatePassword";
import { handleNotify } from "../../redux/helpers";

const registerDefault: IRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .min(8, "Password must be at least 8 characters")
    .required("Confirm Password is required"),
});

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = React.useState<IRegister>(registerDefault);
  const [errors, setErrors] = useState<IRegister | any>({});
  const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
  const [passwordValidation, setPasswordValidation] = React.useState({
    isMinLength: false,
    isUpperCase: false,
    hasUniqueChar: false,
  });
  const [isPasswordValid, setIsPasswordValid] = React.useState<boolean>(false);
  const [isPasswordMatch, setIsPasswordMatch] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRoute = (route: string) => {
    router.push(`/${route}`);
  };

  const handleChange = (event: React.BaseSyntheticEvent | any) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;

    setFormData((info: IRegister) => ({
      ...info,
      [name]: value,
    }));
  };

  const validate = async () => {
    let state: boolean = false;
    try {
      const { isMinLength, isUpperCase, hasUniqueChar } = validatePasswordInput(formData.password);
      setPasswordValidation({ isMinLength: isMinLength, isUpperCase: isUpperCase, hasUniqueChar: hasUniqueChar });
      setIsPasswordValid(isMinLength && isUpperCase && hasUniqueChar);
      if (formData.password !== undefined && formData.password?.length > 2) {
        formData.password === formData.confirmPassword ? setIsPasswordMatch(true) : setIsPasswordMatch(false);
      } else {
        setIsPasswordMatch(false);
      }
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

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (formData.email.length == 0 || formData.password?.length == 0) {
      return;
    }

    setIsLoading(true);

    const { success, message } = await registerNewCustomer(formData);
    if (success) {
      handleNotify("Sign up successful", 2000, ToastTypes.Success, dispatch);
      handleRoute(`/`);
      return;
    }
    handleNotify(message || "Error", 6000, ToastTypes.Error, dispatch);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  useEffect(() => {
    if (Object.values(formData).some((value) => value !== "" && value !== null)) {
      validate();
    }
  }, [formData]);

  useEffect(() => {
    SignOut();
  }, []);

  return (
    <>
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
              xs: "0.5rem",
              sm: "1rem",
              md: "1.5rem",
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
            ".save": {},
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
          <label className="big">Create an account</label>
          <br />
          <label className="small">Enter your details to create an account</label>
        </Typography>
        <div className="formDiv">
          <form onSubmit={onSubmit}>
            <Grid container columnSpacing={1}>
              <Grid item xs={12} sm={6} md={6}>
                <Input
                  label={"First Name"}
                  name="firstName"
                  value={formData.firstName}
                  type={"text"}
                  onChange={(e) => handleChange(e)}
                  placeholder=""
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Input
                  label={"Last Name"}
                  name="lastName"
                  value={formData.lastName}
                  type={"text"}
                  onChange={(e) => handleChange(e)}
                  placeholder=""
                  helperText={errors.lastName}
                />
              </Grid>
            </Grid>

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

            {formData.password !== undefined && formData.password?.length > 1 && !isPasswordMatch && (
              <ValidatePasswordInput
                isMinLength={passwordValidation.isMinLength}
                isUpperCase={passwordValidation.isUpperCase}
                hasUniqueChar={passwordValidation.hasUniqueChar}
              />
            )}

            {formData.password !== undefined && isPasswordValid && (
              <Input
                label={"Confirm Password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                type={"password"}
                onChange={(e) => handleChange(e)}
                placeholder=""
                helperText={errors.confirmPassword}
              />
            )}

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

                {!isLoading && "Create Account"}
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
                  Already have an account?{" "}
                  <span
                    className="link"
                    onClick={() => {
                      handleRoute("signin");
                    }}
                  >
                    Sign In
                  </span>
                </span>
              </Typography>
            </div>
          </form>
        </div>
      </Box>
    </>
  );
};

export default RegisterForm;
