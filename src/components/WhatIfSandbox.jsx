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
import { runWhatIfSimulation } from '../services/predictionEngine';

export default function WhatIfSandbox({ 
  selectedEnv, 
  selectedLocationId, 
  selectedTimeStr 
}) {
  const [additionalVisitors, setAdditionalVisitors] = useState(125);

  const simulation = runWhatIfSimulation(
    selectedEnv.id,
    selectedLocationId,
    selectedTimeStr,
    additionalVisitors
  );

  const stressPresets = [
    { label: '⚡ Minor Surge (+50)', value: 50, desc: 'Normal localized spike' },
    { label: '🌧️ Bad Weather Rush (+125)', value: 125, desc: 'Indoor sheltering influx' },
    { label: '🔔 Lecture / Halftime (+200)', value: 200, desc: 'Simultaneous interval exit' },
    { label: '🚨 Critical Stress Test (+350)', value: 350, desc: 'Maximum threshold stress' },
  ];

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-6">
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-slate-100">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
            Interactive “What-If?” Stress Test Laboratory
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Simulate sudden unpredicted crowd spikes for <strong className="text-slate-800">{simulation.location.name}</strong> at <strong className="text-blue-600">{simulation.targetTimeFormatted}</strong>.
          </p>
        </div>

        <span className="text-[10px] sm:text-[11px] font-mono font-bold px-2.5 py-1 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 self-start sm:self-auto shrink-0">
          Capacity: {simulation.location.capacity} Max
        </span>
      </div>

      {/* Quick Scenario Stress Presets */}
      <div className="space-y-2">
        <label className="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
          Select Stress Scenario Preset:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {stressPresets.map(preset => {
            const isSelected = additionalVisitors === preset.value;
            return (
              <button
                key={preset.label}
                onClick={() => setAdditionalVisitors(preset.value)}
                className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <span className="font-bold text-[11px] sm:text-xs block leading-tight">{preset.label}</span>
                <span className={`text-[9px] sm:text-[10px] block mt-0.5 ${isSelected ? 'text-purple-200' : 'text-slate-500'}`}>
                  {preset.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Influx Slider & Live Delta Metrics */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
            <Sliders className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span>Simulated Sudden Surge:</span>
            <span className="text-xs sm:text-sm font-black font-mono text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-lg border border-purple-200">
              +{additionalVisitors} Extra People
            </span>
          </div>

          {/* Delta Chips */}
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono font-bold">
            <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
              +{simulation.deltaOccupancy}% Occupancy
            </span>
            <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
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
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
        </div>

        <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-slate-400">
          <span>+0 (Baseline)</span>
          <span>+100 (Medium)</span>
          <span>+200 (Heavy)</span>
          <span>+300 (Severe)</span>
          <span>+400 (Max Stress)</span>
        </div>
      </div>

      {/* Visual Capacity & Safety Buffer Bar */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-slate-700 font-sans text-xs">
            Physical Capacity Utilization:
          </span>
          <span className="font-extrabold text-slate-900">
            {simulation.scenario.crowd} / {simulation.location.capacity} ({simulation.scenario.occupancy}%)
          </span>
        </div>

        {/* Multi-segment capacity bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${Math.min(100, simulation.original.occupancy)}%` }}
            title="Baseline Occupancy"
          />
          <div 
            className={`h-full transition-all duration-300 ${
              simulation.scenario.occupancy >= 95 ? 'bg-red-500' : simulation.scenario.occupancy >= 80 ? 'bg-orange-500' : 'bg-purple-500'
            }`}
            style={{ width: `${Math.min(100 - simulation.original.occupancy, simulation.deltaOccupancy)}%` }}
            title="Added Surge"
          />
        </div>

        <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-slate-400 pt-0.5">
          <span className="flex items-center gap-1 text-blue-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-600" /> Baseline ({simulation.original.occupancy}%)
          </span>
          <span className="flex items-center gap-1 text-purple-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-purple-500" /> Added Surge (+{simulation.deltaOccupancy}%)
          </span>
          <span className={simulation.scenario.occupancy >= 100 ? 'text-red-600 font-bold' : 'text-slate-500'}>
            {simulation.scenario.occupancy >= 100 ? '⚠️ OVER CAPACITY' : `${100 - simulation.scenario.occupancy}% Safe Buffer`}
          </span>
        </div>
      </div>

      {/* 3-Way Comparative Grid: Original vs Uncontrolled Surge vs FlowSafe Mitigated */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* 1. Original Baseline */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase">1. Baseline</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono font-bold ${simulation.original.status.badgeClass}`}>
              {simulation.original.status.dot} {simulation.original.status.label}
            </span>
          </div>

          <div className="space-y-1 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans text-[11px]">Crowd:</span>
              <strong className="text-slate-900">{simulation.original.crowd}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans text-[11px]">Occupancy:</span>
              <strong className="text-slate-900">{simulation.original.occupancy}%</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans text-[11px]">Queue Wait:</span>
              <strong className="text-slate-900">{simulation.original.wait} mins</strong>
            </div>
          </div>
        </div>

        {/* 2. Uncontrolled Surge (Without AI) */}
        <div className={`p-3.5 sm:p-4 rounded-xl border space-y-2 shadow-sm ${
          simulation.isOverload 
            ? 'bg-red-50/50 border-red-300 ring-2 ring-red-400/20' 
            : 'bg-orange-50/40 border-orange-200'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <span className="text-[10px] sm:text-[11px] font-bold text-red-900 uppercase">
              2. Unmanaged Surge (+{additionalVisitors})
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono font-bold ${simulation.scenario.status.badgeClass}`}>
              {simulation.scenario.status.dot} {simulation.scenario.status.label}
            </span>
          </div>

          <div className="space-y-1 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-600 font-sans text-[11px]">Surge Crowd:</span>
              <strong className="text-red-700 font-black">{simulation.scenario.crowd}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-sans text-[11px]">Occupancy:</span>
              <strong className={simulation.scenario.occupancy >= 80 ? 'text-red-700 font-black' : 'text-slate-900 font-bold'}>
                {simulation.scenario.occupancy}%
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-sans text-[11px]">Bottleneck Delay:</span>
              <strong className="text-red-700 font-black">{simulation.scenario.wait} mins</strong>
            </div>
          </div>
        </div>

        {/* 3. FlowSafe AI Mitigated Outcome */}
        <div className="p-3.5 sm:p-4 rounded-xl border-2 border-emerald-400 bg-emerald-50/40 space-y-2 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
            <span className="text-[10px] sm:text-[11px] font-bold text-emerald-900 uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>3. Mitigated with AI</span>
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono font-bold ${simulation.mitigated.status.badgeClass}`}>
              {simulation.mitigated.status.dot} {simulation.mitigated.status.label}
            </span>
          </div>

          <div className="space-y-1 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-600 font-sans text-[11px]">Balanced Crowd:</span>
              <strong className="text-emerald-800 font-black">{simulation.mitigated.crowd}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-sans text-[11px]">Occupancy:</span>
              <strong className="text-emerald-800 font-black">{simulation.mitigated.occupancy}%</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-sans text-[11px]">Controlled Wait:</span>
              <strong className="text-emerald-800 font-black">{simulation.mitigated.wait} mins</strong>
            </div>
          </div>
        </div>
      </div>

      {/* FlowSafe Proactive Mitigation Directives Suite */}
      <div className="p-4 sm:p-5 rounded-2xl border-2 border-purple-500/30 bg-gradient-to-b from-purple-50/40 via-white to-slate-50 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-purple-200/60">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-purple-600 text-white">
              <Zap className="w-3.5 h-3.5" />
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              FlowSafe Proactive Mitigation Directives
            </h3>
          </div>

          {simulation.mitigated.timeSavedPct > 0 && (
            <span className="text-[10px] sm:text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              -{simulation.mitigated.timeSavedPct}% Queue Reduction
            </span>
          )}
        </div>

        {/* Assessment summary */}
        <p className="text-[11px] sm:text-xs text-slate-700 font-semibold leading-relaxed">
          {simulation.recommendation}
        </p>

        {/* Action Directives List */}
        <div className="space-y-2 pt-1 text-[11px] sm:text-xs">
          {simulation.physicalDirectives.map((action, idx) => (
            <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-white border border-purple-100 shadow-xs text-slate-800 font-medium">
              <ArrowRight className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
              <span>{action}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
