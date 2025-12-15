
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { 
  Building2, ArrowRight, CheckCircle2, 
  Smartphone, Globe, Shield, 
  Home, Facebook, Instagram, Twitter,
  Bell, Users, AlertTriangle, Calendar, CreditCard, Mail, Lock, DollarSign, Bot, Wrench, FileText, Search, Star, BarChart3, Briefcase, Check
} from 'lucide-react';

interface LandingPageProps {
  onLogin: (user: User) => void;
  users: User[];
  onSignIn: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin, users, onSignIn }) => {
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper for interactive feedback
  const handleInfo = (message: string) => {
    alert(message);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans selection:bg-brand-200 selection:text-brand-900 overflow-x-hidden" dir="ltr">
      
      {/* --- Navbar --- */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-lg border-b border-gray-100 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
             <div className="bg-brand-600 text-white p-2 rounded-xl group-hover:bg-gray-900 transition-colors duration-300">
               <Home size={24} className="text-white group-hover:text-brand-400 transition-colors" />
             </div>
             <span className="text-xl font-extrabold tracking-tight">Guri<span className="text-brand-600">Hub</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
             {[
               { id: 'features', label: 'Adeegyada' }, 
               { id: 'agencies', label: 'Wakaaladaha' }, 
               { id: 'owners', label: 'Mulkiilayaasha' }, 
               { id: 'pricing', label: 'Qiimaha' }
             ].map((item) => (
               <button 
                 key={item.id} 
                 onClick={() => scrollToSection(item.id)} 
                 className="hover:text-gray-900 transition-colors relative group"
               >
                 {item.label}
                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-600 transition-all group-hover:w-full"></span>
               </button>
             ))}
          </div>

          <div className="flex items-center gap-4">
             <button 
               onClick={onSignIn}
               className="hidden md:block text-sm font-bold text-gray-900 hover:text-brand-700 transition-colors"
             >
               Soo Gal
             </button>
             <button 
               onClick={onSignIn}
               className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
             >
               Isdiiwaangeli
             </button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
         {/* Abstract Background Blobs */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-brand-50/80 to-transparent rounded-[50%] blur-3xl -z-10 pointer-events-none"></div>
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

         <div className="max-w-6xl mx-auto text-center relative z-10">
            {/* Pill Badge */}
            <div 
              onClick={() => handleInfo("Nidaamkan cusub wuxuu ku shaqeeya AI si uu u fududeeyo maaraynta guryaha.")}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full pl-1 pr-4 py-1 shadow-sm mb-8 hover:border-brand-300 hover:shadow-md transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
               <span className="bg-brand-100 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Cusub</span>
               <span className="text-xs font-semibold text-gray-600">Nidaamka AI ee maamulka guryaha ayaa yimid</span>
               <ArrowRight size={12} className="text-gray-400" />
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tight mb-8 leading-[1.05] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
               Habka ugu <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-green-500 to-teal-500">Casrisan</span> <br />
               ee loo maamulo Hantida.
            </h1>

            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
               GuriHub waxay si toos ah isugu xirtaa Wakaaladaha, Mulkiilayaasha, iyo Kiraystayaasha. Waxaa ku shaqeeya <span className="text-brand-600 font-bold">AI</span>, waxaana lagu bixin karaa <span className="text-brand-600 font-bold">Zaad & eDahab</span>.
            </p>

            {/* AI Chat Interface Demo (Layla Style) */}
            <div 
              onClick={() => handleInfo("Tani waa tusaale GuriBot. Isdiiwaangeli si aad ula hadasho!")}
              className="relative max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 cursor-pointer hover:scale-[1.01] transition-transform"
            >
               <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative z-20">
                  {/* Fake Browser/App Header */}
                  <div className="bg-gray-50/80 backdrop-blur border-b border-gray-100 p-4 flex items-center gap-4">
                     <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                     </div>
                     <div className="flex-1 text-center text-xs font-medium text-gray-400">GuriBot AI Assistant</div>
                     <div className="w-12"></div>
                  </div>

                  {/* Chat Content */}
                  <div className="p-6 md:p-8 min-h-[300px] flex flex-col gap-6 bg-gradient-to-b from-white to-gray-50/30">
                     {/* Bot Message */}
                     <div className="flex gap-4 max-w-[85%]">
                        <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-200 shrink-0">
                           <Bot size={20} />
                        </div>
                        <div className="space-y-2 text-left">
                           <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 text-sm md:text-base text-gray-800 font-medium">
                              Soo dhawoow walaal! Anigu waxaan ahay GuriBot. Sideen kaa caawin karaa maanta?
                           </div>
                           <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 text-sm md:text-base text-gray-800 font-medium">
                              Ma waxaad rabtaa inaad kireysato guri, mise hanti ayaad noo dhiibanaysaa si aan kuugu maamulo?
                           </div>
                        </div>
                     </div>

                     {/* User Reply */}
                     <div className="flex gap-4 max-w-[85%] self-end flex-row-reverse">
                        <div className="w-10 h-10 rounded-2xl bg-gray-900 flex items-center justify-center text-white shadow-lg shrink-0">
                           <span className="font-bold text-xs">ADI</span>
                        </div>
                        <div className="bg-brand-600 text-white rounded-2xl rounded-tr-none p-4 text-sm md:text-base font-medium shadow-xl shadow-brand-500/20 text-right">
                           Waxaan raadinayaa Villa 4-qol ah oo ku taala Shacabka, Hargeisa.
                        </div>
                     </div>

                     {/* Bot Action/Widget */}
                     <div className="flex gap-4 max-w-md animate-pulse">
                        <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shrink-0 opacity-50">
                           <Bot size={20} />
                        </div>
                        <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm text-left">
                           <div className="h-2.5 bg-gray-200 rounded-full w-3/4 mb-3"></div>
                           <div className="h-2 bg-gray-100 rounded-full w-1/2 mb-4"></div>
                           <div className="flex gap-2">
                              <div className="h-8 bg-brand-50 rounded-lg w-20"></div>
                              <div className="h-8 bg-gray-50 rounded-lg w-20"></div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Input Bar */}
                  <div className="p-4 border-t border-gray-100 bg-white">
                     <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2 pr-2 border border-transparent focus-within:border-brand-300 focus-within:ring-4 focus-within:ring-brand-100 transition-all">
                        <div className="p-2 text-gray-400">
                           <Search size={20} />
                        </div>
                        <input 
                           type="text" 
                           placeholder="La hadal GuriBot..." 
                           className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-gray-900 placeholder:text-gray-400"
                           disabled
                        />
                        <button onClick={onSignIn} className="bg-brand-600 text-white p-2 rounded-lg hover:bg-brand-700 transition-colors">
                           <ArrowRight size={16} />
                        </button>
                     </div>
                  </div>
               </div>

               {/* Decorative floating elements */}
               <div className="absolute -top-12 -right-12 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden lg:block animate-bounce [animation-duration:3s]">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-green-100 text-green-600 rounded-lg"><DollarSign size={20} /></div>
                     <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Dakhliga (Revenue)</p>
                        <p className="text-lg font-bold text-gray-900">+$12,450</p>
                     </div>
                  </div>
               </div>
               
               <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden lg:block animate-bounce [animation-duration:4s]">
                  <div className="flex items-center gap-3">
                     <div className="flex -space-x-2">
                        {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>)}
                     </div>
                     <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Kiraystayaal Cusub</p>
                        <p className="text-sm font-bold text-gray-900">+5 usbuucan</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- Partners / Trust --- */}
      <section className="py-10 border-y border-gray-100 bg-gray-50/50">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Waxa nagu kalsoon shirkadaha ugu waaweyn</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
               
               {/* Dahabshiil Bank */}
               <div 
                 onClick={() => handleInfo("Iskaashiga Dahabshiil wuxuu kuu sahlayaa inaad akoonkaaga bangiga toos ugu hesho kirada.")}
                 className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 cursor-pointer"
               >
                   <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#006838] flex items-center justify-center text-white font-serif font-black text-xs md:text-sm shadow-sm border border-white">D</div>
                   <span className="text-xl md:text-2xl font-black text-[#006838] tracking-tighter">Dahabshiil Bank</span>
               </div>

               {/* Zaad */}
               <div 
                 onClick={() => handleInfo("Zaad Service: Kiradaada ku bixi ama ku hel Zaad adigoo gurigaaga jooga.")}
                 className="flex items-center gap-1 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 cursor-pointer"
               >
                   <span className="text-2xl md:text-3xl font-black text-[#009640] tracking-tight">ZAAD</span>
                   <div className="h-2 w-2 rounded-full bg-[#009640] mb-3"></div>
               </div>

               {/* eDahab */}
               <div 
                 onClick={() => handleInfo("eDahab: Adeegga lacag-bixinta ee Somtel oo si buuxda ula shaqeeya GuriHub.")}
                 className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 cursor-pointer"
               >
                   <div className="text-2xl md:text-3xl font-bold italic text-[#FDB913]">eDahab</div>
               </div>

               {/* Wadag Bank */}
               <div 
                 onClick={() => handleInfo("Wadag Bank: Maalgelinta guryaha iyo adeegyada bangiga ee casriga ah.")}
                 className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 cursor-pointer"
               >
                   <div className="w-8 h-8 rounded bg-[#0055A5] flex items-center justify-center text-white font-bold text-xs">W</div>
                   <span className="text-xl md:text-2xl font-black text-[#0055A5] tracking-tight">Wadag<span className="font-light">Bank</span></span>
               </div>

            </div>
         </div>
      </section>

      {/* --- Features Grid --- */}
      <section id="features" className="py-24 px-6 bg-white">
         <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto mb-20">
               <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                  Qurbajoog: Ma ka walwashaa hantidaada dalkii?
               </h2>
               <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
                  Ma ka daashay wakaalado aan daacad ahayn ama qaraabo aan xilkas ahayn? Ma jeceshahay inaad si toos ah ula socoto kiradaada, dayactirka, iyo heshiisyada? <br className="hidden md:block" />
                  <span className="text-brand-600 font-bold">GuriHub waa xalka aad sugaysay.</span>
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  {
                     title: 'Maamule AI Casri ah',
                     desc: 'GuriBot ayaa si toos ah uga jawaaba su\'aalaha macmiilka, qabta waqtiyada booqashada, soona saarta heshiisyada.',
                     icon: Bot,
                     color: 'text-purple-600',
                     bg: 'bg-purple-50'
                  },
                  {
                     title: 'Lacag Bixin Fudud',
                     desc: 'Kirooyinka waxaa lagu bixin karaa Zaad, eDahab, ama Bank Transfer. Si toos ah ayay ugu dhacaysaa akoonkaaga.',
                     icon: CreditCard,
                     color: 'text-green-600',
                     bg: 'bg-green-50'
                  },
                  {
                     title: 'Portal-ka Kiraystaha',
                     desc: 'App u gaar ah kiraystayaasha si ay u bixiyaan kirada, u soo gudbiyaan ciladaha, una arkaan heshiiskooda.',
                     icon: Smartphone,
                     color: 'text-blue-600',
                     bg: 'bg-blue-50'
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
                     icon: FileText,
                     color: 'text-teal-600',
                     bg: 'bg-teal-50'
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
                    onClick={() => handleInfo(`${feature.title}: ${feature.desc}`)}
                    className="group p-8 rounded-3xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 cursor-pointer"
                  >
                     <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon size={28} />
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                     <p className="text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- Agencies Section --- */}
      <section id="agencies" className="py-24 px-6 bg-gray-50">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="flex-1 space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold uppercase tracking-wider">
                     <Briefcase size={14} /> Wakaaladaha Guryaha
                  </div>
                  
                  <h2 className="text-4xl font-black text-gray-900 leading-tight">
                     Kordhi dakhliga wakaaladdaada, yaree shaqada gacanta.
                  </h2>
                  
                  <p className="text-lg text-gray-500 font-medium leading-relaxed">
                     GuriHub waxay siisaa wakaaladaha qalab casri ah oo ay ku maamulaan boqolaal guri, shaqaale badan, iyo xiriirka macaamiisha (CRM). 
                  </p>
                  
                  <div className="space-y-4">
                     {[
                        'CRM Casri ah oo lagu maamulo xogta macaamiisha',
                        'Warbixino toos ah oo ku socda mulkiilayaasha',
                        'Habka ogolaanshaha dayactirka (Maintenance Approval Workflow)',
                        'Maamulka Shaqaalaha (Agent Management)'
                     ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                           <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                              <CheckCircle2 size={20} />
                           </div>
                           <span className="font-bold text-gray-700">{item}</span>
                        </div>
                     ))}
                  </div>

                  <button onClick={onSignIn} className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                     Diiwaangeli Wakaalad
                  </button>
               </div>
               
               <div className="flex-1 relative">
                  <div className="relative bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-100 z-10">
                     <div className="flex justify-between items-center mb-8">
                        <div>
                           <p className="text-sm text-gray-500 font-bold uppercase">Active Agents</p>
                           <h3 className="text-3xl font-black text-gray-900">12</h3>
                        </div>
                        <div className="flex -space-x-2">
                           {[1,2,3,4].map(i => (
                              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"></div>
                           ))}
                           <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-600 text-white flex items-center justify-center font-bold text-xs">+8</div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        {[1,2,3].map(i => (
                           <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                 <Building2 size={24} />
                              </div>
                              <div className="flex-1">
                                 <div className="h-2.5 bg-gray-300 rounded-full w-3/4 mb-2"></div>
                                 <div className="h-2 bg-gray-200 rounded-full w-1/2"></div>
                              </div>
                              <div className="text-green-600 font-bold text-sm">Active</div>
                           </div>
                        ))}
                     </div>
                  </div>
                  
                  {/* Decor elements */}
                  <div className="absolute top-10 -right-10 w-full h-full bg-blue-500/10 rounded-[3rem] -z-10 transform rotate-6"></div>
               </div>
            </div>
         </div>
      </section>

      {/* --- Owners Section --- */}
      <section id="owners" className="py-24 px-6 bg-white border-t border-gray-100">
         <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-100 text-xs font-bold uppercase tracking-wider mb-6">
               <Shield size={14} /> Mulkiilayaasha Guryaha
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
               Hantidaadu waa ammaan, dakhligaaguna waa hufan yahay.
            </h2>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-16 font-medium">
               GuriHub waxay ku siinaysaa "Owner Portal" oo aad kala socon karto xaaladda guryahaaga, heshiisyada kirada, iyo lacagaha soo dhacay, xilli kasta iyo meel kasta.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                  { icon: DollarSign, title: 'Maaliyadda Tooska ah', desc: 'Arag lacagaha soo dhacay iyo kuwa maqan isla waqtiga ay dhacaan.', color: 'text-green-600', bg: 'bg-green-50' },
                  { icon: FileText, title: 'Heshiisyada Digital-ka', desc: 'Kaydi oo eeg dhamaan heshiisyada kiraystayaasha hal meel.', color: 'text-purple-600', bg: 'bg-purple-50' },
                  { icon: AlertTriangle, title: 'Ogolaanshaha Dayactirka', desc: 'Ansax codsiyada dayactirka inta aan lacag la bixin.', color: 'text-orange-600', bg: 'bg-orange-50' },
                  { icon: BarChart3, title: 'Warbixinta Faa\'iidada', desc: 'Lasoco faa\'iidada iyo kharashka (Profit & Loss) sanad kasta.', color: 'text-blue-600', bg: 'bg-blue-50' },
               ].map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleInfo(`${item.title} waa adeeg gaar u ah mulkiilayaasha.`)}
                    className="p-8 rounded-3xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  >
                     <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                        <item.icon size={24} />
                     </div>
                     <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                     <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- Pricing Section --- */}
      <section id="pricing" className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-900/40 to-transparent pointer-events-none"></div>
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-black mb-6">Qiimaha la awoodi karo</h2>
               <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                  Dooro xirmada ku habboon baahidaada. Laga bilaabo shakhsiyaadka ilaa shirkadaha waaweyn.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Free Tier */}
               <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-slate-600 transition-colors">
                  <div className="mb-6">
                     <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Bilaash (Free)</span>
                     <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-4xl font-black">$0</span>
                        <span className="text-slate-500">/bishii</span>
                     </div>
                     <p className="text-slate-400 text-sm mt-3">Ku habboon mulkiilaha 1 guri haysta.</p>
                  </div>
                  <ul className="space-y-4 mb-8">
                     {['Maamulka 1 Guri', 'Warbixin Kooban', 'App-ka Mulkiilaha'].map(feat => (
                        <li key={feat} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                           <Check size={16} className="text-green-500" /> {feat}
                        </li>
                     ))}
                  </ul>
                  <button onClick={() => handleInfo("Xirmada Bilaashka ah waa la doortay.")} className="w-full py-3 rounded-xl border border-slate-600 font-bold hover:bg-slate-700 transition-colors">
                     Bilow Hadda
                  </button>
               </div>

               {/* Pro Tier */}
               <div className="bg-brand-600 rounded-3xl p-8 border border-brand-500 shadow-2xl relative transform md:-translate-y-4">
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
                  <ul className="space-y-4 mb-8">
                     {['Illaa 50 Guri', 'SMS Alerts (Ogeysiis)', 'Zaad & eDahab Integration', 'Maintenance Workflow'].map(feat => (
                        <li key={feat} className="flex items-center gap-3 text-sm font-medium text-white">
                           <div className="p-1 bg-white/20 rounded-full"><Check size={12} className="text-white" /></div> {feat}
                        </li>
                     ))}
                  </ul>
                  <button onClick={() => handleInfo("Xirmada Pro waa la doortay. Fadlan isdiiwaangeli.")} className="w-full py-3 rounded-xl bg-white text-brand-700 font-bold hover:bg-brand-50 transition-colors shadow-lg">
                     Isdiiwaangeli
                  </button>
               </div>

               {/* Enterprise Tier */}
               <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-slate-600 transition-colors">
                  <div className="mb-6">
                     <span className="text-purple-400 font-bold uppercase tracking-wider text-xs">Ganacsi (Enterprise)</span>
                     <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-4xl font-black text-white">$99</span>
                        <span className="text-slate-500">/bishii</span>
                     </div>
                     <p className="text-slate-400 text-sm mt-3">Shirkadaha waaweyn iyo guryaha badan.</p>
                  </div>
                  <ul className="space-y-4 mb-8">
                     {['Guryo aan xad lahayn', 'API Access', 'Dedicated Support', 'White Label (Astaantaada)'].map(feat => (
                        <li key={feat} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                           <Check size={16} className="text-purple-500" /> {feat}
                        </li>
                     ))}
                  </ul>
                  <button onClick={() => handleInfo("Fadlan la xiriir kooxda iibka ee Enterprise.")} className="w-full py-3 rounded-xl border border-slate-600 font-bold hover:bg-slate-700 transition-colors">
                     La Xiriir Sales
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* --- Channel Manager Integration --- */}
      <section className="py-20 px-6 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="flex-1 space-y-8 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100 text-xs font-bold uppercase tracking-wider">
                     <Globe size={14} /> Global Reach
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                     Ku xidh hantidaada <br/> 
                     <span className="text-[#FF5A5F]">Airbnb</span> & <span className="text-[#003580]">Booking.com</span>
                  </h2>
                  
                  <p className="text-lg text-gray-500 font-medium leading-relaxed">
                     Kordhi dakhligaaga adigoo guryahaaga ku xayaysiinaya shirkadaha caalamiga ah. GuriHub waxay si toos ah u mideynaysaa (sync) jadwalkaaga si aanay u dhicin bookings is-dul-saaran.
                  </p>
                  
                  <ul className="space-y-4">
                     {[
                        'Automatic Calendar Sync (Is-waafajinta Jadwalka)',
                        'Hal meel ka maamul dhamaan martidaada',
                        'Qiimaha oo si toos ah loo maamulo',
                        'Ka hortagga ballamaha is-dul-saaran (Double-booking)'
                     ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 font-semibold text-gray-700">
                           <CheckCircle2 className="text-brand-600 shrink-0" size={20} />
                           {item}
                        </li>
                     ))}
                  </ul>
               </div>

               <div 
                 onClick={() => handleInfo("Channel Manager wuxuu mideeyaa Airbnb, Booking.com iyo GuriHub.")}
                 className="flex-1 relative w-full max-w-lg lg:max-w-none cursor-pointer hover:opacity-90 transition-opacity"
               >
                  {/* Visual representation of connection */}
                  <div className="relative bg-gray-50 rounded-[3rem] p-8 border border-gray-100">
                     {/* Center Hub */}
                     <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 relative z-20 mb-8 flex items-center gap-4">
                        <div className="bg-brand-600 w-12 h-12 rounded-xl flex items-center justify-center text-white">
                           <Home size={24} />
                        </div>
                        <div>
                           <h4 className="font-bold text-gray-900 text-lg">GuriHub Master Calendar</h4>
                           <p className="text-sm text-gray-500">Xarunta Dhexe</p>
                        </div>
                     </div>

                     {/* Connected Channels */}
                     <div className="grid grid-cols-2 gap-4 relative z-10">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center text-center gap-3 hover:-translate-y-1 transition-transform">
                           <div className="w-10 h-10 rounded-full bg-[#FF5A5F]/10 flex items-center justify-center text-[#FF5A5F]">
                              <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current"><path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.914 2.472.96 3.396l.004.254c0 3.882-2.903 6.867-6.526 6.867-2.316 0-4.045-1.121-5.63-3.666l-.37-.611-.366.61c-1.586 2.546-3.315 3.667-5.631 3.667C7.247 31 4.344 28.014 4.344 24.133c0-.976.248-1.921.964-3.65l.394-.88C6.98 16.733 11.234 8.056 13.116 4.36c1.328-2.33 2.825-3.36 4.884-3.36zM16 27.243c1.076 0 2.201-.89 3.016-2.316l.106-.192C18.428 23.36 17.5 21.603 16 21.603s-2.428 1.756-3.122 3.132l.106.192c.815 1.426 1.94 2.316 3.016 2.316z"></path></svg>
                           </div>
                           <span className="font-bold text-gray-800">Airbnb</span>
                           <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Xiriirsan</span>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center text-center gap-3 hover:-translate-y-1 transition-transform">
                           <div className="w-10 h-10 rounded-full bg-[#003580]/10 flex items-center justify-center text-[#003580]">
                              <span className="font-black text-xs tracking-tighter">B.</span>
                           </div>
                           <span className="font-bold text-gray-800">Booking.com</span>
                           <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Xiriirsan</span>
                        </div>
                     </div>

                     {/* Connector Lines (CSS drawing) */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-brand-200 to-transparent -z-0"></div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- Mobile App Section --- */}
      <section className="py-24 px-6 bg-gray-900 text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-900/50 to-transparent"></div>
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
            <div className="flex-1 space-y-8">
               <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-300 border border-white/10">
                  Mobile First
               </div>
               <h2 className="text-4xl md:text-5xl font-black leading-tight">
                  Ganacsigaaga oo dhan ka maamul jeebkaaga.
               </h2>
               <p className="text-lg text-gray-400 font-medium max-w-xl">
                  App-ka GuriHub ee mulkiilaha iyo wakaaladda wuxuu ku siinayaa awood buuxda. Ansixi codsiyada, eeg xisaabaadka, oo la xiriir kiraystayaasha adigoo socda.
               </p>
               
               <div className="flex flex-wrap gap-6 pt-4">
                  <div className="flex items-center gap-3">
                     <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <Bell className="text-brand-400" />
                     </div>
                     <span className="font-semibold">Ogeysiisyada Tooska ah (Push Notifications)</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <CheckCircle2 className="text-brand-400" />
                     </div>
                     <span className="font-semibold">Offline Mode Support</span>
                  </div>
               </div>

               <button 
                 onClick={() => handleInfo("App-ka wuxuu dhowaan soo galayaa Play Store iyo App Store!")}
                 className="mt-8 bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-brand-50 transition-colors flex items-center gap-2"
               >
                  <Smartphone size={20} /> Soo Dajiso App-ka
               </button>
            </div>

            <div className="flex-1 relative flex justify-center">
               {/* Full View Static Advertisement Phone Frame - Resized Smaller */}
               <div 
                 onClick={() => handleInfo("Kani waa muuqaalka App-ka GuriHub.")}
                 className="relative w-[200px] h-[400px] bg-black rounded-[24px] shadow-2xl border-[4px] border-gray-800 overflow-hidden box-border transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500 cursor-pointer"
               >
                   
                   {/* Top Notch Area (Simple Camera Dot) */}
                   <div className="absolute top-0 w-full h-4 flex justify-center items-center z-50">
                       <div className="w-12 h-3 bg-black rounded-b-md flex items-center justify-center">
                           <div className="w-0.5 h-0.5 bg-gray-800 rounded-full"></div>
                       </div>
                   </div>

                   {/* Screen */}
                   <div className="w-full h-full bg-white rounded-[20px] overflow-hidden relative flex flex-col">
                       
                       {/* App Header */}
                       <div className="bg-brand-600 pt-7 pb-3 px-3 text-white shadow-sm z-10">
                          <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1.5">
                                  {/* GuriBot Logo */}
                                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
                                      <Bot size={10} className="text-white" />
                                  </div>
                                  <div>
                                      <p className="text-[8px] opacity-90 font-bold tracking-wide leading-none">GuriBot</p>
                                      <p className="font-bold text-[10px] tracking-tight leading-none opacity-80">Dashboard</p>
                                  </div>
                              </div>
                              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 relative">
                                  <Bell size={8} />
                                  <span className="absolute top-1 right-1.5 w-1 h-1 bg-red-500 rounded-full border border-white"></span>
                              </div>
                          </div>
                       </div>
                       
                       {/* Scrollable Content Area - Sized to fit everything */}
                       <div className="flex-1 bg-gray-50 p-2 space-y-2 overflow-hidden flex flex-col">
                          {/* Revenue Card */}
                          <div className="bg-white shadow-sm rounded-xl p-2 border border-gray-100">
                             <div className="flex justify-between text-[8px] text-gray-500 mb-0.5 font-medium">
                                <span>Dakhliga Bishan</span>
                                <span className="text-green-600 font-bold text-[7px] bg-green-50 px-1 py-0.5 rounded-full">+12%</span>
                             </div>
                             <div className="text-lg font-black text-gray-900 tracking-tight">$24,500</div>
                             <div className="mt-1 flex gap-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full w-3/4 bg-brand-500 rounded-full"></div>
                                <div className="h-full w-1/4 bg-orange-400 rounded-full"></div>
                             </div>
                          </div>
                          
                          {/* Quick Actions Grid */}
                           <div className="grid grid-cols-2 gap-1.5">
                              <div className="bg-blue-50/80 p-1.5 rounded-lg flex flex-col items-center justify-center gap-1 text-blue-700 border border-blue-100">
                                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600">
                                     <Building2 size={10} />
                                  </div>
                                  <span className="text-[7px] font-bold uppercase tracking-wider">Hantida</span>
                              </div>
                              <div className="bg-purple-50/80 p-1.5 rounded-lg flex flex-col items-center justify-center gap-1 text-purple-700 border border-purple-100">
                                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm text-purple-600">
                                     <Calendar size={10} />
                                  </div>
                                  <span className="text-[7px] font-bold uppercase tracking-wider">Kirada</span>
                              </div>
                              <div className="bg-orange-50/80 p-1.5 rounded-lg flex flex-col items-center justify-center gap-1 text-orange-700 border border-orange-100">
                                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm text-orange-600">
                                     <Wrench size={10} />
                                  </div>
                                  <span className="text-[7px] font-bold uppercase tracking-wider">Ciladaha</span>
                              </div>
                              <div className="bg-green-50/80 p-1.5 rounded-lg flex flex-col items-center justify-center gap-1 text-green-700 border border-green-100">
                                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm text-green-600">
                                     <DollarSign size={10} />
                                  </div>
                                  <span className="text-[7px] font-bold uppercase tracking-wider">Xisaab</span>
                              </div>
                           </div>

                          {/* Recent Activity List - Compact View */}
                          <div className="space-y-1.5 flex-1">
                             <div className="flex justify-between items-center px-1">
                                <p className="font-bold text-[9px] text-gray-900">Cusboonaysiinta</p>
                                <button className="text-brand-600 text-[7px] font-extrabold uppercase tracking-wide">Eeg Dhamaan</button>
                             </div>
                             
                             {[
                               { title: 'Dalab Cusub', desc: 'Sarah James • Villa A1', time: '2m', color: 'text-blue-600', bg: 'bg-blue-50', icon: Users },
                               { title: 'Kiro la helay', desc: '+$850 via Zaad', time: '15m', color: 'text-green-600', bg: 'bg-green-50', icon: DollarSign },
                               { title: 'Cilad Dayactir', desc: 'Tuubo dilaacday • Apt 4B', time: '2h', color: 'text-orange-600', bg: 'bg-orange-50', icon: AlertTriangle },
                             ].map((item, i) => (
                                <div key={i} className="flex gap-1.5 items-center p-1.5 bg-white rounded-lg border border-gray-100/80 shadow-sm">
                                   <div className={`w-6 h-6 rounded-md ${item.bg} flex items-center justify-center ${item.color} shrink-0`}>
                                      <item.icon size={12} strokeWidth={2.5} />
                                   </div>
                                   <div className="flex-1 min-w-0">
                                      <div className="flex justify-between items-center mb-0.5">
                                          <p className="text-[9px] font-bold text-gray-900 truncate">{item.title}</p>
                                          <p className="text-[7px] font-semibold text-gray-400 bg-gray-50 px-1 py-0.5 rounded-md">{item.time}</p>
                                      </div>
                                      <p className="text-[8px] font-medium text-gray-500 truncate">{item.desc}</p>
                                   </div>
                                </div>
                             ))}
                          </div>
                          
                          {/* Ai Guri Logo at Bottom */}
                          <div className="mt-auto flex justify-center items-center gap-1 pb-1 opacity-70">
                               <div className="w-3 h-3 rounded-full bg-brand-100 flex items-center justify-center">
                                   <Bot size={6} className="text-brand-600" />
                               </div>
                               <span className="text-[7px] font-extrabold text-gray-400 uppercase tracking-widest">Ai Guri</span>
                          </div>
                       </div>
                       
                       {/* Home Indicator */}
                       <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[60px] h-[3px] bg-black/10 rounded-full z-50"></div>
                   </div>
               </div>
               
               {/* Background Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-500/20 rounded-full blur-3xl -z-10"></div>
            </div>
         </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-24 px-6 text-center">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">
               Diyaar ma u tahay inaad hormariso <br/> ganacsigaaga guryaha?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <button 
                  onClick={onSignIn}
                  className="w-full sm:w-auto bg-brand-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-700 hover:scale-105 transition-all shadow-xl shadow-brand-500/30"
               >
                  Hadda Isdiiwaangeli
               </button>
               <button 
                  onClick={onSignIn}
                  className="w-full sm:w-auto bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-50 hover:border-gray-300 transition-all"
               >
                  Dalbo Demo
               </button>
            </div>
         </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
               <div className="col-span-2 lg:col-span-2">
                  <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                     <div className="bg-brand-600 text-white p-2 rounded-xl shadow-sm">
                        <Home size={20} className="text-white" strokeWidth={2.5} />
                     </div>
                     <span className="text-xl font-extrabold tracking-tight">Guri<span className="text-brand-600">Hub</span></span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
                     Nidaamka #1 ee maamulka hantida ee Somaliland. Wuxuu awood siiyaa wakaaladaha, mulkiilayaasha, iyo kiraystayaasha.
                  </p>
                  <div className="flex gap-4">
                     <div onClick={() => handleInfo("Follow us on Facebook")} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-brand-500 hover:text-brand-600 transition-colors cursor-pointer text-gray-400">
                        <Facebook size={16} />
                     </div>
                     <div onClick={() => handleInfo("Follow us on Instagram")} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-brand-500 hover:text-brand-600 transition-colors cursor-pointer text-gray-400">
                        <Instagram size={16} />
                     </div>
                     <div onClick={() => handleInfo("Follow us on Twitter")} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-brand-500 hover:text-brand-600 transition-colors cursor-pointer text-gray-400">
                        <Twitter size={16} />
                     </div>
                  </div>
               </div>
               
               <div>
                  <h4 className="font-bold text-gray-900 mb-4">Alaabta (Product)</h4>
                  <ul className="space-y-3 text-sm text-gray-500">
                     <li><button onClick={() => scrollToSection('features')} className="hover:text-brand-600">Adeegyada</button></li>
                     <li><button onClick={() => scrollToSection('pricing')} className="hover:text-brand-600">Qiimaha</button></li>
                     <li><button onClick={() => handleInfo("App-ka dhawaan ayuu soo bixi doonaa.")} className="hover:text-brand-600">Mobile App</button></li>
                     <li><button onClick={() => handleInfo("Integrations: API for developers available soon.")} className="hover:text-brand-600">Integrations</button></li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-bold text-gray-900 mb-4">Shirkadda</h4>
                  <ul className="space-y-3 text-sm text-gray-500">
                     <li><button onClick={() => handleInfo("About Us: We are based in Hargeisa.")} className="hover:text-brand-600">Ku saabsan GuriHub</button></li>
                     <li><button onClick={() => handleInfo("Hiring soon!")} className="hover:text-brand-600">Shaqooyin</button></li>
                     <li><button onClick={() => handleInfo("Latest news on our blog.")} className="hover:text-brand-600">Wararka</button></li>
                     <li><button onClick={() => handleInfo("Contact: support@gurihub.so")} className="hover:text-brand-600">La Xiriir</button></li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-bold text-gray-900 mb-4">Sharciga</h4>
                  <ul className="space-y-3 text-sm text-gray-500">
                     <li><button onClick={() => handleInfo("Privacy Policy")} className="hover:text-brand-600">Privacy Policy</button></li>
                     <li><button onClick={() => handleInfo("Terms of Service")} className="hover:text-brand-600">Terms of Service</button></li>
                     <li><button onClick={() => handleInfo("Cookie Policy")} className="hover:text-brand-600">Cookie Policy</button></li>
                     <li><button onClick={() => handleInfo("Security measures")} className="hover:text-brand-600">Amniga</button></li>
                  </ul>
               </div>
            </div>
            
            <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
               <p className="text-xs text-gray-400">© 2024 GuriHub. Xuquuqda oo dhan way dhowran tahay.</p>
               <div className="flex gap-2 text-xs text-gray-400">
                  <span>Waxaa lagu sameeyay ❤️ Hargeisa</span>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};
