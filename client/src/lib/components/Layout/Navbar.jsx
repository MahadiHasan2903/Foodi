import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = ({ containerStyles, linkStyles, underlineStyles }) => {
  const path = usePathname();
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const avatar = session?.avatar.url;
  console.log("Token:", accessToken);
  const links = [
    { path: "/", name: "Home" },
    { path: "/menu", name: "Menu" },
    { path: "/contact", name: "Contact" },
    {
      path: accessToken ? "/profile" : "/login",
      name: accessToken ? "Avatar" : "Login",
    },
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

          {link.name === "Avatar" && accessToken ? (
            <Image
              src={avatar}
              alt="Avatar"
              width={40}
              height={40}
              className="overflow-hidden rounded-full"
            />
          ) : (
            link.name
          )}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
