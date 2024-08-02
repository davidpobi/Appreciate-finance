import { IOrderQuery } from "../interfaces/alpaca";
import { Stock } from "../interfaces/stock";

export const stockList: Stock[] = [
  {
    name: "Palantir",
    symbol: "PLTR",
    imageUrl: "https://logo.clearbit.com/palantir.com",
    defaultBuyAmount: 200,
  },
  {
    name: "NVIDIA",
    symbol: "NVDA",
    imageUrl: "https://logo.clearbit.com/nvidia.com",
    defaultBuyAmount: 200,
  },
  {
    name: "TESLA",
    symbol: "TSLA",
    imageUrl: "https://logo.clearbit.com/tesla.com",
    defaultBuyAmount: 200,
  },
  {
    name: "COINBASE",
    symbol: "COIN",
    imageUrl: "https://logo.clearbit.com/coinbase.com",
    defaultBuyAmount: 100,
  },
  {
    name: "ARM",
    symbol: "ARM",
    imageUrl: "https://logo.clearbit.com/arm.com",
    defaultBuyAmount: 200,
  },
  {
    name: "OKLO",
    symbol: "OKLO",
    imageUrl: "https://logo.clearbit.com/oklo.com",
    defaultBuyAmount: 100,
  },
  {
    name: "Unity",
    symbol: "U",
    imageUrl: "https://logo.clearbit.com/unity.com",
    defaultBuyAmount: 25,
  },
];
