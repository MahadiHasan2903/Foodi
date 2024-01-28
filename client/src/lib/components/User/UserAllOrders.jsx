"use client";
import { ChevronLeft, ChevronRight, Fullscreen } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const UserAllOrders = ({ allOrders }) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const totalPages = Math.ceil(allOrders.length / rowsPerPage);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentItems = allOrders.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col relative  overflow-scroll  items-center  justify-around w-[95%]  m-5 border px-5 py-10 bg-[#f1f1f1] dark:bg-[#1d232a]">
      <div className="w-full">
        <table className="min-w-full p-2 ">
          <thead className="text-center">
            <tr className="w-full bg-primary">
              <th className="px-6  py-3 text-[14px] font-bold leading-4  uppercase ">
                ID
              </th>
              <th className="px-6 py-3 text-center text-[14px] font-bold leading-4   uppercase ">
                Items
              </th>

              <th className="px-6 py-3 text-[14px] font-bold leading-4   uppercase ">
                Total Price
              </th>
              <th className="px-6 py-3 text-center text-[14px] font-bold leading-4   uppercase ">
                Status
              </th>

              <th
                colSpan={6}
                className="px-6 py-3 text-[14px] font-bold leading-4  text-center uppercase "
              >
                ShippingAddress
              </th>
              <th className="px-6 text-center py-3 text-[14px] font-bold leading-4  uppercase ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentItems.map((order, index) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200 dark:border-gray-700">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200 dark:border-gray-700">
                  {order.items}
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200 dark:border-gray-700">
                  {order.totalPrice}
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200 dark:border-gray-700">
                  {order.status}
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  {order.shippingAddress.house}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  {order.shippingAddress.road}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  {order.shippingAddress.zipCode}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  {order.shippingAddress.zipCode}
                </td>
                <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  {order.shippingAddress.city}
                </td>
                <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-r border-gray-200 dark:border-gray-700">
                  {order.shippingAddress.country}
                </td>

                <td className="px-2 py-4 text-center whitespace-no-wrap border-b border-r border-gray-200 dark:border-gray-700">
                  <Link href={`/orders/${order.id}`}>
                    <Fullscreen size={20} color="#2342A2" />
                  </Link>
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

export default UserAllOrders;
