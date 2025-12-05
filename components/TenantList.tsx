
import React, { useState } from 'react';
import { Tenant, TenantStatus, Property, Organization, User, Currency } from '../types';
import { Search, Filter, Mail, Phone, Download, Plus, X, Building2 } from 'lucide-react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTenant, setNewTenant] = useState({
    name: '',
    propertyId: '',
    unitNumber: '',
    rentAmount: '',
    phone: '',
    email: '',
    organizationId: ''
  });

  const canEdit = currentUser.role === 'SuperAdmin' || currentUser.role === 'AgencyManager';

  const filtered = tenants.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.unitNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddTenant = () => {
    if (!newTenant.name || !newTenant.propertyId) return;

    const selectedProp = properties.find(p => p.id === newTenant.propertyId);
    
    const tenant: Tenant = {
      id: `T${Date.now()}`,
      name: newTenant.name,
      propertyId: newTenant.propertyId,
      propertyName: selectedProp?.name || 'Unknown Property',
      unitNumber: newTenant.unitNumber,
      rentAmount: newTenant.rentAmount ? parseFloat(newTenant.rentAmount) : 0,
      currency: Currency.USD,
      status: TenantStatus.Active,
      leaseStart: new Date().toISOString().split('T')[0],
      leaseEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      email: newTenant.email,
      phone: newTenant.phone,
      balance: 0,
      organizationId: newTenant.organizationId || undefined
    };

    setTenants([...tenants, tenant]);
    addActivity(`Kirayste cusub: ${tenant.name} (@${selectedProp?.name})`, 'success');
    setIsModalOpen(false);
    setNewTenant({ name: '', propertyId: '', unitNumber: '', rentAmount: '', phone: '', email: '', organizationId: '' });
  };

  // Translation helper
  const getStatusBadge = (status: TenantStatus) => {
    switch (status) {
      case TenantStatus.Active:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Firfircoon</span>;
      case TenantStatus.Late:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Daahitaan</span>;
      case TenantStatus.Eviction:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">Saarid</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Hore</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Tenants</h1>
        <div className="flex gap-3 w-full sm:w-auto">
          {canEdit && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors shadow-sm flex items-center gap-2 text-sm font-medium"
            >
              <Plus size={16} /> Add Tenant
            </button>
          )}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search tenant..."
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
                <th className="px-6 py-4 font-semibold text-gray-700">Name / Organization</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Property / Unit</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Rent</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Lease End</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((tenant) => {
                const tenantOrg = organizations.find(o => o.id === tenant.organizationId);
                return (
                <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
                        {tenant.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           <p className="font-medium text-gray-900">{tenant.name}</p>
                           {tenantOrg && (
                             <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 flex items-center gap-0.5" title={`Linked to ${tenantOrg.name}`}>
                                <Building2 size={8} /> {tenantOrg.name}
                             </span>
                           )}
                        </div>
                        <div className="flex gap-2 mt-0.5">
                          <a href={`mailto:${tenant.email}`} className="text-gray-400 hover:text-brand-600"><Mail size={12} /></a>
                          <a href={`tel:${tenant.phone}`} className="text-gray-400 hover:text-brand-600"><Phone size={12} /></a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                     <div className="font-medium text-gray-900">{tenant.propertyName}</div>
                     <div className="text-xs">Unit {tenant.unitNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(tenant.status)}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ${tenant.rentAmount.toLocaleString()}
                    {tenant.balance > 0 && (
                      <span className="block text-xs text-red-500 mt-1">-${tenant.balance} Due</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {tenant.leaseEnd}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {canEdit && (
                      <button className="text-brand-600 hover:text-brand-800 font-medium text-xs border border-brand-200 px-2 py-1 rounded hover:bg-brand-50">Manage</button>
                    )}
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No tenants found matching your search.
          </div>
        )}
      </div>

      {/* Add Tenant Modal */}
      {isModalOpen && canEdit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold text-gray-800">Add Tenant</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tenant Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="Full Name"
                  value={newTenant.name}
                  onChange={e => setNewTenant({...newTenant, name: e.target.value})}
                />
              </div>
              
              {/* Organization Link */}
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Sponsoring Organization (Optional)</label>
                 <select
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                    value={newTenant.organizationId}
                    onChange={e => setNewTenant({...newTenant, organizationId: e.target.value})}
                 >
                    <option value="">None (Individual Tenant)</option>
                    {organizations.map(org => (
                       <option key={org.id} value={org.id}>{org.name}</option>
                    ))}
                 </select>
                 <p className="text-xs text-gray-500 mt-1">Select if this tenant is an employee of a registered rental organization.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Property</label>
                   <select 
                     className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                     value={newTenant.propertyId}
                     onChange={e => setNewTenant({...newTenant, propertyId: e.target.value})}
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
                     placeholder="e.g. A-101"
                     value={newTenant.unitNumber}
                     onChange={e => setNewTenant({...newTenant, unitNumber: e.target.value})}
                   />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rent (USD)</label>
                  <input 
                    type="number" 
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                    placeholder="0.00"
                    value={newTenant.rentAmount}
                    onChange={e => setNewTenant({...newTenant, rentAmount: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                    placeholder="+252..."
                    value={newTenant.phone}
                    onChange={e => setNewTenant({...newTenant, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">Cancel</button>
              <button 
                onClick={handleAddTenant}
                disabled={!newTenant.name || !newTenant.propertyId}
                className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
