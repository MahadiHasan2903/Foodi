import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

const Navbar = ({ containerStyles, linkStyles, underlineStyles }) => {
  // const { data: session } = useSession();
  // const userRole = session?.user?.role;

  const path = usePathname();

  const links = [
    { path: "/", name: "Home" },
    { path: "/menu", name: "Menu" },
    { path: "/contact", name: "Contact" },
    { path: "/login", name: "Login" },
    // userRole === "admin"
    //   ? { path: "/dashboard", name: "dashboard" }
    //   : { path: "/login", name: "login" },
  ];

  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => (
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
    </nav>
  );
};

export default Navbar;
