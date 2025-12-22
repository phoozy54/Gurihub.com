
import React from 'react';
import { Building2, Users, DollarSign, TrendingUp, ArrowUpRight, Plus, Calendar } from 'lucide-react';
import { Property, Tenant, Transaction } from '../types';

interface DashboardProps {
  properties: Property[];
  tenants: Tenant[];
  totalRevenue: number;
  occupancyRate: number;
  transactions: Transaction[];
  activities: any[];
}

export const Dashboard: React.FC<DashboardProps> = ({ properties, tenants, transactions }) => {
  const stats = [
    { label: 'Total Revenue', value: '$24.5k', icon: DollarSign, trend: '+12%', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { label: 'Active Leases', value: tenants.length || '42', icon: Users, trend: '98%', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { label: 'Total Units', value: properties.length || '12', icon: Building2, trend: '+2', color: 'text-brand-500', bg: 'bg-brand-50 dark:bg-brand-500/10' },
    { label: 'Maintenance', value: '03', icon: TrendingUp, trend: 'Critical', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Dulmarka Maamulka</h1>
           <p className="text-slate-500 dark:text-slate-400 font-medium text-lg mt-1">Ku soo dhowow nidaamka GuriHub PMS.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white dark:bg-slate-800 p-4 rounded-[1.5rem] border border-slate-100 dark:border-slate-700 shadow-sm text-slate-600 dark:text-slate-300">
              <Calendar size={22} />
           </button>
           <button className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-8 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-2xl flex items-center gap-2">
              <Plus size={20} /> New Report
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="group bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
             <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                   <stat.icon size={28} strokeWidth={2.5} />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                   {stat.trend} <ArrowUpRight size={12} />
                </div>
             </div>
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
             <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Featured Chart Section */}
         <div className="lg:col-span-8 bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="relative z-10">
               <h3 className="text-2xl font-black mb-8">Performance Analytics</h3>
               <div className="h-[300px] w-full flex items-end justify-between gap-4">
                  {[40, 65, 45, 90, 55, 80, 70].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                       <div className="w-full bg-white/10 rounded-full relative overflow-hidden h-full">
                          <div 
                             className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-brand-600 to-brand-400 rounded-full transition-all duration-1000 delay-300" 
                             style={{ height: `${h}%` }}
                          />
                       </div>
                       <span className="text-[10px] font-black text-slate-500 uppercase">W{i+1}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Transactions Column */}
         <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8">Recent Activity</h3>
            <div className="space-y-6">
               {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center gap-5 group cursor-pointer">
                     <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-all">
                        <DollarSign size={24} />
                     </div>
                     <div className="flex-1">
                        <p className="font-black text-slate-800 dark:text-white text-sm">Rent Received</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Hassan Ali • 2h ago</p>
                     </div>
                     <div className="text-right">
                        <p className="font-black text-emerald-500">$450</p>
                     </div>
                  </div>
               ))}
               <button className="w-full mt-6 py-4 bg-slate-50 dark:bg-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                  View Transaction History
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
