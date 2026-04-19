import { useCallback, useState, useEffect } from 'react';
import { apiClient } from '../utils/apiClient';
import { useAuth } from '../contexts/AuthContext';

export function useLessonSession(lessonId) {
  const { user } = useAuth();
  const [lastIndex, setLastIndex] = useState(0);
  const [hasPrompted, setHasPrompted] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadSession = useCallback(async () => {
    try {
      const settings = await apiClient.getSettings(user.id);
      const sessionKey = `session_${lessonId}`;
      const sessionData = settings.find(s => s.key === sessionKey);
      
      if (sessionData && sessionData.value) {
        setLastIndex(parseInt(sessionData.value, 10));
      }
    } catch (e) {
      console.warn('Failed to load lesson session', e);
    } finally {
      setLoading(false);
    }
  }, [user?.id, lessonId]);

  useEffect(() => {
    if (user && lessonId) {
      loadSession();
    }
  }, [user, lessonId, loadSession]);

  const saveProgress = async (index) => {
    if (!user || !lessonId) return;
    try {
      await apiClient.saveSetting(user.id, `session_${lessonId}`, index.toString());
    } catch (e) {
      console.error('Failed to save progress', e);
    }
  };

  return {
    lastIndex,
    hasPrompted,
    setHasPrompted,
    saveProgress,
    loading
  };
}
