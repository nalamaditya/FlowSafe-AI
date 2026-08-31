import React from 'react';
import { Sparkles, Cpu, Radio, ShieldCheck, ArrowRight, Layers, Workflow, CheckCircle2 } from 'lucide-react';
import { FUTURE_EXPANSION_VENUES } from '../data/environmentsData';

export default function FutureScopePage() {
  const dataSources = [
    {
      title: 'Existing Optical Sensors',
      desc: 'Connects to standard CCTV feeds with lightweight edge-AI person detection without storing facial identities.',
      icon: '📹'
    },
    {
      title: 'Anonymous WiFi / BLE Probes',
      desc: 'Detects ambient mobile radio density in transit corridors for privacy-first macro footfall tracking.',
      icon: '📶'
    },
    {
      title: 'Turnstiles & Ticketing APIs',
      desc: 'Real-time entry/exit scan throughput for exact headcount validation across designated entry portals.',
      icon: '🎟️'
    },
    {
      title: 'User Context Signals',
      desc: 'Voluntary safety check-ins and timetable sync to anticipate scheduled group movements.',
      icon: '📱'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl shrink-0">🚀</span>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
              Future Scope & Scalability Architecture
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
              How FlowSafe AI scales across diverse high-footfall ecosystems using hardware-agnostic ingestion and explainable AI curves.
            </p>
          </div>
        </div>
      </div>

      {/* Core Philosophy Banner with 100% Uniform Step Cards */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md space-y-3.5">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-blue-200">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-300 shrink-0" />
          <span>CORE PHILOSOPHY</span>
        </div>

        <h3 className="text-base sm:text-xl font-extrabold tracking-tight leading-snug">
          “Don’t wait until a place becomes crowded. Know before you go.”
        </h3>

        {/* 4-Step Diagram with Identical Cohesive Glassmorphic Styling */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 pt-1 text-xs font-semibold">
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

          <div className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-center">
            <span className="text-blue-200 block text-[9px] sm:text-[10px] uppercase font-mono">Step 4</span>
            <span className="text-white font-bold text-[11px] sm:text-xs">Prevent Congestion</span>
          </div>
        </div>
      </div>

      {/* Target High-Footfall Ecosystems */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              Expansion Venues & Domain Adaptations
            </h3>
            <p className="text-[10px] sm:text-[11px] text-slate-500">
              Each environment plugs in its physical capacity thresholds and peak footfall cycles.
            </p>
          </div>
          <span className="text-[10px] font-mono text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
            Plug & Play
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
          {FUTURE_EXPANSION_VENUES.map((venue, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-400 hover:shadow-sm transition-all space-y-1.5"
            >
              <div className="text-2xl sm:text-3xl">{venue.icon}</div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">{venue.name}</h4>
              <p className="text-[10px] sm:text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                {venue.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Hardware-Agnostic Sensor Ingestion Pipeline */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3.5">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
          <Workflow className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Hardware-Agnostic Integration Pipeline</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {dataSources.map((ds, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-lg">{ds.icon}</span>
                <h5 className="text-xs font-bold text-slate-800">{ds.title}</h5>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 leading-relaxed">
                {ds.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200 flex items-center justify-between text-[10px] sm:text-[11px] text-blue-900 font-medium">
          <span>🔒 100% Privacy Compliant: Zero facial recognition, zero PII storage, edge-processed anonymized counts.</span>
        </div>
      </div>
    </div>
  );
}
