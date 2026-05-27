import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt, BookOpen, MessageSquare, ArrowRight, Star, TrendingUp, Users, Rocket, CheckCircle, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import InfiniteTypewriter from '../components/InfiniteTypewriter';
import HeroDarkIllustration from '../components/HeroDarkIllustration';
import HeroLightVisual from '../components/HeroLightVisual';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isDarkMode } = useTheme();
  const isDark = isDarkMode;
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      title: "Outfit Scanner",
      desc: "AI-powered analysis of your clothing choices for any event.",
      icon: <Shirt className="text-cyan-400" />,
      path: "/outfit-scanner",
      delay: 0.1
    },
    {
      title: "Event Preparation",
      desc: "Complete guides for interviews, meetings, and dates.",
      icon: <BookOpen className="text-violet-400" />,
      path: "/event-prep",
      delay: 0.2
    },
    {
      title: "AI Trainer",
      desc: "Practice communication with real-time feedback.",
      icon: <MessageSquare className="text-indigo-400" />,
      path: "/trainer",
      delay: 0.3
    }
  ];

  const testimonials = [
    {
      name: "Hemant Sharma",
      role: "Final Year Student",
      text: "ElevateU completely changed how I prepare for interviews. The AI Trainer's feedback was spot on!",
      stars: 5
    },
    {
      name: "Aditi Verma",
      role: "Software Engineer",
      text: "The Outfit Scanner is my go-to for client meetings. It's like having a personal stylist in my pocket.",
      stars: 5
    },
    {
      name: "Himanshu Kumar Tiwari",
      role: "Recent Graduate",
      text: "I was always nervous during viva. The AI simulation mode helped me gain the confidence I needed.",
      stars: 5
    },
    {
      name: "Mohit Kumar Chouhan",
      role: "Data Analyst",
      text: "The Event Preparation guide is incredibly detailed. It helped me nail my first client presentation!",
      stars: 5
    },
    {
      name: "Vishakha Yadav",
      role: "MBA Student",
      text: "The AI Communication Trainer helped me eliminate filler words completely. My GD performance improved drastically!",
      stars: 5
    },
    {
      name: "Ikshit Jain",
      role: "Campus Placement Achiever",
      text: "From outfit advice to mock interviews, ElevateU covered everything. Got placed in my dream company!",
      stars: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000); // 4 second rotation

    // Handle hash scrolling
    if (window.location.hash === '#testimonials') {
      const el = document.getElementById('testimonials');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative overflow-hidden min-h-screen transition-colors duration-500">
      {/* Background decoration orbs */}
      <div className="orb w-[500px] h-[500px] bg-indigo-500/20 dark:bg-violet-600/20 top-[-250px] left-[-100px] transition-colors duration-500" />
      <div className="orb w-[400px] h-[400px] bg-cyan-500/20 dark:bg-cyan-500/20 bottom-[-100px] right-[-100px] transition-colors duration-500" />
      <div className="orb w-[600px] h-[600px] bg-transparent dark:bg-pink-500/10 top-[20%] left-[30%] -translate-x-1/2 transition-colors duration-500 pointer-events-none" />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* LEFT COLUMN */}
            <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8 p-1 px-4 glass rounded-full flex items-center space-x-2 border-indigo-500/10 shadow-xl shadow-indigo-500/5 font-bold"
              >
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-500">Elevate your game with AI</span>
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9] text-slate-900 dark:text-white">
                <span className="block italic mb-4">Master Your Presence</span>
                <span className="text-indigo-600 dark:text-cyan-400">
                  <InfiniteTypewriter
                    phrases={[
                      "Build Your Best Self",
                      "Master Your Style",
                      "Ace Every Interview",
                      "Boost Your Confidence"
                    ]}
                    speed={80}
                    pause={2500}
                  />
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="max-w-2xl text-lg text-slate-500 dark:text-slate-300 mb-12 leading-relaxed font-medium"
              >
                The all-in-one AI platform for students and professionals to refine their style, communication, and confidence for every critical life event.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap justify-center lg:justify-start gap-6"
              >
                <Link to="/register">
                  <button className="px-12 py-5 bg-indigo-600 text-white rounded-[2rem] font-black tracking-widest text-sm shadow-2xl shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-105 transition-all flex items-center group relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <Rocket size={18} className="mr-3 group-hover:rotate-12 transition-transform" />
                    <span>Get Started Now</span>
                  </button>
                </Link>
                <Link to="/about">
                  <button className="px-12 py-5 glass rounded-[2rem] font-black tracking-widest text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:scale-105 active:scale-95">
                    Explore Platform
                  </button>
                </Link>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                ref={statsRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex items-center flex-wrap justify-center lg:justify-start gap-4 mt-12 text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400"
              >
                <div>
                  {statsInView ? <AnimatedCounter end={5000} duration={2.5} separator={true} /> : '0'}+ Students
                </div>
                <div className="w-[2px] h-4 bg-slate-300 dark:bg-slate-700 hidden sm:block" />
                <div>
                  {statsInView ? <AnimatedCounter end={98} duration={2.5} /> : '0'}% Satisfaction
                </div>
                <div className="w-[2px] h-4 bg-slate-300 dark:bg-slate-700 hidden sm:block" />
                <div>
                  {statsInView ? <AnimatedCounter end={3} duration={2.5} /> : '0'} AI Modules
                </div>
                <div className="w-[2px] h-4 bg-slate-300 dark:bg-slate-700 hidden sm:block" />
                <div>
                  {statsInView ? <AnimatedCounter end={20} duration={2.5} /> : '0'} Skill Levels
                </div>
              </motion.div>
            </div>

            {/* RIGHT — Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:w-1/2 mt-16 lg:mt-0 flex justify-center items-center lg:justify-end relative w-full"
            >
              {isDark ? (
                <HeroDarkIllustration />
              ) : (
                <HeroLightVisual />
              )}
            </motion.div>
          </div>

          {/* Feature Cards */}
        <div className="mt-32 w-full perspective-1000">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Link to={feature.path}>
                  <div className="glass p-10 rounded-[3.5rem] text-left group transition-all duration-500 border-indigo-500/5 hover:border-indigo-500/20 shadow-2xl shadow-indigo-500/5 tilt-3d h-full">
                    <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xl">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">{feature.title}</h3>
                    <p className="text-slate-500 dark:text-slate-300 font-medium leading-relaxed mb-10">{feature.desc}</p>
                    <div className="flex items-center text-xs font-black uppercase tracking-widest text-indigo-500 group-hover:translate-x-3 transition-transform">
                      Experience <ArrowRight size={14} className="ml-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
        </div>
      </section>

      {/* Why ElevateU Section (New) */}
      <section className="py-32 px-4 bg-slate-50/50 dark:bg-slate-900/20 border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-600/10 text-indigo-600 text-xs font-black uppercase tracking-widest">
              <Zap size={14} /> <span>Built for Growth</span>
            </div>
            <h2 className="text-5xl font-black tracking-tighter leading-tight italic text-slate-900 dark:text-white">Why Choose <span className="text-indigo-600 dark:text-cyan-400">ElevateU?</span></h2>
            <p className="text-lg text-slate-500 dark:text-slate-300 font-medium leading-relaxed">
              We've combined behavioral science with advanced AI to create the ultimate preparation toolkit. No more guessing—get data-driven feedback on how you look, speak, and present.
            </p>

            <div className="space-y-6">
              <BenefitItem icon={<CheckCircle className="text-green-500" />} title="AI-Powered Insights" desc="Real-time analysis using advanced vision and language models." />
              <BenefitItem icon={<Target className="text-red-500" />} title="Event-Specific Advice" desc="Tailored feedback for 12+ critical life scenarios." />
              <BenefitItem icon={<TrendingUp className="text-blue-500" />} title="Track Your Progress" desc="Personalized dashboard to monitor your skill evolution." />
            </div>

            <Link to="/about">
              <button className="mt-10 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-indigo-700 transition-all flex items-center space-x-2">
                <span>Learn More About Us</span>
                <ArrowRight size={16} />
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="relative glass rounded-[4rem] p-4 rotate-3 shadow-2xl scale-95 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" alt="Students collaborating" className="rounded-[3.5rem] grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 px-4 relative bg-gradient-to-br from-violet-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black tracking-tighter mb-6 italic text-slate-900 dark:text-white">Success Stories</h2>
            <p className="text-slate-500 dark:text-slate-300 font-medium">Join 5,000+ students building their best selves with AI.</p>
          </div>

          <div className="relative h-[460px] overflow-hidden group/carousel">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -30 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-10 cursor-pointer py-12 rounded-[4rem] bg-white dark:bg-slate-800 shadow-2xl shadow-violet-200/50 dark:shadow-violet-900/30 border border-violet-100 dark:border-slate-700 hover:shadow-violet-300/60 dark:hover:shadow-violet-900/50 transition-all duration-500 relative overflow-hidden"
                style={{ borderTop: '3px solid transparent', backgroundClip: 'padding-box' }}
              >
                {/* Top gradient accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 to-cyan-500 rounded-t-[4rem]" />

                <div className="flex space-x-1.5 mb-10">
                  {[...Array(testimonials[activeTestimonial].stars)].map((_, i) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      key={i}
                    >
                      <Star size={24} className="text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-2xl md:text-3xl font-black italic leading-[1.3] text-slate-800 dark:text-slate-100 mb-12 tracking-tight">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <div className="flex items-center space-x-5">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-violet-500/30 rotate-3 group-hover/carousel:rotate-0 transition-transform duration-500">
                    {testimonials[activeTestimonial].name[0]}
                  </div>
                  <div className="text-left">
                    <h4 className="font-black text-xl leading-none text-slate-900 dark:text-white">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-600 dark:text-violet-400 mt-2 bg-violet-500/10 px-2 py-1 rounded-md inline-block">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center items-center space-x-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`rounded-full transition-all duration-300 ${activeTestimonial === i
                  ? 'w-8 h-3 bg-violet-600'
                  : 'w-3 h-3 bg-transparent border-2 border-slate-400 dark:border-slate-600 hover:border-violet-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const BenefitItem = ({ icon, title, desc }) => (
  <div className="flex items-start space-x-4 group">
    <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <h4 className="font-black text-sm uppercase tracking-wider mb-1 text-slate-900 dark:text-white">{title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

const Target = ({ className, size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
);

const AnimatedCounter = ({ end, duration = 2.5, separator = false }) => {
  const nodeRef = React.useRef();

  useEffect(() => {
    const node = nodeRef.current;
    if (node) {
      import('framer-motion').then(({ animate }) => {
        const controls = animate(0, end, {
          duration,
          onUpdate(value) {
            node.textContent = separator 
              ? Math.round(value).toLocaleString() 
              : Math.round(value);
          }
        });
        return () => controls.stop();
      });
    }
  }, [end, duration, separator]);

  return <span ref={nodeRef}>0</span>;
};

export default Home;
