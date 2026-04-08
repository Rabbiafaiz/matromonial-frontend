"use client";
import { useEffect, useState } from "react";
import { TabGroup, TabPanels } from "@headlessui/react";
import { ArrowLeft, RightArrow } from "@/app/components/common/allImages/AllImages";
import Link from "next/link";
import MainTabs from "./components/MainTabs";
import type { FormData } from "@/types/formTypes";
import PreferencesTab from "./components/tabs/PreferencesTab";
import BasicInfoTab from "./components/tabs/BasicInfoTab";
import MyAccountTab from "./components/tabs/MyAccountTab";
import { mainTabs } from "@/constants/formConstants";
import {
  getAllDropdownsData,
  getUserProfile,
  updateUserProfile,
  uploadFile,
} from "@/app/lib/api/profileRoutes";
import { showToast } from "@/app/components/ui/CustomToast";
import { useAuth } from "@/context/AuthContext";

// Main Profile Module Component
const ProfilePage = () => {
  const { updateUser } = useAuth();
  const [selectedMainTab, setSelectedMainTab] = useState<number | undefined>(0);
  const [selectedSubTab, setSelectedSubTab] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({});
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [images, setImages] = useState<File | null>(null);
  const [dropdowns, setDropdowns] = useState({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageUpload = async (files: FileList | null) => {
    if (!files) return;

    let fileUrl :string;
    const file = files[0]; // Take the first file only
    const imageUrl = URL.createObjectURL(file);
    const form = new FormData();
    form.append("file", file);
    const { data, status } = await uploadFile(form);
    if (status === 200 && data?.fileUrl) fileUrl = data?.fileUrl;

    setUploadedImages(prevImgs => ([
      ...prevImgs,
      fileUrl
    ]));
    setFormData(prevData => ({
      ...prevData,
      userImages: [...prevData?.userImages, fileUrl]
    }))
    setImages(file);
    // setUploadedImages((prevImages) => [...prevImages, ...newImages]);
    // handleImagesChange([...uploadedImages, ...newImages]);
    // setImages(Array.from(files));
  };

  const handleDeleteImage = (img: string) => {
    setUploadedImages(prevImg => prevImg.filter(image => image !== img));
  };

  const handleSubmit = async (formData: any) => {
    const updatedFormData = {
      ...formData,
      ...(uploadedImages && {userImages: uploadedImages})
    }
    try {
      const { data, status } = await updateUserProfile(updatedFormData);
      if (status === 200) {
        showToast(data?.message, "success");
        getUsersProfile();
      } else {
        showToast(data?.message, "error");
      }
    } catch (error) {}
  };

  const getUsersProfile = async () => {
    try {
      const response = await getUserProfile();
      if (response?.data?.user) {
        const { horoscopeDetails, FamilyDetails, Education, ...restUser } =
          response?.data?.user || {};

        setFormData({
          ...horoscopeDetails,
          ...FamilyDetails,
          ...Education,
          ...restUser,
        });
        if (restUser?.userImages) {
          setImages(restUser?.userImages[0]);
          setUploadedImages(restUser?.userImages);
        }
        updateUser(response?.data?.user);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUsersProfile();
  }, []);
  const getAllDropdowns = async () => {
      try {
        const response = await getAllDropdownsData();
        if (response.status === 200 && response?.data) {
          let updatedData: any = {};
          for (const key in response?.data) {
            console.log(key);
            updatedData[key] = response?.data[key].map((item: any) => ({
              ...item,
              label: item.value,
            }));
          }
          console.log(updatedData);
          
          setDropdowns(updatedData);
        }
      } catch (error) {}
    };
    useEffect(() => {
      getAllDropdowns();
    }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <ul className="hidden sm:flex items-center gap-2 text-sm my-8">
        <li>
          <Link href="/home" className="hover:text-primary">
            Home
          </Link>
        </li>
        <li className="text-gray-400">
          <span>›</span>
        </li>
        <li>
          <span className="text-primary">Profile</span>
        </li>
      </ul>
      {selectedMainTab === undefined ? (
        <div className="flex flex-col gap-4">
          {mainTabs.map((tab, index) => (
            <div
              className={`flex items-center justify-between gap-3 p-3 hover:bg-gray-50 cursor-pointer border border-gray rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02]`}
              onClick={() => setSelectedMainTab(index)}
            >
              {/* <span className="text-gray-600">{item.icon}</span> */}
              <span className="text-sm text-gray-700">{tab}</span>
              <RightArrow className="w-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="md:border border-gray rounded-3xl">
          {/* Mobile Header */}
          <div
            className="md:hidden flex items-center space-x-2 mb-4"
            onClick={() => setSelectedMainTab(undefined)}
          >
            <ArrowLeft />
            <h2 className="text-lg font-semibold">
              {selectedMainTab !== undefined && mainTabs[selectedMainTab]}
            </h2>
          </div>
          <TabGroup
            selectedIndex={selectedMainTab}
            onChange={(tab) => {
              setSelectedMainTab(tab);
              setSelectedSubTab(0);
            }}
          >
            <div className="flex md:p-6">
              <MainTabs />
              <TabPanels className="md:px-5 py-0 w-full md:w-4/5">
                {selectedMainTab === 0 && (
                  <MyAccountTab
                    formData={formData}
                    images={uploadedImages}
                    // handleChange={handleChange}
                    handleDeleteImage={handleDeleteImage}
                    handleImageUpload={handleImageUpload}
                    handleFormSubmit={handleSubmit}
                    options={dropdowns}
                  />
                )}
                {selectedMainTab === 1 && (
                  <BasicInfoTab
                    selectedSubTab={selectedSubTab}
                    setSelectedSubTab={setSelectedSubTab}
                    formData={formData}
                    handleChange={handleChange}
                    handleFormSubmit={handleSubmit}
                    options={dropdowns}
                  />
                )}
                {selectedMainTab === 2 && (
                  <PreferencesTab
                    selectedSubTab={selectedSubTab}
                    setSelectedSubTab={setSelectedSubTab}
                    formData={formData}
                    handleChange={handleChange}
                    handleFormSubmit={handleSubmit}
                    options={dropdowns}
                  />
                )}
              </TabPanels>
            </div>
          </TabGroup>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
