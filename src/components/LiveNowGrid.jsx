import React from 'react';
import { Users, Clock, AlertTriangle, ArrowRight, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function LiveNowGrid({ 
  liveData, 
  onSelectLocationForForecast, 
  currentDecimalHour, 
  onTimeChange,
  currentTimeFormatted,
  isLiveSimulatedTime
}) {
  const env = liveData.environment;

  // Preset quick jump times for easy judging demo
  const presetTimes = [
    { label: '9:00 AM (Morning)', decimal: 9.0 },
    { label: '1:00 PM (Lunch Rush)', decimal: 13.0 },
    { label: '4:30 PM (Dispersal)', decimal: 16.5 },
    { label: '7:00 PM (Evening)', decimal: 19.0 },
  ];

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-5">
      {/* Section Title & Live Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              QUESTION 1
            </span>
            <h2 className="text-lg font-extrabold text-slate-900">
              1. What Is Happening Now?
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time simulated crowd status for <strong className="text-slate-800">{env.name}</strong> at <strong className="text-blue-600">{currentTimeFormatted}</strong>.
          </p>
        </div>

        {/* Prototype Label */}
        <div className="text-[11px] font-mono text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
          *Prototype simulated live data
        </div>
      </div>

      {/* Interactive Time Scrubber for Testing */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <span>Interactive Time Simulator:</span>
            <span className="text-blue-600 font-mono font-extrabold text-sm">{currentTimeFormatted}</span>
            {isLiveSimulatedTime && <span className="text-[10px] text-amber-600 font-medium">(Simulated Time)</span>}
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {presetTimes.map(p => (
              <button
                key={p.label}
                onClick={() => onTimeChange(p.decimal)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                  Math.abs(currentDecimalHour - p.decimal) <= 0.25
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slider */}
        <input
          type="range"
          min="8.0"
          max="20.0"
          step="0.25"
          value={currentDecimalHour}
          onChange={(e) => onTimeChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-400">
          <span>8:00 AM (Open)</span>
          <span>1:00 PM (Midday)</span>
          <span>4:30 PM (Closing)</span>
          <span>8:00 PM (Night)</span>
        </div>
      </div>

      {/* Grid of Locations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {liveData.locations.map((loc) => {
          const status = loc.status;

          return (
            <div
              key={loc.id}
              onClick={() => onSelectLocationForForecast(loc.id)}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
            >
              <div>
                {/* Header with Name & Status Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {loc.name}
                    </h3>
                    <p className="text-[10px] text-slate-400">{loc.description}</p>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0 ${status.badgeClass}`}>
                    {status.dot} {status.label}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500 font-sans text-[11px]">Occupancy:</span>
                    <strong className="text-slate-900">{loc.occupancyPct}%</strong>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(100, loc.occupancyPct)}%`,
                        backgroundColor: status.color 
                      }}
                    />
                  </div>
                </div>

                {/* Numbers Row */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-sans">Current Crowd:</span>
                    <strong className="text-slate-800">{loc.crowd} / {loc.capacity}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-sans">Wait Time:</span>
                    <strong className={loc.occupancyPct >= 80 ? 'text-red-600' : 'text-slate-800'}>
                      {loc.waitMin} min
                    </strong>
                  </div>
                </div>
              </div>

              {/* Action hint */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-blue-600 font-semibold group-hover:underline">
                <span>Check Future Forecast</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
