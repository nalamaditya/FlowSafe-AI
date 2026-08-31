import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { simulateEmergency } from '../services/predictionService';
import { 
  AlertOctagon, 
  Flame, 
  ArrowRight, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  DoorClosed, 
  RotateCcw,
  Sparkles,
  Zap
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';

export default function EmergencyPage() {
  const { activeEnvironment } = useAppState();
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [blockedExit, setBlockedExit] = useState('Exit B');

  const emergencyData = simulateEmergency(activeEnvironment, blockedExit);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30">
              <AlertOctagon className="w-5 h-5" />
            </span>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-wide">
              Emergency Decision Support & Evacuation Simulation
            </h1>
          </div>
          <p className="text-xs text-surface-400 mt-1">
            Dynamic egress corridor re-routing in response to simulated physical obstructions and hazard zones.
          </p>
        </div>

        <button
          onClick={() => setIsEmergencyActive(!isEmergencyActive)}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-xl transition-all active:scale-95 ${
            isEmergencyActive
              ? 'bg-surface-800 hover:bg-surface-700 text-surface-200 border border-surface-600'
              : 'bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white shadow-rose-500/20 animate-pulse'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>{isEmergencyActive ? 'Reset Simulation Drill' : 'Simulate Emergency Protocol'}</span>
        </button>
      </div>

      {/* Active Drill Banner */}
      {isEmergencyActive && (
        <div className="relative overflow-hidden rounded-2xl border border-rose-500/60 bg-gradient-to-r from-rose-950/60 via-surface-900 to-surface-950 p-5 md:p-6 shadow-2xl space-y-3 animate-in fade-in duration-300">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-rose-600 text-white shadow-lg shadow-rose-600/30 animate-bounce">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
                  🚨 ACTIVE EMERGENCY SIMULATION
                </span>
                <h2 className="text-lg md:text-xl font-bold text-white mt-1">
                  Corridor Egress Hazard: {blockedExit} Obstructed
                </h2>
              </div>
            </div>

            <StatusBadge status="DYNAMIC REROUTE" level="critical" pulse={true} size="lg" />
          </div>

          <p className="text-xs md:text-sm text-surface-300 leading-relaxed max-w-3xl">
            FlowSafe's fluid algorithm has automatically invalidated {blockedExit} from the egress graph and recalculated high-speed diversion paths for all occupants in Zones 2 & 3 to prevent stampede crush forces.
          </p>
        </div>
      )}

      {/* Emergency Routing Directives */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7 cols): Directives Matrix */}
        <div className="lg:col-span-7 rounded-2xl border border-surface-800 bg-surface-900/90 p-5 md:p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-400" />
              Evacuation Routing Directives
            </h3>
            <span className="text-xs font-mono text-emerald-400">
              Clearance Est: ~8.5 mins
            </span>
          </div>

          <div className="space-y-3">
            {/* Blocked Exit Card */}
            <div className="p-4 rounded-xl border border-rose-500/40 bg-rose-950/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <DoorClosed className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">OBSTRUCTED CORRIDOR</span>
                  <h4 className="text-sm font-bold text-white">{blockedExit} (East Concourse)</h4>
                  <p className="text-[11px] text-rose-300/80">Hazard detected — Avoid Gate B completely</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-rose-500 text-[10px] font-bold text-white font-mono uppercase">
                BLOCKED
              </span>
            </div>

            {/* Directive 1: Zone 2 -> Exit C */}
            <div className="p-4 rounded-xl border border-brand-500/40 bg-surface-850 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white font-mono">Zone 2 (East Stand)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-400" />
                  <span className="text-xs font-bold text-brand-300 font-mono">Exit C (South Arch)</span>
                </div>
                <p className="text-[11px] text-surface-400">
                  Reroute 4,100 occupants via South Perimeter Walkway. Keep right lane open.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 text-[10px] font-mono font-bold">
                ACTIVE REROUTE
              </span>
            </div>

            {/* Directive 2: Zone 3 -> Exit D */}
            <div className="p-4 rounded-xl border border-surface-700 bg-surface-850 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white font-mono">Zone 3 (West Stand)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-400" />
                  <span className="text-xs font-bold text-brand-300 font-mono">Exit D (West Promenade)</span>
                </div>
                <p className="text-[11px] text-surface-400">
                  Direct evacuation through West Promenade to avoid central concourse crossover.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
                CLEAR EGRESS
              </span>
            </div>
          </div>
        </div>

        {/* Right (5 cols): Visual Egress Diagram */}
        <div className="lg:col-span-5 rounded-2xl border border-surface-800 bg-surface-900/90 p-5 md:p-6 shadow-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-surface-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Egress Vector Topology
              </h3>
              <span className="text-[10px] text-surface-400 font-mono">SCHEMATIC</span>
            </div>

            {/* Stylized SVG Evacuation Topology */}
            <div className="my-3 p-3 rounded-xl bg-surface-950 border border-surface-800 flex items-center justify-center">
              <svg viewBox="0 0 300 220" className="w-full h-auto">
                {/* Stadium Ring */}
                <ellipse cx="150" cy="110" rx="130" ry="85" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                
                {/* Zones */}
                <ellipse cx="150" cy="110" rx="90" ry="55" fill="#1e293b" stroke="#475569" strokeWidth="1" />

                {/* Exits */}
                {/* North Exit A */}
                <circle cx="150" cy="25" r="10" fill="#10b981" />
                <text x="150" y="12" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">EXIT A (CLEAR)</text>

                {/* East Exit B (BLOCKED) */}
                <circle cx="280" cy="110" r="10" fill="#ef4444" className="animate-pulse" />
                <text x="280" y="114" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">✕</text>
                <text x="280" y="130" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">EXIT B BLOCKED</text>

                {/* South Exit C */}
                <circle cx="150" cy="195" r="10" fill="#2dd4bf" />
                <text x="150" y="215" textAnchor="middle" fill="#2dd4bf" fontSize="9" fontWeight="bold">EXIT C (DIVERSIFIED)</text>

                {/* West Exit D */}
                <circle cx="20" cy="110" r="10" fill="#10b981" />
                <text x="20" y="130" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="bold">EXIT D (CLEAR)</text>

                {/* Diverted Flow Arrow from East toward South Exit C */}
                <path d="M 250 110 C 240 160, 190 185, 165 195" fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeDasharray="5 3" className="animate-flow-dash" />
              </svg>
            </div>
          </div>

          {/* Mandatory Safety Disclaimer */}
          <div className="p-3.5 rounded-xl bg-surface-950 border border-amber-500/20 text-xs space-y-1">
            <span className="font-bold text-amber-400 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5" />
              Decision Support Notice
            </span>
            <p className="text-[11px] text-surface-400 leading-relaxed italic">
              Prototype decision-support simulation. Not a certified emergency evacuation system. Designed to integrate with certified municipal incident management systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
