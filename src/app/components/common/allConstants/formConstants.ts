import { ageOptions, castOptions, cityOptions, degreeOptions, employmentOptions, genderOptions, heightOptions, incomeRangeOptions, maritalStatus, motherTongueOptions, occupationOptions, religionOptions } from "@/constants/dummyConstants";
import { SelectFieldConstantsProps } from "@/types/formTypes";


export const selectFields: SelectFieldConstantsProps = [
    {
      label: "Age",
      name: "age",
      options: ageOptions,
    },
    {
      label: "Gender",
      name: "gender",
      options: genderOptions,
    },
    {
      label: "Height",
      name: "height",
      options: heightOptions,
    },
    {
      label: "Marital Status",
      name: "maritalStatus",
      options: maritalStatus,
    },
    {
      label: "Religion",
      name: "religion",
      options: religionOptions,
    },
    {
      label: "Caste",
      name: "sect",
      options: castOptions,
    },
    {
      label: "Mother Tongue",
      name: "motherTongue",
      options: motherTongueOptions,
    },
    {
      label: "City",
      name: "city",
      options: cityOptions,
    },
  ];


export const selectFieldsPersonal: SelectFieldConstantsProps = [
    {
      label: "Highest Degree",
      name: "hd",
      options: degreeOptions,
    },
    {
      label: "Occupation",
      name: "occupation",
      options: occupationOptions,
    },
    {
      label: "Employment",
      name: "employment",
      options: employmentOptions,
    },
    {
      label: "Annual Income",
      name: "ai",
      options: incomeRangeOptions,
    },
    {
      label: "Work Location",
      name: "wl",
      options: cityOptions,
    },
  ];