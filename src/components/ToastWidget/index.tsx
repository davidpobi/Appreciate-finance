"use client";

import React, { useEffect } from "react";
import { Alert, Snackbar, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import CheckIcon from "@mui/icons-material/CheckOutlined";
import Warningcon from "@mui/icons-material/WarningOutlined";
import ErrorIcon from "@mui/icons-material/Error";
import { IToastNotification, ToastTypes } from "../../interfaces/notifications";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { notify } from "../../redux/notificationsSlice";

const ToastWidget = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = React.useState({ background: "", color: "" });
  const [isOpen, setIsOpen] = React.useState(false);
  const { open, hideDuration, message, type } = useSelector(
    (state: RootState) => state.notifications.notification
  ) as any;

  const setToastTheme = (type: ToastTypes) => {
    if (type === ToastTypes.Info) {
      setTheme({ background: "gray", color: "white" });
    }

    if (type === ToastTypes.Success) {
      setTheme({ background: "#00ce00", color: "white" });
    }

    if (type === ToastTypes.Warning) {
      setTheme({ background: "#ff9529", color: "white" });
    }

    if (type === ToastTypes.Error) {
      setTheme({ background: "red", color: "white" });
    }
  };

  useEffect(() => {
    if (!open) {
      return;
    }
    setToastTheme(type);
    setIsOpen(true);
  }, [open, hideDuration, message, type]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    handleReset();
    setIsOpen(false);
  };

  const handleReset = () => {
    const notification: IToastNotification = {
      open: false,
      hideDuration: 0,
      message: "",
      type: ToastTypes.Error,
    };

    dispatch(notify({ notification: notification }));
  };

  return (
    <>
      <Snackbar
        open={isOpen}
        autoHideDuration={hideDuration || 3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert icon={false} sx={{ background: theme.background, color: theme.color, borderRadius: "12px" }}>
          <Typography component={"label"} sx={{ display: "flex", justifyContent: "center", ".icon": { mr: 1 } }}>
            {type === ToastTypes.Info && <InfoIcon className="icon" />}
            {type === ToastTypes.Success && <CheckIcon className="icon" />}
            {type === ToastTypes.Warning && <Warningcon className="icon" />}
            {type === ToastTypes.Error && <ErrorIcon className="icon" />}
            {message}
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
};

export default ToastWidget;
