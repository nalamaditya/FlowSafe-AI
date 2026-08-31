import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function StadiumMapLight({ isBalanced, onToggleBalance }) {
  // Gate metrics based on whether FlowSafe AI is ON or OFF
  const gateA = isBalanced 
    ? { name: 'Gate A (North)', crowd: '2,080', cap: '4,000', pct: 52, wait: '7m', status: 'Moderate', color: 'bg-amber-100 text-amber-800 border-amber-300' }
    : { name: 'Gate A (North)', crowd: '1,200', cap: '4,000', pct: 30, wait: '4m', status: 'Low', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };

  const gateB = isBalanced
    ? { name: 'Gate B (East)', crowd: '3,195', cap: '4,500', pct: 71, wait: '11m', status: 'Balanced 🟢', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
    : { name: 'Gate B (East)', crowd: '3,800', cap: '4,500', pct: 84, wait: '14m', status: 'Choked 🔴', color: 'bg-red-100 text-red-800 border-red-300' };

  const gateC = isBalanced
    ? { name: 'Gate C (South)', crowd: '1,645', cap: '3,500', pct: 47, wait: '6m', status: 'Balanced 🟢', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
    : { name: 'Gate C (South)', crowd: '900', cap: '3,500', pct: 26, wait: '5m', status: '74% Empty', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };

  const gateD = isBalanced
    ? { name: 'Gate D (West)', crowd: '2,400', cap: '4,000', pct: 60, wait: '9m', status: 'Moderate', color: 'bg-amber-100 text-amber-800 border-amber-300' }
    : { name: 'Gate D (West)', crowd: '2,100', cap: '4,000', pct: 52, wait: '9m', status: 'Moderate', color: 'bg-amber-100 text-amber-800 border-amber-300' };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <span>🏟️ Live Stadium Perimeter (4 Entrances)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isBalanced 
              ? '✓ FlowSafe AI has redistributed 1,125 visitors from Gate B to Gates A & C.'
              : 'Notice Gate B is approaching critical choke (84%) while Gate C is 74% empty.'}
          </p>
        </div>

        {/* 1 Big Toggle Button */}
        <button
          onClick={onToggleBalance}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 ${
            isBalanced
              ? 'bg-slate-900 hover:bg-slate-800 text-white'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/25 animate-pulse'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{isBalanced ? 'Reset to Unbalanced State' : '✨ Click: Run FlowSafe AI Balance'}</span>
        </button>
      </div>

      {/* 2D Stadium Map Canvas */}
      <div className="relative my-2 flex items-center justify-center min-h-[440px] bg-slate-50/80 rounded-2xl border border-slate-200/80 p-2 overflow-hidden">
        <svg viewBox="0 0 800 600" className="w-full max-w-2xl h-auto">
          <defs>
            <radialGradient id="fieldGrass" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#166534" />
            </radialGradient>

            <radialGradient id="chokeHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="balancedHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Stadium Perimeter */}
          <ellipse cx="400" cy="300" rx="340" ry="220" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
          <ellipse cx="400" cy="300" rx="335" ry="215" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 6" />

          {/* Choke Glow or Balanced Glow */}
          {!isBalanced ? (
            <ellipse cx="640" cy="300" rx="120" ry="100" fill="url(#chokeHalo)" className="animate-pulse" />
          ) : (
            <ellipse cx="640" cy="300" rx="100" ry="80" fill="url(#balancedHalo)" />
          )}

          {/* Stand Tiers */}
          <ellipse cx="400" cy="300" rx="270" ry="170" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          <ellipse cx="400" cy="300" rx="200" ry="120" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />

          {/* Playing Field */}
          <rect x="300" y="225" width="200" height="150" rx="12" fill="url(#fieldGrass)" stroke="#15803d" strokeWidth="2" />
          <line x1="400" y1="225" x2="400" y2="375" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2" />
          <circle cx="400" cy="300" r="28" fill="none" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2" />
          <circle cx="400" cy="300" r="3" fill="#ffffff" />

          {/* Sector Labels */}
          <text x="400" y="195" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">NORTH STAND</text>
          <text x="590" y="305" textAnchor="middle" fill={isBalanced ? "#15803d" : "#b91c1c"} fontSize="12" fontWeight="bold">
            {isBalanced ? "EAST STAND (BALANCED 71%)" : "EAST STAND (84% CHOKED)"}
          </text>
          <text x="400" y="425" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="bold">SOUTH STAND</text>
          <text x="210" y="305" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">WEST STAND</text>

          {/* Animated Redistribution Arrows when balanced */}
          {isBalanced && (
            <g>
              {/* Curve toward Gate C */}
              <path d="M 670 330 C 650 450, 500 520, 430 525" fill="none" stroke="#0284c7" strokeWidth="4" strokeDasharray="8 6" className="animate-flow-dash" />
              <polygon points="430,520 415,525 430,530" fill="#0284c7" />

              {/* Curve toward Gate A */}
              <path d="M 670 270 C 650 150, 500 80, 430 75" fill="none" stroke="#0284c7" strokeWidth="4" strokeDasharray="8 6" className="animate-flow-dash" />
              <polygon points="430,70 415,75 430,80" fill="#0284c7" />

              <rect x="520" y="145" width="190" height="30" rx="15" fill="#0284c7" />
              <text x="615" y="165" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">REROUTING 1,125 PEOPLE</text>
            </g>
          )}
        </svg>

        {/* 4 Crisp White Gate Cards */}

        {/* GATE A (NORTH) */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-60 p-3 bg-white rounded-xl border border-slate-200 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 font-mono">GATE A (North)</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${gateA.color}`}>
              {gateA.pct}% • {gateA.status}
            </span>
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-slate-600 font-mono">
            <span>{gateA.crowd} / {gateA.cap}</span>
            <span>Wait: <strong>{gateA.wait}</strong></span>
          </div>
        </div>

        {/* GATE B (EAST) — THE CHOKE */}
        <div className={`absolute right-2 top-1/2 -translate-y-1/2 w-64 p-3.5 bg-white rounded-xl border shadow-lg transition-all ${
          !isBalanced ? 'border-red-400 ring-2 ring-red-400/20' : 'border-emerald-400'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 font-mono">GATE B (East)</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${gateB.color}`}>
              {gateB.pct}% • {gateB.status}
            </span>
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-slate-700 font-mono">
            <span>{gateB.crowd} / {gateB.cap}</span>
            <span>Wait: <strong className={!isBalanced ? 'text-red-600 font-bold' : 'text-slate-900'}>{gateB.wait}</strong></span>
          </div>
          {!isBalanced ? (
            <p className="text-[10px] text-red-600 font-semibold mt-1 bg-red-50 p-1 rounded">
              ⚠️ Predicted 96% critical choke in 12 min
            </p>
          ) : (
            <p className="text-[10px] text-emerald-700 font-semibold mt-1 bg-emerald-50 p-1 rounded">
              ✓ Relieved: -1,125 visitors redirected
            </p>
          )}
        </div>

        {/* GATE C (SOUTH) — THE EMPTY ROUTE */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-60 p-3 bg-white rounded-xl border border-slate-200 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 font-mono">GATE C (South)</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${gateC.color}`}>
              {gateC.pct}% • {gateC.status}
            </span>
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-slate-600 font-mono">
            <span>{gateC.crowd} / {gateC.cap}</span>
            <span>Wait: <strong>{gateC.wait}</strong></span>
          </div>
          {!isBalanced && (
            <p className="text-[10px] text-emerald-700 font-semibold mt-1">
              ★ Best Alternative (Lowest Queue)
            </p>
          )}
        </div>

        {/* GATE D (WEST) */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-60 p-3 bg-white rounded-xl border border-slate-200 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 font-mono">GATE D (West)</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${gateD.color}`}>
              {gateD.pct}% • {gateD.status}
            </span>
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-slate-600 font-mono">
            <span>{gateD.crowd} / {gateD.cap}</span>
            <span>Wait: <strong>{gateD.wait}</strong></span>
          </div>
        </div>
      </div>

      {/* Before vs After Impact Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <span className="text-xs text-slate-500 font-medium">Peak Choke Danger</span>
          <div className="text-xl font-extrabold text-slate-900 mt-0.5 font-mono">
            {isBalanced ? (
              <span className="text-emerald-600">96% ➔ 71% (-25%)</span>
            ) : (
              <span className="text-red-600">96% Critical</span>
            )}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <span className="text-xs text-slate-500 font-medium">Average Wait Time</span>
          <div className="text-xl font-extrabold text-slate-900 mt-0.5 font-mono">
            {isBalanced ? (
              <span className="text-blue-600">24m ➔ 11m (54% Faster)</span>
            ) : (
              <span className="text-red-600">24 mins delay</span>
            )}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <span className="text-xs text-slate-500 font-medium">Crowd Management</span>
          <div className="text-xl font-extrabold text-slate-900 mt-0.5 font-mono">
            {isBalanced ? (
              <span className="text-emerald-600">Proactive Balance ✓</span>
            ) : (
              <span className="text-slate-700">Unbalanced Load</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
