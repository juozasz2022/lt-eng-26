import React from 'react';
import { useSettings, PROFILES } from '../contexts/SettingsContext';

export default function SettingsModal({ onClose }) {
  const { 
    currentProfile, applyProfile, isModified,
    deviceMode, setDeviceMode,
    fontScale, setFontScale, 
    speechRate, setSpeechRate,
    highContrast, setHighContrast,
    pauseOnHover, setPauseOnHover,
    repeatSegment, setRepeatSegment
  } = useSettings();

  const ModifiedBadge = ({ keyName, value }) => {
    if (!isModified(keyName, value)) return null;
    return (
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 text-[8px] items-center justify-center font-black text-white">M</span>
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100] backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-2xl w-full border-b-[8px] border-eng-red relative overflow-y-auto max-h-[95vh]">
         {/* Close Button X */}
         <button onClick={onClose} className="absolute top-6 right-6 text-slate-300 hover:text-eng-red cursor-pointer transition-colors p-2 hover:bg-slate-50 rounded-full">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
         </button>

         <h2 className="text-3xl text-eng-blue font-black mb-1 tracking-tighter italic uppercase">Nustatymai</h2>
         <p className="text-xs text-slate-400 font-bold mb-6 uppercase tracking-widest">Premium Klasės Konfigūracija</p>

         {/* 1. PRESET PROFILES */}
         <div className="mb-8 bg-slate-50 p-6 rounded-3xl border-2 border-slate-100">
            <h3 className="text-[10px] font-black text-eng-blue uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-eng-blue rounded-full"></span>
              Nustatymų Profiliai
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(PROFILES).map(([key, prof]) => (
                <button 
                  key={key}
                  onClick={() => applyProfile(key)}
                  className={`py-4 px-2 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-wider ${currentProfile === key ? 'bg-eng-blue text-white border-eng-blue shadow-lg scale-105' : 'bg-white text-slate-500 border-white hover:border-slate-200'}`}
                >
                  {prof.label}
                </button>
              ))}
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* CATEGORY: TECHNICAL ENVIRONMENT */}
            <div className="bg-slate-50 p-5 rounded-3xl border-2 border-slate-100 flex flex-col h-full">
                <h3 className="text-[10px] font-black text-eng-blue uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-eng-blue rounded-full"></span>
                  Techninė aplinka
                </h3>
                <div className="grid grid-cols-2 gap-2 flex-1">
                  {[
                    { label: 'PC Didelis', val: 'pc_large', icon: '🖥️' },
                    { label: 'PC Standartas', val: 'pc_standard', icon: '💻' },
                    { label: 'Planšetė', val: 'tablet', icon: '📱' },
                    { label: 'Mobilus', val: 'mobile', icon: '🤳' }
                  ].map((d) => (
                    <button 
                      key={d.val}
                      onClick={() => setDeviceMode(d.val)} 
                      className={`relative flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${deviceMode === d.val ? 'bg-white text-eng-blue border-eng-blue shadow-md scale-105 z-10' : 'bg-white/50 text-slate-400 border-transparent hover:border-slate-200'}`}
                    >
                      <ModifiedBadge keyName="lt_eng_device_mode" value={d.val} />
                      <span className="text-2xl mb-1">{d.icon}</span>
                      <span className="text-[8px] font-black uppercase text-center leading-tight">{d.label}</span>
                    </button>
                  ))}
                </div>
            </div>

            {/* CATEGORY: PERSONAL ACCESSIBILITY */}
            <div className="bg-blue-50/50 p-5 rounded-3xl border-2 border-blue-100 flex flex-col h-full">
                <h3 className="text-[10px] font-black text-eng-red uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-eng-red rounded-full"></span>
                  Šrifto dydis
                </h3>
                <div className="grid grid-cols-2 gap-2 flex-1">
                  {[
                    { label: 'Normalus', val: '100%', icon: '👤' },
                    { label: 'Didelis', val: '120%', icon: '👓' },
                    { label: 'Labai didelis', val: '140%', icon: '🐘' },
                    { label: 'Milžiniškas', val: '160%', icon: '🦖' }
                  ].map((s) => (
                    <button 
                      key={s.val}
                      onClick={() => setFontScale(s.val)} 
                      className={`relative flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${fontScale === s.val ? 'bg-white border-eng-red text-eng-red shadow-md scale-105 z-10' : 'bg-white/50 text-slate-400 border-transparent hover:border-slate-200'}`}
                    >
                      <ModifiedBadge keyName="lt_eng_font_scale" value={s.val} />
                      <span className="text-2xl mb-1">{s.icon}</span>
                      <span className="text-[8px] font-black uppercase text-center leading-tight">{s.label}</span>
                    </button>
                  ))}
                </div>
            </div>
         </div>

         {/* TTS & BEHAVIOR SUPPORT */}
         <div className="bg-slate-900 text-white p-6 rounded-[2.5rem] mb-8 shadow-xl border-t-4 border-eng-red">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Hearing / TTS / Colors */}
                <div className="space-y-6">
                   <div>
                     <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Kalbėjimo greitis</label>
                     <div className="flex bg-white/10 rounded-2xl p-1 gap-1">
                        {[
                          { label: 'V. Lėtas', value: 0.3, icon: '🧊' },
                          { label: 'Lėtas', value: 0.5, icon: '🐢' },
                          { label: 'Mokinio', value: 0.7, icon: '🎓' },
                          { label: 'Natūralus', value: 1.0, icon: '🇬🇧' }
                        ].map((opt) => (
                          <button 
                            key={opt.value}
                            onClick={() => setSpeechRate(opt.value)} 
                            className={`relative flex-1 flex flex-col items-center py-3 rounded-xl cursor-pointer transition-all ${speechRate === opt.value ? 'bg-white text-slate-900 shadow-md scale-105' : 'text-slate-500 hover:bg-white/5'}`}
                          >
                            <ModifiedBadge keyName="lt_eng_speech_rate" value={opt.value} />
                            <span className="text-3xl">{opt.icon}</span>
                            <span className="text-[7px] font-black uppercase mt-1 opacity-60 px-1 text-center">{opt.label}</span>
                          </button>
                        ))}
                     </div>
                   </div>

                   <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div>
                        <div className="text-[10px] font-black uppercase text-white tracking-widest">Matomumas</div>
                        <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Aukštas kontrastas</div>
                      </div>
                      <button 
                        onClick={() => setHighContrast(!highContrast)}
                        className={`w-24 h-10 rounded-full transition-all relative cursor-pointer border-2 flex items-center px-2 ${highContrast ? 'bg-green-600 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-slate-700 border-slate-600'}`}
                      >
                        <span className={`text-[10px] font-black tracking-widest transition-all ${highContrast ? 'opacity-100 ml-1 text-white' : 'opacity-0 ml-0 text-slate-400'}`}>TAIP</span>
                        <div className={`absolute top-1 w-7 h-7 rounded-full bg-white transition-all shadow-md flex items-center justify-center ${highContrast ? 'left-15' : 'left-1'}`}>
                          <div className={`w-3 h-3 rounded-full ${highContrast ? 'bg-green-600' : 'bg-slate-400'}`}></div>
                        </div>
                        <span className={`text-[10px] font-black tracking-widest ml-auto transition-all ${highContrast ? 'opacity-0 mr-0 text-white' : 'opacity-100 mr-1 text-slate-300'}`}>NE</span>
                      </button>
                   </div>
                </div>

                {/* Behaviors */}
                <div className="space-y-4">
                   <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Interakcijos režimas</label>
                   
                   <div className="space-y-2">
                     {[
                       { id: 'pauseOnHover', label: 'Sustoti užvedus', icon: '⏸️', state: pauseOnHover, setter: setPauseOnHover },
                       { id: 'repeatSegment', label: 'Kartoti segmentą', icon: '🔁', state: repeatSegment, setter: setRepeatSegment }
                     ].map(b => (
                        <button 
                          key={b.id}
                          onClick={() => b.setter(!b.state)}
                          className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${b.state ? 'bg-white border-white text-slate-900 shadow-md' : 'bg-white/5 border-white/10 text-slate-500'}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{b.icon}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">{b.label}</span>
                          </div>
                          <div className={`flex items-center gap-2 px-2 py-1 rounded-lg border text-[8px] font-black transition-all ${b.state ? 'bg-green-100 border-green-200 text-green-700' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                            {b.state ? 'TAIP' : 'NE'}
                            <div className={`w-2 h-2 rounded-full ${b.state ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-slate-600'}`}></div>
                          </div>
                        </button>
                     ))}
                   </div>
                </div>
            </div>
         </div>

         <button 
           onClick={onClose} 
           className="w-full py-5 bg-eng-blue text-white font-black rounded-3xl shadow-[0_10px_30px_rgba(0,36,125,0.4)] hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer uppercase tracking-[0.2em] text-sm"
         >
            IŠSAUGOTI NUSTATYMUS
         </button>
      </div>
    </div>
  );
}
