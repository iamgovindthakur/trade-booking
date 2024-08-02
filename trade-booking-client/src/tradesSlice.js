// tradesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state of the slice
const initialState = {
  trades: [],
  status: 'idle', // Can be 'idle', 'loading', 'succeeded', or 'failed'
  error: null,
};

// Helper function to format timestamp
const formatTimestamp = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh24 = date.getHours();
  const hh = String(hh24 % 12 || 12).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  const ampm = hh24 >= 12 ? "PM" : "AM";

  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss} ${ampm}`;
};



// Async thunk to fetch trades from backend
export const fetchTrades = createAsyncThunk('trades/fetchTrades', async () => {
  const response = await axios.get('/api/trades');
  return response.data;
});

// Async thunk to save trades (single or bulk)
export const saveTrade = createAsyncThunk('trades/saveTrade', async (trade) => {
  // Ensure the trade is an array
  const tradesToSave = Array.isArray(trade) ? trade : [trade];

  // Ensure each trade has a timestamp
  const timestampedTrades = tradesToSave.map(t => ({
    ...t,
    time: formatTimestamp(new Date()),
  }));

  const response = await axios.post('/api/trades', timestampedTrades);

  // Convert response data to Trade instances
  return response.data;
});

// Create the slice
const tradesSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {
    // Optional: add non-async reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrades.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrades.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trades = action.payload;
      })
      .addCase(fetchTrades.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveTrade.fulfilled, (state, action) => {
        state.trades.push(...action.payload);
      });
  },
});

// Export the reducer to be used in the store
export default tradesSlice.reducer;
