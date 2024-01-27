import React from "react";
import OrderForm from "@/lib/components/Order/OrderForm";

const OrderPage = () => {
  return (
    <div className="container flex flex-col items-center mt-[50px]">
      <h1 className="my-3 text-4xl font-bold text-primary">Place Your Order</h1>
      <OrderForm />
    </div>
  );
};

export default OrderPage;
