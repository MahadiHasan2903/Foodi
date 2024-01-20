import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/logo.png";

const Logo = () => {
  return (
    <Link href="/">
      <p className="text-primary text-[40px] flex items-center">
        <Image src={logo} alt="logo" width={65} height={65} className="mr-1" />
        𝓕𝓸𝓸𝓭𝓲
      </p>
    </Link>
  );
};

export default Logo;
