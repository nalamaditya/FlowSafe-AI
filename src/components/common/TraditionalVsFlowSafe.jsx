import React from 'react';
import { ArrowRight, AlertTriangle, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function TraditionalVsFlowSafe({ compact = false }) {
  if (compact) {
    return (
      <div className="rounded-xl border border-surface-800 bg-surface-900/80 p-3.5 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-surface-400">
            <span className="font-semibold text-rose-400 uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">Traditional</span>
            <span>Detect</span>
            <ArrowRight className="w-3 h-3 text-surface-600" />
            <span>Alert</span>
            <ArrowRight className="w-3 h-3 text-surface-600" />
            <span className="text-surface-300 font-medium">React (Too late)</span>
          </div>

          <div className="hidden md:block h-4 w-px bg-surface-800" />

          <div className="flex items-center gap-2 text-surface-200">
            <span className="font-semibold text-brand-400 uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-brand-500/10 border border-brand-500/20">FlowSafe AI</span>
            <span className="text-brand-300 font-semibold">Predict</span>
            <ArrowRight className="w-3 h-3 text-brand-500" />
            <span className="text-brand-300 font-semibold">Recommend</span>
            <ArrowRight className="w-3 h-3 text-brand-500" />
            <span className="text-brand-300 font-semibold">Redistribute</span>
            <ArrowRight className="w-3 h-3 text-brand-500" />
            <span className="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Prevent</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-surface-800 bg-gradient-to-b from-surface-900 to-surface-950 p-6 shadow-xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-40 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-40 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="text-center space-y-1 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <Activity className="w-3.5 h-3.5" />
            Paradigm Shift in Crowd Intelligence
          </span>
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
            Stop Reacting to Stampedes. Start Preventing Bottlenecks.
          </h3>
          <p className="text-xs md:text-sm text-surface-400">
            Traditional camera sensors merely count people when congestion is already severe. FlowSafe AI projects future queue curves and intervenes 15–30 minutes before critical thresholds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Traditional Way */}
          <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Traditional Crowd Management</span>
              </div>
              <span className="text-[11px] font-mono text-rose-300/80 bg-rose-500/10 px-2 py-0.5 rounded">REACTIVE</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-center flex-1">
                <div className="w-8 h-8 rounded-full mx-auto bg-surface-800 border border-surface-700 flex items-center justify-center text-xs font-mono font-bold text-surface-300">1</div>
                <p className="text-xs font-semibold text-surface-200 mt-1">DETECT</p>
                <p className="text-[10px] text-surface-400">Sensors see choke</p>
              </div>
              <ArrowRight className="w-4 h-4 text-rose-500/40" />
              <div className="text-center flex-1">
                <div className="w-8 h-8 rounded-full mx-auto bg-surface-800 border border-surface-700 flex items-center justify-center text-xs font-mono font-bold text-surface-300">2</div>
                <p className="text-xs font-semibold text-surface-200 mt-1">ALERT</p>
                <p className="text-[10px] text-surface-400">Alarm triggers</p>
              </div>
              <ArrowRight className="w-4 h-4 text-rose-500/40" />
              <div className="text-center flex-1">
                <div className="w-8 h-8 rounded-full mx-auto bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-xs font-mono font-bold text-rose-300">3</div>
                <p className="text-xs font-semibold text-rose-400 mt-1">REACT</p>
                <p className="text-[10px] text-rose-300/80">Crowd trapped</p>
              </div>
            </div>
          </div>

          {/* FlowSafe Way */}
          <div className="rounded-xl border border-brand-500/30 bg-brand-950/20 p-4 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-brand-500/20 text-brand-400 border border-brand-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-300">FlowSafe AI Platform</span>
              </div>
              <span className="text-[11px] font-mono text-brand-300 bg-brand-500/20 px-2 py-0.5 rounded border border-brand-500/30 font-semibold">PROACTIVE</span>
            </div>

            <div className="flex items-center justify-between pt-2 relative z-10">
              <div className="text-center flex-1">
                <div className="w-7 h-7 rounded-full mx-auto bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-[11px] font-mono font-bold text-brand-300">1</div>
                <p className="text-[11px] font-bold text-brand-300 mt-1">PREDICT</p>
                <p className="text-[9px] text-surface-400">15m-30m ahead</p>
              </div>
              <ArrowRight className="w-3 h-3 text-brand-400" />
              <div className="text-center flex-1">
                <div className="w-7 h-7 rounded-full mx-auto bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-[11px] font-mono font-bold text-brand-300">2</div>
                <p className="text-[11px] font-bold text-brand-300 mt-1">RECOMMEND</p>
                <p className="text-[9px] text-surface-400">Alternate gates</p>
              </div>
              <ArrowRight className="w-3 h-3 text-brand-400" />
              <div className="text-center flex-1">
                <div className="w-7 h-7 rounded-full mx-auto bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-[11px] font-mono font-bold text-brand-300">3</div>
                <p className="text-[11px] font-bold text-brand-300 mt-1">REDISTRIBUTE</p>
                <p className="text-[9px] text-surface-400">Balance ingress</p>
              </div>
              <ArrowRight className="w-3 h-3 text-emerald-400" />
              <div className="text-center flex-1">
                <div className="w-7 h-7 rounded-full mx-auto bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[11px] font-mono font-bold text-emerald-300">4</div>
                <p className="text-[11px] font-bold text-emerald-400 mt-1">PREVENT</p>
                <p className="text-[9px] text-emerald-300">Zero stampede</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
