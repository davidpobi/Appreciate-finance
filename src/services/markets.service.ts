import { BarsTimeframe } from "@master-chief/alpaca";
import { IGetAccountResponse, IQueryResponse } from "../interfaces/alpaca";

export const GetBars = async (symbol: string, timeframe: BarsTimeframe) => {
  let { success, data }: IGetAccountResponse = { success: false, data: null };
  try {
    const params = new URLSearchParams({
      operation: "getBars",
      symbol: symbol,
      timeframe: timeframe ? timeframe : "1Day",
    });

    const response = await fetch(`/api/alpaca?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("response", response);
      console.log("Failed to get bars");
      success = false;
      data = null;
      return { success, data };
    }

    const result: any = await response.json();
    const { success: success_, data: data_ } = result;

    console.log("success_", success_);
    console.log("bars: ", data_);

    success = success_;
    data = data_;
  } catch (err) {
    console.log("err", err);
    success = false;
    data = null;
  }
  return { success, data };
};

export const GetLatestPrice = async (symbol: string) => {
  let { success, data }: IQueryResponse = { success: false, data: null };
  try {
    const params = new URLSearchParams({
      operation: "getLatestPrice",
      symbol: symbol,
    });

    const response = await fetch(`/api/alpaca?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("response", response);
      console.log("Failed to get latest price");
      success = false;
      data = null;
      return { success, data };
    }

    const result: any = await response.json();
    const { success: success_, data: data_ } = result;

    // console.log('success_',success_)
    // console.log('price_: ', data_);

    success = success_;
    data = data_;
  } catch (err) {
    console.log("err", err);
    success = false;
    data = null;
  }
  return { success, data };
};

// export const GetQuotes = async () => {
//   let { success, data }: IGetAccountResponse = { success: false, data: null };
//   try {
//     const params = new URLSearchParams({
//       operation: "getQuotes",
//       symbol: "PLTR",
//     });

//     const response = await fetch(`/api/alpaca?${params}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       console.log('response ', response);
//       console.log("Failed to get account");
//       success = false;
//       data = null;
//       return { success, data };
//     }

//     const result: any = await response.json();
//     const {success: success_, data: data_} = result;

//     console.log('success_',success_)
//     console.log('bars: ', data_);

//     success = success_
//     data = data_;
//   } catch (err) {
//     console.log('err', err);
//     success = false;
//     data = null;
//   }
//   return { success, data };
// };
