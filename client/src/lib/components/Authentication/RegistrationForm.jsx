"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Input } from "../ui/input";
import {
  LogIn,
  MailIcon,
  Paperclip,
  Phone,
  ShieldMinus,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import logo from "../../../../public/logo.png";
import Image from "next/image";
import { Label } from "../ui/label";
import api from "@/lib/api";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import VerificationForm from "./VerificationForm";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activationToken, setActivationToken] = useState("");
  const [registeredUser, setRegisteredUser] = useState("");

  const router = useRouter();

  // For uploading Image
  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const registrationData = {
        name,
        email,
        phoneNumber: phone,
        password,
        avatar,
      };
      const response = await api.auth.registration(registrationData);
      toast.success(response.message);
      setActivationToken(response.activationToken);
      setRegisteredUser(response.registeredUser);
    } catch (error) {
      console.log("Registration Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {activationToken !== "" ? (
        <VerificationForm
          activation_token={activationToken}
          registeredUser={registeredUser}
        />
      ) : (
        <div className="relative flex items-center justify-center p-4 my-10">
          <Card className="relative w-[900%] md:w-[50%] lg:w-[25%] overflow-hidden group dark:bg-[#2a3036]">
            <CardHeader className="flex items-center justify-center px-2 py-5">
              <Image
                src={logo}
                alt="logo"
                width={65}
                height={65}
                className="mr-1"
              />
              <h6 className="text-2xl font-bold">Get started with 𝓕𝓸𝓸𝓭𝓲</h6>
            </CardHeader>
            <form onSubmit={handleSubmit} className="mt-12">
              <div className="flex items-center mx-5 my-5 ">
                <UserRound className="mr-4 text-primary left-2" size={25} />
                <Input
                  type="text"
                  placeholder="Name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex items-center mx-5 my-5 ">
                <MailIcon className="mr-4 text-primary left-2" size={25} />
                <Input
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center mx-5 my-5 ">
                <Phone className="mr-4 text-primary left-2" size={25} />
                <Input
                  type="number"
                  placeholder="Phone Number"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="relative flex items-center mx-5 my-5 ">
                <ShieldMinus className="mr-4 text-primary left-2" size={25} />
                <Input
                  type={visible ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute cursor-pointer right-2 top-2"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute cursor-pointer right-2 top-2"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
              <div className="flex items-center my-5 ml-[60px]">
                {avatar ? (
                  <span className="inline-block w-[60px] h-[60px] overflow-hidden rounded-full">
                    <Image
                      src={avatar}
                      alt="avatar"
                      width={100}
                      height={100}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </span>
                ) : (
                  <Label htmlFor="file-input" className="cursor-pointer ">
                    <div className="px-3 py-3 flex items-center  rounded-lg bg-teal-400 text-[#2a3036]">
                      <Paperclip className="mr-2 text-white left-2" size={25} />
                      <p> Upload Image</p>
                    </div>
                    <Input
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </Label>
                )}
              </div>
              <div className="flex items-center justify-center py-10">
                <Button className="gap-x-2" disabled={loading}>
                  {loading ? (
                    <HashLoader size={35} />
                  ) : (
                    <>
                      Signup <LogIn size={22} />
                    </>
                  )}
                </Button>
              </div>

              <h5 className="text-center pt-4 font-Poppins text-[14px]">
                Already have an account?
                <Link
                  href="/login"
                  className="pl-1 cursor-pointer text-primary"
                >
                  Login
                </Link>
              </h5>
            </form>
            <br />
          </Card>
        </div>
      )}
    </>
  );
};

export default RegistrationForm;
