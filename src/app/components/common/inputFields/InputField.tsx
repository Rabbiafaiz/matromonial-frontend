"use client";
import React, { ChangeEvent, ElementType, useState } from "react";
import { EyeClose, EyeOpen } from "../allImages/AllImages";

type InputFieldProps = {
  label?: string;
  name: string;
  type?: "text" | "email" | "password" | "number" | "textarea";
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  classNameLabel?: string;
  icon?: ElementType;
  disabled?: boolean;
  error?: string;
  touched?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  classNameLabel = "",
  icon: Icon,
  disabled = false,
  error,
  touched,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`mb-2 text-sm text-darkBlue font-semibold ${classNameLabel}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${Icon && "pl-10 "} px-3 py-2 border ${
              error && touched ? "border-red-500" : "border-gray"
            } rounded-xl h-28 focus:outline-none w-full placeholder:text-top`}
          />
        ) : (
          <input
            type={type === "password" && showPassword ? "text" : type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${Icon && "pl-10 "} px-3 py-2 border ${
              error && touched ? "border-red-500" : "border-gray"
            } rounded-xl h-12 focus:outline-none w-full pr-10`}
          />
        )}
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon width={20} height={20} />
          </div>
        )}
        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeClose size={20} /> : <EyeOpen size={20} />}
          </button>
        )}
      </div>
      {/* Display error message if error exists and the field has been touched */}
      {error && touched && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
    </div>
  );
};

export default InputField;
