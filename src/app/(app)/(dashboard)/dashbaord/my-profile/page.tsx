"use client";
import { useEffect, useRef, useState } from "react";
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
  const [pendingImages, setPendingImages] = useState<
    { file: File; previewUrl: string }[]
  >([]);
  const pendingImagesRef = useRef<{ file: File; previewUrl: string }[]>([]);
  const [dropdowns, setDropdowns] = useState({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const file = files[0];
    if (!file) return;

    setPendingImages((prev) => {
      prev.forEach((image) => URL.revokeObjectURL(image.previewUrl));
      return [
        {
          file,
          previewUrl: URL.createObjectURL(file),
        },
      ];
    });
  };

  const handleDeleteImage = (img: string) => {
    if (img.startsWith("blob:")) {
      setPendingImages((prev) => {
        const toRemove = prev.find((image) => image.previewUrl === img);
        if (toRemove) URL.revokeObjectURL(toRemove.previewUrl);
        return prev.filter((image) => image.previewUrl !== img);
      });
      return;
    }

    setUploadedImages([]);
  };

  const handleSubmit = async (formData: any) => {
    try {
      let avatarUrl = uploadedImages[0] || "";

      if (pendingImages.length > 0) {
        const form = new FormData();
        form.append("file", pendingImages[0].file);
        const { data, status } = await uploadFile(form);
        if (status !== 200 || !data?.fileUrl) {
          throw new Error("Image upload failed");
        }
        avatarUrl = data.fileUrl as string;
      }

      const updatedFormData = {
        ...formData,
        userImages: avatarUrl ? [avatarUrl] : [],
      };

      const { data, status } = await updateUserProfile(updatedFormData);
      if (status === 200) {
        showToast(data?.message, "success");
        pendingImages.forEach((image) => URL.revokeObjectURL(image.previewUrl));
        setPendingImages([]);
        getUsersProfile();
      } else {
        showToast(data?.message, "error");
      }
    } catch (error) {
      showToast("Failed to save changes. Please try again.", "error");
    }
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
          setUploadedImages(restUser?.userImages[0] ? [restUser?.userImages[0]] : []);
        } else {
          setUploadedImages([]);
        }
        updateUser(response?.data?.user);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUsersProfile();
  }, []);
  useEffect(() => {
    pendingImagesRef.current = pendingImages;
  }, [pendingImages]);
  useEffect(() => {
    return () => {
      pendingImagesRef.current.forEach((image) =>
        URL.revokeObjectURL(image.previewUrl)
      );
    };
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
          <Link href="/dashbaord" className="hover:text-primary">
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
                    images={
                      pendingImages[0]?.previewUrl
                        ? [pendingImages[0].previewUrl]
                        : uploadedImages
                    }
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
