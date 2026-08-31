import React from 'react';
import { useAppState } from '../context/AppStateContext';
import PresentationBar from '../components/layout/PresentationBar';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { 
  Sparkles, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  Info, 
  ArrowRight,
  ParkingCircle,
  Ticket,
  DoorClosed,
  Zap
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';

export default function PredictionsPage() {
  const { 
    selectedGate, 
    liveGates, 
    selectedGateId, 
    setSelectedGateId, 
    triggerPrediction, 
    isPredicting,
    setActivePage 
  } = useAppState();

  const current = selectedGate.current || 3800;
  const pred15 = selectedGate.predicted15m || 4050;
  const pred30 = selectedGate.predicted30m || 4380;
  const pred60 = selectedGate.predicted60m || 4100;
  const cap = selectedGate.capacity || 4500;

  const chartData = [
    { time: '30m ago', historical: Math.round(current * 0.76), predicted: null },
    { time: '15m ago', historical: Math.round(current * 0.88), predicted: null },
    { time: 'NOW', historical: current, predicted: current },
    { time: 'In 15 min', historical: null, predicted: pred15 },
    { time: 'In 30 min (Peak)', historical: null, predicted: pred30 },
    { time: 'In 60 min', historical: null, predicted: pred60 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1-Click Judge Demo Bar */}
      <PresentationBar />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            AI FORECAST ENGINE
          </span>
          <h1 className="text-xl md:text-2xl font-extrabold text-white mt-1">
            Predicting Congestion Before It Happens
          </h1>
          <p className="text-xs text-surface-400 mt-0.5">
            FlowSafe detects that <strong>Gate B</strong> will become critically clogged (96%) in 12–15 minutes.
          </p>
        </div>

        <button
          onClick={() => setActivePage('redistribution')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-surface-950 font-bold text-xs shadow-md transition-all active:scale-95 self-start sm:self-auto"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>3. Fix with Redistribution &rarr;</span>
        </button>
      </div>

      {/* 4 Big Simple Prediction Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-surface-800 bg-surface-900 shadow-xl space-y-1">
          <span className="text-xs font-bold text-surface-400 uppercase tracking-wider">Current Crowd</span>
          <h3 className="text-2xl font-extrabold font-mono text-white">{current.toLocaleString()}</h3>
          <span className="text-xs text-surface-400">84% Occupancy (14 min wait)</span>
        </div>

        <div className="p-4 rounded-2xl border border-surface-800 bg-surface-900 shadow-xl space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">In 15 Minutes</span>
          <h3 className="text-2xl font-extrabold font-mono text-amber-400">{pred15.toLocaleString()}</h3>
          <span className="text-xs text-amber-300">+6.5% arrival surge</span>
        </div>

        <div className="p-4 rounded-2xl border border-rose-500/40 bg-rose-950/20 shadow-xl space-y-1">
          <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">In 30 Minutes (Peak)</span>
          <h3 className="text-2xl font-extrabold font-mono text-rose-400">{pred30.toLocaleString()}</h3>
          <span className="text-xs font-bold text-rose-400 font-mono">96% CRITICAL (25 min wait)</span>
        </div>

        <div className="p-4 rounded-2xl border border-surface-800 bg-surface-900 shadow-xl space-y-1">
          <span className="text-xs font-bold text-surface-400 uppercase tracking-wider">Model Confidence</span>
          <h3 className="text-2xl font-extrabold font-mono text-brand-400">87%</h3>
          <span className="text-xs text-surface-400">Deterministic Lookahead</span>
        </div>
      </div>

      {/* Recharts Curve */}
      <div className="rounded-2xl border border-surface-800 bg-surface-900/90 p-5 md:p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-surface-800">
          <h3 className="text-sm font-bold text-white">
            Arrival Trajectory Curve for Gate B (East Entrance)
          </h3>
          <span className="text-xs font-mono text-rose-400 font-bold">
            🔴 Red area shows predicted surge wave
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHist" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 4800]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
              <ReferenceLine y={4500} label={{ value: 'Capacity limit', fill: '#ef4444', fontSize: 10 }} stroke="#ef4444" strokeDasharray="4 4" />
              <Area type="monotone" dataKey="historical" stroke="#14b8a6" strokeWidth={3} fill="url(#colorHist)" name="Past Actual Count" />
              <Area type="monotone" dataKey="predicted" stroke="#f43f5e" strokeWidth={3} strokeDasharray="5 5" fill="url(#colorPred)" name="AI Predicted Surge" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Explainable AI: 3 Clear Simple Reasons */}
      <div className="rounded-2xl border border-surface-800 bg-surface-900 p-5 md:p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-brand-400" />
          <span>Why is congestion predicted at Gate B? (Explainable AI)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-surface-850 border border-surface-800 space-y-1">
            <div className="flex items-center gap-2 text-brand-300 text-xs font-bold">
              <Clock className="w-4 h-4" />
              <span>1. Match Starts in 20 Mins</span>
            </div>
            <p className="text-xs text-surface-300">
              Spectators arriving late create a sharp +32% arrival spike right before kickoff.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-850 border border-surface-800 space-y-1">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <ParkingCircle className="w-4 h-4" />
              <span>2. East Parking Lot Full</span>
            </div>
            <p className="text-xs text-surface-300">
              Shuttle buses are dropping thousands of fans directly at Gate B instead of spreading out.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-850 border border-surface-800 space-y-1">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
              <DoorClosed className="w-4 h-4" />
              <span>3. Gate B Scanners Slower</span>
            </div>
            <p className="text-xs text-surface-300">
              Gate B processes 18 people/min vs 25/min at Gate C, creating a natural bottleneck.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
