
import React, { useState } from 'react';
import { Tenant, Transaction, MaintenanceRequest, PaymentMethod, Priority } from '../types';
import { Home, CreditCard, Wrench, FileText, Send, Smartphone, Check, Clock, ShieldCheck, Plus, Info, Copy } from 'lucide-react';

interface TenantPortalProps {
  tenant: Tenant;
  transactions: Transaction[];
  maintenanceRequests: MaintenanceRequest[];
  onAddMaintenance: (r: MaintenanceRequest) => void;
  addActivity: (t: string) => void;
  activeTab: string;
  setActiveTab: (t: string) => void;
  currentUser: any;
}

export const TenantPortal: React.FC<TenantPortalProps> = ({ tenant, transactions, maintenanceRequests, onAddMaintenance, activeTab, setActiveTab }) => {
  const [payModal, setPayModal] = useState(false);
  const [refNum, setRefNum] = useState('');

  const myTx = transactions.filter(t => t.tenantId === tenant.id);
  const myReqs = maintenanceRequests.filter(r => r.tenantName === tenant.name);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
      {/* Header Dashboard */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-3xl bg-brand-600 flex items-center justify-center text-3xl font-black border-4 border-slate-800 shadow-xl">
                 {tenant.name.charAt(0)}
              </div>
              <div>
                 <h1 className="text-3xl font-black tracking-tight">Kusoo dhawaada, {tenant.name}!</h1>
                 <p className="text-slate-400 font-medium flex items-center gap-2 mt-1">
                    <Home size={16} className="text-brand-500" /> {tenant.propertyName} • Unit {tenant.unitNumber}
                 </p>
              </div>
           </div>
           <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-3xl border border-white/5 text-center min-w-[200px]">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Hadhaaga (Balance)</p>
              <h2 className={`text-4xl font-black ${tenant.balance > 0 ? 'text-rose-500' : 'text-emerald-400'}`}>${tenant.balance}</h2>
              {tenant.balance > 0 && (
                <button onClick={() => setPayModal(true)} className="mt-4 w-full py-2 bg-brand-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-700 transition-all">Bixi Kirada</button>
              )}
           </div>
        </div>
      </div>

      {/* Quick Tabs Simulation (If logic permits) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Maintenance Summary */}
         <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Dayactirka</h3>
               <Wrench size={20} className="text-brand-600" />
            </div>
            <div className="space-y-4">
               {myReqs.slice(0, 2).map(r => (
                  <div key={r.id} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                     <p className="text-sm font-bold dark:text-white">{r.title}</p>
                     <span className="text-[9px] font-black uppercase px-2 py-1 bg-brand-100 text-brand-700 rounded-full">{r.status}</span>
                  </div>
               ))}
               <button onClick={() => setActiveTab('maintenance')} className="w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-[10px] font-black text-slate-400 uppercase hover:text-brand-600 transition-colors">Eeg dhammaan</button>
            </div>
         </div>

         {/* Lease Summary */}
         <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Heshiiska</h3>
               <FileText size={20} className="text-brand-600" />
            </div>
            <div className="space-y-3 text-sm font-bold">
               <div className="flex justify-between text-slate-500"><span>Bilowga:</span><span className="text-slate-900 dark:text-white">{tenant.leaseStart}</span></div>
               <div className="flex justify-between text-slate-500"><span>Dhamaadka:</span><span className="text-slate-900 dark:text-white">{tenant.leaseEnd}</span></div>
               <div className="flex justify-between pt-3 border-t border-slate-50 dark:border-slate-700"><span>Kiro/Mo:</span><span className="text-brand-600">${tenant.rentAmount}</span></div>
            </div>
         </div>
      </div>

      {/* Payment Modal */}
      {payModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-black dark:text-white">Wareejinta Zaad</h2>
                 <button onClick={() => setPayModal(false)} className="text-slate-400">✕</button>
              </div>
              <div className="space-y-6">
                 <div className="p-5 bg-brand-50 dark:bg-brand-900/20 rounded-3xl border border-brand-100 dark:border-brand-800">
                    <p className="text-[10px] font-black text-brand-600 uppercase mb-2">Account-ka Mulkiilaha</p>
                    <div className="flex justify-between items-center">
                       <span className="font-black text-xl dark:text-white">4440001</span>
                       <button className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm"><Copy size={16} /></button>
                    </div>
                 </div>
                 <input 
                   type="text" 
                   placeholder="Reference Number (Ref)" 
                   className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
                   value={refNum}
                   onChange={e => setRefNum(e.target.value)}
                 />
                 <button 
                   onClick={() => { alert(`Mahadsanid! Ref: ${refNum} waa la diray.`); setPayModal(false); }}
                   className="w-full py-4 bg-brand-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-brand-600/20"
                 >
                   Xaqiiji Lacagta
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
