import { theaterAmbience } from '../utils/TheaterAmbience';
import StudentDesk from './StudentDesk';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheaterCamera } from '../hooks/useTheaterCamera';

export default function SyntheticClassroom({ lesson, onFinish }) {
  const { pauseOnHover } = useSettings();
  const [simulation, setSimulation] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [history, setHistory] = useState([]);
  const [speakingId, setSpeakingId] = useState(null);
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [juozasSuccessCount, setJuozasSuccessCount] = useState(0);
  
  // Cinematic Camera Hook
  useTheaterCamera(speakingId);
  
  const isMounted = useRef(true);
  const playbackStarted = useRef(false);
  const isFrozenRef = useRef(false);

  useEffect(() => {
    isFrozenRef.current = isFrozen;
    if (isFrozen) {
      speechService.stop();
    }
  }, [isFrozen]);

  useEffect(() => {
    isMounted.current = true;
    theaterAmbience.play();
    
    const dynamicSim = generateSequence(lesson, characters);
    setSimulation(dynamicSim);

    const timer = setTimeout(() => {
      if (isMounted.current) {
        setIsIntroActive(false);
        // Explicitly trigger curtains after intro
        setIsCurtainOpen(true);
      }
    }, 1200);

    return () => {
      isMounted.current = false;
      theaterAmbience.stop();
      speechService.stop();
      recognitionService.stop();
      clearTimeout(timer);
    };
  }, [lesson]);

  useEffect(() => {
    // Start simulation when ready AND curtains are opening
    if (simulation && isCurtainOpen && !playbackStarted.current) {
      playbackStarted.current = true;
      setTimeout(() => {
        if (isMounted.current) {
          setIsPlaying(true);
          playStep(0);
        }
      }, 1000); 
    }
  }, [simulation, isCurtainOpen]);

  const waitForUnfreeze = useCallback(async () => {
    while ((isPaused || isFrozenRef.current) && isMounted.current) {
      await new Promise(r => setTimeout(r, 100));
    }
  }, [isPaused]);

  const pedagogyPause = async (ms) => {
    const start = Date.now();
    while (Date.now() - start < ms && isMounted.current) {
      await waitForUnfreeze();
      await new Promise(r => setTimeout(r, 100));
      if (isFrozenRef.current || isPaused) continue; 
    }
  };

  const playStep = async (index) => {
    await waitForUnfreeze();

    if (!isMounted.current || !simulation) return;
    
    if (index >= simulation.steps.length) {
      if (isMounted.current) {
        setIsPlaying(false);
        setSpeakingId(null);
        setTimeout(onFinish, 2000);
      }
      return;
    }

    const step = simulation.steps[index];
    const char = characters[step.speaker] || characters.teacher;
    
    if (!isMounted.current) return;

    setSpeakingId(step.speaker);
    setCurrentStepIndex(index);
    setHistory(prev => [...prev, { ...step, char }]);

    // Text-First Pause
    await pedagogyPause(2500);

    if (!isMounted.current) return;
    await waitForUnfreeze();

    if (step.isInteractiveVoice) {
      setIsPlaying(false);
      setIsListening(true);
      setTranscript('');
      
      try {
        const result = await recognitionService.listen(8000, {
          onInterim: (text) => setTranscript(text)
        });
        
        if (isMounted.current) {
          const comp = recognitionService.compare(result, step.targetText || "", 0.7);
          if (comp.score >= 0.7) setJuozasSuccessCount(prev => prev + 1);

          setIsListening(false);
          setTranscript(result);
          await new Promise(r => setTimeout(r, 1200));
          await waitForUnfreeze();
          if (isMounted.current) {
            setIsPlaying(true);
            playStep(index + 1);
          }
        }
      } catch (err) {
        if (isMounted.current) {
          setIsListening(false);
          setIsPlaying(true);
          playStep(index + 1);
        }
      }
      return;
    }

    if (!isFrozenRef.current) {
       await speechService.speak(step.text, { ...char.voice, id: step.speaker });
    }
    
    if (!isMounted.current) return;
    await waitForUnfreeze();
    
    const digestDelay = step.speaker === 'teacher' ? 1200 : 2000;
    await pedagogyPause(digestDelay);
    
    if (!isMounted.current) return;
    await waitForUnfreeze();
    
    setSpeakingId(null);
    await new Promise(r => setTimeout(r, 600)); // Slightly longer pause for digest
    
    // Final guard before advancing: ensure we haven't been frozen during the digest pause
    if (isFrozenRef.current) await waitForUnfreeze();
    
    if (isMounted.current) {
      playStep(index + 1);
    }
  };

  if (!simulation) return null;

  const activeStep = simulation.steps[currentStepIndex] || { text: "Ruošiamasi...", translation: "" };

  return (
    <div 
      className={`relative w-full h-full bg-slate-950 text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-hidden theater-stage-container ${isCurtainOpen ? 'curtain-open' : ''}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* CINEMATIC OVERLAYS */}
      <div className="absolute inset-0 z-100 pointer-events-none cinematic-vignette opacity-60"></div>
      {speakingId === 'juozas' && <div className="absolute inset-x-0 bottom-0 h-1/2 bg-blue-600/5 z-40 stage-lighting-pulse"></div>}

      {/* THEATER CURTAINS */}
      <div className="curtain-container">
        <div className="curtain-left"></div>
        <div className="curtain-right"></div>
      </div>

      {/* STAGE SPOTLIGHT */}
      <div 
        className="theater-spotlight" 
        style={{ 
          opacity: speakingId ? 1 : 0,
          '--spotlight-x': speakingId === 'teacher' ? '50%' : speakingId === 'jonas' ? '35%' : speakingId === 'alisa' ? '65%' : '50%'
        }}
      ></div>
      
      {(isPaused || isFrozen) && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[300] bg-blue-600/20 backdrop-blur-md px-6 py-2 rounded-full border border-blue-500/30 flex items-center gap-2 animate-pulse">
           <div className={`w-2 h-2 rounded-full ${isFrozen ? 'bg-red-500' : 'bg-blue-500'}`}></div>
           <span className="text-[10px] font-black uppercase tracking-widest italic text-blue-300">
             {isFrozen ? 'SUSTABDYTA (Rankinis)' : 'Sustabdyta (Hover)'}
           </span>
        </div>
      )}

      {/* THEATER INTRO OVERLAY */}
      {isIntroActive && (
        <div className="absolute inset-0 z-[600] bg-black flex flex-col items-center justify-center transition-opacity duration-700">
           <div className="relative text-center">
              <div className="absolute -inset-20 bg-blue-600/10 blur-[100px] animate-pulse"></div>
              <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-blue-500 animate-in zoom-in-50 duration-700">
                THEATER <span className="text-white">STAGE</span>
              </h1>
              <p className="mt-4 text-slate-500 font-bold tracking-[0.5em] uppercase text-[10px]">Petrovo Metodika</p>
           </div>
        </div>
      )}

      {/* HEADER */}
      <div className="p-4 md:px-6 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/5 h-11 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-black uppercase tracking-tighter italic text-blue-500">Sintetinė Klasė</h2>
          <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase hidden md:block">{lesson.theory.title}</span>
        </div>
        <button onClick={onFinish} className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-eng-red rounded-full transition-all group">
          <svg className="w-4 h-4 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      {/* MAIN STAGE */}
      <div className="flex-1 flex flex-col items-center justify-start relative overflow-hidden px-4 md:px-8 bg-slate-950">
        <div className="w-full max-w-[1400px] flex flex-col items-center py-1 md:py-2 h-full relative z-[20]">
          
          {/* CHARACTER ROW - THE CINEMATIC STAGE */}
          <motion.div 
            className="flex justify-center items-end gap-3 md:gap-8 pt-4 pb-2 shrink-0 cinematic-stage"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {Object.entries(characters).map(([id, char]) => {
                if (id === 'juozas') return null;

                const isSpeaking = speakingId === id;
                const isDimmed = speakingId && speakingId !== id;
                
                let lookingClass = 'looking-center';
                if (speakingId && speakingId !== id) {
                  if (id === 'teacher') lookingClass = speakingId === 'jonas' ? 'looking-left' : 'looking-right';
                  else if (id === 'jonas') lookingClass = 'looking-right';
                  else if (id === 'alisa') lookingClass = 'looking-left';
                }
                if (speakingId === 'juozas') lookingClass = 'looking-center';

                return (
                  <motion.div 
                    key={id} 
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: isDimmed ? 0.3 : 1, 
                      scale: isSpeaking ? 1.1 : 0.9,
                      y: isSpeaking ? -15 : 0,
                      filter: isDimmed ? 'grayscale(100%) blur(2px)' : 'grayscale(0%) blur(0px)'
                    }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    className={`character-card relative flex flex-col items-center shrink-0 character-card-motion ${isSpeaking ? 'speaking' : ''} ${lookingClass}`}
                  >
                    <div className={`w-20 h-28 md:w-40 md:h-64 rounded-[2.5rem] overflow-hidden border-2 transition-all duration-700 border-white/5 shadow-2xl relative ${isSpeaking ? 'border-blue-500/50 ring-4 ring-blue-500/10' : ''}`}>
                      <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
                      {isSpeaking && <div className="absolute inset-0 bg-blue-500/20 animate-pulse pointer-events-none"></div>}
                    </div>
                    <motion.div 
                      className={`mt-4 px-4 py-1.5 rounded-xl text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] transition-colors ${isSpeaking ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-900/50 text-slate-500'}`}
                    >
                      {char.name}
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* TRANSCRIPT AREA - TIGHTENED UP */}
          <div className="w-full flex-grow-0 flex flex-col items-center justify-start text-center max-w-4xl py-2 md:py-4 z-20">
             {currentStepIndex >= 0 ? (
               <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-black/20 backdrop-blur-sm p-4 md:p-6 rounded-[2rem] border border-white/5 w-full">
                  <div className="text-blue-500 font-black text-[8px] md:text-[10px] uppercase tracking-[0.4em] mb-1.5 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                    {characters[speakingId]?.name || '...'}
                  </div>
                  <h2 className={`text-xl md:text-3xl lg:text-4xl font-black italic tracking-tighter leading-tight transition-all duration-500 ${isListening ? 'text-blue-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]' : 'text-white'}`}>
                    {isListening ? (transcript || '...') : activeStep.text}
                  </h2>
                  {!isListening && activeStep.translation && (
                    <p className="text-base md:text-xl lg:text-2xl text-slate-300 font-bold italic mt-4 mb-2 leading-relaxed max-w-3xl mx-auto border-t border-white/10 pt-4 drop-shadow-sm">
                      {activeStep.translation}
                    </p>
                  )}
                  {isListening && (
                    <div className="mt-6 flex gap-2 h-3 items-end justify-center">
                      {[1,2,3,4,5,6,7].map(i => (
                        <div 
                          key={i} 
                          className="w-1 bg-blue-500 rounded-full animate-bounce" 
                          style={{animationDelay: `${i*0.1}s`, height: `${30 + Math.random() * 70}%`}}
                        ></div>
                      ))}
                    </div>
                  )}
               </div>
             ) : (
                <div className="text-slate-700 font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse py-10">Initializing Stage...</div>
             )}
          </div>

          {/* PROGRESS HUD */}
          <div className="w-full max-w-2xl pb-4 mt-2 z-20">
             <div className="flex gap-1 h-1 bg-white/5 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm">
                {simulation.steps.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-full flex-1 transition-all duration-700 ${idx <= currentStepIndex ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : ''}`}
                  ></div>
                ))}
             </div>
             <div className="mt-4 flex justify-between items-center text-lg font-black uppercase tracking-widest px-1">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsFrozen(!isFrozen); }}
                    className={`px-4 py-2 rounded-full border-2 transition-all font-black text-xs md:text-sm cursor-pointer shadow-lg active:scale-95 transform hover:scale-105 ${isFrozen ? 'bg-eng-red border-eng-red text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-blue-500 hover:text-white'}`}
                  >
                    {isFrozen ? 'ATŠAUKTI STOP' : 'STABDYTI (FREEZE)'}
                  </button>
                  <div className="flex items-center gap-4 opacity-100">
                    <div className="flex items-center gap-2 text-slate-400">
                       <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : isPlaying ? 'bg-green-500' : 'bg-slate-800'}`}></div>
                       <span>{isListening ? 'KLAUSOSI' : isPlaying ? 'TIESIOGIAI' : 'PAUZĖ'}</span>
                    </div>
                    
                    <button 
                      onClick={onFinish}
                      className="ml-4 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-black tracking-[0.2em] transition-all hover:text-eng-red hover:border-eng-red"
                    >
                      PABAIGTI
                    </button>
                  </div>
                </div>
                <div className="text-slate-400 font-serif text-lg tracking-normal">STEP {currentStepIndex + 1} / {simulation.steps.length}</div>
             </div>
          </div>

        </div>
      </div>

      <StudentDesk active={speakingId === 'juozas'} successCount={juozasSuccessCount} />
    </div>
  );
}
