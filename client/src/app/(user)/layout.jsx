import React from "react";
import ProtectedRoute from "@/lib/config/ProtectedRoute";
import ProfileSidebar from "@/lib/components/User/ProfileSidebar";

export const metadata = {
  title: "User Dashboard",
  description: "User Dashboard",
};

const Layout = ({ children }) => {
  return (
    <ProtectedRoute>
      <div className="border-t border-t-1 ">
        <div className="flex justify-start w-full h-full md:justify-center ">
          <div className="w-[80px] border-r border-black dark:border-white h-[80vh] md:w-[330px] bg-tertiary dark:bg-secondary/40 py-4 ">
            <ProfileSidebar />
          </div>
          <div className="w-full h-[80vh] p-5  overflow-y-scroll  bg-transparent">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
