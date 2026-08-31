import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Target,
  Flame,
  ShieldCheck
} from 'lucide-react';

export default function TeamPitchCard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Team Synapse³ Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-2xl p-6 shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              IDEATHON 2K26 PROJECT
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-2 tracking-tight">
              FlowSafe AI
            </h1>
            <p className="text-sm font-medium text-blue-100 italic mt-0.5">
              “Predict. Prevent. Protect.”
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-blue-200 block font-mono">TEAM</span>
            <strong className="text-xl font-extrabold text-white">Synapse³</strong>
            <p className="text-xs text-blue-100 italic">“Three Minds. One Intelligent Future.”</p>
          </div>
        </div>
      </div>

      {/* Problem vs Solution vs Innovation (3 Clean Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Problem */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-red-600 uppercase flex items-center gap-1">
            <Flame className="w-4 h-4" />
            🔴 The Problem
          </span>
          <h3 className="text-sm font-bold text-slate-900 leading-snug">
            Most existing systems react after overcrowding has already occurred.
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Individual safety concerns go unnoticed because traditional camera counters don't connect crowd density with voluntary safety assistance.
          </p>
        </div>

        {/* Solution */}
        <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-sm space-y-2 bg-blue-50/20">
          <span className="text-xs font-bold text-blue-600 uppercase flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            💡 Our Solution
          </span>
          <h3 className="text-sm font-bold text-slate-900 leading-snug">
            Predictive Crowd Intelligence + Privacy-First Safety.
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Combines historical flow curves and real-time headcounts to forecast bottlenecks 15–30 minutes early, guiding people to open areas proactively.
          </p>
        </div>

        {/* Innovation */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-2 bg-emerald-50/20">
          <span className="text-xs font-bold text-emerald-700 uppercase flex items-center gap-1">
            <Target className="w-4 h-4" />
            🏆 The Innovation Factor
          </span>
          <h3 className="text-sm font-bold text-slate-900 leading-snug">
            From Reactive ➔ Predictive ➔ Preventive
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>Traditional:</strong> Detect crowd ➔ Show crowd.<br />
            <strong>FlowSafe AI:</strong> Predict crowd ➔ Guide users ➔ Reduce congestion ➔ Improve safety!
          </p>
        </div>
      </div>
    </div>
  );
}
