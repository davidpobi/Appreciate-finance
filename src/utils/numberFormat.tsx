import React from "react";
import NumberFormat from "react-number-format";
import { getCurrencySymbol } from "./helpers";

interface FormatAmountProps {
  amount: number;
  currency?: string;
}
export const FormatAmount = ({ amount, currency = "USD" }: FormatAmountProps) => {
  return (
    <NumberFormat
      value={amount}
      displayType={"text"}
      thousandSeparator={true}
      allowNegative={false}
      fixedDecimalScale={true}
      decimalScale={2}
      prefix={getCurrencySymbol(currency) || "$"}
    />
  );
};
