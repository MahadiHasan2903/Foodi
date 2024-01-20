"use client";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
} from "../../components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Star } from "lucide-react";
import { reviewsData } from "../utils/data";

const Reviews = () => {
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating - filledStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - filledStars - halfStar;

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<Star key={i} className="text-primary" />);
    }
    if (halfStar === 1) {
      stars.push(<Star key={filledStars} className="text-primary" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={filledStars + i + 1} />);
    }

    return stars;
  };

  return (
    <section className="mt-[100px] mb-12 xl:mb-32">
      <div className="container mx-auto">
        <div className="text-left">
          <p className="text-lg font-semibold tracking-wide uppercase text-primary">
            what our customer says
          </p>
          <h2
            className="mx-auto mb-12  section-title
        my-2 text-4xl font-bold md:text-5xl md:leading-snug dark:text-[#a6adbb] text-black"
          >
            Reviews
          </h2>
        </div>
        <Swiper
          className="h-[350px]"
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1400: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={30}
          modules={[Pagination]}
          pagination={{ clickable: true }}
        >
          {reviewsData?.map((person, index) => {
            return (
              <SwiperSlide key={index}>
                <Card className=" dark:bg-[#1d232a] shadow-md p-8 min-h-[300px]">
                  <CardHeader className="p-0 mb-10">
                    <div className="flex items-center gap-x-4">
                      <Image
                        src={person.avatar}
                        alt={person.name}
                        width={70}
                        height={70}
                        priority="true"
                      />
                      <div className="flex flex-col">
                        <CardTitle>{person.name}</CardTitle>
                        <p>Customer</p>
                      </div>
                    </div>
                    <div className="flex items-center ">
                      {renderStars(person.rating)}
                    </div>
                  </CardHeader>
                  <CardDescription className="text-lg text-muted-foreground">
                    {person.review}
                  </CardDescription>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
