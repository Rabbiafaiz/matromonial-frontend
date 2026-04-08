"use client";
import Image from "next/image";
import { AboutImg1, AboutImg2 } from "../../common/allImages/AllImages";
import Button from "../../common/buttons/Button";
import React from "react";
import { useRouter } from "next/navigation";

const AboutSection: React.FC = () => {
  const router = useRouter();
  return (
    <section className="bg-gray-50 md:py-16 py-10 border-b border-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="md:grid grid-cols-2 gap-3 relative lg:min-h-large hidden">
            <Image
              src={AboutImg1}
              width={250}
              className="lg:absolute top-0 right-7"
              alt="Couple Image 1"
            />
            <Image
              src={AboutImg2}
              width={250}
              className="lg:absolute bottom-0 left-7"
              alt="Couple Image 2"
            />
          </div>
          <div className="text-left">
            <h2 className="text-base font-medium text-normal uppercase">
              About Us
            </h2>
            <h3 className="md:text-3xl text-xl font-bold text-gray-900 mt-2">
              Join today and start your journey towards love
            </h3>
            <p className="mt-4 text-darkGray">
              At Vaishakhi Matrimony, we connect hearts and minds through
              certified profiles and smart matching. Join us to start your
              journey toward true love.
            </p>
            <div className="mt-6">
              <Button
                label="Get started"
                onClick={() => router.push("/auth/signup")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
