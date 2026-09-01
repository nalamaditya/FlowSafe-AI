import React from 'react';
import FutureForecastSection from '../components/FutureForecastSection';
import { ENVIRONMENTS } from '../data/environmentsData';

export default function ForecastPage({
  selectedEnvId,
  onSelectEnv,
  selectedLocationId,
  onSelectLocation,
  selectedDate,
  onSelectDate,
  selectedTimeStr,
  onSelectTime,
  forecastData,
  currentDecimalHour
}) {
  const activeEnv = ENVIRONMENTS.find(e => e.id === selectedEnvId) || ENVIRONMENTS[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner with Environment Switcher */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-md shrink-0">
              {activeEnv.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200 font-mono">
                  Predictive AI Engine
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                {activeEnv.name} <span className="text-slate-400 font-medium text-lg">• Congestion Forecast</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Historical pattern prediction model forecasting congestion and providing proactive action plans.
              </p>
            </div>
          </div>
        </div>

        {/* Environment Filter Buttons with Beta01 Pill Styling */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 border-t border-slate-100 text-xs font-semibold -mx-1 px-1">
          <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mr-1 shrink-0 font-mono">
            VENUE:
          </span>

          {ENVIRONMENTS.map((env) => {
            const isActive = selectedEnvId === env.id;
            return (
              <button
                key={env.id}
                onClick={() => onSelectEnv(env.id)}
                className={`px-4 py-2 rounded-xl transition-all shrink-0 flex items-center gap-2 border text-xs font-bold cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
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

      {/* Main Forecast & Action Plan Section */}
      <FutureForecastSection
        selectedEnv={activeEnv}
        selectedLocationId={selectedLocationId}
        onSelectLocation={onSelectLocation}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        selectedTimeStr={selectedTimeStr}
        onSelectTime={onSelectTime}
        forecastData={forecastData}
        currentDecimalHour={currentDecimalHour}
      />
    </div>
  );
}
