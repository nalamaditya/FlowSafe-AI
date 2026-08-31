import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Users, Clock, AlertTriangle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function GenericVenueMap() {
  const { activeEnvironment, liveGates, selectedGateId, setSelectedGateId } = useAppState();

  return (
    <div className="rounded-2xl border border-surface-800 bg-surface-900/90 p-4 md:p-6 shadow-2xl backdrop-blur-md">
      {/* Header info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-surface-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{activeEnvironment.icon}</span>
            <h3 className="text-base font-bold text-white tracking-wide">{activeEnvironment.name} Spatial Layout</h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-brand-500/10 text-brand-300 border border-brand-500/20 uppercase">
              {activeEnvironment.unitName}
            </span>
          </div>
          <p className="text-xs text-surface-400 mt-0.5">{activeEnvironment.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-surface-400 font-mono">Total Venue Cap:</span>
          <span className="text-xs font-bold text-white font-mono bg-surface-800 px-2.5 py-1 rounded border border-surface-700">
            {activeEnvironment.capacity.toLocaleString()} max
          </span>
        </div>
      </div>

      {/* Grid of Gates / Checkpoints */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
        {liveGates.map((gate) => {
          const isSelected = selectedGateId === gate.gateId;
          const isCritical = gate.level === 'critical';

          return (
            <div
              key={gate.gateId}
              onClick={() => setSelectedGateId(gate.gateId)}
              className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                isSelected
                  ? isCritical
                    ? 'bg-rose-950/30 border-rose-500 shadow-xl shadow-rose-500/10 scale-[1.02]'
                    : 'bg-surface-850 border-brand-400 shadow-xl shadow-brand-500/10 scale-[1.02]'
                  : isCritical
                  ? 'bg-surface-900 border-rose-500/40 hover:border-rose-400'
                  : 'bg-surface-900 border-surface-800 hover:border-surface-700 hover:bg-surface-850'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-mono">{gate.gateName}</span>
                    <span className="text-[11px] text-surface-400 font-sans">({gate.direction})</span>
                  </div>
                  <p className="text-[11px] text-surface-400 mt-0.5">Capacity: {gate.capacity?.toLocaleString()} {activeEnvironment.unitName.toLowerCase()}</p>
                </div>
                <StatusBadge status={gate.status} level={gate.level} pulse={isCritical} />
              </div>

              {/* Progress bar */}
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-surface-400">Occupancy: {gate.occupancyPct}%</span>
                  <span className={isCritical ? 'text-rose-400 font-bold' : 'text-surface-200'}>
                    {gate.current?.toLocaleString()} / {gate.capacity?.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min(100, gate.occupancyPct)}%`,
                      backgroundColor: gate.color
                    }}
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-surface-800/60 text-xs">
                <div className="flex items-center gap-1 text-surface-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Current wait: <strong className="text-white font-mono">{gate.waitCurrentMin}m</strong></span>
                </div>
                <div className="flex items-center gap-1 text-surface-400">
                  <span>30m Pred: <strong className={isCritical ? 'text-rose-400 font-mono' : 'text-surface-200 font-mono'}>{gate.predicted30m?.toLocaleString()} ({gate.predictedQueue30m}m)</strong></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Designated Zones */}
      <div className="mt-4 pt-4 border-t border-surface-800">
        <h4 className="text-xs font-bold text-surface-300 uppercase tracking-wider mb-2">Designated Internal Zones</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {activeEnvironment.zones?.map((zone) => (
            <div key={zone.id} className="p-2.5 rounded-lg bg-surface-850 border border-surface-800 flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-surface-200">{zone.name}</p>
                <p className="text-[10px] text-surface-400">Cap: {zone.capacity?.toLocaleString()}</p>
              </div>
              <span className="font-mono font-bold text-brand-300">
                {zone.current?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
