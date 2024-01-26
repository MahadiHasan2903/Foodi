import api from "@/lib/api";
import foodItems from "@/lib/api/foodItems";
import AllFoodItemList from "@/lib/components/Admin/AllFoodItemList";
import { getServerSessionData } from "@/lib/config/auth";
import React from "react";

const AllFoodItemsPage = async () => {
  const { accessToken } = await getServerSessionData();
  const allFoodItemList = await api.foodItems.getAllfoodItems(accessToken);
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="my-3 text-4xl font-bold">All Food Items</h1>
      <AllFoodItemList allFoodItemList={allFoodItemList} />
    </div>
  );
};

export default AllFoodItemsPage;
