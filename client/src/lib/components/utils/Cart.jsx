import React from "react";
import { Button } from "../ui/button";
import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  return (
    <>
      <div className="relative ">
        <Button variant="outline" size="icon">
          <FaShoppingCart className="h-[1.2rem] w-[1.2rem] transition-all " />
          <div className="absolute top-[-5px] w-1 h-1 font-bold right-1 text-primary">
            2
          </div>
        </Button>
      </div>
    </>
  );
};

export default Cart;
