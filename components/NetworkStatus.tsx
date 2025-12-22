
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { offlineService } from '../services/offlineService';

export const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingCount, setPendingCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    const handleQueueUpdate = (e: any) => {
      setPendingCount(e.detail ?? offlineService.getQueueSize());
    };

    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    window.addEventListener('offline-queue-updated', handleQueueUpdate);
    
    setPendingCount(offlineService.getQueueSize());

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
      window.removeEventListener('offline-queue-updated', handleQueueUpdate);
    };
  }, []);

  const triggerSync = () => {
    if (!isOnline || pendingCount === 0 || isSyncing) return;
    
    setIsSyncing(true);
    // App.tsx handles the actual state update via the 'trigger-sync' custom event
    window.dispatchEvent(new CustomEvent('request-sync'));
    
    // UI Feedback delay
    setTimeout(() => {
      setIsSyncing(false);
      if (offlineService.getQueueSize() === 0) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    }, 1500);
  };

  if (isOnline && pendingCount === 0 && !showSuccess) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[100] px-6 py-3 flex items-center justify-between text-sm font-bold shadow-2xl transition-all duration-500 transform ${
      showSuccess ? 'bg-emerald-600 text-white translate-y-0' :
      !isOnline ? 'bg-slate-900 text-slate-300 translate-y-0' : 
      'bg-brand-600 text-white translate-y-0'
    }`}>
      <div className="flex items-center gap-3">
        {showSuccess ? (
          <CheckCircle2 size={18} className="animate-in zoom-in duration-300" />
        ) : !isOnline ? (
          <WifiOff size={18} className="text-red-400 animate-pulse" />
        ) : (
          <Wifi size={18} className="text-white" />
        )}
        
        <span>
          {showSuccess ? 'Xogta si guul leh ayaa loo waafajiyay (Synced)!' :
           !isOnline ? `Waxa aad ku jirtaa Offline. ${pendingCount} isbedel ayaa kuu kaydsan.` : 
           `Internet-ka waa caadi. ${pendingCount} isbedel ayaa sugaya in la diiwaangeliyo.`}
        </span>
      </div>

      {!showSuccess && isOnline && pendingCount > 0 && (
        <button 
          onClick={triggerSync}
          disabled={isSyncing}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 px-4 py-1.5 rounded-full text-xs transition-all active:scale-95"
        >
          <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
          {isSyncing ? 'Syncing...' : 'Sync Now'}
        </button>
      )}
    </div>
  );
};
