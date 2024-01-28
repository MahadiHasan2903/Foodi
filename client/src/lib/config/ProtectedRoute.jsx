"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next//navigation";

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userRole = session?.role;
  const accessToken = session?.accessToken;

  useEffect(() => {
    if (status === "loading") return;

    if (!session || !accessToken) {
      router.push("/login");
    }
  }, [status, session, accessToken, router]);

  if (status === "loading") return <div>Loading...</div>;

  return accessToken && <div>{children}</div>;
};

export default ProtectedRoute;
