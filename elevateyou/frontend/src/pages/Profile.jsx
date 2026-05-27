import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Award, Flame, Zap, History, Edit3, Save, X, Trash2, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../api/config';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ scans: 0, quizzes: 0 });
  const [history, setHistory] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', level: '' });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`${API_BASE_URL}/api/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data.user);
      setStats(res.data.stats);
      setEditData({ name: res.data.user.name, level: res.data.user.level });

      const scanRes = await axios.get(`${API_BASE_URL}/api/outfit/history/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(scanRes.data);

      const progressRes = await axios.get(`${API_BASE_URL}/api/trainer/progress/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuizHistory(progressRes.data.quizHistory);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
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

  if (loading) return (
    <div className="h-[80vh] flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Profile Card */}
      <div className="glass p-8 md:p-12 rounded-[3.5rem] mb-12 relative overflow-hidden">
         {/* Background glow */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -z-10"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[100px] -z-10"></div>

         <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            <div className="relative group">
               <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-violet-600 p-1">
                  <div className="w-full h-full rounded-[2.3rem] bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                     <User size={64} className="text-indigo-500" />
                  </div>
               </div>
               <motion.div 
                 initial={{ scale: 0 }} 
                 animate={{ scale: 1 }} 
                 className="absolute -bottom-2 -right-2 w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-xl border-2 border-indigo-500"
               >
                  <Award className="text-yellow-500" size={24} />
               </motion.div>
            </div>

            <div className="flex-1 text-center md:text-left">
               <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <div>
                     {isEditing ? (
                        <input 
                           value={editData.name} 
                           onChange={(e) => setEditData({...editData, name: e.target.value})}
                           className="text-4xl font-black bg-slate-100 dark:bg-slate-800/50 rounded-xl px-4 py-2 outline-none border-2 border-indigo-500/30"
                        />
                     ) : (
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter">{user.name}</h1>
                     )}
                     <p className="text-slate-400 mt-2 flex items-center justify-center md:justify-start">
                        <Mail size={16} className="mr-2" /> {user.email}
                     </p>
                  </div>
                  
                  <div className="flex gap-3 justify-center">
                    {isEditing ? (
                       <>
                        <button onClick={handleUpdate} className="px-6 py-3 bg-green-500 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-green-500/20 active:scale-95 transition-all">
                           <Save size={18} /> <span>Save</span>
                        </button>
                        <button onClick={() => setIsEditing(false)} className="px-6 py-3 glass rounded-2xl font-bold text-red-500 flex items-center gap-2 active:scale-95 transition-all">
                           <X size={18} /> <span>Cancel</span>
                        </button>
                       </>
                    ) : (
                       <button onClick={() => setIsEditing(true)} className="px-6 py-3 glass rounded-2xl font-bold text-indigo-600 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all">
                          <Edit3 size={18} /> <span>Edit Profile</span>
                       </button>
                    )}
                  </div>
               </div>

               <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <Badge icon={<Flame size={16} />} text={`${user.streak} Day Streak`} color="orange" />
                  <Badge icon={<Zap size={16} />} text={user.level} color="indigo" />
                  <Badge icon={<Award size={16} />} text="Silver Rank" color="cyan" />
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Stats Cards */}
         <div className="lg:col-span-1 space-y-6">
            <div className="grid grid-cols-2 gap-4">
               <StatCard title="Scans" value={stats.scans} icon={<Zap size={20} />} trend="+3 this week" color="cyan" />
               <StatCard title="Quizzes" value={stats.quizzes} icon={<TrendingUp size={20} />} trend="+12 XP" color="violet" />
            </div>

            <div className="glass p-8 rounded-[2.5rem]">
               <h3 className="text-lg font-bold mb-6 flex items-center">
                  <TrendingUp className="mr-2 text-indigo-500" size={20} />
                  Skill Progression
               </h3>
               <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={quizHistory.length > 0 ? quizHistory.map(q => ({ name: new Date(q.date).toLocaleDateString(), score: q.score })) : [{name: 'Empty', score: 0}]}>
                        <defs>
                           <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                        <XAxis dataKey="name" hide />
                        <YAxis hide domain={[0, 10]} />
                        <Tooltip 
                           contentStyle={{ borderRadius: '16px', background: 'rgba(255,255,255,0.9)', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                        />
                        <Area type="monotone" dataKey="score" stroke="#6366f1" fillOpacity={1} fill="url(#colorScore)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
               <p className="text-[10px] text-slate-400 mt-4 text-center font-bold uppercase tracking-[0.2em]">Live Learning Curve</p>
            </div>
         </div>

         {/* History Panel */}
         <div className="lg:col-span-2 glass rounded-[2.5rem] p-8 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold flex items-center">
                  <History className="mr-3 text-indigo-500" />
                  Recent Scan History
               </h3>
               <button className="text-xs font-black text-indigo-500 uppercase tracking-widest hover:underline">View All</button>
            </div>

            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 no-scrollbar">
               {history.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-400 opacity-80 glass rounded-3xl border-dashed border-2 border-slate-200 dark:border-slate-800">
                     <Zap size={48} className="mb-4 text-indigo-500 animate-pulse" />
                     <p className="font-bold tracking-tight">No scans found yet.</p>
                     <Link to="/scanner" className="mt-4 text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Start your first scan</Link>
                  </div>
               ) : history.map((scan, i) => (
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ delay: i * 0.1 }}
                    key={scan._id} 
                    className="flex items-center justify-between p-5 glass bg-white/50 dark:bg-slate-800/20 rounded-2xl group hover:scale-[1.01] transition-all"
                  >
                     <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xs ${
                           scan.inputType === 'image' ? 'bg-cyan-100 text-cyan-600' : 'bg-violet-100 text-violet-600'
                        }`}>
                           {scan.inputType === 'image' ? 'IMG' : 'TXT'}
                        </div>
                        <div>
                           <h4 className="font-bold flex items-center gap-2">
                              {scan.event} 
                              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">{new Date(scan.date).toLocaleDateString()}</span>
                           </h4>
                           <p className="text-xs text-slate-400 flex items-center mt-1">
                              Score: <span className="text-indigo-600 font-black ml-1">{scan.aiResponse.score}</span> / 10
                           </p>
                        </div>
                     </div>
                     <button className="p-2 glass rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight size={18} className="text-slate-400" />
                     </button>
                  </motion.div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

const Badge = ({ icon, text, color }) => {
  const colors = {
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    cyan: 'bg-cyan-50 text-cyan-600 border-cyan-200'
  };
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all hover:scale-105 cursor-pointer ${colors[color]}`}>
       {icon}
       <span>{text}</span>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, color }) => {
  const colors = {
     cyan: 'from-cyan-500 to-blue-600 shadow-cyan-500/20',
     violet: 'from-violet-500 to-indigo-600 shadow-violet-500/20'
  }
  return (
    <div className={`glass p-6 rounded-[2rem] border-transparent hover:border-indigo-500/20 transition-all`}>
       <div className="flex items-center justify-between mb-4">
          <div className="text-slate-400 capitalize">{title}</div>
          <div className="text-indigo-500">{icon}</div>
       </div>
       <div className="text-3xl font-black mb-2">{value}</div>
       <div className="text-[10px] font-black text-indigo-500/70 uppercase tracking-widest">{trend}</div>
    </div>
  );
};

export default Profile;
