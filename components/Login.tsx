
import React, { useState } from 'react';
import { User } from '../types';
import { Building2, Lock, Mail, ArrowRight, Smartphone, Globe, CheckCircle2 } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
  users: User[];
}

export const Login: React.FC<LoginProps> = ({ onLogin, users }) => {
  const [email, setEmail] = useState('admin@gurihub.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    // Simulate Google Auth Delay
    setTimeout(() => {
        // For demo purposes, log in as the first user (Admin) or a specific Google user
        const googleUser = users[0]; 
        onLogin(googleUser);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* Left Side - Brand & Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-900 relative flex-col justify-between p-12 overflow-hidden text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-green-400 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
           <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center">
                 <Building2 className="text-white h-6 w-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">GuriHub PMS</span>
           </div>
        </div>

        <div className="relative z-10 max-w-md">
           <h2 className="text-4xl font-bold mb-6 leading-tight">Maamulka Hantida oo la Fududeeyay.</h2>
           <p className="text-brand-100 text-lg mb-8 leading-relaxed">
             Ku maamul guryahaaga, kirada, iyo dayactirka hal meel oo casri ah. Nidaamka GuriHub wuxuu kuu sahlayaa inaad ganacsigaaga kobciso adigoon walwal qabin.
           </p>
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="p-1 bg-green-500/20 rounded-full"><CheckCircle2 size={16} className="text-green-400" /></div>
                 <span className="text-sm font-medium">Warbixino Maaliyadeed oo Toos ah</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="p-1 bg-green-500/20 rounded-full"><CheckCircle2 size={16} className="text-green-400" /></div>
                 <span className="text-sm font-medium">Zaad & eDahab Integration</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="p-1 bg-green-500/20 rounded-full"><CheckCircle2 size={16} className="text-green-400" /></div>
                 <span className="text-sm font-medium">Taageero 24/7 ah</span>
              </div>
           </div>
        </div>

        <div className="relative z-10 text-xs text-brand-200/60">
           © 2024 GuriHub PMS Somaliland. Xuquuqda oo dhan way dhowran tahay.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-gray-50 lg:bg-white">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-4">
               <div className="h-12 w-12 bg-brand-600 rounded-xl flex items-center justify-center text-white">
                 <Building2 size={24} />
               </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Soo Dhawoow 👋</h2>
            <p className="mt-2 text-sm text-gray-600">Fadlan gali xogtaada si aad u gasho nidaamka.</p>
          </div>

          <div className="space-y-4">
            {/* Google Login Button */}
            <button 
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-xl transition-all shadow-sm hover:shadow active:scale-[0.98]"
            >
               {isGoogleLoading ? (
                 <span className="h-5 w-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></span>
               ) : (
                 <>
                   <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                   </svg>
                   <span>Ku gal Google Account</span>
                 </>
               )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 lg:bg-white text-gray-500">Ama isticmaal Email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm bg-white transition-all shadow-sm"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5 ml-1">
                   <label className="block text-sm font-semibold text-gray-700">Password</label>
                   <a href="#" className="text-xs font-semibold text-brand-600 hover:text-brand-700">Ilowday Password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm bg-white transition-all shadow-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-xs font-medium rounded-lg border border-red-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                   <span className="text-lg">⚠️</span> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-500/30 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2"><span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Processing...</span>
                ) : (
                  <span className="flex items-center gap-2">
                    Gal Nidaamka <ArrowRight size={18} />
                  </span>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6">
             <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex flex-col items-center gap-1 group cursor-default">
                   <Smartphone className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                   <span className="text-[10px] font-bold text-gray-500">Zaad</span>
                </div>
                <div className="flex flex-col items-center gap-1 group cursor-default">
                   <Smartphone className="h-6 w-6 text-yellow-600 group-hover:scale-110 transition-transform" />
                   <span className="text-[10px] font-bold text-gray-500">eDahab</span>
                </div>
                <div className="flex flex-col items-center gap-1 group cursor-default">
                   <Globe className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                   <span className="text-[10px] font-bold text-gray-500">Online</span>
                </div>
             </div>
          </div>
          
          {/* Demo Credentials Hint */}
          <div className="mt-8 text-center">
             <p className="text-xs text-gray-400">Demo Accounts (For Testing):</p>
             <div className="mt-2 flex flex-wrap justify-center gap-2">
                <span className="inline-block px-2 py-1 bg-gray-100 rounded text-[10px] text-gray-500 font-mono">admin@gurihub.com</span>
                <span className="inline-block px-2 py-1 bg-gray-100 rounded text-[10px] text-gray-500 font-mono">manager@agency.com</span>
                <span className="inline-block px-2 py-1 bg-gray-100 rounded text-[10px] text-gray-500 font-mono">Pass: password</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
