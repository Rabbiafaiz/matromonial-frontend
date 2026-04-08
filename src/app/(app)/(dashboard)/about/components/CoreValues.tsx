import React from "react";
import Image from "next/image";
import {
  EmpathyIcon,
  InclusivityIcon,
  InovationIcon,
  IntegrityIcon,
} from "@/app/components/common/allImages/AllImages";

const CoreValues: React.FC = () => {
  const steps = [
    {
      icon: IntegrityIcon,
      title: "Integrity",
      description:
        "We prioritize honesty, transparency, and ethics in every interaction.",
    },
    {
      icon: InclusivityIcon,
      title: "Inclusivity",
      description:
        "We embrace diversity and aim to foster respect and value for all.",
    },
    {
      icon: EmpathyIcon,
      title: "Empathy",
      description: "We focus on understanding & compassion.",
    },
    {
      icon: InovationIcon,
      title: "Innovation",
      description:
        "We aim to improve our platform with new technologies and ideas.",
    },
  ];
  return (
    <section className="bg-gray-50 px-8 md:py-16 py-10 border-b border-gray">
      <div className="max-w-7xl mx-auto">
        <div className="md:text-left text-center">
          <h2 className="text-sm font-medium text-normal uppercase">
            core values
          </h2>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">
            Our Guiding Principles
          </h3>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="lg:px-8 lg:py-12 px-4 py-8 border border-gray rounded-lg text-center"
            >
              <div className="flex justify-center items-center lg:h-32 lg:w-32 h-24 w-24 mx-auto bg-orange-100 rounded-full">
                <step.icon />
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

export default CoreValues;
