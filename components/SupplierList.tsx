
import React, { useState } from 'react';
import { Supplier } from '../types';
import { Search, Plus, Phone, Mail, CheckCircle, X, MoreHorizontal, Star, User, Shield, Zap, Wrench, PenTool } from 'lucide-react';

interface SupplierListProps {
  suppliers: Supplier[];
  setSuppliers: React.Dispatch<React.SetStateAction<Supplier[]>>;
  addActivity: (text: string, type: 'success' | 'warning' | 'error' | 'info') => void;
}

export const SupplierList: React.FC<SupplierListProps> = ({ suppliers, setSuppliers, addActivity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    companyName: '',
    contactPerson: '',
    serviceType: 'General',
    phone: '',
    email: '',
    status: 'Active',
    hourlyRate: 0,
    licenseNumber: ''
  });

  const handleAddSupplier = () => {
    if (!newSupplier.companyName || !newSupplier.contactPerson) return;

    const supplier: Supplier = {
      id: `S${Date.now()}`,
      companyName: newSupplier.companyName,
      contactPerson: newSupplier.contactPerson,
      serviceType: newSupplier.serviceType as any,
      phone: newSupplier.phone || '',
      email: newSupplier.email || '',
      status: 'Active',
      hourlyRate: newSupplier.hourlyRate || 0,
      licenseNumber: newSupplier.licenseNumber,
      jobsCompleted: 0
    };

    setSuppliers([...suppliers, supplier]);
    addActivity(`New Supplier Added: ${supplier.companyName}`, 'success');
    setIsModalOpen(false);
    setNewSupplier({ companyName: '', contactPerson: '', serviceType: 'General', phone: '', email: '', status: 'Active', hourlyRate: 0, licenseNumber: '' });
  };

  const filteredSuppliers = suppliers.filter(s => 
    s.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getServiceIcon = (type: string) => {
    switch(type) {
      case 'Plumbing': return Wrench;
      case 'Electrical': return Zap;
      case 'Security': return Shield;
      case 'Construction': return PenTool;
      default: return User;
    }
  };

  const getServiceColor = (type: string) => {
    switch(type) {
      case 'Plumbing': return 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Electrical': return 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Security': return 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      case 'Construction': return 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Suppliers & Trades</h1>
           <p className="text-sm text-gray-500 dark:text-gray-400">Manage contractors and service providers</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
             {/* Search */}
             <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                <input 
                    type="text" 
                    placeholder="Search trades..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white transition-shadow"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {/* Add Button */}
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-100 shadow-sm flex items-center gap-2 transition-transform active:scale-95"
            >
                <Plus size={18} /> Add Pro
            </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => {
            const ServiceIcon = getServiceIcon(supplier.serviceType);
            const colorClass = getServiceColor(supplier.serviceType);
            
            return (
            <div key={supplier.id} className="group bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                        <div className={`h-14 w-14 rounded-xl flex items-center justify-center shadow-sm ${colorClass}`}>
                            <ServiceIcon size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight group-hover:text-brand-600 transition-colors">{supplier.companyName}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-slate-600">
                                    {supplier.serviceType}
                                </span>
                                {supplier.status === 'Active' && (
                                    <span className="flex items-center gap-0.5 text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded-full">
                                        <CheckCircle size={10} /> Active
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1">
                        <MoreHorizontal size={20} />
                    </button>
                </div>

                {/* Info */}
                <div className="space-y-3 mb-6 bg-gray-50/50 dark:bg-slate-700/50 p-4 rounded-xl border border-gray-100/50 dark:border-slate-700/50">
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-600 flex items-center justify-center border border-gray-100 dark:border-slate-500 text-gray-400 dark:text-gray-300">
                            <User size={14} />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{supplier.contactPerson}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-600 flex items-center justify-center border border-gray-100 dark:border-slate-500 text-gray-400 dark:text-gray-300">
                             <Phone size={14} />
                        </div>
                        <a href={`tel:${supplier.phone}`} className="hover:text-brand-600 hover:underline decoration-brand-600 underline-offset-2 transition-colors">{supplier.phone}</a>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-600 flex items-center justify-center border border-gray-100 dark:border-slate-500 text-gray-400 dark:text-gray-300">
                            <Mail size={14} />
                        </div>
                        <a href={`mailto:${supplier.email}`} className="truncate hover:text-brand-600 hover:underline decoration-brand-600 underline-offset-2 transition-colors">{supplier.email}</a>
                    </div>
                </div>

                {/* Stats Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                    <div className="text-center px-2">
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-wider">Rate</p>
                        <p className="font-bold text-gray-900 dark:text-white text-lg">${supplier.hourlyRate}<span className="text-xs text-gray-400 font-normal">/hr</span></p>
                    </div>
                    <div className="h-8 w-px bg-gray-200 dark:bg-slate-600"></div>
                    <div className="text-center px-2">
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-wider">Jobs</p>
                        <p className="font-bold text-gray-900 dark:text-white text-lg">{supplier.jobsCompleted}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-200 dark:bg-slate-600"></div>
                    <div className="text-center px-2">
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-wider">Rating</p>
                        <div className="flex items-center gap-1 font-bold text-gray-900 dark:text-white text-lg">
                             4.9 <Star size={12} className="fill-orange-400 text-orange-400" />
                        </div>
                    </div>
                </div>
            </div>
        )})}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-slate-700 pb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Supplier</h2>
                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400 rounded-full transition-colors"><X size={20} /></button>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                        <input 
                            type="text" 
                            className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-shadow dark:text-white"
                            placeholder="e.g. Pro Plumbing Co"
                            value={newSupplier.companyName}
                            onChange={(e) => setNewSupplier({...newSupplier, companyName: e.target.value})}
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Contact Person</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-shadow dark:text-white"
                                placeholder="Full Name"
                                value={newSupplier.contactPerson}
                                onChange={(e) => setNewSupplier({...newSupplier, contactPerson: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Service Type</label>
                            <select 
                                className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-shadow dark:text-white"
                                value={newSupplier.serviceType}
                                onChange={(e) => setNewSupplier({...newSupplier, serviceType: e.target.value as any})}
                            >
                                <option value="General">General</option>
                                <option value="Plumbing">Plumbing</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Cleaning">Cleaning</option>
                                <option value="Construction">Construction</option>
                                <option value="Security">Security</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-shadow dark:text-white"
                                placeholder="+252..."
                                value={newSupplier.phone}
                                onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                            />
                         </div>
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Hourly Rate ($)</label>
                            <input 
                                type="number" 
                                className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-shadow dark:text-white"
                                placeholder="0.00"
                                value={newSupplier.hourlyRate}
                                onChange={(e) => setNewSupplier({...newSupplier, hourlyRate: parseFloat(e.target.value)})}
                            />
                         </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input 
                            type="email" 
                            className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-shadow dark:text-white"
                            placeholder="email@example.com"
                            value={newSupplier.email}
                            onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100 dark:border-slate-700">
                    <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl text-sm font-bold transition-colors">Cancel</button>
                    <button 
                        onClick={handleAddSupplier}
                        disabled={!newSupplier.companyName}
                        className="px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-bold hover:bg-brand-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:shadow-none"
                    >
                        Save Supplier
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
