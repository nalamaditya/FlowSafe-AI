import React from 'react';
import LiveNowGrid from '../components/LiveNowGrid';
import { ENVIRONMENTS } from '../data/environmentsData';

export default function LiveNowPage({
  selectedEnvId,
  onSelectEnv,
  liveData,
  onSelectLocationForForecast,
  currentDecimalHour,
  onTimeChange,
  currentTimeFormatted,
  isLiveSimulatedTime
}) {
  const activeEnv = ENVIRONMENTS.find(e => e.id === selectedEnvId) || ENVIRONMENTS[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner with Frosted Glassmorphic Depth */}
      <div className="bg-white/85 backdrop-blur-xl rounded-3xl border border-white/80 shadow-[0_10px_30px_rgb(0,0,0,0.04)] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-500/20 shrink-0 border border-blue-400/20">
              {activeEnv.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50/90 text-blue-700 border border-blue-200 font-mono shadow-xs">
                  Live Operations
                </span>
                <span className="text-xs font-bold text-slate-400 font-mono">
                  {activeEnv.locations?.length} Monitored Zones
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                {activeEnv.name} <span className="text-slate-400 font-medium text-lg">• Real-Time Status</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{activeEnv.description}</p>
            </div>
          </div>
        </div>

        {/* Environment Filter Buttons with Frosted Depth */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 border-t border-slate-100/80 text-xs font-semibold -mx-1 px-1">
          <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mr-1 shrink-0 font-mono">
            VENUE:
          </span>

          {ENVIRONMENTS.map((env) => {
            const isActive = selectedEnvId === env.id;
            return (
              <button
                key={env.id}
                onClick={() => onSelectEnv(env.id)}
                className={`px-4 py-2 rounded-xl transition-all duration-200 shrink-0 flex items-center gap-2 border text-xs font-bold cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20 scale-[1.02]'
                    : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200/80 hover:border-slate-300 shadow-xs backdrop-blur-sm'
                }`}
              >
                <span>{env.icon}</span>
                <span>{env.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Realtime Grid */}
      <LiveNowGrid
        liveData={liveData}
        onSelectLocationForForecast={onSelectLocationForForecast}
        currentDecimalHour={currentDecimalHour}
        onTimeChange={onTimeChange}
        currentTimeFormatted={currentTimeFormatted}
        isLiveSimulatedTime={isLiveSimulatedTime}
      />
    </div>
  );
}
