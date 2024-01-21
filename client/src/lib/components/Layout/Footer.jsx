import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Socials from "../Hero/Socials";
import { Phone } from "lucide-react";

const Footer = () => {
  return (
    <>
      {/* <section className="py-24 dark:bg-[#1d232a]">
        <div className="container mx-auto">
          <div className="flex flex-col items-center ">
            <h2 className="flex items-center max-w-xl mb-8 text-center h2">
              <p className="text-primary text-[20px] flex items-center mr-2">
                𝓕𝓸𝓸𝓭𝓲,
              </p>
              Exquisite flavors, exceptional hospitality.
            </h2>
            <Link href="/contact">
              <Button>
                <Phone size={20} className="mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section> */}
      <footer className="py-12 bg-[#2a3036] ">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-between">
            <Socials
              containerStyles="flex gap-x-6 mx-auto xl:mx-0 mb-4"
              iconStyles="text-primary dark:text-white/70 hover:text-white dark:hover:text-primary transition-all text-[20px]"
            />
            <div className="text-muted-foreground">
              Copyright &copy; 𝓕𝓸𝓸𝓭𝓲. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
