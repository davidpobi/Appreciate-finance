import { BarsTimeframe } from "@master-chief/alpaca";
import { AlpacaClient } from "../(config)/alpaca";
import { IQueryResponse } from "../../../interfaces/alpaca";

export const GetLatestPrice = async (symbol: string) => {
  let { success, data }: IQueryResponse = { success: false, data: null };
  try {
    const latestTrade = await AlpacaClient.getLatestTrade({ symbol: symbol });

    const price: number | null = latestTrade.trade.p || null;
    data = price;
    success = true;
  } catch (err) {
    console.log("GetLatestPrice Err", err);
    success = false;
    data = null;
  }
  return { success, data };
};

export const GetBars = async (symbol: string, timeframe: BarsTimeframe) => {
  let { success, data }: IQueryResponse = { success: false, data: null };
  try {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const fourDaysAgo = new Date(today);
    fourDaysAgo.setDate(today.getDate() - 4);
    console.log("fourDaysAgo", fourDaysAgo);

    const bars = await AlpacaClient.getBars({
      symbol: symbol,
      start: new Date(fourDaysAgo.toISOString()),
      end: new Date(yesterday.toISOString()),
      timeframe: timeframe,
    });

    console.log("bars", bars);
    data = bars;
    success = true;
  } catch (err) {
    console.log("GetBars Err", err);
    success = false;
    data = null;
  }
  return { success, data };
};
