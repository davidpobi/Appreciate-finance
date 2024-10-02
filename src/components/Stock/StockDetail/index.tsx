"use client";

import React, { useState } from "react";
import { Stock } from "../../../interfaces/stock";
import Modal from "../../Modal";
import { Box } from "@mui/material";
import { Direction, IOrderQuery } from "../../../interfaces/alpaca";
import BuyView from "./buyView";
import DetailView from "./detailView";
import Alert from "../../Alert";
import { CreateOrderData } from "../../../services/orders.service";
import { useAppDispatch } from "../../../redux/hooks";
import { setRefresh } from "../../../redux/alpacaSlice";
import { handleNotify } from "../../../redux/helpers";
import { ToastTypes } from "../../../interfaces/notifications";

interface StockDetailProps {
  data: Stock | null;
  open: boolean;
  handleClose: () => void;
  refresh: () => void;
  isDraggable?: boolean;
}

const StockDetail = ({ data, open, handleClose, refresh, isDraggable = false }: StockDetailProps) => {
  const dispatch = useAppDispatch();
  const [isBuyView, setIsBuyView] = useState(false);
  const [openConfirmPrompt, setOpenConfirmPrompt] = useState(false);
  const [buyAmount, setBuyAmount] = useState(0);

  if (!data) return null;

  const investmentAmount =
    data.transactions?.reduce(
      (sum, transaction) =>
        sum + (transaction.direction === Direction.credit ? transaction.amount : -transaction.amount),
      0
    ) || 0;

  const totalQuantity =
    data.transactions?.reduce(
      (sum, transaction) => sum + (transaction.direction === Direction.credit ? transaction.qty : -transaction.qty),
      0
    ) || 0;

  const currentValue = (data.price || 0) * totalQuantity;

  const profitLoss = currentValue - investmentAmount;
  const profitLossPercentage = investmentAmount !== 0 ? (profitLoss / investmentAmount) * 100 : 0;

  const formattedPercentageChange = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(profitLossPercentage / 100);

  const handleBuy = (amount: number) => {
    handleOpenConfirm();
    setBuyAmount(amount);
  };

  const handleCloseModal = () => {
    setIsBuyView(false);
    handleClose();
  };

  const handleOpenConfirm = async () => {
    setOpenConfirmPrompt(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirmPrompt(false);
  };

  const createNewOrder = async (stock: Stock) => {
    const order: IOrderQuery = {
      symbol: stock.symbol,
      amount: stock.defaultBuyAmount || 0,
      qty: 0,
    };

    const { success, message } = await CreateOrderData(order);
    if (success) {
      handleCloseConfirm();
      refresh();
      dispatch(setRefresh({ state: true }));
      handleNotify("Order created successfully", 4000, ToastTypes.Success, dispatch);
      return;
    }
    handleNotify(message || "failed to create order", 2000, ToastTypes.Error, dispatch);
    handleCloseConfirm();
  };

  const confirmNewOrder = async () => {
    if (data === null) {
      return;
    }
    await createNewOrder(data);
  };

  return (
    <div>
      <Modal
        isOpen={open}
        isDraggable={isDraggable}
        title={""}
        subtitle={"Stock Detail"}
        onClose={handleCloseModal}
        isActionDisabled={false}
        isLoading={false}
        backdropDismiss={true}
        showCloseIcon={true}
        hideCloseButton={false}
        sx={{
          cursor: isDraggable ? "grab" : "default",
          borderRadius: "12px",
          width: {
            xs: "100%",
            sm: "90%",
            md: "80%",
          },
          maxWidth: "800px",
          position: "relative",
          top: "0",
          height: {
            xs: "100%",
            sm: "90%",
            md: "auto",
          },
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Box sx={{ padding: "1rem 0 2rem", cursor: "default" }}>
          {!isBuyView && (
            <DetailView
              data={data}
              investmentAmount={investmentAmount}
              currentValue={currentValue}
              profitLoss={profitLoss}
              profitLossPercentage={profitLossPercentage}
              formattedPercentageChange={formattedPercentageChange}
              onBuyClick={() => setIsBuyView(true)}
            />
          )}

          {isBuyView && <BuyView stock={data} onBack={() => setIsBuyView(false)} onBuy={handleBuy} />}
        </Box>

        <Alert
          open={openConfirmPrompt}
          texts={{
            main: data !== null ? `Buy $${buyAmount} worth of ${data?.symbol}?` : "",
            message: "Kindly review your order and proceed to buy.",
            buttonText: "Proceed",
          }}
          confirmCallback={confirmNewOrder}
          denyCallback={handleCloseConfirm}
          closeCallback={handleCloseConfirm}
        />
      </Modal>
    </div>
  );
};

export default StockDetail;
