import React from "react";
import Image from "next/image";
import Link from "next/link";

const categoryItems = [
  {
    id: 1,
    title: "Main Dish",
    despriction: "(86 dishes)",
    image: "/images/home/category/img1.png",
  },
  {
    id: 2,
    title: "Break Fast",
    despriction: "(12 break fast)",
    image: "/images/home/category/img2.png",
  },
  {
    id: 3,
    title: "Dessert",
    despriction: "(48 dessert)",
    image: "/images/home/category/img3.png",
  },
  {
    id: 4,
    title: "Browse All",
    despriction: "(255 Items)",
    image: "/images/home/category/img4.png",
  },
];

const Categories = () => {
  return (
    <div className="container px-4 py-16 mx-auto max-w-screen-2xl xl:px-24">
      <div className="text-center">
        <p className="text-lg font-semibold tracking-wide uppercase text-primary">
          Customer Favorites
        </p>
        <h2 className="my-2 text-4xl font-bold md:text-5xl md:leading-snug dark:text-[#a6adbb] text-black">
          Popular Catagories
        </h2>
      </div>

      {/* category cards */}
      <div className="flex flex-col flex-wrap items-center justify-around gap-8 mt-12 sm:flex-row ">
        {categoryItems.map((item, i) => (
          <Link href="/menu">
            <div
              key={i}
              className="z-10 px-5 py-6 mx-auto text-center transition-all duration-300 bg-[#d7d7d7] dark:bg-[#1d232a] rounded-md shadow-lg cursor-pointer w-72 hover:-translate-y-4"
            >
              <div className="flex items-center justify-center w-full mx-auto">
                <Image
                  src={item.image}
                  width={300}
                  height={300}
                  alt="item"
                  className="bg-[#C1F1C6] p-5 rounded-full w-28 h-28"
                />
              </div>
              <div className="mt-5 space-y-1">
                <h5 className="dark:text-[#ffffff] text-[#1E1E1E] font-semibold">
                  {item.title}
                </h5>
                <p className="dark:text-[#ffffff]  text-sm text-[#1E1E1E]">
                  {item.despriction}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
