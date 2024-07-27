import { NextResponse } from "next/server";
import { GetBars, GetLatestPrice } from "../(services)/markets.service";


export const getBars = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get('symbol') || "";
    const timeframe: any = searchParams.get('timeframe');

    const {success,data} = await GetBars(symbol,timeframe);
  
    if(success){
      const response = { success: true, data: data }
  
      return new NextResponse(JSON.stringify(response), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  
    const response = { success: false, data: null };
    return new NextResponse(JSON.stringify(response), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
};


export const getLatestPrice = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol') || "";

  const {success,data} = await GetLatestPrice(symbol);

  if(success){
    const response = { success: true, data: data }

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const response = { success: false, data: null };
  return new NextResponse(JSON.stringify(response), {
    status: 500,
    headers: {
      'Content-Type': 'application/json',
    },
  });

};