
import { OfflineAction } from '../types';

const STORAGE_KEY = 'gurihub_offline_queue';

export const offlineService = {
  getQueue: (): OfflineAction[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Error reading offline queue", e);
      return [];
    }
  },

  addToQueue: (action: OfflineAction) => {
    const queue = offlineService.getQueue();
    // Avoid duplicate IDs if any
    if (queue.find(a => a.id === action.id)) return;
    
    queue.push(action);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    // Dispatch custom event to notify components
    window.dispatchEvent(new CustomEvent('offline-queue-updated', { detail: queue.length }));
  },

  clearQueue: () => {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('offline-queue-updated', { detail: 0 }));
  },

  getQueueSize: (): number => {
    return offlineService.getQueue().length;
  },

  /**
   * Processes the queue by executing a handler for each action.
   * Handler should return true if successful.
   */
  processQueue: async (handler: (action: OfflineAction) => Promise<boolean>) => {
    const queue = offlineService.getQueue();
    if (queue.length === 0) return;

    console.log(`[OfflineSync] Processing ${queue.length} actions...`);
    
    const failedActions: OfflineAction[] = [];

    for (const action of queue) {
      try {
        const success = await handler(action);
        if (!success) failedActions.push(action);
      } catch (e) {
        console.error(`[OfflineSync] Failed to process action ${action.id}`, e);
        failedActions.push(action);
      }
    }

    if (failedActions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(failedActions));
      window.dispatchEvent(new CustomEvent('offline-queue-updated', { detail: failedActions.length }));
    } else {
      offlineService.clearQueue();
    }
  }
};
