"use client";

import React, { useState } from "react";
import { Select, MenuItem, SelectChangeEvent, ClickAwayListener, Box } from "@mui/material";

export interface SelectBoxProps {
  options: { label: any; value: any }[];
  label?: string;
  name: string;
  value: string;
  helperText?: string;
  handleChangeCallback: (e: SelectChangeEvent) => void;
}

const CustomSelect = ({ options, label, name, value, helperText, handleChangeCallback }: SelectBoxProps) => {
  const [open, setOpen] = useState(false);

  const handleChange = (e: SelectChangeEvent) => {
    handleChangeCallback(e);
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        component={"div"}
        onClick={handleToggle}
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
            display: "flex",
            alignItems: "center",
            position: "relative",
            top: "0px",
            width: "100%",
            height: "40px",
            borderRadius: "8px",
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
          },
          ".error": {
            display: helperText ? "block" : "none",
            position: "relative",
            textAlign: "left",
            top: "-14px",
            fontSize: "14px",
            color: "red",
          },
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div className="field-container">
            <label className="input-label">{label}</label>
            <Select
              open={open}
              name={name}
              onChange={(e: SelectChangeEvent) => handleChange(e)}
              placeholder={""}
              autoWidth={true}
              displayEmpty={false}
              value={value}
              MenuProps={{
                sx: { width: "100%", maxWidth: "100%", marginTop: "20px" },
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
              }}
              sx={{
                position: "relative",
                width: "100%",
                borderRadius: "10px",
                border: "2px solid #b5b5b5",
                ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
                  padding: "0px 0px 0px 0px",
                  margin: "0px 0px 0px 0px",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  border: "none !important",
                },
                ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid #6e6bc0",
                },
                ".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                  border: "none !important",
                },
                ":focus": {
                  border: "2px solid #6e6bc0",
                },
              }}
              className="field"
            >
              {options.map((option, index) => (
                <MenuItem key={index} value={option.value} sx={{ width: "400px", maxWidth: "420px", fontSize: "15px" }}>
                  {option.label.replace("(the)", "")}
                </MenuItem>
              ))}

              {options.length == 0 ? <MenuItem>loading..</MenuItem> : []}
            </Select>
            <label className="error">{helperText}</label>
          </div>
        </ClickAwayListener>
      </Box>
    </>
  );
};

export default CustomSelect;
