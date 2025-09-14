import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import { CartProvider } from "./components/CartContext";
import Cart from "./components/Cart";

import Home from "./components/HomeScreen/Home";
import SignUp from "./components/SignUpScreen/SignUp";
import SignIn from "./components/SignInScreen/SignIn";
import GetApiData from "./components/GetApiData"; 
import Header from "./components/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <AuthProvider>\
  <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/profile"
            element={
              <>
                <Header/>
                <GetApiData/> 
              </>
                
              
              }/>
          <Route path="/home" element={<Home/>}/>
          <Route
              path="/cart"
              element={
                <CartProvider>
                  <Header />
                  <Cart userEmail="test@gmail.com" /> {/* 👈 userEmail context se le sakte ho */}
              </CartProvider>
            }
          />
        </Routes>
      </BrowserRouter>
      </CartProvider>
  </AuthProvider>
</React.StrictMode>

);
