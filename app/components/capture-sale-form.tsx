import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CaptureSaleForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    console.log(payload);
  };
  return (
    <>
      <h2>Capture Sale Form</h2>
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>other</Form.Label>
        <Form.Select name="other" aria-label="Default select example">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Customer</Form.Label>
          <Form.Control type="text" name="customer" placeholder="Enter customer" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Product</Form.Label>
          <Form.Control type="text" name="product" placeholder="Enter product" />
        </Form.Group>
        <Button type="submit" variant="primary">Submit</Button>
      </form>
    </>
  );
};

export default CaptureSaleForm;