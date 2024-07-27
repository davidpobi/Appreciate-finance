"use client";

import { Box, CircularProgress, Fab } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import HistoryIcon from "@mui/icons-material/History";
import { useTheme } from "@mui/material/styles";
import { updateBodyPositionAttribute } from "../../utils/helpers";

interface ChatBoxProps {
  ref: any;
  children: any;
  showButton?: boolean;
  loadingHistory?: boolean;
  scrollable: boolean;
  getHistoryCallback?: () => void;
}

const ChatBox = forwardRef<HTMLDivElement, ChatBoxProps>(
  ({ children, showButton, loadingHistory, scrollable, getHistoryCallback }, ref) => {
    const [showButton_, setShowButton] = useState(showButton);
    const [isScrollable, setIsScrollable] = useState(scrollable);
    const theme = useTheme();

    const handleLoadHistory = () => {
      getHistoryCallback && getHistoryCallback();
    };

    useEffect(() => {
      setShowButton(showButton);
    }, [showButton]);

    useEffect(() => {
      setIsScrollable(scrollable);
      scrollable ? updateBodyPositionAttribute("relative") : updateBodyPositionAttribute("fixed");
    }, [scrollable]);

    return (
      <>
        <Box
          ref={ref}
          className="chatArea"
          sx={{
            flex: "1 1 auto",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            overflowX: "hidden",
            overflowY: "scroll",
            scrollBehavior: "smooth",
            ".widget": {
              display: "flex",
              justifyContent: "center",
              background: "transparent",
              ".historyBtn": {
                backgroundColor: "transparent",
                mt: {
                  xs: "2px",
                  sm: "5px",
                  md: "5px",
                },
                width: {
                  xs: "25px",
                  sm: "30px",
                  md: "40px",
                },
                height: {
                  xs: "25px",
                  sm: "30px",
                  md: "40px",
                },
                minWidth: "5px",
                minHeight: "5px",
                border: `1px solid ${theme.palette.text.primary}`,
                display: "flex",
                boxShadow: "none",
                opacity: 0.4,
                ".icon": {
                  position: "relative",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: {
                    xs: "15px",
                    sm: "19px",
                    md: "21px",
                  },
                  color: theme.palette.text.primary,
                },
                ":disabled": {
                  color: "grey",
                },
                "&:hover, &:active, &:focus, &:focus-visible, &.Mui-selected, &.Mui-focusVisible,  &:disabled": {
                  color: "#FFFFF",
                  backgroundColor: "transparent",
                  border: `2px solid ${theme.palette.text.primary}`,
                  ".icon": {
                    color: "grey",
                  },
                },
              },
            },
            ".chatBox": {
              position: "relative",
              flex: "1 1 auto",
              padding: {
                xs: "18px 0 4rem 0",
                sm: "45px 3rem 0 1rem",
                md: "45px 7rem 0",
                xl: "45px 7rem 0",
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
              mb: 2,
            },
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "2px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "gray",
              borderRadius: "8px",
            },
          }}
        >
          {showButton_ && (
            <div className="widget">
              <Fab onClick={handleLoadHistory} className="historyBtn">
                {!loadingHistory ? (
                  <HistoryIcon className="icon" />
                ) : (
                  <CircularProgress size={"10px"} sx={{ color: theme.palette.text.primary }} />
                )}
              </Fab>
            </div>
          )}
          <div className="chatBox">{children}</div>
        </Box>
      </>
    );
  }
);

export default ChatBox;
