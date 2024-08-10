import { Account } from "@master-chief/alpaca";
import { Box, Skeleton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { GetAccountActivityHistory, GetAccountData } from "../../services/account.service";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setAccountInfo, setRefresh } from "../../redux/alpacaSlice";
import { FormatAmount } from "../../utils/numberFormat";
import { useTheme } from "@mui/material/styles";

const AccountWidget = () => {
  const isFirstRender = useRef(true);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { refresh } = useAppSelector((state) => ({
    refresh: state.alpaca.refresh,
  }));
  const [account, setAccount] = useState<Account | null>(null);
  const [buyingPower, setBuyingPower] = useState(0);
  const [cash, setCash] = useState(0);
  const [loading, setLoading] = useState(false);

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
      setLoading(false);
    }
  };

  const getAccountActivityHistory = async () => {
    const { success, data } = await GetAccountActivityHistory();
    if (success) {
      console.log("account acitivities", data);
    }
  };
  useEffect(() => {
    if (!refresh) {
      console.log("refresh done");
      return;
    }
    getAccount();
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
  return (
    <React.Fragment>
      <Box
        component={"div"}
        sx={{
          width: "100%",
          background: theme.palette.mode === "dark" ? "#3d3d3d" : "#aeaeae",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "12px",
          ".balance": {
            padding: {
              xs: "5px 1rem",
              sm: "0 1rem",
              md: "0 1rem",
            },
            color: theme.palette.mode === "dark" ? "#cecece" : "#000000",
            fontWeight: 900,
            fontSize: {
              xs: "14px",
              sm: "22px",
              md: "22px",
            },
            h1: {
              padding: "0",
              margin: "0",
            },
            ".label": {
              fontSize: {
                xs: "14px",
                sm: "24px",
                md: "24px",
              },
            },
          },
        }}
      >
        <div></div>
        <div className="balance">
          {account !== null && !loading && (
            <h1>
              <span className="label">Balance: </span>

              <FormatAmount amount={cash || 0} />
            </h1>
          )}

          {(account === null || loading) && (
            <Skeleton
              variant="rectangular"
              sx={{ width: "177px", height: "52px", borderRadius: "12px", background: "gray", margin: "1rem" }}
            />
          )}
        </div>
      </Box>
    </React.Fragment>
  );
};

export default AccountWidget;
