/**
 * RythuThodu Future Offline PWA & Sync Architecture
 * 
 * Target Features:
 * 1. Service Worker caching of UI assets & local disease database
 * 2. IndexedDB local storage for offline diagnoses & produce listings
 * 3. Background Sync API to automatically flush pending queue when internet returns
 * 4. Image compression prior to network transfer for low-bandwidth 2G/3G networks
 */

export const offlineService = {
  isOnline() {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  },

  registerNetworkListeners(onOnline, onOffline) {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', onOnline);
      window.addEventListener('offline', onOffline);
    }
  },

  async queueOfflineDiagnosis(diagnosisData) {
    const queue = JSON.parse(localStorage.getItem('agri_offline_queue') || '[]');
    queue.push({
      ...diagnosisData,
      queuedAt: new Date().toISOString()
    });
    localStorage.setItem('agri_offline_queue', JSON.stringify(queue));
    return { queued: true, pendingCount: queue.length };
  },

  getPendingQueueLength() {
    const queue = JSON.parse(localStorage.getItem('agri_offline_queue') || '[]');
    return queue.length;
  }
};
