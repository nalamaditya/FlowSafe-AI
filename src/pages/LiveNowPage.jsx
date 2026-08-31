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
      {/* Top Banner with Environment Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeEnv.icon}</span>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  {activeEnv.name} Live Crowd Status
                </h2>
                <p className="text-xs text-slate-500 font-medium">{activeEnv.description}</p>
              </div>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono self-start sm:self-auto">
            {activeEnv.locations?.length} Monitored Zones
          </span>
        </div>

        {/* Environment Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 text-xs font-semibold">
          <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mr-1 shrink-0">
            Select Venue:
          </span>

          {ENVIRONMENTS.map((env) => {
            const isActive = selectedEnvId === env.id;
            return (
              <button
                key={env.id}
                onClick={() => onSelectEnv(env.id)}
                className={`px-3 py-1.5 rounded-xl transition-all shrink-0 flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-bold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
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
