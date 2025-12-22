
import React, { useState } from 'react';
import { UtilityBill, Property, Currency } from '../types';
import { Zap, Droplets, Wifi, Trash2, Plus, Search, Filter, CheckCircle, X } from 'lucide-react';

interface UtilityBillingProps {
  bills: UtilityBill[];
  setBills: React.Dispatch<React.SetStateAction<UtilityBill[]>>;
  properties: Property[];
  addActivity: (text: string, type: 'success' | 'warning' | 'error' | 'info') => void;
}

export const UtilityBilling: React.FC<UtilityBillingProps> = ({ bills, setBills, properties, addActivity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBill, setNewBill] = useState<Partial<UtilityBill>>({
    propertyId: '',
    type: 'Electricity',
    provider: 'Sompower',
    amount: 0,
    readingDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().split('T')[0],
    status: 'Unpaid'
  });

  const handleAddBill = () => {
    if (!newBill.propertyId || !newBill.amount) return;

    const property = properties.find(p => p.id === newBill.propertyId);
    
    const bill: UtilityBill = {
      id: `UTIL-${Date.now()}`,
      propertyId: newBill.propertyId,
      propertyName: property?.name || 'Unknown',
      unitNumber: newBill.unitNumber || 'Main',
      type: newBill.type as any,
      provider: newBill.provider || 'Provider',
      readingDate: newBill.readingDate!,
      amount: newBill.amount,
      currency: Currency.USD,
      status: 'Unpaid',
      dueDate: newBill.dueDate!,
      currentReading: newBill.currentReading,
      previousReading: newBill.previousReading
    };

    setBills([bill, ...bills]);
    addActivity(`New ${bill.type} bill added for ${bill.propertyName}`, 'info');
    setIsModalOpen(false);
    setNewBill({ propertyId: '', type: 'Electricity', provider: 'Sompower', amount: 0, readingDate: new Date().toISOString().split('T')[0], status: 'Unpaid' });
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'Electricity': return <Zap size={18} className="text-yellow-500" />;
      case 'Water': return <Droplets size={18} className="text-blue-500" />;
      case 'Internet': return <Wifi size={18} className="text-purple-500" />;
      default: return <Trash2 size={18} className="text-gray-500" />;
    }
  };

  const filteredBills = bills.filter(b => 
    b.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Utility Billing (Biilasha)</h1>
           <p className="text-sm text-gray-500 dark:text-gray-400">Track Electricity, Water, and Service charges</p>
        </div>
        <button 
           onClick={() => setIsModalOpen(true)}
           className="bg-brand-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-brand-700 shadow-sm flex items-center gap-2"
        >
           <Plus size={18} /> Record Reading
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
             <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 rounded-lg font-bold text-xl">$ {bills.filter(b => b.status === 'Overdue').reduce((s, b) => s + b.amount, 0)}</div>
             <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Overdue</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Needs attention</p>
             </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
             <div className="p-3 bg-orange-50 dark:bg-orange-900/30 text-orange-600 rounded-lg font-bold text-xl">$ {bills.filter(b => b.status === 'Unpaid').reduce((s, b) => s + b.amount, 0)}</div>
             <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Pending</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">To be collected</p>
             </div>
          </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-700 text-gray-500 dark:text-gray-400">
                  <tr>
                     <th className="px-6 py-4 font-semibold">Utility Type</th>
                     <th className="px-6 py-4 font-semibold">Property / Unit</th>
                     <th className="px-6 py-4 font-semibold">Reading Period</th>
                     <th className="px-6 py-4 font-semibold">Usage</th>
                     <th className="px-6 py-4 font-semibold">Amount</th>
                     <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {filteredBills.map(bill => (
                     <tr key={bill.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
                                 {getTypeIcon(bill.type)}
                              </div>
                              <div>
                                 <p className="font-bold text-gray-900 dark:text-white">{bill.type}</p>
                                 <p className="text-xs text-gray-500">{bill.provider}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                           <div className="font-medium">{bill.propertyName}</div>
                           <div className="text-xs text-gray-400">Unit: {bill.unitNumber}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                           {bill.readingDate}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                           {bill.currentReading && bill.previousReading ? 
                              <span>{(bill.currentReading - bill.previousReading).toFixed(1)} units</span> : 
                              <span className="text-gray-400 italic">Fixed Rate</span>
                           }
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                           ${bill.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                              bill.status === 'Paid' ? 'bg-green-100 text-green-700' :
                              bill.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                           }`}>
                              {bill.status}
                           </span>
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
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Record Utility Reading</h2>
                  <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
               </div>
               
               <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Type</label>
                        <select 
                           className="w-full border rounded-xl p-3 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                           value={newBill.type}
                           onChange={e => {
                              const type = e.target.value;
                              setNewBill({
                                 ...newBill, 
                                 type: type as any,
                                 provider: type === 'Electricity' ? 'Sompower' : type === 'Water' ? 'Hargeisa Water' : 'Local Provider'
                              })
                           }}
                        >
                           <option value="Electricity">Electricity</option>
                           <option value="Water">Water</option>
                           <option value="Internet">Internet</option>
                           <option value="Garbage">Garbage</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Provider</label>
                        <input 
                           type="text" 
                           className="w-full border rounded-xl p-3 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                           value={newBill.provider}
                           onChange={e => setNewBill({...newBill, provider: e.target.value})}
                        />
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Property</label>
                     <select 
                        className="w-full border rounded-xl p-3 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        value={newBill.propertyId}
                        onChange={e => setNewBill({...newBill, propertyId: e.target.value})}
                     >
                        <option value="">Select Property</option>
                        {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                     </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Prev Reading</label>
                        <input 
                           type="number" 
                           className="w-full border rounded-xl p-3 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                           value={newBill.previousReading}
                           onChange={e => setNewBill({...newBill, previousReading: parseFloat(e.target.value)})}
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Curr Reading</label>
                        <input 
                           type="number" 
                           className="w-full border rounded-xl p-3 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                           value={newBill.currentReading}
                           onChange={e => setNewBill({...newBill, currentReading: parseFloat(e.target.value)})}
                        />
                     </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-xl border border-gray-100 dark:border-slate-600">
                      <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-300">Total Bill Amount ($)</label>
                      <input 
                           type="number" 
                           className="w-full border rounded-xl p-3 text-lg font-bold text-green-700 dark:text-green-400 dark:bg-slate-800 dark:border-slate-600"
                           value={newBill.amount}
                           onChange={e => setNewBill({...newBill, amount: parseFloat(e.target.value)})}
                      />
                  </div>
               </div>

               <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-slate-700">
                  <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl text-sm font-bold">Cancel</button>
                  <button onClick={handleAddBill} className="px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-bold hover:bg-brand-700 shadow-sm">Save Bill</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};
    