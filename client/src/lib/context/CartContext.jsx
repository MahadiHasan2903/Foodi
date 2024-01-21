"use client";
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };

  const deleteFromCart = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, deleteFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
