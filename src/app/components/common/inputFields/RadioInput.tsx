import React from 'react';

type RadioFieldProps = {
  name: string;
  value?: string;
  label: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
};

const RadioField: React.FC<RadioFieldProps> = ({
  name,
  value,
  checked,
  label,
  onChange,
  className = '',
  disabled = false,
}) => {
  const handleChange = (optionValue: string | undefined) => {
    if(optionValue)
    onChange?.(optionValue);
  };

  return (
    <div className={`flex gap-4 ${className}`}>
        <label
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="relative flex items-center">
            <input
              type="radio"
              name={name}
              value={value}
              checked={checked}
              onChange={() => handleChange(value)}
              disabled={disabled}
              className="appearance-none w-4 h-4 rounded-full border border-gray checked:border-4 checked:border-primary cursor-pointer"
            />
          </div>
          <span className="text-sm text-gray-700">{label}</span>
        </label>
    </div>
  );
};

export default RadioField;