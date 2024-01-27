"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";

const FoodDetails = ({ foodItem }) => {
  const { addToCart, cartItems } = useCart();
  const [count, setCount] = useState(1);
  const id = foodItem.id;

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    const isItemInCart = cartItems.find((item) => item.id === id);

    if (isItemInCart) {
      toast.error("Item is already in the cart");
    } else {
      addToCart(foodItem, count);
      toast.success("Item added to cart");
    }
  };
  //   console.log(foodItem);
  return (
    <div className="my-10">
      <div className="ml-3">
        <button
          className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out rounded-l shadow-lg bg-gradient-to-r from-teal-400 to-teal-500 hover:opacity-75"
          onClick={decrementCount}
        >
          -
        </button>
        <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
          {count}
        </span>
        <button
          className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out rounded-l shadow-lg bg-gradient-to-r from-teal-400 to-teal-500 hover:opacity-75"
          onClick={incrementCount}
        >
          +
        </button>
      </div>
      <div className="mt-5">
        <Button className="my-2 gap-x-2" onClick={handleAddToCart}>
          Add to Cart <ShoppingCart size={22} />
        </Button>
      </div>
    </div>
  );
};

export default FoodDetails;
