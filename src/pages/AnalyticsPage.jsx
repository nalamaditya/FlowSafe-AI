import React from 'react';
import { 
  HOURLY_ANALYTICS_DATA, 
  GATE_DISTRIBUTION_ANALYTICS, 
  CONGESTION_INCIDENTS_HISTORY,
  AI_INSIGHT_HIGHLIGHTS 
} from '../data/crowdData';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  Zap, 
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';

export default function AnalyticsPage() {
  const pieColors = ['#10b981', '#ef4444', '#10b981', '#f59e0b'];

  const occupancyCurve = [
    { hour: '10:00', Gate_A: 20, Gate_B: 35, Gate_C: 15, Gate_D: 25 },
    { hour: '11:00', Gate_A: 25, Gate_B: 55, Gate_C: 20, Gate_D: 40 },
    { hour: '12:00', Gate_A: 30, Gate_B: 78, Gate_C: 24, Gate_D: 52 },
    { hour: '12:30', Gate_A: 32, Gate_B: 84, Gate_C: 26, Gate_D: 58 },
    { hour: '13:00 (Peak)', Gate_A: 52, Gate_B: 71, Gate_C: 47, Gate_D: 60 },
    { hour: '13:30', Gate_A: 38, Gate_B: 45, Gate_C: 32, Gate_D: 40 },
    { hour: '14:00', Gate_A: 22, Gate_B: 28, Gate_C: 18, Gate_D: 25 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-wide">
              Venue Intelligence & Historical Analytics
            </h1>
          </div>
          <p className="text-xs text-surface-400 mt-1">
            Empirical crowd distributions, predictive deviation accuracy, and automated AI insight synthesis.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-surface-400 bg-surface-900 px-3 py-1.5 rounded-xl border border-surface-800">
          <span className="w-2 h-2 rounded-full bg-brand-400" />
          <span>Historical Horizon: Last 30 Days</span>
        </div>
      </div>

      {/* AI Insights Highlight Cards (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {AI_INSIGHT_HIGHLIGHTS.map((insight) => (
          <div
            key={insight.id}
            className="p-4 rounded-2xl border border-surface-800 bg-surface-900/80 backdrop-blur-md flex flex-col justify-between space-y-3 hover:border-brand-500/40 transition-colors"
          >
            <div className="space-y-1.5">
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border inline-block ${insight.badgeColor}`}>
                {insight.badge}
              </span>
              <h4 className="text-xs font-bold text-white leading-snug">{insight.title}</h4>
              <p className="text-[11px] text-surface-300 leading-relaxed">{insight.content}</p>
            </div>

            <div className="pt-2 border-t border-surface-800 text-[10px] text-surface-500 font-mono flex items-center justify-between">
              <span>Confidence: 94%</span>
              <span className="text-brand-400 font-semibold">Actionable</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid Row 1: Crowd By Hour & Predicted vs Actual */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Crowd by Hour & Predicted vs Actual */}
        <div className="rounded-2xl border border-surface-800 bg-surface-900/90 p-5 md:p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                1. Predicted vs. Actual Ingress Volume
              </h3>
              <p className="text-xs text-surface-400">Tracking prediction fidelity against ground-truth turnstiles.</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              98.2% Accuracy
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HOURLY_ANALYTICS_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="actualGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="predGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="actual" name="Actual Sensor Count" stroke="#14b8a6" strokeWidth={2.5} fill="url(#actualGlow)" />
                <Area type="monotone" dataKey="predicted" name="AI Model Projection" stroke="#6366f1" strokeWidth={2.5} strokeDasharray="4 4" fill="url(#predGlow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Average Queue Time by Hour */}
        <div className="rounded-2xl border border-surface-800 bg-surface-900/90 p-5 md:p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                2. Average Queue Wait Duration (Minutes)
              </h3>
              <p className="text-xs text-surface-400">Peak wait times spiking at 22 minutes at 13:00 kickoff wave.</p>
            </div>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Peak: 22m
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={HOURLY_ANALYTICS_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} unit="m" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
                <Line type="monotone" dataKey="waitTime" name="Queue Delay (Mins)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Grid Row 2: Gate Distribution & Weekly Bottlenecks Avoided */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3. Peak Congestion Distribution by Gate */}
        <div className="rounded-2xl border border-surface-800 bg-surface-900/90 p-5 shadow-2xl space-y-3">
          <div className="pb-2 border-b border-surface-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              3. Peak Congestion Zones
            </h3>
            <p className="text-[11px] text-surface-400">Gate B accounts for 48% of all perimeter pressure.</p>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={GATE_DISTRIBUTION_ANALYTICS}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="percentage"
                >
                  {GATE_DISTRIBUTION_ANALYTICS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
            {GATE_DISTRIBUTION_ANALYTICS.map((g, idx) => (
              <div key={g.name} className="flex items-center gap-1.5 text-surface-300">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pieColors[idx] }} />
                <span>{g.name}: <strong>{g.percentage}%</strong></span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Congestion Incidents Avoided (Weekly) */}
        <div className="lg:col-span-2 rounded-2xl border border-surface-800 bg-surface-900/90 p-5 shadow-2xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-surface-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                4. Congestion Frequency & Proactive Prevention
              </h3>
              <p className="text-[11px] text-surface-400">Incidents successfully deflected via FlowSafe redistribution.</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">
              68 Bottlenecks Avoided / Week
            </span>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CONGESTION_INCIDENTS_HISTORY} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '5px' }} />
                <Bar dataKey="incidentsAvoided" name="Incidents Avoided (FlowSafe)" fill="#2dd4bf" radius={[6, 6, 0, 0]} />
                <Bar dataKey="unmitigatedBottlenecks" name="Unmitigated Chokes" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Grid Row 3: Multi-Gate Average Occupancy Curves */}
      <div className="rounded-2xl border border-surface-800 bg-surface-900/90 p-5 md:p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-surface-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              5. Multi-Gate Occupancy Progression Curves (%)
            </h3>
            <p className="text-xs text-surface-400">Illustrating how proactive balancing flattens Gate B's peak curve.</p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={occupancyCurve} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} unit="%" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="Gate_A" stroke="#10b981" strokeWidth={2} name="Gate A (North)" />
              <Line type="monotone" dataKey="Gate_B" stroke="#ef4444" strokeWidth={3} name="Gate B (East)" />
              <Line type="monotone" dataKey="Gate_C" stroke="#3b82f6" strokeWidth={2} name="Gate C (South)" />
              <Line type="monotone" dataKey="Gate_D" stroke="#f59e0b" strokeWidth={2} name="Gate D (West)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
