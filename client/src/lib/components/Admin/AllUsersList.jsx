"use client";
import React, { useState } from "react";
import api from "@/lib/api";
import { useSession } from "next-auth/react";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import { toast } from "react-toastify";

const AllUsersList = ({ allUsers }) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleDelete = async (id) => {
    try {
      const response = await api.users.deleteUser(id, accessToken);
      toast.success(response);
    } catch (error) {
      toast.error(`Error deleting Item: ${error}`);
    }
  };

  const totalPages = Math.ceil(allUsers.length / rowsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentItems = allUsers.slice(startIndex, endIndex);
  return (
    <div className="flex flex-col  overflow-scroll  items-center  justify-around w-[95%] md:w-[80%]  m-5 border px-5 py-10 bg-[#f1f1f1] dark:bg-[#1d232a]">
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
                Email
              </th>

              <th className="px-6 py-3 text-[14px] font-bold leading-4  text-left uppercase ">
                Phone Number
              </th>
              <th className="px-6 py-3 text-[14px] font-bold leading-4  text-left uppercase ">
                Role
              </th>

              <th className="px-6 text-center py-3 text-[14px] font-bold leading-4  uppercase ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user, index) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  {user.name}
                </td>

                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  {user.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  {user.role}
                </td>

                <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                  <button onClick={() => handleDelete(user.id)}>
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

export default AllUsersList;
