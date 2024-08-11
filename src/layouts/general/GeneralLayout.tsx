"use client";

import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GeneralNavBar from "./GeneralNavbar";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useEffect, useMemo, useState } from "react";
import { Themes } from "../../interfaces/theme";

const GeneralLayout = ({ children }: any) => {
  const [mode, setMode] = useState<Themes>(Themes.dark);
  const selectedTheme = useAppSelector((state: RootState) => state.theme.selectedTheme);

  useEffect(() => {
    setMode(selectedTheme);
  }, [selectedTheme]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#3f51b5",
          },
          secondary: {
            main: mode === Themes.dark ? "#919cd9" : "#3f51b5",
          },
          background: {
            default: mode === Themes.dark ? "#1c1c1c" : "white",
          },
          text: {
            primary: mode === Themes.dark ? "#c4c4c4" : "#757575",
          },
        },
      }),
    [mode]
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: "transparent",
          }}
        >
          <GeneralNavBar />
          <main>{children}</main>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default GeneralLayout;
