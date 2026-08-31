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
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 space-y-3">
        {/* Top Row: Brand & Live Real-Time Clock */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-blue-500/20">
              F
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-slate-900">
                  FLOWSAFE<span className="text-blue-600">.AI</span>
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                  Ideathon 2K26
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium tracking-tight">
                Predict. Prevent. Protect. • Context-Aware Crowd Intelligence
              </p>
            </div>
          </div>

          {/* Real-time Clock Badge */}
          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl text-xs self-start sm:self-auto">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-slate-900 font-mono">LIVE NOW:</span>
              <span className="font-extrabold text-blue-600 font-mono">{currentTimeFormatted}</span>
            </div>

            {isLiveSimulatedTime && (
              <button
                onClick={onResetToRealTime}
                className="text-[10px] text-slate-500 hover:text-blue-600 underline font-medium pl-1 border-l border-slate-300"
                title="Reset to your exact browser clock"
              >
                Reset Clock
              </button>
            )}
          </div>
        </div>

        {/* 4 Clean Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectPage(item.id)}
                className={`px-4 py-2 rounded-xl transition-all shrink-0 flex items-center gap-1.5 border ${
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
