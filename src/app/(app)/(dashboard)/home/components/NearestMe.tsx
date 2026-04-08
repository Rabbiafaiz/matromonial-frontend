"use client";

import FeaturedProfileCard from "@/app/components/common/cards/FeaturedProfileCard";
import ProfileCard from "@/app/components/common/cards/ProfileCard";
import { showToast } from "@/app/components/ui/CustomToast";
import { getMatchUsers, sendInterest } from "@/app/lib/api/homeRoutes";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

interface UserData {
  _id: string;
  name: string;
  age?: string;
  dateOfBirth?: string;
  height?: string;
  occupation?: string;
  city?: string;
  createdAt: string;
  gender: string;
  sentInterests: string[];
  userImages?: string[];
  recentlyViewed?: string[];
}

interface ProfileCardProps {
  id: string;
  isNew: boolean;
  verified: boolean;
  name: string;
  age: string;
  height: string;
  occupation: string;
  sentInterests: string[];
  location: string;
  gender: string;
  image?: string;
  handleInterestSend: (id: string) => void;
}

const NearestMe = () => {
  const [recentlyViewedUsers, setRecentlyViewedUsers] = useState<UserData[]>(
    []
  );
  const [suggestedUsers, setSuggestedUsers] = useState<UserData[]>([]);
  const [featuredUsers, setFeaturedUsers] = useState<UserData[]>([]);
  const [recommendedUsers, setRecommendedUsers] = useState<UserData[]>([]);
  const [showAllNewUsers, setShowAllNewUsers] = useState(false);
  const [showAllSuggestedUsers, setShowAllSuggestedUsers] = useState(false);
  const [showAllRecentlyViewed, setShowAllRecentlyViewed] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);
  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    beforeChange: (current: number, next: number) => setActiveSlide(next),
  };

  const handleInterestSend = async (receiverId: string) => {
    const { status } = await sendInterest({ receiverId });
    if (status === 200) {
      showToast("Interest Sent Successfully", "success");
      try {
        const { data } = await getMatchUsers("newUsers");

        if (data?.matchedUsers && Array.isArray(data?.matchedUsers)) {
          const validUsers = data?.matchedUsers.filter(
            (user: UserData) => true
          );

          setRecentlyViewedUsers(validUsers.slice(0, 10));
          setSuggestedUsers(validUsers.slice(5, 15));
          setRecommendedUsers(validUsers.slice(2, 12));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      showToast("Error occurred while sending Interest", "error");
    }
  };

  const fetchNearestUsers = async () => {
    try {
      setLoading(true);
      const { data } = await getMatchUsers("newUsers");
      if (data?.matchedUsers && Array.isArray(data?.matchedUsers)) {
        const validUsers = data?.matchedUsers.filter((user: UserData) => true);

        setRecentlyViewedUsers(validUsers.slice(0, 10));
        setSuggestedUsers(validUsers.slice(5, 15));
        setRecommendedUsers(validUsers.slice(2, 12));

        if (validUsers.length > 0) {
          setFeaturedUsers(validUsers.slice(0, 4));
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNearestUsers();
  }, []);

  const formatUserForCard = (user: UserData): ProfileCardProps => {
    return {
      id: user._id,
      isNew:
        new Date(user.createdAt) >
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      verified: true,
      name: user.name,
      age: user.age || calculateAge(user.dateOfBirth),
      height: user.height || "Not specified",
      occupation: user.occupation || "Not specified",
      sentInterests: user.sentInterests,
      location: user.city || "Not specified",
      gender: user?.gender,
      image: user.userImages?.[0],
      handleInterestSend,
    };
  };

  const calculateAge = (dateOfBirth?: string): string => {
    if (!dateOfBirth) return "Not specified";
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age.toString();
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 text-center">
        Loading profiles...
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-4">
      {featuredUsers.length > 0 && (
        <div className="mt-4 mb-6 md:hidden">
          <Slider ref={sliderRef} {...slickSettings}>
            {featuredUsers.map((user) => (
              <div key={user._id} className="px-2">
                <FeaturedProfileCard {...formatUserForCard(user)} />
              </div>
            ))}
          </Slider>

          {/* Custom Pagination Dots */}
          <div className="flex justify-center mt-2">
            {featuredUsers.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full mx-0.5 cursor-pointer ${
                  activeSlide === index
                    ? "bg-orange-500 w-4"
                    : "bg-orange-300 w-1.5"
                }`}
                onClick={() => sliderRef.current?.slickGoTo(index)}
              />
            ))}
          </div>
        </div>
      )}
      {recentlyViewedUsers.length > 0 && (
        <section className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Recently Viewed</h2>
            {recentlyViewedUsers.length > 5 && (
              <button
                onClick={() => setShowAllRecentlyViewed(!showAllRecentlyViewed)}
                className="text-orange-500 font-semibold"
              >
                {showAllRecentlyViewed ? "Show Less" : "See All"}
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {(showAllRecentlyViewed
              ? recentlyViewedUsers
              : recentlyViewedUsers.slice(0, 5)
            ).map((user) => (
              <ProfileCard key={user._id} {...formatUserForCard(user)} />
            ))}
          </div>
        </section>
      )}

      {suggestedUsers.length > 0 && (
        <section className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Suggested For You</h2>
            {suggestedUsers.length > 5 && (
              <button
                onClick={() => setShowAllSuggestedUsers(!showAllSuggestedUsers)}
                className="text-orange-500 font-semibold"
              >
                {showAllSuggestedUsers ? "Show Less" : "See All"}
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {(showAllSuggestedUsers
              ? suggestedUsers
              : suggestedUsers.slice(0, 5)
            ).map((user) => (
              <ProfileCard key={user._id} {...formatUserForCard(user)} />
            ))}
          </div>
        </section>
      )}

      {recommendedUsers.length > 0 && (
        <section className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Recommended For You</h2>
            {recommendedUsers.length > 5 && (
              <button
                onClick={() => setShowAllNewUsers(!showAllNewUsers)}
                className="text-orange-500 font-semibold"
              >
                {showAllNewUsers ? "Show Less" : "See All"}
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {(showAllNewUsers ? recommendedUsers : recommendedUsers.slice(0, 5)).map((user) => (
              <ProfileCard key={user._id} {...formatUserForCard(user)} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default NearestMe;
