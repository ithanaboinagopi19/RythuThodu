import React from 'react';
import { Snowflake, MapPin, Phone, ShieldCheck, Thermometer } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useLanguage } from '../../contexts/LanguageContext';

export const StorageCard = ({ facility, onRequestBooking }) => {
  const { language, t } = useLanguage();
  const name = language === 'te' && facility.nameTe ? facility.nameTe : facility.name;

  return (
    <Card hoverable className="border border-slate-200 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-black text-cyan-800 bg-cyan-100 px-2.5 py-0.5 rounded-full">
              <Snowflake className="w-3.5 h-3.5 text-cyan-600" /> Cold Warehouse
            </span>
            <span className="text-xs font-bold text-slate-500">{facility.distanceKm} km away</span>
          </div>
          <h3 className="text-lg font-black text-slate-900 mt-1">{name}</h3>
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{facility.location}</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold text-slate-400">Monthly Rate</span>
          <div className="text-lg font-black text-emerald-800">{facility.priceRate}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-cyan-50/60 border border-cyan-100 text-xs">
        <div>
          <span className="text-slate-500 font-bold block">{t('availableCap', 'Available Space')}</span>
          <span className="text-base font-black text-cyan-900">{facility.availableCapacityMT} MT</span>
        </div>
        <div>
          <span className="text-slate-500 font-bold block">{t('totalCap', 'Total Capacity')}</span>
          <span className="text-base font-bold text-slate-700">{facility.totalCapacityMT} MT</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-slate-600">
        <Thermometer className="w-4 h-4 text-cyan-600" />
        <span><strong>{t('tempControl', 'Temp')}:</strong> {facility.tempRange}</span>
      </div>

      <div className="flex flex-wrap gap-1">
        {facility.supportedCrops.map((crop, idx) => (
          <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-semibold rounded-md">
            {crop}
          </span>
        ))}
      </div>

      <div className="pt-2">
        <Button
          fullWidth
          variant="primary"
          size="md"
          icon={Snowflake}
          onClick={() => onRequestBooking(facility)}
        >
          {t('requestBookingBtn', 'Request Storage Space')}
        </Button>
      </div>
    </Card>
  );
};
