import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import "../index.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/home");
  };

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <header className="header">
      <h2 className="logo" onClick={() => navigate("/")}>MyShop</h2>
      <div className="header-actions">
        <button className="cart-btn" onClick={goToCart}>
          🛒 Cart <span className="cart-count">{cartCount}</span>
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
