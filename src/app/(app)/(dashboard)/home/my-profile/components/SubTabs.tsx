import { Tab, TabList } from "@headlessui/react";

interface SubTabsProps {
  tabsList: string[];
}

// Sub Tabs Component
const SubTabs = ({ tabsList }: SubTabsProps) => (
  <TabList className="flex space-x-4 border-b border-gray overflow-x-auto w-full">
    {tabsList.map((tab, index) => (
      <Tab
        key={index}
        className={({ selected }: { selected: boolean }) =>
          `px-4 py-2 text-sm font-medium text-normal border-b-2 transition-all outline-none ${
            selected
              ? "border-orange-500 text-orange-500"
              : "border-transparent text-gray-500"
          }`
        }
      >
        {tab}
      </Tab>
    ))}
  </TabList>
);

export default SubTabs;
