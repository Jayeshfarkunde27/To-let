
import React, { useEffect, useState } from 'react';
import { getOwnerProperties } from '../../services/db';
import { Property } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Eye, Users, Plus, LayoutGrid, ArrowUpRight, Loader2, Settings, MoreHorizontal, Bell } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const data = [
  { name: 'Mon', views: 240 },
  { name: 'Tue', views: 138 },
  { name: 'Wed', views: 400 },
  { name: 'Thu', views: 300 },
  { name: 'Fri', views: 200 },
  { name: 'Sat', views: 278 },
  { name: 'Sun', views: 189 },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getOwnerProperties(user.uid).then(props => {
        setProperties(props);
        setLoading(false);
      });
    }
  }, [user]);

  const totalViews = 1250; // Mock stat for demo, as views aren't tracking in real-time yet

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-950"><Loader2 className="animate-spin text-indigo-600" /></div>;

  return (
    <div className="p-4 md:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Overview of your rental business performance.</p>
          </div>
          <button
            onClick={() => navigate('/owner/add-property')}
            className="bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-slate-200 dark:shadow-indigo-900/30 transition-all hover:-translate-y-0.5"
          >
            <Plus size={20} /> Add Property
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Active Listings', value: properties.length, icon: LayoutGrid, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20', change: 'Live now' },
            { label: 'Total Views', value: totalViews, icon: Eye, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-900/20', change: 'This week' },
            { label: 'Leads', value: '3', icon: Users, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20', change: 'New today' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                  <stat.icon size={24} />
                </div>
                <span className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                  <ArrowUpRight size={12} /> {stat.change}
                </span>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-1">{stat.value}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Engagement</h3>
                <p className="text-sm text-slate-400 dark:text-slate-500">Views over time</p>
              </div>
              <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium rounded-xl px-3 py-2 outline-none text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <option>Last 7 Days</option>
              </select>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 500 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', padding: '12px 16px', backgroundColor: '#fff', color: '#1E293B' }}
                    itemStyle={{ color: '#1E293B', fontWeight: 600 }}
                    labelStyle={{ color: '#94A3B8', marginBottom: '4px' }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#4F46E5" strokeWidth={4} fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
              Notifications
            </h3>
            <div className="flex flex-col items-center justify-center h-48 text-center text-slate-400 dark:text-slate-500">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-full mb-2">
                <Bell size={24} />
              </div>
              <p>No new notifications</p>
            </div>
          </div>
        </div>

        {/* Listings Table */}
        <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Your Listings</h3>
            <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-4">Property</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {properties.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-8 text-center text-slate-500 dark:text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <p>You haven't listed any properties yet.</p>
                        <button
                          onClick={async () => {
                            if (!user) return;
                            setLoading(true);
                            // Dynamic import to avoid loading mock data in heavy bundle
                            const { seedMockProperties } = await import('../../services/db');
                            await seedMockProperties(user.uid);
                            const props = await getOwnerProperties(user.uid);
                            setProperties(props);
                            setLoading(false);
                          }}
                          className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                        >
                          Generate Mock Data for Demo
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  properties.map(prop => (
                    <tr key={prop.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => navigate(`/property/${prop.id}`)}>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <img src={prop.images[0]} className="w-16 h-16 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300" alt="" />
                          <div>
                            <p className="font-bold text-slate-800 dark:text-slate-100">{prop.title}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1 flex items-center gap-1"><LayoutGrid size={10} /> {prop.type}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold border border-emerald-100 dark:border-emerald-800 flex w-fit items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-700 dark:text-slate-200">${prop.price}<span className="text-slate-400 dark:text-slate-500 text-xs font-normal">/mo</span></div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {new Date(prop.availableFrom).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all">
                          <Settings size={18} />
                        </button>
                      </td>
                    </tr>
                  )))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
