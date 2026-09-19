import React from 'react';

export const Card = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  bordered = true,
  padding = 'p-4 sm:p-6'
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-2xl shadow-sm transition-all duration-200
        ${bordered ? 'border border-emerald-900/10' : ''}
        ${hoverable ? 'hover:shadow-md hover:border-emerald-500/40 cursor-pointer active:scale-[0.99]' : ''}
        ${padding}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
