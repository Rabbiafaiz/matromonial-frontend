"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "@/app/components/common/buttons/Button";
import SelectField from "@/app/components/common/inputFields/SelectField";
import { dropdownOptions } from "@/constants/dummyConstants";
import { personalPanelFields } from "@/constants/formConstants";
interface ProfileFormData {
  [key: string]: any; // Allow dynamic keys
}
interface PersonalPanelProps {
  formData: ProfileFormData; // Flexible type for formData
  handleFormSubmit: (values: Record<string, string>) => void;
  options: any;
}

const PersonalPanel: React.FC<PersonalPanelProps> = ({
  formData,
  handleFormSubmit,
  options,
}) => {
  return (
    <Formik
      initialValues={{
        ...personalPanelFields.reduce((acc, item) => {
          acc[item.name] = formData?.[item.name] || "";
          return acc;
        }, {} as ProfileFormData),
      }}
      validationSchema={Yup.object().shape(
        personalPanelFields.reduce((schema, field) => {
          schema[field.name] = Yup.string().required(
            `${field.label} is required`
          );
          return schema;
        }, {} as Record<string, Yup.StringSchema>)
      )}
      onSubmit={handleFormSubmit}
    >
      {({ values, errors, touched, isSubmitting, handleChange }) => (
        <Form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalPanelFields.map((item, i) => (
              <div key={i}>
                <Field
                  as={SelectField}
                  label={item.label}
                  name={item.name}
                  value={values[item.name]}
                  onChange={handleChange}
                  options={
                    options[item.label] ||
                    (item.name === "workLocation" && options?.City) || (item.name === "highestDegree" && options?.Education) ||
                    item.options
                  }
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

export default PersonalPanel;
