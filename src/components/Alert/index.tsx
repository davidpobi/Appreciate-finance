"use client";

import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, CircularProgress, Divider } from "@mui/material";

export interface AlertProps {
  open: boolean;
  texts: { main: string; message: string; buttonText?: string };
  confirmCallback: () => void;
  denyCallback: () => void;
  closeCallback: () => void;
}

const button = {
  "&:hover, &:active, &:focus, &:focus-visible, &.Mui-selected, &.Mui-focusVisible, &:disabled": {
    color: "#FFFFF",
    backgroundColor: "transparent",
  },
  fontSize: "16px",
  fontWeight: 500,
  textTransform: "none",
};

const Alert = ({ open, texts, confirmCallback, denyCallback, closeCallback }: AlertProps) => {
  const [isOpen, setIsOpen] = React.useState(open);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsLoading(false);
    closeCallback();
  };

  const handleConfirm = () => {
    setIsLoading(true);
    confirmCallback();
  };

  useEffect(() => {
    if (!open) {
      handleClose();
    }
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: "auto",
            minWidth: {
              md: "270px",
            },
            borderRadius: "15px",
            backgroundColor: "white",
          },
        }}
      >
        {!isLoading ? (
          <>
            <DialogTitle id="alert-dialog-title" sx={{ justifyContent: "center", display: "flex", color: "#636363" }}>
              {texts.main}
            </DialogTitle>
            <DialogContent sx={{ justifyContent: "center", display: "flex", color: "red" }}>
              <DialogContentText id="alert-dialog-description" sx={{ color: "#636363" }}>
                {texts.message}
              </DialogContentText>
            </DialogContent>
            <Divider sx={{ borderColor: "#c5c5c5" }} />
            <DialogActions
              sx={{
                justifyContent: "center",
                gap: "10px",
                display: "flex",
                ".vertical-border": {
                  borderLeft: "1px solid #c5c5c5",
                  height: "50px",
                  margin: "-10px 0px",
                },
              }}
            >
              <Button onClick={denyCallback} sx={{ ...button }}>
                Cancel
              </Button>
              <div className="vertical-border"></div>
              <Button onClick={handleConfirm} sx={{ ...button, fontWeight: "600" }} autoFocus>
                {texts.buttonText ? texts.buttonText : "Ok"}
              </Button>
            </DialogActions>{" "}
          </>
        ) : (
          <DialogContent sx={{ justifyContent: "center", display: "flex", padding: "20px 0px 20px 0px" }}>
            <DialogContentText id="alert-dialog-description" sx={{ padding: "0.5rem" }}>
              <CircularProgress sx={{ color: "rgb(87, 87, 238)" }} size={30} />
            </DialogContentText>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default Alert;
