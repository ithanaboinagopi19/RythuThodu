import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle, AlertTriangle, ArrowLeft, DollarSign, Leaf, Pill, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { StatusBadge } from '../components/common/StatusBadge';
import { api } from '../services/api';
import { LoadingState } from '../components/common/LoadingState';

export const TreatmentGuidancePage = () => {
  const { diseaseId } = useParams();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [treatment, setTreatment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuidance = async () => {
      setLoading(true);
      try {
        const data = await api.getTreatmentGuidance(diseaseId || "DIS-TOM-01");
        setTreatment(data);
      } catch (e) {
        console.error("Error fetching treatment:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchGuidance();
  }, [diseaseId]);

  if (loading) return <LoadingState message="Fetching scientific treatment guidance..." />;
  if (!treatment) return null;

  const diseaseName = language === 'te' && treatment.diseaseNameTe ? treatment.diseaseNameTe : treatment.diseaseName;
  const culturalSteps = language === 'te' && treatment.culturalControlTe ? treatment.culturalControlTe : treatment.culturalControl;
  const bioSteps = language === 'te' && treatment.biologicalControlTe ? treatment.biologicalControlTe : treatment.biologicalControl;
  const chemSteps = language === 'te' && treatment.chemicalControlTe ? treatment.chemicalControlTe : treatment.chemicalControl;
  const preventionSteps = language === 'te' && treatment.preventionTe ? treatment.preventionTe : treatment.prevention;
  const safetyAdvice = language === 'te' && treatment.safetyAdviceTe ? treatment.safetyAdviceTe : treatment.safetyAdvice;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Top Navigation Back Button */}
      <button
        onClick={() => navigate('/crop-disease')}
        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 hover:text-emerald-950 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-xl transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Crop Scan</span>
      </button>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white p-6 rounded-3xl shadow-xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
            {t('treatmentTitle', 'Treatment Guidance')}
          </span>
          <StatusBadge status={`Cost: ${treatment.costRating || 'Medium'}`} variant="warning" />
        </div>

        <h1 className="text-3xl font-black text-white">{diseaseName}</h1>
        <p className="text-xs text-emerald-200 font-semibold">
          Estimated Treatment Cost: <strong>{treatment.estimatedCost || '₹450 - ₹700 per acre'}</strong>
        </p>
      </div>

      {/* 1. What Happened / Overview */}
      <Card className="border border-slate-200 space-y-3">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Info className="w-5 h-5 text-emerald-600" />
          <span>{t('whatHappened', 'What Happened?')}</span>
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed font-medium">
          This fungal/bacterial infection attacks healthy leaf tissue, disrupting photosynthesis and causing rot. Follow the step-by-step remedies below for fast recovery.
        </p>
      </Card>

      {/* 2. Step-by-Step Remedies */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-900">
          {t('whatYouCanDo', 'Step-by-Step Treatment Action Plan')}
        </h3>

        {/* Cultural / Sanitation */}
        <Card className="border-l-4 border-l-emerald-600 space-y-3">
          <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-xs">1</span>
            <span>Immediate Sanitation & Field Prep</span>
          </h4>
          <ul className="space-y-2 pl-2">
            {culturalSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-800 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Biological Controls */}
        {bioSteps && bioSteps.length > 0 && (
          <Card className="border-l-4 border-l-amber-500 space-y-3">
            <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-extrabold flex items-center justify-center text-xs">2</span>
              <span>{t('biologicalSection', 'Organic & Biological Remedies')}</span>
            </h4>
            <ul className="space-y-2 pl-2">
              {bioSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-800 font-medium">
                  <Leaf className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Chemical Controls */}
        <Card className="border-l-4 border-l-blue-600 space-y-3">
          <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 font-extrabold flex items-center justify-center text-xs">3</span>
            <span>{t('chemicalSection', 'Recommended Chemical Spray')}</span>
          </h4>
          <ul className="space-y-2 pl-2">
            {chemSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-800 font-medium">
                <Pill className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Long term Prevention */}
        {preventionSteps && (
          <Card className="border-l-4 border-l-purple-600 space-y-3">
            <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-900 font-extrabold flex items-center justify-center text-xs">4</span>
              <span>{t('preventionSection', 'Long-term Prevention & Cultural Practices')}</span>
            </h4>
            <ul className="space-y-2 pl-2">
              {preventionSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-800 font-medium">
                  <span className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>

      {/* Safety & Statutory Disclaimer */}
      <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-2 shadow-xs">
        <strong className="text-sm font-black flex items-center gap-2 text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-600" />
          <span>{t('disclaimerTitle', 'Statutory Agricultural Safety Disclaimer')}</span>
        </strong>
        <p className="text-xs leading-relaxed font-semibold">
          "{t('disclaimerText', 'Use pesticide/fertilizer products only according to their label instructions and advice from qualified local agricultural authorities.')}"
        </p>
        <p className="text-[11px] text-amber-800 font-medium">
          Safety instruction: {safetyAdvice}
        </p>
      </div>

    </div>
  );
};
