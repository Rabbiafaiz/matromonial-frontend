"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/inputFields/InputField";
import Button from "@/app/components/common/buttons/Button";
import { GoogleLogo } from "@/app/components/common/allImages/AllImages";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register, socialLogin } from "@/app/lib/api/authRoutes";
import { signIn, useSession } from "next-auth/react";
import { showToast } from "@/app/components/ui/CustomToast";
import { useAuth } from "@/context/AuthContext";

interface SignUpValues {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const SignupForm: React.FC = () => {
  // const token = localStorage.getItem("fcm_token");
  // const fcmToken = token ? token : null;
  const router = useRouter();
  const { loginInternal } = useAuth();
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [googleAuthCompleted, setGoogleAuthCompleted] =
    useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("fcm_token");
      setFcmToken(token ? token : null);
    }
  }, []);
  // useEffect(() => {
  //   if (session?.user?.email && !googleAuthCompleted) {
  //     setGoogleAuthCompleted(true);
  //     saveUserToBackend(session?.user?.email);
  //   }
  // }, [session?.user?.email]);
  // const saveUserToBackend = async (email: string) => {
  //   try {
  //     const obj = {
  //       email,
  //       fcmToken,
  //     };
  //     const response = await socialLogin(obj);

  //     if (response?.status === 200 || response?.status === 201) {
  //       showToast("Logged In successfully", "success");
  //       loginInternal(response?.data?.token, response?.data?.user);
  //       router.push("/home");
  //     } else {
  //       showToast("Something went wrong. Please try again.", "error");
  //     }
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const initialValues: SignUpValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  // const handleGoogleLogin = async () => {
  //   try {
  //     setLoading(true);
  //     await signIn("google", { redirect: false });
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await register({
            ...values,
            ...(fcmToken && { fcmToken: fcmToken }),
          });
          if (response?.status === 200 || response?.status === 201) {
            loginInternal(response?.data?.token, response?.data?.user);
            showToast("Signed up successfully", "success");
            router.push("/tell-us-more-about-yourself");
          } else if (response?.data?.message) {
            showToast(response?.data?.message, "error");
          } else {
            showToast("Something went wrong. Please try again.", "error");
          }
        } catch (err: any) {
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <h2 className="text-3xl font-bold mb-7">Create new Account</h2>
          <Field
            as={InputField}
            label="Name"
            name="name"
            type="text"
            placeholder="Name"
            className="mt-4"
            error={errors.name}
            touched={touched.name}
          />
          <Field
            as={InputField}
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email Address"
            className="mt-4"
            error={errors.email}
            touched={touched.email}
          />
          <Field
            as={InputField}
            label="Phone"
            name="phone"
            type="text"
            placeholder="Phone"
            className="mt-4"
            error={errors.phone}
            touched={touched.phone}
          />
          <Field
            as={InputField}
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            className="mt-4"
            error={errors.password}
            touched={touched.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            label={isSubmitting ? "Signing Up..." : "Sign Up"}
            className="mt-4 w-full"
          />
          {/* <Button
            type="button"
            label={loading ? "Signing Up..." : "Sign Up with google"}
            icon={GoogleLogo}
            className="mt-4 w-full bg-lightBlue"
            variant="light"
            onClick={handleGoogleLogin}
          /> */}
          <div className="mt-4 font-regular">
            <span>Already have an account?</span>{" "}
            <Link href={"/auth/login"} className="text-primary">
              Log in
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
