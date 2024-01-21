"use client";
import React, { useRef, useState } from "react";
import { Card, CardHeader } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import logo from "../../../../public/logo.png";
import { HashLoader } from "react-spinners";
import { ShieldMinus } from "lucide-react";
import api from "@/lib/api";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import { MdOutlineVerifiedUser } from "react-icons/md";

const VerificationForm = ({ activation_token }) => {
  const [invalidError, setInvalidError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activationCode, setActivationCode] = useState(Array(6).fill(""));

  const inputRefs = Array(6)
    .fill(0)
    .map(() => useRef(null));

  const handleInputChange = (index, value) => {
    setActivationCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = parseInt(value, 10);
      return newCode;
    });

    // Move focus to the next input field
    if (value !== "" && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Check if any digit is not entered
      if (activationCode.some((digit) => digit === "")) {
        setInvalidError(true);
        return;
      }

      const activationData = {
        activation_token,
        activation_code: activationCode.join(""),
      };

      const response = await api.auth.userActivation(activationData);
      toast.success(response.message);
      router.push("/login");
    } catch (error) {
      console.error("Activation Error:", error);
      setInvalidError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 my-[100px]">
      <Card className="relative w-[90%] md:w-[50%] lg:w-[25%] overflow-hidden group dark:bg-[#2a3036]">
        <CardHeader className="flex items-center justify-center px-2 py-5">
          <Image
            src={logo}
            alt="logo"
            width={65}
            height={65}
            className="mr-1"
          />
          <h6 className="text-2xl font-bold">OTP Verification</h6>
        </CardHeader>
        <form onSubmit={handleSubmit} className="mt-12">
          <div className="flex items-center justify-around px-5 m-auto ">
            {inputRefs.map((ref, index) => (
              <Input
                key={index}
                type="number"
                ref={ref}
                className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
                  invalidError
                    ? "shake border-red-500"
                    : "dark:border-white border-[#0000004a]"
                }`}
                placeholder=""
                maxLength={1}
                value={activationCode[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            ))}
          </div>
          <div className="flex items-center justify-center py-10 mt-10">
            <Button className="gap-x-2" disabled={loading}>
              {loading ? (
                <HashLoader size={35} />
              ) : (
                <>
                  Verify <MdOutlineVerifiedUser size={22} />
                </>
              )}
            </Button>
          </div>
        </form>
        <br />
      </Card>
    </div>
  );
};

export default VerificationForm;
