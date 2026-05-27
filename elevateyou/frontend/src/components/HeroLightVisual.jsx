// HeroLightVisual.jsx
// Drop into: frontend/src/components/HeroLightVisual.jsx

const HeroLightVisual = () => {
    return (
        <div className="relative w-full max-w-[620px] h-[600px] flex items-center justify-center">
            <svg
                viewBox="0 0 540 520"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full scale-[1.25] transform-origin-center"
            >
                <defs>
                    {/* Light mode gradients */}
                    <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                    <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06d6a0" />
                        <stop offset="100%" stopColor="#0891b2" />
                    </linearGradient>
                    <linearGradient id="lg3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                    <linearGradient id="lg4" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="centerLight" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#eef2ff" />
                        <stop offset="100%" stopColor="#e0e7ff" />
                    </linearGradient>
                    <linearGradient id="cardGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#eef2ff" />
                    </linearGradient>
                    <linearGradient id="cardGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#ecfdf5" />
                    </linearGradient>
                    <linearGradient id="cardGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#fdf2f8" />
                    </linearGradient>

                    {/* 3D shadow filter */}
                    <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="4" dy="8" stdDeviation="8" floodColor="#6366f1" floodOpacity="0.15" />
                    </filter>
                    <filter id="shadowSoft" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.08" />
                    </filter>
                    <filter id="shadowGreen" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="4" dy="8" stdDeviation="8" floodColor="#06d6a0" floodOpacity="0.2" />
                    </filter>
                    <filter id="shadowPink" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="4" dy="8" stdDeviation="8" floodColor="#ec4899" floodOpacity="0.2" />
                    </filter>
                    <filter id="glowLight" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="softBg">
                        <feGaussianBlur stdDeviation="25" />
                    </filter>

                    {/* Clip paths for 3D cards */}
                    <clipPath id="card1clip">
                        <rect x="15" y="45" width="165" height="130" rx="20" />
                    </clipPath>
                    <clipPath id="card2clip">
                        <rect x="360" y="40" width="165" height="130" rx="20" />
                    </clipPath>
                    <clipPath id="card3clip">
                        <rect x="155" y="365" width="230" height="135" rx="20" />
                    </clipPath>
                </defs>

                {/* ── Soft background blobs ── */}
                <circle cx="270" cy="240" r="180" fill="#6366f1" fillOpacity="0.04" filter="url(#softBg)">
                    <animate attributeName="r" values="180;200;180" dur="8s" repeatCount="indefinite" />
                </circle>
                <circle cx="120" cy="130" r="100" fill="#06d6a0" fillOpacity="0.06" filter="url(#softBg)">
                    <animate attributeName="cx" values="120;140;120" dur="9s" repeatCount="indefinite" />
                </circle>
                <circle cx="420" cy="380" r="110" fill="#ec4899" fillOpacity="0.05" filter="url(#softBg)">
                    <animate attributeName="cy" values="380;360;380" dur="7s" repeatCount="indefinite" />
                </circle>
                <circle cx="400" cy="120" r="80" fill="#f59e0b" fillOpacity="0.05" filter="url(#softBg)" />

                {/* ── Decorative grid dots ── */}
                {[...Array(6)].map((_, row) =>
                    [...Array(8)].map((_, col) => (
                        <circle
                            key={`${row}-${col}`}
                            cx={60 + col * 62}
                            cy={60 + row * 70}
                            r="1.5"
                            fill="#6366f1"
                            fillOpacity="0.12"
                        />
                    ))
                )}

                {/* ── Outer decorative rings ── */}
                <circle cx="270" cy="240" r="135" stroke="url(#lg1)"
                    strokeWidth="1" strokeOpacity="0.15" strokeDasharray="8 5">
                    <animateTransform attributeName="transform" type="rotate"
                        from="0 270 240" to="360 270 240" dur="25s" repeatCount="indefinite" />
                </circle>
                <circle cx="270" cy="240" r="100" stroke="url(#lg2)"
                    strokeWidth="1" strokeOpacity="0.15" strokeDasharray="5 6">
                    <animateTransform attributeName="transform" type="rotate"
                        from="360 270 240" to="0 270 240" dur="18s" repeatCount="indefinite" />
                </circle>

                {/* ── Center orb (3D effect) ── */}
                {/* Shadow */}
                <ellipse cx="270" cy="285" rx="55" ry="12"
                    fill="#6366f1" fillOpacity="0.12" filter="url(#softBg)" />
                {/* Outer glow ring */}
                <circle cx="270" cy="240" r="68" fill="white" fillOpacity="0.6"
                    stroke="url(#lg1)" strokeWidth="2" strokeOpacity="0.3">
                    <animate attributeName="r" values="68;74;68" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="fillOpacity" values="0.6;0.8;0.6" dur="4s" repeatCount="indefinite" />
                </circle>
                {/* Core */}
                <circle cx="270" cy="240" r="58" fill="url(#centerLight)"
                    stroke="url(#lg1)" strokeWidth="2.5" filter="url(#shadow3d)" />
                {/* 3D highlight */}
                <ellipse cx="258" cy="222" rx="20" ry="12"
                    fill="white" fillOpacity="0.7" transform="rotate(-20 258 222)" />

                {/* Center icon & text */}
                <text x="270" y="228" textAnchor="middle" fill="#6366f1"
                    fontSize="10" fontFamily="monospace" fontWeight="800"
                    letterSpacing="1">ELEVATE</text>
                <text x="270" y="248" textAnchor="middle" fill="#4f46e5"
                    fontSize="22" fontFamily="monospace" fontWeight="900"
                    filter="url(#glowLight)">AI</text>
                <text x="270" y="263" textAnchor="middle" fill="#8b5cf6"
                    fontSize="8" fontFamily="monospace" letterSpacing="2">✦ CORE ✦</text>

                {/* Pulse rings */}
                <circle cx="270" cy="240" r="58" stroke="#6366f1"
                    strokeWidth="2.5" fill="none" strokeOpacity="0.4">
                    <animate attributeName="r" values="58;80;58" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="strokeOpacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="270" cy="240" r="58" stroke="#a78bfa"
                    strokeWidth="1.5" fill="none" strokeOpacity="0.3">
                    <animate attributeName="r" values="58;95;58" dur="3s" repeatCount="indefinite" begin="-1s" />
                    <animate attributeName="strokeOpacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" begin="-1s" />
                </circle>

                {/* Orbiting dots */}
                <circle r="6" fill="url(#lg1)" filter="url(#glowLight)">
                    <animateMotion dur="22s" repeatCount="indefinite">
                        <mpath href="#lOrbit1" />
                    </animateMotion>
                </circle>
                <path id="lOrbit1" d="M 270 105 A 135 135 0 1 1 269.99 105" fill="none" />

                <circle r="5" fill="url(#lg2)" filter="url(#glowLight)">
                    <animateMotion dur="16s" repeatCount="indefinite" begin="-5s">
                        <mpath href="#lOrbit2" />
                    </animateMotion>
                </circle>
                <path id="lOrbit2" d="M 270 140 A 100 100 0 1 0 269.99 140" fill="none" />

                <circle r="4" fill="url(#lg3)" filter="url(#glowLight)">
                    <animateMotion dur="12s" repeatCount="indefinite" begin="-3s">
                        <mpath href="#lOrbit3" />
                    </animateMotion>
                </circle>
                <path id="lOrbit3" d="M 270 168 A 72 72 0 1 1 269.99 168" fill="none" />

                {/* ══════════════════════════════════════════
            CARD 1 — OUTFIT SCANNER (top left, 3D)
        ══════════════════════════════════════════ */}
                <g filter="url(#shadow3d)">
                    <animateTransform attributeName="transform" type="translate"
                        values="0,0; 0,-10; 0,0" dur="4s" repeatCount="indefinite" />

                    {/* 3D side face (bottom) */}
                    <path d="M 15 155 L 19 163 L 184 163 L 180 155 Z"
                        fill="#c7d2fe" fillOpacity="0.6" />
                    {/* 3D side face (right) */}
                    <path d="M 180 45 L 184 53 L 184 163 L 180 155 Z"
                        fill="#a5b4fc" fillOpacity="0.4" />

                    {/* Main card face */}
                    <rect x="15" y="45" width="165" height="130" rx="20"
                        fill="url(#cardGrad1)" stroke="url(#lg1)" strokeWidth="1.5" strokeOpacity="0.4" />

                    {/* Top gradient bar */}
                    <rect x="15" y="45" width="165" height="5" rx="3" fill="url(#lg1)" clipPath="url(#card1clip)" />

                    {/* Icon */}
                    <rect x="30" y="65" width="36" height="36" rx="10"
                        fill="#eef2ff" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="48" y="89" textAnchor="middle" fontSize="18">👗</text>

                    {/* Title */}
                    <text x="78" y="78" fill="#4f46e5" fontSize="9"
                        fontFamily="monospace" fontWeight="800" letterSpacing="0.5">OUTFIT</text>
                    <text x="78" y="91" fill="#6366f1" fontSize="9"
                        fontFamily="monospace" fontWeight="700">SCANNER</text>

                    {/* Divider */}
                    <line x1="28" y1="110" x2="172" y2="110"
                        stroke="#e0e7ff" strokeWidth="1" />

                    {/* Items */}
                    <rect x="28" y="118" width="6" height="6" rx="2" fill="#6366f1" fillOpacity="0.8" />
                    <text x="40" y="126" fill="#64748b" fontSize="7.5"
                        fontFamily="monospace">Upload Outfit Photo</text>

                    <rect x="28" y="133" width="6" height="6" rx="2" fill="#06d6a0" fillOpacity="0.8" />
                    <text x="40" y="141" fill="#64748b" fontSize="7.5"
                        fontFamily="monospace">Describe My Look</text>

                    <rect x="28" y="148" width="6" height="6" rx="2" fill="#ec4899" fillOpacity="0.8" />
                    <text x="40" y="156" fill="#64748b" fontSize="7.5"
                        fontFamily="monospace">Get AI Analysis</text>

                    {/* Shine highlight */}
                    <ellipse cx="60" cy="58" rx="30" ry="8"
                        fill="white" fillOpacity="0.5" transform="rotate(-10 60 58)" />
                </g>

                {/* ══════════════════════════════════════════
            CARD 2 — EVENT PREP (top right, 3D)
        ══════════════════════════════════════════ */}
                <g filter="url(#shadowGreen)">
                    <animateTransform attributeName="transform" type="translate"
                        values="0,0; 0,-8; 0,0" dur="5s" repeatCount="indefinite" begin="-2s" />

                    {/* 3D sides */}
                    <path d="M 360 150 L 364 158 L 529 158 L 525 150 Z"
                        fill="#a7f3d0" fillOpacity="0.5" />
                    <path d="M 525 40 L 529 48 L 529 158 L 525 150 Z"
                        fill="#6ee7b7" fillOpacity="0.35" />

                    <rect x="360" y="40" width="165" height="130" rx="20"
                        fill="url(#cardGrad2)" stroke="url(#lg2)" strokeWidth="1.5" strokeOpacity="0.4" />
                    <rect x="360" y="40" width="165" height="5" rx="3" fill="url(#lg2)" clipPath="url(#card2clip)" />

                    {/* Icon */}
                    <rect x="375" y="60" width="36" height="36" rx="10"
                        fill="#ecfdf5" stroke="#06d6a0" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="393" y="84" textAnchor="middle" fontSize="18">📋</text>

                    <text x="423" y="73" fill="#065f46" fontSize="9"
                        fontFamily="monospace" fontWeight="800" letterSpacing="0.5">EVENT</text>
                    <text x="423" y="86" fill="#06d6a0" fontSize="9"
                        fontFamily="monospace" fontWeight="700">PREP GUIDE</text>

                    <line x1="373" y1="105" x2="517" y2="105"
                        stroke="#d1fae5" strokeWidth="1" />

                    {/* Check items */}
                    <circle cx="380" cy="120" r="6" fill="#06d6a0" fillOpacity="0.15"
                        stroke="#06d6a0" strokeWidth="1" />
                    <text x="380" y="124" textAnchor="middle" fill="#06d6a0"
                        fontSize="8" fontFamily="monospace">✓</text>
                    <text x="393" y="124" fill="#64748b" fontSize="7.5"
                        fontFamily="monospace">View Outfit Guide</text>

                    <circle cx="380" cy="136" r="6" fill="#f59e0b" fillOpacity="0.15"
                        stroke="#f59e0b" strokeWidth="1" />
                    <text x="380" y="140" textAnchor="middle" fill="#f59e0b"
                        fontSize="8" fontFamily="monospace">✓</text>
                    <text x="393" y="140" fill="#64748b" fontSize="7.5"
                        fontFamily="monospace">Communication Tips</text>

                    <circle cx="380" cy="152" r="6" fill="#06d6a0" fillOpacity="0.15"
                        stroke="#06d6a0" strokeWidth="1" />
                    <text x="380" y="156" textAnchor="middle" fill="#06d6a0"
                        fontSize="8" fontFamily="monospace">✓</text>
                    <text x="393" y="156" fill="#64748b" fontSize="7.5"
                        fontFamily="monospace">Body Language Tips</text>

                    <ellipse cx="405" cy="53" rx="28" ry="7"
                        fill="white" fillOpacity="0.5" transform="rotate(-8 405 53)" />
                </g>

                {/* ══════════════════════════════════════════
            CARD 3 — AI TRAINER (bottom, 3D)
        ══════════════════════════════════════════ */}
                <g filter="url(#shadowPink)">
                    <animateTransform attributeName="transform" type="translate"
                        values="0,0; 0,-9; 0,0" dur="4.5s" repeatCount="indefinite" begin="-1s" />

                    {/* 3D sides */}
                    <path d="M 155 480 L 159 488 L 389 488 L 385 480 Z"
                        fill="#fbcfe8" fillOpacity="0.5" />
                    <path d="M 385 365 L 389 373 L 389 488 L 385 480 Z"
                        fill="#f9a8d4" fillOpacity="0.35" />

                    <rect x="155" y="365" width="230" height="135" rx="20"
                        fill="url(#cardGrad3)" stroke="url(#lg4)" strokeWidth="1.5" strokeOpacity="0.4" />
                    <rect x="155" y="365" width="230" height="5" rx="3" fill="url(#lg4)" clipPath="url(#card3clip)" />

                    {/* Icon */}
                    <rect x="172" y="385" width="40" height="40" rx="12"
                        fill="#fdf2f8" stroke="#ec4899" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="192" y="412" textAnchor="middle" fontSize="20">🤖</text>

                    <text x="225" y="398" fill="#9d174d" fontSize="9"
                        fontFamily="monospace" fontWeight="800" letterSpacing="0.5">AI TRAINER</text>
                    <text x="225" y="411" fill="#ec4899" fontSize="8"
                        fontFamily="monospace">20 MASTERY LEVELS</text>

                    <line x1="168" y1="432" x2="377" y2="432"
                        stroke="#fce7f3" strokeWidth="1" />

                    {/* 3 columns of features */}
                    <rect x="168" y="440" width="60" height="44" rx="10"
                        fill="#fdf2f8" stroke="#ec4899" strokeWidth="0.8" strokeOpacity="0.3" />
                    <text x="198" y="458" textAnchor="middle" fontSize="14">🧠</text>
                    <text x="198" y="472" textAnchor="middle" fill="#64748b"
                        fontSize="6.5" fontFamily="monospace">Quiz Module</text>
                    <text x="198" y="481" textAnchor="middle" fill="#94a3b8"
                        fontSize="5.5" fontFamily="monospace">Gram•Vocab</text>

                    <rect x="238" y="440" width="60" height="44" rx="10"
                        fill="#f0fdf4" stroke="#06d6a0" strokeWidth="0.8" strokeOpacity="0.3" />
                    <text x="268" y="458" textAnchor="middle" fontSize="14">💬</text>
                    <text x="268" y="472" textAnchor="middle" fill="#64748b"
                        fontSize="6.5" fontFamily="monospace">AI Chatbot</text>
                    <text x="268" y="481" textAnchor="middle" fill="#94a3b8"
                        fontSize="5.5" fontFamily="monospace">Practice</text>

                    <rect x="308" y="440" width="60" height="44" rx="10"
                        fill="#eef2ff" stroke="#6366f1" strokeWidth="0.8" strokeOpacity="0.3" />
                    <text x="338" y="458" textAnchor="middle" fontSize="14">📈</text>
                    <text x="338" y="472" textAnchor="middle" fill="#64748b"
                        fontSize="6.5" fontFamily="monospace">Progress</text>
                    <text x="338" y="481" textAnchor="middle" fill="#94a3b8"
                        fontSize="5.5" fontFamily="monospace">Tracking</text>

                    <ellipse cx="230" cy="378" rx="35" ry="8"
                        fill="white" fillOpacity="0.6" transform="rotate(-5 230 378)" />
                </g>

                {/* ── Connecting lines ── */}
                <line x1="180" y1="140" x2="220" y2="195"
                    stroke="url(#lg1)" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="5 4">
                    <animate attributeName="strokeOpacity" values="0.25;0.6;0.25" dur="3s" repeatCount="indefinite" />
                </line>
                <line x1="360" y1="130" x2="318" y2="192"
                    stroke="url(#lg2)" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="5 4">
                    <animate attributeName="strokeOpacity" values="0.25;0.6;0.25" dur="3.5s" repeatCount="indefinite" begin="-1s" />
                </line>
                <line x1="270" y1="365" x2="270" y2="298"
                    stroke="url(#lg4)" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="5 4">
                    <animate attributeName="strokeOpacity" values="0.25;0.6;0.25" dur="2.5s" repeatCount="indefinite" begin="-2s" />
                </line>

                {/* ── Floating particles ── */}
                {[
                    { cx: 110, cy: 200, r: 4, grad: "lg1", dur: "6s" },
                    { cx: 430, cy: 195, r: 3, grad: "lg2", dur: "7s" },
                    { cx: 145, cy: 315, r: 3.5, grad: "lg3", dur: "5s" },
                    { cx: 400, cy: 305, r: 4, grad: "lg4", dur: "8s" },
                    { cx: 270, cy: 95, r: 3, grad: "lg1", dur: "6s" },
                    { cx: 65, cy: 255, r: 2.5, grad: "lg2", dur: "9s" },
                    { cx: 475, cy: 255, r: 3, grad: "lg1", dur: "7s" },
                ].map((p, i) => (
                    <circle key={i} cx={p.cx} cy={p.cy} r={p.r}
                        fill={`url(#${p.grad})`} fillOpacity="0.6" filter="url(#glowLight)">
                        <animate attributeName="cy"
                            values={`${p.cy};${p.cy - 14};${p.cy}`}
                            dur={p.dur} repeatCount="indefinite" />
                        <animate attributeName="fillOpacity"
                            values="0.6;1;0.6" dur={p.dur} repeatCount="indefinite" />
                    </circle>
                ))}

                {/* ── Sparkle stars ── */}
                {[
                    { x: 75, y: 75, c: "#6366f1" }, { x: 465, y: 90, c: "#06d6a0" },
                    { x: 45, y: 370, c: "#ec4899" }, { x: 495, y: 345, c: "#f59e0b" },
                    { x: 135, y: 455, c: "#8b5cf6" }, { x: 415, y: 455, c: "#06d6a0" },
                    { x: 270, y: 18, c: "#6366f1" }
                ].map((s, i) => (
                    <g key={i}>
                        <line x1={s.x} y1={s.y - 7} x2={s.x} y2={s.y + 7}
                            stroke={s.c} strokeWidth="2" strokeOpacity="0.5">
                            <animate attributeName="strokeOpacity"
                                values="0.5;1;0.5" dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
                            <animate attributeName="strokeWidth"
                                values="2;2.5;2" dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
                        </line>
                        <line x1={s.x - 7} y1={s.y} x2={s.x + 7} y2={s.y}
                            stroke={s.c} strokeWidth="2" strokeOpacity="0.5">
                            <animate attributeName="strokeOpacity"
                                values="0.5;1;0.5" dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
                        </line>
                        <line x1={s.x - 4} y1={s.y - 4} x2={s.x + 4} y2={s.y + 4}
                            stroke={s.c} strokeWidth="1.2" strokeOpacity="0.35">
                            <animate attributeName="strokeOpacity"
                                values="0.35;0.7;0.35" dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
                        </line>
                        <line x1={s.x + 4} y1={s.y - 4} x2={s.x - 4} y2={s.y + 4}
                            stroke={s.c} strokeWidth="1.2" strokeOpacity="0.35">
                            <animate attributeName="strokeOpacity"
                                values="0.35;0.7;0.35" dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" />
                        </line>
                    </g>
                ))}

                {/* ── Score badge (top center) ── */}
                <g filter="url(#shadowSoft)">
                    <animateTransform attributeName="transform" type="translate"
                        values="0,0;5,0;0,0" dur="5s" repeatCount="indefinite" />
                    <rect x="210" y="14" width="120" height="32" rx="16"
                        fill="white" stroke="url(#lg3)" strokeWidth="1.5" />
                    <circle cx="232" cy="30" r="10" fill="#fef3c7" />
                    <text x="232" y="35" textAnchor="middle" fontSize="12">🏆</text>
                    <text x="285" y="27" textAnchor="middle" fill="#92400e"
                        fontSize="9" fontFamily="monospace" fontWeight="800">9.2/10</text>
                    <text x="285" y="38" textAnchor="middle" fill="#78716c"
                        fontSize="6.5" fontFamily="monospace">STYLE SCORE</text>
                </g>

                {/* ── Streak badge (left) ── */}
                <g filter="url(#shadowSoft)">
                    <animateTransform attributeName="transform" type="translate"
                        values="0,0;-4,0;0,0" dur="6s" repeatCount="indefinite" begin="-3s" />
                    <rect x="18" y="300" width="95" height="32" rx="16"
                        fill="white" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.7" />
                    <circle cx="40" cy="316" r="10" fill="#fef3c7" />
                    <text x="40" y="321" textAnchor="middle" fontSize="12">🔥</text>
                    <text x="75" y="313" textAnchor="middle" fill="#92400e"
                        fontSize="10" fontFamily="monospace" fontWeight="800">7</text>
                    <text x="92" y="313" fill="#78716c" fontSize="8"
                        fontFamily="monospace">days</text>
                    <text x="75" y="324" textAnchor="middle" fill="#a16207"
                        fontSize="6.5" fontFamily="monospace">STREAK</text>
                </g>

                {/* ── Level badge (right) ── */}
                <g filter="url(#shadowSoft)">
                    <animateTransform attributeName="transform" type="translate"
                        values="0,0;4,0;0,0" dur="7s" repeatCount="indefinite" begin="-1s" />
                    <rect x="427" y="295" width="100" height="32" rx="16"
                        fill="white" stroke="url(#lg2)" strokeWidth="1.5" strokeOpacity="0.7" />
                    <circle cx="447" cy="311" r="10" fill="#ecfdf5" />
                    <text x="447" y="316" textAnchor="middle" fill="#06d6a0"
                        fontSize="8" fontFamily="monospace" fontWeight="800">14</text>
                    <text x="490" y="308" textAnchor="middle" fill="#065f46"
                        fontSize="8" fontFamily="monospace" fontWeight="800">PRO</text>
                    <text x="490" y="319" textAnchor="middle" fill="#78716c"
                        fontSize="6" fontFamily="monospace">LEVEL ★★★</text>
                </g>

                {/* ── Mini floating pill: AI Active ── */}
                <g filter="url(#shadowSoft)">
                    <animateTransform attributeName="transform" type="translate"
                        values="0,0;0,-4;0,0" dur="3.5s" repeatCount="indefinite" />
                    <rect x="195" y="338" width="150" height="24" rx="12"
                        fill="white" stroke="url(#lg1)" strokeWidth="1.2" strokeOpacity="0.5" />
                    <circle cx="212" cy="350" r="5" fill="#6366f1" fillOpacity="0.2" />
                    <circle cx="212" cy="350" r="3" fill="#6366f1">
                        <animate attributeName="r" values="3;4;3" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <text x="228" y="354" fill="#4f46e5" fontSize="7.5"
                        fontFamily="monospace" fontWeight="700">AI Analysis Active</text>
                    <circle cx="330" cy="350" r="3" fill="#06d6a0">
                        <animate attributeName="fillOpacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
                    </circle>
                </g>

            </svg>
        </div>
    );
};

export default HeroLightVisual;