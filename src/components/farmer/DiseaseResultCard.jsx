import React from 'react';
import { AlertTriangle, CheckCircle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/StatusBadge';
import { useLanguage } from '../../contexts/LanguageContext';

export const DiseaseResultCard = ({ result, onViewTreatment }) => {
  const { language, t } = useLanguage();

  if (!result) return null;

  const diseaseName = language === 'te' && result.diseaseNameTe ? result.diseaseNameTe : result.diseaseName;
  const cropName = language === 'te' && result.cropNameTe ? result.cropNameTe : result.cropName;
  const symptomsList = language === 'te' && result.symptomsTe ? result.symptomsTe : result.symptoms;
  const quickAction = language === 'te' && result.quickActionTe ? result.quickActionTe : result.quickAction;

  const confidencePct = Math.round((result.confidence || 0.9) * 100);

  return (
    <Card className="border-2 border-emerald-600 bg-white space-y-5 shadow-xl">
      {/* Demo Disclaimer Tag */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
        <span>{t('mockPredictionNotice', 'AI-Assisted Demo Prediction — Consult local Krishi Vigyan Kendra before applying chemicals.')}</span>
      </div>

      {/* Primary Result Banner */}
      <div className="flex items-start justify-between pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">{cropName}</span>
          <h3 className="text-2xl font-black text-slate-900 leading-tight mt-0.5">{diseaseName}</h3>
          {result.scientificName && (
            <p className="text-xs italic text-slate-500 font-mono">{result.scientificName}</p>
          )}
        </div>
        <div className="flex flex-col items-end">
          <StatusBadge status={`Confidence: ${confidencePct}%`} variant="success" />
          <span className="text-[11px] font-bold text-red-600 mt-1">
            Severity: {result.severity || 'High'}
          </span>
        </div>
      </div>

      {/* Quick Action Highlight */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
        <div className="flex items-center gap-2 font-black text-sm text-emerald-900">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>{t('whatToDoNow', 'Immediate Action Required')}</span>
        </div>
        <p className="text-sm font-semibold leading-relaxed pl-7">{quickAction}</p>
      </div>

      {/* Key Symptoms */}
      <div className="space-y-2">
        <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">
          {t('symptoms', 'Key Symptoms')}
        </h4>
        <ul className="space-y-1.5 pl-1">
          {symptomsList.map((symptom, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
              <span>{symptom}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <Button
          fullWidth
          variant="primary"
          size="lg"
          icon={ArrowRight}
          onClick={() => onViewTreatment(result.diseaseId)}
        >
          {t('viewTreatmentBtn', 'View Full Treatment Guidance')}
        </Button>
      </div>
    </Card>
  );
};
