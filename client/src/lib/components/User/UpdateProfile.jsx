"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { HashLoader } from "react-spinners";
import { Camera } from "lucide-react";
import Image from "next/image";
import api from "@/lib/api";
import { toast } from "react-toastify";

const UpdateProfile = ({ userDetails }) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [avatar, setAvatar] = useState(userDetails.avatar);
  const [name, setName] = useState(userDetails.name);

  const [loading, setLoading] = useState(false);

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUpdateProfile = async () => {
    if (!name) {
      setLoading(false);
      toast.error("Please fill in all the required fields");
      return;
    }
    setLoading(true);
    let updatedImage = avatar;
    // Check if a new image has been selected
    if (document.getElementById("file-input").files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          updatedImage = reader.result;
        }
      };
      reader.readAsDataURL(document.getElementById("file-input").files[0]);
    }
    const updatedData = {
      name,
    };
    // Only include the image in userData if it has changed
    if (updatedImage !== userDetails.avatar) {
      updatedData.avatar = updatedImage;
    }
    try {
      const response = await api.users.updateUser(
        userDetails.id,
        accessToken,
        updatedData
      );
      toast.success("Profile Updated");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-around w-[90%] md:w-[60%] lg:w-[40%] m-5 border px-5 py-10 bg-[#d7d7d7] dark:bg-[#1d232a]">
      <div className="relative flex flex-col items-center justify-center w-full my-5 lg:mx-5">
        <label
          htmlFor="file-input"
          className="w-32 h-32 overflow-hidden rounded-full"
        >
          <Input
            type="file"
            name="avatar"
            id="file-input"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileInputChange}
            className="hidden"
          />
          {avatar ? (
            <Image
              width={500}
              height={500}
              src={avatar}
              alt="image"
              className="object-cover w-full h-full bg-gray-300"
            />
          ) : (
            <Image
              src="/user-logo.png"
              alt="developer"
              width={500}
              height={500}
              className="object-cover bg-gray-300"
            />
          )}
          <div className="absolute rounded-full cursor-pointer right-[40%] bottom-5">
            <label htmlFor="file-input">
              <Camera size={20} className="cursor-pointer text-cyan-500" />
            </label>
          </div>
        </label>
      </div>

      <div className="w-[80%]">
        <Input
          type="text"
          id="name"
          placeholder="Name"
          className="my-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="w-[80%]">
        <Input
          type="text"
          id="email"
          readOnly
          value={userDetails.email}
          className="my-2"
        />
      </div>

      <div className="w-[80%]">
        <Button
          className="mt-8 gap-x-2"
          type="submit"
          onClick={handleUpdateProfile}
          disabled={loading}
        >
          {loading ? <HashLoader size={35} /> : <>Update</>}
        </Button>
      </div>
    </div>
  );
};

export default UpdateProfile;
