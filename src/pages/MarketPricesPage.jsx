import React, { useState, useEffect } from 'react';
import { TrendingUp, MapPin, Calendar, Sparkles, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MarketPriceCard } from '../components/farmer/MarketPriceCard';
import { PriceTrendChart } from '../components/farmer/PriceTrendChart';
import { Select } from '../components/common/Select';
import { Card } from '../components/common/Card';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { api } from '../services/api';
import { CROPS } from '../data/mockData';

export const MarketPricesPage = () => {
  const { t } = useLanguage();

  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      try {
        const data = await api.getMarketPrices({ crop: selectedCrop, district: selectedDistrict });
        setPrices(data);
      } catch (e) {
        console.error("Error fetching market prices:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, [selectedCrop, selectedDistrict]);

  // Compute stats metrics
  const lowestPrice = prices.length > 0 ? Math.min(...prices.map(p => p.pricePerKg)) : 0;
  const highestPrice = prices.length > 0 ? Math.max(...prices.map(p => p.pricePerKg)) : 0;
  const averagePrice = prices.length > 0 ? Math.round((prices.reduce((a, b) => a + b.pricePerKg, 0) / prices.length) * 10) / 10 : 0;

  const cropOptions = [
    { value: 'all', label: 'All Crops' },
    ...CROPS.map(c => ({ value: c.name, label: `${c.icon} ${c.name}` }))
  ];

  const districtOptions = [
    { value: 'all', label: 'All Districts' },
    { value: 'Guntur', label: 'Guntur' },
    { value: 'Krishna', label: 'Krishna / Vijayawada' },
    { value: 'Kurnool', label: 'Kurnool' },
    { value: 'Warangal', label: 'Warangal' },
    { value: 'Nizamabad', label: 'Nizamabad' },
    { value: 'Anantapur', label: 'Anantapur' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-900">
          {t('marketPricesTitle', 'Mandi Market Prices')}
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          {t('marketPricesSubtitle', 'Compare rates across regional agricultural markets to maximize your crop revenue.')}
        </p>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{t('mockDataLabel', 'Demo Mandi Data — Prices updated daily')}</span>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 bg-white border border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label={t('selectCrop', 'Filter by Crop')}
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            options={cropOptions}
            icon={Filter}
          />

          <Select
            label={t('selectDistrict', 'Filter by District')}
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            options={districtOptions}
            icon={MapPin}
          />
        </div>
      </Card>

      {/* High / Low / Average Summary Header Bar */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <Card className="p-4 bg-emerald-50 border border-emerald-200">
          <span className="text-xs font-bold text-emerald-800 uppercase block">{t('lowestPrice', 'Lowest Price')}</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-900">₹{lowestPrice} <span className="text-xs">/ kg</span></span>
        </Card>

        <Card className="p-4 bg-amber-50 border border-amber-200">
          <span className="text-xs font-bold text-amber-800 uppercase block">{t('highestPrice', 'Highest Price')}</span>
          <span className="text-xl sm:text-2xl font-black text-amber-900">₹{highestPrice} <span className="text-xs">/ kg</span></span>
        </Card>

        <Card className="p-4 bg-blue-50 border border-blue-200">
          <span className="text-xs font-bold text-blue-800 uppercase block">{t('averagePrice', 'Average Price')}</span>
          <span className="text-xl sm:text-2xl font-black text-blue-900">₹{averagePrice} <span className="text-xs">/ kg</span></span>
        </Card>
      </div>

      {/* 7-Day Price Trend Visualizer Chart */}
      <PriceTrendChart cropName={selectedCrop === 'all' ? 'Tomato' : selectedCrop} />

      {/* Mandi Cards List */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-slate-900">
          Today's Mandi Price Listings ({prices.length} Markets)
        </h3>

        {loading ? (
          <LoadingState message="Loading mandi market prices..." />
        ) : prices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prices.map((item) => (
              <MarketPriceCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Market Prices Found"
            description="No price records matching your selected crop or district filter."
            actionText="Reset Filters"
            onAction={() => { setSelectedCrop('all'); setSelectedDistrict('all'); }}
          />
        )}
      </div>

    </div>
  );
};
