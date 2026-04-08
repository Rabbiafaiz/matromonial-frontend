"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "@/app/components/common/buttons/Button";
import SelectField from "@/app/components/common/inputFields/SelectField";
import { dropdownOptions } from "@/constants/dummyConstants";
import { educationFields } from "@/constants/formConstants";

interface ProfileFormData {
  [key: string]: any; // Allow dynamic keys
}
interface EducationPanelProps {
  formData: ProfileFormData; // Prevents TypeScript index errors
  handleFormSubmit: (values: ProfileFormData) => void;
  options: any;
}

const EducationPanel: React.FC<EducationPanelProps> = ({
  formData,
  handleFormSubmit,
  options
}) => {
  // Generate validation schema dynamically
  const validationSchema = Yup.object().shape(
    educationFields.reduce((schema, field) => {
      schema[field.name] = Yup.string().required(`${field.label} is required`);
      return schema;
    }, {} as Record<string, Yup.StringSchema>)
  );

  return (
    <Formik
      initialValues={{
        ...educationFields.reduce((acc, item) => {
          acc[item.name] = formData?.[item.name] || "";
          return acc;
        }, {} as ProfileFormData),
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ values, errors, isSubmitting, touched, handleChange }) => (
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educationFields.map((item, i) => (
              <div key={i}>
                <Field
                  as={SelectField}
                  label={item.label}
                  name={item.name}
                  value={values[item.name]}
                  onChange={handleChange}
                  options={options[item.label] || item.options}
                  error={errors[item.name]}
                  touched={touched[item.name]}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          <Button
            type="submit"
            label={isSubmitting ? "Saving..." : "Save Changes"}
            className="mt-5 md:w-auto w-full"
          />
        </Form>
      )}
    </Formik>
  );
};

export default EducationPanel;
