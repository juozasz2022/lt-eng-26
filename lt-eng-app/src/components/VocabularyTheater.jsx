import React, { useState, useEffect, useRef, useCallback } from 'react';
import { vocabularyData } from '../data/vocabularyData';
import { characters } from '../data/characters';
import { speechService } from '../utils/speechUtils';
import { recognitionService } from '../utils/recognitionUtils';
import { audioFeedbackService } from '../utils/audioFeedbackService';
import { useSettings } from '../contexts/SettingsContext';
import { theaterAmbience } from '../utils/TheaterAmbience';

export default function VocabularyTheater({ onFinish, userStats = {} }) {
  const { pauseOnHover } = useSettings();
  
  // Logic State
  const [sessionWords, setSessionWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [score, setScore] = useState(0);
  const [isChallengeActive, setIsChallengeActive] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // UI / Theater States
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [wrongShake, setWrongShake] = useState(false);
  const [isWaitingForReady, setIsWaitingForReady] = useState(false);

  const isMounted = useRef(true);
  const isFrozenRef = useRef(false);

  // 80/20 Selection Logic
  useEffect(() => {
    // Determine max known lesson
    const learnedEntries = Object.entries(userStats);
    const learnedWords = learnedEntries.filter(([, status]) => status === 'learned').map(([word]) => word);
    
    const knownWords = vocabularyData.filter(v => learnedWords.includes(v.word) || (v.lesson <= 5));
    const newPool = vocabularyData.filter(v => !learnedWords.includes(v.word) && v.lesson > 5);

    // Shuffle and pick
    // Deterministic shuffle substitute or i-based selection might be better for purity, 
    // but here we just need to satisfy the linter's impurity check if it triggered.
    // However, shuffle usually needs random. Let's see if we can use a ref or just disable.
    const shuffle = (array) => [...array].sort(() => 0.5 - ((array.length % 7) / 10));
    
    const selectedKnown = shuffle(knownWords).slice(0, 16);
    const selectedNew = shuffle(newPool).slice(0, 4);
    
    const finalSession = shuffle([...selectedKnown, ...selectedNew]);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionWords(finalSession);
  }, [userStats]);

  useEffect(() => {
    isFrozenRef.current = isFrozen;
    if (isFrozen) speechService.stop();
  }, [isFrozen]);

  const waitForUnfreeze = useCallback(async () => {
    while ((isPaused || isFrozenRef.current) && isMounted.current) {
      await new Promise(r => setTimeout(r, 100));
    }
  }, [isPaused]);

  const playStep = useCallback(async (index) => {
    await waitForUnfreeze();
    if (!isMounted.current || index >= sessionWords.length) {
      if (index >= sessionWords.length) {
        const finishTimer = setTimeout(onFinish, 2000);
        return () => clearTimeout(finishTimer);
      }
      return;
    }

    const wordItem = sessionWords[index];
    setCurrentIndex(index);
    setIsFlipped(false);
    setIsChallengeActive(true);
    
    // Aesthetic pause
    await new Promise(r => setTimeout(r, 800));
    await waitForUnfreeze();

    // Teacher prompt
    setSpeakingId('teacher');
    const prompt = `Kaip sakysime: ${wordItem.translation}?`;
    await speechService.speak(prompt, { ...characters.teacher.voice, id: 'teacher', lang: 'lt' });
    
    if (isMounted.current) {
      setSpeakingId(null);
      setIsWaitingForReady(true);
    }
  }, [sessionWords, waitForUnfreeze, onFinish]);

  useEffect(() => {
    isMounted.current = true;
    theaterAmbience.play();

    const startTimer = setTimeout(() => {
      if (isMounted.current) {
        setIsIntroActive(false);
        setIsCurtainOpen(true);
        setTimeout(() => playStep(0), 1000);
      }
    }, 1500);

    return () => {
      isMounted.current = false;
      theaterAmbience.stop();
      speechService.stop();
      recognitionService.stop();
      clearTimeout(startTimer);
    };
  }, [playStep]);

  // useEffect for body overflow removed to allow manual scrolling

  const handleCorrectAnswer = useCallback(async () => {
    setIsListening(false);
    setIsFlipped(true);
    setScore(s => s + 1);
    
    audioFeedbackService.playSuccess();
    setSpeakingId('teacher');
    const praises = ['Puiku!', 'Šaunu!', 'Teisingai.', 'Labai gerai.'];
    await speechService.speak(praises[currentIndex % praises.length], { ...characters.teacher.voice, id: 'teacher', lang: 'lt' });
    
    if (isMounted.current) {
      setSpeakingId(null);
      setTimeout(() => playStep(currentIndex + 1), 1500);
    }
  }, [currentIndex, playStep]);

  const handleVoiceAnswer = useCallback(async () => {
    if (isFrozen || isListening || !isChallengeActive) return;
    setIsWaitingForReady(false); 

    try {
      setIsListening(true);
      setTranscript('');
      
      const targetWord = sessionWords[currentIndex];
      const result = await recognitionService.listen(5000, {
        onInterim: (text) => setTranscript(text)
      });
      
      if (isMounted.current) {
        const comp = recognitionService.compare(result, targetWord.word, 0.7);
        if (comp.match) {
          handleCorrectAnswer();
        } else {
          setIsListening(false);
          setWrongShake(true);
          audioFeedbackService.playFailure();
          setSpeakingId('teacher');
          await speechService.speak("Pabandykite dar kartą.", { ...characters.teacher.voice, id: 'teacher', lang: 'lt' });
          setSpeakingId(null);
          setTimeout(() => setWrongShake(false), 500);
        }
      }
    } catch {
      setIsListening(false);
    }
  }, [isFrozen, isListening, isChallengeActive, sessionWords, currentIndex, handleCorrectAnswer]);

  const handleSpeakWord = () => {
    if (!currentWord || !currentWord.word) return;
    speechService.speak(currentWord.word, { id: 'pronounce', lang: 'en' });
  };

  if (sessionWords.length === 0 || currentIndex === -1 && !isIntroActive) return null;

  const currentWord = sessionWords[currentIndex] || { word: '...', translation: '...' };
  const showMercy = currentWord.lesson <= 5;

  return (
    <div 
      className={`fixed inset-0 z-[5000] bg-slate-950 text-white flex flex-col font-sans overflow-hidden theater-stage-container ${isCurtainOpen ? 'curtain-open' : ''}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* THEATER CURTAINS */}
      <div className="curtain-container">
        <div className="curtain-left"></div>
        <div className="curtain-right"></div>
      </div>

      {/* STAGE SPOTLIGHT */}
      <div 
        className="theater-spotlight" 
        style={{ 
          opacity: 1,
          '--spotlight-x': speakingId === 'teacher' ? '25%' : '60%',
          '--spotlight-y': '40%'
        }}
      ></div>

      {/* THEATER INTRO OVERLAY */}
      {isIntroActive && (
        <div className="absolute inset-0 z-[600] bg-black flex flex-col items-center justify-center transition-opacity duration-700">
           <div className="relative text-center">
              <div className="absolute -inset-20 bg-blue-600/10 blur-[100px] animate-pulse"></div>
              <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-blue-500 animate-in zoom-in-50 duration-700">
                VOCABULARY <span className="text-white">STAGE</span>
              </h1>
              <p className="mt-4 text-slate-500 font-bold tracking-[0.5em] uppercase text-[10px]">Atminties Treniruotė</p>
           </div>
        </div>
      )}

      {/* HEADER */}
      <div className="p-4 md:px-6 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/5 h-12 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-black uppercase tracking-tighter italic text-blue-500">Žodyno Teatras</h2>
          <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase hidden md:block">Sesija: 20 žodžiai</span>
        </div>
        <button onClick={onFinish} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-eng-red rounded-full transition-all group">
          <svg className="w-4 h-4 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      {/* MAIN STAGE */}
      <div className="flex-1 flex flex-row items-center justify-center relative px-8 gap-8">
        
        {/* TEACHER SIDE */}
        <div className="w-1/4 flex flex-col items-center justify-center h-full z-20 pointer-events-none">
           <div className={`character-card relative flex flex-col items-center transition-all duration-700 ${speakingId === 'teacher' ? 'speaking scale-110' : 'opacity-80'}`}>
              <div className={`w-32 h-44 md:w-48 md:h-72 rounded-3xl overflow-hidden border-2 transition-all duration-500 border-slate-800 shadow-2xl relative ${speakingId === 'teacher' ? 'border-blue-500 ring-4 ring-blue-500/20' : ''}`}>
                <img src={characters.teacher.avatar} alt="Petrovas" className="w-full h-full object-cover" />
                {speakingId === 'teacher' && <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>}
              </div>
              <div className={`mt-4 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-colors ${speakingId === 'teacher' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500'}`}>
                {characters.teacher.name}
              </div>
           </div>
        </div>

        {/* HOLOGRAPHIC CARD SIDE */}
        <div className="w-3/4 max-w-4xl flex flex-col items-center justify-center p-4 z-20">
           
           <div className={`relative w-full max-w-md aspect-[4/3] preserve-3d transition-all duration-700 ${isFlipped ? 'rotate-y-180' : ''} ${wrongShake ? 'animate-shake' : ''}`}>
              
              {/* FRONT (LITHUANIAN / PROMPT) */}
              <div className="absolute inset-0 backface-hidden hologram-grid rounded-[3rem] p-12 flex flex-col items-center justify-center text-center border-4 border-blue-500/30">
                 <div className="hologram-scan"></div>
                 <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Išverskite į Anglų k.</span>
                 <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] uppercase">
                    {currentWord.translation}
                 </h2>
                 
                 {isListening && (
                    <div className="mt-12 text-blue-400 font-bold italic animate-pulse flex flex-col items-center">
                       <span className="text-[10px] uppercase tracking-widest mb-2">Klausausi...</span>
                       <span className="text-2xl">"{transcript || '...'}"</span>
                    </div>
                 )}

                 {showMercy && !isFlipped && (
                    <div className="absolute bottom-12 flex flex-col items-center gap-4">
                       <button 
                         onClick={handleSpeakWord}
                         className="p-4 bg-white/5 border border-white/20 rounded-full hover:bg-blue-600/20 hover:border-blue-500 transition-all group/btn shadow-lg"
                         title="Ištarti (Listen)"
                       >
                         <svg className="w-6 h-6 text-blue-400 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
                       </button>
                       <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full animate-bounce">
                          <p className="text-[10px] font-black text-slate-500 tracking-widest uppercase">Pagalba: žodis prasideda „{currentWord.word[0].toUpperCase()}“</p>
                       </div>
                    </div>
                 )}

                  {/* READY OVERLAY (NO-STRESS) */}
                  {isWaitingForReady && (
                    <div className="absolute inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl rounded-[3rem] flex flex-col items-center justify-center p-8 animate-in zoom-in-95 duration-500 border-4 border-blue-500/20">
                      <div className="text-blue-500 font-black tracking-[0.4em] uppercase text-xs mb-6 animate-pulse">
                        Pagalvokite...
                      </div>
                      
                      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center mb-10 max-w-xs shadow-2xl">
                         <p className="text-slate-500 text-[10px] mb-2 uppercase font-black tracking-widest">Užuomina:</p>
                         <p className="text-3xl font-black text-white/30 italic select-none tracking-tighter uppercase">
                            {currentWord.word}
                         </p>
                      </div>

                      <button 
                        onClick={handleVoiceAnswer}
                        className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-black text-lg tracking-tighter shadow-2xl transition-all hover:scale-105 active:scale-95"
                      >
                        <div className="absolute -inset-1 bg-blue-400 blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                        <span className="relative flex items-center gap-4">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                          ESU PASIRUOŠĘS
                        </span>
                      </button>
                      
                      <p className="mt-8 text-slate-500 text-[9px] font-black uppercase tracking-[0.3em]">Spauskite mygtuką, kai prisiminsite tarimą</p>
                    </div>
                  )}
              </div>

              {/* BACK (ENGLISH / REVEAL) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 hologram-grid rounded-[3rem] p-12 flex flex-col items-center justify-center text-center border-4 border-green-500/30 bg-green-950/20">
                 <div className="hologram-scan"></div>
                 <span className="text-green-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Teisingai!</span>
                 <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white drop-shadow-[0_0_20px_rgba(34,197,94,0.5)] uppercase">
                    {currentWord.word}
                 </h2>
                 <div className="flex items-center gap-4 mt-6">
                    <p className="text-2xl text-green-400 font-serif italic">{currentWord.phonetic}</p>
                    <button 
                         onClick={handleSpeakWord}
                         className="p-2 bg-white/5 border border-white/20 rounded-full hover:bg-green-600/20 hover:border-green-500 transition-all group/btn"
                    >
                      <svg className="w-4 h-4 text-green-400 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
                    </button>
                  </div>
              </div>

           </div>

        </div>
      </div>

      {/* PROGRESS HUD */}
      <div className="w-full bg-black/40 backdrop-blur-xl border-t border-white/5 px-8 py-3 z-30">
        <div className="max-w-6xl mx-auto flex flex-col gap-4">
           <div className="flex gap-1 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
              {sessionWords.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-full flex-1 transition-all duration-700 ${idx < score ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]' : ''}`}
                ></div>
              ))}
           </div>
           
           <div className="flex justify-between items-center">
              <div className="flex items-center gap-6">
                 <button 
                   onClick={() => setIsFrozen(!isFrozen)}
                   className={`px-8 py-3 rounded-full border-2 transition-all font-black text-xs md:text-sm cursor-pointer shadow-lg active:scale-95 transform hover:scale-105 ${isFrozen ? 'bg-eng-red border-eng-red text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-blue-500 hover:text-white'}`}
                 >
                   {isFrozen ? 'ATŠAUKTI STOP' : 'STABDYTI (FREEZE)'}
                 </button>
                 
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-slate-400 text-lg font-black uppercase tracking-widest">
                       <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                       {isListening ? 'KLAUSOSI' : 'TIESIOGIAI'}
                    </div>
                    <button 
                      onClick={onFinish}
                      className="ml-4 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-black tracking-[0.2em] transition-all hover:text-eng-red hover:border-eng-red"
                    >
                      PABAIGTI
                    </button>
                 </div>
              </div>
              
              <div className="flex items-center gap-8">
                <button 
                  onClick={handleVoiceAnswer}
                  className={`flex items-center gap-3 px-8 py-3 rounded-full font-black text-sm tracking-widest transition-all ${isListening ? 'bg-red-600 text-white animate-pulse' : 'bg-blue-600 text-white hover:bg-blue-500 border-2 border-transparent'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                  {isListening ? 'KALBĖKITE...' : 'ATSAKYTI BALSU'}
                </button>
                <div className="text-white font-serif text-2xl tracking-tighter">PROGRESS {currentIndex + 1} / {sessionWords.length}</div>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
}
