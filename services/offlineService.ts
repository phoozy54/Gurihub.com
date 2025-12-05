
import { OfflineAction } from '../types';

const STORAGE_KEY = 'rentalpro_offline_queue';

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
    queue.push(action);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  },

  clearQueue: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  getQueueSize: (): number => {
    return offlineService.getQueue().length;
  },

  processQueue: async (callback: (action: OfflineAction) => void) => {
    const queue = offlineService.getQueue();
    if (queue.length === 0) return;

    console.log(`Processing ${queue.length} offline actions...`);
    
    // Process items
    for (const action of queue) {
      try {
        await callback(action);
      } catch (e) {
        console.error("Failed to process action", action, e);
      }
    }

    // Clear queue after processing
    offlineService.clearQueue();
  }
};
