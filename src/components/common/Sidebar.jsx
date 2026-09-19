import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Bug,
  Stethoscope,
  TrendingUp,
  ShoppingBag,
  Building2,
  Snowflake,
  Truck,
  FileText
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Sidebar = ({ activeTab, onSelectTab }) => {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'farmers', label: 'Registered Farmers', icon: Users },
    { id: 'diseases', label: 'Disease Database', icon: Bug },
    { id: 'treatments', label: 'Treatment KB', icon: Stethoscope },
    { id: 'prices', label: 'Market Prices', icon: TrendingUp },
    { id: 'buyers', label: 'Wholesale Buyers', icon: ShoppingBag },
    { id: 'fpos', label: 'Registered FPOs', icon: Building2 },
    { id: 'storage', label: 'Cold Storages', icon: Snowflake },
    { id: 'logistics', label: 'Logistics Operators', icon: Truck },
    { id: 'reports', label: 'System Reports', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-emerald-950 text-white min-h-screen p-4 hidden md:block shrink-0 border-r border-emerald-800">
      <div className="pb-6 border-b border-emerald-800 px-2">
        <h2 className="text-lg font-black text-amber-400">Admin Control</h2>
        <p className="text-xs text-emerald-300">Management Console</p>
      </div>

      <nav className="mt-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`
                w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold text-left transition-colors touch-target
                ${isActive 
                  ? 'bg-amber-500 text-emerald-950 shadow-md font-black' 
                  : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'}
              `}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
