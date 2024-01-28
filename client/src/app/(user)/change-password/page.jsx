import ChangePassword from "@/lib/components/User/ChangePassword";
import React from "react";

const ChangePasswordPage = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="mt-10 mb-3 text-4xl font-bold">Change Password</h1>
      <ChangePassword />
    </div>
  );
};

export default ChangePasswordPage;
