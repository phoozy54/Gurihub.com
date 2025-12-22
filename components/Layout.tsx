
import React, { useState } from 'react';
import { LayoutGrid, Building2, UserCheck, CreditCard, Sparkles, LogOut, Wrench, Scale, Zap, FileText, Menu, X, Sun, Moon } from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (t: string) => void;
  currentUser: User;
  onOpenAI: () => void;
  onLogout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, currentUser, onOpenAI, onLogout, darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'properties', label: 'Properties', icon: Building2 },
    { id: 'tenants', label: 'Tenants', icon: UserCheck },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'payments', label: 'Finance', icon: CreditCard },
    { id: 'legal', label: 'Legal', icon: Scale },
  ];

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark bg-slate-950' : 'bg-slate-50'}`}>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsOpen(false)} />}

      {/* Professional Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8">
           <div className="flex items-center gap-3 mb-10">
              <div className="h-10 w-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                 <Building2 className="text-white" size={24} />
              </div>
              <span className="text-xl font-black tracking-tight dark:text-white uppercase">Guri<span className="text-brand-500">Hub</span></span>
           </div>

           <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black transition-all ${
                    activeTab === item.id 
                      ? 'bg-slate-900 dark:bg-brand-600 text-white shadow-xl scale-105' 
                      : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
           </nav>
        </div>

        <div className="absolute bottom-8 left-8 right-8 space-y-4">
           <button onClick={onLogout} className="flex items-center gap-3 text-sm font-bold text-rose-500 hover:translate-x-2 transition-transform">
              <LogOut size={18} /> Logout
           </button>
           <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
              <p className="text-sm font-black dark:text-white truncate">{currentUser.name}</p>
           </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 lg:ml-72 flex flex-col min-w-0">
        <header className="h-24 flex items-center justify-between px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-100 dark:border-slate-800">
           <button onClick={() => setIsOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400"><Menu /></button>
           
           <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative group">
                 <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                    <Sparkles size={18} />
                 </div>
                 <input 
                   type="text" 
                   placeholder="Weydii GuriBot AI wax kasta..." 
                   className="w-full pl-12 pr-6 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-brand-500 outline-none transition-all dark:text-white"
                   onFocus={onOpenAI}
                 />
              </div>
           </div>

           <div className="flex items-center gap-4">
              <button onClick={toggleDarkMode} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400">
                 {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={onOpenAI} className="bg-brand-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-brand-500/20 hover:scale-105 transition-all">
                 Ask AI
              </button>
           </div>
        </header>

        <section className="flex-1">
           {children}
        </section>
      </main>
    </div>
  );
};
