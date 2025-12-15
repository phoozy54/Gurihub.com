
import React, { useState } from 'react';
import { LegalCase, User, Priority } from '../types';
import { Scale, FileText, Clock, AlertTriangle, Plus, X, Gavel } from 'lucide-react';

interface LawyerPortalProps {
  currentUser: User | null;
  legalCases: LegalCase[];
  setLegalCases: React.Dispatch<React.SetStateAction<LegalCase[]>>;
}

export const LawyerPortal: React.FC<LawyerPortalProps> = ({ currentUser, legalCases, setLegalCases }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCase, setNewCase] = useState<Partial<LegalCase>>({
    title: '',
    type: 'Dispute',
    priority: Priority.Medium,
    description: '',
    partiesInvolved: []
  });
  const [partiesInput, setPartiesInput] = useState('');

  const canEdit = currentUser?.role === 'Lawyer' || currentUser?.role === 'SuperAdmin';

  const handleAddCase = () => {
    if (!newCase.title || !newCase.description) return;

    const parties = partiesInput.split(',').map(p => p.trim()).filter(p => p);

    const legalCase: LegalCase = {
      id: `LC${Date.now()}`,
      title: newCase.title!,
      type: newCase.type || 'Dispute',
      partiesInvolved: parties.length > 0 ? parties : ['Unknown'],
      status: 'Open',
      priority: newCase.priority || Priority.Medium,
      dateCreated: new Date().toISOString().split('T')[0],
      description: newCase.description!
    };

    setLegalCases([legalCase, ...legalCases]);
    setIsModalOpen(false);
    setNewCase({ title: '', type: 'Dispute', priority: Priority.Medium, description: '', partiesInvolved: [] });
    setPartiesInput('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Legal Portal</h1>
           <p className="text-sm text-gray-500">Manage contracts, disputes, and compliance.</p>
        </div>
        {canEdit && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm flex items-center gap-2"
          >
            <Plus size={16} /> New Case
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Summary Cards */}
         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg"><AlertTriangle size={24} /></div>
            <div>
               <p className="text-2xl font-bold text-gray-900">{legalCases.filter(c => c.priority === Priority.High).length}</p>
               <p className="text-sm text-gray-500">High Priority Cases</p>
            </div>
         </div>
         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Scale size={24} /></div>
            <div>
               <p className="text-2xl font-bold text-gray-900">{legalCases.length}</p>
               <p className="text-sm text-gray-500">Total Active Cases</p>
            </div>
         </div>
         <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg"><FileText size={24} /></div>
            <div>
               <p className="text-2xl font-bold text-gray-900">12</p>
               <p className="text-sm text-gray-500">Contracts Drafted (This Month)</p>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Active Cases</h3>
            <div className="flex gap-2">
               <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">Sorted by Date</span>
            </div>
         </div>
         <div className="divide-y divide-gray-100">
            {legalCases.length > 0 ? legalCases.map(lc => (
               <div key={lc.id} className="p-6 hover:bg-gray-50 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                     <div className="flex items-center gap-3">
                        <div className="bg-brand-50 text-brand-600 p-2 rounded-full">
                           <Gavel size={18} />
                        </div>
                        <h4 className="font-bold text-gray-800 text-lg group-hover:text-brand-700 transition-colors">{lc.title}</h4>
                     </div>
                     <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                        lc.priority === Priority.High ? 'bg-red-100 text-red-700' : 
                        lc.priority === Priority.Medium ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                     }`}>{lc.priority}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 ml-11">{lc.description}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500 ml-11">
                     <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                        <Scale size={14} /> {lc.type}
                     </div>
                     <div className="flex items-center gap-1">
                        <Clock size={14} /> {lc.dateCreated}
                     </div>
                     <div>
                        Parties: <span className="font-medium text-gray-800">{lc.partiesInvolved.join(', ')}</span>
                     </div>
                  </div>
               </div>
            )) : (
               <div className="p-10 text-center text-gray-500">
                  No active legal cases found.
               </div>
            )}
         </div>
      </div>

      {/* New Case Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold text-gray-800">Open New Legal Case</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Case Title</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="e.g. Lease Dispute Unit 4B"
                  value={newCase.title}
                  onChange={e => setNewCase({...newCase, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                       className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                       value={newCase.type}
                       onChange={e => setNewCase({...newCase, type: e.target.value})}
                    >
                       <option value="Dispute">Dispute</option>
                       <option value="Eviction">Eviction</option>
                       <option value="Contract Review">Contract Review</option>
                       <option value="Compliance">Compliance</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                       className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                       value={newCase.priority}
                       onChange={e => setNewCase({...newCase, priority: e.target.value as Priority})}
                    >
                       <option value={Priority.Low}>Low</option>
                       <option value={Priority.Medium}>Medium</option>
                       <option value={Priority.High}>High</option>
                    </select>
                 </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parties Involved (Comma separated)</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="e.g. Landlord, Tenant Name"
                  value={partiesInput}
                  onChange={e => setPartiesInput(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm h-24 focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                  placeholder="Details of the legal matter..."
                  value={newCase.description}
                  onChange={e => setNewCase({...newCase, description: e.target.value})}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">Cancel</button>
              <button 
                onClick={handleAddCase}
                disabled={!newCase.title || !newCase.description}
                className="px-6 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm disabled:opacity-50"
              >
                Create Case
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
