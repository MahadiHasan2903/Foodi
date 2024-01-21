"use client";
import React from "react";
import { Button } from "../ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/lib/context/CartContext";

const Cart = () => {
  const { cartItems } = useCart();
  console.log("Cart Items:", cartItems);
  return (
    <>
      <div className="relative ">
        <Button variant="outline" size="icon">
          <FaShoppingCart className="h-[1.2rem] w-[1.2rem] transition-all " />
          <div className="absolute top-[-5px] w-1 h-1 font-bold right-1 text-primary">
            {cartItems.length}
          </div>
        </Button>
      </div>
    </>
  );
};

export default Cart;
