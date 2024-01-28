"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

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

  const addToCart = (item, quantity) => {
    // Check if the item is already in the cart
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // Update the existing item with the new quantity
      setCartItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: quantity,
        };
        return updatedItems;
      });
    } else {
      // Add the new item to the cart
      setCartItems((prevItems) => [...prevItems, { ...item, quantity }]);
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
