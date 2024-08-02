import React from 'react';
import { useDispatch } from 'react-redux';
import { saveTrade } from '../tradesSlice';
import { Box, Button, Typography } from '@mui/material';
import * as XLSX from 'xlsx';

function BulkUpload() {
  const dispatch = useDispatch();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      dispatch(saveTrade(json)); // Pass the array of trades
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Bulk Upload
      </Typography>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" accept=".xlsx, .xls" hidden onChange={handleFileUpload} />
      </Button>
    </Box>
  );
}

export default BulkUpload;
