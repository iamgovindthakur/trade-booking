import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrades } from "../tradesSlice";
import { Table, Spinner, Alert } from "react-bootstrap";

function TradeTable() {
  const trades = useSelector((state) => state.trades.trades);
  const status = useSelector((state) => state.trades.status);
  const error = useSelector((state) => state.trades.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrades());
  }, [dispatch]);

  if (status === "loading") {
    return <Spinner animation="border" />;
  }

  if (status === "failed") {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <div className="mt-4">
      <h5 className="mb-3">Trades</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {trades
            .slice()
            .sort(
              (a, b) =>
                new Date(b.time) - new Date(a.time) ||
                a.symbol.localeCompare(b.symbol)
            )
            .map((trade, index) => (
              <tr key={index}>
                <td>{trade.symbol}</td>
                <td>{trade.quantity}</td>
                <td>{trade.price}</td>
                <td>{trade.time}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TradeTable;