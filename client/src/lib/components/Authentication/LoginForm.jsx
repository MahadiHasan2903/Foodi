"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Input } from "../ui/input";
import { LogIn, MailIcon, ShieldMinus } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import logo from "../../../../public/logo.png";
import Image from "next/image";

const LoginForm = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = () => {};
  return (
    <div className="flex items-center justify-center p-4 my-[100px] ">
      <Card className="relative w-[80%] md:w-[50%] lg:w-[25%] overflow-hidden group dark:bg-[#2a3036]">
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
            <MailIcon className="mr-2 text-primary left-2" size={25} />
            <Input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative flex items-center mx-5 my-5 ">
            <ShieldMinus className="mr-2 text-primary left-2" size={25} />
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
          <div className="flex items-center justify-center py-10">
            <Button className="gap-x-2">
              Login <LogIn size={22} />
            </Button>
          </div>

          <h5 className="text-center pt-4 font-Poppins text-[14px]">
            Not have any account?
            <Link href="/signup" className="pl-1 cursor-pointer text-primary">
              Sign Up
            </Link>
          </h5>
        </form>
        <br />
      </Card>
    </div>
  );
};

export default LoginForm;
