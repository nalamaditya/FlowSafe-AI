import React, { useState } from 'react';
import { Sparkles, Flame, Users, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CampusHeatmap() {
  const [isBalanced, setIsBalanced] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [selectedZone, setSelectedZone] = useState('canteen');

  // Zones data with toggleable balanced state
  const zones = [
    {
      id: 'canteen',
      name: '🍔 Main Canteen & Food Court',
      x: 80,
      y: 70,
      w: 280,
      h: 170,
      current: isBalanced ? 980 : 1420,
      capacity: 1500,
      pct: isBalanced ? 65 : 95,
      wait: isBalanced ? '6 min' : '18 min',
      status: isBalanced ? 'Balanced 🟢' : 'Choked 🔴',
      color: isBalanced ? '#10b981' : '#ef4444',
      bgClass: isBalanced ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-400 ring-2 ring-red-400/30',
      pred15: isBalanced ? '1,050 (Safe)' : '1,490 (99% Full)',
      predNote: isBalanced ? '✓ 450 students redirected to South Cafe 2' : '⚠️ Lunch rush peak in 10 mins — will choke',
      desc: 'Central student cafeteria during 1:00 PM lunch interval.'
    },
    {
      id: 'auditorium',
      name: '🎭 Grand Auditorium Hall',
      x: 440,
      y: 70,
      w: 280,
      h: 170,
      current: isBalanced ? 1400 : 1850,
      capacity: 2000,
      pct: isBalanced ? 70 : 92,
      wait: isBalanced ? '4 min' : '15 min',
      status: isBalanced ? 'Balanced 🟢' : 'Choked 🔴',
      color: isBalanced ? '#10b981' : '#ef4444',
      bgClass: isBalanced ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-400 ring-2 ring-red-400/30',
      pred15: isBalanced ? '1,450 (Normal)' : '1,980 (Overflow)',
      predNote: isBalanced ? '✓ Side balcony doors opened 15m early' : '⚠️ Hackathon & Ideathon keynote rush starting',
      desc: 'Main convention venue for university events and hackathons.'
    },
    {
      id: 'library',
      name: '📚 Central Digital Library',
      x: 80,
      y: 290,
      w: 280,
      h: 150,
      current: isBalanced ? 650 : 450,
      capacity: 1500,
      pct: isBalanced ? 43 : 30,
      wait: '0 min',
      status: 'Free 🟢',
      color: '#10b981',
      bgClass: 'bg-emerald-50 border-emerald-300',
      pred15: '520 (Spacious)',
      predNote: 'Lots of free study space & power sockets',
      desc: 'Quiet study center, air conditioned with free seating.'
    },
    {
      id: 'labs',
      name: '🔬 Engineering & AI Labs Block',
      x: 440,
      y: 290,
      w: 280,
      h: 150,
      current: isBalanced ? 620 : 620,
      capacity: 1200,
      pct: 51,
      wait: '2 min',
      status: 'Normal 🟡',
      color: '#f59e0b',
      bgClass: 'bg-amber-50 border-amber-300',
      pred15: '680 (Normal)',
      predNote: 'Practical lab classes running on schedule',
      desc: 'Computer labs and robotics research centers.'
    },
    {
      id: 'gate_main',
      name: '🚪 Campus Main Gate & Bus Bay',
      x: 260,
      y: 470,
      w: 280,
      h: 90,
      current: isBalanced ? 950 : 1080,
      capacity: 1800,
      pct: isBalanced ? 52 : 60,
      wait: isBalanced ? '3 min' : '5 min',
      status: 'Normal 🟡',
      color: '#f59e0b',
      bgClass: 'bg-slate-50 border-slate-300',
      pred15: '1,200 (Arrivals)',
      predNote: 'College transit buses arriving on time',
      desc: 'Main perimeter entrance with security turnstiles.'
    }
  ];

  const activeZoneObj = zones.find(z => z.id === selectedZone) || zones[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏫</span>
            <h2 className="text-lg font-extrabold text-slate-900">
              College Campus Crowd Heatmap & Prediction
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any campus area (Canteen, Auditorium, Library) to see real-time crowd and 15-minute prediction.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Heatmap Layer Toggle */}
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
              showHeatmap
                ? 'bg-orange-50 text-orange-700 border-orange-300'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Heatmap: {showHeatmap ? 'ON' : 'OFF'}</span>
          </button>

          {/* 1 Big AI Balance Button */}
          <button
            onClick={() => setIsBalanced(!isBalanced)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 ${
              isBalanced
                ? 'bg-slate-900 hover:bg-slate-800 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/25 animate-pulse'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isBalanced ? 'Reset to Choked State' : '✨ Click: Balance Campus Crowd with AI'}</span>
          </button>
        </div>
      </div>

      {/* Main 2D Interactive Campus Heatmap Canvas */}
      <div className="relative bg-slate-100/70 rounded-2xl border border-slate-200 p-2 overflow-hidden">
        <svg viewBox="0 0 800 580" className="w-full h-auto drop-shadow-sm">
          <defs>
            {/* Heatmap Gradients */}
            <radialGradient id="heatRed" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={showHeatmap ? "0.45" : "0"} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="heatGreen" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity={showHeatmap ? "0.3" : "0"} />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Campus Grass Base */}
          <rect width="800" height="580" rx="16" fill="#f8fafc" />

          {/* Walkways between buildings */}
          <path d="M 220 150 L 220 360 L 580 360 L 580 150 Z" fill="none" stroke="#e2e8f0" strokeWidth="32" strokeLinejoin="round" />
          <path d="M 400 360 L 400 510" fill="none" stroke="#e2e8f0" strokeWidth="32" strokeLinecap="round" />

          {/* Heatmap Glows behind Canteen & Auditorium */}
          {!isBalanced ? (
            <>
              <circle cx="220" cy="150" r="140" fill="url(#heatRed)" className="animate-pulse" />
              <circle cx="580" cy="150" r="140" fill="url(#heatRed)" className="animate-pulse" />
            </>
          ) : (
            <>
              <circle cx="220" cy="150" r="110" fill="url(#heatGreen)" />
              <circle cx="580" cy="150" r="110" fill="url(#heatGreen)" />
            </>
          )}

          {/* Heatmap Glow behind Library */}
          <circle cx="220" cy="360" r="110" fill="url(#heatGreen)" />

          {/* Redistribution Flow Arrow from Canteen toward Library/South Area when balanced */}
          {isBalanced && (
            <g>
              <path d="M 220 230 L 220 290" fill="none" stroke="#0284c7" strokeWidth="4" strokeDasharray="6 4" className="animate-flow-dash" />
              <polygon points="220,300 215,285 225,285" fill="#0284c7" />

              <path d="M 580 230 L 580 290" fill="none" stroke="#0284c7" strokeWidth="4" strokeDasharray="6 4" className="animate-flow-dash" />
              <polygon points="580,300 575,285 585,285" fill="#0284c7" />

              <rect x="290" y="240" width="220" height="28" rx="14" fill="#0284c7" />
              <text x="400" y="258" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">FLOW BALANCED (-450 REROUTED)</text>
            </g>
          )}
        </svg>

        {/* 5 Interactive Campus Zone Cards Positioned Over Map */}

        {/* 1. CANTEEN (Top Left) */}
        <div 
          onClick={() => setSelectedZone('canteen')}
          className={`absolute top-4 left-4 w-72 p-3.5 bg-white rounded-xl border shadow-md cursor-pointer transition-all ${
            selectedZone === 'canteen' ? 'ring-2 ring-blue-500 scale-105 z-20' : 'hover:border-slate-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">🍔 Main Canteen</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${zones[0].bgClass}`}>
              {zones[0].pct}% • {zones[0].status}
            </span>
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-slate-600 font-mono">
            <span>{zones[0].current} / {zones[0].capacity} seats</span>
            <span>Wait: <strong className={!isBalanced ? 'text-red-600' : 'text-emerald-700'}>{zones[0].wait}</strong></span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 truncate">
            {zones[0].predNote}
          </p>
        </div>

        {/* 2. AUDITORIUM (Top Right) */}
        <div 
          onClick={() => setSelectedZone('auditorium')}
          className={`absolute top-4 right-4 w-72 p-3.5 bg-white rounded-xl border shadow-md cursor-pointer transition-all ${
            selectedZone === 'auditorium' ? 'ring-2 ring-blue-500 scale-105 z-20' : 'hover:border-slate-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">🎭 Grand Auditorium</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${zones[1].bgClass}`}>
              {zones[1].pct}% • {zones[1].status}
            </span>
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-slate-600 font-mono">
            <span>{zones[1].current} / {zones[1].capacity} seats</span>
            <span>Wait: <strong className={!isBalanced ? 'text-red-600' : 'text-emerald-700'}>{zones[1].wait}</strong></span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 truncate">
            {zones[1].predNote}
          </p>
        </div>

        {/* 3. LIBRARY (Bottom Left) */}
        <div 
          onClick={() => setSelectedZone('library')}
          className={`absolute bottom-24 left-4 w-72 p-3.5 bg-white rounded-xl border shadow-md cursor-pointer transition-all ${
            selectedZone === 'library' ? 'ring-2 ring-blue-500 scale-105 z-20' : 'hover:border-slate-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">📚 Central Library</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
              {zones[2].pct}% • Free 🟢
            </span>
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-slate-600 font-mono">
            <span>{zones[2].current} / {zones[2].capacity} desks</span>
            <span>Wait: <strong>0 min</strong></span>
          </div>
          <p className="text-[10px] text-emerald-700 font-semibold mt-1">
            ★ Best quiet study & waiting area
          </p>
        </div>

        {/* 4. LABS BLOCK (Bottom Right) */}
        <div 
          onClick={() => setSelectedZone('labs')}
          className={`absolute bottom-24 right-4 w-72 p-3.5 bg-white rounded-xl border shadow-md cursor-pointer transition-all ${
            selectedZone === 'labs' ? 'ring-2 ring-blue-500 scale-105 z-20' : 'hover:border-slate-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">🔬 Engineering Labs</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
              {zones[3].pct}% • Normal 🟡
            </span>
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-slate-600 font-mono">
            <span>{zones[3].current} / {zones[3].capacity} students</span>
            <span>Wait: <strong>2 min</strong></span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 truncate">
            Operating normally on class schedule
          </p>
        </div>

        {/* 5. CAMPUS MAIN GATE (Bottom Center) */}
        <div 
          onClick={() => setSelectedZone('gate_main')}
          className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-80 p-3 bg-white rounded-xl border shadow-md cursor-pointer transition-all ${
            selectedZone === 'gate_main' ? 'ring-2 ring-blue-500 scale-105 z-20' : 'hover:border-slate-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">🚪 Main Gate & Bus Bay</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300">
              {zones[4].pct}% • Ingress Flow
            </span>
          </div>
          <div className="mt-1 flex justify-between text-xs text-slate-600 font-mono">
            <span>{zones[4].current} / {zones[4].capacity}</span>
            <span>Gate Queue: <strong>{zones[4].wait}</strong></span>
          </div>
        </div>
      </div>

      {/* Selected Zone Deep Dive: Simple & Layman Friendly */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Inspection: {activeZoneObj.name}
            </h4>
            <p className="text-xs text-slate-500">{activeZoneObj.desc}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono px-3 py-1 rounded-lg bg-white border border-slate-300">
              Crowd: {activeZoneObj.current} / {activeZoneObj.capacity} ({activeZoneObj.pct}%)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">15-Minute AI Prediction</span>
            <div className="text-sm font-bold text-slate-900">{activeZoneObj.pred15}</div>
            <p className="text-[11px] text-slate-600">{activeZoneObj.predNote}</p>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">FlowSafe Recommendation</span>
            <div className="text-sm font-bold text-blue-600">
              {isBalanced ? '✓ Proactive Balance Active' : 'Divert traffic & open secondary gates early'}
            </div>
            <p className="text-[11px] text-slate-600">
              {isBalanced 
                ? 'Queue delay reduced by 66% with zero overcrowding.' 
                : 'Click the blue "Balance Campus Crowd" button above to activate.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
