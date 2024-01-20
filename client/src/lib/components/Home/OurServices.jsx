import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const serviceLists = [
  {
    id: 1,
    title: "Catering",
    des: "Delight your guests with our flavors and  presentation",
    img: "/images/home/services/icon1.png",
  },
  {
    id: 2,
    title: "Fast delivery",
    des: "We deliver your order promptly to your door",
    img: "/images/home/services/icon2.png",
  },
  {
    id: 3,
    title: "Online Ordering",
    des: "Explore menu & order with ease using our Online Ordering n",
    img: "/images/home/services/icon3.png",
  },
  {
    id: 4,
    title: "Gift Cards",
    des: "Give the gift of exceptional dining with Foodi Gift Cards",
    img: "/images/home/services/icon4.png",
  },
];

const OurServices = () => {
  return (
    <div className="container my-16">
      <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="text-lg font-semibold tracking-wide uppercase text-primary">
              Our Story & Services
            </p>
            <h2 className="my-2 text-4xl font-bold md:text-5xl md:leading-snug dark:text-[#a6adbb] text-black">
              Our Culinary Journey And Services
            </h2>
            <p className="my-5 dark:text-[#797979] leading-[30px]">
              Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services, blending culinary artistry with warm
              hospitality.
            </p>

            <div className="flex flex-col mx-auto mb-12 gap-y-3 md:flex-row gap-x-3 xl:mx-0">
              <Link href="/menu">
                <Button className="gap-x-2">Explore</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="grid items-center grid-cols-1 gap-8 sm:grid-cols-2">
            {serviceLists.map((service) => (
              <div
                key={service.id}
                className="px-4 dark:bg-[#1d232a] py-5 space-y-2 text-center transition-all duration-200 rounded-sm shadow-md cursor-pointer text-green hover:border hover:border-indigo-600"
              >
                <Image
                  src={service.img}
                  alt="service"
                  className="mx-auto "
                  width={60}
                  height={60}
                />
                <h5 className="pt-3 font-semibold"> {service.title}</h5>
                <p className="text-[#90BD95]">{service.des}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
