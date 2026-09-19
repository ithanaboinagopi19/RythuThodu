import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../common/Button';

export const LanguageSelector = ({ onSelectComplete }) => {
  const { language, setLanguage, languages } = useLanguage();

  const handleSelect = (code) => {
    setLanguage(code);
    if (onSelectComplete) {
      onSelectComplete(code);
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {languages.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`
                touch-target p-5 rounded-2xl border-2 text-center flex flex-col items-center justify-center space-y-1.5 transition-all relative
                ${isSelected 
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md ring-4 ring-emerald-100 scale-[1.02]' 
                  : 'border-slate-200 bg-white hover:border-emerald-400 text-slate-800'}
              `}
            >
              {isSelected && (
                <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              )}
              <span className="text-3xl select-none">{lang.flag}</span>
              <span className="text-xl font-black">{lang.nativeName}</span>
              <span className="text-xs font-bold text-slate-500">{lang.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
