import React from 'react';
import { useAppState } from '../context/AppStateContext';
import PresentationBar from '../components/layout/PresentationBar';
import { 
  GitCompare, 
  ArrowRight, 
  TrendingDown, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Zap, 
  CheckCircle2,
  Sparkles
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
import StadiumMap from '../components/venue/StadiumMap';

export default function RedistributionPage() {
  const { redistributionData, setActivePage } = useAppState();

  const chartData = [
    { name: 'Gate A (North)', without: 30, with: 52 },
    { name: 'Gate B (East)', without: 96, with: 71 },
    { name: 'Gate C (South)', without: 28, with: 47 },
    { name: 'Gate D (West)', without: 61, with: 60 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1-Click Judge Demo Bar */}
      <PresentationBar />

      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-full border border-brand-500/20">
            THE CORE INNOVATION
          </span>
          <h1 className="text-xl md:text-2xl font-extrabold text-white mt-1">
            Predictive Crowd Redistribution: Before vs After
          </h1>
          <p className="text-xs text-surface-400 mt-0.5">
            FlowSafe balances incoming traffic across all gates 15 minutes before peak choke occurs.
          </p>
        </div>

        <button
          onClick={() => setActivePage('simulator')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 self-start sm:self-auto"
        >
          <span>4. Test What-If Simulator &rarr;</span>
        </button>
      </div>

      {/* Giant 2-Number Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Risk Drop */}
        <div className="p-5 rounded-2xl border border-rose-500/40 bg-gradient-to-b from-rose-950/30 to-surface-900 shadow-xl space-y-1">
          <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block">Peak Choke Risk</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono text-rose-400">96%</span>
            <span className="text-lg text-surface-400">&rarr;</span>
            <span className="text-3xl font-extrabold font-mono text-emerald-400">71%</span>
          </div>
          <span className="text-xs font-bold text-emerald-400 block pt-1 border-t border-surface-800">
            ✓ -25% Danger Reduction
          </span>
        </div>

        {/* Wait Time Drop */}
        <div className="p-5 rounded-2xl border border-brand-500/40 bg-gradient-to-b from-brand-950/30 to-surface-900 shadow-xl space-y-1">
          <span className="text-xs font-bold text-brand-300 uppercase tracking-wider block">Average Wait Time</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono text-rose-400">24m</span>
            <span className="text-lg text-surface-400">&rarr;</span>
            <span className="text-3xl font-extrabold font-mono text-brand-300">11m</span>
          </div>
          <span className="text-xs font-bold text-brand-300 block pt-1 border-t border-surface-800">
            ✓ -54% Queue Delay Saved
          </span>
        </div>

        {/* People Redirected */}
        <div className="p-5 rounded-2xl border border-surface-800 bg-surface-900 shadow-xl space-y-1">
          <span className="text-xs font-bold text-surface-300 uppercase tracking-wider block">Crowd Redirected</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-white">1,125</span>
            <span className="text-xs text-surface-400">people</span>
          </div>
          <span className="text-xs text-surface-400 block pt-1 border-t border-surface-800">
            Shifted from Gate B to Gates A & C
          </span>
        </div>

        {/* Throughput Gain */}
        <div className="p-5 rounded-2xl border border-surface-800 bg-surface-900 shadow-xl space-y-1">
          <span className="text-xs font-bold text-surface-300 uppercase tracking-wider block">Perimeter Flow Gain</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-emerald-400">+34%</span>
            <span className="text-xs text-surface-400">faster</span>
          </div>
          <span className="text-xs text-surface-400 block pt-1 border-t border-surface-800">
            Zero turnstile idling
          </span>
        </div>
      </div>

      {/* Side-by-Side Comparison: Clear and Visual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WITHOUT FLOWSAFE */}
        <div className="rounded-2xl border border-rose-500/40 bg-surface-900/90 p-5 md:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <h3 className="text-base font-extrabold text-white">WITHOUT FlowSafe (Traditional)</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40">
              Choke: 96% 🔴
            </span>
          </div>

          <p className="text-xs text-surface-300">
            Sensors only <strong>react</strong> when Gate B is already in critical danger. Gates A & C sit underutilized while people are stuck in 28-minute queues.
          </p>

          <div className="space-y-2.5 pt-1">
            <div className="p-2.5 rounded-xl bg-surface-850 border border-surface-800 flex justify-between text-xs font-mono">
              <span className="text-surface-300">Gate A (North):</span>
              <span className="text-emerald-400 font-bold">30% (4 min wait)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 flex justify-between text-xs font-mono">
              <span className="text-rose-300 font-bold">Gate B (East - Choke):</span>
              <span className="text-rose-400 font-extrabold">96% (28 min wait) 🔴</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-850 border border-surface-800 flex justify-between text-xs font-mono">
              <span className="text-surface-300">Gate C (South):</span>
              <span className="text-emerald-400 font-bold">28% (5 min wait)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-850 border border-surface-800 flex justify-between text-xs font-mono">
              <span className="text-surface-300">Gate D (West):</span>
              <span className="text-amber-400 font-bold">61% (12 min wait)</span>
            </div>
          </div>
        </div>

        {/* WITH FLOWSAFE */}
        <div className="rounded-2xl border border-brand-500/50 bg-brand-950/20 p-5 md:p-6 shadow-2xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-surface-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-400" />
              <h3 className="text-base font-extrabold text-white">WITH FlowSafe AI (Proactive)</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/40">
              Balanced: 71% 🟢
            </span>
          </div>

          <p className="text-xs text-surface-200">
            FlowSafe <strong>predicts and redistributes</strong> 1,125 incoming visitors to Gates A & C 15 minutes before the surge hits.
          </p>

          <div className="space-y-2.5 pt-1">
            <div className="p-2.5 rounded-xl bg-surface-850 border border-surface-700 flex justify-between text-xs font-mono">
              <span className="text-white font-semibold">Gate A (North):</span>
              <span className="text-brand-300 font-bold">52% (+880 redirected) 🟢</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-850 border border-surface-700 flex justify-between text-xs font-mono">
              <span className="text-white font-bold">Gate B (East - Relieved):</span>
              <span className="text-amber-400 font-bold">71% (11 min wait) 🟡</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-850 border border-surface-700 flex justify-between text-xs font-mono">
              <span className="text-white font-semibold">Gate C (South):</span>
              <span className="text-brand-300 font-bold">47% (+665 redirected) 🟢</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-850 border border-surface-700 flex justify-between text-xs font-mono">
              <span className="text-white font-semibold">Gate D (West):</span>
              <span className="text-amber-400 font-bold">60% (9 min wait) 🟡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Chart & 2D Redistribution Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Simple Bar Chart */}
        <div className="rounded-2xl border border-surface-800 bg-surface-900/90 p-5 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-white">Occupancy Comparison by Gate (%)</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} unit="%" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="without" name="Without FlowSafe (Red = Choke)" fill="#ef4444" radius={[6, 6, 0, 0]} />
                <Bar dataKey="with" name="With FlowSafe (Green = Balanced)" fill="#2dd4bf" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2D Stadium Map with Redistribution Flow Vectors */}
        <div className="space-y-3">
          <StadiumMap showRedistribution={true} />
        </div>
      </div>
    </div>
  );
}
