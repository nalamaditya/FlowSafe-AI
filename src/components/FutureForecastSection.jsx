import React from 'react';
import { 
  Clock, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Check, 
  Navigation, 
  Info, 
  UserCheck, 
  Building,
  Zap
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { getTimeSeriesForGraph } from '../services/predictionEngine';

export default function FutureForecastSection({
  selectedEnv,
  selectedLocationId,
  onSelectLocation,
  selectedDate,
  onSelectDate,
  selectedTimeStr,
  onSelectTime,
  forecastData,
  currentDecimalHour
}) {
  const location = forecastData.location;
  const status = forecastData.congestionStatus;
  const rec = forecastData.recommendations;

  // Time Series for Recharts
  const graphData = getTimeSeriesForGraph(
    selectedEnv.id,
    location.id,
    currentDecimalHour,
    forecastData.targetTime
  );

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-black text-slate-900 leading-tight">
            Check Future Crowd & Smart Recommendations
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Predictive crowd intelligence and proactive congestion prevention for <strong className="text-slate-800">{location.name}</strong>.
          </p>
        </div>

        <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 self-start sm:self-auto shrink-0">
          Confidence: {forecastData.confidence}% (Model Baseline)
        </span>
      </div>

      {/* Selectors Bar: Location + Date + Time */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
        {/* 1. Location Selector */}
        <div>
          <label className="font-semibold text-slate-700 block mb-1.5 flex items-center gap-1.5 text-xs">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Select Location</span>
          </label>
          <select
            value={selectedLocationId}
            onChange={(e) => onSelectLocation(e.target.value)}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-amber-500 cursor-pointer shadow-xs text-xs"
          >
            {selectedEnv.locations.map(loc => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Date Selector */}
        <div>
          <label className="font-semibold text-slate-700 block mb-1.5 flex items-center gap-1.5 text-xs">
            <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>Select Date</span>
          </label>
          <select
            value={selectedDate}
            onChange={(e) => onSelectDate(e.target.value)}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-blue-500 cursor-pointer shadow-xs text-xs"
          >
            <option value="Today">Today (Current Day Pattern)</option>
            <option value="Tomorrow">Tomorrow (Weekday Schedule)</option>
            <option value="Friday">Friday (Pre-Weekend Schedule)</option>
            <option value="Saturday">Saturday (Weekend / Event Mode)</option>
          </select>
        </div>

        {/* 3. Time Selector */}
        <div>
          <label className="font-semibold text-slate-700 block mb-1.5 flex items-center gap-1.5 text-xs">
            <Clock className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span>Select Forecast Time</span>
          </label>
          <select
            value={selectedTimeStr}
            onChange={(e) => onSelectTime(e.target.value)}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-purple-500 cursor-pointer shadow-xs text-xs"
          >
            <option value="8:00 AM">8:00 AM</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="11:30 AM">11:30 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="12:30 PM">12:30 PM</option>
            <option value="1:00 PM">1:00 PM (Lunch Rush)</option>
            <option value="1:30 PM">1:30 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="2:30 PM">2:30 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
            <option value="4:30 PM">4:30 PM (Closing Rush)</option>
            <option value="5:00 PM">5:00 PM</option>
            <option value="6:00 PM">6:00 PM</option>
            <option value="7:00 PM">7:00 PM</option>
            <option value="8:00 PM">8:00 PM</option>
          </select>
        </div>
      </div>

      {/* 4 Prediction Cards (2 cols on mobile, 4 on desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Expected Crowd */}
        <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase block truncate">Expected Crowd</span>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {forecastData.expectedCrowd}
          </div>
          <span className="text-[11px] text-slate-400 font-mono block truncate">Capacity: {forecastData.capacity}</span>
        </div>

        {/* Expected Occupancy */}
        <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase block truncate">Expected Occupancy</span>
          <div className="text-2xl font-black font-mono" style={{ color: status.color }}>
            {forecastData.expectedOccupancy}%
          </div>
          <span className={`text-[10px] px-2.5 py-0.5 rounded-full inline-block font-mono font-bold ${
            status.level === 'closed'
              ? 'bg-slate-100 text-slate-600 border border-slate-200'
              : status.level === 'critical' || status.level === 'high'
              ? 'bg-rose-50 text-rose-700 border border-rose-200'
              : status.level === 'moderate'
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          }`}>
            {status.dot} {status.label}
          </span>
        </div>

        {/* Expected Wait Time */}
        <div className="p-5 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase block truncate">Expected Wait</span>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {forecastData.expectedWaitTime} mins
          </div>
          <span className="text-[11px] text-slate-400 block truncate font-mono">Queue delay</span>
        </div>

        {/* Congestion Status */}
        <div className={`p-5 rounded-3xl border shadow-sm space-y-1 ${
          status.level === 'critical' || status.level === 'high'
            ? 'bg-rose-50/70 border-rose-200'
            : 'bg-emerald-50/70 border-emerald-200'
        }`}>
          <span className="text-[11px] font-semibold text-slate-500 uppercase block truncate">Status</span>
          <div className="text-2xl font-black font-mono truncate" style={{ color: status.color }}>
            {status.label}
          </div>
          <span className="text-[11px] text-slate-600 block truncate">
            {status.level === 'critical' || status.level === 'high' ? '⚠️ Bottleneck Risk' : '✓ Smooth Flow'}
          </span>
        </div>
      </div>

      {/* Forecast Graph: Historical + Current + Predicted */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Footfall Curve for {location.name}</span>
            </h3>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-blue-600 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Historical
            </span>
            <span className="flex items-center gap-1.5 text-rose-600 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Target ({forecastData.targetTimeFormatted})
            </span>
          </div>
        </div>

        <div className="h-56 sm:h-64 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={graphData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCrowd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#64748b' }} stroke="#cbd5e1" interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} stroke="#cbd5e1" />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const val = payload[0].value;
                    const cap = location.capacity;
                    const pct = Math.round((val / cap) * 100);
                    return (
                      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-lg text-xs space-y-0.5">
                        <p className="font-bold text-slate-900">{label}</p>
                        <p className="text-blue-600 font-mono font-bold">Footfall: {val} / {cap}</p>
                        <p className="text-slate-500 font-mono">Occupancy: {pct}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="historicalCrowd" 
                stroke="#2563eb" 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#colorCrowd)" 
              />
              <ReferenceLine 
                x={forecastData.targetTimeFormatted} 
                stroke="#ef4444" 
                strokeWidth={2}
                strokeDasharray="4 4"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Explainable AI: Why This Prediction? */}
      <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider font-mono">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Why This Prediction? (Explainable AI Causal Factors)</span>
        </div>

        <p className="text-xs text-slate-600 font-medium">
          Key causal drivers for <strong>{location.name}</strong> at <strong>{forecastData.targetTimeFormatted}</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {forecastData.reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
              <span className="text-slate-700 font-medium leading-relaxed">{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FlowSafe Action Plan & Recommendations Suite */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 space-y-6">
        {/* Header with Impact Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-black text-white">
                FlowSafe Action Plan & Recommendations
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {rec.summary}
            </p>
          </div>

          {/* Metrics */}
          <div className="flex items-center gap-2.5 text-xs font-mono shrink-0">
            {rec.timeSavedPct > 0 && (
              <div className="p-2 px-3.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-center">
                <span className="text-[9px] text-emerald-300 block font-sans font-bold">WAIT REDUCTION</span>
                <span className="font-extrabold text-sm">-{rec.timeSavedPct}% Time</span>
              </div>
            )}
            <div className="p-2 px-3.5 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 text-center">
              <span className="text-[9px] text-blue-300 block font-sans font-bold">PREVENTION</span>
              <span className="font-extrabold text-sm">Proactive</span>
            </div>
          </div>
        </div>

        {/* 4 Recommendations Pillars (Beta01 Card Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">

          {/* PILLAR 1: Optimal Visiting Windows */}
          <div className="p-5 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-md space-y-3.5 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-mono">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>1. Best-Time Recommendation</span>
              </div>
              <p className="text-slate-400 text-xs">
                Shift your schedule slightly to experience near-zero queues:
              </p>

              {/* Primary Best Slot */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-extrabold text-emerald-400 text-sm font-mono truncate">
                    ★ Primary: {rec.primarySlot.time}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono shrink-0 border border-emerald-500/30">
                    {rec.primarySlot.waitMin}m wait ({rec.primarySlot.occupancy}%)
                  </span>
                </div>
                <p className="text-xs text-emerald-200/90 font-medium leading-snug">
                  {rec.primarySlot.desc}
                </p>
              </div>

              {/* Secondary Best Slot */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 font-mono truncate">
                  Secondary: {rec.secondarySlot.time}
                </span>
                <span className="text-slate-400 font-mono font-medium shrink-0">
                  {rec.secondarySlot.waitMin}m wait ({rec.secondarySlot.occupancy}%)
                </span>
              </div>
            </div>

            <span className="text-[11px] text-slate-400 font-medium">
              ✓ Based on historical daily low-tide intervals.
            </span>
          </div>

          {/* PILLAR 2: Uncrowded Alternatives */}
          <div className="p-5 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-md space-y-3.5 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-mono">
                <Navigation className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2. Alternative Low-Crowd Zones</span>
              </div>
              <p className="text-slate-400 text-xs">
                Nearby locations in {selectedEnv.name} with ample capacity:
              </p>

              <div className="space-y-2">
                {rec.alternatives.map((alt) => (
                  <div
                    key={alt.id}
                    onClick={() => onSelectLocation(alt.id)}
                    className="p-3 rounded-2xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-900 hover:border-blue-400/50 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <span className="font-bold text-white group-hover:text-blue-400 transition-colors text-xs truncate block">
                        {alt.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {alt.waitMin}m wait • {alt.occupancyPct}% occupancy
                      </span>
                    </div>

                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-mono font-bold shrink-0 ${
                      alt.status.level === 'closed'
                        ? 'bg-slate-700 text-slate-300 border-slate-600'
                        : alt.status.level === 'critical' || alt.status.level === 'high'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : alt.status.level === 'moderate'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}>
                      {alt.status.dot} {alt.status.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <span className="text-xs text-blue-400 font-bold">
              Tap any alternative to switch forecast view &rarr;
            </span>
          </div>

          {/* PILLAR 3: Actionable Advice for Visitors / Students */}
          <div className="p-5 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-mono">
              <UserCheck className="w-4 h-4 text-purple-400 shrink-0" />
              <span>3. Visitor Action Guide</span>
            </div>
            <p className="text-slate-400 text-xs">
              How you can avoid delays during this time window:
            </p>

            <ul className="space-y-2 text-xs">
              {rec.visitorTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-purple-950/30 border border-purple-500/20 text-slate-300 font-medium">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* PILLAR 4: Venue Operator Directives */}
          <div className="p-5 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-mono">
              <Building className="w-4 h-4 text-amber-400 shrink-0" />
              <span>4. Management Directives</span>
            </div>
            <p className="text-slate-400 text-xs">
              Proactive measures to prevent congestion buildup:
            </p>

            <ul className="space-y-2 text-xs">
              {rec.managerActions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-950/30 border border-amber-500/20 text-slate-300 font-medium">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
