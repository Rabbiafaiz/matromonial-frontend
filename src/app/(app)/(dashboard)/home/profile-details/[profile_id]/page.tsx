"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  BriefcaseIcon,
  DummyProfile,
  FemalePlaceholder,
  LocationMarker,
  MalePlaceholder,
  MessageIcon,
  ReqSendIcon,
  VerifiedIcon,
} from "@/app/components/common/allImages/AllImages";
import Button from "@/app/components/common/buttons/Button";
import Slider from "react-slick";
import GlobalModal from "@/app/components/common/modals/InitialModal";
import Link from "next/link";
import { getUserDetails } from "@/app/lib/api/profileRoutes";
import { showToast } from "@/app/components/ui/CustomToast";
import { sendInterest } from "@/app/lib/api/homeRoutes";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { getformattedTime } from "@/util/util";

const ProfileDetail = ({ params }: any) => {
  const id = params.profile_id;
  const router = useRouter();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const profileImages =
    userDetails?.userImages.length > 0
      ? userDetails.userImages
      : userDetails?.gender === "male"
      ? [MalePlaceholder.src]
      : [FemalePlaceholder.src];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: React.ReactNode) => (
      <div className="dots-container">
        <ul>{dots}</ul>
      </div>
    ),
  };
  const [loading, setLoading] = useState<boolean>(true);

  const handleInterestSend = async () => {
    try {
      setLoading(true);
      const { status } = await sendInterest({ receiverId: id });
      if (status === 200) {
        showToast("Interest Sent Successfully", "success");
      } else {
        showToast("Error occured while sending Interest", "error");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const lightboxImages = profileImages?.map((img: any) => ({
    src: img,
  }));

  useEffect(() => {
    const getUsersProfile = async () => {
      try {
        const response = await getUserDetails(id);
        setUserDetails(response?.data?.user);
      } catch (error) {}
    };
    getUsersProfile();
  }, [id]);

  if (!userDetails) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ul className="flex items-center gap-2 text-sm my-8">
        <li>
          <Link href="/home" className="hover:text-primary">
            Home
          </Link>
        </li>
        <li className="text-gray-400">›</li>
        <li>
          <span className="text-primary">Profile Detail</span>
        </li>
      </ul>

      <div className="bg-white border border-gray rounded-2xl py-3 md:py-6 lg:py-10 grid grid-cols-1 lg:grid-cols-2">
        {/* Left Section */}
        <div className="space-y-4 border-r border-gray px-3 md:px-6 lg:px-10">
          <div className="relative rounded-3xl overflow-hidden mb-10">
            {profileImages &&
            Array.isArray(profileImages) &&
            profileImages?.length > 1 ? (
              <Slider {...sliderSettings}>
                {profileImages.map((image: string, index: number) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Profile ${index + 1}`}
                      className="w-full h-96 object-cover"
                      onClick={() => {
                        setCurrentIndex(index);
                        setLightboxOpen(true);
                      }}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div>
                <img
                  src={profileImages[0]}
                  alt={`Profile`}
                  className="w-full h-96 object-cover"
                  onClick={() => {
                    setCurrentIndex(0);
                    setLightboxOpen(true);
                  }}
                />
              </div>
            )}
            {userDetails?.isVerified && (
              <div className="text-sm text-white p-2 rounded-full absolute top-3 right-2 bg-gray">
                <VerifiedIcon width={20} height={20} />
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold">{userDetails?.name || "N/A"}</h2>
            <p className="text-sm text-gray-500 mt-2">
              {/* {userDetails?.partnerExpectation || "No details available"}{" "}
              <span className="text-orange-500 cursor-pointer">
                see more...
              </span> */}
              {isExpanded
                ? userDetails?.partnerExpectation
                : userDetails?.partnerExpectation?.substring(0, 100) + "..."}
              {userDetails?.partnerExpectation?.length > 100 && (
                <span
                  className="text-orange-500 cursor-pointer"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "see less" : "see more..."}
                </span>
              )}
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <span className="flex items-center gap-1 text-sm bg-slate-100 p-2 rounded-lg">
              <BriefcaseIcon /> {userDetails?.occupation || "N/A"}
            </span>
            <span className="text-sm text-gray-600 flex items-center gap-1 bg-slate-100 p-2 rounded-lg">
              <LocationMarker /> {userDetails?.city},{" "}
              {userDetails?.FamilyDetails?.state},{" "}
              {userDetails?.FamilyDetails?.country}
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-1 gap-2 md:gap-6 px-4 md:px-8">
          {/* Contact Details */}
          <div className="border-b border-gray pb-4">
            <h3 className="font-bold text-lg">Contact Details</h3>
            <ul className="text-sm text-gray-600 space-y-1 mt-2 grid md:grid-cols-2 grid-cols-1 gap-5">
              <li>
                <span className="text-normal mb-1">Phone Number:</span>{" "}
                <span
                  {...(!user?.isPaid && {
                    onClick: () => setIsModalOpen(true),
                  })}
                >
                  {user?.isPaid
                    ? userDetails?.phone
                    : "+91 ******" + userDetails?.phone.slice(-4)}
                </span>
              </li>
              <li>
                <span className="text-normal mb-1">Email:</span>{" "}
                <span
                  {...(!user?.isPaid && {
                    onClick: () => setIsModalOpen(true),
                  })}
                >
                  {user?.isPaid ? userDetails?.email : "******@gmail.com"}
                </span>
              </li>
            </ul>
          </div>

          {/* Education & Career */}
          <div className="border-b border-gray pb-4">
            <h3 className="font-bold text-lg">Education & Career</h3>
            <ul className="text-sm text-gray-600 space-y-1 mt-2 grid md:grid-cols-2 grid-cols-1 gap-5">
              <li>
                <span className="text-normal mb-1">Highest Degree:</span>{" "}
                {userDetails?.highestDegree || "N/A"}
              </li>
              <li>
                <span className="text-normal mb-1">Occupation:</span>{" "}
                {userDetails?.occupation || "N/A"}
              </li>
              <li>
                <span className="text-normal mb-1">Annual Income:</span>{" "}
                {userDetails?.annualIncome || "N/A"}
              </li>
            </ul>
          </div>

          {/* Partner Expectation */}
          <div className="border-b border-gray pb-4">
            <h3 className="font-bold text-lg">Partner Expectation</h3>
            <ul className="text-sm text-gray-600 space-y-1 mt-2 grid md:grid-cols-2 grid-cols-1 gap-5">
              <li>
                <span className="text-normal mb-1">Marital Expectation:</span>{" "}
                {userDetails?.lookingFor || "N/A"}
              </li>
              <li>
                <span className="text-normal mb-1">Age Range:</span>{" "}
                {userDetails?.ageFrom} to {userDetails?.ageTo}
              </li>
              <li>
                <span className="text-normal mb-1">Height Range:</span>{" "}
                {userDetails?.heightFrom} to {userDetails?.heightTo}
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            {/* <div>
              <Button
                icon={ReqSendIcon}
                label="Send Request"
                iconColor="white"
                variant="dark"
                onClick={() => {
                  if (user?.isPaid) {
                    handleInterestSend();
                  } else {
                    setIsModalOpen(true);
                  }
                }}
                // onClick={() => setIsModalOpen(true)}
              />
            </div> */}
            <div>
              <Button
                icon={MessageIcon}
                iconColor="white"
                label="Chat Now"
                onClick={() => {
                  if (user?.isPaid) {
                    router.push(`/home/messages?receiverId=${id}`);
                    localStorage.setItem(
                      "chat_user",
                      JSON.stringify({
                        _id: userDetails?._id,
                        name: userDetails?.name,
                        message: "",
                        time: new Date(),
                        image:
                          Array.isArray(userDetails?.userImages) &&
                          userDetails?.userImages.length > 0
                            ? userDetails?.userImages[0]
                            : userDetails?.gender === "male"
                            ? MalePlaceholder.src
                            : FemalePlaceholder.src,
                        roomId: `${userDetails?._id}_${user?._id}`,
                        gender: userDetails?.gender,
                      })
                    );
                  } else {
                    setIsModalOpen(true);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <GlobalModal
        isOpen={isModalOpen}
        title="Upgrade Membership"
        onClose={() => setIsModalOpen(false)}
      >
        <p>
          Become a premium member to view contacts of this profile and unlock
          all the amazing features we offer!
        </p>
        <div className="flex justify-end mt-4 gap-4 border-t border-gray pt-3">
          <Button
            onClick={() => setIsModalOpen(false)}
            label="Cancel"
            variant="light"
          />
          <Button
            label="Upgrade Now"
            onClick={() => router.push("/membership-plans")}
          />
        </div>
      </GlobalModal>
      <Lightbox
        plugins={[Zoom]}
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxImages}
        index={currentIndex}
      />
    </div>
  );
};

export default ProfileDetail;
