import React from 'react';
import { Users, Clock, AlertTriangle, ArrowRight, Sparkles, SlidersHorizontal, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function LiveNowGrid({ 
  liveData, 
  onSelectLocationForForecast, 
  currentDecimalHour, 
  onTimeChange, 
  currentTimeFormatted, 
  isLiveSimulatedTime 
}) {
  const env = liveData.environment;

  // Preset quick jump times tailored to venue operating schedules
  const presetTimes = env.id === 'campus'
    ? [
        { label: '7:30 AM (Opens)', decimal: 7.5 },
        { label: '9:00 AM (College Starts)', decimal: 9.0 },
        { label: '1:00 PM (Lunch Rush)', decimal: 13.0 },
        { label: '4:00 PM (College Ends)', decimal: 16.0 },
        { label: '5:30 PM (Few Stay)', decimal: 17.5 },
        { label: '8:00 PM (Closed)', decimal: 20.0 },
      ]
    : env.id === 'hospital'
    ? [
        { label: '2:00 AM (24/7 Triage)', decimal: 2.0 },
        { label: '9:00 AM (Morning OPD)', decimal: 9.0 },
        { label: '1:00 PM (Midday Clinic)', decimal: 13.0 },
        { label: '6:00 PM (Evening Shift)', decimal: 18.0 },
        { label: '11:00 PM (Night Urgent)', decimal: 23.0 },
      ]
    : [
        { label: '10:00 AM (Morning)', decimal: 10.0 },
        { label: '1:00 PM (Afternoon)', decimal: 13.0 },
        { label: '5:00 PM (Peak Ingress)', decimal: 17.0 },
        { label: '8:30 PM (Evening)', decimal: 20.5 },
        { label: '11:30 PM (Night)', decimal: 23.5 },
      ];

  return (
    <section className="bg-white/85 backdrop-blur-xl rounded-3xl border border-white/80 shadow-[0_10px_30px_rgb(0,0,0,0.04)] p-6 space-y-6">
      {/* Section Title & Live Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100/80">
        <div>
          <h2 className="text-lg font-black text-slate-900 leading-tight flex items-center gap-2">
            <span>Live Crowd Status</span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time simulated crowd telemetry and smart recommendations for <strong className="text-slate-800">{env.name}</strong> at <strong className="text-amber-600 font-mono">{currentTimeFormatted}</strong>.
          </p>
        </div>

        {/* Prototype Label */}
        <div className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100/90 px-3.5 py-1 rounded-full border border-slate-200/80 self-start sm:self-auto shrink-0 shadow-xs">
          Simulated Telemetry Feed
        </div>
      </div>

      {/* Interactive Time Scrubber with Sunken Depth */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 backdrop-blur-md border border-slate-200/80 space-y-3 shadow-inner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <SlidersHorizontal className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Time Simulator:</span>
            <span className="text-slate-950 font-mono font-black text-sm bg-amber-100 px-2.5 py-0.5 rounded-lg border border-amber-300 shadow-xs">
              {currentTimeFormatted}
            </span>
            {isLiveSimulatedTime && <span className="text-[10px] text-amber-600 font-medium font-mono">(Simulated)</span>}
          </div>

          {/* Quick preset buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1 text-xs">
            {presetTimes.map(p => (
              <button
                key={p.label}
                onClick={() => onTimeChange(p.decimal)}
                className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all duration-150 shrink-0 cursor-pointer ${
                  Math.abs(currentDecimalHour - p.decimal) <= 0.25
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 scale-[1.03]'
                    : 'bg-white/90 text-slate-700 border-slate-200/80 hover:bg-white hover:border-slate-300 shadow-xs'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 24-Hour Time Slider */}
        <div className="py-1">
          <input
            type="range"
            min="0.0"
            max="23.75"
            step="0.25"
            value={currentDecimalHour}
            onChange={(e) => onTimeChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200/90 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        <div className="flex justify-between text-[10px] font-mono text-slate-400">
          <span>12:00 AM</span>
          <span>6:00 AM</span>
          <span>12:00 PM</span>
          <span>6:00 PM</span>
          <span>11:59 PM</span>
        </div>
      </div>

      {/* Grid of Location Cards with Frosted Blur & Elevated Shadow Depth */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {liveData.locations.map((loc) => {
          const status = loc.status;
          const trend = loc.trend || { label: 'Stable', symbol: '→', textClass: 'text-slate-600' };
          const rec = loc.liveRecommendation || {
            statusText: 'Good to go now',
            statusIcon: '✅',
            explanation: 'Low crowd and short waiting time.'
          };

          return (
            <div
              key={loc.id}
              className="bg-white/90 backdrop-blur-xl p-5 rounded-3xl border border-white/80 hover:border-blue-400/40 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
            >
              <div className="space-y-3.5">
                {/* Header with Name & Status Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {loc.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{loc.description}</p>
                  </div>

                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full border shrink-0 font-mono font-bold shadow-2xs ${
                    status.level === 'closed'
                      ? 'bg-slate-100/90 text-slate-600 border-slate-200'
                      : status.level === 'critical' || status.level === 'high'
                      ? 'bg-rose-50/90 text-rose-700 border-rose-200'
                      : status.level === 'moderate'
                      ? 'bg-amber-50/90 text-amber-700 border-amber-200'
                      : 'bg-emerald-50/90 text-emerald-700 border-emerald-200'
                  }`}>
                    {status.dot} {status.label}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500 font-sans text-[11px] font-medium">Occupancy:</span>
                    <strong className="text-slate-900 font-bold">{loc.occupancyPct}%</strong>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(100, loc.occupancyPct)}%`,
                        backgroundColor: status.color,
                        boxShadow: `0 0 10px ${status.color}60`
                      }}
                    />
                  </div>
                </div>

                {/* Numbers Row */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block font-sans">Current Crowd:</span>
                    <strong className="text-slate-800 text-xs">{loc.crowd} / {loc.capacity}</strong>
                  </div>
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block font-sans">Wait Time:</span>
                    <strong className={loc.occupancyPct >= 80 ? 'text-rose-600 font-bold text-xs' : 'text-slate-800 text-xs'}>
                      {loc.waitMin} min
                    </strong>
                  </div>
                </div>

                {/* Crowd Trend Indicator */}
                <div className="pt-2 border-t border-slate-100/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px] font-medium">Crowd Trend:</span>
                  <span className={`font-bold font-mono flex items-center gap-1 text-xs ${
                    trend.direction === 'up'
                      ? 'text-rose-600'
                      : trend.direction === 'down'
                      ? 'text-emerald-600'
                      : 'text-slate-600'
                  }`}>
                    <span>{trend.symbol}</span>
                    <span>{trend.label}</span>
                  </span>
                </div>

                {/* FLOWSAFE LIVE RECOMMENDATION BOX with Frosted Glow */}
                <div className={`p-3.5 rounded-2xl border text-xs space-y-1.5 transition-all shadow-xs ${
                  rec.statusText === 'Venue Closed'
                    ? 'bg-slate-50/90 text-slate-700 border-slate-200'
                    : rec.statusIcon === '✅'
                    ? 'bg-emerald-50/90 text-emerald-900 border-emerald-200/90'
                    : rec.statusIcon === '⏳'
                    ? 'bg-amber-50/90 text-amber-900 border-amber-200/90'
                    : rec.statusIcon === '🚫'
                    ? 'bg-rose-50/90 text-rose-900 border-rose-200/90'
                    : 'bg-slate-50/90 text-slate-700 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-slate-500">
                      FLOWSAFE RECOMMENDATION
                    </span>
                  </div>

                  {/* Status Headline */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm shrink-0">{rec.statusIcon}</span>
                    <strong className="font-bold text-xs leading-snug text-slate-900">
                      {rec.statusText}
                    </strong>
                  </div>

                  {/* Explanation */}
                  <p className="text-[11px] leading-snug text-slate-600">
                    {rec.explanation}
                  </p>

                  {/* Best Time / Wait Guidance */}
                  {rec.bestTime && (
                    <div className="pt-1.5 border-t border-black/5 flex flex-col gap-0.5 text-[10px] font-mono font-semibold">
                      <span className="flex items-center gap-1 text-slate-800">
                        <span>🕐 Best time:</span>
                        <strong className="font-bold text-slate-950">{rec.bestTime}</strong>
                      </span>
                      {rec.waitMinutes && (
                        <span className="text-slate-500">
                          ⏳ Consider waiting ~{rec.waitMinutes} mins
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action hint to check detailed future forecast */}
              <button
                onClick={() => onSelectLocationForForecast(loc.id)}
                className="pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs text-blue-600 font-bold group-hover:text-blue-700 w-full text-left cursor-pointer"
              >
                <span>Check Detailed Forecast</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
