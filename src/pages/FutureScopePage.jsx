import React from 'react';
import { Sparkles } from 'lucide-react';
import { FUTURE_EXPANSION_VENUES } from '../data/environmentsData';

export default function FutureScopePage() {
  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl shrink-0">🚀</span>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
              Built for High-Footfall Environments
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
              The same context-aware prediction engine adapts to different high-density venues using their historical crowd patterns and operational conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Future Expansion Venues */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        {FUTURE_EXPANSION_VENUES.map((venue, idx) => (
          <div
            key={idx}
            className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all space-y-1.5 sm:space-y-2"
          >
            <div className="text-2xl sm:text-3xl">{venue.icon}</div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">{venue.name}</h3>
            <p className="text-[10px] sm:text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
              {venue.description}
            </p>
          </div>
        ))}
      </div>

      {/* Core Philosophy Banner */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-blue-200">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-300 shrink-0" />
          <span>CORE PHILOSOPHY</span>
        </div>

        <h3 className="text-base sm:text-xl font-extrabold tracking-tight leading-snug">
          “Don’t wait until a place becomes crowded. Know before you go.”
        </h3>

        {/* 4-Step Diagram (2x2 on mobile, 4 in a row on tablet/desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 pt-2 text-xs font-semibold">
          <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-center">
            <span className="text-blue-200 block text-[9px] sm:text-[10px] uppercase font-mono">Step 1</span>
            <span className="text-[11px] sm:text-xs">Live Crowd Detection</span>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-center">
            <span className="text-blue-200 block text-[9px] sm:text-[10px] uppercase font-mono">Step 2</span>
            <span className="text-[11px] sm:text-xs">Historical Analysis</span>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-center">
            <span className="text-blue-200 block text-[9px] sm:text-[10px] uppercase font-mono">Step 3</span>
            <span className="text-[11px] sm:text-xs">AI Congestion Forecast</span>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-500/30 backdrop-blur-sm border border-emerald-400/40 text-center text-emerald-200">
            <span className="text-emerald-300 block text-[9px] sm:text-[10px] uppercase font-mono">Step 4</span>
            <span className="text-white font-bold text-[11px] sm:text-xs">Prevent Congestion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
