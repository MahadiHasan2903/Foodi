"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";
import FoodCard from "./FoodCard";

const AllFoodItems = ({ foodItems }) => {
  // Initialize categories directly without useEffect
  const categories = [
    "All Items",
    ...new Set(foodItems?.map((item) => item.category)),
  ];

  const [category, setCategory] = useState("All Items");

  console.log(categories);

  return (
    <Tabs
      defaultValue={category}
      className="container mt-[50px] mb-24 xl:mb-48"
    >
      <TabsList className="grid w-full h-full py-2 mx-auto mb-12 text-white md:grid-cols-6 md:border bg-primary">
        {categories.map((cat, index) => (
          <TabsTrigger
            key={index}
            value={cat}
            onClick={() => setCategory(cat)}
            className="capitalize w-[162px] md:w-auto mr-2"
          >
            {cat}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="grid grid-cols-1 gap-4 text-lg xl:mt-8 lg:grid-cols-3">
        {foodItems
          .filter(
            (foodItem) =>
              category === "All Items" || foodItem.category === category
          )
          .map((foodItem, index) => (
            <TabsContent value={category} key={index}>
              <FoodCard foodItem={foodItem} />
            </TabsContent>
          ))}
      </div>
    </Tabs>
  );
};

export default AllFoodItems;
