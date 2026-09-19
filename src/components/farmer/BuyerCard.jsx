import React from 'react';
import { CheckCircle2, MapPin, Phone, Send, ShieldCheck, Tag } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/StatusBadge';
import { useLanguage } from '../../contexts/LanguageContext';

export const BuyerCard = ({ buyer, onContact, onMakeOffer }) => {
  const { language, t } = useLanguage();
  const name = language === 'te' && buyer.nameTe ? buyer.nameTe : buyer.name;
  const cropRequired = language === 'te' && buyer.cropRequiredTe ? buyer.cropRequiredTe : buyer.cropRequired;

  return (
    <Card hoverable className="border border-slate-200 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
              buyer.type === 'FPO' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {buyer.type}
            </span>
            {buyer.verified && (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified
              </span>
            )}
          </div>
          <h3 className="text-lg font-black text-slate-900 mt-1">{name}</h3>
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{buyer.location}</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold text-slate-400">Offered Rate</span>
          <div className="text-xl font-black text-emerald-800">{buyer.targetPrice}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
        <div>
          <span className="text-slate-400 font-bold block">Crop Required</span>
          <span className="font-extrabold text-slate-800 text-sm">{cropRequired}</span>
        </div>
        <div>
          <span className="text-slate-400 font-bold block">Quantity Needed</span>
          <span className="font-extrabold text-slate-800 text-sm">{buyer.quantityNeeded}</span>
        </div>
      </div>

      <p className="text-xs text-slate-600 line-clamp-2">{buyer.description}</p>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <Button
          variant="outline"
          size="sm"
          icon={Phone}
          onClick={() => onContact(buyer)}
        >
          {t('contactBuyerBtn', 'Contact')}
        </Button>

        <Button
          variant="primary"
          size="sm"
          icon={Send}
          onClick={() => onMakeOffer(buyer)}
        >
          {t('makeOfferBtn', 'Make Offer')}
        </Button>
      </div>
    </Card>
  );
};
