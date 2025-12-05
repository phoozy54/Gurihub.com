
import React, { useState } from 'react';
import { TenantList } from './TenantList';
import { OrganizationList } from './OrganizationList';
import { Tenant, Organization, Property, Transaction, User } from '../types';
import { User as UserIcon, Building2 } from 'lucide-react';

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
      <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 inline-flex gap-2 mb-2">
        <button
          onClick={() => setView('individual')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
            view === 'individual' 
              ? 'bg-brand-600 text-white shadow-sm' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <UserIcon size={18} />
          Shakhsi (Individuals)
        </button>
        <button
          onClick={() => setView('corporate')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
            view === 'corporate' 
              ? 'bg-brand-600 text-white shadow-sm' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Building2 size={18} />
          Shirkado (Corporate)
        </button>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
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
