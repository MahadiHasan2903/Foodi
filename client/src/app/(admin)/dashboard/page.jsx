import api from "@/lib/api";
import FoodItemChart from "@/lib/components/Admin/Charts/FoodItemChart";
import ProfitChart from "@/lib/components/Admin/Charts/ProfitChart";
import { getServerSessionData } from "@/lib/config/auth";
import React from "react";

const AdminDashboardPage = async () => {
  const { accessToken } = await getServerSessionData();
  const foodChartDetails = await api.foodItems.getfoodItemsData(accessToken);
  const ordersChartDetails = await api.orders.getOrdersData(accessToken);
  const userChartDetails = await api.users.getUsersData(accessToken);

  return (
    <div className="flex flex-col items-center justify-center lg:flex-row ">
      <FoodItemChart foodItems={foodChartDetails} />
      <ProfitChart
        ordersChartDetails={ordersChartDetails}
        userChartDetails={userChartDetails}
      />
    </div>
  );
};

export default AdminDashboardPage;
