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
                ".markets-container": {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  padding: {
                    xs: "1rem",
                    sm: "4rem",
                    md: "4rem",
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
