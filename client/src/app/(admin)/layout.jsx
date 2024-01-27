import Sidebar from "@/lib/components/Admin/Sidebar";
import ProtectedAdminRoute from "@/lib/config/ProtectedAdminRoute";
import React from "react";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

const Layout = ({ children }) => {
  return (
    <ProtectedAdminRoute>
      <div className="border-t border-t-1 ">
        <div className="flex justify-start w-full h-full md:justify-center ">
          <div className="w-[80px] border-r border-black dark:border-white h-[80vh] md:w-[330px] bg-tertiary dark:bg-secondary/40 py-4 ">
            <Sidebar />
          </div>
          <div className="w-full h-[80vh] p-5 overflow-y-scroll bg-transparent">
            {children}
          </div>
        </div>
      </div>
    </ProtectedAdminRoute>
  );
};

export default Layout;
