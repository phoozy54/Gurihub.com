import React from 'react';
import { Suggestion } from '../types';
import { Lightbulb, TrendingUp, AlertTriangle, Users, ArrowRight, Check, X, Sparkles } from 'lucide-react';

interface SuggestionsProps {
  suggestions: Suggestion[];
  onDismiss: (id: string) => void;
  onApply: (id: string) => void;
}

export const Suggestions: React.FC<SuggestionsProps> = ({ suggestions, onDismiss, onApply }) => {
  
  const getIcon = (type: Suggestion['type']) => {
    switch(type) {
      case 'Financial': return <TrendingUp className="text-green-600" size={24} />;
      case 'Maintenance': return <AlertTriangle className="text-orange-600" size={24} />;
      case 'Tenant': return <Users className="text-blue-600" size={24} />;
      default: return <Lightbulb className="text-brand-600" size={24} />;
    }
  };

  const getImpactColor = (impact: Suggestion['impact']) => {
    switch(impact) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Talooyinka AI (Smart Suggestions)</h1>
           <p className="text-sm text-gray-500 mt-1">Nidaamku wuxuu falanqeeyay xogtaada wuxuuna soo jeedinayaa talaabooyinkan.</p>
        </div>
        <div className="bg-brand-50 px-4 py-2 rounded-lg text-brand-700 text-sm font-medium border border-brand-100">
           {suggestions.length} Talooyin firfircoon
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-6 relative overflow-hidden group">
            {/* Top accent line */}
            <div className={`absolute top-0 left-0 w-full h-1 ${
               suggestion.type === 'Financial' ? 'bg-green-500' : 
               suggestion.type === 'Maintenance' ? 'bg-orange-500' : 'bg-blue-500'
            }`}></div>

            <div className="flex justify-between items-start mb-4">
               <div className={`p-3 rounded-xl bg-gray-50 group-hover:bg-white border border-transparent group-hover:border-gray-200 transition-colors shadow-sm`}>
                 {getIcon(suggestion.type)}
               </div>
               <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${getImpactColor(suggestion.impact)}`}>
                 {suggestion.impact} Impact
               </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">{suggestion.title}</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              {suggestion.description}
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
               <button 
                 onClick={() => onApply(suggestion.id)}
                 className="flex-1 bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors shadow-sm flex items-center justify-center gap-2"
               >
                 <Check size={16} /> {suggestion.actionLabel}
               </button>
               <button 
                 onClick={() => onDismiss(suggestion.id)}
                 className="px-3 py-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                 title="Dismiss"
               >
                 <X size={20} />
               </button>
            </div>
          </div>
        ))}
        
        {suggestions.length === 0 && (
          <div className="col-span-full py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
             <Lightbulb className="mx-auto h-12 w-12 text-gray-300 mb-3" />
             <h3 className="text-lg font-medium text-gray-900">Dhamaan waa hagaag!</h3>
             <p className="text-gray-500">Ma jiraan talooyin cusub xilligan. Nidaamkaaga sifiican ayuu u shaqaynayaa.</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
           <h3 className="text-xl font-bold flex items-center gap-2">
             <Sparkles className="text-yellow-400" />
             Sida Talooyinku u shaqeeyaan
           </h3>
           <p className="text-slate-300 max-w-xl text-sm leading-relaxed">
             LandPro AI waxay si joogto ah u falanqaysaa xogta suuqa Hargeysa, heerka buuxidda guryahaaga, iyo kharashaadka dayactirka si ay kuu siiso talooyin wax-ku-ool ah oo lagu kordhinayo faa'iidada.
           </p>
        </div>
        <button className="whitespace-nowrap bg-white text-slate-900 px-6 py-3 rounded-lg font-bold text-sm hover:bg-brand-50 transition-colors shadow-lg">
           Habee Warbixinta AI
        </button>
      </div>
    </div>
  );
};