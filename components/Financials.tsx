
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
      addActivity(`Offline: Transaction queued. Will sync when online.`, 'warning');
    } else {
      setTransactions([transaction, ...transactions]);
      addActivity(`${newTx.type === 'Income' ? 'Dakhli' : 'Kharash'} la diiwaangeliyay: $${newTx.amount}`, newTx.type === 'Income' ? 'success' : 'info');
    }

    setIsModalOpen(false);
    setNewTx({ description: '', amount: '', type: 'Income', category: 'Rent', date: new Date().toISOString().split('T')[0], organizationId: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Maaliyadda (Financials)</h1>
        <div className="flex gap-2">
           <button className="border border-gray-300 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Wadarta Dakhliga</p>
              <p className="text-2xl font-bold text-green-600 mt-1">${income.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <ArrowUpCircle size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Wadarta Kharashka</p>
              <p className="text-2xl font-bold text-red-600 mt-1">${expense.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <ArrowDownCircle size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Faa'iidada Saafiga ah</p>
              <p className="text-2xl font-bold text-brand-600 mt-1">${(income - expense).toLocaleString()}</p>
            </div>
            <div className="p-2 bg-blue-50 text-brand-600 rounded-lg">
              <DollarSign size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Dhaqdhaqaaqyadii Ugu Dambeeyay</h3>
          <button className="text-gray-500 hover:text-brand-600">
            <Filter size={18} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Taariikh</th>
                <th className="px-6 py-3 font-medium">Faahfaahin</th>
                <th className="px-6 py-3 font-medium">Qaybta</th>
                <th className="px-6 py-3 font-medium">Tixraac</th>
                <th className="px-6 py-3 font-medium text-right">Lacagta</th>
                <th className="px-6 py-3 font-medium text-center">Xaaladda</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-600">{t.date}</td>
                  <td className="px-6 py-3 text-gray-900 font-medium">
                    {t.description}
                    {t.organizationId && (
                      <span className="block text-xs text-brand-600 font-normal">
                        Org: {organizations.find(o => o.id === t.organizationId)?.name}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <span className="px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-600 border border-gray-200">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-500 font-mono text-xs">{t.reference}</td>
                  <td className={`px-6 py-3 text-right font-bold ${t.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.type === 'Income' ? '+' : '-'}${t.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {t.status === 'Completed' ? (
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500" title="Completed"></span>
                    ) : (
                      <span className="inline-block w-2 h-2 rounded-full bg-orange-400" title="Pending"></span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && canEdit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold text-gray-800">Diiwaangeli Lacag</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                 <button 
                   onClick={() => setNewTx({...newTx, type: 'Income'})}
                   className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${newTx.type === 'Income' ? 'bg-white shadow text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   Dakhli (Income)
                 </button>
                 <button 
                   onClick={() => setNewTx({...newTx, type: 'Expense'})}
                   className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${newTx.type === 'Expense' ? 'bg-white shadow text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   Kharash (Expense)
                 </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Faahfaahin (Description)</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="Tusaale: Kiro August"
                  value={newTx.description}
                  onChange={e => setNewTx({...newTx, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qaybta (Category)</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                    value={newTx.category}
                    onChange={e => setNewTx({...newTx, category: e.target.value})}
                  >
                    <option value="Rent">Kiro</option>
                    <option value="Maintenance">Dayactir</option>
                    <option value="Utility">Koronto/Biyo</option>
                    <option value="Salary">Mushaar</option>
                    <option value="Other">Kale</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lacagta (USD)</label>
                  <input 
                    type="number" 
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                    placeholder="0.00"
                    value={newTx.amount}
                    onChange={e => setNewTx({...newTx, amount: e.target.value})}
                  />
                </div>
              </div>

              {/* Organization Selector */}
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Xiriirka Hay'adda (Optional)</label>
                 <select
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                    value={newTx.organizationId}
                    onChange={e => setNewTx({...newTx, organizationId: e.target.value})}
                 >
                    <option value="">Dooro Hay'ad (None)</option>
                    {organizations.map(org => (
                       <option key={org.id} value={org.id}>{org.name}</option>
                    ))}
                 </select>
              </div>
              
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Taariikhda</label>
                 <input 
                   type="date"
                   className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                   value={newTx.date}
                   onChange={e => setNewTx({...newTx, date: e.target.value})}
                 />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">Jooji</button>
              <button 
                onClick={handleAddTransaction}
                disabled={!newTx.description || !newTx.amount}
                className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm disabled:opacity-50"
              >
                Kaydi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
