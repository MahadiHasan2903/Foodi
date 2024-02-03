import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";

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
        <Link href="/profile">
          <div style={{ position: "relative" }}>
            <Image
              src={avatar}
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full cursor-pointer"
            />
          </div>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
