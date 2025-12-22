
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { PropertyList } from './components/PropertyList';
import { UnifiedTenantManager } from './components/UnifiedTenantManager';
import { AIAssistant } from './components/AIAssistant';
import { Financials } from './components/Financials';
import { Maintenance } from './components/Maintenance';
import { TenantPortal } from './components/TenantPortal';
import { LawyerPortal } from './components/LawyerPortal';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { User, Property, Tenant, Transaction, MaintenanceRequest, LegalCase } from './types';

/**
 * INITIAL MOCK USERS
 * In production, these will be fetched from Frappe's User DocType.
 */
const INITIAL_USERS: User[] = [
  { id: 'U1', name: 'Hub Administrator', email: 'admin@gurihub.com', role: 'SuperAdmin', status: 'Active' },
  { id: 'U2', name: 'Garyaqaan Mustafe', email: 'law@gurihub.com', role: 'Lawyer', status: 'Active' },
  { id: 'U3', name: 'Fardowsa Ahmed', email: 'fardowsa@gmail.com', role: 'Tenant', linkedEntityId: 'T001', status: 'Active' },
];

export default function App() {
  const [auth, setAuth] = useState({ isLogged: false, showLogin: false, user: INITIAL_USERS[0] });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Core Data States (To be linked with Frappe REST API)
  const [properties, setProperties] = useState<Property[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [maintenance, setMaintenance] = useState<MaintenanceRequest[]>([]);
  const [legal, setLegal] = useState<LegalCase[]>([]);

  // Simple Auth Handlers
  const handleLogin = (user: User) => setAuth({ ...auth, isLogged: true, user });
  const handleLogout = () => setAuth({ ...auth, isLogged: false });

  if (!auth.isLogged) {
    return auth.showLogin 
      ? <Login onLogin={handleLogin} users={INITIAL_USERS} />
      : <LandingPage onLogin={() => {}} users={INITIAL_USERS} onSignIn={() => setAuth({ ...auth, showLogin: true })} />;
  }

  /**
   * Main Router Component
   * Routes based on user role and active tab.
   */
  const renderContent = () => {
    const role = auth.user.role;
    
    // Redirect Tenants to their specific portal
    if (role === 'Tenant') {
      return <TenantPortal tenant={tenants[0]} transactions={transactions} maintenanceRequests={maintenance} activeTab={activeTab} setActiveTab={setActiveTab} onAddMaintenance={(m) => setMaintenance([m, ...maintenance])} currentUser={auth.user} addActivity={() => {}} />;
    }

    // Role-based Views
    if (role === 'Lawyer' || activeTab === 'legal') {
      return <LawyerPortal currentUser={auth.user} legalCases={legal} setLegalCases={setLegal} />;
    }

    // Admin/Manager Views
    switch (activeTab) {
      case 'dashboard': return <Dashboard properties={properties} tenants={tenants} totalRevenue={0} transactions={transactions} activities={[]} occupancyRate={0} />;
      case 'properties': return <PropertyList properties={properties} setProperties={setProperties} currentUser={auth.user} addActivity={() => {}} />;
      case 'tenants': return <UnifiedTenantManager tenants={tenants} setTenants={setTenants} organizations={[]} setOrganizations={() => {}} properties={properties} transactions={transactions} currentUser={auth.user} addActivity={() => {}} />;
      case 'maintenance': return <Maintenance requests={maintenance} setRequests={setMaintenance} properties={properties} addActivity={() => {}} />;
      case 'payments': return <Financials transactions={transactions} setTransactions={setTransactions} organizations={[]} currentUser={auth.user} addActivity={() => {}} />;
      default: return <div className="p-20 text-center text-slate-400 font-black uppercase tracking-[0.4em]">Section Under Development</div>;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      currentUser={auth.user}
      onOpenAI={() => setIsAIOpen(true)}
      onLogout={handleLogout}
      darkMode={darkMode}
      toggleDarkMode={() => setDarkMode(!darkMode)}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {renderContent()}
      </div>
      <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} contextData="GuriHub Global Context Ready" />
    </Layout>
  );
}
