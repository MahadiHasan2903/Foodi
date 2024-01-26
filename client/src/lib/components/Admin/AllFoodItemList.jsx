"use client";
import api from "@/lib/api";
import {
  ChevronLeft,
  ChevronRight,
  Fullscreen,
  PencilLine,
  Trash,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AllFoodItemList = ({ allFoodItemList }) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleDelete = async (id) => {
    try {
      const response = await api.foodItems.deletefoodItem(id, accessToken);
      toast.success(response);
    } catch (error) {
      toast.error(`Error deleting Item: ${error}`);
    }
  };

  const totalPages = Math.ceil(allFoodItemList.length / rowsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentItems = allFoodItemList.slice(startIndex, endIndex);
  return (
    <div className="flex flex-col  items-center  justify-around w-[95%] md:w-[80%]  m-5 border px-5 py-10 bg-[#f1f1f1] dark:bg-[#1d232a]">
      <div className="w-full">
        <table className="min-w-full p-2 ">
          <thead>
            <tr className="w-full bg-primary">
              <th className="px-6 py-3 text-[14px] font-bold leading-4  text-left uppercase ">
                ID
              </th>
              <th className="px-6 py-3 text-[14px] font-bold leading-4  text-left uppercase ">
                Name
              </th>
              <th className="px-6 py-3 text-[14px] font-bold leading-4  text-left uppercase ">
                Image
              </th>

              <th className="px-6 py-3 text-[14px] font-bold leading-4  text-left uppercase ">
                Category
              </th>
              <th className="px-6 py-3 text-[14px] font-bold leading-4  text-left uppercase ">
                Sold
              </th>
              <th className="px-6 py-3 text-[14px] font-bold leading-4  text-left uppercase ">
                Price
              </th>
              <th
                colSpan={3}
                className="px-6 text-center py-3 text-[14px] font-bold leading-4  uppercase "
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((foodItem, index) => (
              <tr key={foodItem.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  {foodItem.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center">
                    <Image
                      src={foodItem.image.url}
                      alt={foodItem.name}
                      width={40}
                      height={40}
                    />
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  {foodItem.category}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  {foodItem.sold}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  {foodItem.originalPrice}
                </td>
                <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  <Link href={`/foodItems/${foodItem.id}/update-foodItem`}>
                    <PencilLine size={20} className="text-primary" />
                  </Link>
                </td>
                <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  <Link href={`/foodItems/${foodItem.id}`}>
                    <Fullscreen size={20} color="#2342A2" />
                  </Link>
                </td>
                <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  <button onClick={() => handleDelete(foodItem.id)}>
                    <Trash size={20} color="#ff0000" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between w-[80%] mt-4 flex-col md:flex-row">
        <div className="w-[80%] text-left mb-5 md:mb-0">
          <span>Show:</span>
          <select
            className="p-1 mx-2 mt-1 border rounded cursor-pointer"
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            value={rowsPerPage}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span>rows per page</span>
        </div>
        <div className="w-[20%] flex items-center justify-around">
          <button
            className="cursor-pointer"
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center justify-center">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`mx-1 px-3 py-1 rounded ${
                    currentPage === number ? "bg-primary text-white" : ""
                  }`}
                >
                  {number}
                </button>
              )
            )}
          </div>
          <button
            className="cursor-pointer"
            onClick={() =>
              paginate(currentPage < totalPages ? currentPage + 1 : currentPage)
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllFoodItemList;
