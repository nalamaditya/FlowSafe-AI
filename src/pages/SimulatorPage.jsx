import React, { useState } from 'react';
import WhatIfSandbox from '../components/WhatIfSandbox';
import { ENVIRONMENTS } from '../data/environmentsData';
import { Sliders, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export default function SimulatorPage() {
  const [selectedEnvId, setSelectedEnvId] = useState('campus');
  const activeEnv = ENVIRONMENTS.find(e => e.id === selectedEnvId) || ENVIRONMENTS[0];
  const [selectedLocationId, setSelectedLocationId] = useState(activeEnv.locations[0].id);
  const [selectedTimeStr, setSelectedTimeStr] = useState('1:00 PM');

  const handleSelectEnv = (envId) => {
    setSelectedEnvId(envId);
    const newEnv = ENVIRONMENTS.find(e => e.id === envId) || ENVIRONMENTS[0];
    setSelectedLocationId(newEnv.locations[0].id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner with Selectors */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎛️</span>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Interactive “What-If?” Scenario Laboratory
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Stress-test crowd bottlenecks, unexpected influx surges, and venue capacity limits.
                </p>
              </div>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-mono self-start sm:self-auto">
            Scenario Stress Engine
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
                onClick={() => handleSelectEnv(env.id)}
                className={`px-3 py-1.5 rounded-xl transition-all shrink-0 flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm font-bold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{env.icon}</span>
                <span>{env.name}</span>
              </button>
            );
          })}
        </div>

        {/* Location & Time Selection Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Target Zone to Test:</label>
            <select
              value={selectedLocationId}
              onChange={(e) => setSelectedLocationId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:border-purple-600 cursor-pointer"
            >
              {activeEnv.locations.map(loc => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Target Time Scenario:</label>
            <select
              value={selectedTimeStr}
              onChange={(e) => setSelectedTimeStr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:border-purple-600 cursor-pointer"
            >
              <option value="9:00 AM">9:00 AM (Morning)</option>
              <option value="11:30 AM">11:30 AM (Pre-Rush)</option>
              <option value="1:00 PM">1:00 PM (Midday Peak)</option>
              <option value="4:30 PM">4:30 PM (Evening Closing)</option>
              <option value="7:00 PM">7:00 PM (Night Shift)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main What-If Simulator */}
      <WhatIfSandbox
        selectedEnv={activeEnv}
        selectedLocationId={selectedLocationId}
        selectedTimeStr={selectedTimeStr}
      />
    </div>
  );
}
