export interface Stock {
  name: string;
  symbol: string;
  price?: number;
  imageUrl?: string;
  defaultBuyAmount?: number;
}
