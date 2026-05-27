import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, ArrowRight, UserCheck, ShieldCheck, TrendingUp, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserCheck size={32} className="text-cyan-500" />,
      title: "1. Create Account",
      description: "Sign up in under 30 seconds to start building your profile and tracking your progress.",
      image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500"
    },
    {
      icon: <Target size={32} className="text-violet-500" />,
      title: "2. Choose Your Module",
      description: "Select from Outfit Scanner, Event Preparation, or AI Trainer based on your current need.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500"
    },
    {
      icon: <Bot size={32} className="text-pink-500" />,
      title: "3. Get AI Feedback",
      description: "Receive instant, tailored advice on your styling, communication, or event readiness.",
      image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500"
    },
    {
      icon: <TrendingUp size={32} className="text-indigo-500" />,
      title: "4. Track Progress",
      description: "Monitor your stats, review your history, and watch your skills improve over time.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 relative overflow-hidden">
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="text-center mb-20 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-600/10 text-indigo-600 text-xs font-black uppercase tracking-widest mb-6"
        >
           <Sparkles size={14} /> <span>THE PROCESS</span>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic mb-6">
          How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-violet-600">Works</span>
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          ElevateU uses advanced AI models to provide instant, personalized style and communication feedback for life's most important moments.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-24 relative z-10 w-full">
        {steps.map((step, index) => {
          const isEven = index % 2 === 1;
          return (
            <div key={index} className="relative flex flex-col md:flex-row items-center gap-12 group">
              {/* Connector Arrow */}
              {index < steps.length - 1 && (
                <div className={`hidden md:block absolute -bottom-20 ${isEven ? 'left-[25%]' : 'right-[25%]'} w-24 h-24 text-violet-500 opacity-40 z-0`}>
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
                    <path d={isEven ? "M80 0 C 80 50, 20 50, 20 100" : "M20 0 C 20 50, 80 50, 80 100"} stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" fill="transparent" strokeLinecap="round" />
                    <circle cx={isEven ? "20" : "80"} cy="100" r="4" fill="currentColor" />
                  </svg>
                </div>
              )}

              <motion.div 
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex-[1.2] glass p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl relative z-10 ${isEven ? 'md:order-2' : 'md:order-1'}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-3xl font-black italic mb-4">{step.title}</h3>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`flex-[0.8] relative z-10 w-full ${isEven ? 'md:order-1' : 'md:order-2'}`}
              >
                <div className="p-3 glass rounded-[2.5rem] transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 shadow-2xl border border-indigo-500/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-[2.5rem] mix-blend-overlay pointer-events-none" />
                  <img src={step.image} alt={step.title} className="w-full h-auto aspect-[4/3] object-cover rounded-[2rem] shadow-inner" />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="mt-32 max-w-4xl mx-auto glass p-12 md:p-16 rounded-[4rem] border border-indigo-500/10 shadow-2xl relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-violet-600/5 pointer-events-none" />
         
         <div className="text-center space-y-8 relative z-10">
            <h2 className="text-4xl font-black italic tracking-tighter">Ready to <span className="text-indigo-600 dark:text-cyan-400">Elevate</span> your style?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-bold text-slate-600 dark:text-slate-300">
               <div className="flex items-center space-x-2"><UserCheck size={18} className="text-green-500" /><span>Instant Results</span></div>
               <div className="flex items-center space-x-2"><ShieldCheck size={18} className="text-green-500" /><span>Privacy Focused</span></div>
               <div className="flex items-center space-x-2"><Sparkles size={18} className="text-green-500" /><span>AI Powered</span></div>
            </div>
            <div className="pt-4 flex justify-center">
               <Link to="/outfit-scanner" className="inline-flex items-center space-x-3 px-10 py-5 bg-indigo-600 text-white rounded-[2.5rem] font-black tracking-widest text-sm shadow-2xl shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-105 transition-all group">
                  <span>TRY SCANNER NOW</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
};

export default HowItWorks;