"use client";
import Cookies from "js-cookie";
import FAQSection from "@/app/components/landingPageSections/faq/FAQ";
import StartNow from "@/app/components/landingPageSections/startNow/StartNow";
import React from "react";
import AboutBanner from "./components/AboutBanner";
import MissionVision from "./components/MissionVision";
import CoreValues from "./components/CoreValues";
import FounderSection from "./components/FounderSection";

const page = () => {
  const token = Cookies.get("token");
  return (
    <>
      <AboutBanner />
      <MissionVision />
      <CoreValues />
      <FounderSection />
      <FAQSection />
      {!token && <StartNow />}
    </>
  );
};

export default page;
