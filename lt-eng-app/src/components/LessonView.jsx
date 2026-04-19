import React, { useState, useEffect } from 'react';
import { speechService } from '../utils/speechUtils';
import { recognitionService } from '../utils/recognitionUtils';
import { audioRecorder } from '../utils/audioRecorderUtils';
import { audioFeedbackService } from '../utils/audioFeedbackService';
import { useSettings } from '../contexts/SettingsContext';
import { useAuth } from '../contexts/AuthContext';
import { apiClient, getLocalUserId } from '../utils/apiClient';
import SyntheticClassroom from './SyntheticClassroom';
import AssessmentModule from './AssessmentModule';
import { PDFDownloadLink } from '@react-pdf/renderer';
import LessonPDF from './LessonPDF';
import { languageConfig } from '../config/languageConfig';
import { useLessonSession } from '../hooks/useLessonSession';

const TABS = ['theory', 'dialogue', 'story', 'assessment'];

export default function LessonView({ lesson, onBack }) {
  const { user, trackEvent } = useAuth();
  const { speechRate, pauseOnHover, repeatSegment } = useSettings();
  
  const [activeTab, setActiveTab] = useState('theory');
  const [activeRecording, setActiveRecording] = useState(null);
  const [speechFeedback, setSpeechFeedback] = useState(null);
  const [feedbackId, setFeedbackId] = useState(null);
  const [successScore, setSuccessScore] = useState(0);
  const [successWord, setSuccessWord] = useState(null);
  const [testSuccess, setTestSuccess] = useState(false);
  const [fatigueCounter, setFatigueCounter] = useState(0);
  const [showSimulation, setShowSimulation] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [currentStoryStep, setCurrentStoryStep] = useState(0);
  const [isStoryFinished, setIsStoryFinished] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);

  // Session Management
  const { lastIndex, hasPrompted, setHasPrompted, saveProgress, loading: sessionLoading } = useLessonSession(lesson.id);

  useEffect(() => {
    const startTime = Date.now();
    trackEvent('ENTER_LESSON', lesson.id);

    /* lessonImages fetch removed as it is unused */

    if (lesson.id) {
       const stories = lesson.theory.pasakojimai || lesson.theory.tprsStory || [];
       if (stories.length > 0) {
         const randomIdx = Math.floor(Math.random() * stories.length);
         setSelectedStoryIndex(randomIdx);
       }
    }

    return () => {
      const duration = Date.now() - startTime;
      trackEvent('EXIT_LESSON', lesson.id, { duration });
    };
  }, [lesson.id, trackEvent, lesson.theory.pasakojimai, lesson.theory.tprsStory]);

  useEffect(() => {
    trackEvent('SWITCH_TAB', `${lesson.id}_${activeTab}`);
    const idx = TABS.indexOf(activeTab);
    if (idx !== -1) saveProgress(idx);
  }, [activeTab, lesson.id, trackEvent, saveProgress]);

  const handleSpeak = (text, options = {}) => {
    speechService.speak(text, { rate: speechRate, ...options });
  };

  const handleStartRecording = async (targetText, id) => {
    try {
      await recognitionService.checkHardwarePermission();
      speechService.stop();
      recognitionService.stop();
      
      setActiveRecording(id);
      setFeedbackId(id);
      setSpeechFeedback(null);
      await audioRecorder.start();

      const dynamicTimeout = Math.max(3000, 2000 + (targetText.length * 100));
      const transcript = await recognitionService.listen(dynamicTimeout, { continuous: true });
      
      const result = recognitionService.compare(transcript, targetText, 0.5);
      const score = Math.round(result.score * 100);
      setSuccessScore(score);
      setSuccessWord(targetText);
      
      const uid = user?.id || getLocalUserId();
      apiClient.saveHistoryItem({
        userId: uid,
        actionType: 'PRONUNCIATION_TEST',
        entityId: targetText.substring(0, 50),
        successRate: score,
        notes: transcript
      }).catch(e => console.warn(e));

      if (score >= 70) {
        audioFeedbackService.playSuccess();
        const newCounter = fatigueCounter + 1;
        setFatigueCounter(newCounter);
        
        if (newCounter >= 5 && lesson.theory.syntheticSimulations?.length > 0) {
           setTimeout(() => {
             setShowSimulation(true);
             setFatigueCounter(0);
           }, 2000);
        }
      } else {
        audioFeedbackService.playFailure();
        if (repeatSegment) {
          setTimeout(() => {
             handleStartRecording(targetText, id);
          }, 2000);
        }
      }
      setTimeout(() => setSuccessWord(null), 3000);
      
      const targetWords = targetText.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").split(" ");
      const spokenWords = transcript.toLowerCase().split(" ");
      
      const wordResults = targetWords.map(word => {
        const isExact = spokenWords.includes(word);
        const isClose = spokenWords.some(sw => recognitionService.isCloseEnough(sw, word));
        return { word, match: isExact || isClose };
      });

      setSpeechFeedback({ ...result, wordResults });

    } catch (err) {
      console.warn("🎤 Recognition issue:", err);
      setSuccessScore(0);
      setSuccessWord(targetText);
      audioFeedbackService.playFailure();
      setTimeout(() => setSuccessWord(null), 3000);
    } finally {
      await new Promise(r => setTimeout(r, 400));
      await audioRecorder.stop();
      setActiveRecording(null);

      try {
        await audioRecorder.play();
        await new Promise(r => setTimeout(r, 800));
        speechService.speak(targetText, { rate: 0.8 });
      } catch {
        speechService.speak(targetText, { rate: 0.8 });
      }
    } 
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'story') {
      setCurrentStoryStep(0);
      setIsStoryFinished(false);
      setLastAnswerCorrect(null);
    }
  };

  const handleStoryAnswer = (choice, correct, totalSteps) => {
    if (choice === correct) {
      setLastAnswerCorrect(true);
      setTimeout(() => {
        setLastAnswerCorrect(null);
        if (currentStoryStep < totalSteps - 1) {
          setCurrentStoryStep(prev => prev + 1);
        } else {
          setIsStoryFinished(true);
          trackEvent('STORY_COMPLETE', lesson.id, { storyIndex: selectedStoryIndex });
        }
      }, 700);
    } else {
      setLastAnswerCorrect(false);
      setTimeout(() => setLastAnswerCorrect(null), 1000);
    }
  };

  const handleResume = () => {
    if (lastIndex >= 0 && lastIndex < TABS.length) {
      setActiveTab(TABS[lastIndex]);
    }
    setHasPrompted(true);
  };

  const handleHoverPause = () => {
    if (pauseOnHover) {
      speechService.stop();
    }
  };

  if (sessionLoading) return null;

  return (
    <>
      {/* Synthetic Classroom Modal - Outside main container for true fullscreen */}
      {showSimulation && (
        <div className="fixed inset-0 z-[5000] flex justify-center items-center bg-slate-950/95 backdrop-blur-2xl overflow-hidden focus-within:outline-none">
          <div className="w-full h-full">
            <SyntheticClassroom 
              lesson={lesson} 
              onFinish={() => {
                setShowSimulation(false);
                setFatigueCounter(0);
              }} 
            />
          </div>
        </div>
      )}

      <div className="max-app-container p-4 md:p-8 bg-white min-h-screen shadow-2xl rounded-3xl border-t-8 border-eng-blue relative mb-12 animate-fade-in group/lesson">
        {/* CINEMA RESUME SPLASH */}
        {lastIndex > 0 && !hasPrompted && (
          <div className="fixed inset-0 z-[2000] bg-slate-950/95 backdrop-blur-3xl flex flex-col items-center justify-center animate-fade-in p-8 text-center">
             <div className="max-w-md w-full">
                <div className="w-24 h-24 bg-eng-red rounded-[2rem] mx-auto mb-8 flex items-center justify-center shadow-[0_0_50px_rgba(204,0,0,0.4)] animate-pulse">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
                </div>
                <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">Tęsti Pamoką?</h3>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-12">Sistema išsaugojo jūsų progresą</p>
                
                <div className="flex flex-col gap-4">
                   <button 
                    onClick={handleResume}
                    className="w-full py-5 bg-white text-slate-900 font-black rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all text-xs tracking-widest uppercase cursor-pointer"
                   >
                     Tęsti nuo: {TABS[lastIndex] === 'theory' ? 'Teorijos' : TABS[lastIndex] === 'dialogue' ? 'Dialogo' : 'Istorijos'}
                   </button>
                   <button 
                    onClick={() => setHasPrompted(true)}
                    className="w-full py-5 bg-white/5 text-slate-500 font-black rounded-3xl border border-white/10 hover:bg-white/10 transition-all text-[10px] tracking-widest uppercase cursor-pointer"
                   >
                     Pradėti iš naujo
                   </button>
                </div>
             </div>
          </div>
        )}

        {/* Success/Result Bubble */}
        {successWord && (
          <div className={`fixed top-[15vh] left-1/2 -translate-x-1/2 text-white text-lg px-12 py-6 rounded-3xl animate-success-pop font-black border-4 border-white shadow-[0_30px_80px_rgba(0,0,0,0.5)] z-[999] whitespace-nowrap flex items-center gap-6 ${
            successScore >= 70 ? 'bg-gradient-to-r from-green-600 to-green-800' : 
            successScore >= 30 ? 'bg-gradient-to-r from-amber-600 to-orange-700' :
            'bg-gradient-to-r from-slate-800 to-black'
          }`}>
            <span className="text-4xl">
              {successScore >= 70 ? '🎉' : successScore >= 30 ? '⚖️' : '❌'}
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] opacity-80 leading-none mb-1 tracking-widest">ĮVERTINIMAS</span>
              <span className="tracking-tight text-2xl">{successScore >= 70 ? 'EXCELLENT!' : successScore >= 30 ? 'KEEP TRYING' : 'OARS UP!'} ({successScore}%)</span>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <button 
            onClick={onBack}
            className="text-slate-400 hover:text-eng-blue font-black flex items-center gap-2 cursor-pointer transition-colors uppercase tracking-widest text-xs"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
            {languageConfig.ui.backToDashboard}
          </button>

          <button 
             onClick={async () => {
               try {
                 await handleStartRecording("Hello, how are you?", "mic-test");
                 trackEvent('CLICK', 'MIC_TEST', { lessonId: lesson.id });
                 setTestSuccess(true);
                 setTimeout(() => setTestSuccess(false), 5000);
               } catch (e) {
                 console.error("Test failed", e);
               }
             }}
             className={`flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-sm border-2 ${
               activeRecording === 'mic-test' ? 'bg-eng-red text-white animate-pulse border-eng-red' : 'bg-white border-slate-200 text-slate-400 hover:border-eng-red hover:text-eng-red cursor-pointer'
             }`}
           >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
             {activeRecording === 'mic-test' ? languageConfig.lesson.listening : languageConfig.lesson.checkMic}
             {testSuccess && <span className="ml-2 text-green-600">✅ VEIKIA!</span>}
           </button>

           <div className="flex gap-2">
             <PDFDownloadLink 
               document={<LessonPDF lesson={lesson} theme="minimal" />} 
               fileName={`lesson-${lesson.id}-print.pdf`}
             >
               {({ loading }) => (
                 <button className="flex items-center gap-2 px-6 py-2 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all cursor-pointer border border-slate-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                    {loading ? 'Ruošiama...' : 'Spausdinti (PDF)'}
                 </button>
               )}
             </PDFDownloadLink>

             <PDFDownloadLink 
               document={<LessonPDF lesson={lesson} theme="premium" />} 
               fileName={`lesson-${lesson.id}-styled.pdf`}
             >
               {({ loading }) => (
                 <button className="flex items-center gap-2 px-6 py-2 bg-eng-blue text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    {loading ? 'Ruošiama...' : 'Atsisiųsti (Styled)'}
                 </button>
               )}
             </PDFDownloadLink>
           </div>
        </div>

        <div className="mb-10">
          <span className="inline-block bg-blue-50 text-eng-blue font-black px-4 py-1 rounded-full mb-3 text-[10px] tracking-[0.2em] uppercase border border-blue-100">
            Lesson {lesson.id}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mt-1 uppercase tracking-tighter leading-none italic">{lesson.theory.title}</h1>
        </div>

        <div className="flex gap-2 md:gap-4 mb-10 bg-slate-100 p-1.5 rounded-2xl md:rounded-full overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`py-3 px-6 md:px-8 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab 
                ? 'bg-white shadow-xl text-eng-blue' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'theory' ? languageConfig.lesson.theoryTab : tab === 'dialogue' ? languageConfig.lesson.dialogueTab : tab === 'story' ? languageConfig.lesson.storyTab : languageConfig.lesson.assessmentTab}
            </button>
          ))}
        </div>

        <div className="prose max-w-none">
          {activeTab === 'theory' && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <div className="mb-10 rounded-3xl overflow-hidden shadow-2xl border-b-[8px] border-eng-blue/20 relative group">
                <img 
                  src={lesson.image} 
                  alt={lesson.theory.title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400?text=Lesson+Illustration'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">{lesson.theory.title}</h1>
                </div>
              </div>

              <div 
                className="bg-slate-50 p-8 rounded-[2rem] border-l-8 border-eng-red shadow-inner mb-10 relative group secondary-label-container"
                onMouseEnter={handleHoverPause}
              >
                <button 
                  onClick={() => handleSpeak(lesson.theory.story)}
                  className="absolute top-4 right-4 p-3 bg-white rounded-full text-slate-400 hover:text-eng-red shadow-sm border border-slate-100 cursor-pointer transition-all hover:scale-110 active:scale-90"
                  title="Klausytis"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
                </button>
                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-serif italic first-letter:text-5xl first-letter:font-black first-letter:text-eng-red first-letter:mr-3 first-letter:float-left pr-10">
                  {lesson.theory.story}
                </p>
              </div>
              
              <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-eng-blue flex items-center gap-3 secondary-label">
                <span className="w-10 h-1 bg-eng-blue"></span>
                Svarbiausi akcentai
              </h3>
              <ul className="space-y-4 mb-12">
                {lesson.theory.points.map((p, i) => (
                  <li key={i} className="flex gap-4 items-start bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <span className="bg-blue-100 text-eng-blue font-black w-6 h-6 flex items-center justify-center rounded-full text-[10px] shrink-0">✓</span>
                    <span className="text-slate-800 text-lg font-medium">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'dialogue' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 max-w-2xl mx-auto">
              {lesson.theory.dialogue.map((d, i) => (
                <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'items-start' : 'items-end'}`}>
                  <span className="text-[10px] font-black text-slate-300 mb-2 uppercase tracking-widest secondary-label">{d.speaker}</span>
                  <div className="flex items-center gap-4 group">
                    {i % 2 !== 0 && (
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => handleSpeak(d.text, { gender: 'female' })}
                          onMouseEnter={handleHoverPause}
                          className="p-2 bg-white rounded-full text-slate-400 hover:text-eng-blue shadow-sm border border-slate-100 cursor-pointer active:scale-90 transition-all"
                          title="Klausyti"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
                        </button>
                        <button 
                          onClick={() => handleStartRecording(d.text, `dialogue-${i}`)}
                          className={`p-2 rounded-full shadow-sm border-2 cursor-pointer active:scale-90 transition-all ${activeRecording === `dialogue-${i}` ? 'bg-eng-red text-white border-eng-red animate-pulse' : 'bg-white text-slate-400 border-slate-100 hover:border-eng-red hover:text-eng-red'}`}
                          title="Tikrinti tarimą"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                        </button>
                      </div>
                    )}
                    
                    <div className={`p-6 rounded-[2rem] shadow-sm relative transition-all duration-500 ${
                      i % 2 === 0 ? 'bg-white text-slate-800 border-2 border-slate-100 rounded-tl-none' : 'bg-eng-blue text-white rounded-tr-none'
                    } ${successWord === d.text ? 'ring-4 ring-green-400 ring-offset-2' : ''}`}>
                      <p className="text-xl md:text-2xl font-black mb-1 italic">
                        {successWord === d.text && speechFeedback?.wordResults ? (
                          <span className="flex flex-wrap gap-x-1">
                            {speechFeedback.wordResults.map((res, idx) => (
                              <span key={idx} className={res.match ? (i % 2 === 0 ? 'text-green-600' : 'text-green-300') : (i % 2 === 0 ? 'text-red-500 underline' : 'text-red-300 underline')}>
                                {res.word}
                              </span>
                            ))}
                          </span>
                        ) : d.text}
                      </p>
                      <p className={`text-sm font-medium opacity-60 secondary-label ${i % 2 === 0 ? 'text-slate-500' : 'text-blue-100'}`} data-hide-secondary="true">{d.translation}</p>
                    </div>

                    {i % 2 === 0 && (
                      <div className="flex flex-col gap-2">
                         <button 
                          onClick={() => handleSpeak(d.text, { gender: 'male' })}
                          onMouseEnter={handleHoverPause}
                          className="p-2 bg-white rounded-full text-slate-400 hover:text-eng-blue shadow-sm border border-slate-100 cursor-pointer active:scale-90 transition-all"
                          title="Klausyti"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
                        </button>
                        <button 
                          onClick={() => handleStartRecording(d.text, `dialogue-${i}`)}
                          className={`p-2 rounded-full shadow-sm border-2 cursor-pointer active:scale-90 transition-all ${activeRecording === `dialogue-${i}` ? 'bg-eng-red text-white border-eng-red animate-pulse' : 'bg-white text-slate-400 border-slate-100 hover:border-eng-red hover:text-eng-red'}`}
                          title="Tikrinti tarimą"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'story' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2">
              {(() => {
                const stories = lesson.theory.pasakojimai || lesson.theory.tprsStory || [];
                const currentStory = stories[selectedStoryIndex] || (Array.isArray(stories[0]) ? stories[0] : stories);
                const storySteps = Array.isArray(currentStory) ? currentStory : [currentStory];
                
                if (isStoryFinished) {
                  return (
                    <div className="bg-white p-12 md:p-20 rounded-[3rem] border-2 border-green-100 shadow-2xl text-center animate-in zoom-in-95 duration-500">
                      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <h3 className="text-4xl font-black text-slate-900 mb-4 italic">Puiku, Juozai!</h3>
                      <p className="text-xl text-slate-500 mb-10">Šis pasakojimas įveiktas. Esi vienu žingsniu arčiau laisvo kalbėjimo!</p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                          onClick={() => {
                            const nextIdx = (selectedStoryIndex + 1) % stories.length;
                            setSelectedStoryIndex(nextIdx);
                            setCurrentStoryStep(0);
                            setIsStoryFinished(false);
                          }}
                          className="px-8 py-4 bg-eng-blue text-white rounded-2xl font-black shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        >
                          KITAS PASAKOJIMAS
                        </button>
                        <button 
                          onClick={() => setActiveTab('assessment')}
                          className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-600 rounded-2xl font-black hover:bg-slate-50 transition-all cursor-pointer"
                        >
                          EITI Į TESTUKĄ
                        </button>
                      </div>
                    </div>
                  );
                }

                const s = storySteps[currentStoryStep];
                if (!s) return <div className="p-10 text-center text-slate-400">Kraunama istorija...</div>;

                return (
                  <div className="bg-white p-8 md:p-12 rounded-[3rem] border-2 border-slate-100 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] -z-10 transition-all group-hover:scale-110 decorative-pattern"></div>
                    
                    <div className="flex justify-between items-start mb-10">
                      <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <button 
                              onClick={() => handleSpeak(s.text)}
                              onMouseEnter={handleHoverPause}
                              className="bg-eng-blue text-white p-4 rounded-full shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer"
                              title="Listen"
                            >
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
                            </button>
                            <button 
                              onClick={() => handleStartRecording(s.text, `story-${currentStoryStep}`)}
                              className={`p-4 rounded-full shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer border-2 ${activeRecording === `story-${currentStoryStep}` ? 'bg-eng-red text-white border-eng-red animate-pulse' : 'bg-white border-eng-red text-eng-red'}`}
                              title="Practice Pronunciation"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                            </button>
                          </div>
                          
                          <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight pr-10 mb-2 italic">
                            {speechFeedback?.wordResults && feedbackId === `story-${currentStoryStep}` ? (
                              <span className="flex flex-wrap gap-x-2">
                                {speechFeedback.wordResults.map((res, idx) => (
                                  <span key={idx} className={res.match ? 'text-green-600' : 'text-eng-red underline decoration-dotted'}>
                                    {res.word}
                                  </span>
                                ))}
                              </span>
                            ) : `"${s.text}"`}
                          </h3>
                          <p className="text-xl text-slate-400 font-medium italic secondary-label">{s.translation}</p>
                      </div>
                      
                      <div className="flex flex-col items-center gap-2">
                        <span className="bg-slate-100 text-slate-400 w-12 h-12 flex items-center justify-center rounded-2xl font-black text-xs metadata-tag">
                          {currentStoryStep + 1} / {storySteps.length}
                        </span>
                      </div>
                    </div>
                    
                    {/* COMPREHENSION CHECK */}
                    <div className={`p-8 rounded-[2rem] border-2 transition-all duration-300 ${lastAnswerCorrect === true ? 'bg-green-50 border-green-200' : lastAnswerCorrect === false ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-blue-100 shadow-inner'}`}>
                      <h4 className="font-black text-eng-blue mb-6 text-xs uppercase tracking-[0.3em] flex items-center gap-2 secondary-label">
                        <span className="w-6 h-0.5 bg-eng-blue"></span>
                        {lastAnswerCorrect === true ? 'Teisingai!' : lastAnswerCorrect === false ? 'Pabandyk dar kartą' : 'Quick Check'}
                      </h4>
                      <p className="text-xl md:text-2xl font-bold mb-8 text-slate-700">{s.check.question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {s.check.choices.map((c, j) => (
                          <button 
                            key={j}
                            onClick={() => handleStoryAnswer(c, s.check.answer, storySteps.length)}
                            className={`p-5 md:p-6 rounded-2xl text-left font-black transition-all cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 active:scale-95 border-2 ${lastAnswerCorrect === true && c === s.check.answer ? 'bg-green-500 text-white border-green-500' : 'bg-white border-slate-100 hover:border-eng-blue hover:text-eng-blue'}`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-10 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-eng-blue transition-all duration-500 ease-out"
                        style={{ width: `${((currentStoryStep + 1) / storySteps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
          {activeTab === 'assessment' && (
            <AssessmentModule lesson={lesson} onComplete={onBack} />
          )}
        </div>
      </div>

      {/* Manual Rest Button */}
      {!showSimulation && lesson.theory.syntheticSimulations?.length > 0 && (
        <button 
          onClick={() => setShowSimulation(true)}
          className="fixed bottom-10 right-10 bg-white/95 backdrop-blur-xl border-4 border-eng-blue/10 p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.2)] hover:bg-eng-blue hover:text-white transition-all group flex items-center gap-5 cursor-pointer z-[100] transform hover:scale-105 active:scale-95"
        >
          <div className="bg-blue-100 group-hover:bg-blue-500 p-3 rounded-2xl transition-colors">
            <svg className="w-8 h-8 text-eng-blue group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div className="text-left">
            <p className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Pavargai?</p>
            <p className="text-sm font-black uppercase tracking-tight">Leisk klasiokams padirbėti</p>
          </div>
        </button>
      )}
    </>
  );
}
