import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  User, Mail, Award, Flame, Zap, History, Edit3, Save, X, 
  Trash2, TrendingUp, Calendar, ArrowUpRight, LayoutDashboard, 
  Target, Sparkles, LogOut, Settings, Bell, ChevronRight
} from 'lucide-react';
import axios from 'axios';
// Test Comment
import { API_BASE_URL } from '../api/config';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ scans: 0, quizzes: 0 });
  const [history, setHistory] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);
  const [chartReady, setChartReady] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', level: 'Professional' });
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('overview'); // overview, history, settings
  const [historyFilter, setHistoryFilter] = useState('ALL');

  const fetchData = async () => {
    setLoading(true);
    const userId = localStorage.getItem('userId') || 'demo_user';
    const token = localStorage.getItem('token');
    
    const defaultUser = {
      name: localStorage.getItem('userName') || "User",
      email: "",
      streak: 0,
      level: "Starter",
      xp: 0,
      nextLevelXp: 1000
    };

    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/api/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser({ ...defaultUser, ...res.data.user });
      setStats(res.data.stats || { scans: 0, quizzes: 0 });
      setEditData({ name: res.data.user?.name || defaultUser.name, level: res.data.user?.level || defaultUser.level });

      const scanRes = await axios.get(`${API_BASE_URL}/api/outfit/history/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(scanRes.data || []);

      const progressRes = await axios.get(`${API_BASE_URL}/api/trainer/progress/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuizHistory(progressRes.data?.quizHistory || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setUser(defaultUser);
      setStats({ scans: 0, quizzes: 0 });
      setHistory([]);
      setQuizHistory([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setTimeout(() => setChartReady(true), 200); // Draw chart slightly after loading ends
      }, 500); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (!token) {
       setUser({...user, name: editData.name, level: editData.level});
       setIsEditing(false);
       return;
    }
    try {
      await axios.put(`${API_BASE_URL}/api/profile/${userId}`, editData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsEditing(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !user) return (
    <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin shadow-2xl"></div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 animate-pulse">Syncing Dashboard...</p>
     </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-32">
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
        <div className="flex items-center space-x-6">
           <div className="relative">
              <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-violet-600 p-1 rotate-3 hover:rotate-0 transition-transform shadow-2xl">
                 <div className="w-full h-full rounded-[1.8rem] bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                    <User size={32} className="text-indigo-500" />
                 </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-indigo-600 text-white rounded-xl flex items-center justify-center border-4 border-white dark:border-slate-950 shadow-lg">
                 <Sparkles size={14} />
              </div>
           </div>
           <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-indigo-500 mb-1">Welcome back,</p>
              <h1 className="text-4xl font-black tracking-tighter italic">{user.name}</h1>
           </div>
        </div>

        <div className="flex glass rounded-[2rem] p-1.5 border-indigo-500/5 shadow-xl">
           <NavPill active={activeView === 'overview'} onClick={() => setActiveView('overview')} icon={<LayoutDashboard size={16} />} label="Overview" />
           <NavPill active={activeView === 'history'} onClick={() => setActiveView('history')} icon={<History size={16} />} label="History" />
           <NavPill active={activeView === 'settings'} onClick={() => setActiveView('settings')} icon={<Settings size={16} />} label="Settings" />
        </div>
      </div>

      <AnimatePresence mode="wait">
         {activeView === 'overview' && (
           <motion.div
             key="overview"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="grid grid-cols-1 lg:grid-cols-12 gap-8"
           >
              {/* Main Progress Area */}
              <div className="lg:col-span-8 space-y-8">
                 {/* Level Progress Card */}
                 <div className="glass p-10 rounded-[3.5rem] border-indigo-500/5 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="flex flex-col md:flex-row gap-10 items-center">
                       <div className="relative text-center">
                          <div className="w-32 h-32 rounded-full border-8 border-indigo-100 dark:border-slate-800 flex items-center justify-center text-center">
                             <div>
                                <span className="text-3xl font-black text-indigo-600 tracking-tighter">{Math.round((user.xp / user.nextLevelXp) * 100)}%</span>
                                <p className="text-[8px] font-black uppercase text-slate-400">Progress</p>
                             </div>
                          </div>
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-[-10px] border-2 border-dashed border-indigo-500/20 rounded-full pointer-events-none" 
                          />
                       </div>
                       
                       <div className="flex-1 space-y-6 text-center md:text-left">
                          <div>
                             <h3 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-500 mb-2">Current Proficiency</h3>
                             <h2 className="text-5xl font-black tracking-tighter italic">{user.level}</h2>
                          </div>
                          
                          <div className="space-y-3">
                             <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <span>{user.xp} XP</span>
                                <span>Next: {user.nextLevelXp} XP</span>
                             </div>
                             <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
                                  transition={{ duration: 1.5, ease: 'easeOut' }}
                                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                                />
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Charts & Stats */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <DashboardCard title="Analytic Growth" icon={<TrendingUp size={18} />}>
                       <div className="h-[300px] w-full">
                         {chartReady && (
                                                       <ResponsiveContainer width="100%" height="100%" >
                              <AreaChart data={quizHistory.length > 0 ? quizHistory.map(q => ({ name: new Date(q.date).toLocaleDateString(), score: q.score })) : [{name: 'Start', score: 0}]}>
                                 <defs>
                                    <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                 </defs>
                                 <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.05} />
                                 <XAxis dataKey="name" hide />
                                 <YAxis hide domain={[0, 10]} />
                                 <Tooltip 
                                    contentStyle={{ borderRadius: '24px', background: 'rgba(255,255,255,0.95)', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '16px' }}
                                    itemStyle={{ fontWeight: '900', color: '#4f46e5' }}
                                 />
                                 <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorArea)" />
                              </AreaChart>
                           </ResponsiveContainer>
                         )}
                       </div>
                    </DashboardCard>

                    <div className="space-y-8">
                       <StatPill label="Total Scans" value={stats.scans} icon={<Zap size={20} />} trend="+4 this wk" />
                       <StatPill label="Quizzes Passed" value={stats.quizzes} icon={<Award size={20} />} trend="+12 XP" />
                       <StatPill label="Day Streak" value={user.streak} icon={<Flame size={20} />} trend="Global Top 5%" />
                    </div>
                 </div>
              </div>

              {/* Sidebar: Quick Actions & Recent */}
              <div className="lg:col-span-4 space-y-8">
                 <div className="glass p-10 rounded-[3.5rem] border-indigo-500/5 shadow-2xl bg-indigo-600 text-white relative overflow-hidden group">
                    <div className="absolute top-[-20px] left-[-20px] w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                    <h3 className="text-xl font-black italic mb-8">Elevate Your Skill</h3>
                    <div className="space-y-4">
                       <QuickActionLink to="/trainer" icon={<Target size={16} />} title="Practice Communication" />
                       <QuickActionLink to="/outfit-scanner" icon={<Zap size={16} />} title="Analyze New Outfit" />
                       <QuickActionLink to="/event-prep" icon={<Calendar size={16} />} title="Prepare for Event" />
                    </div>
                 </div>

                 <div className="glass p-10 rounded-[3.5rem] border-slate-100 dark:border-slate-800 shadow-2xl">
                    <h3 className="text-lg font-black italic mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                       {[...history.map(s => ({ ...s, type: "scan" })), ...quizHistory.map(q => ({ ...q, type: "quiz" }))].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,4).map((item, i) => (
                         <div key={i} className="flex items-center space-x-4 group">
                             <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${item.type === 'quiz' ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800'}`}>
                                {item.type === 'quiz' ? <Target size={16} className="text-purple-500" /> : <Sparkles size={16} className="text-indigo-500" />}
                             </div>
                             <div className="flex-1 overflow-hidden">
                                <p className="text-xs font-black truncate">{item.type === 'quiz' ? `${item.topic} Quiz` : `${item.event} Analysis`}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(item.date).toLocaleDateString()}</p>
                             </div>
                             <div className={`text-sm font-black ${item.type === 'quiz' ? 'text-purple-600' : 'text-indigo-600'}`}>
                               {item.type === 'quiz' ? `${item.score}%` : (item.aiResponse?.score || 8.2)}
                             </div>
                          </div>
                       ))}
                       <button onClick={() => setActiveView('history')} className="w-full py-4 glass text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border-slate-100 dark:border-slate-800">
                          VIEW ALL HISTORY →
                       </button>
                    </div>
                 </div>
              </div>
           </motion.div>
         )}

         {activeView === 'history' && (
           <motion.div
             key="history"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             className="glass p-12 md:p-20 rounded-[4rem] border-slate-100 dark:border-slate-800 shadow-2xl"
           >
              <div className="flex items-center justify-between mb-16">
                 <h2 className="text-4xl font-black italic tracking-tighter">Usage <span className="text-indigo-600">Chronology</span></h2>
                 <div className="flex space-x-2">
                    <button onClick={() => setHistoryFilter('ALL')} className={`px-6 py-2 text-xs font-black rounded-full transition-all ${historyFilter === 'ALL' ? 'bg-indigo-600 text-white shadow-lg' : 'glass'}`}>ALL</button>
                    <button onClick={() => setHistoryFilter('SCANS')} className={`px-6 py-2 text-xs font-black rounded-full transition-all ${historyFilter === 'SCANS' ? 'bg-indigo-600 text-white shadow-lg' : 'glass'}`}>SCANS</button>
                    <button onClick={() => setHistoryFilter('QUIZZES')} className={`px-6 py-2 text-xs font-black rounded-full transition-all ${historyFilter === 'QUIZZES' ? 'bg-indigo-600 text-white shadow-lg' : 'glass'}`}>QUIZZES</button>
                 </div>
              </div>

              <div className="space-y-6">
                 {[...history.map(s => ({ ...s, type: 'scan' })), ...quizHistory.map(q => ({ ...q, type: 'quiz' }))]
                    .filter(item => {
                       if (historyFilter === 'ALL') return true;
                       if (historyFilter === 'SCANS') return item.type === 'scan';
                       if (historyFilter === 'QUIZZES') return item.type === 'quiz';
                       return true;
                    })
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((item, i) => (
                    <div key={item._id} className="group flex flex-col md:flex-row md:items-center justify-between p-8 glass hover:bg-white dark:hover:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[2.5rem] transition-all hover:shadow-2xl">
                       <div className="flex items-center space-x-8">
                          <div className={`w-16 h-16 rounded-3xl flex items-center justify-center font-black text-[10px] shrink-0 group-hover:rotate-6 transition-transform ${
                             item.type === 'quiz' ? 'bg-purple-100 text-purple-600' : (item.inputType === 'image' ? 'bg-indigo-100 text-indigo-600' : 'bg-cyan-100 text-cyan-600')
                          }`}>
                             {item.type === 'quiz' ? 'QUIZ' : (item.inputType === 'image' ? 'VISION' : 'TEXT')}
                          </div>
                          <div>
                             <h4 className="text-xl font-black tracking-tight">{item.topic || item.event} {item.type === 'quiz' ? 'Mastery' : 'Prep'}</h4>
                             <div className="flex items-center space-x-3 mt-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full">{new Date(item.date).toDateString()}</span>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${((item.type === 'scan' ? item.aiResponse?.score : item.score / 10) || 0) > 7 ? 'text-green-500 bg-green-500/10' : 'text-amber-500 bg-amber-500/10'}`}>
                                   {item.type === 'scan' ? `Success Rating: ${item.aiResponse?.score || 0}/10` : `Training Score: ${item.score}/100`}
                                </span>
                             </div>
                          </div>
                       </div>
                       
                       <button className="mt-6 md:mt-0 p-4 rounded-2xl glass hover:bg-indigo-600 hover:text-white transition-all text-slate-400 group/btn">
                          <ArrowUpRight size={20} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                       </button>
                    </div>
                 ))}
                 
                 {(history.length === 0 && quizHistory.length === 0) && (
                    <div className="text-center py-20 p-12 glass rounded-[3rem] border-dashed border-2 border-slate-200 dark:border-slate-800">
                       <p className="text-indigo-600 font-black italic text-lg capitalize mb-2">No activity recorded yet</p>
                       <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Start an AI session to populate your feed!</p>
                    </div>
                 )}
              </div>
           </motion.div>
         )}

         {activeView === 'settings' && (
           <motion.div
             key="settings"
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 1.02 }}
             className="max-w-4xl mx-auto"
           >
              <div className="glass p-12 md:p-20 rounded-[4rem] border-slate-100 dark:border-slate-800 shadow-2xl space-y-12">
                 <div className="flex items-center justify-between">
                    <h2 className="text-4xl font-black italic tracking-tighter">Profile <span className="text-indigo-600">Configuration</span></h2>
                    {!isEditing && (
                       <button onClick={() => setIsEditing(true)} className="p-4 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all">
                          <Edit3 size={20} />
                       </button>
                    )}
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <SettingField label="Full Name" value={user.name} isEditing={isEditing} 
                      onChange={(e) => setEditData({...editData, name: e.target.value})} placeholder="Master AI" />
                    <SettingField label="Email Address" value={user.email} isEditing={false} />
                    <SettingField label="Experience Level" value={user.level} isEditing={isEditing} 
                      onChange={(e) => setEditData({...editData, level: e.target.value})} placeholder="Professional" isSelect />
                    <SettingField label="Notification Status" value="Active" isEditing={false} />
                 </div>

                 {isEditing && (
                    <div className="flex gap-4 pt-10">
                       <button onClick={handleUpdate} className="flex-1 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-sm tracking-widest shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all flex items-center justify-center space-x-3">
                          <ArrowUpRight size={18} />
                          <span>SAVE CHANGES</span>
                       </button>
                       <button onClick={() => setIsEditing(false)} className="flex-1 py-5 glass border-slate-100 dark:border-slate-800 rounded-[2rem] font-black text-sm tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center space-x-3">
                          <X size={18} />
                          <span>CANCEL</span>
                       </button>
                    </div>
                 )}

                 <div className="pt-12 border-t border-slate-100 dark:border-slate-800 space-y-8">
                    <h3 className="text-xl font-black italic">Sensitive Actions</h3>
                    <div className="flex flex-wrap gap-4">
                       <button className="px-10 py-5 bg-red-50 text-red-600 rounded-[2rem] font-black text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center space-x-3 group">
                          <Trash2 size={18} className="group-hover:animate-bounce" />
                          <span>DELETE ACCOUNT FOREVER</span>
                       </button>
                       <Link to="/" onClick={() => { localStorage.clear(); window.location.reload(); }} className="px-10 py-5 glass border-slate-100 rounded-[2rem] font-black text-xs tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center space-x-3">
                          <LogOut size={18} />
                          <span>SYSTEM LOGOUT</span>
                       </Link>
                    </div>
                 </div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

const NavPill = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`px-8 py-3.5 rounded-[1.8rem] text-sm font-black transition-all flex items-center space-x-3 ${active ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-500/20' : 'text-slate-400 hover:text-indigo-600'}`}
  >
     {icon}
     <span className="hidden md:inline uppercase tracking-widest text-[10px]">{label}</span>
  </button>
);

const DashboardCard = ({ title, icon, children }) => (
  <div className="glass p-10 rounded-[3.5rem] border-slate-100 dark:border-slate-800 shadow-2xl">
     <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-lg font-black italic">{title}</h3>
        <div className="text-indigo-600">{icon}</div>
     </div>
     {children}
  </div>
);

const StatPill = ({ label, value, icon, trend }) => (
  <div className="glass p-8 rounded-[2.5rem] border-slate-100 dark:border-slate-800 shadow-xl flex items-center justify-between hover:border-indigo-500/30 transition-all hover:scale-[1.02]">
     <div className="flex items-center space-x-5">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600/5 flex items-center justify-center text-indigo-600 shadow-inner">
           {icon}
        </div>
        <div>
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
           <h4 className="text-3xl font-black tracking-tighter">{value}</h4>
        </div>
     </div>
     <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 px-3 py-1.5 rounded-full">
        {trend}
     </div>
  </div>
);

const QuickActionLink = ({ to, icon, title }) => (
  <Link to={to} className="flex items-center justify-between p-5 bg-white/10 hover:bg-white/20 rounded-[2rem] transition-all group">
     <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
           {icon}
        </div>
        <span className="text-xs font-black tracking-tight">{title}</span>
     </div>
     <ChevronRight size={18} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
  </Link>
);

const SettingField = ({ label, value, isEditing, onChange, placeholder, isSelect }) => (
  <div className="space-y-4">
     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-4">{label}</label>
     {isEditing ? (
        isSelect ? (
           <select 
             className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 text-sm font-black outline-none focus:border-indigo-500 transition-all shadow-inner"
             onChange={onChange}
             defaultValue={value}
           >
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Professional">Professional</option>
           </select>
        ) : (
           <input 
             onChange={onChange}
             placeholder={placeholder}
             className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 text-sm font-black outline-none focus:border-indigo-500 transition-all shadow-inner"
             defaultValue={value}
           />
        )
     ) : (
        <div className="w-full p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl text-sm font-black opacity-60">
           {value}
        </div>
     )}
  </div>
);

export default Dashboard;
