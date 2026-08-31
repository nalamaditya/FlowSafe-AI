import React from 'react';
import { useAppState } from '../context/AppStateContext';
import PresentationBar from '../components/layout/PresentationBar';
import TraditionalVsFlowSafe from '../components/common/TraditionalVsFlowSafe';
import MetricCard from '../components/common/MetricCard';
import StatusBadge from '../components/common/StatusBadge';
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  MapPin,
  Zap
} from 'lucide-react';

export default function OverviewPage() {
  const { 
    setActivePage, 
    triggerPrediction, 
    environments, 
    activeEnvId, 
    setActiveEnvId, 
    setIsEnvModalOpen,
  } = useAppState();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1-Click Judge Demo Bar */}
      <PresentationBar />

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-surface-800 bg-gradient-to-b from-surface-900 via-surface-950 to-surface-950 p-6 md:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Predictive Crowd Intelligence Platform</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Predict congestion <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-teal-300 to-cyan-400">before it happens.</span>
          </h1>

          <p className="text-sm md:text-base text-surface-300 leading-relaxed">
            FlowSafe AI forecasts crowd movement, queue buildup, and congestion risk, then recommends proactive actions to keep people moving safely and efficiently.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActivePage('live_venue')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-teal-500 hover:from-brand-500 hover:to-teal-400 text-surface-950 font-bold text-xs md:text-sm tracking-wide shadow-xl shadow-brand-500/20 transition-all active:scale-95"
            >
              <MapPin className="w-4 h-4" />
              <span>Explore Live Stadium Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                triggerPrediction();
                setActivePage('predictions');
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-800 hover:bg-surface-700 text-white font-semibold text-xs md:text-sm border border-surface-700 transition-all"
            >
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Run AI Prediction</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Clean Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Current Venue Crowd"
          value="2,486"
          subtitle="Real-time optical & turnstile total"
          icon={Users}
          highlight={true}
          statusBadge={<StatusBadge status="ACTIVE INGRESS" level="low" />}
          onClick={() => setActivePage('live_venue')}
        />

        <MetricCard
          title="Predicted Peak"
          value="1:05 PM"
          subtitle="T - 20 mins to kickoff surge"
          icon={Clock}
          statusBadge={<StatusBadge status="PEAK WINDOW" level="high" />}
          onClick={() => setActivePage('predictions')}
        />

        <MetricCard
          title="Highest Risk Zone"
          value="Gate B"
          subtitle="East Stand perimeter access"
          icon={AlertTriangle}
          statusBadge={<StatusBadge status="CRITICAL RISK" level="critical" pulse={true} />}
          onClick={() => setActivePage('live_venue')}
        />

        <MetricCard
          title="Average Queue"
          value="11 min"
          subtitle="Slashing wait from 24m down to 11m"
          icon={Activity}
          statusBadge={<StatusBadge status="WITH FLOWSAFE" level="low" />}
          onClick={() => setActivePage('redistribution')}
        />
      </div>

      {/* Paradigm Shift Banner */}
      <TraditionalVsFlowSafe />

      {/* Supported Environments (16 Environments Grid) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base md:text-lg font-bold text-white tracking-wide">
              Supported Environments (16+ Venues)
            </h2>
            <p className="text-xs text-surface-400">
              One unified platform adaptable to stadiums, airports, metro stations, hospitals, malls, campuses, and more.
            </p>
          </div>

          <button
            onClick={() => setIsEnvModalOpen(true)}
            className="text-xs font-bold text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>View All Venues &rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
          {environments.slice(0, 8).map((env) => {
            const isActive = activeEnvId === env.id;

            return (
              <div
                key={env.id}
                onClick={() => {
                  setActiveEnvId(env.id);
                  setActivePage('live_venue');
                }}
                className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                  isActive
                    ? 'bg-brand-950/40 border-brand-400 shadow-md scale-105'
                    : 'bg-surface-900 border-surface-800 hover:border-surface-700 hover:bg-surface-850'
                }`}
              >
                <span className="text-2xl mb-1 block">{env.icon}</span>
                <p className="text-xs font-bold text-white truncate">{env.name}</p>
                <span className="text-[10px] text-surface-400 font-mono block mt-0.5">
                  {env.capacity.toLocaleString()} cap
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
