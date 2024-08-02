import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrades } from "../tradesSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

function TradeTable() {
  const trades = useSelector((state) => state.trades.trades);
  const status = useSelector((state) => state.trades.status);
  const error = useSelector((state) => state.trades.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrades());
  }, [dispatch]);

  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  if (status === "failed") {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ p: 2 }}>
        Trades
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trades
            .slice()
            .sort(
              (a, b) =>
                new Date(b.time) - new Date(a.time) ||
                a.symbol.localeCompare(b.symbol)
            )
            .map((trade, index) => (
              <TableRow key={index}>
                <TableCell>{trade.symbol}</TableCell>
                <TableCell>{trade.quantity}</TableCell>
                <TableCell>{trade.price}</TableCell>
                <TableCell>{trade.time}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TradeTable;
