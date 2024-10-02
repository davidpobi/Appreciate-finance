import React from "react";
import { Button as MuiButton, ButtonProps as MuiButtonProps, SxProps, Theme, useTheme } from "@mui/material";

interface CustomButtonProps extends MuiButtonProps {
  startIcon?: React.ReactNode;
  sx?: SxProps<Theme> | undefined;
}

const Button: React.FC<CustomButtonProps> = ({ children, startIcon, sx, ...props }) => {
  const theme = useTheme();
  return (
    <MuiButton
      variant="contained"
      startIcon={startIcon}
      {...props}
      sx={{
        width: "106px",
        height: "40px",
        backgroundColor: theme?.palette.mode === "dark" ? "transparent" : "white",
        border: "1px solid #cecece",
        borderRadius: "12px",
        color: theme?.palette.mode === "dark" ? "white" : "#757575",
        padding: "5px 15px",
        fontSize: "16px",
        "&:hover": {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          backgroundColor: theme?.palette.mode === "dark" ? "transparent" : "white",
        },
        "&:disabled": {
          backgroundColor: theme?.palette.mode === "dark" ? "transparent" : "white",
          color: theme?.palette.mode === "dark" ? "white" : "#757575",
          opacity: 0.5,
        },
        "&:active": {
          backgroundColor: theme?.palette.mode === "dark" ? "transparent" : "white",
        },
        "&:focus": {
          backgroundColor: theme?.palette.mode === "dark" ? "transparent" : "white",
        },
        "&:focus-visible": {
          backgroundColor: theme?.palette.mode === "dark" ? "transparent" : "white",
          border: "none",
        },
        "&.Mui-selected": {
          backgroundColor: theme?.palette.mode === "dark" ? "transparent" : "white",
        },
        "&.Mui-focusVisible": {
          background: theme?.palette.mode === "dark" ? "transparent" : "white",
        },
        ...sx,
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
