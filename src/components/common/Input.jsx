import React from 'react';

export const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  icon: Icon,
  helpText,
  className = ''
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-semibold text-slate-800">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-700">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full touch-target rounded-xl border bg-white px-4 text-base font-medium text-slate-900 placeholder:text-slate-400
            focus:outline-none focus:ring-4 transition-colors
            ${Icon ? 'pl-11' : 'pl-4'}
            ${error 
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100' 
              : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-100'}
          `}
        />
      </div>
      {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
      {helpText && !error && <p className="text-xs text-slate-500">{helpText}</p>}
    </div>
  );
};
