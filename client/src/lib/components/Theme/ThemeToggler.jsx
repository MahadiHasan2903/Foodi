"use client";
import { useTheme } from "next-themes";
import { IoSunnySharp } from "react-icons/io5";
import { Button } from "../ui/button";
import { BsFillMoonStarsFill } from "react-icons/bs";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <IoSunnySharp className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <BsFillMoonStarsFill className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-1000 transition-all dark:rotate-90 dark:scale-0" />
      </Button>
    </div>
  );
};

export default ThemeToggler;
