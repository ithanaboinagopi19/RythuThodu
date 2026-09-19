import React, { useState } from 'react';
import {
  Users,
  Package,
  ShoppingBag,
  Building2,
  Bug,
  Snowflake,
  Search,
  Plus,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
  XCircle,
  FileText
} from 'lucide-react';
import { Sidebar } from '../components/common/Sidebar';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { StatusBadge } from '../components/common/StatusBadge';
import { useLanguage } from '../contexts/LanguageContext';
import {
  INITIAL_FARMERS,
  MARKET_PRICES,
  BUYERS,
  COLD_STORAGES,
  LOGISTICS_PROVIDERS,
  DISEASES
} from '../data/mockData';

export const AdminDashboard = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { title: t('statFarmers', 'Total Farmers'), count: "12,450", change: "+12%", icon: Users, color: "bg-emerald-600" },
    { title: t('statListings', 'Active Listings'), count: "3,820", change: "+8%", icon: Package, color: "bg-blue-600" },
    { title: t('statBuyers', 'Verified Buyers'), count: "480", change: "+5%", icon: ShoppingBag, color: "bg-purple-600" },
    { title: t('statFPOs', 'Registered FPOs'), count: "125", change: "+15%", icon: Building2, color: "bg-amber-600" },
    { title: t('statDiagnoses', 'Crop Diagnoses'), count: "45,900", change: "+24%", icon: Bug, color: "bg-red-600" },
    { title: t('statStorage', 'Cold Facilities'), count: "64", change: "+4%", icon: Snowflake, color: "bg-cyan-600" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[88vh] bg-slate-100 -m-4 sm:-m-6 lg:-m-8">
      
      {/* Admin Sidebar */}
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Admin Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase">
                System Admin
              </span>
              <span className="text-xs text-slate-400 font-mono">v1.0.4 MVP</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-1">
              {t('adminTitle', 'RythuThodu System Administration')}
            </h1>
            <p className="text-xs text-slate-600 font-medium">
              {t('adminSubtitle', 'Monitor platform activity, verify buyers, update market prices, and manage crop knowledgebase.')}
            </p>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="primary" icon={Plus}>Add Market Rate</Button>
            <Button size="sm" variant="secondary" icon={ShieldCheck}>Verify Buyer</Button>
          </div>
        </div>

        {/* Overview Stats Cards */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {stats.map((st, i) => {
                const Icon = st.icon;
                return (
                  <Card key={i} className="p-4 space-y-2 border border-slate-200">
                    <div className={`w-9 h-9 rounded-xl ${st.color} text-white flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-500 block">{st.title}</span>
                      <span className="text-xl font-black text-slate-900">{st.count}</span>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {st.change} this month
                    </span>
                  </Card>
                );
              })}
            </div>

            {/* Quick Management Table: Registered Farmers */}
            <Card className="p-6 space-y-4 border border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900">Recent Farmer Registrations</h3>
                <Input
                  placeholder="Search farmers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={Search}
                  className="w-64"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-3">Farmer ID</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Mobile</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Main Crop</th>
                      <th className="p-3">Language</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {INITIAL_FARMERS.map((f) => (
                      <tr key={f.id} className="hover:bg-emerald-50/50">
                        <td className="p-3 font-mono font-bold text-emerald-700">{f.id}</td>
                        <td className="p-3 font-bold">{f.name}</td>
                        <td className="p-3">{f.phone}</td>
                        <td className="p-3">{f.village}, {f.district}</td>
                        <td className="p-3 font-bold">{f.mainCrop}</td>
                        <td className="p-3 uppercase">{f.language}</td>
                        <td className="p-3"><StatusBadge status="Verified" variant="success" /></td>
                      </tr>
                    ))}
                    <tr className="hover:bg-emerald-50/50">
                      <td className="p-3 font-mono font-bold text-emerald-700">FARMER-102</td>
                      <td className="p-3 font-bold">Venkatesh Rao</td>
                      <td className="p-3">9440188231</td>
                      <td className="p-3">Mangalagiri, Guntur</td>
                      <td className="p-3 font-bold">Chilli</td>
                      <td className="p-3 uppercase">te</td>
                      <td className="p-3"><StatusBadge status="Verified" variant="success" /></td>
                    </tr>
                    <tr className="hover:bg-emerald-50/50">
                      <td className="p-3 font-mono font-bold text-emerald-700">FARMER-103</td>
                      <td className="p-3 font-bold">Subbaiah Naidu</td>
                      <td className="p-3">9849211044</td>
                      <td className="p-3">Tenali, Guntur</td>
                      <td className="p-3 font-bold">Rice</td>
                      <td className="p-3 uppercase">te</td>
                      <td className="p-3"><StatusBadge status="Pending" variant="warning" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Tab: Buyers & FPOs Management Table */}
        {(activeTab === 'buyers' || activeTab === 'fpos') && (
          <Card className="p-6 space-y-4 border border-slate-200">
            <h3 className="text-lg font-black text-slate-900">Wholesale Buyers & FPO Approvals</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-3">Type</th>
                    <th className="p-3">Organization Name</th>
                    <th className="p-3">Contact Person</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Required Crop</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {BUYERS.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold">{b.type}</td>
                      <td className="p-3 font-bold">{b.name}</td>
                      <td className="p-3">{b.contactPerson}</td>
                      <td className="p-3 font-mono">{b.phone}</td>
                      <td className="p-3 font-bold text-emerald-700">{b.cropRequired}</td>
                      <td className="p-3">
                        <StatusBadge status={b.verified ? "Verified" : "Pending"} variant={b.verified ? "success" : "warning"} />
                      </td>
                      <td className="p-3 flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Tab: Disease Database */}
        {activeTab === 'diseases' && (
          <Card className="p-6 space-y-4 border border-slate-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-black text-slate-900">Crop Disease Knowledge Base</h3>
              <Button size="sm" variant="primary" icon={Plus}>Add New Disease</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DISEASES.map((d) => (
                <div key={d.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-extrabold text-emerald-800 uppercase">{d.cropName}</span>
                      <h4 className="text-base font-black text-slate-900">{d.name} ({d.nameTe})</h4>
                      <span className="text-xs italic text-slate-500 font-mono">{d.scientificName}</span>
                    </div>
                    <StatusBadge status={d.severity} variant="danger" />
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{d.quickAction}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Fallback for other tabs */}
        {['farmers', 'treatments', 'prices', 'storage', 'logistics', 'reports'].includes(activeTab) && (
          <Card className="p-8 text-center space-y-3 border border-slate-200">
            <h3 className="text-lg font-black text-slate-900 capitalize">Management: {activeTab}</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Module active in Admin Console. Connected to simulated database registry with full CRUD mapping for PostgreSQL schema.
            </p>
          </Card>
        )}

      </main>
    </div>
  );
};
