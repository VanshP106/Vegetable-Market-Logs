import React from 'react';
import list from '../data';
import '../styles/Amazon.css';
import CartCards from './Cart_cards'; // Update the import
import { useCart } from '../CartContext'; // Import useCart hook

const Amazon = ({ handleClick }) => {
    const { cart, setCart } = useCart(); // Use useCart hook

    return (
        <section>
            {list.map((item) => (
                <CartCards key={item.id} item={item} handleClick={handleClick} />
            ))}
        </section>
    );
};

export default Amazon;
