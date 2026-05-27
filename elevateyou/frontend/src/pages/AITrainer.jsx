import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, Send, Bot, Zap, Brain, Sparkles, Target, Award,
  RefreshCw, ChevronRight, CheckCircle, TrendingUp, Trophy, Lock as LockIcon,
  Unlock, Star, ChevronLeft, XCircle
} from 'lucide-react';
import { quizData } from '../data/quizData';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../api/config';
import axios from 'axios';
import confetti from 'canvas-confetti';

const PASSING_SCORE = 4; // out of 5 = 80%
const TOTAL_LEVELS = 20;
const STORAGE_KEY = 'elevateU_quiz_progress_v3';

const getProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return { 'Interview': 1, 'Presentation': 1, 'Viva': 1, 'Group Discussion': 1, 'Meeting': 1, 'First Date': 1 };
};

const saveProgress = (progress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

const levelLabels = {
  1: 'Starter', 2: 'Foundation', 3: 'Elementary', 4: 'Pre-Beginner',
  5: 'Beginner', 6: 'Pre-Intermediate', 7: 'Intermediate', 8: 'Upper-Intermediate',
  9: 'Pre-Advanced', 10: 'Advanced', 11: 'Upper-Advanced', 12: 'Strategic',
  13: 'Tactical', 14: 'Professional', 15: 'Senior Professional', 16: 'Expert',
  17: 'Master', 18: 'Elite', 19: 'Champion', 20: 'Legend'
};

const TOPICS = [
  { id: 'Interview', label: 'Interview', emoji: '💼' },
  { id: 'Presentation', label: 'Presentation', emoji: '📊' },
  { id: 'Viva', label: 'Viva', emoji: '🎓' },
  { id: 'Group Discussion', label: 'Group Discussion', emoji: '🗣️' },
  { id: 'Meeting', label: 'Meeting', emoji: '🤝' },
  { id: 'First Date', label: 'First Date', emoji: '💕' }
];

const levelColors = {
  1: 'from-slate-400 to-slate-500', 2: 'from-slate-400 to-slate-500',
  3: 'from-green-400 to-green-600', 4: 'from-green-400 to-green-600',
  5: 'from-teal-400 to-teal-600', 6: 'from-teal-400 to-teal-600',
  7: 'from-cyan-400 to-cyan-600', 8: 'from-cyan-400 to-cyan-600',
  9: 'from-blue-400 to-blue-600', 10: 'from-blue-400 to-blue-600',
  11: 'from-indigo-400 to-indigo-600', 12: 'from-indigo-400 to-indigo-600',
  13: 'from-violet-400 to-violet-600', 14: 'from-violet-400 to-violet-600',
  15: 'from-purple-400 to-purple-600', 16: 'from-purple-400 to-purple-600',
  17: 'from-pink-400 to-pink-600', 18: 'from-pink-400 to-pink-600',
  19: 'from-yellow-400 to-amber-500', 20: 'from-yellow-500 to-orange-500',
};

const CHAT_MODES = [
  { id: 'Interview Simulation', label: 'Interview', emoji: '💼', desc: 'Practice interview Q&A with real feedback' },
  { id: 'Grammar Correction', label: 'Grammar', emoji: '📝', desc: 'Get errors identified and corrected' },
  { id: 'Rephrasing', label: 'Rephrase', emoji: '✏️', desc: 'Make your writing more professional' },
  { id: 'Presentation Rehearsal', label: 'Presentation', emoji: '🎤', desc: 'Rehearse and get delivery feedback' },
  { id: 'Casual Talk', label: 'Casual Talk', emoji: '💬', desc: 'Practice natural conversation' },
];

const AITrainer = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('quiz');
  const [quizState, setQuizState] = useState('config'); // config, active, result
  const [topic, setTopic] = useState('Interview');
  const [level, setLevel] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState(getProgress());
  const [levelUnlocked, setLevelUnlocked] = useState(false);
  const [showAllLevels, setShowAllLevels] = useState(false);
  const [error, setError] = useState(null);

  // Chat state
  const [chatMode, setChatMode] = useState('Casual Talk');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your AI Communication Coach. Choose a practice mode from the left panel, then start typing. I'll give you real, specific feedback tailored to your chosen mode.", isFallback: false }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const [quizLoading, setQuizLoading] = useState(false);

  const fetchAIQuiz = async () => {
    setQuizLoading(true);
    setQuizState('active');
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/trainer/quiz/generate`, {
        topic,
        level: levelLabels[level]
      }, {
        headers: { Authorization: `Bearer ${token || 'demo-token'}` }
      });
      
      setQuestions(response.data.questions);
      setCurrentQuestion(0);
      setScore(0);
      setUserAnswers([]);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setLevelUnlocked(false);
    } catch (err) {
      console.error('Quiz fetch error:', err);
      setError('AI failed to generate quiz. Using local fallback.');
      // Local fallback
      const levelKey = `Level ${level}`;
      const bank = quizData[topic][levelKey] || quizData[topic]['Level 1'];
      setQuestions([...bank].sort(() => 0.5 - Math.random()));
    } finally {
      setQuizLoading(false);
    }
  };

  const startQuiz = () => {
    if (!token) {
      setError('Please Login to access AI Training features.');
      return;
    }
    fetchAIQuiz();
  };

  const handleAnswer = (optionIndex) => {
    if (showFeedback || !questions[currentQuestion]) return;
    const isCorrect = optionIndex === questions[currentQuestion].correctAnswer;
    setSelectedAnswer(optionIndex);
    setShowFeedback(true);

    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    const newAnswers = [...userAnswers, {
      question: questions[currentQuestion].text,
      answer: questions[currentQuestion].options[optionIndex],
      correct: isCorrect,
      correctAnswer: questions[currentQuestion].options[questions[currentQuestion].correctAnswer]
    }];
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz complete — check if passed
      const isPerfectScore = score === questions.length;
      const isPassing = score >= (questions.length * 0.8);
      
      if (isPassing && level < TOTAL_LEVELS) {
        const newProgress = { ...progress, [topic]: Math.max(progress[topic], level + 1) };
        setProgress(newProgress);
        saveProgress(newProgress);
        setLevelUnlocked(true);
      }
      
      if (isPerfectScore || (isPassing && level < TOTAL_LEVELS)) {
        confetti({ 
          particleCount: 100, 
          spread: 70, 
          origin: { y: 0.6 },
          colors: ['#6366f1', '#06d6a0', '#ec4899', '#f59e0b']
        });
      }
      submitQuizResult(score); // PERSIST TO DB
      setQuizState('result');
    }
  };

  const submitQuizResult = async (resScore) => {
    const tokenStr = localStorage.getItem('token');
    if (!tokenStr) return;

    try {
      await axios.post(`${API_BASE_URL}/api/trainer/quiz/submit`, {
        topic,
        level: levelLabels[level],
        score: resScore,
        weakAreas: userAnswers.filter(a => !a.correct).map(a => a.question),
        suggestions: "Targeted skill improvement recommended."
      }, {
        headers: { Authorization: `Bearer ${tokenStr}` }
      });
    } catch (err) {
      console.error('Failed to save quiz result:', err);
    }
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!token) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Please Login to chat with the AI Coach! 🔐" }]);
      return;
    }
    if (!input.trim() || isTyping) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    const history = updatedMessages.slice(1, -1).map(m => ({ role: m.role, content: m.content }));

    try {
      const response = await fetch(`${API_BASE_URL}/api/trainer/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || 'demo-token'}`
        },
        body: JSON.stringify({
          message: input,
          mode: chatMode,
          history
        })
      });

      const data = await response.json();

      if (response.status === 401 && token) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Session expired. Falling back to Guest Mode... 🛡️',
          isFallback: false
        }]);
        // Retry once with demo token
        const retryResponse = await fetch(`${API_BASE_URL}/api/trainer/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer demo-token'
          },
          body: JSON.stringify({ message: input, mode: chatMode, history })
        });
        const retryData = await retryResponse.json();
        const retryAiText = retryData.response || 'AI is temporarily unavailable.';
        setMessages(prev => [...prev, { role: 'assistant', content: retryAiText, isFallback: true }]);
        return;
      }

      const aiText = data.response || 'AI is temporarily unavailable, please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: aiText, isFallback: data.isFallback }]);
    } catch (err) {
      // Hard fallback if completely offline
      const chatFallbacksLocal = {
        'Interview Simulation': ["Great answer! For a stronger response, try using the STAR method — Situation, Task, Action, Result. This gives your answers clear structure."],
        'Grammar Correction': ["✏️ ANALYSIS: Your sentence has been reviewed.\n\n✅ Please try again when the server is fully connected."],
        'Rephrasing': ["🔄 PROFESSIONAL VERSION: The server is offline, but keep practicing!"],
        'Presentation Rehearsal': ["📊 FEEDBACK: Strong opening! For maximum impact, start with a bold statistic or fact."],
        'Casual Talk': ["That is a really interesting point! I would love to hear more about your perspective on this."]
      };
      const responses = chatFallbacksLocal[chatMode] || chatFallbacksLocal['Casual Talk'];
      const text = responses[0];
      setMessages(prev => [...prev, { role: 'assistant', content: text, isFallback: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  const passedCurrentLevel = score >= PASSING_SCORE;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-600/10 text-indigo-600 text-xs font-black uppercase tracking-widest">
            <Sparkles size={14} /> <span>Smart Training</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic">AI <span className="text-indigo-600 dark:text-cyan-400">Trainer</span></h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md">Master communication with 20 progressive levels of expert-crafted scenarios.</p>
        </motion.div>

        <div className="flex p-2 glass rounded-[2.5rem] shadow-2xl border-indigo-500/10">
          <button onClick={() => setActiveTab('quiz')} className={`px-10 py-4 rounded-[2rem] text-sm font-black transition-all ${activeTab === 'quiz' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-indigo-600'}`}>
            Knowledge Quiz
          </button>
          <button onClick={() => setActiveTab('chat')} className={`px-10 py-4 rounded-[2rem] text-sm font-black transition-all ${activeTab === 'chat' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-indigo-600'}`}>
            Practice Coach
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'quiz' ? (
          <motion.div
            key="quiz-tab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-[3.5rem] p-8 md:p-20 border-indigo-500/5 shadow-2xl shadow-indigo-500/5 overflow-hidden relative"
          >
            {/* CONFIG SCREEN */}
            {quizState === 'config' && (
              <div className="max-w-4xl mx-auto space-y-14 py-6">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-indigo-600/10 rounded-[2.5rem] flex items-center justify-center text-indigo-600 mx-auto mb-8 shadow-inner">
                    <Brain size={48} />
                  </div>
                  <h2 className="text-4xl font-black tracking-tight">Configure Your Session</h2>
                  <p className="text-slate-500 font-medium">Select an event topic and unlock up to 20 mastery levels.</p>
                </div>

                {/* Topic Selection */}
                <div className="space-y-6">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center">
                    <Target size={14} className="mr-2 text-indigo-500" /> Event Topic
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {TOPICS.map(t => (
                      <button
                        key={t.id}
                        onClick={() => { setTopic(t.id); setLevel(1); }}
                        className={`p-6 rounded-3xl text-left font-black transition-all flex items-center justify-between border-2 ${topic === t.id ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl border-transparent' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-indigo-200'}`}
                      >
                        <div className="flex items-center gap-4">
                           <span className="text-3xl">{t.emoji}</span>
                           <div>
                            <p className="text-lg">{t.label}</p>
                            <p className={`text-xs font-medium mt-1 ${topic === t.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                              {progress[t.id]}/{TOTAL_LEVELS} levels unlocked
                            </p>
                           </div>
                        </div>
                        {topic === t.id && <CheckCircle size={22} className="text-white opacity-80 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level Selection Grid (20 Levels, 5x4 Grid) */}
                <div className="space-y-6">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center">
                    <TrendingUp size={14} className="mr-2 text-indigo-500" /> Select Level
                  </label>
                  <motion.div
                    initial={false}
                    animate={{ height: 'auto' }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 overflow-hidden"
                  >
                    {Array.from({ length: TOTAL_LEVELS }, (_, i) => i + 1)
                      .slice(0, showAllLevels ? TOTAL_LEVELS : 5)
                      .map(lvl => {
                      const isUnlocked = lvl <= progress[topic];
                      const isSelected = level === lvl;
                      return (
                        <motion.button
                          key={lvl}
                          onClick={() => isUnlocked && setLevel(lvl)}
                          whileHover={isUnlocked ? { scale: 1.05 } : {}}
                          whileTap={isUnlocked ? { scale: 0.95 } : {}}
                          className={`relative p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${
                            isSelected
                              ? 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                              : isUnlocked
                                ? 'border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                                : 'border-slate-100 dark:border-slate-800 opacity-60 bg-slate-50 dark:bg-slate-900 cursor-not-allowed grayscale'
                          } ${isSelected ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'bg-white dark:bg-slate-900'}`}
                        >
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white text-sm font-black bg-gradient-to-br ${isUnlocked ? levelColors[lvl] : 'from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800'}`}>
                            {isUnlocked ? lvl : <LockIcon size={14} className="text-slate-500 dark:text-slate-400" />}
                          </div>
                          <div className="text-center w-full">
                            <p className={`text-[11px] font-black leading-tight ${isSelected ? 'text-indigo-600 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-300'}`}>
                              Lvl {lvl}
                            </p>
                            <p className="text-[9px] text-slate-400 truncate w-full px-1">{levelLabels[lvl]}</p>
                          </div>
                          {lvl === progress[topic] && lvl < TOTAL_LEVELS && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" />
                          )}
                        </motion.button>
                      );
                    })}
                  </motion.div>
                  <button
                    onClick={() => setShowAllLevels(!showAllLevels)}
                    className="mt-4 flex items-center gap-2 mx-auto px-6 py-2 rounded-full border border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all"
                  >
                    {showAllLevels ? '▲ Show Less' : '▼ Show All 20 Levels'}
                  </button>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 flex items-center justify-center text-xs text-indigo-700 dark:text-indigo-300 font-bold gap-2 border border-indigo-100 dark:border-indigo-800">
                    <Trophy size={16} className="text-yellow-500" />
                    Score 80% (4/5) to unlock the next rank.
                  </div>
                </div>

                <button
                  onClick={startQuiz}
                  disabled={level > progress[topic]}
                  className="w-full py-6 mt-8 bg-indigo-600 text-white rounded-[2.5rem] font-black tracking-[0.2em] text-sm shadow-2xl shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center group disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span>START LEVEL {level} — {levelLabels[level].toUpperCase()}</span>
                  <ChevronRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            )}

            {/* ACTIVE QUIZ */}
            {quizState === 'active' && (
              <div className="max-w-4xl mx-auto py-10 min-h-[600px] flex flex-col justify-between relative">
                {quizLoading ? (
                  <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm rounded-[3.5rem]">
                    <div className="relative w-32 h-32 mb-8">
                       <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 rounded-full border-4 border-dashed border-indigo-600/30"
                       />
                       <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-2 rounded-full border-4 border-indigo-600 border-t-transparent"
                       />
                       <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                          <Bot size={40} className="animate-bounce" />
                       </div>
                    </div>
                    <h3 className="text-2xl font-black tracking-tighter italic">AI is Crafting Your Quiz...</h3>
                    <p className="text-slate-500 font-medium mt-2">Generating personalized Level {level} scenarios.</p>
                  </div>
                ) : questions.length > 0 && (
                  <>
                  {/* Header */}
                  <div className="flex justify-between items-end mb-12 gap-8">
                    <div className="space-y-2">
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.25em] text-white bg-gradient-to-r ${levelColors[level]}`}>
                        <Star size={10} />
                        {topic} • Level {level}
                      </div>
                      <h3 className="text-xl font-bold text-slate-400">
                        Question {currentQuestion + 1} <span className="text-slate-300 font-medium">/ 5</span>
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-indigo-600 dark:text-cyan-400 uppercase tracking-widest text-[10px]">Progress</span>
                      <div className="flex-1 w-40 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Question */}
                  <AnimatePresence mode="wait">
                    <motion.h4
                      key={currentQuestion}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="text-2xl md:text-3xl font-black mb-12 leading-relaxed tracking-tight"
                    >
                      {questions[currentQuestion].text}
                    </motion.h4>
                  </AnimatePresence>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-4">
                    {questions[currentQuestion].options.map((option, index) => {
                      const isCorrect = index === questions[currentQuestion].correctAnswer;
                      const isSelected = selectedAnswer === index;
                      let btnClass = "p-5 border-2 border-slate-100 dark:border-slate-800 rounded-3xl text-left font-bold transition-all flex items-center group relative overflow-hidden bg-white dark:bg-slate-900";

                      if (showFeedback) {
                        if (isCorrect) btnClass += " border-green-500 bg-green-50 dark:bg-green-900/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]";
                        else if (isSelected) btnClass += " border-red-500 bg-red-50 dark:bg-red-900/20";
                        else btnClass += " opacity-40";
                      } else {
                        btnClass += " hover:border-indigo-500 hover:shadow-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800";
                      }

                      return (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.08 }}
                          onClick={() => handleAnswer(index)}
                          className={btnClass}
                          disabled={showFeedback}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-5 font-black text-sm flex-shrink-0 transition-all ${
                            showFeedback && isCorrect ? 'bg-green-500 text-white' :
                            showFeedback && isSelected ? 'bg-red-500 text-white' :
                            'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-indigo-600 group-hover:text-white'
                          }`}>
                            {showFeedback && isCorrect ? <CheckCircle size={16} /> :
                             showFeedback && isSelected && !isCorrect ? <XCircle size={16} /> :
                             String.fromCharCode(65 + index)}
                          </div>
                          <span className={`flex-1 text-base leading-relaxed ${showFeedback && isCorrect ? 'text-green-800 dark:text-green-300' : showFeedback && isSelected ? 'text-red-800 dark:text-red-300' : 'text-slate-700 dark:text-slate-300 group-hover:text-indigo-900 dark:group-hover:text-white'}`}>
                            {option}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  <AnimatePresence>
                    {showFeedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="mt-8 overflow-hidden rounded-3xl border-2 border-indigo-100 dark:border-indigo-900/50 shadow-xl"
                      >
                        <div className={`px-6 py-3 font-black text-xs uppercase tracking-widest text-white ${selectedAnswer === questions[currentQuestion].correctAnswer ? 'bg-green-500' : 'bg-red-500'}`}>
                          {selectedAnswer === questions[currentQuestion].correctAnswer ? '✅ Excellent Response' : '❌ Incorrect Selection'}
                        </div>
                        <div className="p-6 bg-indigo-50/50 dark:bg-slate-800">
                          <p className="font-medium text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                            <span className="font-black text-indigo-600 dark:text-cyan-400 mr-2">EXPLANATION:</span>
                            {questions[currentQuestion].explanation}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                {/* Next Button */}
                <div className="mt-10 flex justify-end">
                  {showFeedback ? (
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={nextQuestion}
                      className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-black tracking-[0.2em] text-xs shadow-xl hover:scale-[1.03] transition-all flex items-center group"
                    >
                      {currentQuestion < questions.length - 1 ? 'NEXT QUESTION' : 'VIEW FINAL RESULTS'}
                      <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  ) : (
                    <div className="h-[60px]" />
                  )}
                </div>
              </>
            )}
          </div>
        )}

            {/* RESULT SCREEN */}
            {quizState === 'result' && (
              <div className="max-w-2xl mx-auto py-10 text-center space-y-10">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className={`w-40 h-40 rounded-[3rem] flex items-center justify-center text-white mx-auto shadow-2xl relative bg-gradient-to-br ${passedCurrentLevel ? 'from-green-500 to-emerald-600 shadow-green-500/40' : 'from-slate-400 to-slate-600 shadow-slate-500/40'}`}
                >
                  {passedCurrentLevel ? <Trophy size={72} /> : <RefreshCw size={72} />}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute -inset-4 border-2 rounded-[3.5rem] opacity-30 ${passedCurrentLevel ? 'border-green-500' : 'border-slate-400'}`}
                  />
                </motion.div>

                {levelUnlocked && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl text-white font-black inline-flex items-center gap-3 shadow-xl shadow-amber-400/30"
                  >
                    <Unlock size={22} />
                    <span>🎉 Level {level + 1} — {levelLabels[level + 1]} Unlocked!</span>
                  </motion.div>
                )}

                <div className="space-y-3">
                  <h2 className="text-5xl font-black tracking-tight italic leading-tight">
                    {passedCurrentLevel ? 'Level' : 'Almost'}
                    <br />
                    <span className={passedCurrentLevel ? 'text-indigo-600 dark:text-cyan-400' : 'text-slate-500'}>
                      {passedCurrentLevel ? 'Passed!' : 'There!'}
                    </span>
                  </h2>
                  <p className="text-slate-500 font-medium text-lg">
                    {passedCurrentLevel
                      ? `Excellent! You've mastered Level ${level} — ${levelLabels[level]}.`
                      : `You need 4/5 (80%) to pass. Try again to unlock the next level!`}
                  </p>
                </div>

                {/* Score cards */}
                <div className="grid grid-cols-2 gap-5">
                  <div className="glass p-8 rounded-[2.5rem] space-y-2 border-indigo-500/10 shadow-lg">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Final Score</p>
                    <p className={`text-6xl font-black tracking-tighter ${passedCurrentLevel ? 'text-green-500' : 'text-slate-500'}`}>
                      {score}<span className="text-2xl text-slate-300">/5</span>
                    </p>
                  </div>
                  <div className="glass p-8 rounded-[2.5rem] space-y-2 border-indigo-500/10 shadow-lg">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Accuracy</p>
                    <p className={`text-6xl font-black tracking-tighter ${passedCurrentLevel ? 'text-green-500' : 'text-slate-500'}`}>
                      {Math.round((score / 5) * 100)}<span className="text-2xl text-slate-300">%</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <button
                    onClick={startQuiz}
                    className="w-full py-6 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border-2 border-slate-200 dark:border-slate-700 rounded-[2.5rem] font-black tracking-[0.2em] text-sm shadow-sm hover:border-indigo-400 transition-all flex items-center justify-center gap-3"
                  >
                    <RefreshCw size={20} /> RETRY LEVEL {level}
                  </button>
                  {passedCurrentLevel && level < TOTAL_LEVELS && (
                    <button
                      onClick={() => { setLevel(level + 1); setQuizState('config'); }}
                      className="w-full py-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-[2.5rem] font-black tracking-[0.2em] text-sm shadow-2xl shadow-indigo-500/30 hover:opacity-90 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                    >
                      <ChevronRight size={20} /> NEXT: LEVEL {level + 1} — {levelLabels[level + 1].toUpperCase()}
                    </button>
                  )}
                  {level === TOTAL_LEVELS && passedCurrentLevel && (
                    <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-center text-lg shadow-2xl shadow-orange-500/40">
                      🏆 LEGEND STATUS ACHIEVED! You completed all {TOTAL_LEVELS} levels!
                    </div>
                  )}
                  <button
                    onClick={() => setQuizState('config')}
                    className="w-full py-5 text-slate-400 hover:text-indigo-500 font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2 transition-colors"
                  >
                    <ChevronLeft size={16} /> BACK TO EVENT SELECTOR
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          /* Chat Tab */
          <motion.div
            key="chat-tab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[750px]"
          >
            {(() => {
              const hasFallback = messages.some(m => m.isFallback);
              return (
                <>
            <div className="lg:col-span-4 space-y-6">
              {/* Chat Mode Selector */}
              <div className="glass rounded-[3rem] p-8 border-indigo-500/5 shadow-2xl">
                <h3 className="font-black text-lg mb-6 flex items-center italic">
                  <Brain size={20} className="mr-2 text-indigo-600" /> Practice Mode
                </h3>
                <div className="space-y-2">
                  {CHAT_MODES.map(m => (
                    <button key={m.id} onClick={() => {
                      setChatMode(m.id);
                      setMessages([{ role: 'assistant', content: `Switched to ${m.label} mode. ${m.desc}. Go ahead — I'm ready!`, isFallback: false }]);
                    }}
                      className={`w-full p-4 rounded-2xl text-left transition-all border-2 ${chatMode === m.id ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-700'}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{m.emoji}</span>
                        <div>
                          <p className={`text-sm font-black ${chatMode === m.id ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>{m.label}</p>
                          <p className={`text-[10px] font-medium leading-tight ${chatMode === m.id ? 'text-indigo-200' : 'text-slate-400'}`}>{m.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div className="glass rounded-[3rem] p-8 border-indigo-500/5 shadow-2xl">
                <h3 className="font-black text-lg mb-6 flex items-center italic">
                  <TrendingUp size={20} className="mr-2 text-indigo-600" /> Quiz Progress
                </h3>
                <div className="space-y-5">
                  {TOPICS.slice(0, 3).map(t => (
                    <div key={t.id} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                        <span className="flex items-center gap-1">{t.emoji} {t.id}</span>
                        <span className="text-indigo-500">{progress[t.id] - 1}/{TOTAL_LEVELS} done</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${((progress[t.id] - 1) / TOTAL_LEVELS) * 100}%` }}
                          transition={{ duration: 1.5, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                        />
                      </div>
                    </div>
                  ))}
                  <div className="text-center mt-2">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">+ 3 more topics</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 glass rounded-[3.5rem] border-indigo-500/10 shadow-[0_32px_64px_-12px_rgba(99,102,241,0.12)] flex flex-col overflow-hidden relative">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl">
                <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
                    <Bot size={28} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg tracking-tight leading-none italic">AI Prep Coach</h3>
                    {hasFallback ? (
                      <p className="text-[10px] text-amber-500 font-black uppercase tracking-[0.2em] mt-2 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-amber-500 mr-2" /> Smart Default Mode (Offline)
                      </p>
                    ) : (
                      <p className="text-[10px] text-green-500 font-black uppercase tracking-[0.2em] mt-2 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" /> Live Assistance
                      </p>
                    )}
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                  {CHAT_MODES.find(m => m.id === chatMode)?.emoji} {CHAT_MODES.find(m => m.id === chatMode)?.label}
                </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth">
                {messages.map((m, i) => (
                  <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} key={i} className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] p-6 rounded-[2.5rem] text-sm leading-relaxed shadow-sm ${m.role === 'assistant' ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none' : 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 rounded-br-none font-medium'}`}>
                      {m.content}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 dark:bg-slate-800 p-6 px-8 rounded-[2rem] rounded-bl-none flex space-x-1.5">
                      <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 bg-indigo-500 rounded-full" />
                      <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-indigo-500 rounded-full" />
                      <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-indigo-500 rounded-full" />
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendMessage} className="p-8 bg-white/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask the coach anything..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] px-10 py-6 pr-20 text-sm outline-none shadow-sm focus:ring-4 ring-indigo-500/10 focus:border-indigo-500/40 transition-all"
                  />
                  <button type="submit" disabled={isTyping} className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-90 flex items-center justify-center disabled:opacity-50">
                    <Send size={22} />
                  </button>
                </div>
              </form>
            </div>
            </>
            );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AITrainer;
