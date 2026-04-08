import React, { ElementType } from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  icon?: ElementType;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "transparent" | "light" | "transparentOrange" | "dark";
  disabled?: boolean;
  className?: string;
  iconColor?: string;
  size?: "sm" | "md" | "lg"
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  icon: Icon,
  iconColor = "",
  size = "lg"
}) => {
  const baseStyle = "flex justify-center items-center gap-1 font-semibold rounded-full";
  const variantStyles = {
    primary:
      "bg-primary text-white hover:bg-orange-700",
    secondary:
      "bg-white border border-primary text-primary hover:bg-gray-300",
    transparent:
      "bg-white text-darkBlue hover:text-blue-900",
    light:
      "bg-lightBlue text-darkBlue hover:text-blue-900",
    dark:
      "bg-darkBlue text-white",
    transparentOrange: "bg-transparent text-primary border border-primary rounded-full"
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-5 py-3',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyles[variant]} ${sizeClasses[size]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {Icon && (
        <span className="mr-2">
          <Icon fill={iconColor} stroke={iconColor} />
          {/* <Icon className={iconColor ? `text-${iconColor}` : ""} /> */}
        </span>
      )}
      <span className="text-nowrap">{label}</span>
    </button>
  );
};

export default Button;
