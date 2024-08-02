// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// In-memory database (for demonstration purposes)
let trades = [];

app.use(bodyParser.json());

// Route to fetch all trades
app.get('/api/trades', (req, res) => {
    console.log("fetching Trades",trades)
  res.json(trades);
});

// Route to save a single trade or bulk trades
app.post('/api/trades', (req, res) => {
  const incomingTrades = Array.isArray(req.body) ? req.body : [req.body];
  console.log("Adding Trades")
  trades.push(...incomingTrades);
  res.status(201).json(incomingTrades);
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
