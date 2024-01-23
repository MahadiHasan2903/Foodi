import Sidebar from "@/lib/components/Admin/Sidebar";
import ProtectedRoute from "@/lib/config/ProtectedRoute";
import React from "react";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

const Layout = ({ children }) => {
  return (
    <ProtectedRoute>
      <div className="border-t border-t-1 ">
        <div className="flex justify-start w-full h-full md:justify-center ">
          <div className="w-[80px] border-r border-black dark:border-white h-full md:w-[330px] bg-tertiary dark:bg-secondary/40 py-4 ">
            <Sidebar />
          </div>
          <div className="w-full h-full p-5 overflow-x-hidden bg-transparent">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
