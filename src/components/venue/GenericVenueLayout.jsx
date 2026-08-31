import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, Clock, Users } from 'lucide-react';

export default function GenericVenueLayout({ venue }) {
  const [isBalanced, setIsBalanced] = useState(false);

  if (!venue || !venue.zones) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5">
      {/* Venue Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">{venue.icon}</span>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">{venue.name}</h2>
              <p className="text-xs text-slate-500 font-medium">{venue.tagline}</p>
            </div>
          </div>
        </div>

        {/* 1-Click AI Balance Button */}
        <button
          onClick={() => setIsBalanced(!isBalanced)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 ${
            isBalanced
              ? 'bg-slate-900 hover:bg-slate-800 text-white'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/25 animate-pulse'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{isBalanced ? 'Reset to Choked State' : '✨ Click: Run FlowSafe AI Balance'}</span>
        </button>
      </div>

      {/* Overview Context */}
      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
        {venue.summary}
      </p>

      {/* Grid of Interactive Venue Zones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {venue.zones.map((zone, idx) => {
          const isChoke = zone.level === 'critical';
          const currentOccupancy = isBalanced && isChoke ? Math.round(zone.pct * 0.72) : zone.pct;
          const currentWait = isBalanced && isChoke ? `${Math.round(parseInt(zone.wait) * 0.35)} min` : zone.wait;
          const currentStatus = isBalanced && isChoke ? 'Balanced 🟢' : zone.status;

          return (
            <div
              key={zone.id || idx}
              className={`p-4 rounded-xl border transition-all ${
                isChoke && !isBalanced
                  ? 'bg-red-50/50 border-red-300 ring-2 ring-red-400/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-slate-900">{zone.name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  currentStatus.includes('Choked') 
                    ? 'bg-red-100 text-red-800 border-red-300' 
                    : currentStatus.includes('Busy')
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}>
                  {currentOccupancy}% • {currentStatus}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-3 space-y-1">
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min(100, currentOccupancy)}%`,
                      backgroundColor: currentStatus.includes('Choked') ? '#ef4444' : currentStatus.includes('Busy') ? '#f59e0b' : '#10b981'
                    }}
                  />
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Capacity: {zone.capacity?.toLocaleString()}</span>
                <span>Wait Time: <strong className={isChoke && !isBalanced ? 'text-red-600 font-bold' : 'text-slate-900'}>{currentWait}</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Proactive Redistribution Card */}
      {venue.redistribution && (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>AI Predictive Action Plan</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
              <span className="text-[11px] font-semibold text-red-600 block">The Identified Problem:</span>
              <p className="text-slate-700">{venue.redistribution.problem}</p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
              <span className="text-[11px] font-semibold text-emerald-700 block">FlowSafe AI Solution:</span>
              <p className="text-slate-700">{venue.redistribution.solution}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-center font-mono">
            <div className="p-2.5 bg-white rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 font-sans block">Peak Bottleneck Danger</span>
              <span className="text-base font-bold text-slate-900">
                {isBalanced ? `${venue.redistribution.beforeRisk}% ➔ ${venue.redistribution.afterRisk}% 🟢` : `${venue.redistribution.beforeRisk}% 🔴`}
              </span>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 font-sans block">Queue Delay</span>
              <span className="text-base font-bold text-blue-600">
                {isBalanced ? `${venue.redistribution.beforeWait} ➔ ${venue.redistribution.afterWait} 🟢` : `${venue.redistribution.beforeWait} 🔴`}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
