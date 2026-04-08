'use client'
import {
  AboutImg1,
  AboutImg2,
  AppLogo,
  ArrowLeft,
  CheckCircle,
  PricingBg,
} from "@/app/components/common/allImages/AllImages";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  return (
    <div className="flex min-h-screen mx-auto max-w-7xl">
      {/* Left Side */}
      <div className="w-1/2 m-6 py-14 md:flex hidden flex-col relative bg-orange-50 border border-stone-200 rounded-2xl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={PricingBg}
            alt="Background Pattern"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="mx-3 lg:mx-10 md:mx-6 relative z-10">
          <div className="mb-4">
            <Image src={AppLogo} alt="Logo" width={48} height={48} />
          </div>
          <h1 className="text-3xl font-bold mb-4">
            Discover Love Effortlessly
          </h1>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle /> All profiles are verified.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle /> Perfect Matching.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle /> Use our mobile app.
            </li>
          </ul>

          <div className="md:grid grid-cols-2 gap-3 mt-4 relative lg:min-h-large hidden w-full">
            <Image
              src={AboutImg2}
              width={250}
              className="lg:absolute top-0 right-3"
              alt="Couple Image 1"
            />
            <Image
              src={AboutImg1}
              width={250}
              className="lg:absolute bottom-0 left-3"
              alt="Couple Image 2"
            />
          </div>
          {/* <div className="mt-8 flex space-x-4">
            <Image src={AboutImg1} alt="Couple 1" width={160} height={240} className="rounded-lg" />
            <Image src={AboutImg2} alt="Couple 2" width={160} height={240} className="rounded-lg" />
          </div> */}
        </div>
      </div>

      {/* Right Side (Content Area) */}
      <div className="md:w-1/2 w-full sm:p-8 p-5">
        <div className="flex gap-1 items-center cursor-pointer" onClick={() => router.push('/')}>
          <ArrowLeft />
          <span>Back</span>
        </div>
        <div className="h-full flex flex-col mt-20 md:mt-32">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
