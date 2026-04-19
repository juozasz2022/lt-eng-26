const API_BASE = '/api';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function getLocalUserId() {
  let uid = localStorage.getItem('lt_eng_guest_uid');
  if (!uid) {
    uid = 'guest_' + uuidv4();
    localStorage.setItem('lt_eng_guest_uid', uid);
  }
  return uid;
}

export const apiClient = {
  async syncUser(uid, displayName = "Svečias") {
    try {
      const res = await fetch(`${API_BASE}/users/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, displayName }),
      });
      if (!res.ok) throw new Error('Failed to sync user');
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  async fetchMaterials() {
    try {
      const res = await fetch(`${API_BASE}/material`);
      if (!res.ok) throw new Error('Failed to fetch materials');
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  async getUserHistory(userId) {
    try {
      const res = await fetch(`${API_BASE}/history/${userId}`);
      if (!res.ok) throw new Error('Failed to get history');
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  async saveHistoryItem({ userId, actionType, entityId, successRate = null, notes = null }) {
    try {
      const res = await fetch(`${API_BASE}/history`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, actionType, entityId, successRate, notes }),
      });
      if (!res.ok) throw new Error('Failed to save history');
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  async getSettings(userId) {
    try {
      const url = userId ? `${API_BASE}/settings?userId=${encodeURIComponent(userId)}` : `${API_BASE}/settings`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to get settings');
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  async saveSetting(userId, key, value) {
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, key, value }),
      });
      if (!res.ok) throw new Error('Failed to save setting');
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  async getVocabulary() {
    try {
      const res = await fetch(`${API_BASE}/vocabulary`);
      if (!res.ok) throw new Error('Failed to get vocabulary');
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  async getLessonImages(lessonId) {
    try {
      const res = await fetch(`${API_BASE}/lesson-images/${encodeURIComponent(lessonId)}`);
      if (!res.ok) throw new Error('Failed to get lesson images');
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  
  async getVocabStats(userId) {
    try {
      const res = await fetch(`${API_BASE}/vocabulary/stats/${encodeURIComponent(userId)}`);
      if (!res.ok) throw new Error('Failed to get vocab stats');
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  async updateVocabStatus(userId, vocabId, status) {
    try {
      const res = await fetch(`${API_BASE}/vocabulary/stats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, vocabId, status }),
      });
      if (!res.ok) throw new Error('Failed to update vocab status');
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};
