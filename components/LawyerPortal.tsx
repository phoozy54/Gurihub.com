import React, { useState } from 'react';
import { LegalCase, User, Priority, NotarySession } from '../types';
import { 
  Scale, FileText, Plus, X, Video, ShieldCheck, Fingerprint, FileSignature, 
  Check, Download, Calendar, Search, Sparkles, BrainCircuit, FileWarning, 
  Users, Briefcase, ArrowRight, Info, Mic, Camera, VideoOff
} from 'lucide-react';
// Fix: Corrected import to use analyzeContract from legalService as aiService does not export analyzeLegalDoc
import { analyzeContract } from '../services/legalService';

interface LawyerPortalProps {
  currentUser: User | null;
  legalCases: LegalCase[];
  setLegalCases: React.Dispatch<React.SetStateAction<LegalCase[]>>;
}

export const LawyerPortal: React.FC<LawyerPortalProps> = ({ legalCases, setLegalCases }) => {
  const [activeTab, setActiveTab] = useState<'cases' | 'notary' | 'compliance'>('cases');
  const [isVetting, setIsVetting] = useState(false);
  const [vettingResult, setVettingResult] = useState<any>(null);
  const [contractText, setContractText] = useState('');

  const handleVet = async () => {
    if (!contractText) return;
    setIsVetting(true);
    // Fix: Updated the call to use analyzeContract which returns the expected contract analysis structure
    const res = await analyzeContract(contractText);
    setVettingResult(res);
    setIsVetting(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Waaxda Sharciga</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Maamulka dacwadaha iyo xaqiijinta heshiisyada (AI Powered).</p>
        </div>
        <div className="flex p-1.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
          {['cases', 'notary', 'compliance'].map((t) => (
            <button 
              key={t}
              onClick={() => setActiveTab(t as any)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === t ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Content Rendering */}
      {activeTab === 'compliance' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-[10px] font-black uppercase">
                <Sparkles size={14} /> AI Contract Vetting
              </div>
              <h2 className="text-4xl font-black leading-tight">Falanqaynta Heshiisyada</h2>
              <textarea 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-3xl p-6 text-sm outline-none focus:ring-2 focus:ring-brand-500 h-64"
                placeholder="Ku shub halkan qoraalka heshiiska..."
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
              />
              <button 
                onClick={handleVet}
                disabled={isVetting || !contractText}
                className="bg-brand-600 px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-brand-700 transition-all flex items-center gap-3 disabled:opacity-50"
              >
                {isVetting ? "Waa la falanqaynayaa..." : <BrainCircuit size={20} />}
                {isVetting ? "" : "Bilow Falanqaynta"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
             <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-700 h-full">
                {vettingResult ? (
                  <div className="space-y-6">
                    <div className="text-center">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Compliance Score</p>
                       <div className="text-5xl font-black text-brand-600">{vettingResult.complianceScore}%</div>
                    </div>
                    <div className="space-y-3">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Risks Found</p>
                       {vettingResult.risks.map((r: string, i: number) => (
                         <div key={i} className="p-3 bg-rose-50 dark:bg-rose-900/10 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-xl border border-rose-100 dark:border-rose-900/30 flex gap-2">
                            <FileWarning size={14} className="shrink-0" /> {r}
                         </div>
                       ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300">
                    <FileText size={64} strokeWidth={1} />
                    <p className="text-xs font-black uppercase mt-4">Sugaya Xogta...</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      )}

      {/* Case Management (Standard View) */}
      {activeTab === 'cases' && (
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center">
            <h3 className="text-xl font-black dark:text-white">Kiisaska Dacwadaha</h3>
            <button className="bg-brand-600 text-white px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest">
               <Plus size={16} className="inline mr-1" /> Kiis Cusub
            </button>
          </div>
          <div className="divide-y divide-slate-50 dark:divide-slate-700">
             {legalCases.length === 0 ? (
               <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest">Ma jiraan kiisas diiwaangashan</div>
             ) : (
               legalCases.map(lc => (
                 <div key={lc.id} className="p-8 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all">
                    <div className="flex justify-between items-start">
                       <div className="flex gap-4">
                          <div className="p-4 bg-brand-50 dark:bg-brand-900/20 text-brand-600 rounded-2xl"><Scale /></div>
                          <div>
                             <h4 className="text-lg font-black dark:text-white">{lc.title}</h4>
                             <p className="text-xs text-slate-400 font-bold mt-1 uppercase">{lc.type} • {lc.dateCreated}</p>
                          </div>
                       </div>
                       <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-[9px] font-black uppercase tracking-widest dark:text-white">{lc.priority}</span>
                    </div>
                 </div>
               ))
             )}
          </div>
        </div>
      )}
    </div>
  );
};