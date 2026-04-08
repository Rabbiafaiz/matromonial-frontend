"use client"; // If using Next.js 15 in the app directory

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";

interface AuthContextProps {
  user: any;
  token: string | null;
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
  const router = useRouter();

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };
  const loginInternal = (newToken: string, userData: any) => {
    Cookies.set("token", newToken, { expires: 7 });
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    router.push("/home");
  };

  const logoutInternal = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    signOut({ redirect: false });
    setToken(null);
    setUser(null);
    if (!window.location.pathname.includes("auth")) router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loginInternal, logoutInternal, updateUser}}
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
