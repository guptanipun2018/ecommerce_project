import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Body from "./Body";
import Header from "./Header";
import { CartProvider } from "./CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <Header />
      <Body />
    </CartProvider>
  </React.StrictMode>
);
