"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import api from "@/lib/api";
import { useSession } from "next-auth/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePassword = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const id = session?.id;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [oVisible, setOVisible] = useState(false);
  const [nVisible, setNVisible] = useState(false);
  const [cnVisible, setCnVisible] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      // If passwords do not match, show an error and return
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await api.users.changePassword(
        id,
        accessToken,
        oldPassword,
        newPassword
      );
      console.log(response);

      toast.success("Password changed successfully");
    } catch (error) {
      console.error("Error changing password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-around w-[90%] md:w-[60%] lg:w-[40%] m-5 border px-5 py-10 bg-[#d7d7d7] dark:bg-[#1d232a]">
      <div className="w-[80%] relative">
        <Input
          type={oVisible ? "text" : "password"}
          id="name"
          placeholder="Old Password"
          className="my-2"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        {oVisible ? (
          <AiOutlineEye
            className="absolute cursor-pointer right-2 top-4"
            size={25}
            onClick={() => setOVisible(false)}
          />
        ) : (
          <AiOutlineEyeInvisible
            className="absolute cursor-pointer right-2 top-4"
            size={25}
            onClick={() => setOVisible(true)}
          />
        )}
      </div>

      <div className="w-[80%] relative">
        <Input
          type={nVisible ? "text" : "password"}
          id="name"
          placeholder="New Password"
          className="my-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {nVisible ? (
          <AiOutlineEye
            className="absolute cursor-pointer right-2 top-4"
            size={25}
            onClick={() => setNVisible(false)}
          />
        ) : (
          <AiOutlineEyeInvisible
            className="absolute cursor-pointer right-2 top-4"
            size={25}
            onClick={() => setNVisible(true)}
          />
        )}
      </div>
      <div className="w-[80%] relative">
        <Input
          type={cnVisible ? "text" : "password"}
          id="name"
          placeholder="New Password"
          className="my-2"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        {cnVisible ? (
          <AiOutlineEye
            className="absolute cursor-pointer right-2 top-4"
            size={25}
            onClick={() => setCnVisible(false)}
          />
        ) : (
          <AiOutlineEyeInvisible
            className="absolute cursor-pointer right-2 top-4"
            size={25}
            onClick={() => setCnVisible(true)}
          />
        )}
      </div>

      <div className="w-[80%]">
        <Button
          className="mt-8 gap-x-2"
          type="submit"
          onClick={handleChangePassword}
          disabled={loading}
        >
          {loading ? <HashLoader size={35} /> : <>Update</>}
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
