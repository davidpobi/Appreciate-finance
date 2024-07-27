import { IGetAccountResponse } from "../interfaces/alpaca";

export const GetAccountData = async () => {
  let { success, data }: IGetAccountResponse = { success: false, data: null };
  try {
    const params = new URLSearchParams({
      operation: "getAccount",
    });

    const response = await fetch(`/api/alpaca?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("response", response);
      console.log("Failed to get account");
      success = false;
      data = null;
      return { success, data };
    }

    const result: any = await response.json();
    const { success: success_, data: data_ } = result;

    success = success_;
    data = data_;
  } catch (err) {
    console.log("err", err);
    success = false;
    data = null;
  }
  return { success, data };
};

export const GetAccountActivityHistory = async () => {
  let { success, data }: IGetAccountResponse = { success: false, data: null };
  try {
    console.log("called");
    const params = new URLSearchParams({
      operation: "getAccountActivityHistory",
    });

    const response = await fetch(`/api/alpaca?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("response", response);
    if (!response.ok) {
      console.log("response", response);
      console.log("Failed to get account activity data");
      success = false;
      data = null;
      return { success, data };
    }

    const result: any = await response.json();
    const { success: success_, data: data_ } = result;

    console.log("success_", success_);
    console.log("activity: ", data_);

    success = success_;
    data = data_;
  } catch (err) {
    console.log("err", err);
    success = false;
    data = null;
  }
  return { success, data };
};

export const GetAccountWatchlists = async () => {
  let { success, data }: IGetAccountResponse = { success: false, data: null };
  try {
    const params = new URLSearchParams({
      operation: "getAccountWatchlists",
    });

    const response = await fetch(`/api/alpaca?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("response", response);
      console.log("Failed to get watchlists data");
      success = false;
      data = null;
      return { success, data };
    }

    const result: any = await response.json();
    const { success: success_, data: data_ } = result;

    console.log("success_", success_);
    console.log("watchlist: ", data_);

    success = success_;
    data = data_;
  } catch (err) {
    console.log("err", err);
    success = false;
    data = null;
  }
  return { success, data };
};

export const GetAccountWatchlistById = async (uuid: string) => {
  let { success, data }: IGetAccountResponse = { success: false, data: null };
  try {
    const params = new URLSearchParams({
      operation: "getAccountWatchlistById",
      uuid: uuid,
    });

    const response = await fetch(`/api/alpaca?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("response", response);
      console.log("Failed to get watchlist by id data");
      success = false;
      data = null;
      return { success, data };
    }

    const result: any = await response.json();
    const { success: success_, data: data_ } = result;

    console.log("success_", success_);
    console.log("watchlist: ", data_);

    success = success_;
    data = data_;
  } catch (err) {
    console.log("err", err);
    success = false;
    data = null;
  }
  return { success, data };
};
