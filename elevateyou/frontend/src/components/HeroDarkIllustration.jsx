// HeroDarkIllustration.jsx
// Drop this file into: frontend/src/components/HeroDarkIllustration.jsx
// Then use <HeroDarkIllustration /> in your Home.jsx dark mode hero

import { useEffect, useRef } from 'react';

const HeroDarkIllustration = () => {
  return (
    <div className="relative w-full max-w-[620px] h-[600px] flex items-center justify-center">

      {/* ── Animated SVG Illustration ── */}
      <svg
        viewBox="0 0 540 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full scale-[1.15] transform-origin-center"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06d6a0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="centerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#312e81" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          <filter id="glow1">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="20" />
          </filter>
        </defs>

        {/* ── Background Glow Orbs ── */}
        <circle cx="270" cy="260" r="200" fill="#6366f1" fillOpacity="0.06" filter="url(#softBlur)">
          <animate attributeName="r" values="200;220;200" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="150" r="100" fill="#06d6a0" fillOpacity="0.08" filter="url(#softBlur)">
          <animate attributeName="cx" values="150;170;150" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle cx="390" cy="380" r="120" fill="#ec4899" fillOpacity="0.06" filter="url(#softBlur)">
          <animate attributeName="cy" values="380;360;380" dur="7s" repeatCount="indefinite" />
        </circle>

        {/* ── Central AI Brain / Core ── */}
        {/* Outer ring */}
        <circle cx="270" cy="240" r="110" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="8 4">
          <animateTransform attributeName="transform" type="rotate" from="0 270 240" to="360 270 240" dur="20s" repeatCount="indefinite" />
        </circle>
        {/* Middle ring */}
        <circle cx="270" cy="240" r="80" stroke="#06d6a0" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="5 6">
          <animateTransform attributeName="transform" type="rotate" from="360 270 240" to="0 270 240" dur="15s" repeatCount="indefinite" />
        </circle>
        {/* Inner core */}
        <circle cx="270" cy="240" r="55" fill="url(#centerGrad)" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="270" cy="240" r="50" fill="#1e1b4b" fillOpacity="0.8" />

        {/* AI Text in center */}
        <text x="270" y="232" textAnchor="middle" fill="#6366f1" fontSize="11" fontFamily="monospace" fontWeight="bold" opacity="0.9">ELEVATE</text>
        <text x="270" y="248" textAnchor="middle" fill="#06d6a0" fontSize="18" fontFamily="monospace" fontWeight="bold" filter="url(#glow1)">AI</text>
        <text x="270" y="262" textAnchor="middle" fill="#8b5cf6" fontSize="9" fontFamily="monospace" opacity="0.7">CORE</text>

        {/* Pulsing core glow */}
        <circle cx="270" cy="240" r="55" stroke="#6366f1" strokeWidth="2" fill="none" strokeOpacity="0.5">
          <animate attributeName="r" values="55;65;55" dur="3s" repeatCount="indefinite" />
          <animate attributeName="strokeOpacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* ── Orbiting Dots on rings ── */}
        {/* Dot on outer ring */}
        <circle r="5" fill="#6366f1" filter="url(#glow1)">
          <animateMotion dur="20s" repeatCount="indefinite">
            <mpath href="#outerPath" />
          </animateMotion>
        </circle>
        <path id="outerPath" d="M 270 130 A 110 110 0 1 1 269.99 130" fill="none" />

        <circle r="4" fill="#06d6a0" filter="url(#glow1)">
          <animateMotion dur="15s" repeatCount="indefinite" begin="-5s">
            <mpath href="#midPath" />
          </animateMotion>
        </circle>
        <path id="midPath" d="M 270 160 A 80 80 0 1 0 269.99 160" fill="none" />

        {/* ── Feature Cards (floating) ── */}

        {/* Card 1 — Outfit Scanner (top left) */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-8; 0,0" dur="4s" repeatCount="indefinite" />
          {/* Card bg */}
          <rect x="20" y="60" width="155" height="115" rx="16" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.6" />
          <rect x="20" y="60" width="155" height="115" rx="16" fill="url(#grad1)" fillOpacity="0.08" />
          {/* Icon circle */}
          <circle cx="52" cy="92" r="18" fill="#6366f1" fillOpacity="0.2" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.5" />
          {/* Camera icon */}
          <rect x="44" y="86" width="16" height="12" rx="2" fill="#6366f1" fillOpacity="0.9" />
          <circle cx="52" cy="92" r="3" fill="#1e1b4b" />
          <rect x="48" y="84" width="8" height="3" rx="1" fill="#6366f1" fillOpacity="0.9" />
          {/* Text */}
          <text x="75" y="89" fill="#a5b4fc" fontSize="8" fontWeight="bold" fontFamily="monospace">OUTFIT</text>
          <text x="75" y="100" fill="#6366f1" fontSize="8" fontWeight="bold" fontFamily="monospace">SCANNER</text>
          {/* Sub items */}
          <circle cx="35" cy="118" r="3" fill="#06d6a0" fillOpacity="0.7" />
          <text x="43" y="121" fill="#94a3b8" fontSize="7" fontFamily="monospace">Upload Photo</text>
          <circle cx="35" cy="133" r="3" fill="#8b5cf6" fillOpacity="0.7" />
          <text x="43" y="136" fill="#94a3b8" fontSize="7" fontFamily="monospace">Describe Look</text>
          <circle cx="35" cy="148" r="3" fill="#06d6a0" fillOpacity="0.7" />
          <text x="43" y="151" fill="#94a3b8" fontSize="7" fontFamily="monospace">AI Analysis</text>
          {/* Glow line at top */}
          <rect x="20" y="60" width="155" height="3" rx="2" fill="url(#grad1)" fillOpacity="0.8" />
        </g>

        {/* Card 2 — Event Prep (top right) */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-6; 0,0" dur="5s" repeatCount="indefinite" begin="-2s" />
          <rect x="365" y="55" width="155" height="120" rx="16" fill="#1e1b4b" stroke="#06d6a0" strokeWidth="1.5" strokeOpacity="0.6" />
          <rect x="365" y="55" width="155" height="120" rx="16" fill="url(#grad2)" fillOpacity="0.08" />
          {/* Icon */}
          <circle cx="397" cy="87" r="18" fill="#06d6a0" fillOpacity="0.15" stroke="#06d6a0" strokeWidth="1" strokeOpacity="0.5" />
          <rect x="390" y="80" width="14" height="14" rx="2" fill="#06d6a0" fillOpacity="0.8" />
          <rect x="393" y="84" width="8" height="1.5" rx="1" fill="#1e1b4b" />
          <rect x="393" y="87" width="8" height="1.5" rx="1" fill="#1e1b4b" />
          <rect x="393" y="90" width="6" height="1.5" rx="1" fill="#1e1b4b" />
          <text x="420" y="84" fill="#6ee7b7" fontSize="8" fontWeight="bold" fontFamily="monospace">EVENT</text>
          <text x="420" y="95" fill="#06d6a0" fontSize="8" fontWeight="bold" fontFamily="monospace">PREP GUIDE</text>
          {/* Check items */}
          <text x="380" y="116" fill="#06d6a0" fontSize="9" fontFamily="monospace">✓</text>
          <text x="393" y="116" fill="#94a3b8" fontSize="7" fontFamily="monospace">Outfit Guide</text>
          <text x="380" y="130" fill="#06d6a0" fontSize="9" fontFamily="monospace">✓</text>
          <text x="393" y="130" fill="#94a3b8" fontSize="7" fontFamily="monospace">Communication</text>
          <text x="380" y="144" fill="#06d6a0" fontSize="9" fontFamily="monospace">✓</text>
          <text x="393" y="144" fill="#94a3b8" fontSize="7" fontFamily="monospace">Body Language</text>
          <rect x="365" y="55" width="155" height="3" rx="2" fill="url(#grad2)" fillOpacity="0.8" />
        </g>

        {/* Card 3 — AI Trainer (bottom center) */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-7; 0,0" dur="4.5s" repeatCount="indefinite" begin="-1s" />
          <rect x="165" y="370" width="210" height="125" rx="16" fill="#1e1b4b" stroke="#ec4899" strokeWidth="1.5" strokeOpacity="0.6" />
          <rect x="165" y="370" width="210" height="125" rx="16" fill="url(#grad3)" fillOpacity="0.06" />
          {/* Icon */}
          <circle cx="200" cy="400" r="20" fill="#ec4899" fillOpacity="0.15" stroke="#ec4899" strokeWidth="1" strokeOpacity="0.5" />
          {/* Brain/graduation icon */}
          <circle cx="200" cy="397" r="8" fill="#ec4899" fillOpacity="0.8" />
          <path d="M 194 405 Q 200 412 206 405" stroke="#ec4899" strokeWidth="1.5" fill="none" strokeOpacity="0.8" />
          <rect x="197" y="405" width="6" height="3" rx="1" fill="#ec4899" fillOpacity="0.6" />
          <text x="227" y="396" fill="#f9a8d4" fontSize="8" fontWeight="bold" fontFamily="monospace">AI TRAINER</text>
          <text x="227" y="407" fill="#ec4899" fontSize="7" fontFamily="monospace">20 LEVELS</text>
          {/* Items */}
          <text x="180" y="428" fill="#f59e0b" fontSize="8" fontFamily="monospace">🧠</text>
          <text x="196" y="428" fill="#94a3b8" fontSize="7" fontFamily="monospace">Quiz Module</text>
          <text x="295" y="428" fill="#94a3b8" fontSize="7" fontFamily="monospace" textAnchor="end">Grammar•Vocab</text>
          <text x="180" y="443" fill="#06d6a0" fontSize="8" fontFamily="monospace">💬</text>
          <text x="196" y="443" fill="#94a3b8" fontSize="7" fontFamily="monospace">Practice Chatbot</text>
          <text x="180" y="458" fill="#6366f1" fontSize="8" fontFamily="monospace">📈</text>
          <text x="196" y="458" fill="#94a3b8" fontSize="7" fontFamily="monospace">Progress Tracking</text>
          <rect x="165" y="370" width="210" height="3" rx="2" fill="url(#grad3)" fillOpacity="0.8" />
        </g>

        {/* ── Connecting Lines from cards to center ── */}
        {/* Line: Outfit Scanner → Center */}
        <line x1="175" y1="120" x2="220" y2="200" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4">
          <animate attributeName="strokeOpacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
        </line>
        {/* Line: Event Prep → Center */}
        <line x1="365" y1="115" x2="320" y2="195" stroke="#06d6a0" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4">
          <animate attributeName="strokeOpacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" begin="-1s" />
        </line>
        {/* Line: AI Trainer → Center */}
        <line x1="270" y1="370" x2="270" y2="295" stroke="#ec4899" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4">
          <animate attributeName="strokeOpacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" begin="-2s" />
        </line>

        {/* ── Floating data particles ── */}
        {[
          { cx: 130, cy: 200, r: 3, color: "#6366f1", dur: "6s" },
          { cx: 420, cy: 200, r: 2, color: "#06d6a0", dur: "7s" },
          { cx: 160, cy: 320, r: 2.5, color: "#ec4899", dur: "5s" },
          { cx: 400, cy: 310, r: 3, color: "#f59e0b", dur: "8s" },
          { cx: 270, cy: 100, r: 2, color: "#8b5cf6", dur: "6s" },
          { cx: 80, cy: 260, r: 2, color: "#06d6a0", dur: "9s" },
          { cx: 460, cy: 260, r: 2.5, color: "#6366f1", dur: "7s" },
        ].map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={p.color} fillOpacity="0.7" filter="url(#glow1)">
            <animate attributeName="cy" values={`${p.cy};${p.cy - 15};${p.cy}`} dur={p.dur} repeatCount="indefinite" />
            <animate attributeName="fillOpacity" values="0.7;1;0.7" dur={p.dur} repeatCount="indefinite" />
          </circle>
        ))}

        {/* ── Sparkle stars ── */}
        {[
          { x: 80, y: 80 }, { x: 460, y: 100 }, { x: 50, y: 380 },
          { x: 490, y: 350 }, { x: 140, y: 460 }, { x: 420, y: 460 }
        ].map((s, i) => (
          <g key={i}>
            <line x1={s.x} y1={s.y - 8} x2={s.x} y2={s.y + 8} stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.5">
              <animate attributeName="strokeOpacity" values="0.5;1;0.5" dur={`${3 + i}s`} repeatCount="indefinite" />
            </line>
            <line x1={s.x - 8} y1={s.y} x2={s.x + 8} y2={s.y} stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.5">
              <animate attributeName="strokeOpacity" values="0.5;1;0.5" dur={`${3 + i}s`} repeatCount="indefinite" />
            </line>
            <line x1={s.x - 5} y1={s.y - 5} x2={s.x + 5} y2={s.y + 5} stroke="#8b5cf6" strokeWidth="1" strokeOpacity="0.4">
              <animate attributeName="strokeOpacity" values="0.4;0.8;0.4" dur={`${3 + i}s`} repeatCount="indefinite" />
            </line>
            <line x1={s.x + 5} y1={s.y - 5} x2={s.x - 5} y2={s.y + 5} stroke="#8b5cf6" strokeWidth="1" strokeOpacity="0.4">
              <animate attributeName="strokeOpacity" values="0.4;0.8;0.4" dur={`${3 + i}s`} repeatCount="indefinite" />
            </line>
          </g>
        ))}

        {/* ── Score badges ── */}
        {/* Score badge top */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;4,0;0,0" dur="5s" repeatCount="indefinite" />
          <rect x="220" y="20" width="100" height="30" rx="15" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.6" />
          <circle cx="240" cy="35" r="8" fill="#f59e0b" fillOpacity="0.2" />
          <text x="240" y="39" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">🏆</text>
          <text x="290" y="33" textAnchor="middle" fill="#fbbf24" fontSize="8" fontFamily="monospace" fontWeight="bold">9.2/10</text>
          <text x="290" y="43" textAnchor="middle" fill="#94a3b8" fontSize="6" fontFamily="monospace">STYLE SCORE</text>
        </g>

        {/* Streak badge */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;-4,0;0,0" dur="6s" repeatCount="indefinite" begin="-3s" />
          <rect x="30" y="310" width="90" height="30" rx="15" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.5" />
          <text x="55" y="329" textAnchor="middle" fill="#f59e0b" fontSize="12" fontFamily="monospace">🔥</text>
          <text x="85" y="326" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">7</text>
          <text x="100" y="326" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">days</text>
        </g>

        {/* Level badge */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0;3,0;0,0" dur="7s" repeatCount="indefinite" begin="-1s" />
          <rect x="420" y="310" width="100" height="30" rx="15" fill="#1e1b4b" stroke="#06d6a0" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="438" cy="325" r="8" fill="#06d6a0" fillOpacity="0.2" />
          <text x="438" y="329" textAnchor="middle" fill="#06d6a0" fontSize="9" fontFamily="monospace">Lvl</text>
          <text x="468" y="323" textAnchor="middle" fill="#6ee7b7" fontSize="8" fontFamily="monospace" fontWeight="bold">PRO</text>
          <text x="490" y="323" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">★★★</text>
          <text x="468" y="334" textAnchor="middle" fill="#94a3b8" fontSize="6" fontFamily="monospace">LEVEL 14</text>
        </g>

      </svg>
    </div>
  );
};

export default HeroDarkIllustration;