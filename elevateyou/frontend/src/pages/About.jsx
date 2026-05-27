import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Users, Zap, Shield, Sparkles, Code, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { label: 'Event Types', value: '24+', icon: <Target size={20} /> },
    { label: 'Quiz Questions', value: '300+', icon: <Zap size={20} /> },
    { label: 'AI Modules', value: '3', icon: <Sparkles size={20} /> },
    { label: 'Prep Guides', value: '18', icon: <Users size={20} /> }
  ];

  const features = [
    { title: 'AI Style Analysis', desc: 'Advanced computer vision models that analyze clothing choices for event appropriateness.', icon: <Layout className="text-cyan-400" /> },
    { title: 'NLP Trainer', desc: 'Natural language processing for analyzing communication clarity and emotional tone.', icon: <MessageSquare className="text-indigo-400" /> },
    { title: 'Contextual Engine', desc: 'Proprietary logic that adapts advice based on unique cultural and professional scenarios.', icon: <Cpu className="text-violet-400" /> }
  ];

  return (
    <div className="relative overflow-hidden min-h-screen pb-20">
      <div className="orb w-[600px] h-[600px] bg-indigo-500/10 top-[-300px] right-[-100px]" />
      
      {/* Hero */}
      <section className="pt-24 pb-20 px-4 max-w-7xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           className="mb-8 p-1 px-4 glass rounded-full inline-flex items-center space-x-2 border-indigo-500/10 shadow-xl font-black text-[10px] uppercase tracking-[.3em] text-indigo-500"
        >
          <Sparkles size={14} /> <span>Our Mission</span>
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9] italic">
          Building Your <br />
          <span className="text-indigo-600 dark:text-cyan-400">Best Self</span>
        </h1>
        
        <p className="max-w-3xl text-xl text-slate-500 dark:text-slate-300 mx-auto leading-relaxed font-medium">
          ElevateU was born from a simple observation: students and young professionals often have the talent, but lack the preparation tools for critical life moments. We're bridging that gap with AI.
        </p>
      </section>

      {/* Stats */}
      <section className="px-4 max-w-7xl mx-auto mb-32">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="glass p-10 rounded-[3rem] text-center border-indigo-500/5 shadow-2xl relative group overflow-hidden"
               >
                  <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6 group-hover:scale-110 transition-transform shadow-inner">
                     {stat.icon}
                  </div>
                  <h3 className="text-4xl font-black mb-2 tracking-tighter">{stat.value}</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
               </motion.div>
            ))}
         </div>
      </section>

      {/* How it Works */}
      <section className="py-32 px-4 bg-slate-50/50 dark:bg-slate-900/20 border-y border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
           <div className="lg:w-1/2 space-y-8">
              <h2 className="text-5xl font-black tracking-tighter italic">How It <span className="text-indigo-600">Works?</span></h2>
              <p className="text-lg text-slate-500 dark:text-slate-300 font-medium leading-relaxed">
                 We've engineered a seamless integration of computer vision, language processing, and career coaching principles into a single, intuitive platform.
              </p>
              
              <div className="space-y-4">
                 {[
                   { t: "Style Extraction", d: "Photos are analyzed for colors, fit, and contextual appropriateness." },
                   { t: "Logic Mapping", d: "Insights are mapped against a library of 10,000+ professional etiquette rules." },
                   { t: "Real-time Feedback", d: "Results are delivered instantly with actionable next steps." }
                 ].map((step, i) => (
                    <div key={i} className="flex space-x-4 p-6 glass rounded-[2rem] border-indigo-500/5 hover:border-indigo-500/20 transition-all">
                       <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 font-black shrink-0">{i+1}</div>
                       <div>
                          <h4 className="font-black text-sm uppercase tracking-wider mb-1 text-slate-900 dark:text-white">{step.t}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-300 font-medium leading-relaxed">{step.d}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
           
           <div className="lg:w-1/2 relative">
               <div className="glass rounded-[4rem] p-6 shadow-2xl relative z-10 scale-95 hover:scale-100 transition-transform duration-700">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Tech Analysis" className="rounded-[3.5rem] opacity-80" />
                  <div className="absolute inset-0 bg-indigo-900/20 rounded-[3.5rem]" />
               </div>
               <div className="absolute top-[-40px] left-[-40px] w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl animate-pulse" />
           </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-32 px-4 max-w-7xl mx-auto text-center">
         <h2 className="text-4xl font-black mb-20 tracking-tighter italic">Powered By <span className="text-indigo-600">Advanced Tech</span></h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((f, i) => (
               <div key={i} className="space-y-6">
                  <div className="w-20 h-20 bg-indigo-600/10 rounded-[2.5rem] flex items-center justify-center text-indigo-600 mx-auto shadow-inner hover:rotate-6 transition-transform">
                     {f.icon}
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">{f.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-300 font-medium leading-relaxed max-w-[280px] mx-auto">{f.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* Join Section */}
      <section className="px-4 max-w-7xl mx-auto">
         <div className="glass p-16 md:p-24 rounded-[4rem] bg-indigo-600 text-white text-center space-y-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-800" />
            <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 space-y-8">
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] italic">Ready to <br />Elevate Yourself?</h2>
               <p className="text-lg font-medium opacity-80 max-w-2xl mx-auto">Join thousands of students building their confidence today.</p>
               <Link to="/register">
                 <button className="px-12 py-5 bg-white text-indigo-600 rounded-[2rem] font-black tracking-[.2em] text-sm shadow-2xl shadow-indigo-900/40 hover:scale-105 active:scale-95 transition-all outline-none">
                    JOIN THE PLATFORM
                 </button>
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
};

const MessageSquare = ({ className, size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);

const Layout = ({ className, size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="3" x2="21" y1="9" y2="9"></line><line x1="9" x2="9" y1="21" y2="9"></line></svg>
);

export default About;
