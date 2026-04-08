"use client";
import { SessionProvider } from "next-auth/react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "./styles/global.css";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import NotificationHandler from "./components/notificationHandler/NotificationHandler";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith("/auth");
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  return (
    <html lang="en">
      <Head>
        <script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>
      </Head>
      <body>
        <AuthProvider>
          <SessionProvider>
            <NotificationHandler />
            {!isAuthRoute && <Header />}
            <div>{children}</div>
            {!isAuthRoute && <Footer />}

            <div id="modal-root"></div>
            <Toaster position={isMobile ? "bottom-center" : "top-right"} reverseOrder={false} />
          </SessionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
