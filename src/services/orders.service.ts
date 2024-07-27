import { IOrderQuery, IOrderResponse } from "../interfaces/alpaca";

export const CreateOrderData = async (orderData: IOrderQuery, buyQty?: boolean) => {
  let { success, data, message }: IOrderResponse = { success: false, data: null, message: "" };
  try {
    const params = {
      operation: "createOrder",
      symbol: orderData.symbol,
      amount: orderData.amount,
      qty: orderData.qty,
      buyQty: buyQty || false,
    };

    console.log("params", params);

    const response = await fetch(`/api/alpaca`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.log("Failed to create order");
      success = false;
      data = null;
      message = errorBody.message || "Unknown error occurred"; // Set the error message
      return { success, data, message };
    }

    const result: any = await response.json();
    const { success: success_, data: data_, message: message_ } = result;

    success = success_;
    data = data_;
    message = message_; // Capture the message from the response
  } catch (err: any) {
    console.log("err", err);
    success = false;
    data = null;
    message = err.message; // Capture the error message
  }
  return { success, data, message };
};
