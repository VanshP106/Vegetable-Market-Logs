// Checkout.js
import './checkout.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const totalAmount = queryParams.get('totalAmount');
  const [userId] = useState('12345'); // Set a hardcoded userId for testing
  const navigate = useNavigate();

  const handlePayment = () => {
    // Create a Razorpay order on your server using the hardcoded userId as a reference
    axios
      .post('http://localhost:3001/api/create-order', { userId, amount: totalAmount })
      .then((response) => {
        const order = response.data;
        const options = {
          key: 'rzp_test_zMqgUpw9l93RS3', // Replace with your Razorpay API Key
          amount: totalAmount,
          currency: 'INR',
          name: 'Your Company Name',
          description: 'Payment for your order',
          order_id: order.id,
          handler: function (response) {
            // Redirect to the "thank you" page on successful payment
            navigate(`/thankyou?paymentId=${response.razorpay_payment_id}`);
            // After successful payment, save the order details to the backend
            saveOrderToBackend(order.id);
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '9999999999',
          },
          notes: {
            address: 'Razorpay Corporate Office',
          },
          theme: {
            color: '#F37254',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      })
      .catch((error) => {
        console.error('Error creating Razorpay order:', error);
      });
  };

  // Function to save the order to the backend
  const saveOrderToBackend = (orderId) => {
    axios
      .post('http://localhost:3001/api/save-order', { orderId })
      .then((response) => {
        console.log('Order saved to backend:', response.data);
      })
      .catch((error) => {
        console.error('Error saving order to backend:', error);
      });
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      <div className="cart-items">
        <h2>Cart Items</h2>
        <p>Total Amount: ₹{totalAmount}</p>
        <button className="pay-button" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Checkout;
