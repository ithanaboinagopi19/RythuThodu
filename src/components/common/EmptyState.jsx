import React from 'react';
import { Leaf } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  title = "No data found",
  description = "There are no records matching your current filter.",
  actionText,
  onAction,
  icon: Icon = Leaf
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border border-dashed border-slate-300 rounded-3xl text-center space-y-3">
      <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
        <Icon className="w-7 h-7" />
      </div>
      <h4 className="text-lg font-bold text-slate-800">{title}</h4>
      <p className="text-sm text-slate-600 max-w-sm">{description}</p>
      {actionText && onAction && (
        <div className="pt-2">
          <Button onClick={onAction} variant="primary" size="sm">
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};
