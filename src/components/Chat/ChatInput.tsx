"use client";

import { Box, Button, CircularProgress, Input, NoSsr } from "@mui/material";
import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import EqIcon from "@mui/icons-material/GraphicEqOutlined";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import { useTheme } from "@mui/material/styles";

interface ChatInputProps {
  value: any;
  isQueryState: boolean;
  isPlayingState: boolean;
  autoFocus: boolean;
  handleChange: (e: React.BaseSyntheticEvent) => void;
  addQueryCallback: (e: any) => void;
  openWidgetsCallback?: (e: any) => void;
}

const ChatInput = ({
  value,
  isQueryState,
  isPlayingState,
  autoFocus,
  handleChange,
  addQueryCallback,
  openWidgetsCallback,
}: ChatInputProps) => {
  const theme = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme.palette.mode);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && !isQueryState) {
      // addQueryCallback(e);
    }
  };

  useEffect(() => {
    setSelectedTheme(theme.palette.mode);
  }, [theme]);

  return (
    <>
      <NoSsr>
        <Box
          className="queryArea"
          sx={{
            flex: "0 1 auto",
            width: "100%",
            position: "fixed",
            bottom: "0", //"10vh",
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            padding: {
              xs: "0 0 0.2rem",
              sm: "0 1rem 0.2rem",
              md: "0 1rem 0.2rem",
              xl: "0 7rem 0.2rem",
            },
            ".container": {
              width: "100%",
              height: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 5px",
              ".chatField": {
                width: "calc(100% - 50px)",
                height: "auto",
                minHeight: "40px",
                maxHeight: "45vh",
                borderRadius: "8px",
                border: "2px solid #b5b5b5",
                outline: "none",
                backgroundColor: "transparent",
                padding: "10px 1.4rem",
                color: "#808080",
                fontSize: {
                  xs: "17px",
                  md: "17px",
                },
                mr: "5px",
                overflowX: "hidden",
                overflowY: "scroll",
                ":focus": {
                  outline: 0,
                },
              },
              ".go": {
                padding: {
                  xs: "20px 0 0",
                  sm: "10px 1rem 0",
                  md: "10px 1rem 0",
                  xl: "10px 7rem 0",
                },
                position: "absolute",
                bottom: 0,
                right: "2px",
                flex: "0 0 auto",
                flexShrink: 0,
                paddingBottom: "3px",
                ".btn": {
                  position: "relative",
                  top: "-4px",
                  width: "50px",
                  minWidth: "5px",
                  display: "flex",
                  justifyContent: "center",
                  background: "gray",
                  color: "white",
                  height: "48px",
                  borderRadius: "4px",
                  p: 0,
                  ".icon": {
                    //  color: selectedTheme === Themes.dark ? "white" : "#b5b5b5",
                  },
                  ".eq": {
                    color: "purple",
                  },
                },
                ".more": {
                  position: "relative",
                  top: "-4px",
                  width: "50px",
                  minWidth: "5px",
                  height: "2px",
                  minHeight: "2px",
                  background: theme.palette.background.default,
                  border: "1px solid #b5b5b5",
                  opacity: 1,
                  ".icon": {
                    fontSize: "24px",
                    color: "#b5b5b5",
                  },
                },
              },
            },
          }}
        >
          <div className="container">
            <Input
              multiline
              value={value}
              disableUnderline={true}
              type={"text"}
              name={"query"}
              placeholder={""}
              className="chatField"
              onChange={(e) => handleChange(e)}
              onKeyDown={handleKeyPress}
              autoComplete={"off"}
              disabled={false}
              autoFocus={autoFocus}
            />
            <div className="go">
              <Button onClick={openWidgetsCallback} className="more" disabled={isQueryState}>
                <MoreIcon className="icon" />
              </Button>
              <Button onClick={addQueryCallback} className="btn" disabled={isQueryState || isPlayingState}>
                {isQueryState && <CircularProgress size={"20px"} sx={{ color: "#b5b5b5" }} />}
                {isPlayingState && <EqIcon className="icon eq" />}

                {!isQueryState && !isPlayingState && <SendIcon className="icon" />}
              </Button>
            </div>
          </div>
        </Box>
      </NoSsr>
    </>
  );
};

export default ChatInput;
