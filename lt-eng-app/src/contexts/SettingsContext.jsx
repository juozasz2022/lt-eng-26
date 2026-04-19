import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../utils/apiClient';

const SettingsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const PROFILES = {
  standard: {
    label: 'PC Standartas',
    settings: {
      lt_eng_device_mode: 'pc_standard',
      lt_eng_font_scale: '100%',
      lt_eng_speech_rate: 0.9,
      hintMode: 'auto',
      highContrast: false,
      pauseOnHover: false,
      repeatSegment: false
    }
  },
  visibility: {
    label: 'Didelis Matomumas',
    settings: {
      lt_eng_device_mode: 'pc_large',
      lt_eng_font_scale: '140%',
      lt_eng_speech_rate: 0.7,
      hintMode: 'auto',
      highContrast: true,
      pauseOnHover: true,
      repeatSegment: false
    }
  },
  focus: {
    label: 'Susikaupimo Režimas',
    settings: {
      lt_eng_device_mode: 'pc_standard',
      lt_eng_font_scale: '100%',
      lt_eng_speech_rate: 0.9,
      hintMode: 'manual',
      highContrast: false,
      pauseOnHover: false,
      repeatSegment: true
    }
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState(null);

  // Core Profiles
  const [currentProfile, setCurrentProfile] = useState(() => {
    return localStorage.getItem('lt_eng_profile') || 'standard';
  });

  // Base Settings
  const [deviceMode, setDeviceMode] = useState(() => {
    return localStorage.getItem('lt_eng_device_mode') || 'pc_standard';
  });

  const [fontScale, setFontScale] = useState(() => {
    return localStorage.getItem('lt_eng_font_scale') || '100%';
  });

  const [speechRate, setSpeechRate] = useState(() => {
    return parseFloat(localStorage.getItem('lt_eng_speech_rate')) || 0.9;
  });

  const [hintMode, setHintMode] = useState('auto');
  const [autoHelpThreshold, setAutoHelpThreshold] = useState(3);

  // New Global Behaviors
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('lt_eng_high_contrast') === 'true';
  });

  const [pauseOnHover, setPauseOnHover] = useState(() => {
    return localStorage.getItem('lt_eng_pause_on_hover') === 'true';
  });

  const [repeatSegment, setRepeatSegment] = useState(() => {
    return localStorage.getItem('lt_eng_repeat_segment') === 'true';
  });

  const applyProfile = (profileKey) => {
    const profile = PROFILES[profileKey];
    if (!profile) return;

    setCurrentProfile(profileKey);
    const s = profile.settings;
    
    setDeviceMode(s.lt_eng_device_mode);
    setFontScale(s.lt_eng_font_scale);
    setSpeechRate(s.lt_eng_speech_rate);
    setHintMode(s.hintMode);
    setHighContrast(s.highContrast);
    setPauseOnHover(s.pauseOnHover);
    setRepeatSegment(s.repeatSegment);

    localStorage.setItem('lt_eng_profile', profileKey);
  };

  const isModified = (key, value) => {
    if (currentProfile === 'custom') return false;
    const profile = PROFILES[currentProfile];
    if (!profile) return false;
    const profileVal = profile.settings[key];
    
    // Loose equality for strings/numbers comparison
    return profileVal != value;
  };

  const loadSettingsFromServer = async (userId) => {
    setCurrentUserId(userId);
    try {
      await apiClient.syncUser(userId);
      const serverSettings = await apiClient.getSettings(userId);
      serverSettings.forEach(s => {
        if (s.key === 'lt_eng_profile') setCurrentProfile(s.value);
        if (s.key === 'lt_eng_device_mode') setDeviceMode(s.value);
        if (s.key === 'lt_eng_font_scale') setFontScale(s.value);
        if (s.key === 'lt_eng_speech_rate') setSpeechRate(parseFloat(s.value));
        if (s.key === 'hintMode') setHintMode(s.value);
        if (s.key === 'autoHelpThreshold') setAutoHelpThreshold(parseInt(s.value, 10));
        if (s.key === 'highContrast') setHighContrast(s.value === true || s.value === 'true');
        if (s.key === 'pauseOnHover') setPauseOnHover(s.value === true || s.value === 'true');
        if (s.key === 'repeatSegment') setRepeatSegment(s.value === true || s.value === 'true');
      });
    } catch { /* ignore settings load error */ }
  };

  // Sync Hooks
  useEffect(() => {
    localStorage.setItem('lt_eng_font_scale', fontScale);
    document.documentElement.style.fontSize = fontScale;
    if (currentUserId) apiClient.saveSetting(currentUserId, 'lt_eng_font_scale', fontScale);
  }, [fontScale, currentUserId]);

  useEffect(() => {
    localStorage.setItem('lt_eng_device_mode', deviceMode);
    document.documentElement.setAttribute('data-device', deviceMode);
    if (currentUserId) apiClient.saveSetting(currentUserId, 'lt_eng_device_mode', deviceMode);
  }, [deviceMode, currentUserId]);

  useEffect(() => {
    localStorage.setItem('lt_eng_high_contrast', highContrast.toString());
    document.documentElement.classList.toggle('high-contrast', highContrast);
    if (currentUserId) apiClient.saveSetting(currentUserId, 'highContrast', highContrast.toString());
  }, [highContrast, currentUserId]);

  useEffect(() => {
    localStorage.setItem('lt_eng_speech_rate', speechRate.toString());
    if (currentUserId) apiClient.saveSetting(currentUserId, 'lt_eng_speech_rate', speechRate.toString());
  }, [speechRate, currentUserId]);

  useEffect(() => {
    localStorage.setItem('lt_eng_pause_on_hover', pauseOnHover.toString());
    if (currentUserId) apiClient.saveSetting(currentUserId, 'pauseOnHover', pauseOnHover.toString());
  }, [pauseOnHover, currentUserId]);

  useEffect(() => {
    localStorage.setItem('lt_eng_repeat_segment', repeatSegment.toString());
    if (currentUserId) apiClient.saveSetting(currentUserId, 'repeatSegment', repeatSegment.toString());
  }, [repeatSegment, currentUserId]);

  const value = {
    currentProfile, setCurrentProfile,
    applyProfile, isModified,
    deviceMode, setDeviceMode,
    fontScale, setFontScale,
    speechRate, setSpeechRate,
    hintMode, setHintMode,
    autoHelpThreshold, setAutoHelpThreshold,
    highContrast, setHighContrast,
    pauseOnHover, setPauseOnHover,
    repeatSegment, setRepeatSegment,
    loadSettingsFromServer
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
