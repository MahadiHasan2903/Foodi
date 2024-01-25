"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { Card, CardHeader } from "../ui/card";
import { ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useCart } from "@/lib/context/CartContext";
import { toast } from "react-toastify";

const FoodCard = ({ foodItem }) => {
  const {
    id,
    name,
    originalPrice,
    discountPrice,
    sold,
    category,
    description,
    ratings,
    events,
    image,
  } = foodItem;

  const { addToCart, cartItems } = useCart();
  const isItemInCart = cartItems.some((item) => item.id === id);

  const handleAddToCart = () => {
    const quantity = 1;

    if (isItemInCart) {
      toast.error("Item is already in the cart");
    } else {
      addToCart(foodItem, quantity);
      toast.success("Item added to cart");
    }
  };

  // const handleHeartClick = () => {
  //   setIsHeartFilled(!isHeartFilled);
  // };

  const averageRating =
    ratings.reduce((sum, ratingObj) => sum + ratingObj.ratings, 0) /
    ratings.length;

  return (
    <Card className="relative overflow-hidden group bg-[#d7d7d7] dark:bg-[#1d232a]">
      <CardHeader className="p-0">
        <div className="w-2/6 ">
          <Badge className="m-2 mb-3 text-sm font-medium text-center uppercase top-4 left-5">
            {category}
          </Badge>
        </div>
        <div className="relative w-full h-[260px] flex items-center mt-2 overflow-hidden xl:bg-no-repeat bg-tertiary dark:bg-secondary/40  xl:bg-[110%] justify-center">
          <Image
            className="absolute bottom-0 shadow-2xl"
            src={image.url}
            width={300}
            height={250}
            alt="Project"
            priortiy="true"
          />
        </div>
      </CardHeader>
      <div className="h-full px-8 py-6">
        <div className="flex items-center justify-between mb-1">
          <h4 className="h4">{name}</h4>
          <div className="flex items-center justify-center gap-2 mb-1">
            <FaStar className="text-yellow-400" />{" "}
            <span className="font-medium">{averageRating}</span>{" "}
          </div>
        </div>

        <div className="flex justify-between py-5 ">
          <p className="mr-2 text-[18px] text-[700]">
            <span className="mr-1 text-red-400">BDT</span>
            {originalPrice}{" "}
          </p>
          <Button className="gap-x-2" onClick={handleAddToCart}>
            Add to Cart <ShoppingCart size={22} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FoodCard;
