import { NextResponse } from "next/server";
import {
  getAccount,
  getAccountActivityHistory,
  getAccountAuthenticatedState,
  getAccountWatchlistById,
  getAccountWatchlists,
} from "./(account)";
import { getBars, getLatestPrice } from "./(market)";
import { createOrder } from "./(orders)";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const operation = searchParams.get("operation");
  const isAuthenticated = await getAccountAuthenticatedState();

  if (isAuthenticated) {
    new NextResponse("User not authenticated", { status: 401 });
  }

  try {
    switch (operation) {
      case "getAccount":
        return await getAccount();
      case "getAccountActivityHistory":
        return await getAccountActivityHistory();
      case "getAccountWatchlists":
        return await getAccountWatchlists();
      case "getAccountWatchlistById":
        return await getAccountWatchlistById(req);
      case "getBars":
        return await getBars(req);
      case "getLatestPrice":
        return await getLatestPrice(req);
      default:
        new NextResponse("Invalid operation", { status: 400 });
        break;
    }
  } catch (error) {
    console.error("Error handling request", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  try {
    switch (req.method) {
      case "POST":
        try {
          const { operation, ...body } = await req.json();
          console.log("operation:", operation);

          switch (operation) {
            case "createOrder":
              return await createOrder(body);
            default:
              new NextResponse("Invalid operation", { status: 400 });
              break;
          }
        } catch (error) {
          console.error("Error handling alpaca service:", error);
          return new NextResponse("Internal server error", { status: 500 });
        }
        break;
      default:
        return new NextResponse("Method Not Allowed", { status: 405 });
    }
  } catch (error) {
    console.error("Error handling request", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
