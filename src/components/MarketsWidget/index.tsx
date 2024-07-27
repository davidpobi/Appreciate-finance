"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import { Bar } from "@master-chief/alpaca";
import { GetAccountWatchlistById, GetAccountWatchlists } from "../../services/account.service";
import { GetBars, GetLatestPrice } from "../../services/markets.service";
import { CreateOrderData } from "../../services/orders.service";
import { IOrderQuery } from "../../interfaces/alpaca";
import { handleNotify } from "../../redux/helpers";
import { ToastTypes } from "../../interfaces/notifications";
import { useAppDispatch } from "../../redux/hooks";
import { stockList } from "../../data/stock";
import StockCard from "../Stock/stockCard";
import { Stock } from "../../interfaces/stock";
import Alert from "../Alert";
import { setRefresh } from "../../redux/alpacaSlice";

const BUY_AMOUNT = 100;
const MarketWidget = React.memo(() => {
  const isFirstRender = useRef(true);
  const dispatch = useAppDispatch();
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [openConfirmPrompt, setOpenConfirmPrompt] = useState(false);

  const getAccountWatchlists = async () => {
    const { success, data } = await GetAccountWatchlists();
    if (success) {
      console.log("watchlists", data);
    }
  };

  const getAccountWatchlistById = async () => {
    const { success, data } = await GetAccountWatchlistById("");
    if (success) {
      console.log("watchlist", data);
    }
  };

  const getBars = async () => {
    const { success, data } = await GetBars("PLTR", "1Day");
    const bar: Bar = data;
    if (success) {
      console.log(bar);
    }
  };

  const getLatestPrice = async (symbol: string) => {
    const { success, data } = await GetLatestPrice(symbol);
    const price: number = data;
    if (success) {
      console.log(`${symbol}: ${price}`);
      return price;
    }
    return null;
  };
  const getStockList = async () => {
    const fetchAndMergePrice = async (stock: Stock) => {
      let price = await getLatestPrice(stock.symbol);
      price = Number(price?.toFixed(2));
      return {
        ...stock,
        price: price !== null ? price : undefined,
      };
    };

    const updatedStockList = await Promise.all(stockList.map(fetchAndMergePrice));

    console.log("updatedStockList", updatedStockList);
    setStocks(updatedStockList);
  };

  const createNewOrder = async (stock: Stock) => {
    const order: IOrderQuery = {
      symbol: stock.symbol,
      amount: selectedStock?.defaultBuyAmount || 0,
      qty: 0,
    };

    const { success, data, message } = await CreateOrderData(order);
    if (success) {
      console.log("data", data);
      handleCloseConfirm();
      dispatch(setRefresh({ state: true }));
      handleNotify("Order created successfully", 4000, ToastTypes.Success, dispatch);
      return;
    }
    handleNotify(message || "failed to create order", 2000, ToastTypes.Error, dispatch);
    handleCloseConfirm();
  };

  const confirmNewOrder = async () => {
    if (selectedStock === null) {
      console.log("selectedStock is null");
      return;
    }
    await createNewOrder(selectedStock);
  };

  const showConfirmOrder = (stock: Stock) => {
    setSelectedStock(stock);
    handleOpenConfirm();
  };

  const handleOpenConfirm = async () => {
    setOpenConfirmPrompt(true);
  };

  const handleCloseConfirm = () => {
    setSelectedStock(null);
    setOpenConfirmPrompt(false);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const initializeData = async () => {
        await Promise.all([getStockList()]);
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
          height: "100%",
          borderRadius: "18px",
          display: "flex",
          justifyContent: "center",
          ".item": {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "2rem",
          },
          ".stocks": {
            width: {
              xs: "90vw",
              sm: "90vw",
              md: "auto",
            },
            height: {
              xs: "90vw",
              sm: "90vw",
              md: "auto",
            },
            borderRadius: "18px",
            position: "relative",
            cursor: "pointer",
            objectFit: "contain",
          },
        }}
      >
        <div className="stocks">
          <Grid container maxWidth={"100%"}>
            {stocks.length > 0 &&
              stocks.map((x: Stock, i: number) => (
                <Grid item xs={12} sm={6} md={6} className="item" key={`${x.symbol}_${i}`}>
                  <StockCard data={x} action={showConfirmOrder} />
                </Grid>
              ))}

            {stocks.length === 0 &&
              stockList.map((x: Stock, i: number) => (
                <Grid item xs={12} sm={6} md={6} className="item" key={`${x.symbol}_${i}`}>
                  <Skeleton
                    variant="rectangular"
                    sx={{ width: "177px", height: "95px", borderRadius: "12px", background: "gray" }}
                  />
                </Grid>
              ))}
          </Grid>
        </div>
      </Box>

      <Alert
        open={openConfirmPrompt}
        texts={{
          main:
            selectedStock !== null ? `Buy $${selectedStock?.defaultBuyAmount} worth of ${selectedStock?.symbol}?` : "",
          message: "Kindly review your order and proceed to buy.",
          buttonText: "Proceed",
        }}
        confirmCallback={confirmNewOrder}
        denyCallback={handleCloseConfirm}
        closeCallback={handleCloseConfirm}
      />
    </React.Fragment>
  );
});

export default MarketWidget;
