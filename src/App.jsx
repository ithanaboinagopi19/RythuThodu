import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { AppDataProvider } from './contexts/AppDataContext';

import { Navbar } from './components/common/Navbar';
import { MobileBottomNav } from './components/common/MobileBottomNav';

import { LandingPage } from './pages/LandingPage';
import { LanguageSelectPage } from './pages/LanguageSelectPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { DiseaseDetectionPage } from './pages/DiseaseDetectionPage';
import { TreatmentGuidancePage } from './pages/TreatmentGuidancePage';
import { MarketPricesPage } from './pages/MarketPricesPage';
import { BuyersFpoPage } from './pages/BuyersFpoPage';
import { SellProducePage } from './pages/SellProducePage';
import { ColdStoragePage } from './pages/ColdStoragePage';
import { LogisticsPage } from './pages/LogisticsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';

const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-emerald-900/5 text-slate-800 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/language" element={<LanguageSelectPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/dashboard" element={<FarmerDashboard />} />
          <Route path="/crop-disease" element={<DiseaseDetectionPage />} />
          <Route path="/treatment/:diseaseId" element={<TreatmentGuidancePage />} />
          <Route path="/market-prices" element={<MarketPricesPage />} />
          <Route path="/buyers-fpo" element={<BuyersFpoPage />} />
          <Route path="/sell-produce" element={<SellProducePage />} />
          <Route path="/cold-storage" element={<ColdStoragePage />} />
          <Route path="/logistics" element={<LogisticsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Hide bottom nav on admin routes */}
      {!isAdmin && <MobileBottomNav />}
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppDataProvider>
          <Router>
            <AppContent />
          </Router>
        </AppDataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
