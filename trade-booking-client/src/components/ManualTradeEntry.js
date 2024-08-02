import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveTrade } from '../tradesSlice';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

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
    <Container className="mt-4">
      <Row>
        <Col>
          <h5 className="mb-3">Manual Trade Entry</h5>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="symbol">
              <Form.Label>Symbol</Form.Label>
              <Form.Control
                type="text"
                name="symbol"
                value={trade.symbol}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="quantity" className="mt-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={trade.quantity}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="price" className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={trade.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Add Trade
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ManualTradeEntry;
