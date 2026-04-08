"use client";
import { selectFields } from "@/app/components/common/allConstants/formConstants";
import DatePicker from "@/app/components/common/inputFields/DatePicker";
import InputField from "@/app/components/common/inputFields/InputField";
import SelectField from "@/app/components/common/inputFields/SelectField";
import React, { useEffect, useState } from "react";
import { Field } from "formik";

interface PersonalDetailsProps {
  values: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  errors: any;
  touched: any;
  options: any;
}

const BasicInfoForm: React.FC<PersonalDetailsProps> = ({
  values,
  handleChange,
  errors,
  touched,
  options,
}) => {
  const [filteredCasteOptions, setFilteredCasteOptions] = useState([]);

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
    <>
      <h2 className="text-[24px] leading-[28.8px] text-darkBlue font-semibold w-full">
        Basic Info
      </h2>
      <Field
        as={InputField}
        label="Full Name"
        name="fullName"
        value={values.fullName}
        placeholder="Full Name"
        className="w-full sm:w-[47%] mt-4"
        error={errors.fullName}
        touched={touched.fullName}
      />
      <Field
        as={DatePicker}
        // onChange={handleChange}
        value={values.dob}
        name="dateOfBirth"
        label="Date Of Birth"
        className="w-full sm:w-[47%]"
        error={errors.dateOfBirth}
        touched={touched.dateOfBirth}
      />
      {selectFields?.map((fieldData, i) => {
        const isCasteField = fieldData.label === "Caste";
        return (
          <Field
            key={i}
            as={SelectField}
            label={fieldData.label}
            name={fieldData.name}
            value={values[fieldData.name]}
            // onChange={handleChange}
            options={
              isCasteField ? filteredCasteOptions : options[fieldData.label] || fieldData.options
            }
            className="w-full sm:w-[47%]"
            error={errors[fieldData.name]}
            touched={touched[fieldData.name]}
          />
        );
      })}
    </>
  );
};

export default BasicInfoForm;
