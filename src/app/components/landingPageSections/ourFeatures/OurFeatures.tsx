import React from "react";
import {
  AdvanceSearchIcon,
  MatchingIcon,
  MobileFriendlyIcon,
  SecureProfileIcon,
} from "../../common/allImages/AllImages";
import Image from "next/image";

const OurFeatures: React.FC = () => {
  const steps = [
    {
      icon: SecureProfileIcon,
      title: "Secure Profiles",
      description:
        "Your privacy and security are our priority. All profiles are verified.",
    },
    {
      icon: AdvanceSearchIcon,
      title: "Advanced Search",
      description:
        "Our filters help you find matches that fit your preferences efficiently.",
    },
    {
      icon: MatchingIcon,
      title: "Matching",
      description: "We analyze your preferences for better matches.",
    },
    {
      icon: MobileFriendlyIcon,
      title: "Mobile-Friendly",
      description:
        "Use our mobile app to browse matches easily on your smartphone.",
    },
  ];
  return (
    <section className="bg-gray-50 px-8 md:py-16 py-10 border-b border-gray">
      <div className="max-w-7xl mx-auto">
        <div className="text-left">
          <h2 className="text-sm font-medium text-normal uppercase">
            our features
          </h2>
          <h3 className="md:text-3xl text-2xl font-bold text-gray-900 mt-2">
            Why Choose us
          </h3>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="lg:px-8 lg:py-12 px-4 py-8 border border-gray rounded-lg text-center"
            >
              <div className="flex justify-center items-center lg:h-32 lg:w-32 w-24 h-24 mx-auto bg-orange-100 rounded-full">
                <step.icon
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mt-4">
                {step.title}
              </h4>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurFeatures;
