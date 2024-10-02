"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { ITransaction, Side } from "../../interfaces/alpaca";
import { FormatAmount } from "../../utils/numberFormat";
import { formatNumber } from "../../utils/numberUtils";

interface TransactionsTableProps {
  transactions: ITransaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "8px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((transaction: ITransaction, index) => (
              <TableRow key={index} sx={index === transactions.length - 1 ? { borderBottom: "2px solid black" } : {}}>
                <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.side === Side.buy ? "Buy" : "Sell"}</TableCell>
                <TableCell align="right">{formatNumber(transaction.qty)}</TableCell>
                <TableCell align="right">
                  <FormatAmount amount={transaction.amount / transaction.qty} />
                </TableCell>
                <TableCell align="right">
                  <FormatAmount amount={transaction.amount} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};

export default TransactionsTable;
