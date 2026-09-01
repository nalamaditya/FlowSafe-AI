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
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
      {/* Top Banner with Environment Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="text-2xl shrink-0">{activeEnv.icon}</span>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                {activeEnv.name} AI Forecast & Recommendations
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                Predictive crowd intelligence and proactive congestion prevention for {activeEnv.name}.
              </p>
            </div>
          </div>
        </div>

        {/* Environment Filter Buttons with Touch Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100 text-xs font-semibold -mx-1 px-1">
          <span className="text-slate-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mr-1 shrink-0">
            Venue:
          </span>

          {ENVIRONMENTS.map((env) => {
            const isActive = selectedEnvId === env.id;
            return (
              <button
                key={env.id}
                onClick={() => onSelectEnv(env.id)}
                className={`px-3 py-1.5 rounded-xl transition-all shrink-0 flex items-center gap-1.5 border text-xs ${
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
