'use client'
import Button from "@/app/components/common/buttons/Button";
import InputField from "@/app/components/common/inputFields/InputField";
import { showToast } from "@/app/components/ui/CustomToast";
import { resetPassword } from "@/app/lib/api/authRoutes";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import * as Yup from "yup";

const ResetPassForm = () => {
  const router = useRouter();
  const searchParam = useSearchParams()
  const email = searchParam.get("email") || ""
  const otp = searchParam.get("otp") || ""
  return (
    <div>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Please confirm your password"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (!email || !otp) {
              showToast("Invalid or missing reset credentials", "error");
              return;
            }

            const response = await resetPassword({
              email,
              otp: otp,
              password: values.password,
            });

            if (response?.status === 200) {
              showToast("Password reset successfully", "success");
              router.push("/auth/login");
            } else {
              showToast("Something went wrong. Please try again.", "error");
            }
          } catch (err: any) {
            showToast("Server error. Please try again.", "error");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <h2 className="text-3xl font-bold mb-7">Reset your password</h2>

            <Field
              as={InputField}
              label="New Password"
              name="password"
              type="password"
              placeholder="New Password"
              className="mt-4"
              error={errors.password}
              touched={touched.password}
            />

            <Field
              as={InputField}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="mt-4"
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              label={isSubmitting ? "Resetting..." : "Reset"}
              className="mt-6 w-full"
            />

            <div className="mt-4 font-regular">
              <span>Have your password?</span>{" "}
              <Link href="/auth/login" className="text-primary">
                Log in
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassForm;
