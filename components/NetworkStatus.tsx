
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { offlineService } from '../services/offlineService';

export const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    const updatePendingCount = () => {
      setPendingCount(offlineService.getQueueSize());
    };

    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    
    // Initial check
    updatePendingCount();

    // Poll for queue size changes
    const interval = setInterval(updatePendingCount, 1000);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
      clearInterval(interval);
    };
  }, []);

  const handleSync = () => {
    window.dispatchEvent(new Event('online')); // Trigger sync in App.tsx
  };

  if (isOnline && pendingCount === 0) return null;

  return (
    <div className={`w-full px-4 py-2 flex items-center justify-between text-sm font-medium transition-colors ${
      isOnline ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
    }`}>
      <div className="flex items-center gap-2">
        {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
        <span>
          {isOnline 
            ? `Back online. ${pendingCount} pending actions.` 
            : 'You are offline. Changes will be saved locally.'}
        </span>
      </div>
      {pendingCount > 0 && isOnline && (
        <button 
          onClick={handleSync}
          className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-xs transition-colors"
        >
          <RefreshCw size={12} /> Sync Now
        </button>
      )}
    </div>
  );
};
