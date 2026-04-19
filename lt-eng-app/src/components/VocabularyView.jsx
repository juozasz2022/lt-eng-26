import React, { useState, useEffect } from 'react';
import { speechService } from '../utils/speechUtils';
import { recognitionService } from '../utils/recognitionUtils';
import { audioRecorder } from '../utils/audioRecorderUtils';
import { audioFeedbackService } from '../utils/audioFeedbackService';
import { useSettings } from '../contexts/SettingsContext';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../utils/apiClient';
import VocabularyTheater from './VocabularyTheater';
import { languageConfig } from '../config/languageConfig';

export default function VocabularyView({ onBack }) {
  const { speechRate } = useSettings();
  const { user, hasRole, trackEvent } = useAuth();
  const [vocabulary, setVocabulary] = useState([]);
  const [activeRecording, setActiveRecording] = useState(null);
  const [successWord, setSuccessWord] = useState(null);
  const [successScore, setSuccessScore] = useState(0);
  const [filterType, setFilterType] = useState('Pamokomis'); // 'Pamokomis', 'Alfabetas', 'Kalbos dalys'
  const [userStats, setUserStats] = useState({});
  const [micReady, setMicReady] = useState(false);
  const [showTheater, setShowTheater] = useState(false);

  const userId = user?.id;

  useEffect(() => {
    const startTime = Date.now();
    trackEvent('ENTER_VIEW', 'VOCABULARY');

    const loadData = async () => {
      try {
        // Pre-warm hardware
        await recognitionService.checkHardwarePermission();
        setMicReady(true);

        const vocab = await (await fetch('http://localhost:5001/api/vocabulary')).json();
        setVocabulary(vocab);
        
        const stats = await apiClient.getVocabStats(userId);
        const statsMap = {};
        stats.forEach(s => {
          statsMap[s.vocabId] = s.status;
        });
        setUserStats(statsMap);
      } catch (err) {
        console.warn('Silent permission check or load failed', err);
      }
    };
    loadData();

    return () => {
      const duration = Date.now() - startTime;
      trackEvent('EXIT_VIEW', 'VOCABULARY', { duration });
    };
  }, [userId, trackEvent]);

  const handleSpeak = (text) => {
    speechService.speak(text, { rate: speechRate });
  };

  const handleStartRecording = async (targetText, id) => {
    try {
      if (!micReady) {
        await recognitionService.checkHardwarePermission();
        setMicReady(true);
      }
      
      speechService.stop();
      recognitionService.stop();
      
      setActiveRecording(id);
      
      // Visual feedback that we are ready
      await audioRecorder.start();

      const dynamicTimeout = Math.max(3000, 2000 + (targetText.length * 100));
      const transcript = await recognitionService.listen(dynamicTimeout, { continuous: false });
      
      const result = recognitionService.compare(transcript, targetText, 0.5);
      const score = Math.round(result.score * 100);
      setSuccessScore(score);
      setSuccessWord(targetText);
      
      if (score >= 70) {
        audioFeedbackService.playSuccess();
        if (score >= 80) {
           await apiClient.updateVocabStatus(userId, targetText, 'learned');
           setUserStats(prev => ({ ...prev, [targetText]: 'learned' }));
        }
      } else {
        audioFeedbackService.playFailure();
        
        // AUTO-GUIDANCE: If failed more than once, or score is very low, play native audio to help
        if (score < 50) {
          setTimeout(() => handleSpeak(targetText), 1500);
        }
      }
      setTimeout(() => setSuccessWord(null), 4000);

    } catch (err) {
      console.warn("🎤 Recognition issue:", err);
      setSuccessScore(0);
      setSuccessWord(targetText);
      audioFeedbackService.playFailure();
      setTimeout(() => setSuccessWord(null), 4000);
    } finally {
      await new Promise(r => setTimeout(r, 400));
      await audioRecorder.stop();
      setActiveRecording(null);

      // Manual check playback
      try {
        if (activeRecording) {
            await audioRecorder.play();
            await new Promise(r => setTimeout(r, 800));
        }
      } catch {
        // Fallback
      }
    } 
  };

  // Rendering logic based on filters
  const renderContent = () => {
    if (filterType === 'Alfabetas') {
      const sorted = [...vocabulary].sort((a, b) => a.word.localeCompare(b.word));
      return (
        <div className="grid adaptive-grid gap-6 animate-fade-in">
          {sorted.map((item, i) => <VocabCard key={i} item={item} />)}
        </div>
      );
    }

    if (filterType === 'Kalbos dalys') {
      const types = [...new Set(vocabulary.map(v => v.type))];
      return (
        <div className="space-y-16 animate-fade-in">
          {types.map(type => (
            <div key={type}>
              <h2 className="text-2xl font-black text-eng-blue mb-6 flex items-center gap-4 uppercase tracking-widest">
                <span className="bg-eng-red text-white w-2 h-10 rounded-full"></span>
                {type.charAt(0).toUpperCase() + type.slice(1)}s
                <span className="flex-1 h-1 bg-slate-100 rounded-full"></span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vocabulary.filter(v => v.type === type).map((item, i) => <VocabCard key={i} item={item} />)}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Default: Pamokomis
    const lessons = [...new Set(vocabulary.map(v => v.lesson))].sort((a, b) => a - b);
    return (
      <div className="space-y-16 animate-fade-in">
        {lessons.map(lNum => (
          <div key={lNum}>
            <h2 className="text-2xl font-black text-eng-blue mb-6 flex items-center gap-4 uppercase tracking-widest">
              <span className="bg-eng-blue text-white w-10 h-10 flex items-center justify-center rounded-xl text-sm">L{lNum}</span>
              Lesson Content
              <span className="flex-1 h-1 bg-slate-100 rounded-full"></span>
            </h2>
            <div className="grid adaptive-grid gap-6">
              {vocabulary.filter(v => v.lesson === lNum).map((item, i) => <VocabCard key={i} item={item} />)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Helper Card Component
  const VocabCard = ({ item }) => {
    const isLearned = userStats[item.word] === 'learned';
    return (
      <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-sm flex flex-col justify-between group hover:border-eng-blue hover:bg-slate-900 transition-all duration-300 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-3xl -z-10 transition-colors ${isLearned ? 'bg-green-100 group-hover:bg-green-600/30' : 'bg-slate-50 group-hover:bg-eng-blue/20'}`}></div>
        
        <div className="mb-6">
          <div className="flex justify-between items-start mb-1">
            <p className="text-2xl font-black text-slate-900 group-hover:text-white group-hover:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-all italic">
              {item.word}
            </p>
            {isLearned && <span className="text-[10px] font-black bg-green-500 text-white px-2 py-1 rounded-full animate-pulse shadow-lg">IŠMOKTA</span>}
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-2 py-0.5 bg-slate-50 rounded group-hover:bg-eng-blue group-hover:text-white transition-colors">{item.type}</span>
            <p className="text-lg text-slate-400 font-medium italic group-hover:text-blue-100 transition-colors">
              {item.translation}
            </p>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-2">
          {hasRole('EDITOR') && (
            <button 
              className="p-3 bg-amber-100 text-amber-600 rounded-full hover:bg-amber-600 hover:text-white transition-all cursor-pointer shadow-sm"
              title="Edit Word (Editor only)"
              onClick={() => trackEvent('CLICK', 'VOCAB_EDIT', { word: item.word })}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </button>
          )}
          <button 
            onClick={() => {
              handleSpeak(item.word);
              trackEvent('CLICK', 'VOCAB_SPEAK', { word: item.word });
            }}
            className="p-3 bg-slate-100 text-slate-400 rounded-full hover:bg-white hover:text-eng-blue transition-all cursor-pointer shadow-sm hover:scale-110 active:scale-95"
            title="Listen Pronunciation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
          </button>
          <button 
            onClick={() => {
              handleStartRecording(item.word, `vocab-${item.word}`);
              trackEvent('CLICK', 'VOCAB_RECORD', { word: item.word });
            }}
            className={`p-3 rounded-full shadow-sm transition-all cursor-pointer hover:scale-110 active:scale-95 border-2 ${activeRecording === `vocab-${item.word}` ? 'bg-eng-red text-white border-eng-red animate-pulse' : 'bg-white border-slate-100 text-slate-300 hover:border-eng-red hover:text-eng-red'} ${!micReady && 'opacity-50 grayscale cursor-wait'}`}
            title={micReady ? languageConfig.vocabulary?.verifyPronunciation || "Verify Your Pronunciation" : languageConfig.vocabulary?.initializing || "Initializing Hardware..."}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
            {!micReady && <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white"></div>}
            {micReady && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {showTheater && (
        <VocabularyTheater 
          userStats={userStats}
          onFinish={() => setShowTheater(false)}
        />
      )}
      <div className="max-app-container py-8 animate-fade-in mb-12">
      {/* Success Result Bubble */}
      {successWord && (
        <div className={`fixed top-[15vh] left-1/2 -translate-x-1/2 text-white text-lg px-12 py-6 rounded-3xl animate-success-pop font-black border-4 border-white shadow-[0_30px_80px_rgba(0,0,0,0.5)] z-[999] whitespace-nowrap flex items-center gap-6 ${
          successScore >= 70 ? 'bg-gradient-to-r from-green-600 to-green-800' : 
          'bg-gradient-to-r from-eng-red to-orange-700'
        }`}>
          <span className="text-4xl">{successScore >= 70 ? '🎯' : '🔊'}</span>
          <div className="flex flex-col">
            <span className="text-[10px] opacity-80 leading-none mb-1 tracking-widest uppercase">Įvertinimas</span>
            <span className="tracking-tight text-2xl uppercase">
              {successScore >= 70 ? 'Excellent!' : 'Listen and Repeat'} 
              <span className="ml-2 bg-black/20 px-3 py-1 rounded-full text-sm">{successScore}%</span>
            </span>
            {successScore < 70 && <span className="text-[10px] text-amber-200 mt-1 uppercase italic">{languageConfig.vocabulary.listenToCorrect}</span>}
          </div>
        </div>
      )}

      <button 
        onClick={onBack}
        className="mb-8 text-slate-400 hover:text-eng-blue font-black flex items-center gap-2 cursor-pointer transition-colors uppercase tracking-widest text-xs"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
        {languageConfig.ui.backToDashboard}
      </button>

      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-8 border-eng-blue pb-6 gap-6">
        <div className="w-full md:w-auto">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter italic leading-none mb-4">{languageConfig.vocabulary.title}</h1>
          <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-2">
            {['Pamokomis', 'Alfabetas', 'Kalbos dalys'].map(type => (
              <button 
                key={type} 
                onClick={() => setFilterType(type)}
                className={`text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full border-2 transition-all whitespace-nowrap cursor-pointer ${
                  filterType === type ? 'bg-eng-blue text-white border-eng-blue shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end">
        <div className="flex flex-col items-end">
          <span className="text-eng-red font-black text-xl leading-none">{vocabulary.length} WORDS</span>
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-1">User ID: {userId.substring(0, 15)}...</span>
          <span className="text-[10px] text-eng-blue font-black uppercase tracking-tighter mt-1">{user?.roles}</span>
          
          <button 
            onClick={() => setShowTheater(true)}
            className="mt-4 flex items-center gap-3 px-8 py-3 bg-slate-900 border-2 border-blue-500/30 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:border-blue-400 transition-all shadow-xl group"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path></svg>
            </div>
            {languageConfig.vocabulary?.startTheater || 'PALEISTI TEATRĄ'}
          </button>
        </div>
        </div>
      </div>

      {renderContent()}
    </div>
    </>
  );
}
