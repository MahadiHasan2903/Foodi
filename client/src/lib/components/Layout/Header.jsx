"use client";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
import { usePathname } from "next/navigation";
import ThemeToggler from "../Theme/ThemeToggler.jsx";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/lib/context/CartContext";
import { Button } from "../ui/button";
import CartPopup from "../Cart/CartPopup";

const Header = () => {
  const [header, setHeader] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const { cartItems } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const scrollYPos = window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    });
    return () => window.removeEventListener("scroll", scrollYPos);
  }, []);

  const handleCartIconClick = () => {
    setCartOpen((prevIsCartOpen) => !prevIsCartOpen);
  };

  return (
    <div className="relative">
      <header
        className={`${
          header
            ? " bg-white shadow-lg dark:bg-secondary"
            : " dark:bg-transparent"
        } sticky top-0 z-30 transition-all  ${
          pathname === "/" && "bg-[#eeeeee]"
        }`}
      >
        <div className="container py-2 mx-auto ">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-x-6">
              <Navbar
                containerStyles="hidden xl:flex gap-x-8 items-center"
                linkStyles="relative hover:text-primary transition-all text-lg"
                underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
              />
              <div className="relative ">
                <Button variant="outline" size="icon">
                  <FaShoppingCart
                    className="h-[1.2rem] w-[1.2rem] transition-all "
                    onClick={handleCartIconClick}
                  />
                  <div className="absolute top-[-5px] w-1 h-1 font-bold right-1 text-primary">
                    {cartItems.length}
                  </div>
                </Button>
              </div>
              <ThemeToggler />
              <div className=" xl:hidden">
                <MobileNavbar />
              </div>
            </div>
          </div>
        </div>
      </header>
      {isCartOpen && <CartPopup onClose={() => setCartOpen(false)} />}
    </div>
  );
};

export default Header;
