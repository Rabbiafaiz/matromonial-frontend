import React from "react";
import Image from "next/image";
import { MissionVisionImg } from "@/app/components/common/allImages/AllImages";

const MissionVision: React.FC = () => {
  return (
    <section className="relative px-6 bg-lightgray py-20 mx-auto max-w-7xl">
      <div className="flex flex-col items-center text-center">
        <Image src={MissionVisionImg} alt="Mission & Vision" />
        <p className="text-sm text-normal font-normal uppercase mt-6 mb-4">
          Mission & Vision
        </p>
        <h1 className="text-2xl md:text-5xl font-bold text-darkblue mb-4">
          To create a world where meaningful relationships thrive by aligning
          individuals with shared values, interests, and life goals.
        </h1>
        <p className="text-lg text-gray-700 mb-6 md:max-w-screen-md max-w-full">
          We strive to make love more accessible through innovative matchmaking
          technology and a personalized approach, ensuring every user feels
          valued and connected.
        </p>
      </div>
    </section>
  );
};

export default MissionVision;
