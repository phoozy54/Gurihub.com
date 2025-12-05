
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Property, Tenant, ActivityLog, Transaction } from '../types';
import { Building2, CalendarDays, DollarSign, TrendingUp, Smartphone, Globe, Briefcase, Bell } from 'lucide-react';

interface DashboardProps {
  properties: Property[];
  tenants: Tenant[];
  totalRevenue: number;
  occupancyRate: number;
  activities: ActivityLog[];
  transactions: Transaction[];
}

export const Dashboard: React.FC<DashboardProps> = ({ properties, totalRevenue, activities, transactions }) => {
  
  const revenueData = [
    { name: 'Jan', income: 4000, bookings: 24 },
    { name: 'Feb', income: 3000, bookings: 18 },
    { name: 'Mar', income: 2000, bookings: 12 },
    { name: 'Apr', income: 2780, bookings: 20 },
    { name: 'May', income: 1890, bookings: 15 },
    { name: 'Jun', income: 2390, bookings: 22 },
  ];

  const statusData = [
    { name: 'Available', value: properties.filter(p => p.status === 'Available').length },
    { name: 'Booked', value: properties.filter(p => p.status === 'Booked').length },
    { name: 'Maintenance', value: properties.filter(p => p.status === 'Maintenance').length },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Platform Overview</h1>
          <p className="text-sm text-gray-500">Welcome back, Super Admin</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-brand-700 flex items-center gap-2">
             <Bell size={16} /> Push Notifications
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
           <div>
             <p className="text-sm font-medium text-gray-500">Total Agencies</p>
             <h3 className="text-2xl font-bold text-gray-800 mt-1">12</h3>
             <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded mt-2 inline-block">+2 this week</span>
           </div>
           <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
             <Briefcase size={24} />
           </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
           <div>
             <p className="text-sm font-medium text-gray-500">Active Bookings</p>
             <h3 className="text-2xl font-bold text-gray-800 mt-1">84</h3>
             <span className="text-xs text-gray-500 mt-2 inline-block">Across 3 Countries</span>
           </div>
           <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
             <CalendarDays size={24} />
           </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
           <div>
             <p className="text-sm font-medium text-gray-500">Platform Revenue</p>
             <h3 className="text-2xl font-bold text-gray-800 mt-1">${totalRevenue.toLocaleString()}</h3>
             <span className="text-xs text-green-600 flex items-center mt-2">
                <TrendingUp size={12} className="mr-1" /> 15% Commision
             </span>
           </div>
           <div className="p-3 bg-green-50 rounded-lg text-green-600">
             <DollarSign size={24} />
           </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
           <div>
             <p className="text-sm font-medium text-gray-500">Mobile Users</p>
             <h3 className="text-2xl font-bold text-gray-800 mt-1">1.2k</h3>
             <span className="text-xs text-orange-500 bg-orange-50 px-2 py-1 rounded mt-2 inline-block">iOS & Android</span>
           </div>
           <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
             <Smartphone size={24} />
           </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Volume Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">Booking Volume & Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="income" fill="#059669" radius={[4, 4, 0, 0]} name="Revenue ($)" />
                <Bar dataKey="bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global Property Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-800 mb-4">Live Inventory</h3>
           <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie 
                      data={statusData} 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={50} 
                      outerRadius={70} 
                      paddingAngle={5} 
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                 </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="flex flex-col gap-2 mt-2">
              {statusData.map((entry, index) => (
                 <div key={entry.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                       <span className="text-gray-600">{entry.name}</span>
                    </div>
                    <span className="font-medium text-gray-800">{entry.value}</span>
                 </div>
              ))}
           </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">Real-time Platform Activity</h3>
        <div className="space-y-4">
           {activities.map((activity) => (
             <div key={activity.id} className="flex gap-3 items-start p-3 rounded-lg border border-gray-50 bg-gray-50">
                <div className="mt-1 flex-shrink-0">
                  <Globe size={16} className="text-brand-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-800 font-medium leading-snug">{activity.text}</p>
                  <span className="text-xs text-gray-400 block mt-1">{activity.timestamp}</span>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
