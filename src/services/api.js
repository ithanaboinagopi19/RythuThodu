import {
  INITIAL_FARMERS,
  CROPS,
  DISEASES,
  TREATMENTS,
  MARKET_PRICES,
  BUYERS,
  COLD_STORAGES,
  LOGISTICS_PROVIDERS,
  INITIAL_DIAGNOSES,
  INITIAL_PRODUCE_LISTINGS
} from '../data/mockData';

// Storage keys
const STORAGE_KEYS = {
  DIAGNOSES: 'agri_connect_diagnoses',
  LISTINGS: 'agri_connect_listings',
  OFFERS: 'agri_connect_offers',
  STORAGE_BOOKINGS: 'agri_connect_storage_bookings',
  TRANSPORT_REQUESTS: 'agri_connect_transport_requests'
};

const getStoredItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStoredItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
};

/**
 * Frontend API Service Layer
 * Designed to mirror Django REST Framework (DRF) endpoints:
 * e.g., /api/v1/farmers/, /api/v1/diagnoses/, /api/v1/market-prices/
 */
export const api = {
  // Farmers
  async getFarmerProfile(id = "FARMER-101") {
    return INITIAL_FARMERS.find(f => f.id === id) || INITIAL_FARMERS[0];
  },

  // Crops & Knowledgebase
  async getCrops() {
    return CROPS;
  },

  async getDiseases(cropId = null) {
    if (cropId) {
      return DISEASES.filter(d => d.cropId === cropId);
    }
    return DISEASES;
  },

  async getTreatmentGuidance(diseaseId) {
    if (TREATMENTS[diseaseId]) {
      return TREATMENTS[diseaseId];
    }
    // Fallback default structure
    return TREATMENTS["DIS-TOM-01"];
  },

  // Crop Disease Diagnosis
  async getDiagnoses(farmerId = "FARMER-101") {
    const list = getStoredItem(STORAGE_KEYS.DIAGNOSES, INITIAL_DIAGNOSES);
    return list.filter(d => d.farmerId === farmerId);
  },

  async createDiagnosis(diagnosisData) {
    const list = getStoredItem(STORAGE_KEYS.DIAGNOSES, INITIAL_DIAGNOSES);
    const newRecord = {
      id: `DIAG-${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: "Action Required",
      ...diagnosisData
    };
    const updated = [newRecord, ...list];
    setStoredItem(STORAGE_KEYS.DIAGNOSES, updated);
    return newRecord;
  },

  // Market Prices
  async getMarketPrices(filters = {}) {
    let result = [...MARKET_PRICES];
    if (filters.crop && filters.crop !== 'all') {
      result = result.filter(m => m.crop.toLowerCase() === filters.crop.toLowerCase());
    }
    if (filters.district && filters.district !== 'all') {
      result = result.filter(m => m.district.toLowerCase() === filters.district.toLowerCase());
    }
    return result;
  },

  // Buyers & FPOs
  async getBuyers(filters = {}) {
    let result = [...BUYERS];
    if (filters.crop && filters.crop !== 'all') {
      result = result.filter(b => b.cropRequired.toLowerCase().includes(filters.crop.toLowerCase()));
    }
    if (filters.type && filters.type !== 'all') {
      result = result.filter(b => b.type === filters.type);
    }
    return result;
  },

  // Produce Listings
  async getProduceListings() {
    return getStoredItem(STORAGE_KEYS.LISTINGS, INITIAL_PRODUCE_LISTINGS);
  },

  async createProduceListing(listingData) {
    const list = getStoredItem(STORAGE_KEYS.LISTINGS, INITIAL_PRODUCE_LISTINGS);
    const newListing = {
      id: `LISTING-${Date.now()}`,
      status: "Active",
      createdAt: new Date().toISOString().substring(0, 10),
      ...listingData
    };
    const updated = [newListing, ...list];
    setStoredItem(STORAGE_KEYS.LISTINGS, updated);
    return newListing;
  },

  // Cold Storage
  async getColdStorages() {
    return COLD_STORAGES;
  },

  async requestStorageBooking(bookingData) {
    const list = getStoredItem(STORAGE_KEYS.STORAGE_BOOKINGS, []);
    const newBooking = {
      id: `BOOK-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "Pending Confirmation",
      ...bookingData
    };
    setStoredItem(STORAGE_KEYS.STORAGE_BOOKINGS, [newBooking, ...list]);
    return newBooking;
  },

  // Logistics & Transport
  async getLogisticsProviders() {
    return LOGISTICS_PROVIDERS;
  },

  async requestTransport(transportData) {
    const list = getStoredItem(STORAGE_KEYS.TRANSPORT_REQUESTS, []);
    const newRequest = {
      id: `TRIP-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "Vehicle Dispatched",
      ...transportData
    };
    setStoredItem(STORAGE_KEYS.TRANSPORT_REQUESTS, [newRequest, ...list]);
    return newRequest;
  }
};
