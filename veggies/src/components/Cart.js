import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext'; // Import useCart hook
import "../styles/Cart.css";

const Cart = () => {
  const { cart, setCart } = useCart();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let totalPrice = 0;

    cart.forEach((item) => {
      totalPrice += item.amount * item.price;
    });

    setPrice(totalPrice);
  }, [cart]);

  const handleChange = async (item, d) => {
    try {
      const updatedItems = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, amount: cartItem.amount + d };
        }
        return cartItem;
      });

      const token = localStorage.getItem('token'); // Get the authentication token from local storage

      if (!token) {
        // Handle the case where the token is not available
        console.error('Authentication token is missing.');
        return;
      }

      const response = await fetch('http://localhost:3001/api/cart/update-cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the headers
        },
        body: JSON.stringify({ updatedItems }), // Removed the userId here, as it should be handled on the server side
      });

      if (response.ok) {
        setCart(updatedItems);
      } else {
        // Handle the case where the update request fails
        console.error('Failed to update cart:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  }

  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Get the authentication token from local storage

      if (!token) {
        // Handle the case where the token is not available
        console.error('Authentication token is missing.');
        return;
      }

      const response = await fetch(`http://localhost:3001/api/cart/remove-from-cart/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the headers
        },
      });

      if (response.ok) {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
      } else {
        // Handle the case where the removal request fails
        console.error('Failed to remove item from cart:', response.statusText);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }

  return (
    <article>
      {cart?.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img src={item.img} alt={item.title} />
            <p>{item.title}</p>
          </div>
          <div>
            <button onClick={() => handleChange(item, +1)}> + </button>
            <button>{item.amount}</button>
            <button onClick={() => handleChange(item, -1)}> - </button>
          </div>
          <div>
            <span>{item.price}</span><br />
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      
      <div className='total'>
        <span>Total Price of your Cart</span>
        <span>Rs - {price}</span>
      </div>
      <div className='payment'>
        <a
          href="https://rzp.io/l/kT1RDSlZW"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="payment-button">Go to payment</button>
        </a>
      </div>
    </article>
  );
}

export default Cart;
