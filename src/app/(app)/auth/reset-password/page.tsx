import React, { Suspense } from "react";
import ResetPassForm from "./ResetPassForm";

const ResetPassword = () => {
  return (
    <Suspense>
      <ResetPassForm />
    </Suspense>
    // <Formik
    //   initialValues={{ password: "", confirmPassword: "" }}
    //   validationSchema={Yup.object({
    //     password: Yup.string()
    //       .min(6, "Password must be at least 6 characters")
    //       .required("Password is required"),
    //     confirmPassword: Yup.string()
    //       .oneOf([Yup.ref("password")], "Passwords must match")
    //       .required("Please confirm your password"),
    //   })}
    //   onSubmit={async (values, { setSubmitting }) => {
    //     try {
    //       if (!email || !otp) {
    //         showToast("Invalid or missing reset credentials", "error");
    //         return;
    //       }

    //       const response = await resetPassword({
    //         email,
    //         otp: otp,
    //         password: values.password,
    //       });

    //       if (response?.status === 200) {
    //         showToast("Password reset successfully", "success");
    //         router.push("/auth/login");
    //       } else {
    //         showToast("Something went wrong. Please try again.", "error");
    //       }
    //     } catch (err: any) {
    //       showToast("Server error. Please try again.", "error");
    //     } finally {
    //       setSubmitting(false);
    //     }
    //   }}
    // >
    //   {({ isSubmitting, errors, touched }) => (
    //     <Form>
    //       <h2 className="text-3xl font-bold mb-7">Reset your password</h2>

    //       <Field
    //         as={InputField}
    //         label="New Password"
    //         name="password"
    //         type="password"
    //         placeholder="New Password"
    //         className="mt-4"
    //         error={errors.password}
    //         touched={touched.password}
    //       />

    //       <Field
    //         as={InputField}
    //         label="Confirm Password"
    //         name="confirmPassword"
    //         type="password"
    //         placeholder="Confirm Password"
    //         className="mt-4"
    //         error={errors.confirmPassword}
    //         touched={touched.confirmPassword}
    //       />

    //       <Button
    //         type="submit"
    //         disabled={isSubmitting}
    //         label={isSubmitting ? "Resetting..." : "Reset"}
    //         className="mt-6 w-full"
    //       />

    //       <div className="mt-4 font-regular">
    //         <span>Have your password?</span>{" "}
    //         <Link href="/auth/login" className="text-primary">
    //           Log in
    //         </Link>
    //       </div>
    //     </Form>
    //   )}
    // </Formik>
  );
};

export default ResetPassword;

// "use client";

// import React from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import InputField from "@/app/components/common/inputFields/InputField";
// import Button from "@/app/components/common/buttons/Button";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { forgotPassword } from "@/app/lib/api/authRoutes";
// import { showToast } from "@/app/components/ui/CustomToast";

// interface ResetMailSentProps {
//   searchParams: {
//     email?: string;
//     otp?: string;
//   };
// }
// const ResetPassword: React.FC<ResetMailSentProps> = ({ searchParams }) => {
//   const router = useRouter();
//   const email = searchParams?.email;
//   const otp = searchParams?.otp;
//   return (
//     <Formik
//       initialValues={{ password: "" }}
//       validationSchema={Yup.object({
//         password: Yup.string()
//           .min(6, "Password must be at least 6 characters")
//           .required("Required"),
//       })}
//       onSubmit={async (values, { setSubmitting }) => {
//         try {
//           const response = await forgotPassword(values);
//           if (response?.status === 200) {
//             showToast("Reset Email sent successfully", "success");
//             // router.push("/auth/reset-mail-sent");
//           } else {
//             showToast("Something went wrong. Please try again.", "error");
//           }
//         } catch (err: any) {
//         } finally {
//           setSubmitting(false);
//         }
//       }}
//     >
//       {({ isSubmitting, errors, touched }) => (
//         <Form>
//           <h2 className="text-3xl font-bold mb-7">Reset your password</h2>
//           <Field
//             as={InputField}
//             label="New Password"
//             name="password"
//             type="password"
//             placeholder="New Password"
//             className="mt-4"
//             error={errors.password}
//             touched={touched.password}
//           />
//           <Button
//             type="submit"
//             disabled={isSubmitting}
//             label={isSubmitting ? "Resetting..." : "Reset"}
//             className="mt-4 w-full"
//           />
//           <div className="mt-4 font-regular">
//             <span>Have Your Password?</span>{" "}
//             <Link href={"/auth/login"} className="text-primary">
//               Log in
//             </Link>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default ResetPassword;
