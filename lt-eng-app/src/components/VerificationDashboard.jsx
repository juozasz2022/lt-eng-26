import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { Activity, Users, Award, AlertCircle, Clock } from 'lucide-react';

const VerificationDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sRes, aRes] = await Promise.all([
          fetch('http://localhost:5001/api/analytics/lesson-stats', {
            headers: { 'x-user-email': user.email }
          }),
          fetch('http://localhost:5001/api/analytics/recent-activity', {
            headers: { 'x-user-email': user.email }
          })
        ]);
        
        const sData = await sRes.json();
        const aData = await aRes.json();
        setStats(sData);
        setActivity(aData);
      } catch (err) {
        console.error('Failed to fetch analytics', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.email]);

  const chartData = stats.map(s => ({
    name: `L${s.entityId}`,
    success: s._avg.successRate,
    attempts: s._count.id
  }));

  if (loading) return <div className="p-20 text-center animate-pulse font-black text-slate-300">ANALIZING SYSTEM DATA...</div>;

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[2rem] shadow-xl border-l-8 border-eng-blue flex items-center gap-4">
          <div className="bg-blue-50 p-4 rounded-2xl text-eng-blue"><Activity size={24}/></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aktyvumas</p>
            <p className="text-2xl font-black">{activity.length} sesijų</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-xl border-l-8 border-eng-red flex items-center gap-4">
          <div className="bg-red-50 p-4 rounded-2xl text-eng-red"><Award size={24}/></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vid. Rezultatas</p>
            <p className="text-2xl font-black">
              {Math.round(chartData.reduce((acc, curr) => acc + curr.success, 0) / (chartData.length || 1))}%
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-xl border-l-8 border-amber-500 flex items-center gap-4">
          <div className="bg-amber-50 p-4 rounded-2xl text-amber-500"><Users size={24}/></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unikalūs vart.</p>
            <p className="text-2xl font-black">{new Set(activity.map(a => a.userId)).size}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-xl border-l-8 border-slate-900 flex items-center gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl text-slate-900"><Clock size={24}/></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Paskutinis įrašas</p>
            <p className="text-lg font-black">{activity[0]?.timestamp ? new Date(activity[0].timestamp).toLocaleTimeString() : 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl">
          <h3 className="text-lg font-black uppercase tracking-tighter mb-8 italic flex items-center gap-2">
            <span className="w-2 h-6 bg-eng-blue rounded-full"></span>
            Sėkmės koeficientas pagal pamokas
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 900}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 900}}
                />
                <Bar dataKey="success" fill="#003399" radius={[10, 10, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl">
          <h3 className="text-lg font-black uppercase tracking-tighter mb-8 italic flex items-center gap-2">
            <span className="w-2 h-6 bg-eng-red rounded-full"></span>
            Bandomieji tarimai (Attempts)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 900}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                   contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 900}}
                />
                <Area type="monotone" dataKey="attempts" stroke="#cc0000" fill="#fef2f2" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ACTIVITY TABLE */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-black uppercase tracking-tighter italic flex items-center gap-2">
            <AlertCircle className="text-slate-400" size={20}/>
            Paskutinė Veikla (History)
          </h3>
          <button className="text-[10px] font-black text-eng-blue uppercase tracking-widest hover:underline">Atsisiųsti LOG failą</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vartotojas</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Veiksmas</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID / Detalės</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rezultatas</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Laikas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {activity.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-6">
                    <p className="font-black text-slate-900">{item.user?.name || 'Anonymous'}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{item.user?.email}</p>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      item.actionType === 'LESSON_COMPLETION' ? 'bg-green-100 text-green-700' : 
                      item.actionType === 'PRONUNCIATION_TEST' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.actionType.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-6">
                    <p className="text-sm font-bold text-slate-700">{item.entityId}</p>
                    {item.notes && <p className="text-[10px] text-slate-400 mt-1 italic line-clamp-1">{item.notes}</p>}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full w-24 overflow-hidden">
                        <div className={`h-full ${item.successRate >= 70 ? 'bg-green-500' : item.successRate >= 30 ? 'bg-amber-500' : 'bg-slate-400'}`} style={{width: `${item.successRate}%`}}></div>
                      </div>
                      <span className="font-black text-xs text-slate-900">{item.successRate}%</span>
                    </div>
                  </td>
                  <td className="p-6 text-[10px] font-bold text-slate-400 uppercase">
                    {new Date(item.timestamp).toLocaleDateString()}<br/>
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default VerificationDashboard;
