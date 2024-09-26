import { AlpacaClient } from "../(config)/alpaca";
import { IGetAccountResponse, IQueryResponse, ITransaction } from "../../../interfaces/alpaca";
import { processAccountActivities } from "../../../utils/utils";

export const GetAccountAuthenticatedState = async () => {
  let success = false;

  try {
    const isAuthenticated = await AlpacaClient.isAuthenticated();

    success = isAuthenticated;
  } catch (err) {
    console.log("GetAccountAuthenticatedState Err", err);
    success = false;
  }

  return success;
};

export const GetAccountData = async () => {
  let { success, data }: IGetAccountResponse = { success: false, data: null };

  try {
    const account = await AlpacaClient.getAccount();

    data = account;
    success = true;
  } catch (err) {
    console.log("GetAccountData Err", err);
    success = false;
    data = null;
  }

  return { success, data };
};

export const GetAccountPositions = async () => {
  let { success, data }: IQueryResponse = { success: false, data: null };

  try {
    const positions = await AlpacaClient.getPositions();

    data = positions;
    console.log("GetAccountPositions", GetAccountPositions);
    success = true;
  } catch (err) {
    console.log("GetAccountPositions Err", err);
    success = false;
    data = null;
  }

  return { success, data };
};

export const GetAccountPositionBySymbol = async (symbol: string) => {
  let { success, data }: IQueryResponse = { success: false, data: null };

  try {
    const position = await AlpacaClient.getPosition({ symbol: symbol });

    data = position;
    success = true;
  } catch (err) {
    console.log("GetAccountPositionBySymbol Err", err);
    success = false;
    data = null;
  }

  return { success, data };
};

export const GetAccountAssets = async () => {
  let { success, data }: IQueryResponse = { success: false, data: null };

  try {
    const assets = await AlpacaClient.getAssets();

    data = assets;
    success = true;
  } catch (err) {
    console.log("GetAccountAssets Err", err);
    success = false;
    data = null;
  }

  return { success, data };
};

export const GetAccountAssetBySymbol = async (symbol: string) => {
  let { success, data }: IQueryResponse = { success: false, data: null };

  try {
    const asset = await AlpacaClient.getAsset({ asset_id_or_symbol: symbol });

    data = asset;
    success = true;
  } catch (err) {
    console.log("GetAccountAssetBySymbol Err", err);
    success = false;
    data = null;
  }

  return { success, data };
};

export const GetAccountActivityHistory = async (pageToken?: string) => {
  let { success, data }: IQueryResponse = { success: false, data: null };
  try {
    const activities = await AlpacaClient.getAccountActivities({
      activity_types: ["CSD", "CSW", "FILL"], // cash deposits, cash withdrawals, order fills
      // date: "2024-07-26",
      // until: "2024-07-26",
      // after: "2024-07-25",
      direction: "desc",
      page_size: 100,
      page_token: pageToken,
    });

    console.log("activities", activities.length);
    success = true;
    data = processAccountActivities(activities);
    console.log("activities", data);
  } catch (err) {
    success = false;
    data = null;
    console.log("GetAccountActivityHistory Err", err);
  }
  return { success, data };
};

export const GetAccountWatchlists = async () => {
  let { success, data }: IQueryResponse = { success: false, data: null };

  try {
    const watchlists = await AlpacaClient.getWatchlists();

    data = watchlists;
    success = true;
  } catch (err) {
    console.log("GetAccountWatchlists Err", err);
    success = false;
    data = null;
  }

  return { success, data };
};

export const GetAccountWatchlistById = async (uuid: string) => {
  let { success, data }: IQueryResponse = { success: false, data: null };

  try {
    const watchlist = await AlpacaClient.getWatchlist({ uuid: uuid });

    data = watchlist;
    success = true;
  } catch (err) {
    console.log("GetAccountWatchlistById Err", err);
    success = false;
    data = null;
  }

  return { success, data };
};
