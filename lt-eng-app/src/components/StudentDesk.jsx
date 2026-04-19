import React from 'react';
import { AnimatePresence } from 'framer-motion';

export default function StudentDesk({ active, successCount }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div 
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl z-[150] px-4"
        >
          <div className="relative h-40 md:h-56 mic-hud-premium rounded-t-[5rem] overflow-hidden border-t-2 border-white/10">
            {/* Top Glow */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            
            {/* Desk Content */}
            <div className="absolute top-8 inset-x-12 flex justify-between items-start">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-blue-400/50 uppercase tracking-[0.4em] mb-2">STUDENT_SESSION_ACTIVE</span>
                  <div className="flex items-center gap-4">
                     <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black shadow-2xl rotate-3">J</div>
                        <div className="absolute -inset-1 bg-blue-500/20 blur-md rounded-2xl animate-pulse"></div>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-2xl font-black italic tracking-tighter text-white uppercase">Juozas</span>
                        <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">Level 1 - Beginner</span>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">CONSTRUCTION_SUCCESS</span>
                  <div className="flex gap-2">
                     {[...Array(8)].map((_, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ scaleY: 0.2 }}
                          animate={{ scaleY: i < successCount ? 1 : 0.2 }}
                          className={`w-2.5 h-8 rounded-full origin-bottom transition-all duration-500 ${i < successCount ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]' : 'bg-white/5'}`}
                        ></motion.div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Central Mic Visualizer */}
            <div className="absolute inset-x-0 bottom-12 flex items-center justify-center gap-1.5 h-12">
               {[...Array(15)].map((_, i) => (
                 <motion.div 
                    key={i}
                    animate={{ 
                      height: [10, 20 + (i * 7) % 40, 10],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 0.5 + ((i * 3) % 10) / 10,
                      ease: "easeInOut" 
                    }}
                    className="w-1 bg-blue-500/40 rounded-full"
                 />
               ))}
               <div className="mx-6 relative">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)]">
                     <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                  </div>
                  <div className="absolute -inset-4 border-2 border-blue-500/20 rounded-full animate-ping"></div>
               </div>
               {[...Array(15)].map((_, i) => (
                 <motion.div 
                    key={i}
                    animate={{ 
                      height: [10, 20 + (i * 7) % 40, 10],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 0.5 + ((i * 3) % 10) / 10,
                      ease: "easeInOut" 
                    }}
                    className="w-1 bg-blue-500/40 rounded-full"
                 />
               ))}
            </div>
            
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
