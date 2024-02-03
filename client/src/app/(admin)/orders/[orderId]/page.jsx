import React from "react";
import api from "@/lib/api";
import { getServerSessionData } from "@/lib/config/auth";
import Image from "next/image";

const OrderDetailsPage = async ({ params }) => {
  const orderId = params.orderId;
  const { accessToken } = await getServerSessionData();
  const orderFoodItems = await api.orders.getFoodItemsInOrder(
    orderId,
    accessToken
  );
  const getSingleOrder = await api.orders.getSingleOrder(orderId, accessToken);

  const arrangedFoodItems = orderFoodItems.map((orderItem) => {
    const singleOrderItem = getSingleOrder.cart.find(
      (cartItem) => cartItem.item === orderItem.foodItem._id
    );

    return {
      foodItem: orderItem.foodItem,
      quantity: singleOrderItem ? singleOrderItem.quantity : 0,
      totalPrice: singleOrderItem
        ? singleOrderItem.quantity * orderItem.foodItem.originalPrice
        : 0,
    };
  });

  console.log("Food Items with Quantity and Total Price:", arrangedFoodItems);

  return (
    <div className="flex flex-col items-center justify-center ">
      {arrangedFoodItems.map((item) => (
        <div
          key={item.foodItem._id}
          className="flex items-center justify-center w-full my-4 border-b "
        >
          <div className="w-[40%]">
            <Image
              src={item.foodItem.image.url}
              alt={item.foodItem.name}
              width={200}
              height={200}
              className="p-5 lg:mr-[300px] overflow-none mr-12"
            />
          </div>
          <div className="w-[60%]">
            <p className="ml-4 text-2xl">{item.foodItem.name}</p>
            <p className="my-2 ml-4 text-xl">
              <span className="mr-2 text-primary">BDT</span>
              {item.foodItem.originalPrice}
            </p>
            <p className="my-2 ml-4 text-xl">{item.foodItem.category}</p>
            <p className="my-2 ml-4 text-xl">
              Price: {item.foodItem.originalPrice} X {item.quantity} =
              {item.totalPrice}
            </p>
          </div>
        </div>
      ))}

      <div>
        <p className="my-5 text-3xl">
          SubTotal : 2000 <span className="ml-2 text-primary">BDT</span>
        </p>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
