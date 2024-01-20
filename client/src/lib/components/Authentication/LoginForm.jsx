"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Input } from "../ui/input";
import { LogIn, MailIcon, ShieldMinus } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader } from "../ui/card";
import Logo from "../Layout/Logo";
import { Button } from "../ui/button";

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = () => {};
  return (
    <div className="flex items-center justify-center p-4 my-[100px] ">
      <Card className="relative w-[80%] md:w-[50%] lg:w-[25%] overflow-hidden group dark:bg-[#2a3036]">
        <CardHeader className="flex items-center justify-center p-2">
          <Logo />
        </CardHeader>
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="flex items-center mx-5 my-2 ">
            <MailIcon className="mr-2 left-2" size={25} />
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center mx-5 my-2 ">
            <ShieldMinus className="mr-2 left-2" size={25} />
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center my-10">
            <Link href="/contact">
              <Button className="gap-x-2">
                Login <LogIn size={22} />
              </Button>
            </Link>
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
