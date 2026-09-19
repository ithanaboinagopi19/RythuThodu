import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSelector } from '../components/language/LanguageSelector';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const LanguageSelectPage = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-2 border-emerald-600 space-y-8 p-6 sm:p-10 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-emerald-950 flex items-center justify-center mx-auto shadow-md">
            <Globe className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === 'te' ? 'భాషను ఎంచుకోండి' : 'Select Your Preferred Language'}
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            {language === 'te' 
              ? 'మీకు అనుకూలమైన భాషలో అగ్రి కనెక్ట్ వాడుకోండి.' 
              : 'Choose your language for an accessible, simple farming experience.'}
          </p>
        </div>

        {/* Large Language Button Selector Grid */}
        <LanguageSelector />

        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <Button
            fullWidth
            variant="primary"
            size="lg"
            icon={ArrowRight}
            onClick={() => navigate('/dashboard')}
          >
            {language === 'te' ? 'కొనసాగించండి' : 'Continue to Dashboard'}
          </Button>
        </div>
      </Card>
    </div>
  );
};
