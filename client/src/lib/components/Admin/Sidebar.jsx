"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { sidebarItems } from "../utils/data";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    // Update activeItem when pathname changes
    const active = sidebarItems.find((item) => item.path === pathname);
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

  return (
    <div className="flex flex-col mx-5 md:p-2 h-[75vh]">
      {sidebarItems?.map((item) => {
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
    </div>
  );
};

export default Sidebar;
