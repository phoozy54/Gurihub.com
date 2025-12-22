
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { 
  Building2, ArrowRight, CheckCircle2, 
  Smartphone, Globe, Shield, 
  Home, Facebook, Instagram, Twitter,
  Bell, Users, AlertTriangle, Calendar, CreditCard, Mail, Lock, DollarSign, Bot, Wrench, FileText, Search, Star, BarChart3, Briefcase, Check, Menu, X, Play, TrendingUp, Zap, Plane, MapPin
} from 'lucide-react';

interface LandingPageProps {
  onLogin: (user: User) => void;
  users: User[];
  onSignIn: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin, users, onSignIn }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-brand-100 selection:text-brand-900 overflow-x-hidden" dir="ltr">
      
      {/* --- Navbar --- */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
             <div className="bg-brand-600 text-white p-2 rounded-xl shadow-lg shadow-brand-500/30 group-hover:bg-slate-900 transition-colors duration-300">
               <Home size={22} className="text-white" />
             </div>
             <span className="text-xl font-extrabold tracking-tight text-slate-900">Guri<span className="text-brand-500">Hub</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
             {[
               { id: 'features', label: 'Adeegyada' }, 
               { id: 'diaspora', label: 'Qurba Joogta' },
               { id: 'agencies', label: 'Wakaaladaha' }, 
               { id: 'owners', label: 'Mulkiilayaasha' }, 
               { id: 'pricing', label: 'Qiimaha' }
             ].map((item) => (
               <button 
                 key={item.id} 
                 onClick={() => scrollToSection(item.id)} 
                 className="hover:text-brand-600 transition-colors relative group py-2"
               >
                 {item.label}
                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
               </button>
             ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
             <button 
               onClick={onSignIn}
               className="text-sm font-bold text-slate-700 hover:text-brand-600 transition-colors"
             >
               Soo Gal
             </button>
             <button 
               onClick={onSignIn}
               className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
             >
               Isdiiwaangeli
             </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
             {[
               { id: 'features', label: 'Adeegyada' }, 
               { id: 'diaspora', label: 'Qurba Joogta' },
               { id: 'agencies', label: 'Wakaaladaha' }, 
               { id: 'owners', label: 'Mulkiilayaasha' }, 
               { id: 'pricing', label: 'Qiimaha' }
             ].map((item) => (
               <button 
                 key={item.id} 
                 onClick={() => scrollToSection(item.id)} 
                 className="text-left text-sm font-semibold text-slate-600 py-2 border-b border-slate-50"
               >
                 {item.label}
               </button>
             ))}
             <div className="flex flex-col gap-3 mt-2">
                <button onClick={onSignIn} className="w-full text-center py-3 font-bold text-slate-700 border border-slate-200 rounded-xl">Soo Gal</button>
                <button onClick={onSignIn} className="w-full text-center py-3 font-bold text-white bg-brand-600 rounded-xl">Isdiiwaangeli</button>
             </div>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden bg-slate-50/50">
         {/* Abstract Background Elements */}
         <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-100/40 rounded-full blur-3xl -z-10 animate-pulse"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -z-10"></div>

         <div className="max-w-7xl mx-auto text-center relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full pl-1 pr-4 py-1 shadow-sm mb-8 hover:border-brand-300 hover:shadow-md transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-700">
               <span className="bg-brand-100 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Cusub</span>
               <span className="text-xs font-semibold text-slate-600">Nidaamka AI ee guryaha Somaliland</span>
               <ArrowRight size={12} className="text-slate-400" />
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
               Hormari Ganacsigaaga <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-teal-500">Guryaha & Hantida</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
               GuriHub waa nidaamka rasmiga ah ee maamulka Maintenance, Financial Reports, iyo Lease Agreements. Waxaa u gaar ah Mulkiilayaasha gudaha iyo <span className="text-brand-600 font-bold">Qurba Joogta</span> doonaya inay hantidooda meel fog ka maamulaan.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                <button onClick={onSignIn} className="w-full sm:w-auto px-8 py-4 bg-brand-600 text-white rounded-full font-bold text-lg hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40 transform hover:-translate-y-1">
                   Bilow Hadda
                </button>
                <button onClick={() => scrollToSection('features')} className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                   <Play size={20} className="fill-slate-700" /> Daawo Video
                </button>
            </div>

            {/* --- PREMIUM DYNAMIC DASHBOARD MOCKUP --- */}
            <div className="relative mt-24 mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                {/* Outer Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/20 to-teal-500/20 rounded-[2.5rem] blur-2xl opacity-50"></div>
                
                <div className="relative rounded-[2rem] bg-slate-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-slate-800 overflow-hidden ring-1 ring-white/10">
                    {/* Browser Top Bar */}
                    <div className="bg-slate-950/50 backdrop-blur-sm border-b border-slate-800 px-6 py-4 flex items-center gap-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                        </div>
                        <div className="flex-1 max-w-md mx-auto h-8 bg-slate-900 rounded-xl flex items-center px-4 text-[10px] text-slate-500 font-bold tracking-tight">
                           <Lock size={10} className="mr-2 text-emerald-500" /> https://app.gurihub.so/admin/dashboard
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="w-6 h-6 rounded-lg bg-slate-800"></div>
                           <div className="w-6 h-6 rounded-full bg-brand-600"></div>
                        </div>
                    </div>
                    
                    {/* Dashboard Interior Layout (CSS Based Mockup) */}
                    <div className="bg-slate-950 p-6 md:p-10 min-h-[500px]">
                        <div className="grid grid-cols-12 gap-6">
                           
                           {/* Left Stats Column */}
                           <div className="col-span-12 lg:col-span-8 space-y-6">
                               {/* Top Stats */}
                               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="bg-slate-900 p-5 rounded-[2rem] border border-slate-800">
                                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Financial Report</p>
                                     <h3 className="text-2xl font-black text-white">$24,500</h3>
                                     <div className="mt-2 flex items-center gap-1 text-emerald-500 text-[10px] font-bold">
                                        <TrendingUp size={12} /> +12.5% vs last month
                                     </div>
                                  </div>
                                  <div className="bg-slate-900 p-5 rounded-[2rem] border border-slate-800">
                                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Leases</p>
                                     <h3 className="text-2xl font-black text-white">42 Units</h3>
                                     <div className="mt-2 flex items-center gap-1 text-blue-400 text-[10px] font-bold">
                                        <Users size={12} /> 98% Occupancy
                                     </div>
                                  </div>
                                  <div className="bg-slate-900 p-5 rounded-[2rem] border border-slate-800">
                                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Open Maintenance</p>
                                     <h3 className="text-2xl font-black text-white">03 Tasks</h3>
                                     <div className="mt-2 flex items-center gap-1 text-orange-400 text-[10px] font-bold">
                                        <AlertTriangle size={12} /> 1 High Priority
                                     </div>
                                  </div>
                               </div>

                               {/* Maintenance & Activity Section */}
                               <div className="bg-slate-900/50 p-6 rounded-[2.5rem] border border-slate-800 h-[300px] relative overflow-hidden">
                                  <div className="flex justify-between items-center mb-6">
                                     <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                        <Wrench size={14} className="text-brand-500" /> Maintenance Tracking
                                     </h4>
                                     <button className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors">View All</button>
                                  </div>
                                  
                                  {/* Fake Maintenance List */}
                                  <div className="space-y-3">
                                     {[
                                        { title: 'Tubo jabtay (Leaking Pipe)', prop: 'Unit 402 - Barwaaqo', status: 'High', color: 'bg-rose-500/20 text-rose-500' },
                                        { title: 'Dayactirka AC-ga', prop: 'Shacabka Villa', status: 'Medium', color: 'bg-orange-500/20 text-orange-500' },
                                        { title: 'Dabka oo tagay', prop: 'Unit 102 - Jigjiga Yar', status: 'Critical', color: 'bg-red-600 text-white' }
                                     ].map((item, i) => (
                                        <div key={i} className="bg-slate-950 p-4 rounded-2xl flex justify-between items-center border border-slate-800 group hover:border-slate-700 transition-colors">
                                           <div className="flex items-center gap-4">
                                              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-500">
                                                 <Wrench size={16} />
                                              </div>
                                              <div>
                                                 <p className="text-sm font-bold text-slate-200">{item.title}</p>
                                                 <p className="text-[10px] text-slate-500 font-medium">{item.prop}</p>
                                              </div>
                                           </div>
                                           <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full ${item.color}`}>{item.status}</span>
                                        </div>
                                     ))}
                                  </div>
                               </div>
                           </div>

                           {/* Right Sidebar - Leases & Reports */}
                           <div className="col-span-12 lg:col-span-4 space-y-6">
                               <div className="bg-brand-600 p-6 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform"></div>
                                  <FileText className="mb-4 opacity-80" size={32} />
                                  <h4 className="text-xl font-black mb-2">Lease Agreements</h4>
                                  <p className="text-xs text-brand-100 font-medium leading-relaxed mb-6">
                                     Hadda saxiix heshiisyada si digital ah (e-Sign). Dhammaan heshiisyadu waa Shari'ah Compliant.
                                  </p>
                                  <div className="space-y-2">
                                     <div className="bg-white/10 p-2.5 rounded-xl flex items-center justify-between text-[10px] font-bold">
                                        <span>Residential_A42.pdf</span>
                                        <CheckCircle2 size={12} className="text-emerald-300" />
                                     </div>
                                     <div className="bg-white/10 p-2.5 rounded-xl flex items-center justify-between text-[10px] font-bold">
                                        <span>Corporate_Contract.pdf</span>
                                        <CheckCircle2 size={12} className="text-emerald-300" />
                                     </div>
                                  </div>
                               </div>

                               <div className="bg-slate-900 p-6 rounded-[2.5rem] border border-slate-800 flex-1">
                                  <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                                     <BarChart3 size={14} className="text-brand-500" /> Quick Reports
                                  </h4>
                                  <div className="space-y-4">
                                     <div className="space-y-1.5">
                                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                                           <span>Rent Collection</span>
                                           <span className="text-brand-500">92%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                                           <div className="bg-brand-500 h-full w-[92%]"></div>
                                        </div>
                                     </div>
                                     <div className="space-y-1.5">
                                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                                           <span>Utility Payments</span>
                                           <span className="text-blue-400">85%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                                           <div className="bg-blue-400 h-full w-[85%]"></div>
                                        </div>
                                     </div>
                                     <button className="w-full mt-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                                        Download Monthly Report
                                     </button>
                                  </div>
                               </div>
                           </div>

                        </div>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* --- Partners / Trust --- */}
      <section className="py-12 border-y border-slate-100 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Waxa nagu kalsoon shirkadaha ugu waaweyn Somaliland</p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               
               {/* Dahabshiil */}
               <div className="flex items-center gap-2 group cursor-default">
                   <div className="w-8 h-8 rounded-full bg-[#006838] text-white flex items-center justify-center font-serif font-bold text-sm">D</div>
                   <span className="text-xl font-black text-[#006838]">Dahabshiil Bank</span>
               </div>

               {/* Zaad */}
               <div className="flex items-center gap-1 group cursor-default">
                   <span className="text-2xl font-black text-[#009640] tracking-tighter">ZAAD</span>
                   <div className="h-2 w-2 rounded-full bg-[#009640] mb-2"></div>
               </div>

               {/* eDahab */}
               <div className="flex items-center gap-2 group cursor-default">
                   <span className="text-2xl font-bold italic text-[#FDB913]">eDahab</span>
               </div>

               {/* Telesom */}
               <div className="flex items-center gap-2 group cursor-default">
                   <div className="w-8 h-8 bg-blue-600 rounded-md"></div>
                   <span className="text-xl font-bold text-slate-800">Telesom</span>
               </div>

            </div>
         </div>
      </section>

      {/* --- Diaspora Specific Section --- */}
      <section id="diaspora" className="py-24 px-6 bg-brand-900 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-800 skew-x-12 translate-x-32 -z-0"></div>
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="flex-1 space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold uppercase tracking-wider">
                     <Plane size={14} /> Xalka Rasmiga ah ee Qurba Joogta
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black leading-tight">
                     Hantidaada Somaliland meel kasta ka maamul.
                  </h2>
                  <p className="text-xl text-brand-100 font-medium leading-relaxed max-w-xl">
                     Ma joogtid dalka? Wax walwal ah ha qabin. GuriHub waxay kuu suurtogelinaysaa inaad "Guri Bot AI" iyo App-ka u isticmaasho inaad kula socoto dakhligaaga, dayactirka guryaha, iyo heshiisyada kirada adigoo jooga London, Minneapolis, ama Dubai.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {[
                        { title: 'Lacag-bixin Caalami ah', desc: 'Dakhligaagu wuxuu si toos ah ugu dhacayaa akoonkaaga Dahabshiil ama Salaam.', icon: Globe },
                        { title: 'Live Video Inspection', desc: 'Codso kormeer muuqaal ah (Video) si aad u aragto xaaladda gurigaaga.', icon: Smartphone },
                        { title: 'Heshiisyo Digital ah', desc: 'Saxiix dhammaan dukumeentiyada adigoo isticmaalaya e-Sign meel kasta.', icon: FileText },
                        { title: 'Maamule Daacad ah', desc: 'Yaree muranka ehelka iyo asxaabta, nidaamka ayaana ku maamulaya.', icon: Shield }
                     ].map((item, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-all">
                           <item.icon size={24} className="text-brand-400 mb-3 group-hover:scale-110 transition-transform" />
                           <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                           <p className="text-sm text-brand-200/80 leading-relaxed">{item.desc}</p>
                        </div>
                     ))}
                  </div>
               </div>
               
               <div className="flex-1 w-full max-w-md lg:max-w-none">
                  <div className="relative">
                     {/* World Map Background (Abstract) */}
                     <div className="bg-brand-800 rounded-[3rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')]"></div>
                         
                         {/* Connection Animation Overlay */}
                         <div className="relative z-10 flex flex-col items-center">
                             <div className="flex items-center gap-8 mb-12">
                                <div className="flex flex-col items-center gap-2">
                                   <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                      <img src="https://ui-avatars.com/api/?name=Diaspora+Owner&background=059669&color=fff" className="w-14 h-14 rounded-full" alt="Owner" />
                                   </div>
                                   <span className="text-xs font-bold uppercase tracking-widest text-brand-300">USA / UK / UAE</span>
                                </div>
                                <div className="flex flex-col items-center text-brand-400">
                                   <div className="w-24 h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent relative">
                                      <div className="absolute top-1/2 left-0 w-2 h-2 bg-brand-400 rounded-full -translate-y-1/2 animate-ping"></div>
                                   </div>
                                   <Zap size={20} className="my-2" />
                                   <div className="w-24 h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent"></div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                   <div className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center border border-brand-500 shadow-xl shadow-brand-500/50">
                                      <Building2 size={24} />
                                   </div>
                                   <span className="text-xs font-bold uppercase tracking-widest text-brand-300">Somaliland</span>
                                </div>
                             </div>
                             
                             <div className="w-full bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                                <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                                   <TrendingUp size={16} className="text-emerald-400" /> Diaspora Income Stats
                                </h4>
                                <div className="space-y-4">
                                   <div className="flex justify-between items-center">
                                      <span className="text-xs text-slate-400 font-medium">Monthly Rent (Hargeisa)</span>
                                      <span className="font-bold text-emerald-400">$3,500.00</span>
                                   </div>
                                   <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                      <div className="bg-brand-500 h-full w-[85%]"></div>
                                   </div>
                                   <div className="flex justify-between items-center pt-2">
                                      <span className="text-[10px] text-slate-500 font-bold uppercase">Payout Status</span>
                                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase">Transferred</span>
                                   </div>
                                </div>
                             </div>
                         </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- Features Grid --- */}
      <section id="features" className="py-24 px-6 bg-slate-50">
         <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
               <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
                  Xalka rasmiga ah ee maamulka hantida.
               </h2>
               <p className="text-lg text-slate-500 font-medium">
                  GuriHub waxay meesha ka saaraysaa waraaqaha, muranka, iyo xisaab xumada. Wax walba oo aad u baahan tay waa hal meel.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                  {
                     title: 'Maamule AI Casri ah',
                     desc: 'GuriBot ayaa si toos ah uga jawaaba su\'aalaha macmiilka, qabta waqtiyada booqashada, soona saarta heshiisyada.',
                     icon: Bot,
                     color: 'text-brand-600',
                     bg: 'bg-brand-50'
                  },
                  {
                     title: 'Lacag Bixin Fudud',
                     desc: 'Kirooyinka waxaa lagu bixin karaa Zaad, eDahab, ama Bank Transfer. Si toos ah ayay ugu dhacaysaa akoonkaaga.',
                     icon: CreditCard,
                     color: 'text-blue-600',
                     bg: 'bg-blue-50'
                  },
                  {
                     title: 'Portal-ka Kiraystaha',
                     desc: 'App u gaar ah kiraystayaasha si ay u bixiyaan kirada, u soo gudbiyaan ciladaha, una arkaan heshiiskooda.',
                     icon: Smartphone,
                     color: 'text-purple-600',
                     bg: 'bg-purple-50'
                  },
                  {
                     title: 'La-socodka Dayactirka',
                     desc: 'Diiwaangeli ciladaha guriga, u dir shaqaale (Nijaar/Tubiste), oo la soco kharashka ku baxay.',
                     icon: Wrench,
                     color: 'text-orange-600',
                     bg: 'bg-orange-50'
                  },
                  {
                     title: 'Warbixino Maaliyadeed',
                     desc: 'Warbixino toos ah oo ku saabsan dakhliga iyo kharashka (Profit & Loss), iyo heerka degganaanshaha.',
                     icon: BarChart3,
                     color: 'text-green-600',
                     bg: 'bg-green-50'
                  },
                  {
                     title: 'Waafaqsanaanta Sharciga',
                     desc: 'Heshiisyo waafaqsan sharciga Somaliland oo ay diyaariyeen qareeno, si looga hortago muranka.',
                     icon: Shield,
                     color: 'text-red-600',
                     bg: 'bg-red-50'
                  }
               ].map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-brand-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                  >
                     <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon size={28} strokeWidth={1.5} />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                     <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- Agencies Section --- */}
      <section id="agencies" className="py-24 px-6 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="flex-1 space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold uppercase tracking-wider">
                     <Briefcase size={14} /> Wakaaladaha Guryaha
                  </div>
                  
                  <h2 className="text-4xl font-black text-slate-900 leading-tight">
                     Kordhi dakhliga wakaaladdaada, yaree shaqada gacanta.
                  </h2>
                  
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">
                     GuriHub waxay siisaa wakaaladaha qalab casri ah oo ay ku maamulaan boqolaal guri, shaqaale badan, iyo xiriirka macaamiisha (CRM). 
                  </p>
                  
                  <div className="space-y-4">
                     {[
                        'CRM Casri ah oo lagu maamulo xogta macaamiisha',
                        'Warbixino toos ah oo ku socda mulkiilayaasha',
                        'Habka ogolaanshaha dayactirka (Maintenance Approval)',
                        'Maamulka Shaqaalaha (Agent Management)'
                     ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                           <div className="bg-blue-100 text-blue-600 p-2 rounded-lg shrink-0">
                              <CheckCircle2 size={20} />
                           </div>
                           <span className="font-bold text-slate-700">{item}</span>
                        </div>
                     ))}
                  </div>

                  <button onClick={onSignIn} className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                     Diiwaangeli Wakaalad
                  </button>
               </div>
               
               <div className="flex-1 relative w-full">
                  {/* Image Container with Styling */}
                  <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-200 rotate-2 hover:rotate-0 transition-all duration-700 h-[500px] group">
                     <img 
                       src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
                       alt="Modern Somali Style Villa" 
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                       loading="lazy"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                     
                     {/* Overlay Stats Card */}
                     <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                               <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Active Listings</p>
                               <h3 className="text-2xl font-black text-slate-900">42 Guri</h3>
                            </div>
                            <div className="flex -space-x-3">
                               {[1,2,3].map(i => (
                                  <img key={i} src={`https://ui-avatars.com/api/?name=Agent+${i}&background=random`} alt="" className="w-10 h-10 rounded-full border-2 border-white" />
                               ))}
                               <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">+8</div>
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                           <div className="bg-blue-600 h-2 rounded-full w-[75%]"></div>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-slate-500">
                           <span>Hadafka Bishan</span>
                           <span className="text-blue-600">75%</span>
                        </div>
                     </div>
                  </div>
                  
                  {/* Background Element */}
                  <div className="absolute top-12 -right-12 w-full h-full bg-blue-50 rounded-[3rem] -z-10 transform rotate-6 border border-blue-100"></div>
               </div>
            </div>
         </div>
      </section>

      {/* --- Owners Section --- */}
      <section id="owners" className="py-24 px-6 bg-slate-50 border-t border-slate-200">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
               
               {/* Left: Beautiful Image (Interior) */}
               <div className="flex-1 relative w-full">
                   <div className="relative z-10 h-[550px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white rotate-[-2deg] hover:rotate-0 transition-all duration-700 group bg-slate-200">
                      <img 
                        src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80" 
                        alt="Beautiful Somali Style Interior" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        loading="lazy"
                      />
                      
                      {/* Floating Notification */}
                      <div className="absolute top-8 left-8 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce [animation-duration:4s]">
                          <div className="bg-green-100 p-2.5 rounded-full text-green-600">
                             <DollarSign size={24} />
                          </div>
                          <div>
                             <p className="text-xs font-bold text-slate-500 uppercase">Lacag Soo Dhacday</p>
                             <p className="font-bold text-slate-900">$1,500 Received</p>
                          </div>
                      </div>
                   </div>
                   <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-brand-200 rounded-full -z-10 blur-3xl opacity-50"></div>
               </div>

               {/* Right: Content */}
               <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-100 text-xs font-bold uppercase tracking-wider mb-6">
                     <Shield size={14} /> Mulkiilayaasha Guryaha
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                     Hantidaadu waa ammaan, dakhligaaguna waa hufan yahay.
                  </h2>
                  <p className="text-lg text-slate-500 mb-10 font-medium leading-relaxed">
                     GuriHub waxay ku siinaysaa "Owner Portal" oo aad kala socon karto xaaladda guryahaaga, heshiisyada kirada, iyo lacagaha soo dhacay, xilli kasta iyo meel kasta.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     {[
                        { icon: DollarSign, title: 'Maaliyadda Tooska ah', desc: 'Arag lacagaha soo dhacay.', color: 'text-green-600', bg: 'bg-green-50' },
                        { icon: FileText, title: 'Heshiisyada Digital-ka', desc: 'Kaydi oo eeg heshiisyada.', color: 'text-purple-600', bg: 'bg-purple-50' },
                        { icon: AlertTriangle, title: 'Ogolaanshaha Dayactirka', desc: 'Ansax codsiyada ciladaha.', color: 'text-orange-600', bg: 'bg-orange-50' },
                        { icon: BarChart3, title: 'Warbixinta Faa\'iidada', desc: 'Lasoco faa\'iidada (P&L).', color: 'text-blue-600', bg: 'bg-blue-50' },
                     ].map((item, i) => (
                        <div 
                          key={i} 
                          className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-brand-200 hover:shadow-md transition-all"
                        >
                           <div className={`w-10 h-10 rounded-lg ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                              <item.icon size={20} />
                           </div>
                           <div>
                              <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* --- Pricing Section --- */}
      <section id="pricing" className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-900/20 to-transparent pointer-events-none"></div>
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-black mb-6">Qiimaha la awoodi karo</h2>
               <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                  Dooro xirmada ku habboon baahidaada. Laga bilaabo shakhsiyaadka ilaa shirkadaha waaweyn.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Free Tier */}
               <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-slate-600 transition-colors flex flex-col">
                  <div className="mb-6">
                     <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Bilaash (Free)</span>
                     <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-4xl font-black">$0</span>
                        <span className="text-slate-500">/bishii</span>
                     </div>
                     <p className="text-slate-400 text-sm mt-3">Ku habboon mulkiilaha 1 guri haysta.</p>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                     {['Maamulka 1 Guri', 'Warbixin Kooban', 'App-ka Mulkiilaha'].map(feat => (
                        <li key={feat} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                           <Check size={16} className="text-green-500" /> {feat}
                        </li>
                     ))}
                  </ul>
                  <button onClick={onSignIn} className="w-full py-3 rounded-xl border border-slate-600 font-bold hover:bg-slate-700 transition-colors">
                     Bilow Hadda
                  </button>
               </div>

               {/* Pro Tier */}
               <div className="bg-brand-600 rounded-3xl p-8 border border-brand-500 shadow-2xl relative transform md:-translate-y-4 flex flex-col">
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                     BEST VALUE
                  </div>
                  <div className="mb-6">
                     <span className="text-brand-200 font-bold uppercase tracking-wider text-xs">Dhexdhexaad (Pro)</span>
                     <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-5xl font-black text-white">$29</span>
                        <span className="text-brand-200">/bishii</span>
                     </div>
                     <p className="text-brand-100 text-sm mt-3">Wakaaladaha yaryar iyo dhexdhexaadka ah.</p>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                     {['Illaa 50 Guri', 'SMS Alerts (Ogeysiis)', 'Zaad & eDahab Integration', 'Maintenance Workflow'].map(feat => (
                        <li key={feat} className="flex items-center gap-3 text-sm font-medium text-white">
                           <div className="p-1 bg-white/20 rounded-full"><Check size={12} className="text-white" /></div> {feat}
                        </li>
                     ))}
                  </ul>
                  <button onClick={onSignIn} className="w-full py-3 rounded-xl bg-white text-brand-700 font-bold hover:bg-brand-50 transition-colors shadow-lg">
                     Isdiiwaangeli
                  </button>
               </div>

               {/* Enterprise Tier */}
               <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-slate-600 transition-colors flex flex-col">
                  <div className="mb-6">
                     <span className="text-purple-400 font-bold uppercase tracking-wider text-xs">Ganacsi (Enterprise)</span>
                     <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-4xl font-black text-white">$99</span>
                        <span className="text-slate-500">/bishii</span>
                     </div>
                     <p className="text-slate-400 text-sm mt-3">Shirkadaha waaweyn iyo guryaha badan.</p>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                     {['Guryo aan xad lahayn', 'API Access', 'Dedicated Support', 'White Label (Astaantaada)'].map(feat => (
                        <li key={feat} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                           <Check size={16} className="text-purple-500" /> {feat}
                        </li>
                     ))}
                  </ul>
                  <button onClick={onSignIn} className="w-full py-3 rounded-xl border border-slate-600 font-bold hover:bg-slate-700 transition-colors">
                     La Xiriir Sales
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* --- Mobile App Section --- */}
      <section className="py-24 px-6 bg-slate-50 overflow-hidden relative">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
            <div className="flex-1 space-y-8">
               <div className="inline-block bg-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-600 border border-brand-100 shadow-sm">
                  Mobile First
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  Ganacsigaaga oo dhan ka maamul jeebkaaga.
               </h2>
               <p className="text-lg text-slate-500 font-medium max-w-xl">
                  App-ka GuriHub ee mulkiilaha iyo wakaaladda wuxuu ku siinayaa awood buuxda. Ansixi codsiyada, eeg xisaabaadka, oo la xiriir kiraystayaasha adigoo socda.
               </p>
               
               <div className="flex flex-wrap gap-6 pt-4">
                  <div className="flex items-center gap-3">
                     <div className="p-3 bg-white rounded-xl border border-slate-200 text-brand-600 shadow-sm">
                        <Bell />
                     </div>
                     <span className="font-semibold text-slate-700">Push Notifications</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="p-3 bg-white rounded-xl border border-slate-200 text-brand-600 shadow-sm">
                        <CheckCircle2 />
                     </div>
                     <span className="font-semibold text-slate-700">Offline Mode Support</span>
                  </div>
               </div>

               <div className="flex gap-4 mt-8">
                  <button 
                    onClick={onSignIn}
                    className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg shadow-slate-900/20"
                  >
                     <Smartphone size={20} /> Download App
                  </button>
               </div>
            </div>

            <div className="flex-1 relative flex justify-center">
               {/* Phone Mockup - Simplified CSS */}
               <div className="relative w-[280px] h-[550px] bg-slate-900 rounded-[3rem] border-8 border-slate-900 shadow-2xl overflow-hidden ring-4 ring-slate-200">
                   {/* Notch */}
                   <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 z-20 flex justify-center">
                       <div className="w-32 h-6 bg-slate-900 rounded-b-xl"></div>
                   </div>
                   
                   {/* Screen Content */}
                   <div className="w-full h-full bg-white flex flex-col relative overflow-hidden">
                       {/* Header */}
                       <div className="bg-brand-600 p-6 pt-10 text-white">
                           <div className="flex justify-between items-center mb-4">
                               <div className="flex items-center gap-2">
                                   <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur"><Bot size={16}/></div>
                                   <span className="font-bold text-sm">GuriBot</span>
                               </div>
                               <Bell size={18} />
                           </div>
                           <h3 className="text-2xl font-bold">$24,500</h3>
                           <p className="text-brand-100 text-xs">Total Revenue</p>
                       </div>
                       
                       {/* App Body */}
                       <div className="flex-1 bg-slate-50 p-4 space-y-3">
                           {/* Quick Stats */}
                           <div className="grid grid-cols-2 gap-3">
                               <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                   <Building2 size={20} className="text-blue-500 mb-2" />
                                   <p className="text-xs text-slate-400 font-bold uppercase">Properties</p>
                                   <p className="font-bold text-slate-800">12 Active</p>
                               </div>
                               <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                   <Users size={20} className="text-purple-500 mb-2" />
                                   <p className="text-xs text-slate-400 font-bold uppercase">Tenants</p>
                                   <p className="font-bold text-slate-800">42 Total</p>
                               </div>
                           </div>
                           
                           {/* List */}
                           <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                               <div className="p-3 border-b border-slate-50 text-xs font-bold text-slate-900 uppercase">Recent Activity</div>
                               {[1,2,3].map(i => (
                                   <div key={i} className="p-3 flex gap-3 items-center border-b border-slate-50 last:border-0">
                                       <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><DollarSign size={14}/></div>
                                       <div>
                                           <p className="text-xs font-bold text-slate-800">Rent Payment</p>
                                           <p className="text-[10px] text-slate-500">+$450 via Zaad</p>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       </div>
                       
                       {/* App Nav */}
                       <div className="bg-white border-t border-slate-100 p-4 flex justify-between text-slate-400">
                           <Home size={20} className="text-brand-600" />
                           <Search size={20} />
                           <Users size={20} />
                           <Wrench size={20} />
                       </div>
                   </div>
               </div>
               
               {/* Glow behind phone */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[500px] bg-brand-200/50 blur-3xl -z-10 rounded-full"></div>
            </div>
         </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
               <div className="col-span-2 lg:col-span-2">
                  <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                     <div className="bg-brand-600 text-white p-2 rounded-xl shadow-sm">
                        <Home size={20} className="text-white" strokeWidth={2.5} />
                     </div>
                     <span className="text-xl font-extrabold tracking-tight text-slate-900">Guri<span className="text-brand-600">Hub</span></span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
                     Nidaamka #1 ee maamulka hantida ee Somaliland. Wuxuu awood siiyaa wakaaladaha, mulkiilayaasha, iyo kiraystayaasha.
                  </p>
                  <div className="flex gap-4">
                     <a href="#" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-brand-500 hover:text-brand-600 transition-colors cursor-pointer text-slate-400">
                        <Facebook size={16} />
                     </a>
                     <a href="#" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-brand-500 hover:text-brand-600 transition-colors cursor-pointer text-slate-400">
                        <Instagram size={16} />
                     </a>
                     <a href="#" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-brand-500 hover:text-brand-600 transition-colors cursor-pointer text-slate-400">
                        <Twitter size={16} />
                     </a>
                  </div>
               </div>
               
               <div>
                  <h4 className="font-bold text-slate-900 mb-4">Alaabta</h4>
                  <ul className="space-y-3 text-sm text-slate-500">
                     <li><button onClick={() => scrollToSection('features')} className="hover:text-brand-600 transition-colors">Adeegyada</button></li>
                     <li><button onClick={() => scrollToSection('pricing')} className="hover:text-brand-600 transition-colors">Qiimaha</button></li>
                     <li><button onClick={onSignIn} className="hover:text-brand-600 transition-colors">Mobile App</button></li>
                     <li><button onClick={onSignIn} className="hover:text-brand-600 transition-colors">API Access</button></li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-bold text-slate-900 mb-4">Shirkadda</h4>
                  <ul className="space-y-3 text-sm text-slate-500">
                     <li><a href="#" className="hover:text-brand-600 transition-colors">Ku saabsan GuriHub</a></li>
                     <li><a href="#" className="hover:text-brand-600 transition-colors">Shaqooyin</a></li>
                     <li><a href="#" className="hover:text-brand-600 transition-colors">Blog</a></li>
                     <li><a href="mailto:support@gurihub.so" className="hover:text-brand-600 transition-colors">La Xiriir</a></li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-bold text-slate-900 mb-4">Sharciga</h4>
                  <ul className="space-y-3 text-sm text-slate-500">
                     <li><a href="#" className="hover:text-brand-600 transition-colors">Privacy Policy</a></li>
                     <li><a href="#" className="hover:text-brand-600 transition-colors">Terms of Service</a></li>
                     <li><a href="#" className="hover:text-brand-600 transition-colors">Cookie Policy</a></li>
                     <li><a href="#" className="hover:text-brand-600 transition-colors">Security</a></li>
                  </ul>
               </div>
            </div>
            
            <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
               <p className="text-xs text-slate-400">© 2024 GuriHub. Xuquuqda oo dhan way dhowran tahay.</p>
               <div className="flex gap-2 text-xs text-slate-400">
                  <span>Waxaa lagu sameeyay ❤️ Hargeisa</span>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};
