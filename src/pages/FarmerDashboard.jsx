import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera,
  TrendingUp,
  Users,
  Snowflake,
  Truck,
  AlertTriangle,
  Sun,
  CloudRain,
  MapPin,
  ChevronRight,
  Sparkles,
  PlusCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppData } from '../contexts/AppDataContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { MARKET_PRICES, BUYERS } from '../data/mockData';

export const FarmerDashboard = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { diagnoses, listings } = useAppData();
  const navigate = useNavigate();

  const latestDiagnosis = diagnoses.length > 0 ? diagnoses[0] : null;
  const featuredPrice = MARKET_PRICES.find(m => m.crop.toLowerCase() === (user.mainCrop || 'tomato').toLowerCase()) || MARKET_PRICES[0];
  const featuredBuyer = BUYERS.find(b => b.cropRequired.toLowerCase().includes((user.mainCrop || 'tomato').toLowerCase())) || BUYERS[0];

  const quickActionCards = [
    {
      title: t('checkCropCard', 'Check Crop'),
      desc: t('checkCropDesc', 'Scan photo for pests & diseases'),
      icon: Camera,
      color: "bg-emerald-600 text-white",
      link: "/crop-disease"
    },
    {
      title: t('marketPriceCard', 'Market Price'),
      desc: t('marketPriceDesc', "Check today's mandi rates"),
      icon: TrendingUp,
      color: "bg-blue-600 text-white",
      link: "/market-prices"
    },
    {
      title: t('findBuyerCard', 'Find Buyer'),
      desc: t('findBuyerDesc', 'Connect with FPOs & trade'),
      icon: Users,
      color: "bg-purple-600 text-white",
      link: "/buyers-fpo"
    },
    {
      title: t('findStorageCard', 'Find Storage'),
      desc: t('findStorageDesc', 'Locate cold warehouses'),
      icon: Snowflake,
      color: "bg-cyan-600 text-white",
      link: "/cold-storage"
    },
    {
      title: t('findTransportCard', 'Find Transport'),
      desc: t('findTransportDesc', 'Book local freight trucks'),
      icon: Truck,
      color: "bg-amber-600 text-white",
      link: "/logistics"
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      
      {/* Welcome Banner Card */}
      <Card className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
              {t('roleFarmer', 'Farmer')} Dashboard
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {t('welcome', 'Welcome back')}, {user?.name || 'Ramesh Kumar'} 👋
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-100 pt-1">
              <span className="flex items-center gap-1 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {user?.village || 'Tadikonda'}, {user?.district || 'Guntur'}
              </span>
              <span className="bg-emerald-800/80 px-2.5 py-0.5 rounded-full font-bold border border-emerald-700">
                {t('currentCrop', 'Crop')}: 🍅 {user?.mainCrop || 'Tomato'}
              </span>
            </div>
          </div>

          <Button
            variant="secondary"
            size="md"
            icon={PlusCircle}
            onClick={() => navigate('/sell-produce')}
            className="shrink-0 shadow-lg"
          >
            {t('navSell', 'Sell Produce')}
          </Button>
        </div>
      </Card>

      {/* Weather Forecast Widget */}
      <Card className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 flex items-center justify-center text-amber-300 shrink-0">
            <Sun className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-sm font-bold">{t('weatherTitle', 'Weather Forecast')} — Guntur</h4>
            <p className="text-xs text-blue-200">Sunny, 31°C | Humidity 65% | Light breeze</p>
          </div>
        </div>
        <div className="hidden sm:block text-right text-xs text-blue-300 font-semibold">
          No rain expected today
        </div>
      </Card>

      {/* Farming Alert Banner */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-semibold shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <strong className="text-sm font-bold text-amber-900 block">
            {t('farmingAlert', 'Farming Alert')}: High Humidity Notice
          </strong>
          <p>
            {language === 'te' 
              ? 'వాతావరణంలో తేమ శాతం ఎక్కువగా ఉన్నందున టమాటా మరియు మిర్చి పంటలపై ఆకు మచ్చ తెగులు వచ్చే అవకాశం ఉంది.' 
              : 'High morning humidity increases late blight risk in tomatoes and chilli. Inspect leaf bottoms today.'}
          </p>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="space-y-3">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <span>{t('quickActions', 'Quick Actions')}</span>
          <span className="text-xs font-semibold text-slate-500">(Tap to open)</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickActionCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Card
                key={idx}
                hoverable
                onClick={() => navigate(card.link)}
                className="p-4 flex flex-col justify-between space-y-3 border-2 border-slate-200 hover:border-emerald-600 group transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold leading-snug mt-0.5">
                    {card.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Dashboard Summaries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Recent Diagnosis Summary */}
        <Card hoverable onClick={() => navigate('/crop-disease')} className="space-y-3 border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">
              {t('recentDiagnosis', 'Recent Crop Scan')}
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {latestDiagnosis ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-900">{latestDiagnosis.disease}</span>
                <StatusBadge status={`${Math.round(latestDiagnosis.confidence * 100)}% Match`} variant="warning" />
              </div>
              <p className="text-xs text-slate-600 font-medium">Crop: {latestDiagnosis.crop} | Scan Date: {latestDiagnosis.createdAt}</p>
              <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 pt-1">
                <span>View Treatment Plan</span> →
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-2">No recent crop scan recorded. Tap "Check Crop" to scan now.</p>
          )}
        </Card>

        {/* Latest Market Price Summary */}
        <Card hoverable onClick={() => navigate('/market-prices')} className="space-y-3 border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">
              {t('latestPrice', 'Latest Market Price')}
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-slate-900">{featuredPrice.crop} ({featuredPrice.variety})</span>
              <span className="text-base font-black text-emerald-800">₹{featuredPrice.pricePerKg} / kg</span>
            </div>
            <p className="text-xs text-slate-600">{featuredPrice.market}</p>
            <div className="text-[11px] font-bold text-emerald-700">
              +{featuredPrice.changePct}% vs yesterday | ₹{featuredPrice.pricePerQuintal} / quintal
            </div>
          </div>
        </Card>

        {/* Featured Buyer Summary */}
        <Card hoverable onClick={() => navigate('/buyers-fpo')} className="space-y-3 border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">
              {t('nearbyBuyer', 'Featured Buyer / FPO')}
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">{featuredBuyer.type}</span>
              <span className="text-sm font-black text-emerald-800">{featuredBuyer.targetPrice}</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">{featuredBuyer.name}</h4>
            <p className="text-xs text-slate-600">Requires {featuredBuyer.quantityNeeded} {featuredBuyer.cropRequired}</p>
          </div>
        </Card>

      </div>

    </div>
  );
};
