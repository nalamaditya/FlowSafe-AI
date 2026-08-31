import React, { useState, useMemo } from 'react';
import { runWhatIfSimulation } from '../services/predictionService';
import PresentationBar from '../components/layout/PresentationBar';
import { 
  Sliders, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw,
  DoorClosed,
  Zap
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Legend
} from 'recharts';

export default function SimulatorPage() {
  const [additionalVisitors, setAdditionalVisitors] = useState(800);
  const [event, setEvent] = useState('Football Match');
  const [gateAvailability, setGateAvailability] = useState('all');

  const simResult = useMemo(() => {
    return runWhatIfSimulation({
      additionalVisitors,
      event,
      gateAvailability
    });
  }, [additionalVisitors, event, gateAvailability]);

  const chartData = [
    {
      metric: 'Peak Occupancy (%)',
      Without_FlowSafe: simResult.withoutFlowSafe.occupancyPct,
      With_FlowSafe: simResult.withFlowSafe.occupancyPct,
    },
    {
      metric: 'Queue Wait (Min)',
      Without_FlowSafe: simResult.withoutFlowSafe.waitMin,
      With_FlowSafe: simResult.withFlowSafe.waitMin,
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1-Click Judge Demo Bar */}
      <PresentationBar />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
            WHAT-IF SIMULATOR
          </span>
          <h1 className="text-xl md:text-2xl font-extrabold text-white mt-1">
            Test Live Scenarios: What happens if...?
          </h1>
          <p className="text-xs text-surface-400 mt-0.5">
            Slide the crowd count or close a gate to see FlowSafe automatically prevent bottlenecks.
          </p>
        </div>

        <button
          onClick={() => {
            setAdditionalVisitors(800);
            setGateAvailability('all');
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-800 hover:bg-surface-700 text-xs font-semibold text-surface-300 border border-surface-700 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 2 Simple Big Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Slider */}
        <div className="p-5 rounded-2xl border border-indigo-500/30 bg-surface-900 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-400" />
              1. Add Extra Crowd
            </span>
            <span className="text-lg font-extrabold font-mono text-indigo-400 bg-indigo-500/10 px-3 py-0.5 rounded-lg border border-indigo-500/30">
              +{additionalVisitors} visitors
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="2000"
            step="100"
            value={additionalVisitors}
            onChange={(e) => setAdditionalVisitors(Number(e.target.value))}
            className="w-full h-2 bg-surface-700 rounded-lg appearance-none cursor-pointer accent-indigo-400"
          />

          <div className="flex justify-between text-[11px] text-surface-400 font-mono">
            <span>0 (Normal)</span>
            <span>+1,000 (Surge)</span>
            <span>+2,000 (Huge Rush)</span>
          </div>
        </div>

        {/* Gate Failure Toggle */}
        <div className="p-5 rounded-2xl border border-surface-800 bg-surface-900 shadow-xl space-y-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <DoorClosed className="w-4 h-4 text-rose-400" />
            2. Gate Availability Status
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setGateAvailability('all')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                gateAvailability === 'all'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-surface-850 text-surface-400 border-surface-800 hover:text-white'
              }`}
            >
              ✓ All 4 Gates Open
            </button>

            <button
              onClick={() => setGateAvailability('b_closed')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                gateAvailability === 'b_closed'
                  ? 'bg-rose-600 text-white border-rose-500 shadow-md'
                  : 'bg-surface-850 text-rose-400 border-surface-800 hover:bg-rose-950/30'
              }`}
            >
              ✕ Gate B Closed (Broken)
            </button>
          </div>
        </div>
      </div>

      {/* Live Simulation Output Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WITHOUT FLOWSAFE */}
        <div className="rounded-2xl border border-rose-500/40 bg-surface-900 p-5 md:p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-surface-800">
            <span className="text-xs font-bold text-rose-400">WITHOUT FLOWSAFE</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">
              {simResult.withoutFlowSafe.riskStatus} 🔴
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xs text-surface-400">Peak Gate Saturation:</span>
            <span className="text-2xl font-extrabold font-mono text-rose-400">{simResult.withoutFlowSafe.occupancyPct}%</span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-xs text-surface-400">Average Waiting Time:</span>
            <span className="text-2xl font-extrabold font-mono text-rose-400">{simResult.withoutFlowSafe.waitMin} mins</span>
          </div>

          <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300">
            ⚠️ Choke point develops as crowd floods the primary gate unchecked.
          </div>
        </div>

        {/* WITH FLOWSAFE */}
        <div className="rounded-2xl border border-brand-500/50 bg-brand-950/20 p-5 md:p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-surface-800">
            <span className="text-xs font-bold text-brand-300">WITH FLOWSAFE AI</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-500/20 text-brand-300">
              {simResult.withFlowSafe.riskStatus} 🟢
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xs text-surface-400">Peak Gate Saturation:</span>
            <span className="text-2xl font-extrabold font-mono text-emerald-400">{simResult.withFlowSafe.occupancyPct}%</span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-xs text-surface-400">Average Waiting Time:</span>
            <span className="text-2xl font-extrabold font-mono text-brand-300">{simResult.withFlowSafe.waitMin} mins</span>
          </div>

          <div className="p-3 rounded-xl bg-brand-950/40 border border-brand-500/30 text-xs text-brand-300 font-semibold">
            ✓ FlowSafe automatically balances traffic across all other available gates.
          </div>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="rounded-2xl border border-surface-800 bg-surface-900 p-5 shadow-xl space-y-3">
        <h3 className="text-sm font-bold text-white">Live Simulation Comparison Chart</h3>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="metric" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="Without_FlowSafe" name="Without FlowSafe (Red = Bad)" fill="#ef4444" radius={[6, 6, 0, 0]} />
              <Bar dataKey="With_FlowSafe" name="With FlowSafe (Green = Good)" fill="#2dd4bf" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
