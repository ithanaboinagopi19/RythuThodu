import React, { useState, useEffect } from 'react';
import { Truck, MapPin, CheckCircle2, Phone, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { LogisticsCard } from '../components/farmer/LogisticsCard';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { LoadingState } from '../components/common/LoadingState';
import { api } from '../services/api';
import { CROPS } from '../data/mockData';

export const LogisticsPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const [pickup, setPickup] = useState(`${user?.village || 'Tadikonda'}, ${user?.district || 'Guntur'}`);
  const [destination, setDestination] = useState('Guntur Agricultural Market Yard');
  const [selectedCrop, setSelectedCrop] = useState(user?.mainCrop || 'Tomato');
  const [quantity, setQuantity] = useState('2500');
  const [vehicleType, setVehicleType] = useState('Mini Truck');

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Booking modal
  const [activeProvider, setActiveProvider] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      try {
        const data = await api.getLogisticsProviders();
        setProviders(data);
      } catch (e) {
        console.error("Error fetching logistics providers:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  const handleOpenBooking = (provider) => {
    setActiveProvider(provider);
    setBookingSubmitted(false);
    setBookingModalOpen(true);
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    await api.requestTransport({
      providerId: activeProvider.id,
      providerName: activeProvider.name,
      pickup,
      destination,
      selectedCrop,
      quantity,
      vehicleType
    });
    setBookingSubmitted(true);
  };

  const cropOptions = CROPS.map(c => ({ value: c.name, label: `${c.icon} ${c.name}` }));

  const vehicleOptions = [
    { value: 'Mini Truck', label: 'Mini Truck (Tata Ace / 1 Ton)' },
    { value: 'Small Pickup', label: 'Small Pickup (Bolero / 1.5 Tons)' },
    { value: 'Heavy Truck', label: 'Heavy Truck (6 Wheeler / 10 Tons)' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-900">
          {t('logisticsTitle', 'Logistics & Transport Services')}
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          {t('logisticsSubtitle', 'Find and book reliable agri-freight vehicles near your village.')}
        </p>
      </div>

      {/* Transport Route Form */}
      <Card className="p-6 border border-slate-200 bg-white space-y-4 shadow-md">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Truck className="w-5 h-5 text-emerald-600" />
          <span>Transport Request Form</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={t('pickupLocation', 'Pickup Location')}
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            icon={MapPin}
            required
          />

          <Input
            label={t('destination', 'Destination / Market Yard')}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            icon={MapPin}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Crop to Transport"
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            options={cropOptions}
          />

          <Input
            label="Quantity (kg / Quintals)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 2500"
            required
          />

          <Select
            label={t('vehicleType', 'Required Vehicle Type')}
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            options={vehicleOptions}
          />
        </div>
      </Card>

      {/* Transporters List */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-slate-900">
          Available Local Transporters ({providers.length})
        </h3>

        {loading ? (
          <LoadingState message="Finding nearby logistics providers..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {providers.map((provider) => (
              <LogisticsCard
                key={provider.id}
                provider={provider}
                onBookVehicle={handleOpenBooking}
              />
            ))}
          </div>
        )}
      </div>

      {/* Transport Booking Modal */}
      {activeProvider && (
        <Modal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          title={`Confirm Freight Booking — ${activeProvider.name}`}
        >
          {bookingSubmitted ? (
            <div className="text-center space-y-4 p-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Vehicle Request Sent!</h3>
              <p className="text-xs text-slate-600">
                Driver from <strong>{activeProvider.name}</strong> will call you at <strong>{user?.phone || '9876543210'}</strong> to confirm pickup time.
              </p>
              <div className="p-3 rounded-xl bg-slate-100 text-xs font-mono">
                Operator Hotline: {activeProvider.contact}
              </div>
              <Button fullWidth variant="primary" onClick={() => setBookingModalOpen(false)}>
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1 text-amber-950">
                <p><strong>Route:</strong> {pickup} ➔ {destination}</p>
                <p><strong>Payload:</strong> {quantity} kg ({selectedCrop})</p>
                <p><strong>Vehicle:</strong> {vehicleType}</p>
              </div>

              <div className="pt-2">
                <Button type="submit" fullWidth variant="primary" size="lg" icon={Truck}>
                  Confirm & Dispatch Vehicle
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}

    </div>
  );
};
