// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return <section>{children}</section>
// }

"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { showToast } from "@/app/components/ui/CustomToast";
import { useAuth } from "@/context/AuthContext";
import { io, Socket } from "socket.io-client";
import getSocket from "@/util/sockets";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { token, user, logoutInternal } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && token) {
      const user = JSON.parse(storedUser);

      if (user.profileCompleted) {
        setIsLoading(false);
      } else {
        if (!pathname.includes("tell-us-more-about-yourself")) {
          showToast("Please complete your profile first", "error");
          router.push("/tell-us-more-about-yourself");
        }
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!user?._id) return;

    const socket = getSocket();

    const handleConnect = () => {
      console.log("Socket connected, joining user channel:", user._id);
      socket.emit("join_user_channel", user._id);
    };
  
    if (socket.connected) {
      handleConnect();
    } else {
      socket.on("connect", handleConnect);
    }

    const handleExpire = (data: any) => {
      console.log("subscription_expired event received", data);
      showToast(data.message, "error");
      logoutInternal();
    };
    socket.on("joined_user_channel", (data) => {
      console.log("Successfully joined user channel:", data);
    });

    socket.on("subscription_expired", handleExpire);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("joined_user_channel");
      socket.off("subscription_expired", handleExpire);
    };
  }, [user]);

  //   if (isLoading) {
  //     return (
  //       <div className="flex items-center justify-center h-screen">
  //         Loading...
  //       </div>
  //     );
  //   }

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default ProtectedLayout;
