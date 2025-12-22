
import React, { useState } from 'react';
import { Tenant, TenantStatus, Property, Organization, User, Currency } from '../types';
import { 
  Search, Filter, Mail, Phone, Download, Plus, X, 
  Building2, User as UserIcon, Save, ChevronRight, 
  ChevronLeft, Home, FileText, Check, ExternalLink, Edit3, 
  Calendar, DollarSign, ArrowRight, ShieldCheck, CreditCard,
  History, Wrench, AlertCircle, TrendingUp, Printer,
  UserPlus, MapPin, Briefcase, FileCheck, Shield, CreditCard as CardIcon
} from 'lucide-react';

interface TenantListProps {
  tenants: Tenant[];
  setTenants: React.Dispatch<React.SetStateAction<Tenant[]>>;
  properties: Property[];
  organizations?: Organization[];
  addActivity: (text: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  currentUser: User;
}

export const TenantList: React.FC<TenantListProps> = ({ tenants, setTenants, properties, organizations = [], addActivity, currentUser }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<'profile' | 'finance' | 'history'>('profile');
  
  // Advanced Wizard State
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [newTenant, setNewTenant] = useState({
    name: '',
    idNumber: '', // Added ID number
    propertyId: '',
    unitNumber: '',
    rentAmount: '',
    securityDeposit: '', // Added Deposit
    phone: '',
    email: '',
    organizationId: '',
    leaseStart: new Date().toISOString().split('T')[0],
    leaseEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    status: TenantStatus.Active,
    notes: ''
  });

  const canEdit = currentUser.role === 'SuperAdmin' || currentUser.role === 'AgencyManager';

  const filtered = tenants.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                          t.unitNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const resetForm = () => {
    setNewTenant({ 
      name: '', idNumber: '', propertyId: '', unitNumber: '', rentAmount: '', 
      securityDeposit: '', phone: '', email: '', organizationId: '',
      leaseStart: new Date().toISOString().split('T')[0],
      leaseEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      status: TenantStatus.Active,
      notes: ''
    });
    setCurrentStep(1);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!newTenant.name || !newTenant.phone) return alert("Fadlan buuxi magaca iyo telefoonka.");
    }
    if (currentStep === 2) {
      if (!newTenant.propertyId) return alert("Fadlan dooro hantida.");
    }
    if (currentStep === 3) {
      if (!newTenant.rentAmount || !newTenant.leaseStart || !newTenant.leaseEnd) return alert("Fadlan buuxi xogta kirada iyo waqtiga.");
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleAddTenant = () => {
    const selectedProp = properties.find(p => p.id === newTenant.propertyId);
    
    const tenant: Tenant = {
      id: `T${Date.now()}`,
      name: newTenant.name,
      propertyId: newTenant.propertyId,
      propertyName: selectedProp?.name || 'Unknown Property',
      unitNumber: newTenant.unitNumber || 'N/A',
      rentAmount: parseFloat(newTenant.rentAmount),
      currency: Currency.USD,
      status: newTenant.status as TenantStatus,
      leaseStart: newTenant.leaseStart,
      leaseEnd: newTenant.leaseEnd,
      email: newTenant.email,
      phone: newTenant.phone,
      balance: 0,
      organizationId: newTenant.organizationId || undefined
    };

    setTenants([tenant, ...tenants]);
    addActivity(`Kirayste cusub ayaa lagu daray: ${tenant.name}`, 'success');
    handleCloseAddModal();
  };

  const getStatusBadge = (status: TenantStatus) => {
    switch (status) {
      case TenantStatus.Active:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">Firfircoon</span>;
      case TenantStatus.Late:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50">Daahey</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">Hore</span>;
    }
  };

  const inputClasses = "w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all";
  const labelClasses = "block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1";

  const renderWizardStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 mb-4 bg-brand-50 dark:bg-brand-900/20 p-4 rounded-2xl border border-brand-100 dark:border-brand-800">
               <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-brand-600">
                  <UserIcon size={24} />
               </div>
               <div>
                  <h4 className="font-black text-slate-900 dark:text-white leading-tight">Faahfaahinta Shakhsiga</h4>
                  <p className="text-xs text-slate-500 font-medium">Geli xogta aasaasiga ah ee kiraystaha.</p>
               </div>
            </div>
            <div>
              <label className={labelClasses}>Magaca Kiraystaha <span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                className={inputClasses}
                placeholder="Magaca oo buuxa"
                value={newTenant.name}
                onChange={e => setNewTenant({...newTenant, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Telefoonka <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  className={inputClasses}
                  placeholder="+252..."
                  value={newTenant.phone}
                  onChange={e => setNewTenant({...newTenant, phone: e.target.value})}
                />
              </div>
              <div>
                <label className={labelClasses}>Email</label>
                <input 
                  type="email" 
                  className={inputClasses}
                  placeholder="email@example.com"
                  value={newTenant.email}
                  onChange={e => setNewTenant({...newTenant, email: e.target.value})}
                />
              </div>
            </div>
            <div>
               <label className={labelClasses}>Nambarka Aqoonsiga (ID/Passport)</label>
               <input 
                 type="text" 
                 className={inputClasses}
                 placeholder="SL-ID-XXXXX"
                 value={newTenant.idNumber}
                 onChange={e => setNewTenant({...newTenant, idNumber: e.target.value})}
               />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 mb-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800">
               <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-blue-600">
                  <MapPin size={24} />
               </div>
               <div>
                  <h4 className="font-black text-slate-900 dark:text-white leading-tight">Hantida & Booska</h4>
                  <p className="text-xs text-slate-500 font-medium">Dooro guriga uu degayo kiraystuhu.</p>
               </div>
            </div>
            <div>
               <label className={labelClasses}>Dooro Guriga <span className="text-rose-500">*</span></label>
               <select 
                 className={inputClasses}
                 value={newTenant.propertyId}
                 onChange={e => setNewTenant({...newTenant, propertyId: e.target.value})}
               >
                 <option value="">-- Dooro Hantida --</option>
                 {properties.map(p => (
                   <option key={p.id} value={p.id}>{p.name} ({p.status})</option>
                 ))}
               </select>
            </div>
            <div>
               <label className={labelClasses}>Unit Number / Qolka</label>
               <input 
                 type="text" 
                 className={inputClasses}
                 placeholder="e.g. A-101 ama Dabaqa 2aad"
                 value={newTenant.unitNumber}
                 onChange={e => setNewTenant({...newTenant, unitNumber: e.target.value})}
               />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 mb-4 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800">
               <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-emerald-600">
                  <DollarSign size={24} />
               </div>
               <div>
                  <h4 className="font-black text-slate-900 dark:text-white leading-tight">Kirada & Heshiiska</h4>
                  <p className="text-xs text-slate-500 font-medium">Cadadka lacagta iyo mudada heshiiska.</p>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Kirada Bishii ($) <span className="text-rose-500">*</span></label>
                <input 
                  type="number" 
                  className={inputClasses}
                  placeholder="0.00"
                  value={newTenant.rentAmount}
                  onChange={e => setNewTenant({...newTenant, rentAmount: e.target.value})}
                />
              </div>
              <div>
                <label className={labelClasses}>Deposit-ka Hordhaca ah ($)</label>
                <input 
                  type="number" 
                  className={inputClasses}
                  placeholder="0.00"
                  value={newTenant.securityDeposit}
                  onChange={e => setNewTenant({...newTenant, securityDeposit: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className={labelClasses}>Bilowga Heshiiska <span className="text-rose-500">*</span></label>
                  <input type="date" className={inputClasses} value={newTenant.leaseStart} onChange={e => setNewTenant({...newTenant, leaseStart: e.target.value})} />
               </div>
               <div>
                  <label className={labelClasses}>Dhamaadka Heshiiska <span className="text-rose-500">*</span></label>
                  <input type="date" className={inputClasses} value={newTenant.leaseEnd} onChange={e => setNewTenant({...newTenant, leaseEnd: e.target.value})} />
               </div>
            </div>
          </div>
        );
      case 4:
        const selectedProp = properties.find(p => p.id === newTenant.propertyId);
        return (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
             <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
               <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck size={32} />
               </div>
               <h4 className="text-lg font-black text-slate-800 dark:text-white mb-2">Hubi Xogta u dambaysa</h4>
               <p className="text-xs text-slate-500 font-medium mb-6">Fadlan hubi in dhammaan xogtaadu ay sax tahay ka hor intaanan kaydin.</p>
               
               <div className="space-y-3 text-left">
                 <div className="flex justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="text-xs text-slate-400 font-bold uppercase">Kiraystaha</span>
                    <span className="text-sm font-black dark:text-white">{newTenant.name}</span>
                 </div>
                 <div className="flex justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="text-xs text-slate-400 font-bold uppercase">Hantida</span>
                    <span className="text-sm font-black dark:text-white">{selectedProp?.name} - {newTenant.unitNumber}</span>
                 </div>
                 <div className="flex justify-between p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl border border-brand-100 dark:border-brand-800">
                    <span className="text-xs text-brand-600 dark:text-brand-400 font-bold uppercase">Kiro / Mo</span>
                    <span className="text-sm font-black text-brand-700 dark:text-brand-300">${newTenant.rentAmount}</span>
                 </div>
               </div>
             </div>
             <div>
                <label className={labelClasses}>Notes (Ikhtiyaari)</label>
                <textarea 
                  className={`${inputClasses} h-20 resize-none`}
                  placeholder="Geli qoraal kasta oo muhiim ah..."
                  value={newTenant.notes}
                  onChange={e => setNewTenant({...newTenant, notes: e.target.value})}
                ></textarea>
             </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Kiraystayaasha</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Maamul xogta iyo heshiisyada guryaha kirada ah.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          {canEdit && (
            <button 
              onClick={() => { resetForm(); setIsAddModalOpen(true); }}
              className="bg-brand-600 text-white px-6 py-3 rounded-2xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/20 flex items-center gap-2 text-sm font-black active:scale-95"
            >
              <UserPlus size={18} /> Kirayste Cusub
            </button>
          )}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Raadi kirayste..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold dark:text-white transition-shadow shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
              <tr>
                <th className="px-6 py-5 font-black text-slate-400 dark:text-slate-400 uppercase tracking-widest text-[10px]">Kiraystaha</th>
                <th className="px-6 py-5 font-black text-slate-400 dark:text-slate-400 uppercase tracking-widest text-[10px]">Hantida & Unit</th>
                <th className="px-6 py-5 font-black text-slate-400 dark:text-slate-400 uppercase tracking-widest text-[10px]">Xaaladda</th>
                <th className="px-6 py-5 font-black text-slate-400 dark:text-slate-400 uppercase tracking-widest text-[10px]">Kirada Bishii</th>
                <th className="px-6 py-5 font-black text-slate-400 dark:text-slate-400 uppercase tracking-widest text-[10px] text-right">Ficil</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
              {filtered.map((tenant) => (
                <tr 
                  key={tenant.id} 
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all cursor-pointer group"
                  onClick={() => { setSelectedTenant(tenant); setActiveDetailTab('profile'); }}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-400 flex items-center justify-center font-black text-lg border border-brand-200 dark:border-brand-800 group-hover:scale-110 transition-transform">
                        {tenant.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 dark:text-white text-base">{tenant.name}</p>
                        <p className="text-xs text-slate-400 font-medium">{tenant.phone || 'No Phone'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                     <p className="font-bold text-slate-800 dark:text-slate-200">{tenant.propertyName}</p>
                     <p className="text-xs text-slate-500 font-medium">Unit: <span className="text-brand-600 font-bold">{tenant.unitNumber}</span></p>
                  </td>
                  <td className="px-6 py-5">{getStatusBadge(tenant.status)}</td>
                  <td className="px-6 py-5 font-black text-slate-900 dark:text-white text-base font-mono">${tenant.rentAmount.toLocaleString()}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                       <button className="p-2 bg-slate-50 dark:bg-slate-700 rounded-xl text-slate-400 group-hover:text-brand-600 transition-colors">
                          <ChevronRight size={20} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-slate-500 dark:text-slate-400 font-bold">Ma jiro kirayste xogtan leh.</div>
          )}
        </div>
      </div>

      {/* --- ENHANCED TENANT ONBOARDING WIZARD --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-[110] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-xl shadow-2xl flex flex-col overflow-hidden border border-white/20">
            {/* Header with Enhanced Stepper */}
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
               <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Onboarding Kirayste</h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Somaliland Real Estate Edition</p>
                  </div>
                  <button onClick={handleCloseAddModal} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-white dark:hover:bg-slate-800 rounded-full transition-all"><X size={24} /></button>
               </div>
               
               {/* Advanced Stepper Indicator */}
               <div className="relative flex justify-between px-2">
                  <div className="absolute top-5 left-10 right-10 h-0.5 bg-slate-200 dark:bg-slate-800 -z-10">
                    <div 
                      className="h-full bg-brand-600 transition-all duration-500" 
                      style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                    ></div>
                  </div>
                  {[1, 2, 3, 4].map(step => {
                    const icons = [<UserIcon size={16}/>, <MapPin size={16}/>, <DollarSign size={16}/>, <FileCheck size={16}/>];
                    return (
                      <div key={step} className="flex flex-col items-center gap-3">
                        <div className={`h-10 w-10 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${
                           currentStep === step ? 'bg-brand-600 border-brand-600 text-white shadow-xl shadow-brand-500/30 scale-110' :
                           currentStep > step ? 'bg-brand-100 dark:bg-brand-900/30 border-brand-200 text-brand-600' :
                           'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                        }`}>
                           {currentStep > step ? <Check size={18} strokeWidth={3} /> : icons[step-1]}
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest ${currentStep >= step ? 'text-brand-600' : 'text-slate-400'}`}>
                           {step === 1 ? 'Profile' : step === 2 ? 'Unit' : step === 3 ? 'Kiro' : 'Hubi'}
                        </span>
                      </div>
                    );
                  })}
               </div>
            </div>

            {/* Step Body */}
            <div className="p-8 flex-1 overflow-y-auto max-h-[50vh]">
               {renderWizardStep()}
            </div>

            {/* Footer Buttons */}
            <div className="p-8 border-t border-slate-100 dark:border-slate-800 flex justify-between bg-slate-50/50 dark:bg-slate-950/20">
               <button 
                 onClick={currentStep === 1 ? handleCloseAddModal : handlePrevStep}
                 className="px-6 py-3 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-slate-800 rounded-2xl transition-all flex items-center gap-2"
               >
                 {currentStep === 1 ? 'Jooji' : <><ChevronLeft size={18}/> Dib u Noqo</>}
               </button>
               <button 
                 onClick={currentStep < totalSteps ? handleNextStep : handleAddTenant}
                 className={`px-10 py-3 rounded-2xl font-black text-white shadow-xl transition-all active:scale-95 flex items-center gap-2 ${
                    currentStep === totalSteps ? 'bg-emerald-600 shadow-emerald-500/20 hover:bg-emerald-700' : 'bg-brand-600 shadow-brand-500/20 hover:bg-brand-700'
                 }`}
               >
                 {currentStep === totalSteps ? (
                    <>Dhamaystir <Check size={18}/></>
                 ) : (
                    <>Talaabada Xigta <ChevronRight size={18}/></>
                 )}
               </button>
            </div>
          </div>
        </div>
      )}

      {/* --- TENANT PREMIUM DETAIL MODAL --- */}
      {selectedTenant && (
        <div className="fixed inset-0 bg-slate-950/80 z-[100] flex items-center justify-center p-4 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-4xl shadow-2xl overflow-hidden border border-white/20 flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[90vh]">
            
            {/* Left Sidebar - Profile Summary */}
            <div className="w-full md:w-80 bg-slate-900 dark:bg-black p-10 text-white flex flex-col shrink-0">
               <div className="flex flex-col items-center text-center mb-10">
                  <div className="h-32 w-32 rounded-[2.5rem] bg-brand-600 flex items-center justify-center text-5xl font-black shadow-2xl border-4 border-slate-900 mb-6 group overflow-hidden relative">
                     <div className="absolute inset-0 bg-gradient-to-tr from-brand-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <span className="relative z-10">{selectedTenant.name.charAt(0)}</span>
                  </div>
                  <h2 className="text-3xl font-black tracking-tight mb-2">{selectedTenant.name}</h2>
                  <div className="px-4 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                     Active Tenant
                  </div>
               </div>

               <div className="space-y-6 flex-1">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Hantida</p>
                     <p className="font-bold flex items-center gap-2"><Home size={16} className="text-brand-500" /> {selectedTenant.propertyName}</p>
                     <p className="text-xs text-slate-400 font-medium ml-6">Unit: {selectedTenant.unitNumber}</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Xiriirka</p>
                     <p className="font-bold flex items-center gap-2"><Phone size={16} className="text-brand-500" /> {selectedTenant.phone}</p>
                     <p className="font-bold flex items-center gap-2 mt-1"><Mail size={16} className="text-brand-500" /> {selectedTenant.email}</p>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                     <div className="flex justify-between items-baseline mb-1">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Balance</p>
                        <p className={`text-xl font-black ${selectedTenant.balance > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>${selectedTenant.balance}</p>
                     </div>
                     <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[100%]"></div>
                     </div>
                  </div>
               </div>

               <div className="mt-10 pt-6 border-t border-white/10 flex flex-col gap-3">
                  <button className="w-full py-3 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                     <Printer size={16} /> Print Lease
                  </button>
                  <button onClick={() => setSelectedTenant(null)} className="w-full py-3 bg-white/5 text-slate-400 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all">
                     Close
                  </button>
               </div>
            </div>

            {/* Right Side - Content Area */}
            <div className="flex-1 bg-slate-50 dark:bg-slate-900 flex flex-col overflow-hidden">
               {/* Nav Tabs */}
               <div className="p-8 pb-0 flex gap-8 border-b border-slate-200 dark:border-slate-800">
                  {[
                     { id: 'profile', label: 'Faahfaahinta', icon: UserIcon },
                     { id: 'finance', label: 'Lacagaha', icon: DollarSign },
                     { id: 'history', label: 'Dhaqdhaqaaqa', icon: History }
                  ].map(tab => (
                     <button 
                        key={tab.id}
                        onClick={() => setActiveDetailTab(tab.id as any)}
                        className={`pb-4 text-sm font-black uppercase tracking-widest flex items-center gap-2 transition-all relative ${
                           activeDetailTab === tab.id 
                              ? 'text-brand-600' 
                              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`}
                     >
                        <tab.icon size={16} /> {tab.label}
                        {activeDetailTab === tab.id && <div className="absolute bottom-0 inset-x-0 h-1 bg-brand-600 rounded-full"></div>}
                     </button>
                  ))}
               </div>

               {/* Tab Content */}
               <div className="p-8 overflow-y-auto flex-1">
                  {activeDetailTab === 'profile' && (
                     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                 <FileText size={14} className="text-brand-600" /> Lease Summary
                              </h3>
                              <div className="space-y-4">
                                 <div className="flex justify-between items-center"><span className="text-sm text-slate-500 font-bold">Bilowga:</span><span className="text-sm font-black dark:text-white">{selectedTenant.leaseStart}</span></div>
                                 <div className="flex justify-between items-center"><span className="text-sm text-slate-500 font-bold">Dhamaadka:</span><span className="text-sm font-black dark:text-white">{selectedTenant.leaseEnd}</span></div>
                                 <div className="flex justify-between items-center pt-2 border-t border-slate-50 dark:border-slate-700"><span className="text-sm text-slate-500 font-bold">Rent/Mo:</span><span className="text-lg font-black text-brand-600">${selectedTenant.rentAmount}</span></div>
                              </div>
                           </div>
                           <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                 <Check size={14} className="text-brand-600" /> Quick Stats
                              </h3>
                              <div className="space-y-4">
                                 <div className="flex justify-between items-center"><span className="text-sm text-slate-500 font-bold">Total Paid:</span><span className="text-sm font-black text-emerald-600">$4,250</span></div>
                                 <div className="flex justify-between items-center"><span className="text-sm text-slate-500 font-bold">Months:</span><span className="text-sm font-black dark:text-white">5 Active</span></div>
                                 <div className="flex justify-between items-center pt-2 border-t border-slate-50 dark:border-slate-700"><span className="text-sm text-slate-500 font-bold">Security Deposit:</span><span className="text-lg font-black text-slate-900 dark:text-white">${selectedTenant.rentAmount * 2}</span></div>
                              </div>
                           </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Digital Lease Agreement</h3>
                           <div className="flex items-center gap-6">
                              <div className="h-20 w-16 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-slate-400">
                                 <FileText size={32} />
                              </div>
                              <div className="flex-1">
                                 <p className="font-black text-slate-900 dark:text-white">Residential_Agreement_v2.pdf</p>
                                 <p className="text-xs text-slate-500 font-medium">Signed via GuriHub Digital Sign • Jan 01, 2024</p>
                              </div>
                              <button className="px-6 py-2.5 bg-slate-900 dark:bg-slate-700 text-white rounded-xl font-black text-xs hover:bg-black transition-all">
                                 View Doc
                              </button>
                           </div>
                        </div>
                     </div>
                  )}

                  {activeDetailTab === 'finance' && (
                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-800">
                           <div className="flex items-center gap-4">
                              <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl text-emerald-600 shadow-sm"><TrendingUp size={24} /></div>
                              <div>
                                 <p className="text-xs font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">Payment Health</p>
                                 <p className="text-lg font-black text-slate-900 dark:text-white">Always On Time</p>
                              </div>
                           </div>
                           <button className="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 active:scale-95 transition-all">
                              Record Payment
                           </button>
                        </div>

                        <div className="space-y-3">
                           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Recent Invoices</h3>
                           {[
                              { id: 'INV-102', date: 'May 01, 2024', amt: selectedTenant.rentAmount, status: 'Paid' },
                              { id: 'INV-101', date: 'Apr 01, 2024', amt: selectedTenant.rentAmount, status: 'Paid' },
                              { id: 'INV-100', date: 'Mar 01, 2024', amt: selectedTenant.rentAmount, status: 'Paid' }
                           ].map(inv => (
                              <div key={inv.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex justify-between items-center group hover:border-brand-300 transition-all">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 group-hover:text-brand-600 transition-colors">
                                       <CreditCard size={18} />
                                    </div>
                                    <div>
                                       <p className="font-black text-slate-900 dark:text-white">{inv.id}</p>
                                       <p className="text-[10px] text-slate-500 font-bold uppercase">{inv.date}</p>
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <p className="font-black text-slate-900 dark:text-white font-mono">${inv.amt}</p>
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{inv.status}</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {activeDetailTab === 'history' && (
                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="space-y-8">
                           {[
                              { icon: DollarSign, text: 'Rent payment received via Zaad.', time: '2 weeks ago', type: 'finance' },
                              { icon: Wrench, text: 'Reported leaking pipe in Kitchen.', time: '1 month ago', type: 'maintenance' },
                              { icon: ShieldCheck, text: 'Lease agreement renewed for 12 months.', time: '2 months ago', type: 'legal' }
                           ].map((item, idx) => (
                              <div key={idx} className="flex gap-6 relative group">
                                 {idx !== 2 && <div className="absolute left-6 top-10 bottom-[-32px] w-0.5 bg-slate-100 dark:bg-slate-800"></div>}
                                 <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 z-10 border-4 border-slate-50 dark:border-slate-900 ${
                                    item.type === 'finance' ? 'bg-emerald-100 text-emerald-600' :
                                    item.type === 'maintenance' ? 'bg-orange-100 text-orange-600' :
                                    'bg-blue-100 text-blue-600'
                                 }`}>
                                    <item.icon size={20} strokeWidth={2.5} />
                                 </div>
                                 <div className="pt-2">
                                    <p className="font-black text-slate-800 dark:text-slate-200 text-base leading-tight mb-1">{item.text}</p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.time}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
