"use client";

import Image from "next/image";
import React from "react";

const Badge = ({ containerStyles, item, badgeText }) => {
  return (
    <div className={`badge ${containerStyles}`}>
      <div className="text-3xl text-primary">
        <Image src={item} alt="icon" width={80} height={80} />
      </div>
      <div className="flex items-center gap-x-2">
        <div className="text-4xl font-bold leading-none text-secondary">
          {badgeText}
        </div>
        <div className="max-w-[70px] leading-none text-[15px] font-medium text-red-500">
          $ 18.00
        </div>
      </div>
    </div>
  );
};

export default Badge;
