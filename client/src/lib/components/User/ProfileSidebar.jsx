"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profileSidebarItems } from "../utils/data";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const ProfileSidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const active = profileSidebarItems.find((item) => item.path === pathname);
    if (active) {
      setActiveItem(active.id);
      setSelectedItem(active.id);
    }
  }, [pathname]);

  const handleItemHover = (itemId) => setSelectedItem(itemId);

  const handleItemActivation = (itemId) => {
    setActiveItem(itemId);
    handleItemHover(itemId);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="flex flex-col mx-5 md:p-2 h-[75vh]">
      {profileSidebarItems?.map((item) => {
        const isSelected = selectedItem === item.id;
        const isActive = activeItem === item.id;

        return (
          <Link
            key={item.id}
            href={item.path}
            className={`flex items-center my-4 text-[20px] px-2 py-1 rounded-lg border-b ${
              isActive
                ? "bg-primary text-white"
                : isSelected
                ? "bg-primary text-white"
                : "text-black dark:text-white"
            }`}
            onMouseEnter={() => handleItemHover(item.id)}
            onMouseLeave={() => handleItemHover(null)}
            onClick={() => handleItemActivation(item.id)}
          >
            <span>{item.icon}</span>
            <span className="hidden ml-2 md:block">{item.title}</span>
          </Link>
        );
      })}
      <p
        className="flex items-center my-4 text-[20px] px-2 py-1 rounded-lg border-none md:border-b hover:bg-primary hover:text-white cursor-pointer"
        onClick={handleLogoutClick}
      >
        <span>
          <LogOut />
        </span>
        <span className="hidden ml-2 md:block">Logout</span>
      </p>
    </div>
  );
};

export default ProfileSidebar;
