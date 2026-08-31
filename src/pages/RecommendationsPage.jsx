import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { 
  Sparkles, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  TrendingDown, 
  Clock, 
  Users, 
  ShieldCheck,
  Compass,
  Zap,
  Radio
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';

export default function RecommendationsPage() {
  const { activeRecommendation, setActivePage, setSelectedGateId } = useAppState();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-wide">
              FlowSafe Recommendation Engine
            </h1>
          </div>
          <p className="text-xs text-surface-400 mt-1">
            Automated load balancing directives triggered 12–15 minutes before queue choke thresholds.
          </p>
        </div>

        <button
          onClick={() => setActivePage('redistribution')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-teal-500 hover:from-brand-500 hover:to-teal-400 text-surface-950 font-bold text-xs shadow-lg shadow-brand-500/20 transition-all active:scale-95"
        >
          <span>View Crowd Redistribution</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Alert Card */}
      <div className="relative overflow-hidden rounded-2xl border border-rose-500/40 bg-gradient-to-r from-rose-950/40 via-surface-900 to-surface-900 p-5 md:p-6 shadow-xl space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400">
                PROACTIVE INTERVENTION TRIGGERED
              </span>
              <h2 className="text-lg md:text-xl font-bold text-white">
                Gate B is expected to reach critical congestion in approximately 12 minutes.
              </h2>
            </div>
          </div>

          <StatusBadge status="ACTION REQUIRED" level="critical" pulse={true} size="lg" />
        </div>

        <p className="text-xs md:text-sm text-surface-300 max-w-3xl leading-relaxed">
          Without proactive intervention, Gate B turnstile occupancy will cross 96% with a 24-minute queue tail. FlowSafe has computed optimal deflection paths to distribute arrival density across underutilized perimeter gates.
        </p>
      </div>

      {/* Recommended Action Card */}
      <div className="rounded-2xl border border-brand-500/30 bg-surface-900/90 p-6 shadow-2xl backdrop-blur-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-400">
                RECOMMENDED ACTION PLAN
              </span>
              <h3 className="text-base font-bold text-white">
                Redirect incoming visitors toward Gate A and Gate C
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5" />
              Estimated Congestion Reduction: 18%
            </span>
          </div>
        </div>

        {/* Alternative Gate Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Target 1: Gate A */}
          <div className="p-5 rounded-xl border border-surface-700 bg-surface-850 space-y-4 hover:border-brand-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <h4 className="text-sm font-bold text-white font-mono">Gate A (North Entrance)</h4>
              </div>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                HIGH HEADROOM
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-surface-900 border border-surface-800">
                <span className="text-[10px] text-surface-400 uppercase tracking-wider block">Current Wait</span>
                <span className="text-lg font-bold font-mono text-emerald-400">4 min</span>
                <span className="text-[10px] text-surface-400 block mt-0.5">30% Occupancy</span>
              </div>

              <div className="p-3 rounded-lg bg-surface-900 border border-surface-800">
                <span className="text-[10px] text-surface-400 uppercase tracking-wider block">Predicted Wait</span>
                <span className="text-lg font-bold font-mono text-surface-200">7 min</span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">+880 capacity slot</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-surface-300 pt-2 border-t border-surface-800">
              <span>Dynamic Digital Signage: <strong>North Plaza Route</strong></span>
              <button 
                onClick={() => {
                  setSelectedGateId('gate_a');
                  setActivePage('live_venue');
                }}
                className="text-brand-400 font-bold hover:underline"
              >
                Inspect Gate A &rarr;
              </button>
            </div>
          </div>

          {/* Target 2: Gate C */}
          <div className="p-5 rounded-xl border border-brand-500/40 bg-brand-950/20 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <h4 className="text-sm font-bold text-white font-mono">Gate C (South Entrance)</h4>
              </div>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                ★ TOP RECOMMENDED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-surface-900 border border-surface-800">
                <span className="text-[10px] text-surface-400 uppercase tracking-wider block">Current Wait</span>
                <span className="text-lg font-bold font-mono text-emerald-400">5 min</span>
                <span className="text-[10px] text-surface-400 block mt-0.5">26% Occupancy</span>
              </div>

              <div className="p-3 rounded-lg bg-surface-900 border border-surface-800">
                <span className="text-[10px] text-surface-400 uppercase tracking-wider block">Predicted Wait</span>
                <span className="text-lg font-bold font-mono text-surface-200">8 min</span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">74% Unused Capacity</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-surface-300 pt-2 border-t border-surface-800">
              <span>Dynamic Digital Signage: <strong>South Concourse Route</strong></span>
              <button 
                onClick={() => {
                  setSelectedGateId('gate_c');
                  setActivePage('live_venue');
                }}
                className="text-brand-400 font-bold hover:underline"
              >
                Inspect Gate C &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Channels Execution Matrix */}
        <div className="p-4 rounded-xl bg-surface-950/70 border border-surface-800 space-y-3">
          <h4 className="text-xs font-bold text-surface-200 uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4 text-brand-400" />
            Automated Redirection Execution Channels
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-surface-900 border border-surface-800">
              <p className="font-bold text-white">1. Perimeter LED Signage</p>
              <p className="text-[11px] text-surface-400 mt-1">Updates exterior highway & walkway displays to show fastest entry gates.</p>
            </div>
            <div className="p-3 rounded-lg bg-surface-900 border border-surface-800">
              <p className="font-bold text-white">2. Mobile Ticket App Push</p>
              <p className="text-[11px] text-surface-400 mt-1">Broadcasts "Fast-Track Gate C available with &lt;5m wait" to attendees approaching East lot.</p>
            </div>
            <div className="p-3 rounded-lg bg-surface-900 border border-surface-800">
              <p className="font-bold text-white">3. Parking Shuttle Routing</p>
              <p className="text-[11px] text-surface-400 mt-1">Directs 4 incoming shuttle coaches from East depot directly to South terminal bay.</p>
            </div>
          </div>
        </div>

        {/* Prototype simulation estimate disclaimer */}
        <div className="pt-2 text-center">
          <p className="text-[11px] text-surface-500 italic">
            *Prototype simulation estimate based on multi-gate dynamic arrival equilibrium modeling.
          </p>
        </div>
      </div>
    </div>
  );
}
