/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FaStar } from "react-icons/fa";
import client1 from "../../../../public/images/home/testimonials/testimonial1.png";
import client2 from "../../../../public/images/home/testimonials/testimonial2.png";
import client3 from "../../../../public/images/home/testimonials/testimonial3.png";
import Image from "next/image";
import Link from "next/link";

const Testimonials = () => {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
        <div className="md:w-1/2">
          <img src="/images/home/testimonials/testimonials.png" alt="" />
        </div>
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="text-lg font-semibold tracking-wide uppercase text-primary">
              Testimonials
            </p>
            <h2 className="my-2 text-4xl font-bold md:text-5xl md:leading-snug dark:text-[#a6adbb] text-black">
              What Our Customers Say About Us
            </h2>
            <blockquote className="my-5 dark:text-[#797979] leading-[30px]">
              “I had the pleasure of dining at Foodi last night, and I'm still
              raving about the experience! The attention to detail in
              presentation and service was impeccable”
            </blockquote>

            <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
              <Image
                src={client1}
                alt="client1"
                width={50}
                height={50}
                className="rounded-full"
              />
              <Image
                src={client2}
                alt="client"
                width={50}
                height={50}
                className="rounded-full ml-[-20px]"
              />
              <Image
                src={client3}
                alt="client"
                width={50}
                height={50}
                className="rounded-full ml-[-20px]"
              />
              <div className="ml-4 space-y-1">
                <h5 className="text-lg font-semibold">Customer Feedback</h5>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />{" "}
                  <span className="font-medium">4.9</span>{" "}
                  <span className="text-[#807E7E]">(18.6k Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
