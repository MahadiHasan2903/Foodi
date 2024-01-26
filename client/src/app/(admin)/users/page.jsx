import api from "@/lib/api";
import AllUsersList from "@/lib/components/Admin/AllUsersList";
import { getServerSessionData } from "@/lib/config/auth";
import React from "react";

const AllUsersPage = async () => {
  const { accessToken } = await getServerSessionData();
  const allUsers = await api.users.getAllUsers(accessToken);
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="my-3 text-4xl font-bold">All Users</h1>
      <AllUsersList allUsers={allUsers} />
    </div>
  );
};

export default AllUsersPage;
