
import React from 'react';
import { LayoutGrid, Building2, CalendarDays, Users, CreditCard, Settings, Search, Menu, Sparkles, LogOut, Map, Briefcase, Smartphone, UserCheck, Shield, Wrench } from 'lucide-react';
import { User, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAI: () => void;
  currentUser: User;
  onSwitchUser?: () => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onOpenAI, currentUser, onSwitchUser, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Define role-based access
  const allNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, roles: ['SuperAdmin', 'AgencyManager', 'Viewer'] },
    { id: 'agencies', label: 'Agencies', icon: Briefcase, roles: ['SuperAdmin'] },
    { id: 'bookings', label: 'Bookings', icon: CalendarDays, roles: ['SuperAdmin', 'AgencyManager', 'Viewer'] },
    { id: 'properties', label: 'Properties', icon: Building2, roles: ['SuperAdmin', 'AgencyManager', 'Viewer'] },
    // Rentals (Org) merged into Tenants
    { id: 'tenants', label: 'Kiraystayaasha', icon: UserCheck, roles: ['SuperAdmin', 'AgencyManager'] },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench, roles: ['SuperAdmin', 'AgencyManager'] },
    { id: 'customers', label: 'Customers', icon: Users, roles: ['SuperAdmin'] },
    { id: 'users', label: 'System Users', icon: Shield, roles: ['SuperAdmin'] },
    { id: 'locations', label: 'Locations', icon: Map, roles: ['SuperAdmin'] },
    { id: 'payments', label: 'Finance', icon: CreditCard, roles: ['SuperAdmin', 'AgencyManager'] },
    { id: 'mobile', label: 'Mobile App', icon: Smartphone, roles: ['SuperAdmin'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['SuperAdmin'] },
  ];

  const filteredNavItems = allNavItems.filter(item => item.roles.includes(currentUser.role));

  const getRoleLabel = (role: UserRole) => {
    switch(role) {
      case 'SuperAdmin': return 'Super Admin';
      case 'AgencyManager': return 'Agency Manager';
      case 'Viewer': return 'Viewer (Read-only)';
      default: return role;
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch(role) {
      case 'SuperAdmin': return 'bg-brand-700';
      case 'AgencyManager': return 'bg-blue-600';
      case 'Viewer': return 'bg-gray-500';
      default: return 'bg-gray-700';
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden" dir="ltr">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="relative h-10 w-10 flex items-center justify-center bg-brand-600 rounded-lg shadow-lg overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-green-600 to-green-400"></div>
             <Building2 className="relative h-5 w-5 text-white z-10" />
          </div>
          <div>
            <span className="font-bold text-xl text-white tracking-tight block">RentalPro</span>
            <span className="text-[10px] uppercase tracking-widest text-brand-400">Somaliland</span>
          </div>
        </div>

        <nav className="p-4 space-y-1.5">
          {filteredNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                activeTab === item.id 
                  ? 'bg-brand-600 text-white shadow-md' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-slate-400'} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800 space-y-4 bg-slate-900">
           <button 
             onClick={onLogout}
             className="flex items-center gap-3 px-4 text-sm font-medium text-red-400 hover:text-red-300 transition-colors w-full"
           >
              <LogOut size={18} />
              Logout
           </button>

          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium text-slate-400">System Status</p>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-emerald-500">Online</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500">Hargeisa Server: 12ms</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600"
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2 w-72 border border-transparent focus-within:border-brand-300 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
              <Search size={16} className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search properties, tenants..." 
                className="bg-transparent border-none focus:outline-none text-sm w-full text-gray-700"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Role Switcher for Demo */}
            <button 
              onClick={onSwitchUser}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-600 transition-colors"
              title="Click to switch user role (Demo)"
            >
              <Shield size={12} />
              Switch Role
            </button>

            <button 
              onClick={onOpenAI}
              className="flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-lg hover:bg-brand-100 transition-colors text-sm font-semibold border border-brand-200 shadow-sm"
            >
              <Sparkles size={16} className="text-brand-600" />
              AI Assistant
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{getRoleLabel(currentUser.role)}</p>
              </div>
              <div className={`h-9 w-9 rounded-full flex items-center justify-center text-white font-medium shadow-sm ring-2 ring-white ${getRoleBadgeColor(currentUser.role)}`}>
                {currentUser.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
