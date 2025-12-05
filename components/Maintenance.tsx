
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
    // Update state with AI suggestion
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
      tenantName: 'System User', // In a real app, this would be selected or inferred
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

  // Status translation helper
  const getStatusHeader = (status: string) => {
    switch(status) {
      case 'Open': return 'Furan (Cusub)';
      case 'In Progress': return 'Wuu Socdaa';
      case 'Resolved': return 'La Xalliyay';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Codsiyada Dayactirka</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus size={18} /> Codsi Cusub
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Columns */}
        {(['Open', 'In Progress', 'Resolved'] as const).map((status) => (
          <div key={status} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-700">{getStatusHeader(status)}</h3>
              <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">
                {requests.filter(r => r.status === status).length}
              </span>
            </div>
            
            <div className="space-y-3 overflow-y-auto pr-2 flex-1 custom-scrollbar">
              {requests.filter(r => r.status === status).map(req => (
                <div key={req.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                      req.priority === Priority.Critical ? 'bg-red-100 text-red-700' :
                      req.priority === Priority.High ? 'bg-orange-100 text-orange-700' :
                      req.priority === Priority.Medium ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {req.priority}
                    </span>
                    <button onClick={() => advanceStatus(req.id, req.status)} className="text-gray-400 hover:text-brand-600 p-1">
                       <MoreVertical size={14} />
                    </button>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{req.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{req.description}</p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-xs text-gray-500">
                    <span>{req.tenantName}</span>
                    <span className="font-mono bg-gray-100 px-1 rounded">{req.propertyName}</span>
                  </div>
                  {status !== 'Resolved' && (
                    <button 
                      onClick={() => advanceStatus(req.id, req.status)}
                      className="w-full mt-3 py-1.5 text-xs font-medium text-brand-600 bg-brand-50 rounded hover:bg-brand-100 transition-colors"
                    >
                      {status === 'Open' ? 'Bilow Shaqada' : 'Dhamaystir'}
                    </button>
                  )}
                </div>
              ))}
              {requests.filter(r => r.status === status).length === 0 && (
                <div className="text-center py-8 text-gray-400 text-xs italic">
                  Ma jiraan codsiyo
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold">Diiwaangeli Dayactir</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guriga (Property)</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  value={newRequest.propertyId}
                  onChange={e => setNewRequest({...newRequest, propertyId: e.target.value})}
                >
                  <option value="">Dooro Guri</option>
                  {properties.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cinwaanka Ciladda</label>
                <input 
                  type="text" 
                  placeholder="Tusaale: Tubo jabtay"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  value={newRequest.title}
                  onChange={e => setNewRequest({...newRequest, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Faahfaahin</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm h-24 focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="Faahfaahi dhibka jira..."
                  value={newRequest.description}
                  onChange={e => setNewRequest({...newRequest, description: e.target.value})}
                ></textarea>
                <button 
                  onClick={handleAnalyze}
                  disabled={analyzing || !newRequest.description}
                  className="mt-2 text-xs text-brand-600 flex items-center gap-1 hover:text-brand-700 disabled:opacity-50 bg-brand-50 px-2 py-1 rounded border border-brand-100"
                >
                   {analyzing ? <RefreshCw className="animate-spin h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                   Weydii AI inay qiimayso mudnaanta
                </button>
              </div>
              
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Mudnaanta (Priority)</label>
                 <select 
                   className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                   value={newRequest.priority}
                   onChange={e => setNewRequest({...newRequest, priority: e.target.value as Priority})}
                 >
                   <option value={Priority.Low}>Low</option>
                   <option value={Priority.Medium}>Medium</option>
                   <option value={Priority.High}>High</option>
                   <option value={Priority.Critical}>Critical</option>
                 </select>
              </div>

            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">Jooji</button>
              <button 
                onClick={handleSubmit}
                disabled={!newRequest.propertyId || !newRequest.title}
                className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm disabled:opacity-50"
              >
                Diiwaangeli
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
