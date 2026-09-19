import React from 'react';

export const StatusBadge = ({ status, variant = 'info' }) => {
  const variants = {
    success: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    warning: 'bg-amber-100 text-amber-900 border-amber-300',
    danger: 'bg-red-100 text-red-800 border-red-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
    neutral: 'bg-slate-100 text-slate-700 border-slate-300'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${variants[variant]}`}>
      {status}
    </span>
  );
};
