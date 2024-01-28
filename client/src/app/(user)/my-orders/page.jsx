import api from "@/lib/api";
import UserAllOrders from "@/lib/components/User/UserAllOrders";
import { getServerSessionData } from "@/lib/config/auth";
import React from "react";

const MyOrdersPage = async () => {
  const { accessToken, id } = await getServerSessionData();
  const userOrders = await api.orders.getUserOrder(id, accessToken);
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="my-3 text-4xl font-bold">All Orders</h1>
      <UserAllOrders allOrders={userOrders} />
    </div>
  );
};

export default MyOrdersPage;
