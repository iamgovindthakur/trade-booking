// App.js
import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import ManualTradeEntry from "./components/ManualTradeEntry";
import BulkUpload from "./components/BulkUpload";
import TradeTable from "./components/TradeTable";

function App() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Trade Booking
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ManualTradeEntry />
        </Grid>
        <Grid item xs={12} md={6}>
          <BulkUpload />
        </Grid>
        <Grid item xs={12}>
          <TradeTable />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
