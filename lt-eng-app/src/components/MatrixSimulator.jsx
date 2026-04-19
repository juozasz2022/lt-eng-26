import React, { useState, useEffect, useRef, useCallback } from 'react';
import { matrixVerbs } from '../data/matrixData';
import { characters } from '../data/characters';
import { speechService } from '../utils/speechUtils';
import { recognitionService } from '../utils/recognitionUtils';
import { audioFeedbackService } from '../utils/audioFeedbackService';
import { useSettings } from '../contexts/SettingsContext';
import { theaterAmbience } from '../utils/TheaterAmbience';

export default function MatrixSimulator({ onComplete, customVerbs }) {
  const { pauseOnHover } = useSettings();
  
  // Simulation State
  const [currentVerb, setCurrentVerb] = useState(null);
  const [targetForm, setTargetForm] = useState(null);
  const [score, setScore] = useState(0);
  const [targetScore] = useState(20); // Longer exercise as requested
  
  // UI / Theater States
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [wrongShake, setWrongShake] = useState(null);
  const [isTeacherPrompting, setIsTeacherPrompting] = useState(false);
  const [isWaitingForReady, setIsWaitingForReady] = useState(false);
  const readyResolver = useRef(null);

  const isMounted = useRef(true);
  const isFrozenRef = useRef(false);
  const tenses = ['past', 'present', 'future'];
  const types = ['affirmative', 'negative', 'interrogative'];
  const verbsToUse = customVerbs && customVerbs.length > 0 ? customVerbs : matrixVerbs;

  useEffect(() => {
    isFrozenRef.current = isFrozen;
    if (isFrozen) speechService.stop();
  }, [isFrozen]);

  const waitForUnfreeze = useCallback(async () => {
    while ((isPaused || isFrozenRef.current) && isMounted.current) {
      await new Promise(r => setTimeout(r, 100));
    }
  }, [isPaused]);

  const startRound = useCallback(async () => {
    await waitForUnfreeze();
    if (!isMounted.current) return;

    const verb = verbsToUse[score % verbsToUse.length];
    const tense = tenses[score % tenses.length];
    const type = types[score % types.length];
    
    const newForm = { tense, type, data: verb.forms[tense][type] };
    setCurrentVerb(verb);
    setTargetForm(newForm);

    // Teacher prompts the student
    setSpeakingId('teacher');
    setIsTeacherPrompting(true);
    
    // Aesthetic pause before prompt
    await new Promise(r => setTimeout(r, 800));
    await waitForUnfreeze();

    const promptText = `Kaip pasakysite: ${newForm.data.lt}?`;
    await speechService.speak(promptText, { ...characters.teacher.voice, id: 'teacher', lang: 'lt' });
    
    if (isMounted.current) {
      setSpeakingId(null);
      setIsTeacherPrompting(false);
      
      // WAIT FOR READY
      setIsWaitingForReady(true);
      await new Promise(resolve => {
        readyResolver.current = resolve;
      });
      setIsWaitingForReady(false);
    }
  }, [verbsToUse, waitForUnfreeze, score, tenses, types]);

  useEffect(() => {
    isMounted.current = true;
    theaterAmbience.play();

    const timer = setTimeout(() => {
      if (isMounted.current) {
        setIsIntroActive(false);
        setIsCurtainOpen(true);
        setTimeout(startRound, 1000);
      }
    }, 1500);

    return () => {
      isMounted.current = false;
      theaterAmbience.stop();
      speechService.stop();
      recognitionService.stop();
      clearTimeout(timer);
    };
  }, [startRound]);

  // useEffect for body overflow removed to allow manual scrolling as requested

  const handleCorrectSelection = async () => {
    const newScore = score + 1;
    setScore(newScore);
    
    // Teacher praise
    setSpeakingId('teacher');
    const praises = ['Puiku!', 'Šaunu!', 'Teisingai.', 'Labai gerai.'];
    const praise = praises[score % praises.length];
    
    audioFeedbackService.playSuccess();
    await speechService.speak(praise, { ...characters.teacher.voice, id: 'teacher', lang: 'lt' });
    
    if (isMounted.current) {
      setSpeakingId(null);
      if (newScore >= targetScore) {
        setTimeout(() => onComplete(newScore, 0), 1500);
      } else {
        setTimeout(startRound, 800);
      }
    }
  };

  const handleCellClick = async (tense, type) => {
    if (isFrozen || isTeacherPrompting) return;

    if (tense === targetForm.tense && type === targetForm.type) {
      handleCorrectSelection();
    } else {
      const cellId = `${tense}-${type}`;
      setWrongShake(cellId);
      audioFeedbackService.playFailure();
      
      const corrections = ['Atidžiau...', 'Pabandykite dar kartą.', 'Ne visai taip.'];
      const correction = corrections[score % corrections.length];
      await speechService.speak(correction, { ...characters.teacher.voice, id: 'teacher', lang: 'lt' });
      
      if (isMounted.current) {
        setSpeakingId(null);
        setTimeout(() => setWrongShake(null), 500);
      }
    }
  };

  const handleVoiceAnswer = async () => {
    if (isFrozen || isListening) return;
    setIsWaitingForReady(false); // Clear waiting state if starting voice

    try {
      setIsListening(true);
      setTranscript('');
      
      const result = await recognitionService.listen(6000, {
        onInterim: (text) => setTranscript(text)
      });
      
      if (isMounted.current) {
        const comp = recognitionService.compare(result, targetForm.data.en, 0.7);
        if (comp.match) {
          setIsListening(false);
          handleCorrectSelection();
        } else {
          setIsListening(false);
          audioFeedbackService.playFailure();
          setSpeakingId('teacher');
          await speechService.speak("Pabandykite dar kartą ištarti.", { ...characters.teacher.voice, id: 'teacher', lang: 'lt' });
          setSpeakingId(null);
        }
      }
    } catch {
      setIsListening(false);
    }
  };

  if (!currentVerb || !targetForm) return null;

  return (
    <div 
      className={`fixed inset-0 z-[5000] bg-slate-950 text-white flex flex-col font-sans overflow-y-auto theater-stage-container ${isCurtainOpen ? 'curtain-open' : ''}`}
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
                MATRIX <span className="text-white">CONJUGATION</span>
              </h1>
              <p className="mt-4 text-slate-500 font-bold tracking-[0.5em] uppercase text-[10px]">Petrovo Metodika</p>
           </div>
        </div>
      )}

      {/* HEADER */}
      <div className="p-4 md:px-6 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/5 h-12 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-black uppercase tracking-tighter italic text-blue-500">Matricos Teatras</h2>
          <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase hidden md:block">Veiksmažodis: {currentVerb.infinitiveEN}</span>
        </div>
        <button onClick={() => onComplete(score, 0)} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-eng-red rounded-full transition-all group">
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

        {/* HOLOGRAPHIC GRID SIDE */}
        <div className="w-3/4 max-w-5xl flex flex-col items-center justify-center p-8 z-20">
           
           {/* TARGET PROMPT */}
           <div className="w-full text-center mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
              <div className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2 opacity-60">Išverskite ir pasirinkite</div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black italic tracking-tighter text-white drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                {isListening ? (transcript || "Klausausi...") : targetForm.data.lt.toUpperCase()}
              </h1>
              {isListening && (
                <div className="mt-4 text-blue-400 font-bold italic animate-pulse">
                  🎤 {transcript || "Klausausi..."}
                </div>
              )}

              {/* READY OVERLAY (NO-STRESS) */}
              {isWaitingForReady && (
                <div className="absolute inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl rounded-[2rem] flex flex-col items-center justify-center p-8 animate-in fade-in duration-500 border border-blue-500/20 shadow-[0_0_100px_rgba(30,41,59,0.8)]">
                  <div className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px] mb-6 animate-pulse">
                    Jūsų eilė...
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center mb-10 max-w-sm shadow-2xl">
                     <p className="text-slate-500 text-[10px] mb-2 uppercase font-black tracking-widest">Užduotis:</p>
                     <p className="text-2xl md:text-3xl font-black text-white italic select-none tracking-tighter uppercase leading-tight">
                        {targetForm.data.lt}
                     </p>
                  </div>

                  <button 
                    onClick={() => readyResolver.current && readyResolver.current()}
                    className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-black text-lg tracking-tighter shadow-2xl transition-all hover:scale-105 active:scale-95"
                  >
                    <div className="absolute -inset-1 bg-blue-400 blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                    <span className="relative flex items-center gap-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                      ESU PASIRUOŠĘS
                    </span>
                  </button>
                  
                  <p className="mt-8 text-slate-500 text-[11px] font-black uppercase tracking-[0.3em]">Spauskite, kai būsite pasiruošęs ištarti arba pasirinkti</p>
                </div>
              )}
           </div>

           {/* 3X3 GRID CONSOLE */}
           <div className="grid grid-cols-3 gap-2 w-full max-w-2xl hologram-grid p-4 rounded-[1.5rem] relative">
              <div className="hologram-scan"></div>
              
              {/* HEADERS */}
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500/60 pb-2 flex justify-center items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-red-500/30"></div> PRAEITIS
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500/60 pb-2 flex justify-center items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500/30"></div> DABARTIS
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500/60 pb-2 flex justify-center items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30"></div> ATEITIS
              </div>

              {types.map((type) => (
                <React.Fragment key={type}>
                  {tenses.map((tense) => {
                    const cellId = `${tense}-${type}`;
                    const isWrong = wrongShake === cellId;
                    const cellData = currentVerb.forms[tense][type];
                    
                    return (
                      <button
                        key={cellId}
                        onClick={() => handleCellClick(tense, type)}
                        className={`
                          hologram-cell flex flex-col items-center justify-center p-4 min-h-[140px] rounded-2xl
                          hologram-cell-${tense} transition-all duration-300 group
                          ${isWrong ? 'animate-shake border-red-500 bg-red-500/10' : ''}
                        `}
                      >
                         <span className="absolute top-2 left-3 text-[10px] font-black opacity-20 group-hover:opacity-40 transition-opacity">
                            {type === 'affirmative' ? 'AFF' : type === 'negative' ? 'NEG' : 'INT'}
                         </span>
                         <span className="text-lg md:text-xl font-black tracking-tight text-white group-hover:scale-105 transition-transform">
                            {cellData.en.toUpperCase()}
                         </span>
                         <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                             <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                             <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                             <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                         </div>
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
           </div>
        </div>
      </div>

      {/* PROGRESS HUD */}
      <div className="w-full bg-black/40 backdrop-blur-xl border-t border-white/5 px-8 py-3 z-30 shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col gap-4">
           <div className="flex gap-1 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
              {Array.from({length: targetScore}).map((_, idx) => (
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
                      onClick={() => onComplete(score, 0)}
                      className="ml-4 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-black tracking-[0.2em] transition-all hover:text-eng-red hover:border-eng-red"
                    >
                      PABAIGTI
                    </button>
                 </div>
              </div>
              
              <div className="flex items-center gap-8">
                <button 
                  onClick={handleVoiceAnswer}
                  className={`flex items-center gap-3 px-8 py-3 rounded-full font-black text-sm tracking-widest transition-all ${isListening ? 'bg-red-600 text-white animate-pulse' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                  {isListening ? 'KALBĖKITE...' : 'ATSAKYTI BALSU'}
                </button>
                <div className="text-white font-serif text-2xl tracking-tighter">SCORE {score} / {targetScore}</div>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
}
