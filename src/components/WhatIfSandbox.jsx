import React, { useState } from 'react';
import { 
  Sliders, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  AlertTriangle, 
  CloudRain, 
  BellRing, 
  Flame, 
  Zap, 
  Navigation, 
  Users, 
  ArrowUpRight 
} from 'lucide-react';
import { runWhatIfSimulation, timeStringToDecimal } from '../services/predictionEngine';

export default function WhatIfSandbox({ 
  selectedEnv, 
  selectedLocationId, 
  selectedTimeStr 
}) {
  const [additionalVisitors, setAdditionalVisitors] = useState(125);
  const decimalHour = timeStringToDecimal(selectedTimeStr);

  const simulation = runWhatIfSimulation(
    selectedEnv.id,
    selectedLocationId,
    decimalHour,
    additionalVisitors
  );

  const stressPresets = [
    { label: '⚡ Minor Surge (+50)', value: 50, desc: 'Normal localized spike' },
    { label: '🌧️ Bad Weather Rush (+125)', value: 125, desc: 'Indoor sheltering influx' },
    { label: '🔔 Interval Exit (+200)', value: 200, desc: 'Simultaneous class/show exit' },
    { label: '🚨 Critical Stress Test (+350)', value: 350, desc: 'Maximum threshold stress' },
  ];

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-black text-slate-900 leading-tight">
            Interactive “What-If?” Stress Test Laboratory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Simulate sudden unpredicted crowd spikes for <strong className="text-slate-800">{simulation.location.name}</strong> at <strong className="text-purple-600 font-mono">{simulation.baseHourFormatted}</strong>.
          </p>
        </div>

        <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 self-start sm:self-auto shrink-0">
          Capacity: {simulation.location.capacity} Max
        </span>
      </div>

      {/* Quick Scenario Stress Presets */}
      <div className="space-y-2.5">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-mono">
          Select Stress Scenario Preset:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {stressPresets.map(preset => {
            const isSelected = additionalVisitors === preset.value;
            return (
              <button
                key={preset.label}
                onClick={() => setAdditionalVisitors(preset.value)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <span className="font-bold text-xs block leading-tight">{preset.label}</span>
                <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-purple-200' : 'text-slate-500'}`}>
                  {preset.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Influx Slider & Live Delta Metrics */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Sliders className="w-4 h-4 text-purple-600 shrink-0" />
            <span>Simulated Sudden Surge:</span>
            <span className="text-sm font-black font-mono text-purple-700 bg-purple-100 px-3 py-0.5 rounded-lg border border-purple-200">
              +{additionalVisitors} Extra People
            </span>
          </div>

          {/* Delta Chips */}
          <div className="flex items-center gap-2 text-xs font-mono font-bold">
            <span className="text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              +{simulation.deltaOccupancy}% Occupancy
            </span>
            <span className="text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              +{simulation.deltaWait} min Delay
            </span>
          </div>
        </div>

        {/* Touch-Friendly Slider */}
        <div className="py-1">
          <input
            type="range"
            min="0"
            max="400"
            step="25"
            value={additionalVisitors}
            onChange={(e) => setAdditionalVisitors(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
        </div>

        <div className="flex justify-between text-[10px] font-mono text-slate-400">
          <span>+0 (Baseline)</span>
          <span>+100 (Medium)</span>
          <span>+200 (Heavy)</span>
          <span>+300 (Severe)</span>
          <span>+400 (Max Stress)</span>
        </div>
      </div>

      {/* Visual Capacity & Safety Buffer Bar */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-slate-700 font-sans text-xs">
            Physical Capacity Utilization:
          </span>
          <span className="font-black text-slate-900 text-sm">
            {simulation.scenario.crowd} / {simulation.location.capacity} ({simulation.scenario.occupancyPct}%)
          </span>
        </div>

        {/* Multi-segment capacity bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${Math.min(100, simulation.original.occupancyPct)}%` }}
            title="Baseline Occupancy"
          />
          <div 
            className={`h-full transition-all duration-300 ${
              simulation.scenario.occupancyPct >= 95 ? 'bg-rose-500' : simulation.scenario.occupancyPct >= 80 ? 'bg-amber-500' : 'bg-purple-500'
            }`}
            style={{ width: `${Math.min(100 - simulation.original.occupancyPct, simulation.deltaOccupancy)}%` }}
            title="Added Surge"
          />
        </div>

        <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-0.5">
          <span className="flex items-center gap-1.5 text-blue-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-600" /> Baseline ({simulation.original.occupancyPct}%)
          </span>
          <span className="flex items-center gap-1.5 text-purple-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-purple-500" /> Added Surge (+{simulation.deltaOccupancy}%)
          </span>
          <span className={simulation.scenario.occupancyPct >= 100 ? 'text-rose-600 font-bold' : 'text-slate-500'}>
            {simulation.scenario.occupancyPct >= 100 ? '⚠️ OVER CAPACITY' : `${100 - simulation.scenario.occupancyPct}% Safe Buffer`}
          </span>
        </div>
      </div>

      {/* 3-Way Comparative Grid: Original vs Uncontrolled Surge vs FlowSafe Mitigated */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Original Baseline */}
        <div className="p-5 rounded-3xl border border-slate-200 bg-white space-y-3 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase font-mono">1. Baseline</span>
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-mono font-bold ${
              simulation.original.status.level === 'closed'
                ? 'bg-slate-100 text-slate-600 border-slate-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              {simulation.original.status.dot} {simulation.original.status.label}
            </span>
          </div>

          <div className="space-y-1.5 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans text-xs">Crowd:</span>
              <strong className="text-slate-900">{simulation.original.crowd}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans text-xs">Occupancy:</span>
              <strong className="text-slate-900">{simulation.original.occupancyPct}%</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans text-xs">Queue Wait:</span>
              <strong className="text-slate-900">{simulation.original.waitMin} mins</strong>
            </div>
          </div>
        </div>

        {/* 2. Uncontrolled Surge (Without AI) */}
        <div className={`p-5 rounded-3xl border space-y-3 shadow-sm ${
          simulation.isOverload 
            ? 'bg-rose-50/70 border-rose-200' 
            : 'bg-amber-50/70 border-amber-200'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <span className="text-[11px] font-bold text-rose-900 uppercase font-mono">
              2. Unmanaged Surge (+{additionalVisitors})
            </span>
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-mono font-bold ${
              simulation.scenario.status.level === 'closed'
                ? 'bg-slate-100 text-slate-600 border-slate-200'
                : 'bg-rose-100 text-rose-800 border-rose-200'
            }`}>
              {simulation.scenario.status.dot} {simulation.scenario.status.label}
            </span>
          </div>

          <div className="space-y-1.5 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-600 font-sans text-xs">Surge Crowd:</span>
              <strong className="text-rose-700 font-black">{simulation.scenario.crowd}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-sans text-xs">Occupancy:</span>
              <strong className={simulation.scenario.occupancyPct >= 80 ? 'text-rose-700 font-black' : 'text-slate-900 font-bold'}>
                {simulation.scenario.occupancyPct}%
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-sans text-xs">Bottleneck Delay:</span>
              <strong className="text-rose-700 font-black">{simulation.scenario.waitMin} mins</strong>
            </div>
          </div>
        </div>

        {/* 3. FlowSafe AI Mitigated Outcome */}
        <div className="p-5 rounded-3xl border-2 border-emerald-500 bg-emerald-50/70 space-y-3 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
            <span className="text-[11px] font-bold text-emerald-900 uppercase flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>3. Mitigated with AI</span>
            </span>
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-mono font-bold ${
              simulation.mitigated.status.level === 'closed'
                ? 'bg-slate-100 text-slate-600 border-slate-200'
                : 'bg-emerald-100 text-emerald-800 border-emerald-300'
            }`}>
              {simulation.mitigated.status.dot} {simulation.mitigated.status.label}
            </span>
          </div>

          <div className="space-y-1.5 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-600 font-sans text-xs">Balanced Crowd:</span>
              <strong className="text-emerald-800 font-black">{simulation.mitigated.crowd}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-sans text-xs">Occupancy:</span>
              <strong className="text-emerald-800 font-black">{simulation.mitigated.occupancy}%</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-sans text-xs">Controlled Wait:</span>
              <strong className="text-emerald-800 font-black">{simulation.mitigated.wait} mins</strong>
            </div>
          </div>
        </div>
      </div>

      {/* FlowSafe Proactive Mitigation Directives Suite */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-400">
              <Zap className="w-4 h-4" />
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-mono">
              FlowSafe Proactive Mitigation Directives
            </h3>
          </div>

          {simulation.mitigated.timeSavedPct > 0 && (
            <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              -{simulation.mitigated.timeSavedPct}% Queue Reduction
            </span>
          )}
        </div>

        {/* Assessment summary */}
        <p className="text-xs text-slate-300 font-semibold leading-relaxed">
          {simulation.recommendation}
        </p>

        {/* Action Directives List */}
        <div className="space-y-2 pt-1 text-xs">
          {simulation.physicalDirectives.map((action, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700/80 text-slate-200 font-medium">
              <ArrowRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>{action}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
