import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LessonEditor = ({ initialData, onSave, onCancel }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    id: initialData.id,
    title: initialData.title || '',
    type: initialData.type || 'lesson',
    contentPayload: initialData.contentPayload || {
      story: '',
      image: '',
      points: [],
      dialogue: [],
      tprsStory: [],
      syntheticSimulations: []
    }
  });

  const handleSave = async () => {
    try {
      const resp = await fetch('http://localhost:5001/api/material', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-email': user.email
        },
        body: JSON.stringify({ 
          ...formData, 
          editorId: user.id 
        })
      });
      if (resp.ok) onSave();
      else alert('Save failed');
    } catch (err) {
      console.error(err);
      alert('Error saving');
    }
  };

  const updatePayload = (key, value) => {
    setFormData(prev => ({
      ...prev,
      contentPayload: { ...prev.contentPayload, [key]: value }
    }));
  };

  const addItem = (key, template) => {
    const list = [...(formData.contentPayload[key] || [])];
    list.push(template);
    updatePayload(key, list);
  };

  const removeItem = (key, index) => {
    const list = [...(formData.contentPayload[key] || [])];
    list.splice(index, 1);
    updatePayload(key, list);
  };

  const updateItem = (key, index, field, value) => {
    const list = [...(formData.contentPayload[key] || [])];
    list[index] = { ...list[index], [field]: value };
    updatePayload(key, list);
  };

  return (
    <div className="max-app-container py-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onCancel} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Grįžti į Studio
        </button>
        <div className="flex gap-4">
          <button onClick={onCancel} className="px-6 py-2 text-slate-400 font-bold hover:text-slate-600">Atšaukti</button>
          <button 
            onClick={handleSave}
            className="px-8 py-2 bg-eng-blue text-white rounded-xl font-bold hover:shadow-lg transition-all"
          >
            Išsaugoti pakeitimus
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 bg-slate-50 border-r border-slate-100 p-6 flex flex-col gap-2">
          <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} label="Bendra informacija" icon="📝" />
          <TabButton active={activeTab === 'dialogue'} onClick={() => setActiveTab('dialogue')} label="Dialogas" icon="💬" />
          <TabButton active={activeTab === 'tprs'} onClick={() => setActiveTab('tprs')} label="TPRS Istorija" icon="📖" />
          <TabButton active={activeTab === 'sim'} onClick={() => setActiveTab('sim')} label="Simuliacijos" icon="🎭" />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto max-h-[800px]">
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Pamokos Pavadinimas</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-eng-blue focus:bg-white rounded-xl outline-none transition-all font-bold text-lg"
                  placeholder="pvz. 1 Pamoka: Veiksmažodžiai"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Iliustracijos URL</label>
                <input 
                  type="text" 
                  value={formData.contentPayload.image || ''}
                  onChange={(e) => updatePayload('image', e.target.value)}
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-eng-blue focus:bg-white rounded-xl outline-none transition-all font-mono text-sm"
                  placeholder="/images/lessons/lesson_X.png"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Teorijos Istorija (Intro)</label>
                <textarea 
                  value={formData.contentPayload.story || ''}
                  onChange={(e) => updatePayload('story', e.target.value)}
                  rows="6"
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-eng-blue focus:bg-white rounded-xl outline-none transition-all font-medium leading-relaxed"
                  placeholder="Aprašykite pamokos kontekstą..."
                />
              </div>
            </div>
          )}

          {activeTab === 'dialogue' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <h3 className="text-xl font-black tracking-tight mb-4">Pagrindinis dialogas</h3>
               {(formData.contentPayload.dialogue || []).map((line, idx) => (
                 <div key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl relative group">
                    <div className="flex-1 space-y-3">
                      <input 
                        type="text" 
                        value={line.speaker} 
                        placeholder="Kalba..."
                        onChange={(e) => updateItem('dialogue', idx, 'speaker', e.target.value)}
                        className="bg-transparent font-black text-eng-blue outline-none w-full"
                      />
                      <input 
                        type="text" 
                        value={line.text} 
                        placeholder="Tekstas angliškai"
                        onChange={(e) => updateItem('dialogue', idx, 'text', e.target.value)}
                        className="w-full bg-white p-2 rounded border border-slate-100 outline-none" 
                      />
                      <input 
                        type="text" 
                        value={line.translation} 
                        placeholder="Vertimas"
                        onChange={(e) => updateItem('dialogue', idx, 'translation', e.target.value)}
                        className="w-full bg-white p-2 rounded border border-slate-100 italic text-slate-500 outline-none" 
                      />
                    </div>
                    <button onClick={() => removeItem('dialogue', idx)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-eng-red transition-all">✕</button>
                 </div>
               ))}
               <button 
                onClick={() => addItem('dialogue', { speaker: '', text: '', translation: '' })}
                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-eng-blue hover:text-eng-blue transition-all"
               >
                 + Pridėti dialogo eilutę
               </button>
            </div>
          )}

          {activeTab === 'tprs' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <h3 className="text-xl font-black tracking-tight mb-4">TPRS Istorijos segmentai</h3>
               {(formData.contentPayload.tprsStory || []).map((segment, idx) => (
                 <div key={idx} className="bg-slate-50 p-6 rounded-3xl space-y-4 relative group">
                    <textarea 
                      value={segment.text} 
                      placeholder="Istorijos tekstas (EN)"
                      onChange={(e) => updateItem('tprsStory', idx, 'text', e.target.value)}
                      className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-eng-blue h-24"
                    />
                    <textarea 
                      value={segment.translation} 
                      placeholder="Vertimas (LT)"
                      onChange={(e) => updateItem('tprsStory', idx, 'translation', e.target.value)}
                      className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-eng-blue h-24 italic text-slate-500"
                    />
                    <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-2">
                       <p className="text-[10px] font-black uppercase text-slate-300">Interaktyvus klausimas</p>
                       <input 
                          type="text" 
                          value={segment.check?.question || ''} 
                          placeholder="Klausimas..."
                          onChange={(e) => {
                            const list = [...formData.contentPayload.tprsStory];
                            list[idx].check = { ...list[idx].check, question: e.target.value };
                            updatePayload('tprsStory', list);
                          }}
                          className="w-full font-bold outline-none"
                       />
                    </div>
                    <button onClick={() => removeItem('tprsStory', idx)} className="absolute -right-2 -top-2 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center text-slate-300 hover:text-eng-red opacity-0 group-hover:opacity-100 transition-all">✕</button>
                 </div>
               ))}
               <button 
                onClick={() => addItem('tprsStory', { text: '', translation: '', check: { question: '', answer: '', choices: [] } })}
                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-eng-blue hover:text-eng-blue transition-all"
               >
                 + Pridėti istorijos segmentą
               </button>
            </div>
          )}
          
          {activeTab === 'sim' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <h3 className="text-xl font-black tracking-tight mb-4">Synthetic Classroom simuliacijos</h3>
               <div className="bg-amber-50 text-amber-700 p-4 rounded-xl border border-amber-100 text-sm font-medium">
                 Šiuo metu simuliacijas rekomenduojama redaguoti atsargiai, laikantis standardinės `speaker` (teacher, jonas, alisa, juozas) struktūros.
               </div>
               {(formData.contentPayload.syntheticSimulations || []).map((sim, idx) => (
                 <div key={idx} className="border-2 border-slate-50 p-6 rounded-3xl space-y-4">
                    <input 
                      type="text" 
                      value={sim.title} 
                      placeholder="Simuliacijos pavadinimas"
                      onChange={(e) => {
                        const list = [...formData.contentPayload.syntheticSimulations];
                        list[idx].title = e.target.value;
                        updatePayload('syntheticSimulations', list);
                      }}
                      className="text-lg font-black tracking-tight w-full outline-none text-eng-blue"
                    />
                    <p className="text-xs text-slate-400 italic">Redagavimas apribotas v1 versijoje.</p>
                 </div>
               ))}
               <button 
                onClick={() => addItem('syntheticSimulations', { title: 'Nauja simuliacija', steps: [] })}
                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-eng-blue hover:text-eng-blue transition-all"
               >
                 + Pridėti simuliaciją
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
      active ? 'bg-eng-blue text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-white hover:text-eng-blue'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span className="text-sm truncate">{label}</span>
  </button>
);

export default LessonEditor;
