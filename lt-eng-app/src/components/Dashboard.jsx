import React, { useState } from 'react';
import { languageConfig } from '../config/languageConfig';
import { useAuth } from '../contexts/AuthContext';
import VerificationDashboard from './VerificationDashboard';
import { LayoutDashboard, GraduationCap, Settings } from 'lucide-react';

export default function Dashboard({ lessons, onSelectLesson, onSelectMatrix }) {
  const { user, hasRole } = useAuth();
  const [view, setView] = useState('student'); // 'student' or 'creator'
  const isCreator = hasRole('CREATOR');

  if (isCreator && view === 'creator') {
    return (
      <div className="max-app-container py-12 animate-in">
        <header className="mb-12 flex justify-between items-center bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border-b-8 border-slate-950">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              Savininko<span className="text-eng-red">_SKYDELIS</span>
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Sveiki sugrįžę, Juozai</p>
          </div>
          <button 
            onClick={() => setView('student')}
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-black transition-all flex items-center gap-3 backdrop-blur-md border border-white/10"
          >
            <GraduationCap size={20} />
            MOKINIO VAIZDAS
          </button>
        </header>
        <VerificationDashboard />
      </div>
    );
  }

  return (
    <div className="max-app-container py-12 animate-in">
      <header className="mb-12 flex justify-between items-end">
        <div className="text-center md:text-left">
          <h1 className="text-6xl font-black text-eng-blue mb-4 tracking-tighter uppercase italic">
            Lt-{languageConfig.targetLang.split('-')[0]}<span className="text-eng-red">_26</span>
          </h1>
          <p className="text-xl text-slate-600 font-bold opacity-90">{languageConfig.dashboard.methodTitle} {languageConfig.targetLangName} kalbai</p>
        </div>
        
        {isCreator && (
          <button 
            onClick={() => setView('creator')}
            className="mb-4 bg-eng-blue hover:bg-slate-900 text-white px-6 py-3 rounded-2xl font-black transition-all flex items-center gap-3 shadow-xl border-b-4 border-blue-900"
          >
            <LayoutDashboard size={20} />
            VALDYMAS
          </button>
        )}
      </header>

      <div className="grid grid-cols-1 gap-8 items-start mb-16">
        {/* Main Interaction Area */}
        <div>
           <div 
             onClick={onSelectMatrix}
             className="premium-card group bg-eng-red p-10 rounded-3xl cursor-pointer shadow-[0_20px_50px_rgba(204,0,0,0.3)] flex flex-col md:flex-row items-center gap-8 border-b-8 border-red-900"
           >
             <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md">
                <span className="text-6xl">🇬🇧</span>
             </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-5xl font-black text-white mb-2 tracking-tight">{languageConfig.dashboard.matrixTitle}</h2>
                <p className="text-amber-50 text-xl font-bold drop-shadow-sm">{languageConfig.dashboard.matrixSubtitle}</p>
              </div>
             <div className="bg-white text-eng-red px-10 py-4 rounded-full font-black text-lg group-hover:bg-eng-blue group-hover:text-white transition-all shadow-xl">
               {languageConfig.dashboard.startTraining}
             </div>
           </div>
        </div>
      </div>

      {/* Sidebar / Secondary options */}
      <div className="w-full">
        <h2 className="text-3xl font-black text-eng-blue mb-8 px-2 flex items-center gap-4">
          <span className="w-12 h-1 bg-eng-red inline-block"></span>
          PAMOKOS
        </h2>
        <div className="grid adaptive-grid gap-6">
            {lessons.map((lesson) => (
              <div 
                key={lesson.id}
                onClick={() => onSelectLesson(lesson)}
                className="glass-card premium-card p-6 rounded-2xl cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-eng-blue text-white w-10 h-10 flex items-center justify-center rounded-xl font-black text-xs">
                    {lesson.id}
                  </span>
                  <img 
                    src={lesson.image} 
                    alt={lesson.theory.title}
                    className="w-16 h-16 object-cover rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300 border-2 border-white"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Eng'; }}
                  />
                </div>
                <h3 className="text-xl font-black text-slate-800 leading-tight mb-2 uppercase tracking-tight">
                  {lesson.theory.title}
                </h3>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
                  <div className="bg-eng-red h-full w-0 group-hover:w-full transition-all duration-700"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
