import React from "react";
import Image from "next/image";
import {
  AboutBannerImg,
  BannerBg,
} from "@/app/components/common/allImages/AllImages";

const AboutBanner: React.FC = () => {
  return (
    <section className="relative px-6 bg-lightgray py-20">
      <div className="absolute inset-0">
        <Image
          src={BannerBg}
          alt="Background Pattern"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="flex flex-wrap items-center mx-auto max-w-7xl">
        {/* Text Section */}
        <div className="w-full lg:w-2/3 mb-8 lg:pe-36 lg:mb-0 text-left flex flex-col gap-5">
          <p className="text-sm text-gray-500 font-light uppercase mb-2">
            About Us
          </p>
          <h1 className="text-2xl md:text-5xl font-bold text-darkblue mb-4">
            Our Journey Towards Creating Lasting Connections
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            At Vaishakhi Matromony, we understand that every love story is
            unique. That's why we focus on creating a supportive and inclusive
            community where everyone can find their special someone.
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/3 hidden md:flex justify-center lg:justify-end">
          <Image src={AboutBannerImg} alt="Perfect Match" />
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;
