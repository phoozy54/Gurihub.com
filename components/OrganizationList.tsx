
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
  
  // Form State
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgContact, setNewOrgContact] = useState('');
  const [newOrgEmail, setNewOrgEmail] = useState('');
  const [newOrgPhone, setNewOrgPhone] = useState('');
  const [newOrgTaxId, setNewOrgTaxId] = useState('');
  
  // Staging for multiple rental units
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
      setPendingRentals([...org.rentals]); // Clone array
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
    
    // Reset current rental form but keep dates for convenience
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
        // Update Existing
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
        setSelectedOrg(updatedOrg); // Update the view
        addActivity(`Organization updated: ${updatedOrg.name}`, 'info');
    } else {
        // Create New
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

  // DETAILED PROFILE VIEW
  if (selectedOrg) {
    const orgTransactions = transactions.filter(t => t.organizationId === selectedOrg.id);
    const linkedTenants = tenants.filter(t => t.organizationId === selectedOrg.id);
    const totalRent = selectedOrg.rentals.reduce((sum, r) => sum + r.rentAmount, 0);

    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Header with Back button */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedOrg(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors group" title="Back to List">
                <ArrowLeft size={20} className="text-gray-600 group-hover:text-brand-600" />
            </button>
            <div>
                <h1 className="text-2xl font-bold text-gray-800">{selectedOrg.name}</h1>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                Rental Profile <span className="w-1 h-1 rounded-full bg-gray-400"></span> ID: {selectedOrg.id}
                </p>
            </div>
          </div>
          <div className="md:ml-auto flex gap-2">
             {canEdit && (
               <button 
                 onClick={() => handleOpenEdit(selectedOrg)}
                 className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 flex items-center gap-2"
               >
                 <Edit2 size={16} /> Edit Details
               </button>
             )}
             <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm flex items-center gap-2">
               <Mail size={16} /> Send Message
             </button>
          </div>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Info Card */}
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-2">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                   <div className="p-2 bg-brand-50 rounded-lg text-brand-600"><Building2 size={20} /></div>
                   Organization Overview
                </h3>
                {getStatusBadge(selectedOrg.status)}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                 <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Tenant / Company</label>
                    <p className="text-gray-900 font-semibold text-base">{selectedOrg.name}</p>
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Tax ID / TRN</label>
                    <p className="text-gray-900 font-medium font-mono bg-gray-50 inline-block px-2 py-0.5 rounded border border-gray-200">
                      {selectedOrg.taxId || 'N/A'}
                    </p>
                 </div>
                 
                 <div className="sm:col-span-2 border-t border-gray-100 pt-4 mt-2">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Primary Contact</label>
                    <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                       <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold">
                          {selectedOrg.contactPerson.charAt(0)}
                       </div>
                       <div>
                          <p className="text-gray-900 font-bold">{selectedOrg.contactPerson}</p>
                          <p className="text-xs text-gray-500">Authorized Representative</p>
                       </div>
                       <div className="ml-auto flex gap-2">
                          <a href={`mailto:${selectedOrg.email}`} className="p-2 bg-white rounded-lg border border-gray-200 text-gray-500 hover:text-brand-600 hover:border-brand-200 transition-colors">
                            <Mail size={16} />
                          </a>
                          <a href={`tel:${selectedOrg.phone}`} className="p-2 bg-white rounded-lg border border-gray-200 text-gray-500 hover:text-brand-600 hover:border-brand-200 transition-colors">
                            <Phone size={16} />
                          </a>
                       </div>
                    </div>
                 </div>

                 <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Email Address</label>
                    <p className="text-gray-800 font-medium">{selectedOrg.email}</p>
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Phone Number</label>
                    <p className="text-gray-800 font-medium">{selectedOrg.phone}</p>
                 </div>
              </div>
           </div>
  
           {/* Lease Summary Card */}
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
               <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                 <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><FileText size={20} /></div>
                 Lease Portfolio
              </h3>
              
              <div className="flex-1 space-y-4">
                 <div className="flex justify-between items-center py-3 border-b border-gray-50">
                    <span className="text-sm text-gray-600">Total Units</span>
                    <span className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded text-sm">{selectedOrg.rentals.length} Units</span>
                 </div>
                 <div className="flex justify-between items-center py-3 border-b border-gray-50">
                    <span className="text-sm text-gray-600">Total Monthly Rent</span>
                    <span className="font-bold text-gray-900 text-xl">${totalRent.toLocaleString()}</span>
                 </div>
                 
                 <div className="mt-4">
                   <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Active Leases</p>
                   <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                     {selectedOrg.rentals.map((r) => (
                       <div key={r.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                          <div className="flex justify-between font-medium text-gray-800">
                             <span className="truncate max-w-[150px]">{r.propertyName}</span>
                             <span>${r.rentAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                             <span>Unit: {r.unitNumber}</span>
                             <span>Ends: {r.leaseEnd}</span>
                          </div>
                       </div>
                     ))}
                   </div>
                 </div>
              </div>
              
              <button className="w-full mt-6 py-2.5 text-sm font-medium text-brand-700 bg-brand-50 border border-brand-100 rounded-lg hover:bg-brand-100 transition-colors flex items-center justify-center gap-2">
                 <Download size={16} /> Download All Contracts
              </button>
           </div>
        </div>

        {/* Linked Tenants / Occupants */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                   <Users size={18} className="text-brand-600" /> Linked Occupants (Employees)
                </h3>
                <p className="text-xs text-gray-500 mt-1">Individual tenants sponsored by this organization</p>
              </div>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                   <tr>
                      <th className="px-6 py-3 font-medium uppercase text-xs tracking-wider">Name</th>
                      <th className="px-6 py-3 font-medium uppercase text-xs tracking-wider">Unit Number</th>
                      <th className="px-6 py-3 font-medium uppercase text-xs tracking-wider">Contact</th>
                      <th className="px-6 py-3 font-medium uppercase text-xs tracking-wider">Status</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   {linkedTenants.length > 0 ? (
                     linkedTenants.map(t => (
                        <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                           <td className="px-6 py-4 font-medium text-gray-900">{t.name}</td>
                           <td className="px-6 py-4 text-gray-600">{t.unitNumber}</td>
                           <td className="px-6 py-4 text-gray-600">{t.email}</td>
                           <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                 Active
                              </span>
                           </td>
                        </tr>
                     ))
                   ) : (
                     <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500 italic">
                           No individual tenants are currently linked to this organization.
                        </td>
                     </tr>
                   )}
                </tbody>
             </table>
           </div>
        </div>
  
        {/* Payment History */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Payment History</h3>
                <p className="text-xs text-gray-500 mt-1">Recent financial transactions for this rental</p>
              </div>
              <button className="text-sm text-brand-600 font-medium hover:underline flex items-center gap-1">
                View All Invoices <ArrowLeft size={14} className="rotate-180" />
              </button>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                   <tr>
                      <th className="px-6 py-3 font-medium uppercase text-xs tracking-wider">Date</th>
                      <th className="px-6 py-3 font-medium uppercase text-xs tracking-wider">Description</th>
                      <th className="px-6 py-3 font-medium uppercase text-xs tracking-wider">Amount</th>
                      <th className="px-6 py-3 font-medium uppercase text-xs tracking-wider">Status</th>
                      <th className="px-6 py-3 font-medium uppercase text-xs tracking-wider text-right">Receipt</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   {orgTransactions.length > 0 ? (
                     orgTransactions.map(tx => (
                        <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                           <td className="px-6 py-4 text-gray-600 font-medium">{tx.date}</td>
                           <td className="px-6 py-4 font-medium text-gray-900">{tx.description}</td>
                           <td className="px-6 py-4 text-gray-900 font-bold">${tx.amount.toLocaleString()}</td>
                           <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tx.status === 'Completed' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
                                 {tx.status === 'Completed' && <CheckCircle size={10} className="mr-1.5" />} {tx.status}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <button className="text-gray-500 hover:text-brand-600 text-xs font-medium inline-flex items-center justify-end gap-1 px-2 py-1 hover:bg-gray-100 rounded transition-colors">
                                 <Download size={14} /> PDF
                              </button>
                           </td>
                        </tr>
                     ))
                   ) : (
                     <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                           No payment history found for this rental.
                        </td>
                     </tr>
                   )}
                </tbody>
             </table>
           </div>
        </div>
      </div>
    );
  }

  // MAIN LIST VIEW
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Rentals</h1>
           <p className="text-sm text-gray-500">Manage long-term leases and corporate tenants</p>
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600" title="Filter">
            <Filter className="h-5 w-5" />
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600" title="Export">
            <Download className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700">Tenant / Company</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Primary Contact</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Portfolio</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Total Rent (USD)</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((org) => {
                const totalRent = org.rentals.reduce((sum, r) => sum + r.rentAmount, 0);
                const propertyLabel = org.rentals.length === 1 
                  ? org.rentals[0].propertyName 
                  : `${org.rentals.length} Properties Leased`;

                return (
                <tr key={org.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100 group-hover:bg-blue-100 transition-colors">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{org.name}</p>
                        <div className="flex gap-2 mt-0.5 text-xs text-gray-500">
                           {org.taxId && <span>Tax ID: {org.taxId}</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <UserIcon size={14} className="text-gray-400" />
                        <span className="font-medium text-gray-700">{org.contactPerson}</span>
                    </div>
                    <div className="flex gap-2 mt-1">
                        <a href={`mailto:${org.email}`} className="text-gray-400 hover:text-brand-600 transition-colors"><Mail size={12} /></a>
                        <a href={`tel:${org.phone}`} className="text-gray-400 hover:text-brand-600 transition-colors"><Phone size={12} /></a>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                     <div className="font-medium text-gray-900">{propertyLabel}</div>
                     {org.rentals.length === 1 && (
                       <div className="text-xs bg-gray-100 px-1.5 py-0.5 rounded inline-block mt-1 border border-gray-200">{org.rentals[0].unitNumber}</div>
                     )}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(org.status)}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    ${totalRent.toLocaleString()}
                    <span className="block text-xs text-gray-400 font-normal">Monthly</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedOrg(org)}
                      className="text-brand-600 hover:text-brand-700 font-medium text-xs border border-brand-200 px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-gray-500">
             <Building2 size={48} className="mx-auto text-gray-300 mb-3" />
             <h3 className="text-lg font-medium text-gray-900">No rentals found</h3>
             <p>Try adjusting your search or add a new rental.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Rental Modal */}
      {isModalOpen && canEdit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold text-gray-800">
                   {isEditMode ? 'Edit Organization' : 'Add New Rental Organization'}
               </h2>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <div className="space-y-6">
              {/* Organization Info */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Company Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company / Tenant Name</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                      placeholder="e.g. Somtel LTD"
                      value={newOrgName}
                      onChange={e => setNewOrgName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                      placeholder="Full Name"
                      value={newOrgContact}
                      onChange={e => setNewOrgContact(e.target.value)}
                    />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                        placeholder="email@example.com"
                        value={newOrgEmail}
                        onChange={e => setNewOrgEmail(e.target.value)}
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                        placeholder="+252..."
                        value={newOrgPhone}
                        onChange={e => setNewOrgPhone(e.target.value)}
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID / TRN</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                        value={newOrgTaxId}
                        onChange={e => setNewOrgTaxId(e.target.value)}
                      />
                  </div>
                </div>
              </div>

              {/* Rental Units Logic */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Rental Units ({pendingRentals.length})</h3>
                
                {/* List of pending rentals */}
                {pendingRentals.length > 0 && (
                  <div className="space-y-2 mb-4">
                     {pendingRentals.map((rental, idx) => (
                       <div key={idx} className="flex justify-between items-center p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm">
                          <div>
                            <span className="font-bold text-gray-800 block">{rental.propertyName}</span>
                            <span className="text-xs text-gray-500">Unit: {rental.unitNumber} • ${rental.rentAmount?.toLocaleString()}</span>
                            <span className="text-xs text-gray-400 block">{rental.leaseStart} to {rental.leaseEnd}</span>
                          </div>
                          <button onClick={() => handleRemoveUnit(idx)} className="text-red-500 hover:bg-red-100 p-1 rounded transition-colors" title="Remove Unit">
                             <Trash2 size={16} />
                          </button>
                       </div>
                     ))}
                  </div>
                )}

                {/* Add Unit Form */}
                <div className="border-t border-gray-200 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Property</label>
                     <select 
                       className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit Number</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                        placeholder="e.g. 3B"
                        value={currentRental.unitNumber}
                        onChange={e => setCurrentRental({...currentRental, unitNumber: e.target.value})}
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rent Amount ($)</label>
                      <input 
                        type="number" 
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                        value={currentRental.rentAmount}
                        onChange={e => setCurrentRental({...currentRental, rentAmount: parseFloat(e.target.value)})}
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lease Start</label>
                      <input 
                        type="date" 
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                        value={currentRental.leaseStart}
                        onChange={e => setCurrentRental({...currentRental, leaseStart: e.target.value})}
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lease End</label>
                      <input 
                        type="date" 
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                        value={currentRental.leaseEnd}
                        onChange={e => setCurrentRental({...currentRental, leaseEnd: e.target.value})}
                      />
                   </div>
                   <div className="flex items-end">
                      <button 
                        onClick={handleAddUnit}
                        disabled={!currentRental.propertyId || !currentRental.rentAmount}
                        className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                         <Plus size={16} /> Add Unit
                      </button>
                   </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-8 pt-4 border-t border-gray-200">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">Cancel</button>
              <button 
                onClick={handleSaveOrganization}
                disabled={!newOrgName || pendingRentals.length === 0}
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
