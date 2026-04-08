import { FormData } from "@/types/formTypes";
import { TabGroup, TabPanels } from "@headlessui/react";
import React from "react";
import SubTabs from "../SubTabs";
import BasicInfoPanel from "../panels/BasicInfoPanel";
import { basicInfoTabs } from "@/constants/formConstants";
import PersonalPanel from "../panels/PersonalPanel";
import { ArrowLeft } from "@/app/components/common/allImages/AllImages";

interface ProfileFormData {
  [key: string]: any;
}
interface PreferencesTabProps {
  selectedSubTab: number;
  setSelectedSubTab: (index: number) => void;
  formData: FormData;
  handleChange: (name: string, value: string) => void;
  handleFormSubmit: (values: ProfileFormData) => void;
  options: any;
}

const BasicInfoTab = ({
  selectedSubTab,
  setSelectedSubTab,
  formData,
  handleChange,
  handleFormSubmit,
  options
}: PreferencesTabProps) => {
  return (
    <TabGroup selectedIndex={selectedSubTab} onChange={setSelectedSubTab}>
      {/* <div className="md:hidden flex items-center space-x-2 p-4 border-b">
        <ArrowLeft onClick={() => setSelectedSubTab(0)} />
        <h2 className="text-lg font-semibold">Basic Info</h2>
      </div> */}
      <SubTabs tabsList={basicInfoTabs} />
      <TabPanels className="mt-4">
        {selectedSubTab === 0 && (
          <BasicInfoPanel formData={formData} handleFormSubmit={handleFormSubmit} options={options} />
        )}
        {selectedSubTab === 1 && (
          <PersonalPanel formData={formData} handleFormSubmit={handleFormSubmit} options={options} />
        )}
      </TabPanels>
    </TabGroup>
  );
};

export default BasicInfoTab;
