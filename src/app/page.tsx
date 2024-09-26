"use client";

import styles from "../styles/Home.module.scss";
import PageBody from "../components/PageBody";
import { Box } from "@mui/material";
import MarketWidget from "../components/MarketsWidget";
import AccountWidget from "../components/AccountWidget";
import { useTheme } from "@mui/material/styles";
import AuthGuard from "../AuthGuards/AuthGuard";

const Home = () => {
  const theme = useTheme();
  return (
    <div className={styles.container}>
      <AuthGuard>
        <PageBody>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              background: "transparent",
              ".main": {
                position: "relative",
                mt: "1rem",
                background: theme.palette.mode === "dark" ? "#525252" : "#cecece",
                borderRadius: "12px",
                height: {
                  xs: "80vh",
                  sm: "auto",
                  md: "auto",
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflowX: "hidden",
                padding: {
                  xs: "0.5rem 0",
                  sm: "0rem 0rem",
                  md: "0rem 2rem",
                  lg: "0rem 5rem",
                },
                ".markets-container": {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  padding: {
                    xs: "0.5rem 0rem",
                    sm: "0.9rem 1rem",
                    md: "1rem 1rem",
                  },
                },
              },
            }}
          >
            <div className="main">
              <div className="markets-container">
                <AccountWidget />
                <MarketWidget />
              </div>
            </div>
          </Box>
        </PageBody>
      </AuthGuard>
    </div>
  );
};

export default Home;
