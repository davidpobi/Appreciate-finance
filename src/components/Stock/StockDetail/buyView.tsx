"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, useTheme } from "@mui/material";
import { IBuyStock, Stock } from "../../../interfaces/stock";
import Input from "../../Input";
import * as yup from "yup";
import Button from "../../Button/button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { formatAmountUtil } from "../../../utils/numberUtils";
import NumericFormat from "react-number-format";

interface BuyViewProps {
  stock: Stock;
  onBack: () => void;
  onBuy: (amount: number) => void;
}

const validationSchema = yup.object().shape({
  amount: yup.number().min(1, "Amount must be greater than 0").required("Amount is required"),
});

const buyDefault: IBuyStock = {
  amount: 0,
};

const BuyView: React.FC<BuyViewProps> = ({ stock, onBack, onBuy }) => {
  const theme = useTheme();
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(stock.price?.toString() || "");
  const [formData, setFormData] = React.useState<IBuyStock>({ ...buyDefault, amount: stock.defaultBuyAmount || 0 });
  const [errors, setErrors] = useState<IBuyStock | any>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleChange = (event: React.BaseSyntheticEvent | any) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;

    setFormData((info: IBuyStock) => ({
      ...info,
      [name]: value,
    }));
  };

  const validate = async () => {
    let state: boolean = false;
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setIsFormValid(true);
      setErrors({});
      state = true;
    } catch (err: any) {
      setIsFormValid(false);
      state = false;
      const errors_: any = {};
      err.inner.forEach((e: any) => {
        errors_[e.path] = e.message;
      });
      setErrors(errors_);
    }
    return state;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amount = Number(formData.amount) || 0;
    if (amount <= 0) {
      setErrors({ amount: "Amount must be greater than 0" });
      return;
    }

    onBuy(Number(formData.amount));
  };

  useEffect(() => {
    if (formData.amount) {
      validate();
    }
  }, [formData]);

  const totalQuantity = (Number(formData.amount) / Number(price)).toFixed(2);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.paper : "#cecece",
        padding: "20px",
        borderRadius: "8px",
        color: "white",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2} sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>Buy {stock.symbol}</div>
        <Button
          onClick={onBack}
          variant="text"
          color="secondary"
          sx={{
            width: "auto",
            height: "30px",
            padding: "1rem 0.8rem",
            textTransform: "none",
            fontSize: "14px",
            gap: "5px",
            ".icon": {
              fontSize: "18px",
            },
          }}
        >
          <ArrowBackIcon className="icon" /> View Details
        </Button>
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              ".field": {
                mt: "5px",
                width: "auto",
                maxWidth: "150px",
                color: "white",
                borderRadius: "9px",
                padding: "10px",
              },
              ".errors": {
                position: "relative",
                top: "-18px",
                color: "red",
                fontSize: "12px",
              },
            }}
          >
            <NumericFormat
              thousandsGroupStyle="thousand"
              value={formatAmountUtil(formData.amount)}
              prefix={"$"}
              decimalSeparator="."
              displayType="input"
              thousandSeparator={true}
              allowNegative={false}
              mask=""
              onValueChange={(values: any) => setFormData({ ...formData, amount: values.value })}
              allowEmptyFormatting={false}
              fixedDecimalScale={true}
              isNumericString={false}
              required={false}
              name="amount"
              label={"Amount"}
              id="amount"
              customInput={Input}
              sx={{
                ".input-label": {
                  color: "white",
                },
              }}
            />
            <label className="errors">{errors.amount}</label>

            {/* <Input
              label={"Amount"}
              name="amount"
              value={formatAmountUtil(formData.amount)}
              type={"number"}
              onChange={(e) => handleChange(e)}
              placeholder=""
              helperText={errors.amount}
              sx={{
                ".input-label": {
                  color: "white",
                },
              }}
            /> */}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ color: "white" }}>
              Price per stock: ${price}
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Total quantity: {totalQuantity}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" disabled={!isFormValid}>
              Buy
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BuyView;
