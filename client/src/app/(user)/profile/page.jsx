import React from "react";
import { getServerSessionData } from "@/lib/config/auth";
import api from "@/lib/api";
import UpdateProfile from "@/lib/components/User/UpdateProfile";

const ProfilePage = async () => {
  const { accessToken, id } = await getServerSessionData();
  const userDetails = await api.users.getSingleUser(id, accessToken);
  console.log(userDetails);
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="my-3 text-4xl font-bold">Update Profile</h1>
      <UpdateProfile userDetails={userDetails} />
    </div>
  );
};

export default ProfilePage;
