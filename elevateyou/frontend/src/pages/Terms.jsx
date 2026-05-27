import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Gavel, Scale, ShieldAlert } from 'lucide-react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <div className="text-center mb-16 space-y-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="w-20 h-20 bg-indigo-600/10 rounded-[2.5rem] flex items-center justify-center text-indigo-600 mx-auto shadow-inner"
        >
           <FileText size={40} />
        </motion.div>
        <h1 className="text-5xl font-black tracking-tighter italic">Terms of <span className="text-indigo-600">Service</span></h1>
        <p className="text-slate-500 font-medium tracking-widest text-[10px] uppercase">Last updated: April 02, 2026</p>
      </div>

      <div className="glass p-12 md:p-16 rounded-[4rem] border-slate-100 dark:border-slate-800 space-y-12 shadow-2xl">
         <Section 
           icon={<Gavel size={20} />} 
           title="1. Acceptance of Terms" 
           text="By accessing and using ElevateU, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree, you are prohibited from using the platform." 
         />
         <Section 
           icon={<Scale size={20} />} 
           title="2. Use License" 
           text="We grant you a personal, non-transferable license to use our AI tools for self-improvement. You must not use the platform for any illegal purpose, reverse engineer the code, or scrape data." 
         />
         <Section 
           icon={<FileText size={20} />} 
           title="3. User Content" 
           text="You remain the owner of any content you upload. However, you grant ElevateU a limited license to process this content to provide our AI-driven services. We ensure your data is handled per our Privacy Policy." 
         />
         <Section 
           icon={<ShieldAlert size={20} />} 
           title="4. Disclaimer" 
           text="The AI feedback provided by ElevateU is for informational purposes only. We do not guarantee specific career outcomes, successful job placement, or professional success resulting from our guidance." 
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

export default Terms;
