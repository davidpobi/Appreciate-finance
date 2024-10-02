"use client";

import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Stock } from "../../interfaces/stock";
import { defaultThumbnail } from "../../data";
import { FormatAmount } from "../../utils/numberFormat";
import { useTheme } from "@mui/material/styles";
import { Direction } from "../../interfaces/alpaca";

interface StockCardProps {
  data: Stock;
  action?: (data: Stock) => void;
}

const StockCard = React.memo(({ data, action }: StockCardProps) => {
  const theme = useTheme();

  const handleAction = () => {
    action && action(data);
  };

  // Calculate the total investment amount
  const investmentAmount =
    data.transactions?.reduce(
      (sum, transaction) =>
        sum + (transaction.direction === Direction.credit ? transaction.amount : -transaction.amount),
      0
    ) || 0;

  // Calculate the total quantity of shares
  const totalQuantity =
    data.transactions?.reduce(
      (sum, transaction) => sum + (transaction.direction === Direction.credit ? transaction.qty : -transaction.qty),
      0
    ) || 0;

  // Calculate the current value based on the current price and total quantity of shares
  const currentValue = (data.price || 0) * totalQuantity;

  // Calculate profit/loss and profit/loss percentage
  const profitLoss = currentValue - investmentAmount;
  const profitLossPercentage = investmentAmount !== 0 ? (profitLoss / investmentAmount) * 100 : 0;

  // Format the percentage change
  const formattedPercentageChange = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(profitLossPercentage / 100);

  return (
    <Box
      onClick={handleAction}
      sx={{
        cursor: "pointer",
        width: "100%",
        background: theme.palette.background.paper,
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} display="flex" alignItems="center" mb={2}>
          <Box mr={1} display="flex" alignItems="center">
            <Image
              src={data.imageUrl || defaultThumbnail}
              alt={`${data.symbol} logo`}
              width={30}
              height={30}
              style={{ borderRadius: "50%" }}
            />
          </Box>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            {data.symbol}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            Investment
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            <FormatAmount amount={investmentAmount} />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            Current Value
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            <FormatAmount amount={currentValue} />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            fontWeight="bold"
            color={profitLossPercentage >= 0 ? theme.palette.success.main : theme.palette.error.main}
          >
            P/L: <FormatAmount amount={profitLoss} /> ({formattedPercentageChange})
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
});

export default StockCard;
