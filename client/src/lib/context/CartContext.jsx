"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    setCartItems(storedCartItems ? JSON.parse(storedCartItems) : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, loading]);

  const addToCart = (foodItem, quantity) => {
    if (quantity <= 0) {
      return;
    }

    const existingItem = cartItems.find((item) => item.id === foodItem.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === foodItem.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...foodItem, quantity }]);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const getCartItems = () => {
    return cartItems;
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getCartItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
