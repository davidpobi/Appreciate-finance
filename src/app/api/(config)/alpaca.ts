import { AlpacaClient as Alpaca_Client, AlpacaStream as Alpaca_Stream } from "@master-chief/alpaca";

const isLive = true;
const api_key = (!isLive ? process.env.ALPACA_API_KEY : process.env.ALPACA_API_KEY_LIVE) || "";
const secret = (!isLive ? process.env.ALPACA_API_SECRET : process.env.ALPACA_API_SECRET_LIVE) || "";

export const AlpacaClient = new Alpaca_Client({
  credentials: {
    key: api_key,
    secret: secret,
    paper: !isLive,
  },
  rate_limit: true,
});

console.log("AlpacaClient initialized", AlpacaClient.params);

// export const AlpacaStream = new Alpaca_Stream({
//   credentials: {
//     key: api_key,
//     secret: secret,
//     paper: true,
//   },
//   type: "market_data", // or "account"
//   source: "iex", // or "sip" depending on your subscription
// });

// console.log("AlpacaStream initialized");
