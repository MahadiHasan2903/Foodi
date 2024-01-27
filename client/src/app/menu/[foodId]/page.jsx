import api from "@/lib/api";
import { getServerSessionData } from "@/lib/config/auth";
import Image from "next/image";
import React from "react";
import client1 from "../../../../public/images/home/testimonials/testimonial1.png";
import client2 from "../../../../public/images/home/testimonials/testimonial2.png";
import client3 from "../../../../public/images/home/testimonials/testimonial3.png";
import { FaStar } from "react-icons/fa";
import FoodDetails from "@/lib/components/Menu/FoodDetails";
import foodItems from "@/lib/api/foodItems";

const FoodItemDetailsPage = async ({ params }) => {
  const foodId = params.foodId;
  const { accessToken } = await getServerSessionData();
  const foodItemDetails = await api.foodItems.getSinglefoodItem(
    foodId,
    accessToken
  );
  return (
    <div className="container mt-[50px] mb-24 xl:mb-40">
      <div className="items-center justify-between block md:flex">
        <div className="flex-shrink-0 flex-grow-0  mr-[200px]">
          <Image
            src={foodItemDetails.image.url}
            width={500}
            height={300}
            alt={foodItemDetails.name}
          />
        </div>
        <div className="flex flex-col flex-grow-0">
          <div className="my-3 text-3xl font-bold ">
            <span className="mr-2 text-[#7a8d6e] ">Name</span>
            <h1>{foodItemDetails.name}</h1>
          </div>
          <div className="my-3 text-xl font-bold ">
            <span className="mr-2 text-[#7a8d6e]">Category</span>
            <h1>{foodItemDetails.category}</h1>
          </div>
          <div className="my-3 text-lg font-bold">
            <h1>{foodItemDetails.description}</h1>
          </div>

          <div className="flex items-center my-3 text-3xl font-bold">
            <h1 className="mr-2 text-primary">
              {foodItemDetails.originalPrice}
            </h1>
            <span>BDT</span>
          </div>

          <FoodDetails foodItem={foodItemDetails} />
          <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
            <Image
              src={client1}
              alt="client1"
              width={40}
              height={40}
              className="rounded-full"
            />
            <Image
              src={client2}
              alt="client"
              width={40}
              height={40}
              className="rounded-full ml-[-20px]"
            />
            <Image
              src={client3}
              alt="client"
              width={40}
              height={40}
              className="rounded-full ml-[-20px]"
            />
            <div className="ml-4 space-y-1">
              <h5 className="text-lg font-semibold">Customer Feedback</h5>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />{" "}
                <span className="font-medium">4.9</span>{" "}
                <span className="text-[#807E7E]">(2.3k Reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItemDetailsPage;
