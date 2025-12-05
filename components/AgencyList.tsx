
import React from 'react';
import { Agency } from '../types';
import { ShieldCheck, MoreVertical, Building2, Mail, Phone, ExternalLink } from 'lucide-react';

interface AgencyListProps {
  agencies: Agency[];
}

export const AgencyList: React.FC<AgencyListProps> = ({ agencies }) => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
          <div>
             <h1 className="text-2xl font-bold text-gray-800">Agencies</h1>
             <p className="text-sm text-gray-500">Manage registered property companies</p>
          </div>
          <button className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm">
             + New Agency
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agencies.map((agency) => (
             <div key={agency.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                   <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                      {agency.logo ? <img src={agency.logo} alt={agency.name} className="h-full w-full object-cover" /> : <Building2 className="text-gray-400" />}
                   </div>
                   <span className={`px-2 py-1 text-xs rounded-full font-medium ${agency.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {agency.status}
                   </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-1">{agency.name}</h3>
                <p className="text-sm text-gray-500 mb-4 flex items-center gap-1"><ShieldCheck size={12} className="text-brand-500" /> {agency.ownerName}</p>

                <div className="space-y-2 mb-6">
                   <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={14} className="text-gray-400" /> {agency.email}
                   </div>
                   <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={14} className="text-gray-400" /> {agency.phone}
                   </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                   <div>
                      <p className="text-xs text-gray-400">Balance</p>
                      <p className="font-bold text-gray-800">${agency.balance.toLocaleString()}</p>
                   </div>
                   <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-500">
                      <ExternalLink size={16} />
                   </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};
