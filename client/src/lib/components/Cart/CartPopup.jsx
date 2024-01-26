"use client";
import React, { useState } from "react";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import SingleCart from "./SingleCart";
import Link from "next/link";

const CartPopup = ({ onClose }) => {
  const [isPopupOpen, setPopupOpen] = useState(true);
  const { getCartItems, removeFromCart } = useCart();
  const cartItems = getCartItems();
  console.log(cartItems);

  const handleCloseClick = () => {
    setPopupOpen(false);
    onClose();
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.originalPrice * item.quantity;
  }, 0);

  const quantityChangeHandler = (itemId, newQuantity) => {};

  return (
    <>
      {isPopupOpen && (
        <div className="absolute top-0 right-0 h-[100vh] cartpopup w-[400px] z-[99999]">
          <div
            className="absolute cursor-pointer top-2 right-2"
            onClick={handleCloseClick}
          >
            <X size={30} />
          </div>
          <div className="flex items-center mx-5 my-10 text-primary">
            <ShoppingBag size={30} />
            <p className="ml-1">{cartItems?.length} items</p>
          </div>
          <div className="flex items-center ">
            <div className="w-full border-t border-primary">
              {cartItems &&
                cartItems.map((item, index) => (
                  <SingleCart
                    key={index}
                    item={item}
                    quantityChangeHandler={quantityChangeHandler}
                    handleRemoveFromCart={handleRemoveFromCart}
                  />
                ))}
            </div>
          </div>
          <div className="bottom-0 py-2 mx-4 mt-[200px] text-center rounded-lg bg-primary">
            <Link href="/checkout">Checkout Now (BDT {totalPrice})</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPopup;
