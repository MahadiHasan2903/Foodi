import React from "react";
import UpdateOrder from "@/lib/components/Admin/UpdateOrder";
import api from "@/lib/api";
import { getServerSessionData } from "@/lib/config/auth";

const UpdateOrderPage = async ({ params }) => {
  const orderId = params.orderId;
  const { accessToken } = await getServerSessionData();
  const order = await api.orders.getSingleOrder(orderId, accessToken);

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="my-3 text-4xl font-bold">Update Order Status</h1>
      <UpdateOrder order={order} />
    </div>
  );
};

export default UpdateOrderPage;
