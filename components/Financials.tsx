
import React, { useState } from 'react';
import { Transaction, Organization, User, Currency } from '../types';
import { ArrowUpCircle, ArrowDownCircle, DollarSign, Download, Filter, Plus, X } from 'lucide-react';
import { offlineService } from '../services/offlineService';

interface FinancialsProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  organizations: Organization[];
  addActivity: (text: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  currentUser: User;
}

export const Financials: React.FC<FinancialsProps> = ({ transactions, setTransactions, organizations, addActivity, currentUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTx, setNewTx] = useState({
    description: '',
    amount: '',
    type: 'Income',
    category: 'Rent',
    date: new Date().toISOString().split('T')[0],
    organizationId: ''
  });
  
  const canEdit = currentUser.role === 'SuperAdmin' || currentUser.role === 'AgencyManager';

  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const expense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleAddTransaction = () => {
    if (!newTx.description || !newTx.amount) return;

    const transaction: Transaction = {
      id: `TRX${Date.now()}`,
      date: newTx.date,
      description: newTx.description,
      category: newTx.category as any,
      amount: parseFloat(newTx.amount),
      currency: Currency.USD,
      type: newTx.type as any,
      status: 'Completed',
      reference: `INV-${Math.floor(Math.random() * 10000)}`,
      organizationId: newTx.organizationId || undefined
    };

    if (!navigator.onLine) {
      offlineService.addToQueue({
        id: `ACT-${Date.now()}`,
        type: 'ADD_TRANSACTION',
        payload: transaction,
        timestamp: Date.now()
      });
      addActivity(`Offline: Lacagta waa la kaydiyay. Marka internetku soo noqdo ayaa lala waafajinayaa nidaamka.`, 'warning');
    } else {
      setTransactions([transaction, ...transactions]);
      addActivity(`${newTx.type === 'Income' ? 'Dakhli' : 'Kharash'} la diiwaangeliyay: $${newTx.amount}`, newTx.type === 'Income' ? 'success' : 'info');
    }

    setIsModalOpen(false);
    setNewTx({ description: '', amount: '', type: 'Income', category: 'Rent', date: new Date().toISOString().split('T')[0], organizationId: '' });
  };

  const inputClasses = "w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Maaliyadda (Financials)</h1>
        <div className="flex gap-2">
           <button className="border border-gray-300 dark:border-slate-700 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2">
             <Download size={16} /> Dhoofi
           </button>
           {canEdit && (
             <button 
               onClick={() => setIsModalOpen(true)}
               className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 text-sm shadow-sm flex items-center gap-2"
             >
               <Plus size={16} /> Diiwaangeli Lacag
             </button>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-green-100 dark:border-green-900/30 shadow-sm transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Wadarta Dakhliga</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">${income.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
              <ArrowUpCircle size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-red-100 dark:border-red-900/30 shadow-sm transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Wadarta Kharashka</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">${expense.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
              <ArrowDownCircle size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors">
        <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800 dark:text-white">Dhaqdhaqaaqyadii Ugu Dambeeyay</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-slate-700/50 text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium">Taariikh</th>
                <th className="px-6 py-3 font-medium">Faahfaahin</th>
                <th className="px-6 py-3 font-medium">Qaybta</th>
                <th className="px-6 py-3 font-medium text-right">Lacagta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{t.date}</td>
                  <td className="px-6 py-3 text-gray-900 dark:text-white font-medium">{t.description}</td>
                  <td className="px-6 py-3">
                    <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-slate-700 text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600">
                      {t.category}
                    </span>
                  </td>
                  <td className={`px-6 py-3 text-right font-bold ${t.type === 'Income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {t.type === 'Income' ? '+' : '-'}${t.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {transactions.length === 0 && (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">Dhaqdhaqaaq lacageed ma jiro.</div>
          )}
        </div>
      </div>

      {isModalOpen && canEdit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold text-gray-800 dark:text-white">Diiwaangeli Lacag</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2 bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
                 <button 
                   onClick={() => setNewTx({...newTx, type: 'Income'})}
                   className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${newTx.type === 'Income' ? 'bg-white dark:bg-slate-700 shadow text-green-600 dark:text-green-400' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   Dakhli
                 </button>
                 <button 
                   onClick={() => setNewTx({...newTx, type: 'Expense'})}
                   className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${newTx.type === 'Expense' ? 'bg-white dark:bg-slate-700 shadow text-red-600 dark:text-red-400' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   Kharash
                 </button>
              </div>

              <div>
                <label className={labelClasses}>Faahfaahin (Description)</label>
                <input 
                  type="text" 
                  className={inputClasses}
                  placeholder="Tusaale: Kiro August"
                  value={newTx.description}
                  onChange={e => setNewTx({...newTx, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Qaybta</label>
                  <select className={inputClasses} value={newTx.category} onChange={e => setNewTx({...newTx, category: e.target.value})}>
                    <option value="Rent">Kiro</option>
                    <option value="Maintenance">Dayactir</option>
                    <option value="Utility">Koronto/Biyo</option>
                    <option value="Other">Kale</option>
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Lacagta (USD)</label>
                  <input type="number" className={inputClasses} placeholder="0.00" value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-100 dark:border-slate-800">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium">Jooji</button>
              <button onClick={handleAddTransaction} className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-md">Kaydi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
