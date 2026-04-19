"use client"; // If using Next.js 15 in the app directory

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import { getUserProfile } from "@/app/lib/api/profileRoutes";
import { getPlansList } from "@/app/lib/api/membershipRoutes";

interface AuthContextProps {
  user: any;
  token: string | null;
  currentPlan: any;
  updateUser: (user: any) => void;
  loginInternal: (token: string, userData: any) => void;
  logoutInternal: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  const router = useRouter();

  const persistUser = (nextUser: any) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("user", JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const persistPlan = (plan: any) => {
    if (typeof window === "undefined") return;
    setCurrentPlan(plan);
    if (plan) {
      localStorage.setItem("currentPlan", JSON.stringify(plan));
    } else {
      localStorage.removeItem("currentPlan");
    }
  };

  const resolveCurrentPlan = (nextUser: any, subscriptions: any[] = []) => {
    if (!nextUser?.isPaid) return null;

    const rawMembership = nextUser?.membership ?? nextUser?.member;
    const membershipId =
      typeof rawMembership === "object"
        ? rawMembership?._id || rawMembership?.id
        : rawMembership;

    if (typeof rawMembership === "object" && (rawMembership?.name || rawMembership?.title)) {
      return {
        id: membershipId,
        title: rawMembership?.name || rawMembership?.title,
        price: rawMembership?.price,
        duration: rawMembership?.duration,
      };
    }

    const matchedPlan =
      subscriptions.find((plan: any) => plan?._id === membershipId) ||
      subscriptions.find((plan: any) => plan?.id === membershipId);

    if (!matchedPlan) return null;

    return {
      id: matchedPlan?._id || matchedPlan?.id,
      title: matchedPlan?.name || matchedPlan?.title,
      price: matchedPlan?.price,
      duration: matchedPlan?.duration,
    };
  };

  const refreshMembershipPlan = async (nextUser: any) => {
    try {
      const isPaidMember = Boolean(
        nextUser?.isPaid && (nextUser?.membership || nextUser?.member),
      );
      if (!isPaidMember) {
        persistPlan(null);
        return;
      }

      const plansResponse = await getPlansList();
      const subscriptions = plansResponse?.data?.subscriptions || [];
      const resolvedPlan = resolveCurrentPlan(nextUser, subscriptions);
      persistPlan(resolvedPlan);
    } catch (error) {
      const fallbackPlan = resolveCurrentPlan(nextUser, []);
      persistPlan(fallbackPlan);
    }
  };

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setToken(storedToken);
      setUser(parsedUser);

      const hydrateAuthState = async () => {
        try {
          const response = await getUserProfile();
          const latestUser = response?.data?.user || parsedUser;
          persistUser(latestUser);
          await refreshMembershipPlan(latestUser);
        } catch (error) {
          await refreshMembershipPlan(parsedUser);
        }
      };

      hydrateAuthState();
    } else if (typeof window !== "undefined") {
      localStorage.removeItem("currentPlan");
      setCurrentPlan(null);
    }
  }, []);

  const updateUser = (user: any) => {
    persistUser(user);
    refreshMembershipPlan(user);
  };

  const loginInternal = (newToken: string, userData: any) => {
    Cookies.set("token", newToken, {
      expires: 30,
      path: "/",
      sameSite: "Lax",
      secure: typeof window !== "undefined" ? window.location.protocol === "https:" : false,
    });

    persistUser(userData);
    setToken(newToken);
    refreshMembershipPlan(userData);
  };

  const logoutInternal = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    localStorage.removeItem("currentPlan");
    signOut({ redirect: false });
    setToken(null);
    setUser(null);
    setCurrentPlan(null);
    if (!window.location.pathname.includes("auth")) router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, currentPlan, loginInternal, logoutInternal, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
