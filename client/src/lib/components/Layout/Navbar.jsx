import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-toastify";

const Navbar = ({ containerStyles, linkStyles, underlineStyles }) => {
  const path = usePathname();
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const userRole = session?.role;
  const avatar = session?.avatar?.url;

  const links = [
    { path: "/", name: "Home" },
    { path: "/menu", name: "Menu" },
    { path: "/contact", name: "Contact" },
    !accessToken && { path: "/login", name: "Login" },
    userRole === "admin" && { path: "/dashboard", name: "Dashboard" },
  ];

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleAvatarClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setDropdownOpen(false);
    signOut({ callbackUrl: "/login" });
  };

  const filteredLinks = links.filter(Boolean);

  return (
    <nav className={`${containerStyles}`}>
      {filteredLinks.map((link, index) => (
        <Link
          key={index}
          href={link.path}
          className={`capitalize ${linkStyles}`}
        >
          {link.path === path && (
            <motion.span
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              transition={{ type: "tween" }}
              layoutId="underline"
              className={`${underlineStyles}`}
            />
          )}
          {link.name}
        </Link>
      ))}
      {accessToken && (
        <div style={{ position: "relative" }}>
          <Image
            src={avatar}
            alt="avatar"
            width={50}
            height={50}
            className="rounded-full cursor-pointer"
            onClick={handleAvatarClick}
          />
          {isDropdownOpen && (
            <div className="absolute left-[-50px] bg-[#d7d7d7] dark:bg-[#1d232a] z-50 px-2 py-2">
              <Link onClick={handleProfileClick} href="/profile">
                <div className="px-12 py-2 mb-1 text-center rounded-lg bg-primary">
                  Profile
                </div>
              </Link>
              <div
                className="px-12 py-2 text-center rounded-lg cursor-pointer bg-primary"
                onClick={handleLogoutClick}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
