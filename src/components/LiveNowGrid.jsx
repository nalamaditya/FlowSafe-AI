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

  // Preset quick jump times for easy judging demo
  const presetTimes = [
    { label: '9:00 AM (Morning)', decimal: 9.0 },
    { label: '1:00 PM (Lunch)', decimal: 13.0 },
    { label: '4:30 PM (Closing)', decimal: 16.5 },
    { label: '7:00 PM (Evening)', decimal: 19.0 },
  ];

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-5">
      {/* Section Title & Live Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-slate-100">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
            Live Crowd Status
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Real-time simulated crowd & recommendations for <strong className="text-slate-800">{env.name}</strong> at <strong className="text-blue-600">{currentTimeFormatted}</strong>.
          </p>
        </div>

        {/* Prototype Label */}
        <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200 self-start sm:self-auto shrink-0">
          *Prototype simulated live data
        </div>
      </div>

      {/* Interactive Time Scrubber for Testing */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 sm:space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
            <span>Time Simulator:</span>
            <span className="text-blue-600 font-mono font-extrabold text-xs sm:text-sm">{currentTimeFormatted}</span>
            {isLiveSimulatedTime && <span className="text-[9px] sm:text-[10px] text-amber-600 font-medium">(Simulated)</span>}
          </div>

          {/* Quick preset buttons with touch scroll */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1 text-xs">
            {presetTimes.map(p => (
              <button
                key={p.label}
                onClick={() => onTimeChange(p.decimal)}
                className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold border transition-all shrink-0 ${
                  Math.abs(currentDecimalHour - p.decimal) <= 0.25
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 active:scale-95'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Touch-optimized Time Slider */}
        <div className="py-1">
          <input
            type="range"
            min="8.0"
            max="20.0"
            step="0.25"
            value={currentDecimalHour}
            onChange={(e) => onTimeChange(parseFloat(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-slate-400">
          <span>8:00 AM</span>
          <span>1:00 PM</span>
          <span>4:30 PM</span>
          <span>8:00 PM</span>
        </div>
      </div>

      {/* Grid of Locations (1 col on mobile, 2 col on tablet, 4 on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
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
              className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group shadow-sm"
            >
              <div className="space-y-2.5">
                {/* Header with Name & Status Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {loc.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{loc.description}</p>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0 font-mono font-bold ${status.badgeClass}`}>
                    {status.dot} {status.label}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500 font-sans text-[10px] sm:text-[11px]">Occupancy:</span>
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
                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-sans">Current Crowd:</span>
                    <strong className="text-slate-800">{loc.crowd} / {loc.capacity}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-sans">Wait Time:</span>
                    <strong className={loc.occupancyPct >= 80 ? 'text-red-600 font-bold' : 'text-slate-800'}>
                      {loc.waitMin} min
                    </strong>
                  </div>
                </div>

                {/* Crowd Trend Indicator */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 text-[10px] font-medium">Crowd Trend:</span>
                  <span className={`font-bold font-mono flex items-center gap-1 text-[11px] ${trend.textClass}`}>
                    <span>{trend.symbol}</span>
                    <span>{trend.label}</span>
                  </span>
                </div>

                {/* FLOWSAFE LIVE RECOMMENDATION BOX */}
                <div className={`p-3 rounded-lg border text-xs space-y-1.5 transition-all ${rec.style}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-slate-500">
                      FLOWSAFE RECOMMENDATION
                    </span>
                  </div>

                  {/* Status Headline */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm shrink-0">{rec.statusIcon}</span>
                    <strong className={`font-extrabold text-xs leading-snug ${rec.titleColor || 'text-slate-900'}`}>
                      {rec.statusText}
                    </strong>
                  </div>

                  {/* Explanation */}
                  <p className="text-[10px] sm:text-[11px] leading-snug opacity-90">
                    {rec.explanation}
                  </p>

                  {/* Best Time / Wait Guidance (if applicable) */}
                  {rec.bestTime && (
                    <div className="pt-1.5 border-t border-black/10 flex flex-col gap-0.5 text-[10px] font-mono font-semibold">
                      <span className="flex items-center gap-1">
                        <span>🕐 Best time:</span>
                        <strong className="font-bold text-slate-900">{rec.bestTime}</strong>
                      </span>
                      {rec.waitMinutes && (
                        <span className="text-slate-600">
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
                className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-blue-600 font-semibold group-hover:underline w-full text-left active:text-blue-800"
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
