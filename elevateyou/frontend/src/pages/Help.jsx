import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, HelpCircle, ChevronDown, MessageSquare, Send, Mail, Phone, MapPin, Sparkles, Zap, Shield, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const Help = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const faqs = [
    { 
      category: 'General',
      question: "What exactly is ElevateU?",
      answer: "ElevateU is an AI-powered personal development platform designed to help students and young professionals master their presence in critical situations like interviews, presentations, and social events."
    },
    { 
      category: 'Scanner',
      question: "How accurate is the Outfit Scanner?",
      answer: "Our AI analysis is based on thousands of professional style rules. While highly accurate for professional context, it should be used as a guidance tool alongside your personal judgment."
    },
    { 
      category: 'Trainer',
      question: "Can I practice for specific job roles?",
      answer: "Yes! In the AI Trainer, you can select 'Professional' level and 'Scenario' topic to simulate industry-specific interview questions and communication challenges."
    },
    { 
      category: 'Account',
      question: "Is my data private?",
      answer: "Absolutely. We encrypt all user data and photos. We do not store your original images longer than necessary for the analysis."
    },
    { 
      category: 'General',
      question: "Do I need a paid subscription?",
      answer: "ElevateU offers a comprehensive free tier. Advanced AI features and personalized historical tracking are part of our upcoming Pro plan."
    }
  ];

  const categories = ['All', 'General', 'Scanner', 'Trainer', 'Account'];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(search.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 relative overflow-hidden">
       {/* Hero / Search */}
       <section className="text-center mb-24 space-y-10 relative z-10">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-600/10 text-indigo-600 text-xs font-black uppercase tracking-widest shadow-inner border border-indigo-500/5"
          >
             <HelpCircle size={14} /> <span>Help Center</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic">
             How can we <br />
             <span className="text-indigo-600 dark:text-cyan-400">help you?</span>
          </h1>

          <div className="max-w-2xl mx-auto relative group">
             <div className="absolute inset-0 bg-indigo-600/5 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative glass p-2 rounded-[2.5rem] flex items-center shadow-2xl shadow-indigo-500/5 border-indigo-500/10">
                <Search size={24} className="ml-6 text-slate-400" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for questions, tutorials, or features..."
                  className="w-full bg-transparent p-6 text-sm outline-none font-medium"
                />
             </div>
          </div>
       </section>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Categories Sidebar */}
          <div className="lg:col-span-3 space-y-6">
             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 px-4">Categories</h3>
             <div className="space-y-2">
                {categories.map(cat => (
                   <button
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={`w-full text-left p-5 rounded-3xl font-black text-sm transition-all flex items-center justify-between group ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 translate-x-1' : 'hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-800'}`}
                   >
                      <span>{cat}</span>
                      <ChevronDown size={16} className={`opacity-40 group-hover:opacity-100 transition-all ${activeCategory === cat ? '-rotate-90' : '0'}`} />
                   </button>
                ))}
             </div>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-9 space-y-6 min-h-[500px]">
             <AnimatePresence mode="popLayout">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, i) => (
                    <motion.div
                       key={faq.question}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, scale: 0.95 }}
                       transition={{ delay: i * 0.05 }}
                    >
                       <AccordionItem faq={faq} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-20 glass rounded-[4rem] border-slate-100"
                  >
                     <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6 border border-slate-100 shadow-inner rotate-12">
                        <Rocket size={40} />
                     </div>
                     <h3 className="text-2xl font-black mb-2 italic">Nothing Found</h3>
                     <p className="text-slate-500 font-medium max-w-xs">We couldn't find any results for "{search}". Try searching for something else.</p>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
       </div>

       {/* Contact Section */}
       <section className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="glass p-12 md:p-16 rounded-[4rem] border-indigo-500/5 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
             
             <div className="relative z-10 space-y-8">
                <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
                   <MessageSquare size={28} />
                </div>
                <h2 className="text-4xl font-black tracking-tighter italic">Still have <br /><span className="text-indigo-600">questions?</span></h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed">If you couldn't find what you were looking for, feel free to contact us.</p>
                
                <Link 
                  to="/contact"
                  className="inline-flex items-center space-x-3 px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black tracking-widest text-sm shadow-2xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all"
                >
                   <span>CONTACT SUPPORT</span>
                   <Send size={18} />
                </Link>
             </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
             <ContactCard 
               icon={<Mail className="text-cyan-500" />} 
               title="Email Us" 
               value="support@elevateu.com" 
               desc="Expect a response within 24 hours." 
             />
             <ContactCard 
               icon={<Phone className="text-violet-500" />} 
               title="Call Center" 
               value="+1 (555) ELEVATE" 
               desc="Mon-Fri, 9am to 6pm PST." 
             />
             <ContactCard 
               icon={<MapPin className="text-pink-500" />} 
               title="Headquarters" 
               value="Silicon Valley, CA" 
               desc="Innovation Hub, 5th Floor." 
             />
          </div>
       </section>
    </div>
  );
};

const AccordionItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`glass rounded-[2rem] overflow-hidden transition-all duration-300 border ${isOpen ? 'border-indigo-500/30 shadow-2xl bg-indigo-500/[0.02]' : 'border-slate-100 dark:border-slate-800'}`}>
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className="w-full text-left p-8 flex items-center justify-between"
       >
          <div className="space-y-1">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">{faq.category}</span>
             <h4 className="text-lg font-black tracking-tight">{faq.question}</h4>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-indigo-600 text-white rotate-180 shadow-lg shadow-indigo-500/20' : 'bg-slate-50 dark:bg-slate-900 border border-slate-100'}`}>
             <ChevronDown size={20} />
          </div>
       </button>
       <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-8 pb-8"
            >
               <p className="text-slate-500 font-medium leading-relaxed border-t border-slate-100 pt-6">
                  {faq.answer}
               </p>
            </motion.div>
          )}
       </AnimatePresence>
    </div>
  );
};

const ContactCard = ({ icon, title, value, desc }) => (
  <div className="glass p-8 rounded-[2.5rem] flex items-center space-x-8 border-indigo-500/5 hover:border-indigo-500/20 transition-all group">
     <div className="w-16 h-16 rounded-[2rem] bg-indigo-600/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
        {React.cloneElement(icon, { size: 28 })}
     </div>
     <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{title}</h4>
        <p className="text-lg font-black mb-1">{value}</p>
        <p className="text-xs text-slate-500 font-medium opacity-70">{desc}</p>
     </div>
  </div>
);

export default Help;
