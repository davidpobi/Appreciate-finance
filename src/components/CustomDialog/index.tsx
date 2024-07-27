"use client";

import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Modal = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface CustomDialogProps {
  children?: React.ReactNode;
  title: string;
  onClose: () => void;
  isOpen: boolean;
  size?: string;
  backdropDismiss: boolean;
  isDraggable: boolean;
  hide?: boolean;
}

const CustomDialog = ({
  children,
  title,
  isOpen,
  onClose,
  size,
  backdropDismiss,
  isDraggable,
  hide,
}: CustomDialogProps) => {
  const [open, setOpen] = React.useState(isOpen);
  const draggableRef = React.useRef(null);
  const [dimensions, setDimensions] = React.useState({ w: "auto", h: "auto" });

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    // if (size === "small") {
    //   setDimensions({ w: "332px", h: "300px" });
    // }
  }, [size]);

  const handleClose = () => {
    if (!backdropDismiss) {
      return;
    }
    onClose();
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <>
      <Modal
        ref={draggableRef}
        onClose={handleClose}
        open={open}
        hideBackdrop={true}
        PaperProps={{
          sx: {
            width: {
              xs: dimensions.w,
              sm: dimensions.w,
              md: dimensions.w,
            },
            height: {
              xs: dimensions.h,
              sm: dimensions.h,
              md: dimensions.h,
            },
            padding: "0",
            borderRadius: "15px",
          },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: "1rem 0.5rem",
            color: "rgb(109, 108, 108)",
            cursor: isDraggable ? "grabbing" : "pointer",
            display: "flex",
            justifyContent: "space-between",
            position: "static",
            ".title": {
              position: "relative",
              top: "10px",
              left: "5px",
              fontSize: "16px",
            },
          }}
        >
          <span className="title">{title}</span>
          {isOpen ? (
            <IconButton
              aria-label="close"
              onClick={closeModal}
              sx={{
                position: "relative",
                right: 0,
                color: " (theme) => theme.palette.grey[500]",
                "&:hover, &:active, &:focus, &:focus-visible, &.Mui-selected, &.Mui-focusVisible, &:disabled": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <></>
          )}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "white", width: "100%", height: "", padding: "0", margin: "0" }}>
          {children}
        </DialogContent>
      </Modal>
    </>
  );
};

export default CustomDialog;
