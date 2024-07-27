import { NextResponse } from "next/server";
import {
  GetAccountActivityHistory,
  GetAccountAuthenticatedState,
  GetAccountData,
  GetAccountWatchlistById,
  GetAccountWatchlists,
} from "../(services)/account.service";

export const getAccountAuthenticatedState = async () => {
  return await GetAccountAuthenticatedState();
};

export const getAccount = async () => {
  const { success, data } = await GetAccountData();

  if (success) {
    const response = { success: true, data: data };

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const response = { success: false, data: null };
  return new NextResponse(JSON.stringify(response), {
    status: 500,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAccountActivityHistory = async () => {
  const { success, data } = await GetAccountActivityHistory();

  if (success) {
    const response = { success: true, data: data };

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const getAccountWatchlists = async () => {
  const { success, data } = await GetAccountWatchlists();

  if (success) {
    const response = { success: true, data: data };

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const response = { success: false, data: null };
  return new NextResponse(JSON.stringify(response), {
    status: 500,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAccountWatchlistById = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const watchlistId = searchParams.get("uuid") || "";
  const { success, data } = await GetAccountWatchlistById(watchlistId);

  if (success) {
    const response = { success: true, data: data };

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const response = { success: false, data: null };
  return new NextResponse(JSON.stringify(response), {
    status: 500,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
