"use client";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
import { Button } from "../ui/button";
import FoodCard from "../Menu/FoodCard";

const SpecialDishes = ({ foodItems }) => {
  const sortedFoodItems = foodItems.sort(
    (a, b) => parseInt(b.sold) - parseInt(a.sold)
  );
  const mostSoldItems = sortedFoodItems.slice(0, 3);

  return (
    <section className="mt-[100px] mb-12 xl:mb-32">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-lg font-semibold tracking-wide uppercase text-primary">
              Customer Favourites
            </p>
            <h2 className="mx-auto mb-12  section-title my-2 text-4xl font-bold md:text-5xl md:leading-snug dark:text-[#a6adbb] text-black">
              Special Dishes
            </h2>
          </div>
          <Link href="/menu">
            <Button className="gap-x-2">
              View All <AiOutlineArrowRight size={22} />
            </Button>
          </Link>
        </div>
      </div>

      {/* Pass the top 3 food items to FoodCard component */}
      <div className="container grid grid-cols-1 gap-4 text-lg xl:mt-8 lg:grid-cols-3">
        {mostSoldItems.map((foodItem) => (
          <FoodCard key={foodItem.id} foodItem={foodItem} />
        ))}
      </div>
    </section>
  );
};

export default SpecialDishes;
