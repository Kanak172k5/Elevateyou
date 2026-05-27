import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Scanner', path: '/outfit-scanner' },
  { name: 'Prep', path: '/event-prep' },
  { name: 'Trainer', path: '/trainer' },
  { name: 'About', path: '/about' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'Contact', path: '/contact' }
];

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, token, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const userName = user?.name || 'User';

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(location.pathname);
  
  const dropdownRef = useRef(null);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync hover path with current route when mouse leaves container
  useEffect(() => {
    setHoveredPath(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <>
      <motion.nav 
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
        className={`fixed top-0 z-50 w-full transition-all duration-300 backdrop-blur-[20px] ${
          isDarkMode 
            ? `bg-[#0a0f1e]/85 border-b border-white/10 ${scrolled ? 'shadow-lg shadow-black/50' : ''}`
            : `bg-white/85 border-b border-black/5 ${scrolled ? 'shadow-lg shadow-indigo-500/10' : ''}`
        }`}
        style={{ height: '70px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* LOGO: LEFT */}
          <Link to="/" className="flex items-center space-x-3 group outline-none">
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform"
            >
              🚀
            </motion.div>
            <div className="flex items-center text-2xl font-black tracking-tighter">
              <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                ElevateU
              </span>
              <span className="text-pink-500 ml-1">✦</span>
            </div>
          </Link>

          {/* NAV LINKS: CENTER */}
          <div 
            className="hidden lg:flex items-center space-x-1"
            onMouseLeave={() => setHoveredPath(location.pathname)}
          >
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              const isHovered = hoveredPath === link.path;
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 outline-none"
                >
                  <span className={`relative z-10 transition-colors duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-500 to-violet-600 bg-clip-text text-transparent font-bold' 
                      : isHovered 
                        ? 'text-violet-600 dark:text-cyan-400' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-cyan-400'
                  }`}>
                    {link.name}
                  </span>

                  {/* Sliding Hover Pill */}
                  {isHovered && (
                    <motion.div
                      layoutId="navHoverPill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-slate-100 dark:bg-white/10 rounded-full z-0"
                    />
                  )}

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* ACTIONS: RIGHT */}
          <div className="flex items-center space-x-4">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors duration-200 outline-none"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDarkMode ? 'dark' : 'light'}
                  initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {isDarkMode ? (
                    <Sun size={18} className="text-yellow-400" />
                  ) : (
                    <Moon size={18} className="text-indigo-600" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Auth/Avatar */}
            {token ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg hover:shadow-violet-500/30 hover:scale-105 transition-all outline-none border-2 border-white/20"
                >
                   {userName[0]?.toUpperCase() || 'U'}
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-56 rounded-2xl bg-white dark:bg-[#111827] shadow-2xl border border-slate-100 dark:border-white/10 overflow-hidden origin-top-right transform z-50"
                    >
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/5">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Signed in as</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-white truncate mt-0.5">{userName}</p>
                      </div>
                      <div className="p-2 space-y-1">
                        <Link 
                          to="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors"
                        >
                          <LayoutDashboard size={16} /> <span>Dashboard</span>
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors text-left"
                        >
                          <LogOut size={16} /> <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:flex">
                <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-sm hover:opacity-90 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-0.5 transition-all">
                  Join Now
                </button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-cyan-400 outline-none transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
        </div>
      </motion.nav>

      {/* MOBILE MENU SNOOP (Slide Down Panel) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[70px] left-0 w-full z-40 lg:hidden overflow-hidden bg-white/95 dark:bg-[#0a0f1e]/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-2xl"
          >
            <div className="px-4 py-6 flex flex-col space-y-2">
              {NAV_LINKS.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `px-4 py-3 rounded-2xl font-bold transition-all text-base ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-500/10 to-violet-600/10 text-violet-600 dark:text-cyan-400' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </NavLink>
              ))}
              
              {!token && (
                <div className="pt-4 mt-2 border-t border-slate-100 dark:border-white/10">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-base shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-transform">
                      Join Now
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
