import React from 'react';
import '../styles/cart_card.css'

const Cart_cards = ({ item, handleClick }) => {
    const { title, price, img } = item;
    return (
        <div className="Cart_cards">
            <div className="image_box">
                <img src={img} alt={title} /> {/* Update the alt attribute */}
            </div>
            <div className="details">
                <p>{title}</p>
                <p>Price - {price}Rs</p>
                <button onClick={() => handleClick(item)}>Add to Cart</button>
            </div>
        </div>
    );
}

export default Cart_cards;
