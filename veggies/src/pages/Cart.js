import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './login';
import './Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const authContext = useContext(AuthContext);

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/api/cart', {
        headers: {
          Authorization: `Bearer ${authContext.token}`,
        },
      });

      if (!response.ok) {
        setError('Failed to fetch cart items. Please try again.');
        return;
      }

      const data = await response.json();
      setCartItems(data.cartItems);

      const total = data.cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      setTotalPrice(total);
    } catch (error) {
      setError('Failed to fetch cart items. Please try again.');
    }
  }, [authContext.token]);

  useEffect(() => {
    fetchCartItems();
  }, [authContext.token, fetchCartItems]);

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/cart/remove/${itemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authContext.token}`,
        },
      });

      if (!response.ok) {
        setError('Failed to remove item from cart. Please try again.');
        return;
      }

      setCartItems((prevCartItems) => prevCartItems.filter((item) => item._id !== itemId));
    } catch (error) {
      setError('Failed to remove item from cart. Please try again.');
    }
  };

  const handleIncrementQuantity = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/cart/increment/${itemId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authContext.token}`,
        },
      });

      if (!response.ok) {
        setError('Failed to increment item quantity. Please try again.');
        return;
      }

      fetchCartItems();
    } catch (error) {
      setError('Failed to increment item quantity. Please try again.');
    }
  };

  const handleDecrementQuantity = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/cart/decrement/${itemId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authContext.token}`,
        },
      });

      if (!response.ok) {
        setError('Failed to decrement item quantity. Please try again.');
        return;
      }

      fetchCartItems();
    } catch (error) {
      setError('Failed to decrement item quantity. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Your Shopping Cart</h2>
      {error && <p className="error-message">{error}</p>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li className="cart-item" key={item._id}>
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.product.name}</h3>
                  <p className="cart-item-price">Price: ₹{item.product.price}</p>
                  <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                  <p className="cart-item-total-price">Total Price: ₹{item.product.price * item.quantity}</p>
                </div>
                <div className="cart-item-image">
                  <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
                </div>
                <div className="cart-item-actions">
                  <button
                    className="quantity-button increment-button"
                    onClick={() => handleIncrementQuantity(item._id)}
                  >
                    +
                  </button>
                  <button
                    className="quantity-button decrement-button"
                    onClick={() => handleDecrementQuantity(item._id)}
                  >
                    -
                  </button>
                  <button
                    className="remove-from-cart-button"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="cart-total">Total Cart Price: ₹{totalPrice}</p>
          <Link to={{ pathname: '/checkout', search: `?totalAmount=${totalPrice}&userId=${authContext.userId}` }}>
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
