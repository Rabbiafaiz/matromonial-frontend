"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import Button from "../../common/buttons/Button";
import { PricingBg } from "../../common/allImages/AllImages";
import { useRouter } from "next/navigation";
import { getPlansList } from "@/app/lib/api/membershipRoutes";
import { useAuth } from "@/context/AuthContext";
import { getFormatedDate } from "@/util/util";

interface Subscription {
  _id: string;
  name: string;
  price: number;
  duration: string;
  messages: number;
  liveChats: string;
  profileViews: number;
}

interface Plan {
  id: string;
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featureClr: string;
  buttonLabel: string;
  bgColor: string;
  textColor: string;
  priceColor: string;
  buttonBgColor: string;
  borderColor: string;
  buttonTextColor: string;
  variant: "primary";
}

const PricingPlans: React.FC = () => {
  const token = Cookies.get("token");
  const { user } = useAuth();
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>([]);
  const [isUpgrade, setIsUpgrade] = useState<boolean>(false);
  const [isAnual, setIsAnual] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getPlansList();
        if (data?.data?.subscriptions) {
          const formattedPlans: Plan[] = data?.data?.subscriptions.map(
            (plan: Subscription) => ({
              id: plan?._id,
              title: plan.name,
              price: `${plan.price}`,
              period: "/month",
              description: `Duration: ${plan.duration}`,
              features: [
                `${plan.duration} Duration`,
                `${plan.messages} Messages`,
                `Live Chats: ${plan.liveChats}`,
                `${plan.profileViews} Profile Views`,
                "Up to 3 team members",
              ],
              featureClr: "text-darkBlue",
              buttonLabel: "Get started",
              bgColor: "bg-white",
              textColor: "text-gray-800",
              priceColor: "text-primary",
              buttonBgColor: "bg-orange-500",
              borderColor: "border-gray",
              buttonTextColor: "text-white",
              variant: "primary",
            })
          );
          setPlans(formattedPlans);
          setFilteredPlans(formattedPlans)
        }
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      }
    };
    fetchPlans();
  }, []);

  if (token && user?.isPaid && user?.membership && !isUpgrade) {
    const currentPlan: any =
      plans?.length > 0
        ? plans.find((plan) => plan?.id === user?.membership)
        : {};
      localStorage.setItem("currentPlan", JSON.stringify(currentPlan))
    return (
      <section className="md:px-0 max-w-full w-full sm:max-w-[707px] mx-auto my-6 sm:my-12">
        <div className="rounded-3xl sm:border-[0.5px] sm:border-gray px-4 sm:px-10 py-6 sm:py-10">
          {/* Current Plan Section */}
          <div className="flex flex-col">
            <h2 className="text-[20px] font-bold text-darkBlue">
              Current plan
            </h2>
            <p className="text-gray-500 mt-2">
              Here's a snapshot of your current subscription.
            </p>

            {/* Plan Details */}
            <div className="mt-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between flex-wrap gap-4 items-center">
                <div>
                  <h3 className="text-[18px] font-bold text-[#1C264E]">
                    {currentPlan?.title}
                  </h3>
                  <p className="text-[#434343] mt-1">
                    ₹{currentPlan?.price} - renews on{" "}
                    {getFormatedDate(user?.membershipExpiry)}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  label="Upgrade"
                  className="px-6 rounded-full"
                  onClick={() => setIsUpgrade(true)}
                />
              </div>
            </div>

            {/* Billing Info */}
            <div className="py-6 border-b border-gray-200">
              <h3 className="text-[18px] font-bold text-[#1C264E] mb-4">
                Billing info
              </h3>
              <p className="text-gray-500 mb-6">
                Here's the information that will be shown on your receipt and
                invoice.
              </p>

              <div className="flex justify-between items-center mb-4">
                <p className="text-[#434343] font-semibold">Name</p>
                <p className="text-[hsl(0,0%,26%)] font-semibold">{user?.name}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-[#434343] font-semibold">Email</p>
                <p className="text-[#434343] font-semibold">{user?.email}</p>
              </div>
            </div>

            {/* Billing History */}
            <div className="pt-6">
              <h3 className="text-[18px] font-bold text-[#1C264E] mb-6">
                Billing history
              </h3>

              <div className="flex justify-between items-center">
                <p className="text-[#434343] font-semibold">
                  {getFormatedDate(user?.membershipExpiry)}
                </p>
                <div className="flex items-center gap-8">
                  <span className="text-[#F97E27] font-semibold">Paid</span>
                  <span className="text-[#434343] font-semibold">
                    ₹{currentPlan?.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 border-b border-gray">
      <div className="absolute inset-0 z-0">
        <Image
          src={PricingBg}
          alt="Background Pattern"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
        <h2 className="text-sm font-medium text-normal uppercase">
          Membership Plans
        </h2>
        <h2 className="md:text-4xl text-2xl font-bold mt-2">
          Unlock Your Love Journey
        </h2>

        <div className="flex justify-center gap-2 mt-6">
          <Button label="Monthly Plan" variant={isAnual ? "secondary" : "primary"} onClick={() => {
            setIsAnual(false)
            setFilteredPlans(plans.filter(plan => {
            const numbers = plan?.description.match(/\d+/g);
            const hasTwelveOrMore = numbers?.some(num => parseInt(num) < 12);
            return hasTwelveOrMore
          }))}} />
          <Button label="Annual Plan" variant={!isAnual ? "secondary" : "primary"} onClick={() => {
            setIsAnual(true)
            setFilteredPlans(plans.filter(plan => {
            const numbers = plan?.description.match(/\d+/g);
            const hasTwelveOrMore = numbers?.some(num => parseInt(num) >= 12);
            return hasTwelveOrMore
          }))}} />
        </div>

        <div className="flex lg:flex-nowrap flex-wrap justify-center mt-12">
          {filteredPlans.length > 0 ? filteredPlans.map((plan, index) => (
            <div
              key={index}
              className={`${plan.bgColor} rounded-2xl text-left border border-gray w-full sm:w-1/3 md:mx-4 mx-0 my-4 px-6 py-8 `}
            >
              <h3 className={`text-xl font-semibold ${plan.textColor}`}>
                {plan.title}
              </h3>
              <p
                className={`text-4xl font-bold mt-2 pb-8 border-b ${plan.borderColor}`}
              >
                <span className={`${plan.priceColor} me-2`}>₹{plan.price}</span>
                <span className={`text-base font-light ${plan.textColor}`}>
                  {plan.period}
                </span>
              </p>
              <p className={`mt-8 ${plan.textColor}`}>{plan.description}</p>
              <ul className="text-left mt-6 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`${plan.featureClr}`}>
                    ✔ {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`mt-8 w-full`}
                label={plan.buttonLabel}
                variant={plan.variant}
                onClick={() => {
                  localStorage.setItem("selected_plan", JSON.stringify(plan));
                  router.push("/membership-plans/selected-plan");
                }}
              />
            </div>
          )) : (
            <div>
              <span className="text-xl">No Plans found!</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
