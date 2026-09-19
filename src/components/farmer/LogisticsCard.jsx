import React from 'react';
import { Truck, MapPin, Phone, Star } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useLanguage } from '../../contexts/LanguageContext';

export const LogisticsCard = ({ provider, onBookVehicle }) => {
  const { language, t } = useLanguage();
  const name = language === 'te' && provider.nameTe ? provider.nameTe : provider.name;

  return (
    <Card hoverable className="border border-slate-200 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
              <Truck className="w-3.5 h-3.5 text-amber-700" /> Transporter
            </span>
            <span className="text-xs font-bold text-slate-500">{provider.distanceKm} km away</span>
          </div>
          <h3 className="text-lg font-black text-slate-900 mt-1">{name}</h3>
        </div>

        <div className="flex items-center gap-1 text-xs font-black bg-slate-100 px-2.5 py-1 rounded-lg">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{provider.rating}</span>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Available Vehicles</span>
        <div className="space-y-1.5">
          {provider.vehicles.map((v, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-xs border border-slate-100">
              <div>
                <span className="font-extrabold text-slate-800 block">{v.type}</span>
                <span className="text-slate-500 font-medium">Capacity: {v.capacity}</span>
              </div>
              <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {v.baseRate}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <Button
          fullWidth
          variant="primary"
          size="md"
          icon={Truck}
          onClick={() => onBookVehicle(provider)}
        >
          {t('bookVehicleBtn', 'Request Quote / Book')}
        </Button>
      </div>
    </Card>
  );
};
