import React from 'react';
import { Form } from 'react-bootstrap';

const ContactFormInput = ({ label, type, placeholder, value, onChange, error }) => (
  <Form.Group controlId={label.toLowerCase()} className="form-group">
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      placeholder={placeholder}
      name={label.toLowerCase()} // Use the label as the name attribute
      value={value}
      onChange={onChange}
      isInvalid={!!error}
    />
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  </Form.Group>
);

export default ContactFormInput;
