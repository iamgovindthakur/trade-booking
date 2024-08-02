import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveTrade } from '../tradesSlice';
import { TextField, Button, Box, Typography } from '@mui/material';

function ManualTradeEntry() {
  const dispatch = useDispatch();
  const [trade, setTrade] = useState({ symbol: '', quantity: '', price: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrade({ ...trade, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveTrade(trade)); // Pass single trade as an object
    setTrade({ symbol: '', quantity: '', price: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Manual Trade Entry
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Symbol"
        name="symbol"
        value={trade.symbol}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Quantity"
        name="quantity"
        type="number"
        value={trade.quantity}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Price"
        name="price"
        type="number"
        value={trade.price}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Trade
      </Button>
    </Box>
  );
}

export default ManualTradeEntry;
