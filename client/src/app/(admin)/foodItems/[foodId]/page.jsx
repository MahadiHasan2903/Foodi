import api from "@/lib/api";
import UpdateFoodItem from "@/lib/components/Admin/UpdateFoodItem";
import { getServerSessionData } from "@/lib/config/auth";
import React from "react";

const UpdateFoodItemPage = async ({ params }) => {
  const foodId = params.foodId;
  const { accessToken } = await getServerSessionData();
  const foodItemDetails = await api.foodItems.getSinglefoodItem(
    foodId,
    accessToken
  );

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="my-3 text-4xl font-bold">Update Food Item</h1>
      <UpdateFoodItem foodItem={foodItemDetails} />
    </div>
  );
};

export default UpdateFoodItemPage;
