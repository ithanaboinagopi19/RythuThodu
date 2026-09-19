import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon,
  className = ''
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 touch-target focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg focus:ring-emerald-300 border border-emerald-700",
    secondary: "bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg focus:ring-amber-300 border border-amber-700",
    outline: "bg-white hover:bg-emerald-50 text-emerald-800 border-2 border-emerald-600 focus:ring-emerald-200",
    ghost: "bg-transparent hover:bg-emerald-100/50 text-emerald-900 focus:ring-emerald-200",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow focus:ring-red-300 border border-red-700"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm gap-1.5",
    md: "px-5 py-3 text-base gap-2 font-bold",
    lg: "px-6 py-4 text-lg gap-2.5 font-bold"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 shrink-0" />}
      <span>{children}</span>
    </button>
  );
};
