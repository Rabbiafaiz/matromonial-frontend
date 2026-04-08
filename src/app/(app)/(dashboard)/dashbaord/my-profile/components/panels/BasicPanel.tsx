"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "@/app/components/common/buttons/Button";
import SelectField from "@/app/components/common/inputFields/SelectField";
import { basicPanelFormFields } from "@/constants/formConstants";

interface ProfileFormData {
  [key: string]: any; // Allow dynamic keys
}
interface BasicPanelProps {
  formData: ProfileFormData; // Flexible type to avoid TS errors
  handleFormSubmit: (values: ProfileFormData) => void;
  options: any;
}

const BasicPanel: React.FC<BasicPanelProps> = ({
  formData,
  handleFormSubmit,
  options
}) => {
  // Generate validation schema dynamically based on form fields
  const validationSchema = Yup.object().shape(
    basicPanelFormFields.reduce((schema, field) => {
      if (field.isRange) {
        schema[`${field.name}From`] = Yup.string().required(
          `${field.label} From is required`
        );
        schema[`${field.name}To`] = Yup.string().required(
          `${field.label} To is required`
        );
      } else {
        schema[field.name] = Yup.string().required(
          `${field.label} is required`
        );
      }
      return schema;
    }, {} as Record<string, Yup.StringSchema>)
  );

  return (
    <Formik
      initialValues={{
        // ...basicPanelFormFields.reduce((acc, item) => {
        //   acc[item.name] = formData?.[item.name] || "";
        //   return acc;
        // }, {} as ProfileFormData),
        ...basicPanelFormFields.reduce((acc, item) => {
          if (item.isRange) {
            acc[`${item.name}From`] = formData?.[`${item.name}From`] || "";
            acc[`${item.name}To`] = formData?.[`${item.name}To`] || "";
          } else {
            acc[item.name] = formData?.[item.name] || "";
          }
          console.log(acc);

          return acc;
        }, {} as ProfileFormData),
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ values, errors, touched, isSubmitting, handleChange }) => (
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {basicPanelFormFields.map((item, i) => (
              <div
                key={i}
                className={
                  item.isRange ? "grid grid-cols-2 gap-2 items-end" : ""
                }
              >
                <Field
                  as={SelectField}
                  label={item.label}
                  name={item.isRange ? `${item.name}From` : item.name}
                  value={
                    item.isRange
                      ? values[`${item.name}From`]
                      : values[item.name]
                  }
                  onChange={handleChange}
                  options={options[item.label] || item.options}
                  error={
                    item.isRange
                      ? errors[`${item.name}From`]
                      : errors[item.name]
                  }
                  touched={
                    item.isRange
                      ? touched[`${item.name}From`]
                      : touched[item.name]
                  }
                  className="w-full"
                />

                {/* Range "To" Select Field (if applicable) */}
                {item.isRange && (
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor={`${item.name}To`}
                      className="text-sm text-darkBlue font-semibold leading-5 mt-2"
                    >
                      To
                    </label>
                    <Field
                      as={SelectField}
                      name={`${item.name}To`}
                      value={values[`${item.name}To`]}
                      onChange={handleChange}
                      options={item.options}
                      error={errors[`${item.name}To`]}
                      touched={touched[`${item.name}To`]}
                      className="w-full"
                    />
                  </div>
                )}
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

export default BasicPanel;
