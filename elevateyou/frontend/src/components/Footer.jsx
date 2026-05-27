import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {

  return (
    <footer className="glass mt-32 pt-20 pb-8 px-4 relative overflow-hidden">
      {/* Top gradient border line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500 opacity-70" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {/* Column 1: Logo & Social */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center group">
              <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="text-indigo-600 dark:text-cyan-400 mr-2">
                <Rocket size={28} />
              </motion.div>
              <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                ElevateU ✦
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Empowering students to build their best selves through AI-driven insights for style, communication, and confidence.
            </p>
            <div className="flex space-x-3">
              {/* GitHub — purple hover */}
              <SocialIcon href="https://github.com/ElevateU" glowColor="rgba(139,92,246,0.5)" icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              } hoverClass="hover:text-violet-500 hover:shadow-[0_0_16px_rgba(139,92,246,0.5)]" />

              {/* LinkedIn — blue hover */}
              <SocialIcon href="https://www.linkedin.com/in/ElevateU" glowColor="rgba(59,130,246,0.5)" icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              } hoverClass="hover:text-blue-500 hover:shadow-[0_0_16px_rgba(59,130,246,0.5)]" />

              {/* Instagram — pink hover */}
              <SocialIcon href="https://www.instagram.com/ElevateU" glowColor="rgba(236,72,153,0.5)" icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              } hoverClass="hover:text-pink-500 hover:shadow-[0_0_16px_rgba(236,72,153,0.5)]" />

              {/* Email — cyan hover */}
              <SocialIcon href="mailto:ElevateU@gmail.com" glowColor="rgba(6,182,212,0.5)" icon={<Mail size={18} />}
                hoverClass="hover:text-cyan-500 hover:shadow-[0_0_16px_rgba(6,182,212,0.5)]" />
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="lg:pl-10">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-indigo-500 mb-8">Platform</h4>
            <ul className="space-y-4">
              <FooterLink to="/outfit-scanner" label="Outfit Scanner" />
              <FooterLink to="/event-prep" label="Event Preparation" />
              <FooterLink to="/trainer" label="AI Trainer" />
              <FooterLink to="/dashboard" label="Dashboard" />
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:pl-10">
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-indigo-500 mb-8">Company</h4>
            <ul className="space-y-4">
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/help" label="Help Center" />
              <FooterLink to="/contact" label="Contact" />
              <FooterLink to="/privacy" label="Privacy Policy" />
              <FooterLink to="/terms" label="Terms of Service" />
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-200 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8">
            <Link to="/privacy" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-500 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-500 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon, hoverClass }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -4, scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`p-3 glass rounded-xl text-slate-400 transition-all duration-200 ${hoverClass}`}
  >
    {icon}
  </motion.a>
);

const FooterLink = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 hover:translate-x-2 inline-block transition-all duration-300"
    >
      {label}
    </Link>
  </li>
);

export default Footer;
