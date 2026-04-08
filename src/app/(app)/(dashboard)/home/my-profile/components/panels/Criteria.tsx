"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "@/app/components/common/buttons/Button";
import InputField from "@/app/components/common/inputFields/InputField";
import { FormData } from "@/types/formTypes";

interface CriteriaPanelProps {
  formData: FormData; // Prevents TypeScript index errors
  handleFormSubmit: (values: FormData) => void;
}

const CriteriaPanel: React.FC<CriteriaPanelProps> = ({ formData, handleFormSubmit }) => {
  // Validation schema
  const validationSchema = Yup.object().shape({
    partnerExpectation: Yup.string()
      .required("Partner Expectation is required"),
  });

  return (
    <Formik
      initialValues={{partnerExpectation: formData?.partnerExpectation}}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ values, errors, touched, isSubmitting, handleChange }) => (
        <Form>
          <div>
            <Field
              as={InputField}
              type="textarea"
              label="Partner Expectation"
              name="partnerExpectation"
              value={values.partnerExpectation}
              onChange={handleChange}
              error={errors.partnerExpectation}
              touched={touched.partnerExpectation}
              className="w-full"
            />
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

export default CriteriaPanel;
