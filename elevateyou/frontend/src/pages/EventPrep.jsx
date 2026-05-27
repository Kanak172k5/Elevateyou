import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shirt, MessageSquare, User, Info, CheckCircle2, BookOpen,
  Sparkles, Target, Zap, Clock, AlertTriangle, Lightbulb,
  ChevronRight, Star, RefreshCw, Bot
} from 'lucide-react';
import { eventPrepData } from '../data/eventPrepData';
import { prepData } from '../data/prepData';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../api/config';
import axios from 'axios';

const RICH_EVENTS = Object.keys(eventPrepData);

const iconMap = {
  'Interview': '💼',
  'Viva': '🗣️',
  'Presentation': '📊',
  'Group Discussion': '👥',
  'Meeting': '📅',
  'First Date': '✨',
  'Networking Event': '🤝',
  'Salary Negotiation': '💰',
  'Client Dinner': '🍽️',
  'Graduation Ceremony': '🎓',
  'Media Interview': '🎥',
  'Hackathon': '💻',
  'Job Fair': '🎪',
  'Investor Pitch': '🚀',
  'Office Party': '🎉',
  'College Fest': '🎸',
  'Panel Discussion': '🎙️',
  'Product Launch': '📦',
  'Award Ceremony': '🏆',
  'Casual Friday': '👖',
  'Wedding Guest': '💍',
  'Daily Office': '🏢',
  'Career Fair': '🎫',
  'Alumni Meet': '🏫'
};

const proTips = {
  'Interview': {
    quickWin: "Research the company's latest news and mention it naturally — it shows genuine interest.",
    objective: "To project competence, cultural fit, and enthusiasm in equal measure.",
    lastMinute: "Review your 3 strongest answers using STAR method in the car on the way there."
  },
  'Viva': {
    quickWin: "Re-read your abstract and introduction the morning of your viva — they set the context.",
    objective: "To demonstrate deep ownership and understanding of your own research.",
    lastMinute: "Write down your core contribution in one sentence — know it cold."
  },
  'Presentation': {
    quickWin: "Time your presentation the night before — never go over, always end 2 minutes early.",
    objective: "To educate, inspire, and leave the audience with 3 clear, actionable takeaways.",
    lastMinute: "Stand up straight, take 3 slow breaths, and remember: the audience wants you to succeed."
  },
  'Group Discussion': {
    quickWin: "Read news headlines that morning — you may get a current affairs topic.",
    objective: "To be seen as a collaborative leader who elevates the group's thinking.",
    lastMinute: "Remind yourself: quality of contribution matters far more than quantity."
  },
  'Meeting': {
    quickWin: "Prepare one bold, data-backed recommendation to make — don't just observe.",
    objective: "To add visible value and be remembered as someone who drives decisions forward.",
    lastMinute: "Review the agenda, highlight your moment to contribute, and prepare your opening line."
  },
  'First Date': {
    quickWin: "Think of 3 genuine questions you want to ask — not generic ones, specific ones.",
    objective: "To make them feel genuinely seen, heard, and interesting — not just to impress.",
    lastMinute: "Arrive 5 minutes early, take a walk around the block, and arrive calm and settled."
  }
};

const EventPrep = () => {
  const { token } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState('Interview');
  const [activeTab, setActiveTab] = useState('outfit');
  const [showAll, setShowAll] = useState(false);
  const [aiData, setAiData] = useState({}); // { [eventId_tabId]: data }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAIGuide = async () => {
    if (!token) {
      setError('Please Login to unlock AI-personalized guide features! 🔐');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/event/guide`, {
        eventType: selectedEvent,
        guideType: activeTab
      }, {
        headers: { Authorization: `Bearer ${token || 'demo-token'}` }
      });
      
      setAiData(prev => ({
        ...prev,
        [`${selectedEvent}_${activeTab}`]: response.data
      }));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Retry with demo token
        try {
          const retryRes = await axios.post(`${API_BASE_URL}/api/event/guide`, {
            eventType: selectedEvent,
            guideType: activeTab
          }, {
            headers: { Authorization: 'Bearer demo-token' }
          });
          setAiData(prev => ({
            ...prev,
            [`${selectedEvent}_${activeTab}`]: retryRes.data
          }));
          return;
        } catch (retryErr) {
          console.error('Retry failed:', retryErr);
        }
      }
      console.error('AI Guide fetch error:', err);
      setError('AI failed to generate custom guide. Using standard prep data.');
    } finally {
      setLoading(false);
    }
  };

  const currentAIData = aiData[`${selectedEvent}_${activeTab}`];

  const isRichEvent = RICH_EVENTS.includes(selectedEvent);
  const richData = isRichEvent ? eventPrepData[selectedEvent] : null;
  const legacyData = !isRichEvent ? prepData[selectedEvent] : null;
  const tips = proTips[selectedEvent] || {
    quickWin: "Arrive 10 minutes early to visualize the space and calm your breath.",
    objective: `To project confidence, authority, and authenticity during your ${selectedEvent}.`,
    lastMinute: "Check your appearance in a mirror before entering the venue."
  };

  const allEvents = [...RICH_EVENTS, ...Object.keys(prepData).filter(e => !RICH_EVENTS.includes(e))];
  const visibleEvents = showAll ? allEvents : allEvents.slice(0, 12);

  const tabs = [
    { id: 'outfit', label: 'Outfit', icon: <Shirt size={18} /> },
    { id: 'communication', label: 'Communication', icon: <MessageSquare size={18} /> },
    { id: 'bodyLanguage', label: 'Body Language', icon: <User size={18} /> }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const renderRichTab = () => {
    if (!richData) return null;
    const data = richData[activeTab];
    if (!data) return null;

    if (activeTab === 'outfit') {
      return (
        <motion.div key={selectedEvent + activeTab} variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 font-black text-sm">1</div>
              <h3 className="text-2xl font-black tracking-tight italic">Style Rules</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 pl-14">
              {data.styleRules.map((rule, i) => (
                <motion.div key={i} variants={itemVariants}
                  className="p-5 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-start space-x-4 group hover:border-indigo-500/40 transition-all shadow-sm">
                  <CheckCircle2 size={18} className="text-indigo-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">{rule}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div variants={itemVariants}
            className="ml-0 p-6 rounded-[2rem] bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/50 flex items-start space-x-4">
            <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
              <Star size={16} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-1">Bonus Tip</p>
              <p className="text-sm font-bold text-amber-800 dark:text-amber-200 leading-relaxed">{data.bonusTip}</p>
            </div>
          </motion.div>
        </motion.div>
      );
    }

    if (activeTab === 'communication') {
      return (
        <motion.div key={selectedEvent + activeTab} variants={containerVariants} initial="hidden" animate="visible" className="space-y-10">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 font-black text-sm">✓</div>
              <h3 className="text-2xl font-black tracking-tight italic">Power Phrases to Use</h3>
            </div>
            <div className="grid grid-cols-1 gap-3 pl-14">
              {data.keyPhrases.map((phrase, i) => (
                <motion.div key={i} variants={itemVariants}
                  className="p-5 rounded-[2rem] bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/40 flex items-start space-x-4">
                  <ChevronRight size={16} className="text-green-500 mt-0.5 shrink-0" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed italic">"{phrase}"</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-600">
                <AlertTriangle size={16} />
              </div>
              <h3 className="text-2xl font-black tracking-tight italic">Things to Avoid</h3>
            </div>
            <div className="grid grid-cols-1 gap-3 pl-14">
              {data.avoid.map((item, i) => (
                <motion.div key={i} variants={itemVariants}
                  className="p-5 rounded-[2rem] bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/40 flex items-start space-x-4">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div variants={itemVariants}
            className="p-6 rounded-[2rem] bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 border border-violet-200 dark:border-violet-800/50 flex items-start space-x-4">
            <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
              <Lightbulb size={16} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-1">Bonus Tip</p>
              <p className="text-sm font-bold text-violet-900 dark:text-violet-200 leading-relaxed">{data.bonusTip}</p>
            </div>
          </motion.div>
        </motion.div>
      );
    }

    if (activeTab === 'bodyLanguage') {
      return (
        <motion.div key={selectedEvent + activeTab} variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 font-black text-sm">1</div>
              <h3 className="text-2xl font-black tracking-tight italic">Body Language Mastery</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 pl-14">
              {data.tips.map((tip, i) => (
                <motion.div key={i} variants={itemVariants}
                  className="p-5 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-start space-x-4 group hover:border-cyan-500/40 transition-all shadow-sm">
                  <CheckCircle2 size={18} className="text-cyan-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">{tip}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div variants={itemVariants}
            className="p-6 rounded-[2rem] bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 border border-cyan-200 dark:border-cyan-800/50 flex items-start space-x-4">
            <div className="w-8 h-8 rounded-xl bg-cyan-600 flex items-center justify-center shrink-0">
              <Star size={16} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-1">Bonus Tip</p>
              <p className="text-sm font-bold text-cyan-900 dark:text-cyan-200 leading-relaxed">{data.bonusTip}</p>
            </div>
          </motion.div>
        </motion.div>
      );
    }
    return null;
  };

  const renderLegacyTab = () => {
    if (!legacyData) return null;
    const data = legacyData[activeTab];
    return (
      <motion.div key={selectedEvent + activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
        {Object.entries(data).map(([section, tips], idx) => (
          <div key={section} className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 font-black">{idx + 1}</div>
              <h3 className="text-2xl font-black tracking-tight italic">{section}</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 pl-14">
              {tips.map((tip, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-start space-x-4 group hover:border-indigo-500/30 transition-all shadow-sm">
                  <CheckCircle2 size={18} className="text-indigo-500 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed">{tip}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-600/10 text-indigo-600 text-xs font-black uppercase tracking-widest">
            <BookOpen size={14} /> <span>Preparation Guide</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic">Event <span className="text-indigo-600 dark:text-cyan-400">Preparation</span></h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm">Complete toolkits to master your presence at any critical life event.</p>
        </motion.div>
      </div>

      {/* Event Selector Grid */}
      <div className="mb-10">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Choose Your Event</p>
        <div className="flex flex-wrap gap-3">
          {visibleEvents.map((event) => (
            <motion.button
              key={event}
              onClick={() => { setSelectedEvent(event); setActiveTab('outfit'); }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`px-5 py-2.5 rounded-[1.5rem] text-sm font-black transition-all flex items-center space-x-2 border-2 ${
                selectedEvent === event
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700'
              } ${RICH_EVENTS.includes(event) ? '' : 'opacity-70'}`}
            >
              <span>{iconMap[event] || '🎯'}</span>
              <span>{event}</span>
              {RICH_EVENTS.includes(event) && (
                <span className="ml-1 w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              )}
            </motion.button>
          ))}
          {allEvents.length > 12 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-5 py-2.5 rounded-[1.5rem] text-sm font-black border-2 border-dashed border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
            >
              {showAll ? 'Show Less' : `+ ${allEvents.length - 12} More`}
            </button>
          )}
        </div>
        {RICH_EVENTS.includes(selectedEvent) && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Rich content available for this event
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Content */}
        <div className="lg:col-span-8 space-y-8">
          <div className="glass rounded-[3.5rem] border-indigo-500/5 shadow-2xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-800">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-6 flex items-center justify-center space-x-3 font-black text-sm uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-cyan-500" />
                  )}
                </button>
              ))}
            </div>

              <div className="p-10 md:p-14">
                <div className="flex justify-between items-center mb-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Current Focus</p>
                    <h4 className="text-xl font-black italic">{tabs.find(t => t.id === activeTab)?.label} Prep</h4>
                  </div>
                  <button 
                    onClick={fetchAIGuide}
                    disabled={loading}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                  >
                    {loading ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    {currentAIData ? 'Refresh AI Guide' : 'Personalize with AI'}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-20 flex flex-col items-center justify-center space-y-4">
                      <div className="w-16 h-16 rounded-3xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 animate-pulse">
                        <Bot size={32} />
                      </div>
                      <p className="text-sm font-black italic text-slate-500">AI is curating your personalized guide...</p>
                    </motion.div>
                  ) : currentAIData ? (
                    <motion.div key="ai-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                      <div className="p-8 rounded-[3rem] bg-indigo-600/5 border-2 border-indigo-600/10 space-y-6">
                        <div className="flex items-center gap-2 text-indigo-600">
                          <Zap size={20} />
                          <span className="text-xs font-black uppercase tracking-widest">AI Generated Excellence</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {Object.entries(currentAIData).map(([key, value], idx) => (
                            <div key={idx} className="space-y-3">
                              <h5 className="text-xs font-black uppercase tracking-widest text-slate-400">{key.replace(/([A-Z])/g, ' $1')}</h5>
                              {Array.isArray(value) ? (
                                <ul className="space-y-2">
                                  {value.map((v, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                      {v}
                                    </li>
                                  ))}
                                </ul>
                              ) : typeof value === 'object' && value !== null ? (
                                <div className="space-y-4 pt-1">
                                  {Object.entries(value).map(([subKey, subValue], sIdx) => (
                                    <div key={sIdx} className="space-y-1">
                                      <p className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                                        {subKey}
                                      </p>
                                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed">
                                        {typeof subValue === 'object' ? JSON.stringify(subValue) : subValue}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed">{value}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800" /></div>
                        <div className="relative flex justify-center text-[10px]"><span className="px-4 bg-white dark:bg-slate-950 text-slate-400 font-bold uppercase tracking-widest">Original Guidelines Below</span></div>
                      </div>
                      {isRichEvent ? renderRichTab() : renderLegacyTab()}
                    </motion.div>
                  ) : isRichEvent ? (
                    <motion.div key={selectedEvent + activeTab + 'rich'}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                      {renderRichTab()}
                    </motion.div>
                  ) : (
                    <motion.div key={selectedEvent + activeTab + 'legacy'}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                      {renderLegacyTab()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
          </div>
        </div>

        {/* Right Column: Pro Tips */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass rounded-[3rem] p-10 border-indigo-500/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-indigo-600/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <h3 className="font-black text-xl mb-8 flex items-center italic">
              <Sparkles size={20} className="mr-3 text-indigo-600" /> Professional Edge
            </h3>
            <div className="space-y-6">
              <ProTipItem icon={<Zap size={18} />} title="Quick Win" text={tips.quickWin} />
              <ProTipItem icon={<Target size={18} />} title="Core Objective" text={tips.objective} />
              <ProTipItem icon={<Clock size={18} />} title="Last Minute" text={tips.lastMinute} />
            </div>
          </div>

          <div className="rounded-[3rem] p-10 border border-white/10 shadow-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white relative overflow-hidden">
            <div className="absolute top-[-20px] left-[-20px] w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <h3 className="font-black text-xl mb-4 italic flex items-center">
              <Info size={20} className="mr-3 text-yellow-400" /> Experts Say
            </h3>
            <p className="text-sm font-medium opacity-90 italic leading-relaxed mb-8">
              "Preparation is the key to confidence. When you know you look the part and have your message ready, your brain can focus on performing at its best."
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center font-black">AU</div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest">Aditi Uppal</p>
                <p className="text-[10px] opacity-70">Style & Etiquette Coach</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProTipItem = ({ icon, title, text }) => (
  <div className="space-y-2">
    <div className="flex items-center space-x-2 text-indigo-600">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest">{title}</span>
    </div>
    <p className="text-xs font-bold text-slate-600 dark:text-slate-400 leading-relaxed pl-7">{text}</p>
  </div>
);

export default EventPrep;
