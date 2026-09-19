import React from 'react';
import { Sprout } from 'lucide-react';

export const LoadingState = ({ message = "Loading agricultural data..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4 text-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-emerald-600">
          <Sprout className="w-6 h-6 animate-pulse" />
        </div>
      </div>
      <p className="text-base font-semibold text-slate-700">{message}</p>
    </div>
  );
};
