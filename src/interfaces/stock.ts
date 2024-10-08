import { ITransaction } from "./alpaca";

export interface Stock {
  name: string;
  symbol: string;
  price?: number;
  imageUrl?: string;
  defaultBuyAmount?: number;
  transactions?: ITransaction[];
}

export interface IBuyStock {
  amount: number;
  // quantity?: number;
  // price?: number;
}
