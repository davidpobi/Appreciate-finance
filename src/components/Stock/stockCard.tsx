"use client";

import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Stock } from "../../interfaces/stock";
import { defaultThumbnail } from "../../data";
import { FormatAmount } from "../../utils/numberFormat";
import { useTheme } from "@mui/material/styles";

interface StockCardProps {
  data: Stock;
  action?: (data: Stock) => void;
}
const StockCard = React.memo(({ data, action }: StockCardProps) => {
  const theme = useTheme();

  const handleAction = () => {
    action && action(data);
  };
  return (
    <React.Fragment>
      <Box
        onClick={handleAction}
        component={"div"}
        sx={{
          cursor: "pointer",
          width: {
            xs: "100%",
            sm: "100%",
            md: "100%",
          },
          height: "100%",
          background: theme.palette.mode === "dark" ? "#8f8f8f" : "white",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          padding: {
            xs: "1rem 1.5rem",
            sm: "1rem 1.5rem",
            md: "1rem 0",
          },
          border: "1px solid transparent",
          transition: "all 0.3s ease",
          "&:hover": {
            border: "1px solid #cecece",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          },
          ".left": {
            display: "flex",
            flexDirection: "row",
            justifyContent: {
              xs: "center",
              sm: "center",
              md: "right",
            },
            alignItems: "center",
          },
          ".right": {
            display: "flex",
            justifyContent: "center",
          },
          ".meta": {
            display: "flex",
            justifyContent: "center",
            ".img": {
              borderRadius: "50%",
              width: {
                xs: "40px",
                sm: "40px",
                md: "50px",
              },
              height: {
                xs: "40px",
                sm: "40px",
                md: "50px",
              },
              objectFit: "contain",
              background: "white",
            },
          },
          ".details": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontFamily: "THICCCBOI, sans-serif",
            ".symbol": {
              color: theme.palette.mode === "dark" ? "black" : "gray",
              mt: "5px",
              fontWeight: 500,
              fontSize: {
                xs: "15px",
                sm: "17px",
                md: "17px",
              },
              cursor: "pointer",
            },
            ".price": {
              mt: "-2px",
              color: "#000000",
              fontWeight: 900,
              fontSize: {
                xs: "19px",
                sm: "22px",
                md: "22px",
              },
              cursor: "pointer",
            },
          },
        }}
      >
        <Grid container columnSpacing={2}>
          <Grid item xs={4} className="left">
            <div className="meta">
              <Image
                src={data.imageUrl || defaultThumbnail}
                alt=""
                width={40}
                height={40}
                sizes={"100%"}
                objectFit={"contain"}
                className="img"
              />
            </div>
          </Grid>
          <Grid item xs={8} className="right">
            <Typography component={"div"} className="details">
              <label className="symbol">{data.symbol}</label>
              <label className="price">
                {" "}
                <FormatAmount amount={data.price || 0} />{" "}
              </label>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
});

export default StockCard;
