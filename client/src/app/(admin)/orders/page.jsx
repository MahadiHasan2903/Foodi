import api from "@/lib/api";
import AllOrderList from "@/lib/components/Admin/AllOrderList";
import { getServerSessionData } from "@/lib/config/auth";
import React from "react";

const AllOrdersPage = async () => {
  const { accessToken } = await getServerSessionData();
  const allOrders = await api.orders.getAllOrders(accessToken);
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="my-3 text-4xl font-bold">All Orders</h1>
      <AllOrderList allOrders={allOrders} />
    </div>
  );
};

export default AllOrdersPage;
