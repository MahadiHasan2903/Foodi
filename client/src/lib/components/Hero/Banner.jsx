import React from "react";
import bannerImg from "../../../../public/banner.png";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Socials from "./Socials";
import Badge from "./Badge";
import food1 from "../../../../public/food1.png";

const Banner = () => {
  return (
    <div className="container mx-auto max-w-screen-2xl xl:px-24 ">
      <div className="flex flex-col items-center justify-between gap-8 py-24 md:flex-row-reverse dark:text-white ">
        {/* img */}
        <div className="relative md:w-1/2">
          <Image src={bannerImg} alt="banner" />
          {/* <div className="absolute xl:flex xl:ml-0">
            <Badge
              containerStyles={
                "absolute xl:top-[24%] top-[20%] t -left-[1.2rem]  xl:-left-[7rem] "
              }
              item={food1}
              badgeText="Spicy Noodles"
            />
            <Badge
              containerStyles={
                "absolute xl:top-[24%] top-[20%] t -left-[1.2rem]  xl:-left-[7rem] "
              }
              item={food1}
              badgeText="Spicy Noodles"
            />
          </div> */}
        </div>

        {/* texts */}
        <div className="px-4 md:w-1/2 space-y-7">
          <h2 className="text-4xl font-bold leading-snug md:text-5xl md:leading-snug">
            Dive into Delights Of Delectable{" "}
            <span className="text-primary">Food</span>
          </h2>
          <p className="text-[#4A4A4A] text-xl">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship
          </p>
          <div className="flex flex-col mx-auto mb-12 gap-y-3 md:flex-row gap-x-3 xl:mx-0">
            <Link href="/menu">
              <Button className="gap-x-2">
                Order Now <ShoppingCart size={22} />
              </Button>
            </Link>
          </div>
          <Socials
            containerStyles="flex gap-x-6 mx-auto xl:mx-0 mb-5 xl:mb-0"
            iconStyles="text-foreground text-[22px] hover:text-primary transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
