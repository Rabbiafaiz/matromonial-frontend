"use client";

import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import InputField from "@/app/components/common/inputFields/InputField";
import ImageUploader from "@/app/components/common/inputFields/ImageUploader";
import Button from "@/app/components/common/buttons/Button";
import { deleteUserProfile } from "@/app/lib/api/profileRoutes";
import { useAuth } from "@/context/AuthContext";
import { showToast } from "@/app/components/ui/CustomToast";
import { useRouter } from "next/navigation";
import GlobalModal from "@/app/components/common/modals/InitialModal";

interface ProfileFormData {
  [key: string]: string | string[];
}

interface ProfilePanelProps {
  formData: ProfileFormData;
  images: string[];
  // handleChange: (name: string, value: string) => void;
  handleImageUpload: (images: FileList | null) => void;
  handleDeleteImage: (img: string) => void;
  handleFormSubmit: (values: ProfileFormData) => void;
  options: any;
}

const MyAccountTab: React.FC<ProfilePanelProps> = ({
  formData,
  images,
  // handleChange,
  handleImageUpload,
  handleDeleteImage,
  handleFormSubmit,
  options,
}) => {
  const { logoutInternal, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteProfile = async () => {
    try {
      setLoading(true);
      const { status, data } = await deleteUserProfile({
        email: formData?.email,
        userId: formData?._id,
      });
      if (status === 200) {
        showToast("Profile Deleted Successfully!", "success");
        logoutInternal();
        router.push("/auth/login");
      } else {
        showToast(data?.message, "error");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          email: formData?.email,
          name: formData?.name,
          phone: formData?.phone,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Full Name is required"),
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          phone: Yup.string().required("Phone number is required"),
        })}
        onSubmit={handleFormSubmit}
      >
        {({ errors, touched, values, isSubmitting, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <h3 className="text-lg font-semibold mb-2">Profile Images</h3>
              {!images ||
                (images.length < 8 && (
                  <ImageUploader
                    onUpload={handleImageUpload}
                    maxImages={1}
                    className="w-72"
                  />
                ))}
              <div className="flex gap-2 mt-4 mb-12">
                {images &&
                  images?.length > 0 &&
                  images.map((img, index) => (
                    <div className="relative">
                      <img
                        key={index}
                        src={img}
                        alt={`Profile`}
                        className="w-36 h-32 object-contain rounded-md"
                      />
                      <div
                        className="absolute top-0 right-0 bg-primary flex items-center justify-center text-white text-xs w-3 h-3 rounded-sm cursor-pointer"
                        onClick={() => handleDeleteImage(img)}
                      >
                        ×
                      </div>
                    </div>
                  ))}
              </div>

              <h3 className="text-lg font-semibold mb-6">Account Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Profile ID"
                  name="profile_id"
                  disabled
                  value={user._id}
                />
                <Field
                  as={InputField}
                  label="Full Name"
                  name="name"
                  value={values.name}
                  error={errors.name}
                  touched={touched.name}
                />
                <Field
                  as={InputField}
                  label="Email Address"
                  name="email"
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                />
                <Field
                  as={InputField}
                  label="Phone Number"
                  name="phone"
                  value={values.phone}
                  error={errors.phone}
                  touched={touched.phone}
                />
              </div>

              <Button
                type="submit"
                label={isSubmitting ? "Saving..." : "Save Changes"}
                className="mt-5 md:w-auto w-full"
              />

              <h3 className="text-lg font-semibold mt-6 text-darkBlue">
                Account Deactivation
              </h3>
              <Button
                label={loading ? "Deleting..." : "Delete Account"}
                variant="secondary"
                className="mt-2 border border-red-500 text-red-500 md:w-auto w-full"
                onClick={() => setIsModalOpen(true)}
              />
            </Form>
          );
        }}
      </Formik>

      <GlobalModal
        isOpen={isModalOpen}
        title="Delete Profile"
        onClose={() => setIsModalOpen(false)}
      >
        <p>
          Your profile will be deleted permanently! Do you still want to
          proceed?
        </p>
        <div className="flex items-center justify-end mt-4 gap-4 border-t border-gray pt-3">
          <Button
            onClick={() => setIsModalOpen(false)}
            label="Cancel"
            variant="light"
          />
          <Button
            label="Yes, Delete"
            // variant="secondary"
            className="border bg-red-500 text-white"
            onClick={deleteProfile}
          />
        </div>
      </GlobalModal>
    </>
  );
};

export default MyAccountTab;

// import Button from "@/app/components/common/buttons/Button";
// import InputField from "@/app/components/common/inputFields/InputField";
// import ImageUploader from "@/app/components/common/inputFields/ImageUploader";

// interface ProfileFormData {
//   [key: string]: string;
// }

// interface ProfilePanelProps {
//   formData: ProfileFormData;
//   images: string[];
//   handleChange: (name: string, value: string) => void;
//   handleImageUpload: (images: FileList | null) => void;
//   handleDeleteImage: (index: number) => void;
//   handleSubmit: (formData: any) => void;
// }

// const MyAccountTab = ({
//   formData,
//   images,
//   handleChange,
//   handleImageUpload,
//   handleDeleteImage,
//   handleSubmit
// }: ProfilePanelProps) => {
//   // const [uploadedImages, setUploadedImages] = useState<string[]>(images ?? []);

//   return (
//     <div>
//       <h3 className="text-lg font-semibold mb-2">Profile Images</h3>
//       <ImageUploader onUpload={handleImageUpload} maxImages={8} className="w-72" />
//       <div className="flex gap-2 mt-4 mb-12">
//         {images.map((image, index) => (
//           <div key={index} className="relative">
//             <img
//               src={image}
//               alt={`Profile ${index}`}
//               className="w-24 h-16 object-contain rounded-md"
//             />
//             <div
//               className="absolute top-0 right-0 bg-primary flex items-center justify-center text-white text-xs w-3 h-3 rounded-sm cursor-pointer"
//               onClick={() => handleDeleteImage(index)}
//             >
//               ×
//             </div>
//           </div>
//         ))}
//       </div>

//       <h3 className="text-lg font-semibold mb-6">Account Info</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* <InputField
//           label="Profile ID"
//           name="profileId"
//           value={formData.profileId}
//           disabled
//         /> */}
//         <InputField
//           label="Full Name"
//           name="name"
//           value={formData.name}
//         />
//         <InputField
//           label="Email Address"
//           name="email"
//           value={formData.email}
//         />
//         <InputField
//           label="Phone Number"
//           name="phone"
//           value={formData.phone}
//         />
//         {/* <InputField
//           label="Password"
//           name="password"
//           type="password"
//           value={formData.password}
//         /> */}
//       </div>

//       <Button label="Save Changes" className="mt-5" />

//       <h3 className="text-lg font-semibold mt-6 text-darkBlue">
//         Account Deactivation
//       </h3>
//       <Button label="Delete Account" variant="secondary" className="mt-2 border border-red-500 text-red-500" />
//     </div>
//   );
// };

// export default MyAccountTab;
