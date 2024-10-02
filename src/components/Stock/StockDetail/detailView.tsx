"use client";

import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { Stock } from "../../../interfaces/stock";
import { defaultThumbnail } from "../../../data";
import { FormatAmount } from "../../../utils/numberFormat";
import { useTheme } from "@mui/material/styles";
import TransactionsTable from "../../Transactions/transactionsTable";
import Button from "../../Button/button";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOnOutlined";

interface DetailViewProps {
  data: Stock;
  investmentAmount: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  formattedPercentageChange: string;
  onBuyClick: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({
  data,
  investmentAmount,
  currentValue,
  profitLoss,
  profitLossPercentage,
  formattedPercentageChange,
  onBuyClick,
}) => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} mb={2} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Box mr={2}>
            <Image
              src={data.imageUrl || defaultThumbnail}
              alt={`${data.symbol} logo`}
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
            />
          </Box>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            {data.symbol}
          </Typography>
        </div>
        <Button
          onClick={onBuyClick}
          variant="contained"
          color="primary"
          sx={{ width: "auto", height: "30px", padding: "1rem 1rem", fontSize: "14px", textTransform: "none" }}
          startIcon={<MonetizationOnIcon />}
        >
          Invest
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1" color="text.secondary">
          Investment
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          <FormatAmount amount={investmentAmount} />
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1" color="text.secondary">
          Current Value
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          <FormatAmount amount={currentValue} />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          fontWeight="bold"
          color={profitLossPercentage >= 0 ? theme.palette.success.main : theme.palette.error.main}
        >
          P/L: <FormatAmount amount={profitLoss} /> ({formattedPercentageChange})
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" fontWeight="bold" mt={3} mb={2}>
          Transaction History
        </Typography>
        <TransactionsTable transactions={data.transactions || []} />
      </Grid>
    </Grid>
  );
};

export default DetailView;
