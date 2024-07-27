import { Account, Order } from "@master-chief/alpaca";

export interface AlpacaState {
  account: Account | null;
  refresh: boolean;
  isLive: boolean | null;
}

export interface IQueryResponse {
  success: boolean;
  data: any | null;
  message?: string;
}

export interface IGetAccountResponse {
  success: boolean;
  data: Account | any | null;
}

export interface IOrderQuery {
  symbol: string;
  amount: number;
  qty?: number;
}

export interface IOrderResponse {
  success: boolean;
  data: Order | null;
  message?: string;
}

export enum TradingMode {
  live = "live",
  paper = "paper",
}

export interface IGetAccountResponse {
  success: boolean;
  data: any | null;
}

export interface IQueryResponse {
  success: boolean;
  data: any | null;
  message?: string;
}

export enum OrderSide {
  Buy = "buy",
  Sell = "sell",
}

export enum OrderType {
  Market = "market",
  Limit = "limit",
  Stop = "stop",
  StopLimit = "stop_limit",
  TrailingStop = "trailing_stop",
}

export enum OrderTimeInForce {
  Day = "day",
  Gtc = "gtc",
  Opg = "opg",
  Cls = "cls",
  Ioc = "ioc",
  Fok = "fok",
}

export enum TransactionType {
  FILL = "FILL",
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
}

export enum Direction {
  credit = "credit",
  debit = "debit",
}

export enum Side {
  buy = "buy",
  sell = "sell",
}

export interface ITransaction {
  id?: string;
  symbol: string;
  type: TransactionType;
  amount: number;
  direction: Direction;
  side: Side;
  createdAt: string;
}
