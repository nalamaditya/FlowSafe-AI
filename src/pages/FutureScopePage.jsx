import React from 'react';
import { Sparkles } from 'lucide-react';
import { FUTURE_EXPANSION_VENUES } from '../data/environmentsData';

export default function FutureScopePage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Built for High-Footfall Environments
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              The same context-aware prediction engine adapts to different high-density venues using their historical crowd patterns and operational conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Future Expansion Venues */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {FUTURE_EXPANSION_VENUES.map((venue, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all space-y-2"
          >
            <div className="text-3xl">{venue.icon}</div>
            <h3 className="text-xs font-bold text-slate-900">{venue.name}</h3>
            <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
              {venue.description}
            </p>
          </div>
        ))}
      </div>

      {/* Core Philosophy Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-blue-200">
          <Sparkles className="w-4 h-4 text-blue-300" />
          <span>CORE PHILOSOPHY</span>
        </div>

        <h3 className="text-lg md:text-xl font-extrabold tracking-tight">
          “Don’t wait until a place becomes crowded. Know before you go.”
        </h3>

        {/* 4-Step Diagram */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-2 text-xs font-semibold">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-center">
            <span className="text-blue-200 block text-[10px] uppercase font-mono">Step 1</span>
            <span>Live Crowd Detection</span>
          </div>

          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-center">
            <span className="text-blue-200 block text-[10px] uppercase font-mono">Step 2</span>
            <span>Historical Pattern Analysis</span>
          </div>

          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-center">
            <span className="text-blue-200 block text-[10px] uppercase font-mono">Step 3</span>
            <span>AI Congestion Prediction</span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-500/30 backdrop-blur-sm border border-emerald-400/40 text-center text-emerald-200">
            <span className="text-emerald-300 block text-[10px] uppercase font-mono">Step 4</span>
            <span className="text-white font-bold">Prevent Congestion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
