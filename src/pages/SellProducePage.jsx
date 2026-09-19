import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, CheckCircle2, Sprout, MapPin, Calendar, Upload, DollarSign, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useAppData } from '../contexts/AppDataContext';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { CROPS } from '../data/mockData';

export const SellProducePage = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { addListing } = useAppData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    crop: user?.mainCrop || 'Tomato',
    quantity: '2500',
    unit: 'kg',
    expectedPrice: '32',
    availableDate: new Date().toISOString().substring(0, 10),
    location: `${user?.village || 'Tadikonda'}, ${user?.district || 'Guntur'}, AP`,
    qualityGrade: 'Grade A',
    photo: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&auto=format&fit=crop&q=80'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdItem, setCreatedItem] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addListing({
      farmerId: user?.id || 'FARMER-101',
      farmerName: user?.name || 'Ramesh Kumar',
      ...formData
    });
    setCreatedItem(result);
    setIsSubmitted(true);
  };

  const cropOptions = CROPS.map(c => ({
    value: c.name,
    label: `${c.icon} ${c.name}`
  }));

  const unitOptions = [
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'quintal', label: 'Quintals (100 kg)' },
    { value: 'ton', label: 'Metric Tons (1000 kg)' }
  ];

  const gradeOptions = [
    { value: 'Grade A', label: 'Grade A (Export / Fresh Firm)' },
    { value: 'Grade B', label: 'Grade B (Standard Market Grade)' },
    { value: 'Organic', label: 'Certified Organic Produce' }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-900">
          {t('sellTitle', 'Create Produce Listing')}
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          {t('sellSubtitle', 'List your harvested produce so buyers and FPOs in your region can send offers directly.')}
        </p>
      </div>

      {isSubmitted ? (
        <Card className="border-2 border-emerald-600 space-y-6 p-6 sm:p-8 text-center shadow-xl animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">
              {t('listingSuccessTitle', 'Produce Listed Successfully!')}
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              {t('listingSuccessMsg', 'Your produce has been published. Interested buyers and FPOs will contact you soon.')}
            </p>
          </div>

          {createdItem && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-emerald-200">
                <span className="font-bold text-slate-500">Listing ID: {createdItem.id}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-white font-bold">{createdItem.status}</span>
              </div>
              <p><strong>Crop:</strong> {createdItem.crop}</p>
              <p><strong>Quantity:</strong> {createdItem.quantity} {createdItem.unit}</p>
              <p><strong>Expected Price:</strong> ₹{createdItem.expectedPrice} / {createdItem.unit}</p>
              <p><strong>Available Date:</strong> {createdItem.availableDate}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button fullWidth variant="outline" onClick={() => { setIsSubmitted(false); }}>
              Create Another Listing
            </Button>

            <Button fullWidth variant="primary" onClick={() => navigate('/buyers-fpo')}>
              View Buyers & FPOs
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="border border-slate-200 p-6 sm:p-8 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label={t('currentCrop', 'Crop')}
                name="crop"
                value={formData.crop}
                onChange={handleChange}
                options={cropOptions}
                icon={Sprout}
                required
              />

              <Select
                label={t('qualityGradeLabel', 'Quality / Grade')}
                name="qualityGrade"
                value={formData.qualityGrade}
                onChange={handleChange}
                options={gradeOptions}
                icon={Award}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={t('quantityLabel', 'Quantity')}
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g. 2500"
                required
              />

              <Select
                label="Unit of Measure"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                options={unitOptions}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={t('expectedPriceLabel', 'Expected Price (₹)')}
                name="expectedPrice"
                type="number"
                value={formData.expectedPrice}
                onChange={handleChange}
                placeholder="e.g. 30"
                required
              />

              <Input
                label={t('harvestDateLabel', 'Harvest / Available Date')}
                name="availableDate"
                type="date"
                value={formData.availableDate}
                onChange={handleChange}
                icon={Calendar}
                required
              />
            </div>

            <Input
              label="Produce Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Village, District, State"
              icon={MapPin}
              required
            />

            {/* Photo preview */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-800">
                Produce Image Preview
              </label>
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <img
                  src={formData.photo}
                  alt="Produce preview"
                  className="w-16 h-16 rounded-xl object-cover border border-slate-300"
                />
                <span className="text-xs text-slate-500 font-medium">
                  Photo uploaded automatically. High quality crop photos get 3x more buyer offers.
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                fullWidth
                variant="primary"
                size="lg"
                icon={PlusCircle}
              >
                {t('createListingBtn', 'Create Produce Listing')}
              </Button>
            </div>

          </form>
        </Card>
      )}

    </div>
  );
};
