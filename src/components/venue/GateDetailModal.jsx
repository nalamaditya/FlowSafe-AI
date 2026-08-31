import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Sparkles, TrendingUp, Clock, AlertTriangle, ArrowRight, ShieldCheck, Activity, Users } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function GateDetailModal() {
  const { selectedGate, triggerPrediction, isPredicting, setActivePage } = useAppState();

  if (!selectedGate) return null;

  const isCritical = selectedGate.level === 'critical';

  return (
    <div className="rounded-2xl border border-surface-800 bg-gradient-to-b from-surface-900 to-surface-950 p-5 shadow-2xl backdrop-blur-md space-y-4">
      {/* Top Header */}
      <div className="flex items-start justify-between pb-3 border-b border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white font-mono">{selectedGate.gateName}</h3>
            <span className="text-xs text-surface-400 font-sans">({selectedGate.direction || 'Perimeter Access'})</span>
          </div>
          <p className="text-xs text-surface-400 mt-0.5">Real-time gate telemetry & deterministic 30-minute fluid projection.</p>
        </div>

        <StatusBadge status={selectedGate.status} level={selectedGate.level} size="lg" pulse={isCritical} />
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-surface-850 border border-surface-700/60">
          <span className="text-[10px] text-surface-400 uppercase tracking-wider font-semibold block">Current Crowd</span>
          <span className="text-xl font-bold font-mono text-white">{selectedGate.current?.toLocaleString()}</span>
          <span className="text-[10px] text-surface-400 block mt-0.5">Cap: {selectedGate.capacity?.toLocaleString()}</span>
        </div>

        <div className="p-3 rounded-xl bg-surface-850 border border-surface-700/60">
          <span className="text-[10px] text-surface-400 uppercase tracking-wider font-semibold block">Occupancy</span>
          <span className={`text-xl font-bold font-mono ${isCritical ? 'text-rose-400' : 'text-emerald-400'}`}>
            {selectedGate.occupancyPct}%
          </span>
          <span className="text-[10px] text-surface-400 block mt-0.5">{selectedGate.capacity - selectedGate.current} slots left</span>
        </div>

        <div className="p-3 rounded-xl bg-surface-850 border border-surface-700/60">
          <span className="text-[10px] text-surface-400 uppercase tracking-wider font-semibold block">Current Wait</span>
          <span className="text-xl font-bold font-mono text-surface-200">{selectedGate.waitCurrentMin} min</span>
          <span className="text-[10px] text-surface-400 block mt-0.5">Turnstile queue</span>
        </div>

        <div className={`p-3 rounded-xl border ${isCritical ? 'bg-rose-950/20 border-rose-500/40' : 'bg-surface-850 border-surface-700/60'}`}>
          <span className="text-[10px] uppercase tracking-wider font-semibold block text-surface-400">Pred. Queue (30m)</span>
          <span className={`text-xl font-bold font-mono ${isCritical ? 'text-rose-400' : 'text-amber-400'}`}>
            {selectedGate.predictedQueue30m} min
          </span>
          <span className="text-[10px] text-surface-400 block mt-0.5">Peak arrival curve</span>
        </div>
      </div>

      {/* Predictions Horizon Box */}
      <div className="p-4 rounded-xl bg-surface-950/70 border border-surface-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-surface-200 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-brand-400" />
            AI Forecast Timeline
          </span>
          <span className="text-[10px] font-mono text-brand-300 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
            Confidence: 87%
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-lg bg-surface-900 border border-surface-800">
            <p className="text-[10px] text-surface-400 font-medium">In 15 min</p>
            <p className="text-base font-bold font-mono text-surface-100">{selectedGate.predicted15m?.toLocaleString()}</p>
            <p className="text-[9px] text-amber-400 font-semibold">+6.5% arrival surge</p>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-900 border border-surface-800">
            <p className="text-[10px] text-surface-400 font-medium">In 30 min (Peak)</p>
            <p className={`text-base font-bold font-mono ${isCritical ? 'text-rose-400' : 'text-surface-100'}`}>
              {selectedGate.predicted30m?.toLocaleString()}
            </p>
            <p className="text-[9px] text-rose-400 font-semibold">+15.2% bottleneck</p>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-900 border border-surface-800">
            <p className="text-[10px] text-surface-400 font-medium">In 60 min</p>
            <p className="text-base font-bold font-mono text-surface-100">{selectedGate.predicted60m?.toLocaleString()}</p>
            <p className="text-[9px] text-emerald-400 font-semibold">Post-kickoff drop</p>
          </div>
        </div>
      </div>

      {/* Action CTA Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={triggerPrediction}
          disabled={isPredicting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-teal-500 hover:from-brand-500 hover:to-teal-400 text-surface-950 font-bold text-xs tracking-wide shadow-lg shadow-brand-500/20 transition-all active:scale-95 disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 ${isPredicting ? 'animate-spin' : ''}`} />
          <span>{isPredicting ? 'Computing Fluid Vectors...' : 'Run Prediction Engine'}</span>
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActivePage('predictions')}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-surface-800 hover:bg-surface-700 text-xs font-semibold text-surface-200 border border-surface-700 transition-colors"
          >
            <span>Explainable AI</span>
            <ArrowRight className="w-3 h-3 text-surface-400" />
          </button>

          <button
            onClick={() => setActivePage('redistribution')}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-surface-800 hover:bg-surface-700 text-xs font-semibold text-brand-300 border border-brand-500/30 transition-colors"
          >
            <span>View Redistribution</span>
            <ArrowRight className="w-3 h-3 text-brand-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
