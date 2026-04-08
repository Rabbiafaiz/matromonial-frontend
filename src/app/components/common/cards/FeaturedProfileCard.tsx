"use client";
import React from "react";
import {
  BriefcaseIcon,
  LocationMarker,
  VerifiedIcon,
  ReqSendIcon,
  MessageIcon,
  ClockIcon,
  MalePlaceholder,
  FemalePlaceholder,
} from "../allImages/AllImages";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { StaticImageData } from "next/image";

type FeaturedProfileCardProps = {
  id: string;
  image?: StaticImageData | string;
  isNew: boolean;
  verified: boolean;
  name: string;
  age: string;
  height: string;
  occupation: string;
  sentInterests: string[];
  location?: string;
  gender?: string;
  handleInterestSend: (id: string) => void;
};

const FeaturedProfileCard: React.FC<FeaturedProfileCardProps> = ({
  id,
  image,
  isNew,
  verified,
  name,
  age,
  height,
  occupation,
  sentInterests,
  handleInterestSend,
  location,
  gender,
}) => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div
      className="relative rounded-2xl overflow-hidden w-full h-80"
      onClick={() => router.push(`/home/profile-details/${id}`)}
    >
      {/* Background Image */}
      <img
        src={
          image
            ? typeof image === "string"
              ? image // Use the string directly
              : image.src
            : gender === "male"
            ? MalePlaceholder.src
            : FemalePlaceholder.src
        }
        alt="Profile"
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80"></div>

      {/* New Badge */}
      {isNew && (
        <span
          className={`text-sm text-white px-3 py-1 bg-black bg-opacity-40 ${
            image ? "blur-bg" : "bg-gray"
          } rounded-full absolute top-4 left-4`}
        >
          New
        </span>
      )}

      {/* Verified Icon */}
      {verified && (
        <span
          className={`text-sm text-white p-2 ${
            image ? "blur-bg" : "bg-gray"
          } bg-opacity-70 rounded-full absolute top-4 right-4`}
        >
          <VerifiedIcon width={16} height={16} />
        </span>
      )}

      {/* User Information at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-sm">
              Age {age}, {height}
            </p>

            <div className="flex items-center gap-1 mt-1">
              <BriefcaseIcon />
              <span className="text-sm">{occupation}</span>
            </div>

            <div className="flex items-center gap-1 mt-1">
              <LocationMarker width="20px" />
              <span className="text-sm">{location}</span>
            </div>
          </div>

          {user?.isPaid && (
            <div className="flex space-x-2">
              {/* {sentInterests.includes(user?._id) ? (
              <span className="rounded-full bg-gray-100 bg-opacity-30 p-2.5 cursor-pointer">
                <ClockIcon width={18} height={18} />
              </span>
            ) : (
              <span
                className="rounded-full bg-white p-2.5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleInterestSend(id);
                }}
              >
                <ReqSendIcon />
              </span>
            )} */}
              <span
                className="rounded-full bg-white p-2.5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/home/messages?receiverId=${id}`);
                }}
              >
                <MessageIcon />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProfileCard;
