"use client";
import FeaturedProfileCard from "@/app/components/common/cards/FeaturedProfileCard";
import ProfileCard from "@/app/components/common/cards/ProfileCard";
import { showToast } from "@/app/components/ui/CustomToast";
import { getNewUsers, sendInterest } from "@/app/lib/api/homeRoutes";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

// Define interface for the user data from API
interface UserData {
  _id: string;
  name: string;
  gender?: string;
  age?: string;
  dateOfBirth?: string;
  height?: string;
  occupation?: string;
  city?: string;
  createdAt: string;
  sentInterests: string[];
  userImages?: string[];
  recentlyViewed?: string[];
  FamilyDetails?: {
    city?: string;
  };
}

// Define interface for the profile card props
interface ProfileCardProps {
  id: string;
  isNew: boolean;
  verified: boolean;
  name: string;
  age: string;
  height: string;
  gender?: string;
  occupation: string;
  sentInterests: string[];
  location: string;
  image?: string;
  handleInterestSend: (id: string) => void;
}

const NewJoined = () => {
  const [newUsers, setNewUsers] = useState<UserData[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<UserData[]>([]);
  const [featuredUsers, setFeaturedUsers] = useState<UserData[]>([]);
  const [recentlyViewedUsers, setRecentlyViewedUsers] = useState<UserData[]>(
    []
  );
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
        const { data } = await getNewUsers();

        if (data?.newUsers && Array.isArray(data?.newUsers)) {
          const validUsers = data?.newUsers.filter((user: UserData) => true);

          setNewUsers(validUsers.slice(0, 10));

          setSuggestedUsers(validUsers.slice(5, 15));

          const withRecentViews = validUsers.filter(
            (user: UserData) =>
              user.recentlyViewed && user.recentlyViewed.length > 0
          );
          setRecentlyViewedUsers(
            withRecentViews.length > 0
              ? withRecentViews
              : validUsers.slice(2, 12)
          );

          if (validUsers.length > 0) {
            setFeaturedUsers(validUsers.slice(0, 4));
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      showToast("Error occured while sending Interest", "error");
    }
  };
  const getNewUsersList = async () => {
    try {
      setLoading(true);
      const { data } = await getNewUsers();

      if (data?.newUsers && Array.isArray(data?.newUsers)) {
        // Filter users with complete profiles and images
        const validUsers = data?.newUsers.filter((user: UserData) => true);
        // const validUsers = data?.newUsers.filter((user: UserData) =>
        //   user.gender === 'female' && user.userImages && user.userImages.length > 0
        // );

        // Set users for different sections
        setNewUsers(validUsers.slice(0, 10)); // First 10 users for New Joined

        // For suggested users, using a different slice of the same data
        setSuggestedUsers(validUsers.slice(5, 15));

        // For recently viewed, using users with recentlyViewed data
        const withRecentViews = validUsers.filter(
          (user: UserData) =>
            user.recentlyViewed && user.recentlyViewed.length > 0
        );
        setRecentlyViewedUsers(
          withRecentViews.length > 0 ? withRecentViews : validUsers.slice(2, 12)
        );
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
    getNewUsersList();
  }, []);

  // Helper function to format user data for ProfileCard component
  const formatUserForCard = (user: UserData): ProfileCardProps => {
    return {
      id: user._id,
      isNew:
        new Date(user.createdAt) >
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // New if created within the last week
      verified: true, // You might want to adjust this based on your actual verification logic
      name: user.name,
      age: user.age || calculateAge(user.dateOfBirth),
      height: user.height || "Not specified",
      occupation: user.occupation || "Not specified",
      sentInterests: user.sentInterests,
      gender: user.gender,
      location:
        user.city ||
        (user.FamilyDetails && user.FamilyDetails.city) ||
        "Not specified",
      image:
        user.userImages && user.userImages.length > 0
          ? user.userImages[0]
          : undefined,
      handleInterestSend: handleInterestSend,
    };
  };

  // Helper function to calculate age from DOB
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

      {newUsers.length > 0 && (
        <section className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">New Joined</h2>
            {newUsers.length > 5 && (
              <button
                onClick={() => setShowAllNewUsers(!showAllNewUsers)}
                className="text-orange-500 font-semibold"
              >
                {showAllNewUsers ? "Show Less" : "See All"}
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {(showAllNewUsers ? newUsers : newUsers.slice(0, 5)).map((user) => (
              <ProfileCard key={user._id} {...formatUserForCard(user)} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default NewJoined;
