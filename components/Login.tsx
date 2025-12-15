
import React, { useState } from 'react';
import { User } from '../types';
import { Building2, Lock, Mail, ArrowRight, Smartphone, Globe } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
  users: User[];
}

export const Login: React.FC<LoginProps> = ({ onLogin, users }) => {
  const [email, setEmail] = useState('admin@gurihub.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (user) {
        onLogin(user);
      } else {
        setError('Email ama lambarka sirta ah waa qalad. Fadlan hubi.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="bg-brand-700 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <Building2 className="h-8 w-8 text-brand-600" />
            </div>
            <h1 className="text-2xl font-bold text-white">GuriHub PMS</h1>
            <p className="text-brand-100 text-sm tracking-widest uppercase mt-1">Somaliland Edition</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Soo Dhawoow (Welcome)</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm transition-all"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
                 <span>⚠️</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">Processing...</span>
              ) : (
                <span className="flex items-center gap-2">
                  Gudaha u gal <ArrowRight size={16} />
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
             <div className="flex justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex flex-col items-center gap-1">
                   <Smartphone className="h-5 w-5 text-green-600" />
                   <span className="text-[10px] font-bold text-gray-500">Zaad</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                   <Smartphone className="h-5 w-5 text-yellow-600" />
                   <span className="text-[10px] font-bold text-gray-500">eDahab</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                   <Globe className="h-5 w-5 text-blue-600" />
                   <span className="text-[10px] font-bold text-gray-500">Online</span>
                </div>
             </div>
             <p className="text-center text-xs text-gray-400 mt-4">
               &copy; 2024 GuriHub PMS Somaliland. All rights reserved.
             </p>
          </div>
        </div>
      </div>
      
      {/* Demo Credentials Hint */}
      <div className="mt-4 text-xs text-gray-500 max-w-md text-center">
         <p><strong>Demo Accounts:</strong></p>
         <p>Admin: admin@gurihub.com | Manager: manager@agency.com</p>
         <p>Supplier: supplier@gurihub.com</p>
         <p>Password: password</p>
      </div>
    </div>
  );
};
