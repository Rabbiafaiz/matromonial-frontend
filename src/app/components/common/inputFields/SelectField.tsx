import { SelectFieldProps } from "@/types/formTypes";
import { ErrorMessage } from "formik";
import React from "react";

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  className = "",
  value,
  onChange,
  error,
  touched,
}) => {
  const normalizedCurrentValue = typeof value === "string" ? value.trim() : "";
  const normalizedOptions = Array.isArray(options) ? options : [];
  const matchedOption = normalizedOptions.find((option) => {
    const optionValue = String(option?.value ?? "").trim();
    const optionLabel = String(option?.label ?? "").trim();
    return (
      optionValue === normalizedCurrentValue || optionLabel === normalizedCurrentValue
    );
  });
  const selectedValue = matchedOption
    ? String(matchedOption.value ?? "").trim()
    : normalizedCurrentValue;

  return (
    <div className={`flex flex-col ${className} mt-4 text-[#949494]`}>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 text-sm text-darkBlue font-semibold leading-5"
        >
          {label}
        </label>
      )}
      <select
        id={name}
        value={selectedValue}
        onChange={onChange}
        className={`px-3 py-2 border border-gray rounded-xl h-12 focus:outline-none bg-white ${
          error && touched ? "border-red-500" : "border-gray"
        }`}
      >
        <option value="">
          Select an option
        </option>
        {normalizedCurrentValue &&
          !matchedOption && (
            <option value={normalizedCurrentValue}>{normalizedCurrentValue}</option>
          )}
        {normalizedOptions.length > 0 && normalizedOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
      {/* {error && touched && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )} */}
    </div>
  );
};

export default SelectField;
