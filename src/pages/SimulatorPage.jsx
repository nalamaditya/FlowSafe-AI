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
      {/* Top Banner with Frosted Glassmorphic Depth */}
      <div className="bg-white/85 backdrop-blur-xl rounded-3xl border border-white/80 shadow-[0_10px_30px_rgb(0,0,0,0.04)] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-purple-500/20 shrink-0 border border-purple-400/20">
              🎛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50/90 text-purple-700 border border-purple-200 font-mono shadow-xs">
                  Scenario Stress Engine
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                Interactive “What-If?” <span className="text-slate-400 font-medium text-lg">• Scenario Laboratory</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Stress-test crowd bottlenecks, unexpected influx surges, and venue capacity limits.
              </p>
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
                onClick={() => handleSelectEnv(env.id)}
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

        {/* Location & Time Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5 text-xs">
              Select Zone to Stress-Test:
            </label>
            <select
              value={selectedLocationId}
              onChange={(e) => setSelectedLocationId(e.target.value)}
              className="w-full p-2.5 bg-slate-50/90 border border-slate-200/90 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-purple-500 cursor-pointer shadow-xs text-xs"
            >
              {activeEnv.locations.map(loc => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1.5 text-xs">
              Baseline Time Window:
            </label>
            <select
              value={selectedTimeStr}
              onChange={(e) => setSelectedTimeStr(e.target.value)}
              className="w-full p-2.5 bg-slate-50/90 border border-slate-200/90 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-purple-500 cursor-pointer shadow-xs text-xs"
            >
              <option value="9:00 AM">9:00 AM (Morning Schedule)</option>
              <option value="11:30 AM">11:30 AM (Pre-Lunch)</option>
              <option value="1:00 PM">1:00 PM (Lunch Interval Peak)</option>
              <option value="4:00 PM">4:00 PM (Closing Ingress/Exit)</option>
              <option value="7:00 PM">7:00 PM (Evening Surge)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main What-If Interactive Sandbox */}
      <WhatIfSandbox
        selectedEnv={activeEnv}
        selectedLocationId={selectedLocationId}
        selectedTimeStr={selectedTimeStr}
      />
    </div>
  );
}
