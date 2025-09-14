import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import { AuthContext } from "../AuthContext"; // 👈 add this

const Productcards = ({ pData }) => {
  const { id, brand, title, price, discountPercentage, thumbnail } = pData || {};
  const mrp = Math.round(price / (1 - discountPercentage / 100));

  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // 👈 logged-in user
  const userEmail = user?.email;

  const cartItem = cart.find((item) => item.id === id);
  const qty = cartItem ? cartItem.qty : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!userEmail) return alert("Please login first"); // safety check
    addToCart({ ...pData, qty: 1 }, userEmail); // 👈 email pass karo
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    if (!userEmail) return alert("Please login first");
    addToCart({ ...pData, qty: qty + 1 }, userEmail);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (!userEmail) return alert("Please login first");
    if (qty > 1) {
      addToCart({ ...pData, qty: qty - 1 }, userEmail);
    } else {
      removeFromCart(id, userEmail); // 👈 email pass karo
    }
  };

  return (
    <div className="product-card">
      <div className="pc-media">
        <img src={thumbnail} alt={title} loading="lazy" />
      </div>
      <div className="pc-body">
        <span className="pc-brand">{brand}</span>
        <h3 className="pc-title">{title}</h3>
        <div className="pc-price-row">
          <span className="pc-price">₹{price}</span>
          <span className="pc-mrp">₹{mrp}</span>
          <span className="pc-off">{discountPercentage}% off</span>
        </div>
        {qty === 0 ? (
          <button className="add-btn" onClick={handleAdd}>
            Add
          </button>
        ) : (
          <div className="qty-btns">
            <button onClick={handleDecrement}>-</button>
            <span>{qty}</span>
            <button onClick={handleIncrement}>+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productcards;
