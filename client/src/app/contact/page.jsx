import React from "react";
import { HomeIcon, MailIcon, PhoneCall } from "lucide-react";
import Image from "next/image";
import contact from "../../../public/contact.svg";
import ContactForm from "@/lib/components/utils/ContactForm";

const ContactPage = () => {
  return (
    <section>
      <div className="container mx-auto">
        <div className="grid xl:grid-cols-2 pt-12 xl:h-[480px] mb-6 xl:mb-24">
          <div className="flex flex-col justify-center">
            <div className="flex items-center mb-4 text-lg gap-x-4 text-primary">
              <span className="w-[30px] h-[2px] bg-primary"></span>
              <p className="text-lg font-semibold tracking-wide text-primary">
                Say Hello
              </p>
            </div>
            <h1 className="my-2 text-4xl font-bold md:text-5xl md:leading-snug dark:text-[#a6adbb] text-black">
              Let's Work Together.
            </h1>
            <p className="subtitle max-w-[400px]">
              Welcome to 𝓕𝓸𝓸𝓭𝓲! Your feedback matters to us. For inquiries,
              reservations, or to share your dining experience, contact us via
              the form, phone, or email. Your satisfaction is our priority.
              Thank you for choosing 𝓕𝓸𝓸𝓭𝓲 – where every bite is an experience!
            </p>
          </div>

          <div className="hidden w-full bg-top bg-no-repeat bg-contain lg:flex ">
            <Image src={contact} width={500} height={500} alt="contact" />
          </div>
        </div>
        <div className="grid mb-24 xl:grid-cols-2 xl:mb-32">
          <div className="flex flex-col mb-12 text-base gap-y-4 xl:gap-y-14 xl:mb-24 xl:text-lg">
            <div className="flex items-center gap-x-8">
              <MailIcon size={25} className="text-primary" />
              <div>support@foodi.com</div>
            </div>

            <div className="flex items-center gap-x-8">
              <PhoneCall size={25} className="text-primary" />
              <div>+880 1677 151195</div>
            </div>

            <div className="flex items-center gap-x-8">
              <HomeIcon size={25} className="text-primary" />
              <div>Dhaka, Bangladesh</div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
