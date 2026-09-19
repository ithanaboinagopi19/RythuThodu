import React, { useState, useEffect } from 'react';
import { Snowflake, Search, Filter, CheckCircle2, Phone, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { StorageCard } from '../components/farmer/StorageCard';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { api } from '../services/api';
import { CROPS } from '../data/mockData';

export const ColdStoragePage = () => {
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [storages, setStorages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Booking modal
  const [activeFacility, setActiveFacility] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const [durationMonths, setDurationMonths] = useState('1');
  const [requiredMT, setRequiredMT] = useState('5');

  useEffect(() => {
    const fetchStorages = async () => {
      setLoading(true);
      try {
        const data = await api.getColdStorages();
        setStorages(data);
      } catch (e) {
        console.error("Error fetching cold storages:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchStorages();
  }, []);

  const filteredStorages = storages.filter(s => {
    if (searchQuery && !s.name.toLowerCase().includes(searchQuery.toLowerCase()) && !s.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCrop !== 'all' && !s.supportedCrops.includes(selectedCrop)) {
      return false;
    }
    return true;
  });

  const handleOpenBooking = (facility) => {
    setActiveFacility(facility);
    setBookingSubmitted(false);
    setBookingModalOpen(true);
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    await api.requestStorageBooking({
      facilityId: activeFacility.id,
      facilityName: activeFacility.name,
      durationMonths,
      requiredMT
    });
    setBookingSubmitted(true);
  };

  const cropOptions = [
    { value: 'all', label: 'All Supported Crops' },
    ...CROPS.map(c => ({ value: c.name, label: `${c.icon} ${c.name}` }))
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-900">
          {t('storageTitle', 'Cold Storage Facilities')}
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          {t('storageSubtitle', 'Store your perishable produce safely to prevent distress sales.')}
        </p>
      </div>

      {/* Search & Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-4 rounded-2xl border border-slate-200">
        <Input
          placeholder="Search by facility name or district..."
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
      </div>

      {/* Storages Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-slate-900">
          Nearby Warehouses ({filteredStorages.length})
        </h3>

        {loading ? (
          <LoadingState message="Locating cold storage facilities..." />
        ) : filteredStorages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStorages.map((facility) => (
              <StorageCard
                key={facility.id}
                facility={facility}
                onRequestBooking={handleOpenBooking}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Cold Storage Found"
            description="No facility matches your location or crop filter."
            actionText="Reset Filters"
            onAction={() => { setSearchQuery(''); setSelectedCrop('all'); }}
          />
        )}
      </div>

      {/* Storage Booking Modal */}
      {activeFacility && (
        <Modal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          title={`Reserve Storage Space — ${activeFacility.name}`}
        >
          {bookingSubmitted ? (
            <div className="text-center space-y-4 p-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Storage Reservation Request Sent!</h3>
              <p className="text-xs text-slate-600">
                The manager of {activeFacility.name} has received your request for <strong>{requiredMT} MT</strong>. They will contact you shortly.
              </p>
              <div className="p-3 rounded-xl bg-slate-100 text-xs font-mono">
                Direct Facility Phone: {activeFacility.contact}
              </div>
              <Button fullWidth variant="primary" onClick={() => setBookingModalOpen(false)}>
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 text-xs space-y-1 text-cyan-950">
                <p><strong>Rate:</strong> {activeFacility.priceRate}</p>
                <p><strong>Available Capacity:</strong> {activeFacility.availableCapacityMT} MT</p>
                <p><strong>Temp Specs:</strong> {activeFacility.tempRange}</p>
              </div>

              <Input
                label="Required Storage Capacity (Metric Tons - MT)"
                type="number"
                value={requiredMT}
                onChange={(e) => setRequiredMT(e.target.value)}
                placeholder="e.g. 5"
                required
              />

              <Input
                label="Expected Duration (Months)"
                type="number"
                value={durationMonths}
                onChange={(e) => setDurationMonths(e.target.value)}
                placeholder="e.g. 1"
                required
              />

              <Button type="submit" fullWidth variant="primary" size="lg" icon={Snowflake}>
                Submit Storage Reservation Request
              </Button>
            </form>
          )}
        </Modal>
      )}

    </div>
  );
};
