import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginOverlay = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await login(email);
    } catch (err) {
      setError('Nepavyko prisijungti. Patikrinkite el. paštą.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-eng-blue/90 backdrop-blur-md p-6">
      <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl transform transition-all duration-500 scale-105 border-4 border-eng-red/10">
        <div className="text-center mb-8">
          <div className="inline-block bg-eng-blue text-white px-3 py-1 rounded text-xl font-black mb-4">EN</div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-800">LtEng<span className="text-eng-red">_26</span></h1>
          <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-xs">Mokymosi platforma</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">El. pašto adresas</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pavyzdys@pastas.lt"
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-800 focus:border-eng-blue outline-none transition-colors"
              required
            />
          </div>

          {error && <p className="text-eng-red text-xs font-black uppercase text-center">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-800 text-white rounded-2xl py-4 font-black shadow-lg hover:bg-eng-red transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50"
          >
            {isSubmitting ? 'JUNGIAMASI...' : 'PRADĖTI MOKYTIS'}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
          Įveskite el. paštą, kad sistema galėtų sekti<br/> jūsų progresą ir pritaikyti temas.
        </p>
      </div>
    </div>
  );
};

export default LoginOverlay;
