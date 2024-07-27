"use client";

import { Box, Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import EyeIcon from "@mui/icons-material/Visibility";

export interface InputProps {
  label?: string;
  name?: string;
  value?: number | string;
  type: string;
  placeholder?: string;
  isDisabled?: boolean;
  autoComplete?: boolean;
  showJoin?: boolean;
  helperText?: string;
  hideText?: boolean;
  onClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.ChangeEvent<any>) => void;
  classes?: string;
  rightIcon?: React.ReactNode;
}
const Input = ({
  label,
  name,
  value,
  type,
  placeholder,
  isDisabled,
  autoComplete,
  showJoin,
  helperText,
  hideText,
  onChange,
  onKeyDown,
  classes,
  rightIcon,
}: InputProps) => {
  const [showText, setShowText] = useState(false);

  const toggleVisibility = () => {
    setShowText(!showText);
  };

  return (
    <Box
      component={"div"}
      sx={{
        ".input-label": {
          top: "-5px",
          position: "relative",
          textAlign: "left",
          color: "#343f52",
          fontSize: "16px",
          fontFamily: "THICCCBOI, sans-serif",
          paddingBottom: "0.2rem",
        },
        ".field-container": {
          position: "relative",
          display: "flex",
          alignItems: "center",
          mb: "20px",
        },
        ".field": {
          display: showJoin ? "inline-block" : "inline-block",
          position: "relative",
          top: "0px",
          width: "100%",
          height: "40px",
          borderRadius: showJoin ? "4px" : "8px",
          border: "2px solid #b5b5b5",
          outline: "none",
          backgroundColor: "transparent",
          padding: "1.4rem",
          color: "#808080",
          fontSize: {
            xs: "17px",
            md: "17px",
          },
          mr: "5px",
        },
        ".field:focus": {
          border: "2px solid #6e6bc0",
        },
        ".field::placeholder": {
          color: "#808080",
          opacity: "0.5",
        },
        ".icon": {
          display: showJoin ? "none" : "block",
          position: "absolute",
          right: "1.4rem",
          marginTop: "auto",
          marginBottom: "auto",
          cursor: "pointer",
        },
        ".join": {
          width: {
            xs: "20%",
            sm: "30%",
            md: "30%",
          },
          display: "inline-block",
          ".btn": {
            background: "#605dba",
            color: "white",
            position: "relative",
            top: "0px",
            height: "48px",
            borderRadius: "4px",
            p: 0,
          },
        },
        ".error": {
          display: helperText ? "block" : "none",
          position: "relative",
          textAlign: "left",
          top: "-14px",
          fontSize: "14px",
          color: "red",
        },
        mb: 0,
      }}
    >
      <label className="input-label">{label}</label>
      <div className="field-container">
        <input
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          type={!showText ? type : "text"}
          name={name}
          placeholder={placeholder}
          className={`field ${classes}`}
          autoComplete={autoComplete ? "on" : "new-password"}
          disabled={isDisabled}
        />

        {type === "password" && (
          <IconButton onClick={toggleVisibility} sx={{ p: 0, m: 0, mt: "-5px" }}>
            <EyeIcon className="icon" />
          </IconButton>
        )}

        {rightIcon !== undefined && type !== "password" && <>{rightIcon}</>}
        {showJoin && (
          <div className="join">
            <Button className="btn">Join</Button>
          </div>
        )}
      </div>

      <label className="error">{helperText}</label>
    </Box>
  );
};

export default Input;
