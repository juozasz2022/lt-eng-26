import React, { useState, useEffect } from 'react';
import { Database, Layout, BarChart, List } from 'lucide-react';
import LessonEditor from './LessonEditor';
import VerificationDashboard from './VerificationDashboard';
import { languageConfig } from '../config/languageConfig';
import { useAuth } from '../contexts/AuthContext';

const StudioView = () => {
  const { user } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [status, setStatus] = useState('');
  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons', 'analytics'

  const fetchMaterials = async () => {
    try {
      const resp = await fetch('http://localhost:5001/api/material');
      const data = await resp.json();
      setMaterials(data);
    } catch {
      console.error('Failed to fetch materials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleSeed = async () => {
    setStatus('Migrating static lessons to DB...');
    try {
       // We import the static content to send it to the seed endpoint
       const { lessonsContent } = await import('../data/lessonsContent');
       const resp = await fetch('http://localhost:5001/api/material/seed', {
         method: 'POST',
         headers: { 
           'Content-Type': 'application/json',
           'x-user-email': user.email
         },
         body: JSON.stringify({ lessons: lessonsContent })
       });
       const data = await resp.json();
       setStatus(`Success: ${data.count} lessons migrated.`);
       fetchMaterials();
    } catch {
       setStatus('Seed failed. See console.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await fetch(`http://localhost:5001/api/material/${id}`, {
        method: 'DELETE',
        headers: { 'x-user-email': user.email }
      });
      fetchMaterials();
    } catch {
      alert('Delete failed');
    }
  };

  if (editingItem) {
    return (
      <LessonEditor 
        initialData={editingItem} 
        onSave={() => { setEditingItem(null); fetchMaterials(); }}
        onCancel={() => setEditingItem(null)}
      />
    );
  }

  return (
    <div className="max-app-container py-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end mb-8 border-b-2 border-slate-100 pb-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">{languageConfig.studioUI.title}</h1>
          <p className="text-slate-500 font-medium">{languageConfig.studioUI.subtitle}</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleSeed}
            className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold hover:bg-slate-200 transition-all text-sm"
          >
            {languageConfig.studioUI.syncStatic}
          </button>
          <button 
            onClick={() => setEditingItem({ id: `${Date.now()}`, type: 'lesson', title: 'Nauja pamoka', contentPayload: {} })}
            className="px-6 py-2 bg-eng-blue text-white rounded-lg font-bold hover:shadow-lg hover:shadow-blue-200 transition-all"
          >
            {languageConfig.studioUI.newLesson}
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-3 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'analytics' ? 'bg-eng-blue text-white shadow-xl' : 'bg-white text-slate-400 hover:text-slate-600 shadow-sm'}`}
          >
            <BarChart size={18} />
            {languageConfig.studioUI.qaAnalytics}
          </button>
        </div>
      </div>

      {status && (
        <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-xl font-bold border border-blue-100 flex justify-between items-center">
          {status}
          <button onClick={() => setStatus('')} className="text-blue-300 hover:text-blue-500">✕</button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-eng-blue rounded-full animate-spin"></div>
        </div>
      ) : activeTab === 'analytics' ? (
        <VerificationDashboard />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 px-2 py-1 rounded text-slate-400">
                  {item.type} #{item.id}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setEditingItem(item)} className="p-2 text-slate-400 hover:text-eng-blue transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-eng-red transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-2 truncate">{item.title}</h3>
              <p className="text-slate-500 text-sm line-clamp-2 mb-6">
                {item.contentPayload.story || 'No description provided.'}
              </p>
              <button 
                onClick={() => setEditingItem(item)}
                className="w-full py-3 bg-slate-50 text-slate-600 rounded-xl font-bold group-hover:bg-eng-blue group-hover:text-white transition-all text-sm"
              >
                {languageConfig.studioUI.editContent}
              </button>
            </div>
          ))}

          {materials.length === 0 && (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold mb-4 text-xl">No materials in database yet.</p>
                <button onClick={handleSeed} className="text-eng-blue font-black underline underline-offset-4">Run Migration</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudioView;
