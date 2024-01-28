"use client";
import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import { Button } from "../ui/button";
import api from "@/lib/api";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UpdateOrder = ({ order }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);
  console.log(order);
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateStatus = async (e) => {
    console.log("Function Initiated");
    try {
      setLoading(true);

      const response = await api.orders.updateOrder(
        order._id,
        accessToken,
        status
      );
      console.log(response);
      toast.success("Order status updated successfully!");
      router.push("/orders");
    } catch (error) {
      toast.error("Error updating order status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-[90%] md:w-[60%] lg:w-[40%] m-5 border px-5 py-10 bg-[#d7d7d7] dark:bg-[#1d232a]">
      <div className="w-[80%]">
        <select
          value={status}
          onChange={handleStatusChange}
          className="w-full p-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-black bg-white border rounded-md  dark:text-[#96969e] dark:bg-[#0c0a09] my-2"
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <div className="w-[80%]">
        <Button
          className="mt-8 gap-x-2"
          type="submit"
          onClick={handleUpdateStatus}
          disabled={loading}
        >
          {loading ? <HashLoader size={35} /> : <>Update</>}
        </Button>
      </div>
    </div>
  );
};

export default UpdateOrder;
