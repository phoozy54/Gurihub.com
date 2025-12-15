
import React from 'react';
import { User, Property, Transaction, MaintenanceRequest, Tenant, Organization } from '../types';
import { Building2, TrendingUp, DollarSign, PenTool, CheckCircle2 } from 'lucide-react';

interface OwnerPortalProps {
  currentUser: User | null;
  properties: Property[];
  transactions: Transaction[];
  maintenanceRequests: MaintenanceRequest[];
  tenants: Tenant[];
  rentals: Organization[];
}

export const OwnerPortal: React.FC<OwnerPortalProps> = ({ properties, transactions }) => {
  // Mock filter for owner specific data
  const myProperties = properties.slice(0, 2); 
  const myRevenue = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Owner Dashboard</h1>
           <p className="text-sm text-gray-500">Overview of your real estate portfolio.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <p className="text-gray-500 text-sm font-medium">My Properties</p>
           <h3 className="text-3xl font-bold text-gray-800 mt-2">{myProperties.length}</h3>
           <div className="mt-4 flex gap-2">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1"><CheckCircle2 size={10} /> 100% Occupied</span>
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <p className="text-gray-500 text-sm font-medium">Total Revenue (YTD)</p>
           <h3 className="text-3xl font-bold text-green-600 mt-2">${myRevenue.toLocaleString()}</h3>
           <div className="mt-4 flex gap-2">
              <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full flex items-center gap-1"><TrendingUp size={10} /> +12% vs last year</span>
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <p className="text-gray-500 text-sm font-medium">Maintenance Costs</p>
           <h3 className="text-3xl font-bold text-orange-600 mt-2">$450</h3>
           <div className="mt-4 flex gap-2">
              <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full flex items-center gap-1"><PenTool size={10} /> 2 Active Requests</span>
           </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mt-8">My Properties</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {myProperties.map(p => (
            <div key={p.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex">
               <div className="w-1/3 bg-gray-100 relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover absolute inset-0" />
               </div>
               <div className="p-4 w-2/3">
                  <h4 className="font-bold text-gray-900">{p.name}</h4>
                  <p className="text-sm text-gray-500 mb-2">{p.address}</p>
                  <div className="flex gap-2 mb-4">
                     <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-lg font-medium">Occupied</span>
                     <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg font-medium">{p.type}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                     <span className="font-bold text-gray-900">${p.monthlyRent}/mo</span>
                     <button className="text-brand-600 text-sm font-medium hover:underline">View Reports</button>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};
