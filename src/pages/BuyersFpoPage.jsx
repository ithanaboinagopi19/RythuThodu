import React, { useState, useEffect } from 'react';
import { Search, Filter, Phone, Send, Building2, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { BuyerCard } from '../components/farmer/BuyerCard';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { api } from '../services/api';
import { CROPS } from '../data/mockData';

export const BuyersFpoPage = () => {
  const { t, language } = useLanguage();

  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [activeBuyer, setActiveBuyer] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);

  // Offer form inputs
  const [offerQty, setOfferQty] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  useEffect(() => {
    const fetchBuyers = async () => {
      setLoading(true);
      try {
        const data = await api.getBuyers({ crop: selectedCrop, type: selectedType });
        setBuyers(data);
      } catch (e) {
        console.error("Error fetching buyers:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBuyers();
  }, [selectedCrop, selectedType]);

  const filteredBuyers = buyers.filter(b => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return b.name.toLowerCase().includes(q) || b.location.toLowerCase().includes(q) || b.cropRequired.toLowerCase().includes(q);
  });

  const handleOpenContact = (buyer) => {
    setActiveBuyer(buyer);
    setContactModalOpen(true);
  };

  const handleOpenOffer = (buyer) => {
    setActiveBuyer(buyer);
    setOfferQty(buyer.quantityNeeded || '1000');
    setOfferPrice(buyer.targetPrice || '30');
    setOfferSubmitted(false);
    setOfferModalOpen(true);
  };

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    setOfferSubmitted(true);
  };

  const cropOptions = [
    { value: 'all', label: 'All Crops' },
    ...CROPS.map(c => ({ value: c.name, label: `${c.icon} ${c.name}` }))
  ];

  const typeOptions = [
    { value: 'all', label: 'All (Buyers & FPOs)' },
    { value: 'FPO', label: 'FPOs (Farmer Producer Orgs)' },
    { value: 'Buyer', label: 'Wholesale Buyers / Processors' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-900">
          {t('buyersTitle', 'Buyers & FPOs Directory')}
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          {t('buyersSubtitle', 'Sell directly to verified Farmer Producer Organizations and institutional buyers.')}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-slate-200">
        <Input
          placeholder={t('searchBuyersPlaceholder', 'Search buyers by crop, district or name...')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={Search}
        />

        <Select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          options={cropOptions}
          icon={Filter}
        />

        <Select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          options={typeOptions}
          icon={Building2}
        />
      </div>

      {/* Buyer Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-slate-900">
          Available Procurement Requirements ({filteredBuyers.length})
        </h3>

        {loading ? (
          <LoadingState message="Loading registered buyers and FPOs..." />
        ) : filteredBuyers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBuyers.map((buyer) => (
              <BuyerCard
                key={buyer.id}
                buyer={buyer}
                onContact={handleOpenContact}
                onMakeOffer={handleOpenOffer}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Buyers Found"
            description="No buyer or FPO requirement matches your filter."
            actionText="Clear Search"
            onAction={() => { setSearchQuery(''); setSelectedCrop('all'); setSelectedType('all'); }}
          />
        )}
      </div>

      {/* Contact Buyer Modal */}
      {activeBuyer && (
        <Modal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
          title={`Contact ${activeBuyer.name}`}
        >
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-emerald-950">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="font-extrabold text-sm">Verified Procurement Officer</span>
              </div>
              <p className="text-sm font-bold">{activeBuyer.contactPerson}</p>
              <p className="text-xs font-mono">{activeBuyer.phone}</p>
            </div>

            <div className="space-y-1 text-xs text-slate-600">
              <p><strong>Payment Terms:</strong> {activeBuyer.paymentTerms}</p>
              <p><strong>Location:</strong> {activeBuyer.location}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={`tel:${activeBuyer.phone}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm touch-target"
              >
                <Phone className="w-4 h-4" /> Call Phone
              </a>

              <a
                href={`https://wa.me/${activeBuyer.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm touch-target"
              >
                <Send className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </Modal>
      )}

      {/* Make Offer Modal */}
      {activeBuyer && (
        <Modal
          isOpen={offerModalOpen}
          onClose={() => setOfferModalOpen(false)}
          title={`Send Offer to ${activeBuyer.name}`}
        >
          {offerSubmitted ? (
            <div className="text-center space-y-4 p-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Offer Submitted Successfully!</h3>
              <p className="text-xs text-slate-600">
                Your offer for <strong>{offerQty}</strong> of <strong>{activeBuyer.cropRequired}</strong> has been transmitted to {activeBuyer.name}.
              </p>
              <Button fullWidth variant="primary" onClick={() => setOfferModalOpen(false)}>
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmitOffer} className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-100 text-xs space-y-1">
                <p><strong>Required Crop:</strong> {activeBuyer.cropRequired}</p>
                <p><strong>Buyer Target Price:</strong> {activeBuyer.targetPrice}</p>
              </div>

              <Input
                label="Offer Quantity (kg / Tons)"
                value={offerQty}
                onChange={(e) => setOfferQty(e.target.value)}
                placeholder="e.g. 2000"
                required
              />

              <Input
                label="Your Quoted Price (₹ per kg)"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                placeholder="e.g. 32"
                required
              />

              <Button type="submit" fullWidth variant="primary" size="lg" icon={Send}>
                Submit Produce Offer
              </Button>
            </form>
          )}
        </Modal>
      )}

    </div>
  );
};
