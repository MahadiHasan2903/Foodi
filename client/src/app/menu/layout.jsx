import ProtectedRoute from "@/lib/config/ProtectedRoute";
import React from "react";

const MenuLayout = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default MenuLayout;
