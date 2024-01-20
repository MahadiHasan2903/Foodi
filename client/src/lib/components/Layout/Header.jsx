"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
import { usePathname } from "next/navigation";
import ThemeToggler from "../Theme/ThemeToggler.jsx";
import { ShoppingCart } from "lucide-react";
import Cart from "../utils/Cart";

const Header = () => {
  const [header, setHeader] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const scrollYPos = window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    });
    return () => window.removeEventListener("scroll", scrollYPos);
  }, []);

  return (
    <header
      className={`${
        header
          ? " bg-white shadow-lg dark:bg-secondary"
          : " dark:bg-transparent"
      } sticky top-0 z-30 transition-all ${pathname === "/" && "bg-[#eeeeee]"}`} //#1d232a
    >
      <div className="container py-2 mx-auto ">
        <div className="flex items-center justify-between">
          <Logo />
          {/* Navbar */}
          <div className="flex items-center gap-x-6">
            <Navbar
              containerStyles="hidden xl:flex gap-x-8 items-center"
              linkStyles="relative hover:text-primary transition-all text-lg"
              underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
            />
            <Cart />
            <ThemeToggler />
            <div className=" xl:hidden">
              <MobileNavbar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
