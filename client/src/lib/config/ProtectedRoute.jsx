"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next//navigation";

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userRole = session?.role;

  useEffect(() => {
    if (status === "loading") return;

    if (!session || !userRole || userRole !== "admin") {
      router.push("/login");
    }
  }, [status, session, userRole, router]);

  if (status === "loading") return <div>Loading...</div>;

  return userRole === "admin" ? <div>{children}</div> : null;
};

export default ProtectedRoute;
