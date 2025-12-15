
import React, { useState } from 'react';
import { User, Tenant, Transaction, MaintenanceRequest } from '../types';
import { Home, CreditCard, Wrench, Clock, CheckCircle2 } from 'lucide-react';

interface TenantPortalProps {
  currentUser: User | null;
  tenant: Tenant;
  transactions: Transaction[];
  maintenanceRequests: MaintenanceRequest[];
  onAddMaintenance: (req: MaintenanceRequest) => void;
}

export const TenantPortal: React.FC<TenantPortalProps> = ({ tenant }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'maintenance'>('overview');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
         <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
               <Home size={32} />
            </div>
            <div>
               <h1 className="text-2xl font-bold text-gray-900">Welcome, {tenant.name}</h1>
               <p className="text-gray-500">{tenant.propertyName} • Unit {tenant.unitNumber}</p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
               onClick={() => setActiveTab('overview')}
               className={`p-4 rounded-xl border text-left transition-all ${activeTab === 'overview' ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
               <Home className="mb-2 text-brand-600" />
               <p className="font-bold text-gray-800">Overview</p>
               <p className="text-xs text-gray-500">Lease status & info</p>
            </button>
            <button 
               onClick={() => setActiveTab('payments')}
               className={`p-4 rounded-xl border text-left transition-all ${activeTab === 'payments' ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
               <CreditCard className="mb-2 text-brand-600" />
               <p className="font-bold text-gray-800">Payments</p>
               <p className="text-xs text-gray-500">Pay rent & view history</p>
            </button>
            <button 
               onClick={() => setActiveTab('maintenance')}
               className={`p-4 rounded-xl border text-left transition-all ${activeTab === 'maintenance' ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
               <Wrench className="mb-2 text-brand-600" />
               <p className="font-bold text-gray-800">Maintenance</p>
               <p className="text-xs text-gray-500">Report issues</p>
            </button>
         </div>
      </div>

      {activeTab === 'overview' && (
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Lease Information</h2>
            <div className="grid grid-cols-2 gap-6">
               <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Lease Period</label>
                  <p className="font-medium text-gray-800">{tenant.leaseStart} - {tenant.leaseEnd}</p>
               </div>
               <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Monthly Rent</label>
                  <p className="font-medium text-gray-800">${tenant.rentAmount}/mo</p>
               </div>
               <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Status</label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                     {tenant.status}
                  </span>
               </div>
               <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Outstanding Balance</label>
                  <p className={`font-bold ${tenant.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>${tenant.balance}</p>
               </div>
            </div>
         </div>
      )}

      {activeTab === 'payments' && (
         <div className="space-y-4">
            <div className="bg-brand-600 p-6 rounded-2xl text-white flex justify-between items-center shadow-lg">
               <div>
                  <p className="text-brand-100 text-sm font-medium mb-1">Current Balance Due</p>
                  <p className="text-4xl font-bold">${tenant.balance.toLocaleString()}</p>
               </div>
               <button className="bg-white text-brand-700 px-6 py-3 rounded-lg font-bold hover:bg-brand-50 shadow-sm">
                  Pay Now
               </button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
               <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="font-bold text-gray-700">Payment History</h3>
               </div>
               <div className="p-8 text-center text-gray-500 italic">
                  No recent payment history available.
               </div>
            </div>
         </div>
      )}
    </div>
  );
};
