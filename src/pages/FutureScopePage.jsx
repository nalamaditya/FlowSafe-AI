import React from 'react';
import { Sparkles, Cpu, Radio, ShieldCheck, ArrowRight, Layers, Workflow, CheckCircle2 } from 'lucide-react';
import { FUTURE_EXPANSION_VENUES } from '../data/environmentsData';

export default function FutureScopePage() {
  const dataSources = [
    {
      title: 'Existing Optical Sensors',
      desc: 'Connects to standard CCTV feeds with lightweight edge-AI person detection without storing facial identities.',
      icon: '📹',
      badge: 'Input Layer',
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Anonymous WiFi / BLE Probes',
      desc: 'Detects ambient mobile radio density in transit corridors for privacy-first macro footfall tracking.',
      icon: '📶',
      badge: 'Perception Layer',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Turnstiles & Ticketing APIs',
      desc: 'Real-time entry/exit scan throughput for exact headcount validation across designated entry portals.',
      icon: '🎟️',
      badge: 'Verification Layer',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'User Context Signals',
      desc: 'Voluntary safety check-ins and timetable sync to anticipate scheduled group movements.',
      icon: '📱',
      badge: 'Context Layer',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-2">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 text-2xl font-black shadow-md shrink-0">
            🚀
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 font-mono">
                System Scalability & Roadmap
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Future Scope & Ingestion Architecture
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              How FlowSafe AI scales across diverse high-footfall ecosystems using hardware-agnostic ingestion and explainable AI curves.
            </p>
          </div>
        </div>
      </div>

      {/* Beta01 Architecture Header Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 font-mono">
            CORE SYSTEM PHILOSOPHY
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            “Don’t wait until a place becomes crowded. Know before you go.”
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The end-to-end intelligent pipeline transforming raw real-time sensor pulses into proactive, schedule-shifting guidance.
          </p>
        </div>
      </div>

      {/* Beta01 Process Step Flow Bar */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 rounded-3xl border border-slate-800 text-white flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-amber-500/20 text-amber-400 rounded-lg font-bold">1. SENSOR PULSE</span>
          <span className="text-slate-500">➔</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="p-2 bg-purple-500/20 text-purple-400 rounded-lg font-bold">2. LIVE CROWD DETECT</span>
          <span className="text-slate-500">➔</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="p-2 bg-blue-500/20 text-blue-400 rounded-lg font-bold">3. HISTORICAL PATTERN</span>
          <span className="text-slate-500">➔</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="p-2 bg-rose-500/20 text-rose-400 rounded-lg font-bold">4. AI CONGESTION FORECAST</span>
          <span className="text-slate-500">➔</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg font-bold">5. PREVENT BOTTLENECK</span>
        </div>
      </div>

      {/* Target High-Footfall Ecosystems */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
              Expansion Venues & Domain Adaptations
            </h3>
            <p className="text-xs text-slate-500">
              Each environment plugs in its physical capacity thresholds and peak footfall cycles.
            </p>
          </div>
          <span className="text-[11px] font-mono text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Plug & Play
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FUTURE_EXPANSION_VENUES.map((venue, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all space-y-2 group"
            >
              <div className="text-3xl group-hover:scale-110 transition-transform">{venue.icon}</div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{venue.name}</h4>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {venue.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Hardware-Agnostic Sensor Ingestion Pipeline (Beta01 Step Cards Style) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider font-mono">
          <Workflow className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Hardware-Agnostic Integration Pipeline</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dataSources.map((ds, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${ds.color} flex items-center justify-center text-white text-xl shadow-md`}>
                    {ds.icon}
                  </div>
                  <span className="text-xs font-black text-slate-400 font-mono">0{idx + 1}</span>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-mono">
                  {ds.badge}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{ds.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {ds.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                <span>Autonomous Telemetry</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between text-xs text-blue-900 font-medium">
          <span>🔒 100% Privacy Compliant: Zero facial recognition, zero PII storage, edge-processed anonymized counts.</span>
        </div>
      </div>
    </div>
  );
}
