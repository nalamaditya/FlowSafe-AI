import React from 'react';
import { Layers, ArrowRight, ShieldCheck, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { FUTURE_EXPANSION_VENUES } from '../data/environmentsData';

export default function FutureExpansion({ onSelectEnvironment }) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-6">
      {/* Title & Core Philosophy */}
      <div className="space-y-2 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            FUTURE SCOPE
          </span>
          <h2 className="text-lg font-extrabold text-slate-900">
            Built for High-Footfall Environments
          </h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          The same context-aware prediction engine adapts to any high-density venue by learning its historical footfall curves, transit schedules, and operational bottlenecks.
        </p>
      </div>

      {/* Grid of 8 Future High-Footfall Venues */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {FUTURE_EXPANSION_VENUES.map((venue, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all space-y-2"
          >
            <div className="text-3xl">{venue.icon}</div>
            <h3 className="text-xs font-bold text-slate-900">{venue.name}</h3>
            <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
              {venue.description}
            </p>
          </div>
        ))}
      </div>

      {/* Core Message Callout Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-blue-200">
          <Sparkles className="w-4 h-4 text-blue-300" />
          <span>CORE PHILOSOPHY</span>
        </div>

        <h3 className="text-lg md:text-xl font-extrabold tracking-tight">
          “Don’t wait until a place becomes crowded. Know before you go.”
        </h3>

        {/* 4-Step Diagram */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 text-xs font-semibold">
          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-center">
            <span className="text-blue-200 block text-[10px] uppercase font-mono">Step 1</span>
            <span>Live Now & Current Crowd</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-center">
            <span className="text-blue-200 block text-[10px] uppercase font-mono">Step 2</span>
            <span>Historical Pattern Analysis</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-center">
            <span className="text-blue-200 block text-[10px] uppercase font-mono">Step 3</span>
            <span>AI Crowd Prediction</span>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-500/30 backdrop-blur-sm border border-emerald-400/40 text-center text-emerald-200">
            <span className="text-emerald-300 block text-[10px] uppercase font-mono">Step 4</span>
            <span className="text-white font-bold">Prevent Congestion</span>
          </div>
        </div>
      </div>
    </section>
  );
}
