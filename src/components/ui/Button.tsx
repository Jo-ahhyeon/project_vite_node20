import React from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "square";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200  focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantStyles = {
    primary: "bg-main-primary text-button text-white hover:opacity-85 focus:ring-black rounded-50",
    secondary: "text-gray-800 hover:bg-[#FFFFFF30] focus:ring-gray-400",
    square: "border text-white text-sm hover:bg-[#FFFFFF30]",
    outline: "border text-white text-button hover:bg-[#FFFFFF30] rounded-50",
    ghost: "text-gray-800 hover:bg-gray-100 focus:ring-gray-200",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5",
    md: "px-md py-sm",
    lg: "px-12 py-5",
    xl: "px-20 py-5",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        isLoading && "opacity-70 cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
