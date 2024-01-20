import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/">
      <Image src="/logo3.png" alt="logo" width={120} height={120} />
    </Link>
  );
};

export default Logo;
