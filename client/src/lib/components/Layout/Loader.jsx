import React from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <HashLoader
        color="#ff0000"
        className="text-primary w-[300px] h-[300pc]"
      />
    </div>
  );
};

export default Loader;
