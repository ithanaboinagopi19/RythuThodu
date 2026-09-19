import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, Sprout, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { CROPS } from '../data/mockData';

export const RegistrationPage = () => {
  const { updateUserProfile, user } = useAuth();
  const { language, setLanguage, t, languages } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    village: user?.village || '',
    district: user?.district || 'Guntur',
    state: user?.state || 'Andhra Pradesh',
    language: language || 'en',
    mainCrop: user?.mainCrop || 'Tomato'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'language') {
      setLanguage(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    navigate('/dashboard');
  };

  const cropOptions = CROPS.map(c => ({
    value: c.name,
    label: `${c.icon} ${c.name} (${c.nameTe})`
  }));

  const langOptions = languages.map(l => ({
    value: l.code,
    label: `${l.flag} ${l.nativeName} (${l.name})`
  }));

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-2 border-emerald-600 space-y-6 p-6 sm:p-8 shadow-2xl">
        <div className="text-center space-y-1">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
            <User className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            {language === 'te' ? 'రైతు నమోదు' : 'Farmer Registration'}
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            {language === 'te' ? 'రైతు సేవలను ఉపయోగించడానికి మీ వివరాలు నమోదు చేయండి.' : 'Enter your details to create your farmer profile.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={language === 'te' ? 'పూర్తి పేరు' : 'Full Name'}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Ramesh Kumar"
            icon={User}
            required
          />

          <Input
            label={language === 'te' ? 'మొబైల్ సంఖ్య' : 'Mobile Number'}
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            icon={Phone}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label={language === 'te' ? 'గ్రామం / పట్టణం' : 'Village / Town'}
              name="village"
              value={formData.village}
              onChange={handleChange}
              placeholder="e.g. Tadikonda"
              icon={MapPin}
              required
            />

            <Input
              label={language === 'te' ? 'జిల్లా' : 'District'}
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="e.g. Guntur"
              icon={MapPin}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label={language === 'te' ? 'ప్రాధాన్యత భాష' : 'Preferred Language'}
              name="language"
              value={formData.language}
              onChange={handleChange}
              options={langOptions}
            />

            <Select
              label={language === 'te' ? 'ప్రధాన పంట' : 'Main Crop'}
              name="mainCrop"
              value={formData.mainCrop}
              onChange={handleChange}
              options={cropOptions}
              icon={Sprout}
            />
          </div>

          <div className="pt-3 space-y-2">
            <Button
              type="submit"
              fullWidth
              variant="primary"
              size="lg"
              icon={ArrowRight}
            >
              {language === 'te' ? 'ఖాతా సృష్టించండి & కొనసాగండి' : 'Create Account & Continue'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
