"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "@/app/components/common/buttons/Button";
import DatePicker from "@/app/components/common/inputFields/DatePicker";
import SelectField from "@/app/components/common/inputFields/SelectField";
import { religionFormFields } from "@/constants/formConstants";
import TimePicker from "@/app/components/common/inputFields/TimePicker";
import InputField from "@/app/components/common/inputFields/InputField";

interface ProfileFormData {
  [key: string]: any; // Allow dynamic keys
}
interface ReligionPanelProps {
  formData: ProfileFormData; // Flexible type to avoid TS errors
  handleFormSubmit: (values: ProfileFormData) => void;
  options: any;
}

const ReligionPanel: React.FC<ReligionPanelProps> = ({
  formData,
  handleFormSubmit,
  options,
}) => {
  const [filteredCasteOptions, setFilteredCasteOptions] = useState([]);
  // Generate validation schema dynamically based on form fields
  const validationSchema = Yup.object({
    ...religionFormFields.reduce((schema, field) => {
      schema[field.name] = Yup.string().required(`${field.label} is required`);
      return schema;
    }, {} as Record<string, Yup.StringSchema>),
    birthTime: Yup.string().required("Birth Time is required"),
  });
  const initialValues: ProfileFormData = {
    ...religionFormFields.reduce((acc, item) => {
      acc[item.name] = formData?.[item.name] || "";
      return acc;
    }, {} as Record<string, string>),
    birthTime: formData?.birthTime || "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        setFieldValue,
      }) => {
        useEffect(() => {
          const selectedReligion = options?.Religion?.find(
            (r: any) => r.value === values.religion
          );

          if (
            selectedReligion &&
            options?.Caste &&
            Array.isArray(options?.Caste) &&
            options?.Caste.length > 0
          ) {
            setFilteredCasteOptions(
              options?.Caste.filter(
                (item: any) => item?.parentId === selectedReligion?._id
              )
            );
          } else {
            setFilteredCasteOptions([]);
          }
        }, [values.religion]);
        return (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {religionFormFields.map((item, i) => {
                const isCasteField = item.label === "Caste";
                const isReligionField = item.label === "Religion";
                const birthPlaceField = item.name === "birthPlace";
                return (
                  <div key={i}>
                    {birthPlaceField ? (
                      <Field
                        as={InputField}
                        label={item.label}
                        placeholder={item.label}
                        name={item.name}
                        value={values[item.name]}
                        onChange={handleChange}
                        error={errors[item.name]}
                        touched={touched[item.name]}
                        className="w-full mt-4"
                      />
                    ) : (
                      <Field
                        as={SelectField}
                        label={item.label}
                        name={item.name}
                        value={values[item.name]}
                        onChange={handleChange}
                        // options={
                        //   options[item.label] || item?.options
                        // }
                        options={
                          isCasteField
                            ? filteredCasteOptions
                            : options[item.label] || item.options
                        }
                        error={errors[item.name]}
                        touched={touched[item.name]}
                        className="w-full"
                      />
                    )}
                  </div>
                );
              })}

              {/* Birth Time Picker */}
              <div>
                <Field
                  as={TimePicker}
                  label="Birth Time"
                  name="birthTime"
                  value={values.birthTime}
                  onChange={handleChange}
                  error={errors.birthTime}
                  touched={touched.birthTime}
                  className="w-full"
                />
              </div>
            </div>
            <Button
              type="submit"
              label={isSubmitting ? "Saving..." : "Save Changes"}
              className="mt-5 md:w-auto w-full"
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default ReligionPanel;
