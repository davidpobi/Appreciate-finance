import { Account } from "@master-chief/alpaca";
import { Box, Skeleton, Typography, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { GetAccountActivityHistory, GetAccountData } from "../../services/account.service";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setAccountInfo, setRefresh, setTransactions } from "../../redux/alpacaSlice";
import { FormatAmount } from "../../utils/numberFormat";
import { useTheme } from "@mui/material/styles";
import { ITransaction } from "../../interfaces/alpaca";

const AccountWidget = () => {
  const isFirstRender = useRef(true);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const refresh = useAppSelector((state) => state.alpaca.refresh);
  const [account, setAccount] = useState<Account | null>(null);
  const [buyingPower, setBuyingPower] = useState(0);
  const [cash, setCash] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [totalPL, setTotalPL] = useState<number>(0);

  const getAccount = async () => {
    setLoading(true);
    console.log("fetching account");
    const { success, data } = await GetAccountData();
    const account: Account = data;
    if (success) {
      console.log("account", account);
      setAccount(account);
      dispatch(setAccountInfo({ data: account }));
      dispatch(setRefresh({ state: false }));
      setBuyingPower(Number(account.buying_power.toFixed(2)));
      setCash(Number(account.cash.toFixed(2)));
      setCurrentValue(Number(account.portfolio_value));
      setLoading(false);
    }
  };

  const getAccountActivityHistory = async () => {
    try {
      const { success, data } = await GetAccountActivityHistory();
      if (success) {
        console.log("account activities", data);
        dispatch(setTransactions({ transactions: data }));

        const totalDeposits = data
          .filter((transaction: ITransaction) => transaction.type === "DEPOSIT")
          .reduce((sum: number, transaction: ITransaction) => sum + Number(transaction.amount), 0);

        setTotalInvestment(totalDeposits);
      }
    } catch (error) {
      console.error("Error fetching account activity history:", error);
    }
  };

  useEffect(() => {
    if (!refresh) {
      console.log("refresh done");
      return;
    }
    getAccount();
    getAccountActivityHistory();
  }, [refresh]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const initializeData = async () => {
        await Promise.all([getAccount(), getAccountActivityHistory()]);
      };
      initializeData();
    }
  }, []);

  // Calculate total P/L when account or totalInvestment changes
  useEffect(() => {
    if (account && totalInvestment !== null) {
      const pl = Number(account.portfolio_value) - totalInvestment;
      setTotalPL(pl);
    }
  }, [account, totalInvestment]);

  // Calculate P/L percentage
  const plPercentage = totalInvestment > 0 ? (totalPL / totalInvestment) * 100 : 0;

  return (
    <React.Fragment>
      <Box
        component={"div"}
        sx={{
          width: "100%",
          background: theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          borderRadius: "12px",
          padding: "1.5rem 1rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          // border: "1px solid",
          borderColor: theme.palette.mode === "dark" ? "#333" : "#ddd",
          ".balance": {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.2rem",
            textAlign: "left",
            ".label": {
              fontWeight: 700,
              color: "#6b7280",
            },
            ".value": {
              fontSize: "1.4rem",
              fontWeight: 900,
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
            },
            ".pl": {
              color: totalPL >= 0 ? "green" : "red",
            },
          },
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 900, textAlign: "left" }}>
          Portfolio Summary
        </Typography>
        {account !== null && !loading ? (
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4} className="balance">
              <Typography variant="body1" component="span" className="label">
                Total Investment:
              </Typography>
              <Typography component="div" className="value">
                <FormatAmount amount={totalInvestment} />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} className="balance">
              <Typography variant="body1" component="span" className="label">
                Current Value:
              </Typography>
              <Typography component="div" className="value">
                <FormatAmount amount={currentValue} />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} className="balance">
              <Typography variant="body1" component="span" className="label">
                Total P/L:
              </Typography>
              <label className="value pl">
                <FormatAmount amount={totalPL} /> <label>({plPercentage.toFixed(2)}%)</label>
              </label>
            </Grid>
          </Grid>
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              height: "40px",
              borderRadius: "12px",
              background: "gray",
              margin: "1rem 0",
            }}
          />
        )}
      </Box>
    </React.Fragment>
  );
};

export default AccountWidget;
