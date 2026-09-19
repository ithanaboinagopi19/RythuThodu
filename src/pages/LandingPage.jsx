import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sprout,
  Pill,
  TrendingUp,
  Users,
  Snowflake,
  Truck,
  ArrowRight,
  Globe,
  ShieldCheck,
  Smartphone,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const LandingPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const features = [
    {
      icon: Sprout,
      color: "bg-emerald-100 text-emerald-700",
      title: t('featureCropTitle', 'Crop Disease Detection'),
      desc: t('featureCropDesc', 'Snap or upload a photo of affected leaf to instantly detect pests & diseases with treatment advice.'),
      link: '/crop-disease'
    },
    {
      icon: Pill,
      color: "bg-amber-100 text-amber-800",
      title: t('featureTreatmentTitle', 'Treatment Guidance'),
      desc: t('featureTreatmentDesc', 'Step-by-step organic remedies & recommended chemical sprays with safety instructions.'),
      link: '/treatment/DIS-TOM-01'
    },
    {
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-800",
      title: t('featureMarketTitle', 'Market Prices'),
      desc: t('featureMarketDesc', 'Check live mandi rates, price trends, highest/lowest prices across nearby market yards.'),
      link: '/market-prices'
    },
    {
      icon: Users,
      color: "bg-purple-100 text-purple-800",
      title: t('featureBuyersTitle', 'Buyers & FPOs'),
      desc: t('featureBuyersDesc', 'Connect directly with verified wholesale buyers and Farmer Producer Organizations without middlemen.'),
      link: '/buyers-fpo'
    },
    {
      icon: Snowflake,
      color: "bg-cyan-100 text-cyan-800",
      title: t('featureStorageTitle', 'Cold Storage'),
      desc: t('featureStorageDesc', 'Find nearby temperature-controlled warehouses, check available capacity and daily rates.'),
      link: '/cold-storage'
    },
    {
      icon: Truck,
      color: "bg-orange-100 text-orange-800",
      title: t('featureLogisticsTitle', 'Logistics & Transport'),
      desc: t('featureLogisticsDesc', 'Book local pickups, mini trucks, and tractors for seamless produce delivery.'),
      link: '/logistics'
    }
  ];

  return (
    <div className="min-h-screen space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 rounded-b-[2.5rem] shadow-xl">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black tracking-wide">
              <Sprout className="w-4 h-4 text-amber-400" />
              <span>{t('demoNote', 'Website MVP Demo — Built for Small & Marginal Farmers')}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              {t('heroTitle', 'Your Digital Farming Assistant')}
            </h1>

            <p className="text-base sm:text-xl text-emerald-100 font-medium max-w-2xl leading-relaxed">
              {t('heroSubtitle', 'Identify crop problems, understand market prices, find buyers, storage and transport – all in one place.')}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start">
              <Button
                variant="secondary"
                size="lg"
                icon={ArrowRight}
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto shadow-xl"
              >
                {t('getStarted', 'Get Started')}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const el = document.getElementById('features-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/40"
              >
                {t('exploreFeatures', 'Explore Features')}
              </Button>
            </div>

            {/* Language Banner Button */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-2">
              <button
                onClick={() => navigate('/language')}
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-200 hover:text-amber-300 underline underline-offset-4"
              >
                <Globe className="w-4 h-4" />
                <span>Change Language (తెలుగు / हिन्दी / English)</span>
              </button>
            </div>
          </div>

          {/* Hero Right Visual Banner / Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-emerald-950/60 p-4 rounded-3xl border border-emerald-700/50 shadow-2xl backdrop-blur-xs">
              <img
                src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&auto=format&fit=crop&q=80"
                alt="Farmer inspecting crop health"
                className="w-full h-64 sm:h-72 object-cover rounded-2xl shadow-inner border border-emerald-600/30"
              />
              <div className="absolute -bottom-4 -left-4 bg-white text-slate-900 p-3 rounded-2xl shadow-xl border border-emerald-200 flex items-center gap-3 max-w-[220px]">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold shrink-0">
                  92%
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">AI Diagnosis</span>
                  <span className="text-xs font-black text-slate-900">Tomato Late Blight</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Cards Grid */}
      <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Complete Crop-to-Market Platform
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Designed specifically for basic smartphones with simple touch interfaces and local language support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <Card
                key={idx}
                hoverable
                onClick={() => navigate(feat.link)}
                className="space-y-4 border border-slate-200 hover:border-emerald-500 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-14 h-14 rounded-2xl ${feat.color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                    <Icon className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center text-xs font-extrabold text-emerald-700 gap-1 group-hover:gap-2 transition-all">
                  <span>Open Feature</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Primary Trust & Accessibility Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2 p-4">
            <Smartphone className="w-8 h-8 text-amber-400 mx-auto" />
            <h4 className="text-base font-bold">Mobile First & Simple</h4>
            <p className="text-xs text-emerald-200">Large buttons, zero clutter, built for basic Android smartphones.</p>
          </div>
          <div className="space-y-2 p-4">
            <Globe className="w-8 h-8 text-amber-400 mx-auto" />
            <h4 className="text-base font-bold">Regional Language Friendly</h4>
            <p className="text-xs text-emerald-200">Available in Telugu, Hindi, Tamil, Kannada, Marathi & English.</p>
          </div>
          <div className="space-y-2 p-4">
            <ShieldCheck className="w-8 h-8 text-amber-400 mx-auto" />
            <h4 className="text-base font-bold">Direct FPO & Buyer Connect</h4>
            <p className="text-xs text-emerald-200">Eliminate middlemen and get transparent market price updates.</p>
          </div>
        </div>
      </section>

    </div>
  );
};
