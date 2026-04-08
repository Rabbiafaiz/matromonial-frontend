import React from "react";
import { BannerBg, BannerImg } from "../../common/allImages/AllImages";
import Image from "next/image";
import Button from "../../common/buttons/Button";

const Banner: React.FC = () => {
  return (
    <section className="relative px-6 mx-auto bg-lightgray py-20 max-w-7xl">
      <div className="absolute inset-0">
        <Image
          src={BannerBg}
          alt="Background Pattern"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="flex flex-wrap items-center">
        {/* Text Section */}
        <div className="w-full lg:w-2/3 mb-8 lg:pe-36 lg:mb-0 text-left flex flex-col md:gap-5 gap-3">
          <p className="text-sm text-gray-500 font-light uppercase mb-2">Over 20K Users</p>
          <h1 className="md:text-5xl text-xl font-bold text-darkblue md:mb-4">
            Find Your Perfect Match Today!
          </h1>
          <p className="md:text-lg text-base text-gray-700 mb-6">
            Discover your ideal partner with our advanced matchmaking
            algorithms. Join now and start your journey to love!
          </p>
          <div className="flex justify-center lg:justify-start space-x-4">
            <Button label="Get Started" />
            <Button label="See Pricing" variant="secondary" />
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/3 hidden md:flex justify-center lg:justify-end">
          <Image src={BannerImg} alt="Perfect Match" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
