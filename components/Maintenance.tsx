
import React, { useState } from 'react';
import { MaintenanceRequest, Priority, Property } from '../types';
import { CheckCircle2, Plus, RefreshCw, MoreVertical } from 'lucide-react';
import { analyzeMaintenancePriority } from '../services/geminiService';

interface MaintenanceProps {
  requests: MaintenanceRequest[];
  setRequests: React.Dispatch<React.SetStateAction<MaintenanceRequest[]>>;
  properties: Property[];
  addActivity: (text: string, type: 'success' | 'warning' | 'error' | 'info') => void;
}

export const Maintenance: React.FC<MaintenanceProps> = ({ requests, setRequests, properties, addActivity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({ 
    title: '', 
    description: '', 
    propertyId: '',
    priority: Priority.Medium 
  });
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!newRequest.description) return;
    setAnalyzing(true);
    const analysis = await analyzeMaintenancePriority(newRequest.description);
    
    setAnalyzing(false);
    setNewRequest(prev => ({ ...prev, priority: analysis.priority as Priority }));
    alert(`Falanqaynta AI:\nDarajada: ${analysis.priority}\nSababta: ${analysis.reasoning}`);
  };

  const handleSubmit = () => {
    if (!newRequest.propertyId) return;

    const selectedProp = properties.find(p => p.id === newRequest.propertyId);

    const request: MaintenanceRequest = {
      id: `R${Date.now()}`,
      title: newRequest.title,
      description: newRequest.description,
      propertyId: newRequest.propertyId,
      propertyName: selectedProp?.name || 'Unknown Property',
      tenantName: 'System User',
      dateReported: new Date().toISOString().split('T')[0],
      priority: newRequest.priority,
      status: 'Open',
      costEstimate: 0
    };

    setRequests([request, ...requests]);
    addActivity(`Cilad cusub diiwaangashan: ${request.title}`, 'warning');
    setIsModalOpen(false);
    setNewRequest({ title: '', description: '', propertyId: '', priority: Priority.Medium });
  };

  const advanceStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Open' ? 'In Progress' : currentStatus === 'In Progress' ? 'Resolved' : 'Open';
    setRequests(requests.map(r => r.id === id ? { ...r, status: nextStatus as any } : r));
    addActivity(`Xaaladda ciladda #${id} ayaa isbedeshay: ${nextStatus}`, 'info');
  };

  const getStatusHeader = (status: string) => {
    switch(status) {
      case 'Open': return 'Furan (Cusub)';
      case 'In Progress': return 'Wuu Socdaa';
      case 'Resolved': return 'La Xalliyay';
      default: return status;
    }
  };

  const inputClasses = "w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Codsiyada Dayactirka</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 flex items-center gap-2">
          <Plus size={18} /> Codsi Cusub
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {(['Open', 'In Progress', 'Resolved'] as const).map((status) => (
          <div key={status} className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl border border-gray-200 dark:border-slate-700 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">{getStatusHeader(status)}</h3>
              <span className="bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded text-xs font-medium">
                {requests.filter(r => r.status === status).length}
              </span>
            </div>
            
            <div className="space-y-3 overflow-y-auto pr-2 flex-1 custom-scrollbar">
              {requests.filter(r => r.status === status).map(req => (
                <div key={req.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">{req.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{req.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold dark:text-white">Diiwaangeli Dayactir</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={labelClasses}>Guriga (Property)</label>
                <select className={inputClasses} value={newRequest.propertyId} onChange={e => setNewRequest({...newRequest, propertyId: e.target.value})}>
                  <option value="">Dooro Guri</option>
                  {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClasses}>Cinwaanka Ciladda</label>
                <input type="text" className={inputClasses} placeholder="Tusaale: Tubo jabtay" value={newRequest.title} onChange={e => setNewRequest({...newRequest, title: e.target.value})} />
              </div>
              <div>
                <label className={labelClasses}>Faahfaahin</label>
                <textarea className={`${inputClasses} h-24`} placeholder="Faahfaahi dhibka jira..." value={newRequest.description} onChange={e => setNewRequest({...newRequest, description: e.target.value})}></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium">Jooji</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium">Diiwaangeli</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
