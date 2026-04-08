"use client";
import Image from "next/image";
import React from "react";
import {
  FounderImg,
  ReviewIcon,
} from "@/app/components/common/allImages/AllImages";

const FounderSection = () => {
  return (
    <section className="py-16 border-b border-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <h2 className="text-sm font-medium text-normal uppercase">Founder</h2>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">
            Meet Our Founder
          </h3>
        </div>
        <div className="mt-10">
          <div className="flex justify-center w-full">
            <div className="bg-primary custom-rounded text-left flex justify-between">
              <Image
                src={FounderImg}
                alt="Founder Image"
                className="md:block hidden w-full h-full"
                objectFit="cover"
              />
              <div className="lg:py-20 py-8 px-4 lg:px-12 relative">
                <div>
                  <ReviewIcon
                    className="absolute top-14 right-20 opacity-35"
                  />
                </div>
                <h4 className="text-3xl text-white font-semibold text-gray-900 mt-7">
                  Anthony Bahringer
                </h4>
                <p className="text-white font-light text-sm mt-1">
                  Founder af Vaishkahi Matrimony
                </p>
                <p className="text-white text-xl mt-9">
                  Lorem ipsum dolor sit amet consectetur. Consequat auctor
                  consectetur nunc vitae dolor blandit. Elit enim massa etiam.
                  Lorem ipsum dolor sit amet consectetur. Consequat auctor
                  consectetur nunc vitae dolor blandit. Elit enim massa etiam.
                  Elit enim massa etiam. Lorem ipsum dolor sit amet consectetur.
                  Consequat auctor consectetur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
