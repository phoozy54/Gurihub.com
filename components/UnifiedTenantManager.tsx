
import React, { useState } from 'react';
import { TenantList } from './TenantList';
import { OrganizationList } from './OrganizationList';
import { Tenant, Organization, Property, Transaction, User } from '../types';
import { User as UserIcon, Building2, Briefcase } from 'lucide-react';

interface UnifiedTenantManagerProps {
  tenants: Tenant[];
  setTenants: React.Dispatch<React.SetStateAction<Tenant[]>>;
  organizations: Organization[];
  setOrganizations: React.Dispatch<React.SetStateAction<Organization[]>>;
  properties: Property[];
  transactions: Transaction[];
  addActivity: (text: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  currentUser: User;
}

export const UnifiedTenantManager: React.FC<UnifiedTenantManagerProps> = (props) => {
  const [view, setView] = useState<'individual' | 'corporate'>('individual');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 inline-flex gap-1.5 transition-colors">
            <button
            onClick={() => setView('individual')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
               view === 'individual' 
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
            >
            <UserIcon size={18} />
            Kirayste Shakhsi (Individual)
            </button>
            <button
            onClick={() => setView('corporate')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
               view === 'corporate' 
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
            >
            <Building2 size={18} />
            Kirayste Shirkad (Corporate)
            </button>
         </div>

         {view === 'corporate' && (
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 dark:bg-slate-800 px-4 py-2 rounded-xl border border-gray-100 dark:border-slate-700">
               <Briefcase size={14} className="text-brand-600" /> Multi-Unit Leases
            </div>
         )}
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
        {view === 'individual' ? (
          <TenantList 
            tenants={props.tenants}
            setTenants={props.setTenants}
            properties={props.properties}
            organizations={props.organizations}
            addActivity={props.addActivity}
            currentUser={props.currentUser}
          />
        ) : (
          <OrganizationList 
            organizations={props.organizations}
            setOrganizations={props.setOrganizations}
            properties={props.properties}
            transactions={props.transactions}
            tenants={props.tenants}
            addActivity={props.addActivity}
            currentUser={props.currentUser}
          />
        )}
      </div>
    </div>
  );
};
