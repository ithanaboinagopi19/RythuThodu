import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, Globe, UserCheck, ChevronDown, Menu, X, Shield, ShoppingBag, Users, Tractor } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from './Button';

export const Navbar = () => {
  const { language, setLanguage, t, languages } = useLanguage();
  const { role, switchRole, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { path: '/dashboard', label: t('navHome') },
    { path: '/crop-disease', label: t('navCrop') },
    { path: '/market-prices', label: t('navMarket') },
    { path: '/buyers-fpo', label: t('navBuyersTitle', 'Buyers & FPOs') },
    { path: '/sell-produce', label: t('navSell') },
    { path: '/cold-storage', label: t('navStorage') },
    { path: '/logistics', label: t('navLogistics') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-emerald-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2 text-white font-black text-xl tracking-tight">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-emerald-950 shadow-inner">
              <Sprout className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black text-amber-400">{t('appTitle')}</span>
              <span className="text-[10px] text-emerald-200 font-medium tracking-wide">Agri Platform</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive 
                      ? 'bg-emerald-800 text-amber-300 font-bold' 
                      : 'text-emerald-100 hover:bg-emerald-800/60 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Controls: Persona Role Switcher & Language Dropdown */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setRoleDropdownOpen(!roleDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-xs font-bold border border-emerald-700 transition-all touch-target"
                title="Switch active user role"
              >
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span className="capitalize">{role} View</span>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-300" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-fadeIn">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Switch Persona</div>
                  
                  <button
                    onClick={() => { switchRole('farmer'); setRoleDropdownOpen(false); navigate('/dashboard'); }}
                    className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center gap-2 hover:bg-emerald-50 ${role === 'farmer' ? 'text-emerald-700 bg-emerald-50/50' : 'text-slate-700'}`}
                  >
                    <Tractor className="w-4 h-4 text-emerald-600" /> 👨‍🌾 Farmer Persona
                  </button>

                  <button
                    onClick={() => { switchRole('buyer'); setRoleDropdownOpen(false); navigate('/buyers-fpo'); }}
                    className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center gap-2 hover:bg-emerald-50 ${role === 'buyer' ? 'text-emerald-700 bg-emerald-50/50' : 'text-slate-700'}`}
                  >
                    <ShoppingBag className="w-4 h-4 text-blue-600" /> 🏬 Wholesale Buyer
                  </button>

                  <button
                    onClick={() => { switchRole('fpo'); setRoleDropdownOpen(false); navigate('/buyers-fpo'); }}
                    className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center gap-2 hover:bg-emerald-50 ${role === 'fpo' ? 'text-emerald-700 bg-emerald-50/50' : 'text-slate-700'}`}
                  >
                    <Users className="w-4 h-4 text-purple-600" /> 🤝 FPO Lead
                  </button>

                  <button
                    onClick={() => { switchRole('admin'); setRoleDropdownOpen(false); navigate('/admin'); }}
                    className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center gap-2 hover:bg-emerald-50 ${role === 'admin' ? 'text-emerald-700 bg-emerald-50/50' : 'text-slate-700'}`}
                  >
                    <Shield className="w-4 h-4 text-amber-600" /> 🛡️ System Admin
                  </button>
                </div>
              )}
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setRoleDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 text-xs font-black shadow-sm transition-all touch-target"
              >
                <Globe className="w-4 h-4" />
                <span>{languages.find(l => l.code === language)?.nativeName || 'English'}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 py-2 z-50">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Select Language</div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-bold flex items-center justify-between hover:bg-emerald-50 ${
                        language === lang.code ? 'text-emerald-700 bg-emerald-50/70' : 'text-slate-700'
                      }`}
                    >
                      <span>{lang.nativeName}</span>
                      <span className="text-[10px] text-slate-400">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Link */}
            <Link
              to="/profile"
              className="p-1.5 rounded-full bg-emerald-800 hover:bg-emerald-700 border border-emerald-700 text-emerald-100 flex items-center justify-center touch-target"
              title="Farmer Profile"
            >
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=100&auto=format&fit=crop&q=80"}
                alt="Farmer Profile"
                className="w-7 h-7 rounded-full object-cover"
              />
            </Link>

          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => navigate('/language')}
              className="px-2.5 py-1 rounded-lg bg-amber-500 text-emerald-950 font-bold text-xs"
            >
              {languages.find(l => l.code === language)?.nativeName || 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-emerald-100 hover:text-white rounded-lg touch-target"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-emerald-950 border-t border-emerald-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-800 text-xs text-emerald-300">
            <span>Role: <strong className="capitalize text-amber-300">{role}</strong></span>
            <div className="flex gap-1">
              <button onClick={() => switchRole('farmer')} className="px-2 py-0.5 rounded bg-emerald-800 text-white font-bold text-[10px]">Farmer</button>
              <button onClick={() => switchRole('buyer')} className="px-2 py-0.5 rounded bg-blue-800 text-white font-bold text-[10px]">Buyer</button>
              <button onClick={() => switchRole('admin')} className="px-2 py-0.5 rounded bg-amber-800 text-white font-bold text-[10px]">Admin</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold text-center border border-emerald-800"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold text-center col-span-2"
            >
              {t('adminTitle', 'Admin Dashboard')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
