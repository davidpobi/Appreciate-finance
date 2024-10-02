"use client";

import React, { useEffect } from "react";
import { styled, SxProps, Theme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Themes } from "../../interfaces/theme";
import Draggable from "react-draggable";

export const backButton = {
  ml: 1,
  width: "100px",
  height: "30px",
  borderRadius: "8px",
  backgroundColor: "inherit",
  border: "1px solid #747474",
  color: "inherit",
  "&:hover": { backgroundColor: "white" },
  "&:active": {
    backgroundColor: "white",
  },
  "&:focus": {
    backgroundColor: "white",
  },
  "&:focus-visible": {
    backgroundColor: "white",
    border: "none",
  },
  "&.Mui-selected": {
    backgroundColor: "white",
  },
  "&.Mui-focusVisible": {
    background: "white",
  },
};

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface ModalProps {
  children?: React.ReactNode;
  element?: any;
  title?: string;
  subtitle?: string;
  onClose: () => void;
  action?: () => void;
  isActionDisabled?: boolean;
  isOpen: boolean;
  isLoading?: boolean;
  backdropDismiss: boolean;
  hideCloseButton?: boolean;
  showCloseIcon: boolean;
  sx?: SxProps<Theme>;
  isDraggable?: boolean; // New prop to control draggable behavior
}

const Modal = ({
  children,
  element,
  title,
  subtitle,
  isOpen,
  onClose,
  action,
  isActionDisabled,
  hideCloseButton,
  showCloseIcon,
  isLoading,
  backdropDismiss,
  sx,
  isDraggable = false, // Default to false
}: ModalProps) => {
  const [open, setOpen] = React.useState(isOpen);
  const selectedTheme = useSelector((state: RootState) => state.theme.selectedTheme);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    if (!backdropDismiss) {
      return;
    }
    onClose();
  };

  const closeModal = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const handleAction = () => {
    action && action();
  };

  const dialogContent = (
    <CustomDialog
      fullScreen={true}
      onClose={handleClose}
      open={open}
      hideBackdrop={true}
      disableEnforceFocus={true}
      disableAutoFocus={true}
      PaperProps={{
        sx: {
          width: "100%",
          position: "relative",
          top: "0",
          height: "100%",
          minHeight: "70vh",
          maxHeight: "100%",
          borderRadius: "8px",
          p: {
            xs: "0",
            sm: "0 1rem",
            md: "0 2rem",
            xl: "0 4rem",
          },
          ...sx,
        },
      }}
    >
      <DialogTitle
        component={"div"}
        sx={{
          color: selectedTheme === Themes.light ? "#747474" : "#f5f5f5",
          padding: {
            xs: "5px",
            sm: "10px",
            md: "10px",
          },
          mb: "0rem",
          display: "flex",
          justifyContent: !hideCloseButton ? "space-between" : "space-between",
          div: {
            display: "block",
          },
          ".title": {
            position: "relative",
            fontSize: {
              xs: "16px",
              sm: "18px",
              md: "20px",
            },
            textAlign: "center",
            opacity: "0",
          },
          ".subtitle": {
            position: "relative",
            top: "2px",
            fontSize: {
              xs: "12px",
              sm: "14px",
              md: "16px",
            },
            textAlign: "center",
          },
          ".close": {
            position: "relative",
            top: 0,
            color: (theme) => theme.palette.grey[500],
            cursor: "pointer",
          },
        }}
      >
        <div>
          <p className="title" style={{ margin: 0 }}>
            {" sssss"}
            {title}
          </p>
          <p className="subtitle" style={{ margin: 0 }}>
            {" "}
            {subtitle}
          </p>
        </div>

        {showCloseIcon && (
          <IconButton aria-label="close" onClick={closeModal} disableRipple>
            <CloseIcon className="close" />
          </IconButton>
        )}

        {!hideCloseButton && !showCloseIcon && (
          <Button
            onClick={(e) => closeModal(e)}
            sx={{
              ...backButton,
              color: selectedTheme === Themes.light ? "#747474" : "#f5f5f5",
              position: "relative",
              textAlign: "right",
              top: "0px",
              width: "60px",
              fontSize: {
                xs: "16px",
              },
              textTransform: "none",
            }}
          >
            close
          </Button>
        )}
      </DialogTitle>

      <DialogContent
        sx={{
          width: "100%",
          height: "90%",
          padding: "0",
          margin: "0",
        }}
      >
        {children}
      </DialogContent>
    </CustomDialog>
  );

  return isDraggable ? <Draggable>{dialogContent}</Draggable> : dialogContent;
};

export default Modal;
