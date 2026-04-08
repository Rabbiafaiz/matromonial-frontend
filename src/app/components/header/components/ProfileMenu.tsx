"use Client";
import { StaticImageData } from "next/image";
import React from "react";
import {
  ClipboardIcon,
  LogoutIcon,
  RocketIcon,
} from "../../common/allImages/AllImages";
import ProfileImage from "../../common/profileImage/ProfileImage";
import Link from "next/link";
import Button from "../../common/buttons/Button";
import { usePathname, useRouter } from "next/navigation";
import { menuItems } from "@/constants/utilConstants";
import { logout } from "@/app/lib/api/authRoutes";
import { useAuth } from "@/context/AuthContext";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { logoutInternal, user } = useAuth();
  const currentPlanJson = localStorage.getItem("currentPlan");
  const currentPlan = currentPlanJson ? JSON.parse(currentPlanJson) : {};

  const handleLogout = async () => {
    try {
      const response = await logout(user);
      if (response?.status === 200) {
        logoutInternal();
        router.push("/auth/login");
      }
    } catch (error) {}
  };

  return (
    <div
      className={`sm:absolute overflow-y-auto fixed top-0 left-0 sm:left-auto sm:top-auto sm:right-0 sm:mt-2 sm:h-auto h-screen w-72 sm:w-80 bg-white sm:rounded-2xl shadow-lg border border-gray z-50 transform transition-all duration-300 ease-in-out ${
        isOpen
          ? "translate-y-0 opacity-100 scale-100"
          : "-translate-y-4 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="flex flex-col justify-between">
        <div>
          <div className="p-4 flex justify-between flex-col items-start gap-3 mb-2 border-b border-gray mt-3">
            <div className="flex items-center md:gap-3 gap-1">
              <ProfileImage
                src={
                  Array.isArray(user?.userImages) &&
                  user?.userImages.length > 0 &&
                  user?.userImages[0]
                }
                alt="Profile"
                size="lg"
              />
              <div>
                <h3 className="font-medium text-sm md:text-base">
                  {user?.name}
                </h3>
                <div className="flex items-center gap-1 bg-gray50 rounded-2xl my-1 px-2 max-w-[60%]">
                  <p className="text-sm text-darkGray truncate w-full">
                    {user?._id}
                  </p>
                  <ClipboardIcon
                    width={14}
                    height={14}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
            {!user?.isPaid ? (
              <Button
                label="Upgrade Now"
                variant="secondary"
                className="md:w-full md:mt-3 px-2 py-2 md:px-5 md:py-3 text-xs"
                size="sm"
                onClick={() => router.push("/membership-plans")}
              />
            ) : currentPlan && (
              <div className="w-full flex justify-between items-center border border-primary rounded-full lg:rounded-xl py-3 px-4 bg-orange-50">
                <span className="font-semibold">{currentPlan?.title}</span>
                <Button label="In use" size="sm" />
              </div>
            )}
          </div>

          <div className="px-4 pb-3">
            {menuItems.map((item, index) => (
              <Link
                href={item.path}
                key={item.label}
                onClick={onClose}
                className={`flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] ${
                  pathname === item.path
                    ? "text-darkBlue bg-orange-100" // Active style
                    : "text-gray-600 hover:text-gray-800"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <span className="text-gray-600">{item.icon}</span>
                <span className="text-sm text-gray-700">{item.label}</span>
              </Link>
            ))}
            <div
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] text-red-600"
            >
              <LogoutIcon />
              <span className="text-sm">Log out</span>
            </div>
          </div>
        </div>

        {!user?.isPaid && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray mx-3 mb-3 sm:hidden">
            <h4 className="font-regular">Upgrade To Pro</h4>
            <p className="text-sm text-normal mb-3">
              More Features, more visibility
            </p>
            <Button label="Upgrade Now" icon={RocketIcon} size="sm" />
            {/* <Button label="Upgrade Now" icon={RocketImg} size="sm" /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
