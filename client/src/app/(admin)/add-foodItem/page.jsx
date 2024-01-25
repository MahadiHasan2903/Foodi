import AddFoodItem from "@/lib/components/Admin/AddFoodItem";
import React from "react";

const AddFoodItemsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="my-3 text-4xl font-bold">Add a new Food Item</h1>
      <AddFoodItem />
    </div>
  );
};

export default AddFoodItemsPage;
