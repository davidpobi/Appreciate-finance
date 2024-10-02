"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import { Bar } from "@master-chief/alpaca";
import { GetAccountWatchlistById, GetAccountWatchlists } from "../../services/account.service";
import { GetBars, GetLatestPrice } from "../../services/markets.service";
import { useAppSelector } from "../../redux/hooks";
import { stockList } from "../../data/stock";
import StockCard from "../Stock/stockCard";
import { Stock } from "../../interfaces/stock";
import { RootState } from "../../redux/store";
import { ITransaction } from "../../interfaces/alpaca"; // Make sure this import exists
import StockDetail from "../Stock/StockDetail/index";

const MarketWidget = React.memo(() => {
  const isFirstRender = useRef(true);

  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [openStockDetail, setOpenStockDetail] = useState(false);

  const transactions = useAppSelector((state: RootState) => state.alpaca.transactions);

  const mergeStocksWithTransactions = (stocks: Stock[], transactions: ITransaction[]): Stock[] => {
    return stocks.map((stock) => ({
      ...stock,
      transactions: transactions.filter((transaction) => transaction.symbol === stock.symbol),
    }));
  };

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

  const getStockList = async (transactions: ITransaction[]) => {
    const fetchAndMergePrice = async (stock: Stock) => {
      let price = await getLatestPrice(stock.symbol);
      price = Number(price?.toFixed(2));
      return {
        ...stock,
        price: price !== null ? price : undefined,
      };
    };

    const updatedStockList = await Promise.all(stockList.map(fetchAndMergePrice));
    const mergedStocks = mergeStocksWithTransactions(updatedStockList, transactions);

    setStocks(mergedStocks);
  };

  const showStockDetail = (stock: Stock) => {
    setSelectedStock(stock);
    setOpenStockDetail(true);
  };

  const handleCloseStockDetail = () => {
    setSelectedStock(null);
    setOpenStockDetail(false);
  };

  useEffect(() => {
    if (transactions === null) {
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      const initializeData = async () => {
        await Promise.all([getStockList(transactions)]);
      };
      initializeData();
    }
  }, [transactions]);

  return (
    <React.Fragment>
      <Box
        component={"div"}
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "18px",
          ".item": {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "1.2rem 0",
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
          <Grid container maxWidth={"100%"} columnGap={{ xs: 1, sm: 1.2, md: 1.5, lg: 2 }}>
            {stocks.length > 0 &&
              stocks.map((x: Stock, i: number) => (
                <Grid item xs={12} sm={5.9} md={5.9} lg={5.9} className="item" key={`${x.symbol}_${i}`}>
                  <StockCard data={x} action={showStockDetail} />
                </Grid>
              ))}

            {stocks.length === 0 &&
              stockList.map((x: Stock, i: number) => (
                <Grid item xs={12} sm={5.9} md={5.9} lg={5.9} className="item" key={`${x.symbol}_${i}`}>
                  <Skeleton
                    variant="rectangular"
                    sx={{ width: "100%", height: "250px", borderRadius: "12px", background: "gray" }}
                  />
                </Grid>
              ))}
          </Grid>
        </div>
      </Box>

      <StockDetail
        open={openStockDetail}
        handleClose={handleCloseStockDetail}
        refresh={() => {}}
        data={selectedStock}
        isDraggable={true}
      />

      {/* <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openStockDetail}>
        
      </Backdrop> */}
    </React.Fragment>
  );
});

export default MarketWidget;
