import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, Globe, Sprout, Edit3, HelpCircle, LogOut, Package, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppData } from '../contexts/AppDataContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { StatusBadge } from '../components/common/StatusBadge';
import { CROPS } from '../data/mockData';

export const ProfilePage = () => {
  const { user, updateUserProfile, switchRole } = useAuth();
  const { t, language, languages, currentLanguageObj } = useLanguage();
  const { listings, diagnoses } = useAppData();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');

  // Edit profile modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    village: user?.village || '',
    district: user?.district || '',
    mainCrop: user?.mainCrop || 'Tomato'
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setEditModalOpen(false);
  };

  const cropOptions = CROPS.map(c => ({ value: c.name, label: `${c.icon} ${c.name}` }));

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Profile Header Banner */}
      <Card className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=200&auto=format&fit=crop&q=80"}
            alt={user?.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-amber-400 shadow-lg"
          />

          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-white">{user?.name || 'Ramesh Kumar'}</h1>
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-xs text-emerald-200 font-semibold flex items-center justify-center sm:justify-start gap-1">
              <Phone className="w-3.5 h-3.5 text-amber-300" /> {user?.phone || '9876543210'}
            </p>
            <p className="text-xs text-emerald-100 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-300" /> {user?.village || 'Tadikonda'}, {user?.district || 'Guntur'}, {user?.state || 'Andhra Pradesh'}
            </p>
          </div>

          <div className="sm:ml-auto flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={Edit3}
              onClick={() => setEditModalOpen(true)}
            >
              {t('editProfile', 'Edit Profile')}
            </Button>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'profile' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-4 h-4" /> Account Details
        </button>

        <button
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'listings' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className="w-4 h-4" /> {t('myListings', 'My Produce Listings')} ({listings.length})
        </button>

        <button
          onClick={() => setActiveTab('diagnoses')}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'diagnoses' ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" /> {t('diagnosisHistory', 'Diagnosis History')} ({diagnoses.length})
        </button>
      </div>

      {/* Tab Content: Profile Overview */}
      {activeTab === 'profile' && (
        <div className="space-y-4">
          <Card className="border border-slate-200 space-y-4 p-6">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-2">
              Farmer Preferences & Info
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-400 font-bold block">Preferred Language</span>
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>{currentLanguageObj?.flag} {currentLanguageObj?.nativeName} ({currentLanguageObj?.name})</span>
                  <button onClick={() => navigate('/language')} className="text-xs text-emerald-700 underline font-bold">Change</button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-400 font-bold block">Main Crop</span>
                <span className="font-extrabold text-slate-800">{user?.mainCrop || 'Tomato'}</span>
              </div>
            </div>
          </Card>

          {/* Quick Action Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card hoverable onClick={() => setHelpModalOpen(true)} className="flex items-center gap-3 p-4 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{t('helpSupport', 'Help & Support')}</h4>
                <p className="text-xs text-slate-500">Toll-free Kisan Helpline & FAQs</p>
              </div>
            </Card>

            <Card hoverable onClick={() => { switchRole('admin'); navigate('/admin'); }} className="flex items-center gap-3 p-4 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Switch to Admin Console</h4>
                <p className="text-xs text-slate-500">Open administrative dashboard</p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Tab Content: My Produce Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-extrabold text-slate-900">Active Produce Listings</h3>
            <Button size="sm" variant="primary" onClick={() => navigate('/sell-produce')}>+ Create Listing</Button>
          </div>

          <div className="space-y-3">
            {listings.map((item) => (
              <Card key={item.id} className="p-4 border border-slate-200 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono text-slate-400 font-bold">{item.id}</span>
                    <h4 className="text-lg font-black text-slate-900">{item.crop}</h4>
                    <p className="text-xs text-slate-600">{item.location} | Available: {item.availableDate}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-emerald-800">₹{item.expectedPrice} / {item.unit}</span>
                    <StatusBadge status={item.status} variant="success" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Diagnosis History */}
      {activeTab === 'diagnoses' && (
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Saved Crop Scan History</h3>

          <div className="space-y-3">
            {diagnoses.map((diag) => (
              <Card key={diag.id} className="p-4 border border-slate-200 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={diag.image} alt={diag.disease} className="w-14 h-14 rounded-xl object-cover border border-slate-200" />
                    <div>
                      <span className="text-xs font-extrabold text-emerald-800 uppercase">{diag.crop}</span>
                      <h4 className="text-base font-black text-slate-900">{diag.disease}</h4>
                      <span className="text-xs text-slate-400 font-medium">Scanned: {diag.createdAt}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/treatment/${diag.diseaseId || 'DIS-TOM-01'}`)}
                  >
                    View Treatment
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Farmer Profile"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Mobile Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <Input
            label="Village"
            value={formData.village}
            onChange={(e) => setFormData({ ...formData, village: e.target.value })}
            required
          />
          <Input
            label="District"
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            required
          />
          <Select
            label="Main Crop"
            value={formData.mainCrop}
            onChange={(e) => setFormData({ ...formData, mainCrop: e.target.value })}
            options={cropOptions}
          />
          <Button type="submit" fullWidth variant="primary">
            Save Profile Changes
          </Button>
        </form>
      </Modal>

      {/* Help & Support Modal */}
      <Modal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
        title="Kisan Help & Support Hotline"
      >
        <div className="space-y-4 text-xs text-slate-700">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
            <h4 className="font-extrabold text-sm text-emerald-950">Toll-Free Kisan Call Centre</h4>
            <p className="text-emerald-900 font-bold text-base font-mono">1800-180-1551</p>
            <p className="text-slate-500">Available 6:00 AM to 10:00 PM in all regional languages.</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Frequently Asked Questions</h4>
            <p><strong>Q: How accurate is the crop disease scanner?</strong><br />A: For the MVP demo, predictions are AI-assisted examples. Always verify with local Krishi Officers before purchasing chemical sprays.</p>
            <p><strong>Q: Are market prices updated live?</strong><br />A: Mandi prices are updated every morning directly from official APMC market registries.</p>
          </div>
        </div>
      </Modal>

    </div>
  );
};
