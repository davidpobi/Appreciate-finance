import { PlaceOrder } from "@master-chief/alpaca";
import { AlpacaClient } from "../(config)/alpaca";
import { IQueryResponse, OrderSide, OrderTimeInForce, OrderType } from "../../../interfaces/alpaca";

export const GetOrderById = async (orderId: string) => {
  let { success, data }: IQueryResponse = { success: false, data: null };

  try {
    const order = await AlpacaClient.getOrder({ order_id: orderId });
    console.log("order", order);

    data = order;
    success = true;
  } catch (err) {
    console.log("GetOrderById Err", err);
    success = false;
    data = null;
  }

  return { success, data };
};

export const GetOrders = async () => {
  let { success, data }: IQueryResponse = { success: false, data: null };

  try {
    const orders = await AlpacaClient.getOrders();
    console.log("orders", orders);

    data = orders;
    success = true;
  } catch (err) {
    console.log("GetOrders Err", err);
    success = false;
    data = null;
  }

  return { success, data };
};

export const CreateOrder = async (orderData_: any, buyQty = false) => {
  let { success, data, message }: IQueryResponse = { success: false, data: null, message: "" };

  try {
    const orderData: PlaceOrder = {
      symbol: orderData_.symbol,
      side: OrderSide.Buy,
      type: OrderType.Market,
      time_in_force: buyQty ? OrderTimeInForce.Gtc : OrderTimeInForce.Day,
    };

    if (buyQty) {
      orderData.qty = orderData_.qty;
    } else {
      orderData.notional = orderData_.amount;
    }

    console.log("orderData_", orderData);

    const order = await AlpacaClient.placeOrder(orderData);
    console.log("order placed", order);

    data = order;
    success = true;
  } catch (err: any) {
    console.log("CreateOrder Err", err);
    success = false;
    data = null;
    message = err.message;
  }

  return { success, data, message };
};

export const CancelOrderById = async (orderId: string) => {
  let { success, data }: IQueryResponse = { success: false, data: null };

  try {
    const order = await AlpacaClient.cancelOrder({ order_id: orderId });
    console.log("order cancelled");

    data = order;
    success = true;
  } catch (err) {
    console.log("CancelOrderById Err", err);
    success = false;
    data = null;
  }

  return { success, data };
};

export const GetOrdersByStatus = async (status: string) => {
  let { success, data }: IQueryResponse = { success: false, data: null };

  try {
    const orders = await AlpacaClient.getOrders({ status: "all" });
    console.log("orders", orders);

    data = orders;
    success = true;
  } catch (err) {
    console.log("GetOrdersByStatus Err", err);
    success = false;
    data = null;
  }

  return { success, data };
};
