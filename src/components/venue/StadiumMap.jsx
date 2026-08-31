import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Users, Clock, AlertTriangle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function StadiumMap({ showRedistribution = false }) {
  const { liveGates, selectedGateId, setSelectedGateId, setActivePage } = useAppState();

  const getGate = (id) => liveGates.find(g => g.gateId === id) || liveGates[0];

  const gateA = getGate('gate_a'); // North
  const gateB = getGate('gate_b'); // East (Choke)
  const gateC = getGate('gate_c'); // South (Empty / Recommended)
  const gateD = getGate('gate_d'); // West

  return (
    <div className="relative w-full rounded-2xl border border-surface-800 bg-surface-900/90 p-4 md:p-6 shadow-2xl overflow-hidden">
      {/* Visual Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-800">
        <div>
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <span>🏟️ Stadium Perimeter Ingress Map</span>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-brand-500/15 text-brand-300 border border-brand-500/30">
              4 GATES
            </span>
          </h3>
          <p className="text-xs text-surface-400">
            Click any gate to inspect. Notice <strong className="text-rose-400">Gate B is bottlenecking</strong> while <strong className="text-emerald-400">Gate C is empty</strong>.
          </p>
        </div>

        <button
          onClick={() => setActivePage('redistribution')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-surface-950 text-xs font-bold shadow-md shadow-brand-500/20 transition-all active:scale-95 self-start sm:self-auto"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Fix with AI Redistribution &rarr;</span>
        </button>
      </div>

      {/* Main Stadium SVG Canvas with Big Crisp Gates */}
      <div className="relative my-4 flex items-center justify-center min-h-[460px] md:min-h-[500px]">
        <svg viewBox="0 0 800 600" className="w-full max-w-2xl h-auto drop-shadow-2xl">
          <defs>
            <radialGradient id="fieldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.05" />
            </radialGradient>

            <radialGradient id="chokeGlowEast" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Stadium Perimeter Outline */}
          <ellipse cx="400" cy="300" rx="340" ry="220" fill="#0b1120" stroke="#334155" strokeWidth="3" />
          <ellipse cx="400" cy="300" rx="335" ry="215" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="6 6" />

          {/* East Choke Halo (Gate B) */}
          <ellipse cx="640" cy="300" rx="120" ry="100" fill="url(#chokeGlowEast)" className="animate-pulse" />

          {/* Outer Seating Ring */}
          <ellipse cx="400" cy="300" rx="270" ry="170" fill="#111c33" stroke="#334155" strokeWidth="2" />

          {/* Inner Seating Ring */}
          <ellipse cx="400" cy="300" rx="200" ry="120" fill="#172554" stroke="#2563eb" strokeOpacity="0.4" strokeWidth="2" />

          {/* Center Sports Field */}
          <rect x="300" y="225" width="200" height="150" rx="14" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
          <rect x="300" y="225" width="200" height="150" rx="14" fill="url(#fieldGlow)" />
          
          <line x1="400" y1="225" x2="400" y2="375" stroke="#34d399" strokeOpacity="0.5" strokeWidth="2" />
          <circle cx="400" cy="300" r="30" fill="none" stroke="#34d399" strokeOpacity="0.5" strokeWidth="2" />
          <circle cx="400" cy="300" r="4" fill="#34d399" />

          {/* Stand Titles */}
          <text x="400" y="195" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="700">NORTH STAND</text>
          <text x="590" y="305" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="800">EAST STAND (84% CHOKE)</text>
          <text x="400" y="425" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="700">SOUTH STAND (EMPTY)</text>
          <text x="210" y="305" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="700">WEST STAND</text>

          {/* Redistribution Flow Paths (Shown when active or in redistribution mode) */}
          {showRedistribution && (
            <g>
              {/* Curve from Gate B (East) toward Gate C (South) */}
              <path 
                d="M 670 330 C 650 450, 500 520, 430 525" 
                fill="none" 
                stroke="#2dd4bf" 
                strokeWidth="4" 
                strokeDasharray="8 6" 
                className="animate-flow-dash"
              />
              <polygon points="430,520 415,525 430,530" fill="#2dd4bf" />

              {/* Curve from Gate B (East) toward Gate A (North) */}
              <path 
                d="M 670 270 C 650 150, 500 80, 430 75" 
                fill="none" 
                stroke="#2dd4bf" 
                strokeWidth="4" 
                strokeDasharray="8 6" 
                className="animate-flow-dash"
              />
              <polygon points="430,70 415,75 430,80" fill="#2dd4bf" />

              <rect x="520" y="150" width="180" height="30" rx="15" fill="#0f172a" stroke="#2dd4bf" strokeWidth="2" />
              <text x="610" y="170" textAnchor="middle" fill="#2dd4bf" fontSize="11" fontWeight="bold">REROUTING 1,125 PEOPLE</text>
            </g>
          )}
        </svg>

        {/* 4 CLEAR INTERACTIVE GATE CARDS */}

        {/* 1. GATE A (NORTH) */}
        <div 
          onClick={() => setSelectedGateId('gate_a')}
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 p-3 rounded-xl border backdrop-blur-md cursor-pointer transition-all ${
            selectedGateId === 'gate_a' 
              ? 'bg-surface-900 border-brand-400 shadow-xl scale-105 z-30' 
              : 'bg-surface-900/90 border-surface-700 hover:border-surface-500 z-20'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold text-white font-mono">GATE A (North)</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              🟢 LOW (30%)
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs font-mono">
            <span className="text-surface-300">1,200 / 4,000</span>
            <span className="text-surface-400">Wait: <strong className="text-white">4 min</strong></span>
          </div>
        </div>

        {/* 2. GATE B (EAST) — THE PROBLEM BOTTLENECK */}
        <div 
          onClick={() => setSelectedGateId('gate_b')}
          className={`absolute right-0 top-1/2 -translate-y-1/2 w-64 p-3.5 rounded-xl border backdrop-blur-md cursor-pointer transition-all ${
            selectedGateId === 'gate_b' 
              ? 'bg-surface-900 border-rose-500 shadow-2xl scale-105 z-30' 
              : 'bg-surface-900/95 border-rose-500/60 hover:border-rose-400 z-20'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-extrabold text-white font-mono">GATE B (East)</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
              🔴 CRITICAL (84%)
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs font-mono">
            <span className="text-rose-300 font-bold">3,800 / 4,500</span>
            <span className="text-rose-300">Wait: <strong className="text-white">14 min</strong></span>
          </div>

          <div className="mt-2 text-[10px] text-rose-300 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20 font-semibold flex items-center justify-between">
            <span>Predicted 96% choke in 12m</span>
            <span className="text-white underline">Inspect &rarr;</span>
          </div>
        </div>

        {/* 3. GATE C (SOUTH) — THE SOLUTION */}
        <div 
          onClick={() => setSelectedGateId('gate_c')}
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-64 p-3 rounded-xl border backdrop-blur-md cursor-pointer transition-all ${
            selectedGateId === 'gate_c' 
              ? 'bg-surface-900 border-brand-400 shadow-xl scale-105 z-30' 
              : 'bg-surface-900/90 border-brand-500/40 hover:border-brand-400 z-20'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold text-white font-mono">GATE C (South)</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              🟢 LOW (26%)
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs font-mono">
            <span className="text-surface-300">900 / 3,500</span>
            <span className="text-surface-400">Wait: <strong className="text-white">5 min</strong></span>
          </div>

          <div className="mt-1.5 text-[10px] text-brand-300 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20 font-bold text-center">
            ★ Recommended Redirection Target (74% Free)
          </div>
        </div>

        {/* 4. GATE D (WEST) */}
        <div 
          onClick={() => setSelectedGateId('gate_d')}
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-64 p-3 rounded-xl border backdrop-blur-md cursor-pointer transition-all ${
            selectedGateId === 'gate_d' 
              ? 'bg-surface-900 border-brand-400 shadow-xl scale-105 z-30' 
              : 'bg-surface-900/90 border-surface-700 hover:border-surface-500 z-20'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-xs font-bold text-white font-mono">GATE D (West)</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
              🟡 MODERATE (52%)
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs font-mono">
            <span className="text-surface-300">2,100 / 4,000</span>
            <span className="text-surface-400">Wait: <strong className="text-white">9 min</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
