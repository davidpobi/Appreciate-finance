import { NextResponse } from "next/server";
import { CreateOrder, GetOrderById, GetOrders, CancelOrderById, GetOrdersByStatus } from "../(services)/orders.service";

export const createOrder = async (data_: any) => {
  try {
    const { symbol, amount, qty, buyQty } = data_;

    const orderData = {
      symbol,
      amount,
      qty,
    };

    const { success, data, message } = await CreateOrder(orderData, false);

    if (success) {
      const response = { success: true, data: data };

      return new NextResponse(JSON.stringify(response), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const response = { success: false, data: null, message: message };
    return new NextResponse(JSON.stringify(response), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    const response = { success: false, data: null, error: err.message };
    return new NextResponse(JSON.stringify(response), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const getOrderById = async (req: Request) => {
  try {
    const body = await req.json();
    const { orderId } = body;

    const { success, data } = await GetOrderById(orderId);

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
  } catch (err: any) {
    const response = { success: false, data: null, error: err.message };
    return new NextResponse(JSON.stringify(response), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const getOrders = async (req: Request) => {
  try {
    const { success, data } = await GetOrders();

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
  } catch (err: any) {
    const response = { success: false, data: null, error: err.message };
    return new NextResponse(JSON.stringify(response), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const cancelOrderById = async (req: Request) => {
  try {
    const body = await req.json();
    const { orderId } = body;

    const { success, data } = await CancelOrderById(orderId);

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
  } catch (err: any) {
    const response = { success: false, data: null, error: err.message };
    return new NextResponse(JSON.stringify(response), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const getOrdersByStatus = async (req: Request) => {
  try {
    const body = await req.json();
    const { status } = body;

    const { success, data } = await GetOrdersByStatus(status);

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
  } catch (err: any) {
    const response = { success: false, data: null, error: err.message };
    return new NextResponse(JSON.stringify(response), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
