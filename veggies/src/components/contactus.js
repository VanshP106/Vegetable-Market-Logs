import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { BsPerson, BsEnvelope, BsChatDots } from "react-icons/bs"; 
import axios from "axios";
import "./contact.css";
import Map from "./Map";
const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    clearFieldError(name);
  };

  const clearFieldError = (fieldName) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.message) {
      newErrors.message = "Message is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Send form data to backend API
        await axios.post("http://localhost:3001/api/contact/submit", formData);
        setSubmissionSuccess(true);

        setTimeout(() => {
          setSubmissionSuccess(false);
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    
    <div className="container">
      <Map />
      <div className="circle-image">

      </div>
      <Form onSubmit={handleSubmit}>
        {/* Form inputs */}
        <Form.Group controlId="name" className="form-group">
          <BsPerson className="input-icon" />Name
          <Form.Control
            type="text"
            placeholder="Your name"
            name="name" // Add name attribute
            value={formData.name}
            onChange={handleInputChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="email" className="form-group">
          <BsEnvelope className="input-icon" />Email
          <Form.Control
            type="email"
            placeholder="Your email"
            name="email" // Add name attribute
            value={formData.email}
            onChange={handleInputChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="message" className="form-group">
          <BsChatDots className="input-icon" />Message
          <Form.Control
            as="textarea"
            placeholder="Your message"
            name="message" // Add name attribute
            value={formData.message}
            onChange={handleInputChange}
            isInvalid={!!errors.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.message}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="submit-container">
          <Button variant="primary" type="submit" className="submit-button">
            Submit
          </Button>
        </div>
      </Form>
      <a href="/">Go back to Home</a>
      {submissionSuccess && (
        <Alert variant="success" className="submission-alert">
          Form submitted successfully!
        </Alert>
      )}
    </div>
  );
};

export default Contactus;
