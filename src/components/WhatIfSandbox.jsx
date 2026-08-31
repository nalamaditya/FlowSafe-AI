import React, { useState } from 'react';
import { Sliders, ArrowRight, ShieldAlert, CheckCircle2, Sparkles, Plus, AlertTriangle } from 'lucide-react';
import { runWhatIfSimulation } from '../services/predictionEngine';

export default function WhatIfSandbox({ 
  selectedEnv, 
  selectedLocationId, 
  selectedTimeStr 
}) {
  const [additionalVisitors, setAdditionalVisitors] = useState(100);

  const simulation = runWhatIfSimulation(
    selectedEnv.id,
    selectedLocationId,
    selectedTimeStr,
    additionalVisitors
  );

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-5">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-slate-100">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
            Interactive “What-If?” Scenario Simulator
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Simulate sudden crowd surges for <strong className="text-slate-800">{simulation.location.name}</strong> at <strong className="text-blue-600">{simulation.targetTimeFormatted}</strong>.
          </p>
        </div>
      </div>

      {/* Control Slider */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 sm:space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[11px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider">
            Simulated Extra Influx
          </label>
          <span className="text-xs sm:text-sm font-black font-mono text-purple-600 bg-purple-50 border border-purple-200 px-2.5 sm:px-3 py-1 rounded-lg">
            +{additionalVisitors} Extra People
          </span>
        </div>

        <div className="py-1">
          <input
            type="range"
            min="0"
            max="300"
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
          <span>+300 (Extreme)</span>
        </div>
      </div>

      {/* Comparison Grid: Original vs Scenario */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Baseline Forecast */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-[11px] sm:text-xs font-bold text-slate-600 uppercase">Original Baseline</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono font-bold ${simulation.original.status.badgeClass}`}>
              {simulation.original.status.dot} {simulation.original.status.label}
            </span>
          </div>

          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-500 font-sans">Predicted Crowd:</span>
            <strong className="text-slate-900 text-xs sm:text-sm">{simulation.original.crowd}</strong>
          </div>

          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-500 font-sans">Occupancy:</span>
            <strong className="text-slate-900 text-xs sm:text-sm">{simulation.original.occupancy}%</strong>
          </div>

          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-500 font-sans">Estimated Wait:</span>
            <strong className="text-slate-900 text-xs sm:text-sm">{simulation.original.wait} mins</strong>
          </div>
        </div>

        {/* What-If Scenario Result */}
        <div className={`p-3.5 sm:p-4 rounded-xl border space-y-2 ${
          simulation.isOverload 
            ? 'bg-red-50/40 border-red-300 ring-2 ring-red-400/20' 
            : 'bg-emerald-50/40 border-emerald-300'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <span className="text-[11px] sm:text-xs font-bold text-slate-900 uppercase">
              Scenario (+{additionalVisitors})
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono font-bold ${simulation.scenario.status.badgeClass}`}>
              {simulation.scenario.status.dot} {simulation.scenario.status.label}
            </span>
          </div>

          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-600 font-sans">Scenario Crowd:</span>
            <strong className="text-purple-700 text-xs sm:text-sm font-black">{simulation.scenario.crowd}</strong>
          </div>

          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-600 font-sans">Scenario Occupancy:</span>
            <strong className={simulation.scenario.occupancy >= 85 ? 'text-red-600 text-xs sm:text-sm font-black' : 'text-slate-900 text-xs sm:text-sm font-black'}>
              {simulation.scenario.occupancy}%
            </strong>
          </div>

          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-600 font-sans">Scenario Wait Time:</span>
            <strong className={simulation.scenario.occupancy >= 85 ? 'text-red-600 text-xs sm:text-sm font-black' : 'text-slate-900 text-xs sm:text-sm font-black'}>
              {simulation.scenario.wait} mins
            </strong>
          </div>
        </div>
      </div>

      {/* Dynamic Recommendation Output */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-purple-50/40 border border-purple-200 text-[11px] sm:text-xs font-medium text-slate-800 space-y-1">
        <span className="font-bold text-purple-700 uppercase tracking-wider block text-[10px]">
          FlowSafe Scenario Guidance:
        </span>
        <p className="leading-relaxed">{simulation.recommendation}</p>
      </div>
    </section>
  );
}
