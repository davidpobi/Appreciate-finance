"use client";

import { Box } from "@mui/material";
import React, { createRef, useEffect } from "react";
import ToastWidget from "../ToastWidget";
import styles from "./styles.module.scss";

interface PageBodyProps {
  children: any;
  hidePadding?: boolean;
  scrollPage?: boolean;
}

const PageBody = ({ children, hidePadding, scrollPage }: PageBodyProps) => {
  const anchorRef = createRef<any>();

  useEffect(() => {
    const scrollToTop = () => {
      anchorRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    if (!scrollPage) {
      return;
    }
    scrollToTop();
  }, [scrollPage, anchorRef]);

  return (
    <>
      <ToastWidget />
      <Box
        component={"div"}
        ref={anchorRef}
        className={styles.main}
        sx={{
          position: "relative",
          height: "auto",
          margin: 0,
          padding: hidePadding
            ? "0"
            : {
                xs: "0 1rem",
                sm: "0 1.2rem",
                md: "0 2rem",
              },
          overflowY: "scroll",
          scrollBehavior: "smooth",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default PageBody;
