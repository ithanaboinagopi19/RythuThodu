import React from 'react';
import { Card } from '../common/Card';
import { useLanguage } from '../../contexts/LanguageContext';

export const CropCard = ({ crop, selected = false, onSelect }) => {
  const { language } = useLanguage();
  const displayName = language === 'te' && crop.nameTe ? crop.nameTe : crop.name;

  return (
    <Card
      hoverable
      onClick={() => onSelect(crop.id)}
      className={`
        text-center flex flex-col items-center justify-center p-4 transition-all
        ${selected 
          ? 'border-3 border-emerald-600 bg-emerald-50 shadow-md ring-4 ring-emerald-100 scale-[1.02]' 
          : 'border border-slate-200 hover:border-emerald-300'}
      `}
    >
      <span className="text-4xl mb-2 select-none" role="img" aria-label={crop.name}>
        {crop.icon}
      </span>
      <h4 className="text-base font-extrabold text-slate-900">{displayName}</h4>
      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mt-0.5">
        {crop.category}
      </span>
    </Card>
  );
};
