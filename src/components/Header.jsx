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
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-2.5 sm:py-3 space-y-2.5 sm:space-y-3">
        {/* Top Row: Brand & Live Real-Time Clock */}
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-base sm:text-lg shadow-sm shadow-blue-500/20 shrink-0">
              F
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-tight">
                  FLOWSAFE<span className="text-blue-600">.AI</span>
                </h1>
                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider shrink-0">
                  Ideathon 2K26
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-tight truncate max-w-[200px] sm:max-w-none">
                Predict. Prevent. Protect.
              </p>
            </div>
          </div>

          {/* Real-time Clock Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-50 border border-slate-200 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs shrink-0">
            <div className="flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-slate-800 font-mono hidden xs:inline">LIVE:</span>
              <span className="font-extrabold text-blue-600 font-mono">{currentTimeFormatted}</span>
            </div>

            {isLiveSimulatedTime && (
              <button
                onClick={onResetToRealTime}
                className="text-[9px] sm:text-[10px] text-slate-500 hover:text-blue-600 underline font-medium pl-1 border-l border-slate-300"
                title="Reset to your exact browser clock"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* 4 Clean Navigation Tabs with Smooth Mobile Touch Scroll */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1 text-xs font-semibold">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectPage(item.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all shrink-0 flex items-center gap-1 border text-xs ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
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
