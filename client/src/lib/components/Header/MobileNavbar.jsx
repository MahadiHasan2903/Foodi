import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { AlignJustify } from "lucide-react";
import Navbar from "./Navbar";
import Socials from "../Hero/Socials";
import Logo from "./Logo";

const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <AlignJustify className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col items-center justify-between h-full py-8">
          <div className="flex flex-col items-center gap-y-32">
            <Logo />
            <Navbar
              containerStyles="flex flex-col  items-center gap-y-10"
              linkStyles="text-xl"
            />
          </div>
          <Socials containerStyles="flex gap-x-4 " iconStyles="text-2xl" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
