"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/inputFields/InputField";
import Button from "@/app/components/common/buttons/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/app/lib/api/authRoutes";
import { showToast } from "@/app/components/ui/CustomToast";

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await forgotPassword(values);
          if (response?.status === 200) {
            showToast("Reset Email sent successfully", "success");
            router.push(`/auth/reset-mail-sent?email=${values?.email}`);
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
          <h2 className="text-3xl font-bold mb-7">Reset your password</h2>
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
          <Button
            type="submit"
            disabled={isSubmitting}
            label={isSubmitting ? "Resetting..." : "Reset"}
            className="mt-4 w-full"
          />
          <div className="mt-4 font-regular">
            <span>Have Your Password?</span>{" "}
            <Link href={"/auth/login"} className="text-primary">
              Log in
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPassword;
