import React from 'react';
import { TrendingUp, TrendingDown, MapPin, Calendar } from 'lucide-react';
import { Card } from '../common/Card';
import { useLanguage } from '../../contexts/LanguageContext';

export const MarketPriceCard = ({ item }) => {
  const { language } = useLanguage();
  const cropName = language === 'te' && item.cropTe ? item.cropTe : item.crop;
  const isPositive = item.changePct >= 0;

  return (
    <Card hoverable className="border border-slate-200 hover:border-emerald-500 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">{cropName}</span>
          <h4 className="text-lg font-black text-slate-900 leading-tight">{item.market}</h4>
          <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{item.district}, {item.state}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-black text-emerald-800">
            ₹{item.pricePerKg} <span className="text-xs font-bold text-slate-500">/ kg</span>
          </div>
          <div className="text-xs font-bold text-slate-600">
            ₹{item.pricePerQuintal.toLocaleString('en-IN')} / quintal
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
        <div className="flex items-center gap-1">
          {isPositive ? (
            <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              <TrendingUp className="w-3.5 h-3.5" /> +{item.changePct}%
            </span>
          ) : (
            <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-red-100 text-red-800">
              <TrendingDown className="w-3.5 h-3.5" /> {item.changePct}%
            </span>
          )}
          <span className="text-slate-400 font-normal">vs yesterday</span>
        </div>

        <div className="flex items-center gap-1 text-slate-400 font-medium">
          <Calendar className="w-3.5 h-3.5" />
          <span>{item.updated}</span>
        </div>
      </div>
    </Card>
  );
};
