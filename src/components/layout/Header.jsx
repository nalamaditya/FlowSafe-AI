import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { DEMO_SCENARIOS } from '../../data/scenarios';
import { 
  Menu, 
  Bell, 
  Sparkles, 
  SlidersHorizontal, 
  Layers, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle,
  Presentation,
  Flame
} from 'lucide-react';

export default function Header({ onToggleSidebar }) {
  const { 
    activeEnvironment, 
    setIsEnvModalOpen, 
    activeScenarioId, 
    setActiveScenarioId,
    activeScenario,
    isAlertsOpen, 
    setIsAlertsOpen,
    setIsPitchGuideOpen
  } = useAppState();

  return (
    <header className="sticky top-0 z-30 h-16 bg-surface-950/85 backdrop-blur-md border-b border-surface-800/80 px-4 md:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Environment Chip */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg bg-surface-900 border border-surface-800 text-surface-300 lg:hidden hover:text-white"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Environment Switcher trigger */}
        <button
          onClick={() => setIsEnvModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-900 border border-surface-700/60 hover:border-brand-500/50 text-xs font-semibold text-white transition-all shadow-sm group"
        >
          <span className="text-base">{activeEnvironment.icon}</span>
          <span className="hidden sm:inline text-surface-400 font-normal">Environment:</span>
          <span className="group-hover:text-brand-300 transition-colors font-bold">{activeEnvironment.name}</span>
          <span className="text-[10px] bg-surface-800 px-1.5 py-0.5 rounded text-surface-400 font-mono">16 Venues</span>
        </button>
      </div>

      {/* Center / Right: Global Demo Scenario Selector & Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Scenario Selector */}
        <div className="flex items-center gap-2 bg-surface-900/90 border border-surface-800 rounded-xl px-2.5 py-1 text-xs">
          <span className="text-surface-400 text-[11px] font-medium hidden md:inline flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-brand-400" />
            Demo Scenario:
          </span>

          <select
            value={activeScenarioId}
            onChange={(e) => setActiveScenarioId(e.target.value)}
            className="bg-transparent text-xs font-semibold text-brand-300 focus:outline-none cursor-pointer pr-1"
          >
            {DEMO_SCENARIOS.map((scenario) => (
              <option key={scenario.id} value={scenario.id} className="bg-surface-900 text-white">
                {scenario.name}
              </option>
            ))}
          </select>

          {activeScenario.riskLevel === 'CRITICAL' && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          )}
        </div>

        {/* 2-Min Pitch Guide Button */}
        <button
          onClick={() => setIsPitchGuideOpen(true)}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold transition-all shadow-sm"
          title="Open 2-minute Presentation Walkthrough"
        >
          <Presentation className="w-3.5 h-3.5" />
          <span>Pitch Guide</span>
        </button>

        {/* Notifications Bell */}
        <button
          onClick={() => setIsAlertsOpen(true)}
          className="relative p-2 rounded-xl bg-surface-900 border border-surface-800 text-surface-300 hover:text-white hover:border-surface-700 transition-colors"
          aria-label="View Proactive Alerts"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-bold text-white flex items-center justify-center animate-pulse">
            3
          </span>
        </button>

        {/* Admin / Live indicator */}
        <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-surface-800 text-xs">
          <div className="w-7 h-7 rounded-lg bg-surface-800 border border-surface-700 flex items-center justify-center font-mono font-bold text-[10px] text-brand-400">
            AI
          </div>
          <div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-surface-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>CrowdOps Pro</span>
            </div>
            <span className="text-[9px] text-surface-400 font-mono">Telemetry Syncing</span>
          </div>
        </div>
      </div>
    </header>
  );
}
