import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [listingsData, diagnosesData] = await Promise.all([
        api.getProduceListings(),
        api.getDiagnoses()
      ]);
      setListings(listingsData);
      setDiagnoses(diagnosesData);
    } catch (e) {
      console.error("Error loading app data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addListing = async (newListingData) => {
    const created = await api.createProduceListing(newListingData);
    setListings(prev => [created, ...prev]);
    return created;
  };

  const addDiagnosis = async (diagnosisData) => {
    const created = await api.createDiagnosis(diagnosisData);
    setDiagnoses(prev => [created, ...prev]);
    return created;
  };

  return (
    <AppDataContext.Provider value={{
      listings,
      diagnoses,
      loading,
      refreshData,
      addListing,
      addDiagnosis
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};
