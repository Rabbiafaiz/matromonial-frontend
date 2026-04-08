"use client";

import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/inputFields/InputField";
import Button from "@/app/components/common/buttons/Button";
import { showToast } from "@/app/components/ui/CustomToast";
import { contactUs } from "@/app/lib/api/contactRoutes";

interface ContactValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: ContactValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-4">
      <div className="w-full max-w-7xl">
        <h2 className="text-center font-medium text-normal uppercase">Contact Us</h2>
        <h2 className="text-xl md:text-4xl font-bold md:mb-7 mb-3 text-center">
          Get in touch today
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Lorem ipsum dolor sit amet consectetur adipiscing elit nulla adipiscing tincidunt interdum tellus du.
        </p>
        
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email address").required("Required"),
            phone: Yup.string()
              .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
              .required("Required"),
            message: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setLoading(true);
            try {
              const response = await contactUs(values);
              
              if (response?.status === 200 || response?.status === 201) {
                showToast("Message sent successfully!", "success");
                resetForm();
              } else {
                console.log(response);
                
                showToast("Something went wrong. Please try again.", "error");
              }
            } catch (error) {
              showToast("Failed to send message. Try again later.", "error");
            } finally {
              setLoading(false);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-4">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-3 md:gap-5">
                <Field
                  as={InputField}
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="John Paul"
                  error={errors.name}
                  touched={touched.name}
                />
                <Field
                  as={InputField}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  error={errors.email}
                  touched={touched.email}
                />
                <Field
                  as={InputField}
                  label="Phone"
                  name="phone"
                  type="text"
                  placeholder="(123) 456 - 789"
                  error={errors.phone}
                  touched={touched.phone}
                />
              </div>
              <Field
                as={InputField}
                label="Leave us a Message"
                name="message"
                type="textarea"
                placeholder="Please type your message here"
                className="mt-4"
                error={errors.message}
                touched={touched.message}
              />
              <Button
                type="submit"
                disabled={isSubmitting || loading}
                label={loading ? "Sending..." : "Send Message"}
                className="mt-7 w-full sm:w-auto"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactPage;



// "use client";

// import React from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import InputField from "@/app/components/common/inputFields/InputField";
// import Button from "@/app/components/common/buttons/Button";

// const ContactPage: React.FC = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-4">
//       <div className="w-full max-w-7xl">
//         <h2 className="text-center font-medium text-normal uppercase">Contact Us</h2>
//         <h2 className="text-xl md:text-4xl font-bold md:mb-7 mb-3 text-center">
//           Get in touch today
//         </h2>
//         <p className="text-center text-gray-500 mb-8">
//           Lorem ipsum dolor sit amet consectetur adipiscing elit nulla
//           adipiscing tincidunt interdum tellus du.
//         </p>
//         <Formik
//           initialValues={{
//             name: "",
//             email: "",
//             phone: "",
//             message: "",
//           }}
//           validationSchema={Yup.object({
//             name: Yup.string().required("Required"),
//             email: Yup.string()
//               .email("Invalid email address")
//               .required("Required"),
//             phone: Yup.string().matches(
//               /^[0-9]{10}$/,
//               "Phone must be 10 digits"
//             ),
//             message: Yup.string().required("Required"),
//           })}
//           onSubmit={(values, { setSubmitting }) => {
//             console.log(values);
//             setSubmitting(false);
//           }}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <div className="grid md:grid-cols-2 grid-cols-1 gap-3 md:gap-5">

//               <InputField
//                 label="Name"
//                 name="name"
//                 type="text"
//                 placeholder="Your Name"
//               />
//               <InputField
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 placeholder="Your Email"
//               />
//               <InputField
//                 label="Phone"
//                 name="phone"
//                 type="text"
//                 placeholder="Your Phone Number"
//               />
//               </div>
//               <InputField
//                 label="Message"
//                 name="message"
//                 type="textarea"
//                 placeholder="Your Message"
//                 className="mt-4"
//               />
//               <Button
//                 type="submit"
//                 disabled={isSubmitting}
//                 label="Send message"
//                 className="mt-7 w-full sm:w-auto"
//               />
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;
