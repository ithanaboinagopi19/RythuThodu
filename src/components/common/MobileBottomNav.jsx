import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Camera, TrendingUp, PlusCircle, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const MobileBottomNav = () => {
  const { t } = useLanguage();

  const navItems = [
    { path: '/dashboard', label: t('navHome', 'Home'), icon: Home },
    { path: '/crop-disease', label: t('navCrop', 'Crop'), icon: Camera },
    { path: '/market-prices', label: t('navMarket', 'Market'), icon: TrendingUp },
    { path: '/sell-produce', label: t('navSell', 'Sell'), icon: PlusCircle },
    { path: '/profile', label: t('navProfile', 'Profile'), icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl md:hidden">
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center justify-center space-y-0.5 text-center touch-target select-none transition-all
                ${isActive 
                  ? 'text-emerald-700 font-extrabold border-t-4 border-emerald-600 bg-emerald-50/60' 
                  : 'text-slate-500 font-semibold hover:text-slate-800'}
              `}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-[11px] leading-none tracking-tight">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
