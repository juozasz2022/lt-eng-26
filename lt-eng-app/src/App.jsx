import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import LessonView from './components/LessonView';
import MatrixSimulator from './components/MatrixSimulator';
import VocabularyView from './components/VocabularyView';
import SettingsModal from './components/SettingsModal';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { lessonsContent } from './data/lessonsContent';
import LoginOverlay from './components/LoginOverlay';
import StudioView from './components/StudioView';
import { languageConfig } from './config/languageConfig';

function AppContent() {
  const [view, setView] = useState('dashboard');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const { loadSettingsFromServer, fontScale } = useSettings();
  const { user, trackEvent, loading, hasRole, logout } = useAuth();
  const [dbLessons, setDbLessons] = useState([]);

  const fetchLessons = async () => {
    try {
      const resp = await fetch('http://localhost:5001/api/material');
      const data = await resp.json();
      // EducationalMaterial format has title/contentPayload. 
      // We map it to the legacy format Dashboard expects
      const mapped = data.map(m => ({
        id: m.id,
        title: m.title,
        ...m.contentPayload
      }));
      setDbLessons(mapped);
    } catch (err) {
      console.error('Failed to fetch lessons:', err);
      // Fallback to static if API fails (optional)
      setDbLessons(lessonsContent);
    }
  };

  useEffect(() => {
    if (user) {
      loadSettingsFromServer(user.id);
      trackEvent('VIEW', 'DASHBOARD');
      fetchLessons();
    }
  }, [user]);

  useEffect(() => {
    const isVeryBig = fontScale === '140%' || fontScale === '160%';
    document.documentElement.setAttribute('data-hide-secondary', isVeryBig.toString());
  }, [fontScale]);


  const handleSelectLesson = (lesson) => {
    trackEvent('VIEW', `LESSON_${lesson.id}`);
    setSelectedLesson(lesson);
    setView('lesson');
  };

  const handleSelectMatrix = () => {
    trackEvent('VIEW', 'MATRIX');
    setView('matrix');
  };

  const handleSelectVocabulary = () => {
    trackEvent('VIEW', 'VOCABULARY');
    setView('vocabulary');
  };

  if (loading) return null;
  if (!user) return <LoginOverlay />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mini Nav / Header */}
      <nav className="bg-white border-b border-gray-100 p-4 sticky top-0 z-[60] shadow-sm">
        <div className="max-app-container flex justify-between items-center">
          <div 
            className="font-black text-2xl tracking-tighter cursor-pointer flex items-center gap-2"
            onClick={() => setView('dashboard')}
          >
            <span className="text-eng-red font-black text-2xl tracking-tighter italic">Lt-{languageConfig.targetLang.split('-')[0]}</span>
          </div>
          <div className="flex gap-4 md:gap-8 font-black text-xs md:text-sm text-slate-400 uppercase tracking-widest items-center">
            <button onClick={() => setView('dashboard')} className={`hover:text-eng-blue transition-colors cursor-pointer ${view === 'dashboard' ? 'text-eng-blue' : ''}`}>{languageConfig.ui.home || 'Pagrindinis'}</button>
            <button onClick={handleSelectVocabulary} className={`hover:text-eng-blue transition-colors cursor-pointer ${view === 'vocabulary' ? 'text-eng-blue' : ''}`}>{languageConfig.ui.vocabulary || 'Žodynas'}</button>
            {hasRole('CREATOR') && (
              <button 
                onClick={() => setView('studio')}
                className={`px-4 py-1.5 border-2 border-slate-200 rounded-lg transition-all cursor-pointer ${view === 'studio' ? 'bg-slate-900 text-white border-slate-900' : 'hover:border-slate-400'}`}
              >
                {languageConfig.ui.studio}
              </button>
            )}
            <button 
              onClick={() => setShowSettings(true)}
              className="p-2.5 text-slate-400 hover:text-eng-blue transition-all cursor-pointer hover:bg-slate-50 rounded-full"
              title={languageConfig.ui.settings}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </button>
            <button 
              onClick={() => logout()}
              className="p-2.5 text-slate-400 hover:text-eng-red transition-all cursor-pointer hover:bg-red-50 rounded-full"
              title={languageConfig.ui.logout || 'Atsijungti'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 py-8">
        {view === 'dashboard' && (
          <Dashboard 
            lessons={dbLessons.length > 0 ? dbLessons : lessonsContent} 
            onSelectLesson={handleSelectLesson}
            onSelectMatrix={handleSelectMatrix}
          />
        )}

        {view === 'studio' && (
          <StudioView onBack={() => { setView('dashboard'); fetchLessons(); }} />
        )}

        {view === 'lesson' && selectedLesson && (
          <LessonView 
            lesson={selectedLesson} 
            onBack={() => setView('dashboard')} 
          />
        )}

        {view === 'matrix' && (
          <MatrixSimulator onComplete={() => setView('dashboard')} />
        )}

        {view === 'vocabulary' && (
          <VocabularyView onBack={() => setView('dashboard')} />
        )}
      </main>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
