import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import OutfitScanner from './pages/OutfitScanner';
import EventPrep from './pages/EventPrep';
import AITrainer from './pages/AITrainer';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Help from './pages/Help';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import HowItWorks from './pages/HowItWorks';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />; 
};

const LoadingScreen = ({ onComplete }) => (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ delay: 1.5, duration: 0.5 }}
    onAnimationComplete={onComplete}
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-slate-950 pointer-events-none"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-5xl md:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-600 mb-6"
    >
      ElevateU
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-slate-500 dark:text-slate-400"
    >
      Build Your Best Self with AI
    </motion.div>
  </motion.div>
);

function App() {
  const [loading, setLoading] = useState(!sessionStorage.getItem('elevateU_loaded'));
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleLoadingComplete = () => {
    setLoading(false);
    sessionStorage.setItem('elevateU_loaded', 'true');
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
        
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#6366f1] to-[#06d6a0] z-50 origin-left"
          style={{ scaleX }}
        />

        <Router>
          <div className="min-h-screen text-slate-900 dark:text-white transition-colors duration-500 flex flex-col font-sans selection:bg-indigo-500 selection:text-white pb-[64px] md:pb-0">
            <Navbar />
            <main className="flex-grow pt-20">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<Help />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/how-it-works" element={<HowItWorks />} />

                {/* Shared Feature Routes (Guest access with limits) */}
                <Route path="/outfit-scanner" element={<OutfitScanner />} />
                <Route path="/event-prep" element={<EventPrep />} />
                <Route path="/trainer" element={<AITrainer />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/profile" element={<Navigate to="/dashboard" />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
            <BottomNav />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
