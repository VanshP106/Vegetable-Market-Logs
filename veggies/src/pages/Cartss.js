import React, { useState } from 'react';
import Amazon from '../components/Amazon1';
import Cart from '../components/Cart';
import { useCart } from '../CartContext'; // Import useCart hook
import '../styles/Amazon.css';

const Cartss = () => {
    const { cart, setCart } = useCart(); // Use useCart hook
    const [warning, setWarning] = useState(false);

    const handleClick = (item) => {
        let isPresent = false;
        cart.forEach((product) => {
            if (item.id === product.id) {
                isPresent = true;
            }
        });

        if (isPresent) {
            setWarning(true);
            setTimeout(() => {
                setWarning(false);
            }, 2000);
            return;
        }
        setCart([...cart, item]); // Use setCart from useCart hook
    }

    const handleChange = async (item, d) => {
        let ind = -1;
        cart.forEach((data, index) => {
            if (data.id === item.id) {
                ind = index;
            }
        });
    
        const tempArr = [...cart];
        tempArr[ind].amount += d;
    
        if (tempArr[ind].amount <= 0) {
            tempArr[ind].amount = 1;
        }
    
        setCart(tempArr); // Use setCart from useCart hook
    
        try {
            const response = await fetch(`http://localhost:3001/api/cart/update-cart`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in local storage
                },
                body: JSON.stringify({ updatedItems: tempArr }),
            });
    
            if (response.ok) {
                const updatedCart = await response.json();
                setCart(updatedCart);
            } else {
                console.error('Error updating cart:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    }

    return (
        <div>
            <Amazon handleClick={handleClick} />
            {warning && <div className='warning'>Item is already added to your cart</div>}
            <Cart cart={cart} handleChange={handleChange} /> {/* Keep setCart */}
        </div>
    );
}

export default Cartss;
