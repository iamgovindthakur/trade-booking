import React from 'react';
import { useDispatch } from 'react-redux';
import { saveTrade } from '../tradesSlice';
import { Button, Container, Row, Col } from 'react-bootstrap';
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
    <Container className="mt-4">
      <Row>
        <Col>
          <h5 className="mb-3">Bulk Upload</h5>
          <input
            type="file"
            accept=".xlsx, .xls"
            id="fileUpload"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <Button
            variant="primary"
            onClick={() => document.getElementById('fileUpload').click()}
          >
            Upload File
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default BulkUpload;
