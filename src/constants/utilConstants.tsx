import Matches from "@/app/(app)/(dashboard)/dashbaord/components/Matches";
import NearestMe from "@/app/(app)/(dashboard)/dashbaord/components/NearestMe";
import NewJoined from "@/app/(app)/(dashboard)/dashbaord/components/NewJoined";
import {
  ActiveStatusIcon,
  ConnectionsIcon,
  MembershipPlansIcon,
  PrivacyPolicyIcon,
  ProfileIcon,
  SuccessStoriesIcon,
} from "@/app/components/common/allImages/AllImages";

export const getFieldsForTab = (tabIndex: number) => {
  const tabFieldsMap: Record<number, string[]> = {
    0: ["fullName", "dateOfBirth", "gender"], // Fields in Tab 1 (Basic Info)
    1: ["education", "occupation", "annual_income"], // Fields in Tab 2 (Education & Occupation)
    2: ["address", "city", "state"], // Fields in Tab 3 (Address Details)
  };

  return tabFieldsMap[tabIndex] || [];
};


export const homeTabs = [
  {
    title: "New Join",
    component: NewJoined,
  },
  {
    title: "Matches",
    component: Matches,
  },
  {
    title: "Nearest Me",
    component: NearestMe,
  },
];

export const menuItems = [
  {
    icon: <ProfileIcon />,
    label: "Profile",
    path: "/dashbaord/my-profile",
  },
  // {
  //   icon: <ActiveStatusIcon />,
  //   label: "Active Status",
  //   path: "/dashbaord/active-status",
  // },
  // {
  //   icon: <ConnectionsIcon />,
  //   label: "Connections",
  //   path: "/dashbaord/connections",
  // },
  {
    icon: <MembershipPlansIcon />,
    label: "Membership Plan",
    path: "/membership-plans",
  },
  {
    icon: <SuccessStoriesIcon />,
    label: "Success Stories",
    path: "/dashbaord/success-stories",
  },
  {
    icon: <PrivacyPolicyIcon />,
    label: "Privacy & Policy",
    path: "/privacy-policy",
  },
];
