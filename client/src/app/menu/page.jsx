import api from "@/lib/api";
import AllFoodItems from "@/lib/components/Menu/AllFoodItems";
import { getServerSessionData } from "@/lib/config/auth";
import React from "react";

const MenuPage = async () => {
  const { accessToken } = await getServerSessionData();
  const foodItems = await api.foodItems.getAllfoodItems(accessToken);
  return (
    <div>
      <AllFoodItems foodItems={foodItems} />
    </div>
  );
};

export default MenuPage;
