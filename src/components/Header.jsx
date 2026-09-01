import React from 'react';
import { Clock, Sparkles } from 'lucide-react';

export default function Header({ 
  activePage, 
  onSelectPage, 
  currentTimeFormatted, 
  isLiveSimulatedTime,
  onResetToRealTime 
}) {
  const navItems = [
    { id: 'live', label: '⚡ Live Crowd' },
    { id: 'forecast', label: '🔮 Check Future Crowd' },
    { id: 'simulator', label: '🎛️ What-If Simulator' },
    { id: 'future', label: '🚀 Future Scope' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 space-y-3">
        {/* Top Row: Brand & Live Real-Time Clock */}
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-md shadow-amber-500/20 shrink-0">
              F
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
                  FLOWSAFE<span className="text-amber-400">.AI</span>
                </h1>
                <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase tracking-wider shrink-0 font-mono">
                  Ideathon 2K26
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-tight truncate max-w-[220px] sm:max-w-none">
                Predict. Prevent. Protect.
              </p>
            </div>
          </div>

          {/* Real-time Clock Badge */}
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs shrink-0 shadow-inner">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-slate-400 font-mono hidden xs:inline">LIVE:</span>
              <span className="font-extrabold text-amber-400 font-mono tracking-wide">{currentTimeFormatted}</span>
            </div>

            {isLiveSimulatedTime && (
              <button
                onClick={onResetToRealTime}
                className="text-[10px] text-amber-300 hover:text-amber-200 underline font-medium pl-2 border-l border-slate-800"
                title="Reset to your exact browser clock"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* 4 Clean Navigation Tabs with Beta01 Pill Style */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1 text-xs font-semibold">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectPage(item.id)}
                className={`px-4 py-2 rounded-xl transition-all shrink-0 flex items-center gap-1.5 border text-xs font-bold cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700/60'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
