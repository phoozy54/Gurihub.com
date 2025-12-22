
import React, { useState } from 'react';
import { Lease, Property, Tenant, Currency } from '../types';
import { FileText, Plus, Search, Filter, AlertTriangle, Download, CheckCircle, X, Calendar, DollarSign } from 'lucide-react';

interface LeaseManagerProps {
  leases: Lease[];
  setLeases: React.Dispatch<React.SetStateAction<Lease[]>>;
  properties: Property[];
  tenants: Tenant[];
  addActivity: (text: string, type: 'success' | 'warning' | 'error' | 'info') => void;
}

export const LeaseManager: React.FC<LeaseManagerProps> = ({ leases, setLeases, properties, tenants, addActivity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLease, setNewLease] = useState<Partial<Lease>>({
    propertyId: '',
    tenantId: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    rentAmount: 0,
    depositAmount: 0,
    status: 'Active',
    frequency: 'Monthly',
    terms: 'Standard Somaliland Residential Lease Agreement'
  });

  const handleCreateLease = () => {
    if (!newLease.propertyId || !newLease.tenantId || !newLease.rentAmount) return;

    const property = properties.find(p => p.id === newLease.propertyId);
    const tenant = tenants.find(t => t.id === newLease.tenantId);

    const lease: Lease = {
      id: `LSE-${Date.now()}`,
      propertyId: newLease.propertyId,
      propertyName: property?.name || 'Unknown',
      tenantId: newLease.tenantId,
      tenantName: tenant?.name || 'Unknown',
      unitNumber: newLease.unitNumber || 'Main',
      startDate: newLease.startDate!,
      endDate: newLease.endDate!,
      rentAmount: newLease.rentAmount,
      depositAmount: newLease.depositAmount || 0,
      status: 'Active',
      terms: newLease.terms || '',
      frequency: newLease.frequency as any
    };

    setLeases([lease, ...leases]);
    addActivity(`New lease contract created for ${lease.tenantName}`, 'success');
    setIsModalOpen(false);
  };

  const filteredLeases = leases.filter(l => 
    l.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Lease Contracts (Heshiisyada)</h1>
           <p className="text-sm text-gray-500 dark:text-gray-400">Manage tenancy agreements and expirations</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
           <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                 type="text" 
                 placeholder="Search contracts..." 
                 className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="bg-brand-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-brand-700 shadow-sm flex items-center gap-2"
           >
             <Plus size={18} /> New Contract
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Stats */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Active Leases</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{leases.filter(l => l.status === 'Active').length}</h3>
            <div className="w-full bg-gray-100 dark:bg-slate-700 h-1.5 rounded-full mt-4">
               <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
            </div>
         </div>
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Expiring Soon (30 Days)</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{leases.filter(l => l.status === 'Expiring').length}</h3>
            <p className="text-xs text-orange-500 mt-2 flex items-center gap-1"><AlertTriangle size={12} /> Needs renewal</p>
         </div>
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Total Value (Monthly)</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">${leases.reduce((sum, l) => sum + (l.status === 'Active' ? l.rentAmount : 0), 0).toLocaleString()}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Recurring revenue</p>
         </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead className="bg-gray-50 dark:bg-slate-700/50 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-slate-700">
                  <tr>
                     <th className="px-6 py-4 font-semibold">Contract ID / Tenant</th>
                     <th className="px-6 py-4 font-semibold">Property</th>
                     <th className="px-6 py-4 font-semibold">Duration</th>
                     <th className="px-6 py-4 font-semibold">Financials</th>
                     <th className="px-6 py-4 font-semibold">Status</th>
                     <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {filteredLeases.map(lease => (
                     <tr key={lease.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-lg">
                                 <FileText size={16} />
                              </div>
                              <div>
                                 <p className="font-bold text-gray-900 dark:text-white">{lease.id}</p>
                                 <p className="text-xs text-gray-500 dark:text-gray-400">{lease.tenantName}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                           <div className="font-medium">{lease.propertyName}</div>
                           <div className="text-xs text-gray-400">Unit: {lease.unitNumber}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                           <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-gray-400" />
                              <span>{lease.startDate} <span className="text-gray-400 px-1">to</span> {lease.endDate}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="font-bold text-gray-900 dark:text-white">${lease.rentAmount.toLocaleString()}</div>
                           <div className="text-xs text-gray-500">{lease.frequency}</div>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                              lease.status === 'Active' ? 'bg-green-100 text-green-700 border border-green-200' :
                              lease.status === 'Expiring' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                              'bg-gray-100 text-gray-700 border border-gray-200'
                           }`}>
                              {lease.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button className="text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                              <Download size={18} />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {isModalOpen && (
         <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">New Lease Agreement</h2>
                  <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
               </div>
               
               <div className="space-y-4">
                  <div>
                     <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Tenant</label>
                     <select 
                        className="w-full border rounded-xl p-3 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        value={newLease.tenantId}
                        onChange={e => setNewLease({...newLease, tenantId: e.target.value})}
                     >
                        <option value="">Select Tenant</option>
                        {tenants.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                     </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Property</label>
                        <select 
                           className="w-full border rounded-xl p-3 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                           value={newLease.propertyId}
                           onChange={e => setNewLease({...newLease, propertyId: e.target.value})}
                        >
                           <option value="">Select Property</option>
                           {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Unit</label>
                        <input 
                           type="text" 
                           className="w-full border rounded-xl p-3 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                           placeholder="e.g. 101"
                           value={newLease.unitNumber}
                           onChange={e => setNewLease({...newLease, unitNumber: e.target.value})}
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Start Date</label>
                        <input 
                           type="date" 
                           className="w-full border rounded-xl p-3 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                           value={newLease.startDate}
                           onChange={e => setNewLease({...newLease, startDate: e.target.value})}
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">End Date</label>
                        <input 
                           type="date" 
                           className="w-full border rounded-xl p-3 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                           value={newLease.endDate}
                           onChange={e => setNewLease({...newLease, endDate: e.target.value})}
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Rent ($)</label>
                        <input 
                           type="number" 
                           className="w-full border rounded-xl p-3 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                           value={newLease.rentAmount}
                           onChange={e => setNewLease({...newLease, rentAmount: parseFloat(e.target.value)})}
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Deposit ($)</label>
                        <input 
                           type="number" 
                           className="w-full border rounded-xl p-3 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                           value={newLease.depositAmount}
                           onChange={e => setNewLease({...newLease, depositAmount: parseFloat(e.target.value)})}
                        />
                     </div>
                  </div>
               </div>

               <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-slate-700">
                  <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl text-sm font-bold">Cancel</button>
                  <button onClick={handleCreateLease} className="px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-bold hover:bg-brand-700 shadow-sm">Create Lease</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};
