
import React, { useState } from 'react';
import { Organization, OrganizationStatus, Property, Transaction, Tenant, RentalUnit, User } from '../types';
import { Search, Filter, Mail, Phone, Download, Plus, X, Building2, User as UserIcon, ArrowLeft, FileText, CheckCircle, Clock, Users, Trash2, Calendar, Edit2, Save } from 'lucide-react';

interface OrganizationListProps {
  organizations: Organization[];
  setOrganizations: React.Dispatch<React.SetStateAction<Organization[]>>;
  properties: Property[];
  transactions: Transaction[];
  tenants: Tenant[];
  addActivity: (text: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  currentUser: User;
}

export const OrganizationList: React.FC<OrganizationListProps> = ({ organizations, setOrganizations, properties, transactions, tenants, addActivity, currentUser }) => {
  const [search, setSearch] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgContact, setNewOrgContact] = useState('');
  const [newOrgEmail, setNewOrgEmail] = useState('');
  const [newOrgPhone, setNewOrgPhone] = useState('');
  const [newOrgTaxId, setNewOrgTaxId] = useState('');
  
  const [pendingRentals, setPendingRentals] = useState<Partial<RentalUnit>[]>([]);
  const [currentRental, setCurrentRental] = useState<Partial<RentalUnit>>({
    propertyId: '',
    unitNumber: '',
    rentAmount: 0,
    leaseStart: new Date().toISOString().split('T')[0],
    leaseEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
  });

  const canEdit = currentUser.role === 'SuperAdmin' || currentUser.role === 'AgencyManager';

  const filtered = organizations.filter(o => 
    o.name.toLowerCase().includes(search.toLowerCase()) || 
    o.contactPerson.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setNewOrgName('');
    setNewOrgContact('');
    setNewOrgEmail('');
    setNewOrgPhone('');
    setNewOrgTaxId('');
    setPendingRentals([]);
    setIsEditMode(false);
    setCurrentRental({
        propertyId: '',
        unitNumber: '',
        rentAmount: 0,
        leaseStart: new Date().toISOString().split('T')[0],
        leaseEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
    });
  };

  const handleOpenAdd = () => {
      resetForm();
      setIsEditMode(false);
      setIsModalOpen(true);
  };

  const handleOpenEdit = (org: Organization) => {
      setNewOrgName(org.name);
      setNewOrgContact(org.contactPerson);
      setNewOrgEmail(org.email);
      setNewOrgPhone(org.phone);
      setNewOrgTaxId(org.taxId || '');
      setPendingRentals([...org.rentals]);
      setIsEditMode(true);
      setIsModalOpen(true);
  };

  const handleAddUnit = () => {
    if (!currentRental.propertyId || !currentRental.rentAmount) return;
    const selectedProp = properties.find(p => p.id === currentRental.propertyId);
    
    setPendingRentals([...pendingRentals, {
      ...currentRental,
      propertyName: selectedProp?.name || 'Unknown',
      id: `TMP-${Date.now()}`
    }]);
    
    setCurrentRental({
      propertyId: '',
      unitNumber: '',
      rentAmount: 0,
      leaseStart: currentRental.leaseStart,
      leaseEnd: currentRental.leaseEnd
    });
  };

  const handleRemoveUnit = (index: number) => {
    const updated = [...pendingRentals];
    updated.splice(index, 1);
    setPendingRentals(updated);
  };

  const handleSaveOrganization = () => {
    if (!newOrgName || pendingRentals.length === 0) return;

    const rentalsPayload: RentalUnit[] = pendingRentals.map((r, idx) => ({
        id: r.id && !r.id.startsWith('TMP') ? r.id : `R-${Date.now()}-${idx}`,
        propertyId: r.propertyId!,
        propertyName: r.propertyName!,
        unitNumber: r.unitNumber || 'N/A',
        rentAmount: r.rentAmount || 0,
        leaseStart: r.leaseStart!,
        leaseEnd: r.leaseEnd!
    }));

    if (isEditMode && selectedOrg) {
        const updatedOrg: Organization = {
            ...selectedOrg,
            name: newOrgName,
            contactPerson: newOrgContact,
            email: newOrgEmail,
            phone: newOrgPhone,
            taxId: newOrgTaxId,
            rentals: rentalsPayload
        };
        
        setOrganizations(prev => prev.map(o => o.id === selectedOrg.id ? updatedOrg : o));
        setSelectedOrg(updatedOrg);
        addActivity(`Organization updated: ${updatedOrg.name}`, 'info');
    } else {
        const org: Organization = {
            id: `ORG${Date.now()}`,
            name: newOrgName,
            contactPerson: newOrgContact,
            email: newOrgEmail,
            phone: newOrgPhone,
            taxId: newOrgTaxId,
            status: OrganizationStatus.Active,
            balance: 0,
            rentals: rentalsPayload
        };
        setOrganizations([...organizations, org]);
        addActivity(`New Organization Registered: ${org.name}`, 'success');
    }
    
    setIsModalOpen(false);
    resetForm();
  };

  const getStatusBadge = (status: OrganizationStatus) => {
    switch (status) {
      case OrganizationStatus.Active:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>;
      case OrganizationStatus.Late:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Late Payment</span>;
      case OrganizationStatus.ContractPending:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Contract Pending</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const inputClasses = "w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  if (selectedOrg) {
    const orgTransactions = transactions.filter(t => t.organizationId === selectedOrg.id);
    const linkedTenants = tenants.filter(t => t.organizationId === selectedOrg.id);
    const totalRent = selectedOrg.rentals.reduce((sum, r) => sum + r.rentAmount, 0);

    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedOrg(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors group" title="Back to List">
                <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-brand-600" />
            </button>
            <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedOrg.name}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                Rental Profile <span className="w-1 h-1 rounded-full bg-gray-400"></span> ID: {selectedOrg.id}
                </p>
            </div>
          </div>
          <div className="md:ml-auto flex gap-2">
             {canEdit && (
               <button 
                 onClick={() => handleOpenEdit(selectedOrg)}
                 className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 flex items-center gap-2"
               >
                 <Edit2 size={16} /> Edit Details
               </button>
             )}
          </div>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm lg:col-span-2">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                   <div className="p-2 bg-brand-50 dark:bg-brand-900 rounded-lg text-brand-600 dark:text-brand-400"><Building2 size={20} /></div>
                   Organization Overview
                </h3>
                {getStatusBadge(selectedOrg.status)}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                 <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Tenant / Company</label>
                    <p className="text-gray-900 dark:text-white font-semibold text-base">{selectedOrg.name}</p>
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Tax ID / TRN</label>
                    <p className="text-gray-900 dark:text-gray-200 font-medium font-mono bg-gray-50 dark:bg-slate-700 inline-block px-2 py-0.5 rounded border border-gray-200 dark:border-slate-600">
                      {selectedOrg.taxId || 'N/A'}
                    </p>
                 </div>
                 
                 <div className="sm:col-span-2 border-t border-gray-100 dark:border-slate-700 pt-4 mt-2">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Primary Contact</label>
                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-700/50 p-3 rounded-lg border border-gray-100 dark:border-slate-700">
                       <div className="h-10 w-10 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-brand-700 dark:text-brand-300 font-bold">
                          {selectedOrg.contactPerson.charAt(0)}
                       </div>
                       <div>
                          <p className="text-gray-900 dark:text-white font-bold">{selectedOrg.contactPerson}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Authorized Representative</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
  
           <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm flex flex-col">
               <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                 <div className="p-2 bg-purple-50 dark:bg-purple-900 rounded-lg text-purple-600 dark:text-purple-400"><FileText size={20} /></div>
                 Lease Portfolio
              </h3>
              
              <div className="flex-1 space-y-4">
                 <div className="flex justify-between items-center py-3 border-b border-gray-50 dark:border-slate-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Units</span>
                    <span className="font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">{selectedOrg.rentals.length} Units</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Rentals</h1>
           <p className="text-sm text-gray-500 dark:text-gray-400">Manage long-term leases and corporate tenants</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          {canEdit && (
            <button 
              onClick={handleOpenAdd}
              className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors shadow-sm flex items-center gap-2 text-sm font-medium"
            >
              <Plus size={16} /> Add Rental
            </button>
          )}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">Tenant / Company</th>
                <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">Primary Contact</th>
                <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">Portfolio</th>
                <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">Total Rent (USD)</th>
                <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {filtered.map((org) => {
                const totalRent = org.rentals.reduce((sum, r) => sum + r.rentAmount, 0);
                return (
                <tr key={org.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold border border-blue-100 dark:border-blue-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-800 transition-colors">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{org.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <UserIcon size={14} className="text-gray-400" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">{org.contactPerson}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                     <div className="font-medium text-gray-900 dark:text-gray-200">{org.rentals.length} Properties</div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(org.status)}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                    ${totalRent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedOrg(org)}
                      className="text-brand-600 dark:text-brand-400 hover:text-brand-700 font-medium text-xs border border-brand-200 dark:border-brand-800 px-3 py-1.5 rounded-lg hover:bg-brand-50 dark:hover:bg-slate-700"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && canEdit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                   {isEditMode ? 'Edit Organization' : 'Add New Rental Organization'}
               </h2>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X size={20} /></button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg border border-gray-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Company Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>Company / Tenant Name</label>
                    <input 
                      type="text" 
                      className={inputClasses}
                      placeholder="e.g. Somtel LTD"
                      value={newOrgName}
                      onChange={e => setNewOrgName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Contact Person</label>
                    <input 
                      type="text" 
                      className={inputClasses}
                      placeholder="Full Name"
                      value={newOrgContact}
                      onChange={e => setNewOrgContact(e.target.value)}
                    />
                  </div>
                  <div>
                      <label className={labelClasses}>Email</label>
                      <input 
                        type="email" 
                        className={inputClasses}
                        placeholder="email@example.com"
                        value={newOrgEmail}
                        onChange={e => setNewOrgEmail(e.target.value)}
                      />
                  </div>
                  <div>
                      <label className={labelClasses}>Phone</label>
                      <input 
                        type="text" 
                        className={inputClasses}
                        placeholder="+252..."
                        value={newOrgPhone}
                        onChange={e => setNewOrgPhone(e.target.value)}
                      />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Rental Units ({pendingRentals.length})</h3>
                
                <div className="border-t border-gray-200 dark:border-slate-700 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className={labelClasses}>Property</label>
                     <select 
                       className={inputClasses}
                       value={currentRental.propertyId}
                       onChange={e => setCurrentRental({...currentRental, propertyId: e.target.value})}
                     >
                       <option value="">Select Property</option>
                       {properties.map(p => (
                         <option key={p.id} value={p.id}>{p.name}</option>
                       ))}
                     </select>
                   </div>
                   <div>
                      <label className={labelClasses}>Unit Number</label>
                      <input 
                        type="text" 
                        className={inputClasses}
                        placeholder="e.g. 3B"
                        value={currentRental.unitNumber}
                        onChange={e => setCurrentRental({...currentRental, unitNumber: e.target.value})}
                      />
                   </div>
                   <div className="flex items-end">
                      <button 
                        onClick={handleAddUnit}
                        className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-2 rounded-lg text-sm hover:bg-gray-800 dark:hover:bg-gray-100 flex items-center justify-center gap-2"
                      >
                         <Plus size={16} /> Add Unit
                      </button>
                   </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-8 pt-4 border-t border-gray-200 dark:border-slate-700">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium">Cancel</button>
              <button 
                onClick={handleSaveOrganization}
                disabled={!newOrgName}
                className="px-6 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm disabled:opacity-50 flex items-center gap-2"
              >
                <Save size={16} /> {isEditMode ? 'Update Organization' : 'Save Organization'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
