"use client";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const SingleCart = ({ item, handleQuantityChange, handleRemoveFromCart }) => {
  const [value, setValue] = useState(item?.quantity);
  const total = item?.originalPrice * value;
  const increment = () => {
    const newValue = value + 1;
    setValue(newValue);
    handleQuantityChange(item.id, newValue);
  };

  const decrement = () => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);
      handleQuantityChange(item.id, newValue);
    }
  };

  return (
    <div className="p-4 border-b border-primary ">
      <div className="flex items-center w-full">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer`}
            onClick={() => increment(item)}
          >
            <Plus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{item.quantity}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(item)}
          >
            <Minus size={16} color="#7d879c" />
          </div>
        </div>
        <Image
          width={130}
          height={100}
          src={item?.image?.url}
          alt="food item"
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{item.name}</h1>
          <h4 className="font-[400] text-[15px] text-primary">
            ${item.originalPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            BDT {total}
          </h4>
        </div>
        <X
          className="ml-5 cursor-pointer"
          onClick={() => handleRemoveFromCart(item.id)}
        />
      </div>
    </div>
  );
};

export default SingleCart;
