import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileCheck } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <div className="text-center mb-16 space-y-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="w-20 h-20 bg-indigo-600/10 rounded-[2.5rem] flex items-center justify-center text-indigo-600 mx-auto shadow-inner"
        >
           <Shield size={40} />
        </motion.div>
        <h1 className="text-5xl font-black tracking-tighter italic">Privacy <span className="text-indigo-600">Policy</span></h1>
        <p className="text-slate-500 font-medium tracking-widest text-[10px] uppercase">Last updated: April 02, 2026</p>
      </div>

      <div className="glass p-12 md:p-16 rounded-[4rem] border-slate-100 dark:border-slate-800 space-y-12 shadow-2xl">
         <Section 
           icon={<Lock size={20} />} 
           title="1. Information We Collect" 
           text="We collect information you provide directly to us, such as when you create an account, upload photos for outfit analysis, or communicate with our AI trainer using text input." 
         />
         <Section 
           icon={<Eye size={20} />} 
           title="2. How We Use Data" 
           text="Your data is used specifically to provide personalized AI feedback. We do not sell your personal information or photos to third parties. Our AI models process images to extract style features, not personal identities." 
         />
         <Section 
           icon={<FileCheck size={20} />} 
           title="3. Data Retention" 
           text="We retain your data for as long as your account is active. You can request deletion of your account and all associated data at any time through the dashboard settings." 
         />
         <Section 
           icon={<Shield size={20} />} 
           title="4. Security" 
           text="We implement industry-standard encryption and security measures to protect your information from unauthorized access, alteration, or disclosure." 
         />
      </div>
    </div>
  );
};

const Section = ({ title, text, icon }) => (
  <div className="space-y-4">
     <div className="flex items-center space-x-3 text-indigo-600">
        {icon}
        <h3 className="text-xl font-black tracking-tight">{title}</h3>
     </div>
     <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed pl-8">{text}</p>
  </div>
);

export default Privacy;
