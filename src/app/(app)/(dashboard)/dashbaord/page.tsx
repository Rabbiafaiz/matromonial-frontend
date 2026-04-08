'use client';
import React, { useState } from "react";
import { TabsList } from "@/app/components/common/tabsList/TabsList";
import { homeTabs } from "@/constants/utilConstants";
import SuccessStories from "@/app/components/landingPageSections/successStories/SuccessStories";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState(homeTabs[0])
  
  const handleTabChange = (index: number) => {
    setActiveTab(homeTabs[index])
  }
  return (
    <div className="bg-gray-100 px-5">
      <TabsList tabs={homeTabs} activeTab={activeTab} handleTabChange={handleTabChange} />

      <activeTab.component/>

      <SuccessStories />
    </div>
  );
};

export default HomePage;
