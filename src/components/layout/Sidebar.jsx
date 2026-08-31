import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  LayoutDashboard, 
  MapPin, 
  TrendingUp, 
  Sparkles, 
  GitCompare, 
  Sliders, 
  ShieldAlert, 
  AlertOctagon, 
  BarChart3, 
  Layers, 
  Settings, 
  Radio,
  HelpCircle,
  Presentation
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { activePage, setActivePage, activeEnvironment, setIsEnvModalOpen, setIsPitchGuideOpen } = useAppState();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'live_venue', label: 'Live Venue', icon: MapPin, badge: 'LIVE' },
    { id: 'predictions', label: 'AI Predictions', icon: TrendingUp, badge: '87%' },
    { id: 'recommendations', label: 'Recommendations', icon: Sparkles, badge: 'Proactive' },
    { id: 'redistribution', label: 'Crowd Redistribution', icon: GitCompare, badge: 'Core' },
    { id: 'simulator', label: 'What-If Simulator', icon: Sliders, badge: 'Interactive' },
    { id: 'safety', label: 'Safety Intelligence', icon: ShieldAlert, badge: 'Privacy-1st' },
    { id: 'emergency', label: 'Emergency Mode', icon: AlertOctagon, badge: 'Drill' },
    { id: 'analytics', label: 'Venue Analytics', icon: BarChart3, badge: null },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-surface-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside className={`fixed lg:static top-0 left-0 bottom-0 w-64 bg-surface-950 border-r border-surface-800/80 flex flex-col z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Brand Header */}
        <div className="p-4 border-b border-surface-800/80 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 p-0.5 shadow-lg shadow-brand-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-surface-950 rounded-[10px] flex items-center justify-center text-brand-400">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-extrabold tracking-tight text-white font-mono">FLOWSAFE<span className="text-brand-400">.AI</span></h1>
              </div>
              <p className="text-[10px] text-surface-400 font-medium tracking-wide">Predict. Prevent. Protect.</p>
            </div>
          </div>

          {/* Ideathon Badge */}
          <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-surface-900 border border-surface-800 text-[10px]">
            <span className="text-surface-400 font-mono">TEAM: <strong className="text-brand-300">Synapse³</strong></span>
            <span className="px-1.5 py-0.2 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20 font-bold">IDEATHON 2K26</span>
          </div>
        </div>

        {/* 2-Min Pitch Guide Button */}
        <div className="px-3 pt-3">
          <button
            onClick={() => setIsPitchGuideOpen(true)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border border-indigo-500/30 hover:border-indigo-400/50 text-indigo-200 text-xs font-semibold shadow-lg shadow-indigo-500/5 transition-all group"
          >
            <div className="flex items-center gap-2">
              <Presentation className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span>2-Min Pitch Guide</span>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">START</span>
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-surface-400">Navigation</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  if (onClose) onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-brand-500/10 text-brand-300 font-bold border border-brand-500/30 shadow-sm'
                    : 'text-surface-300 hover:text-white hover:bg-surface-900/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-surface-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                    isActive 
                      ? 'bg-brand-500/20 text-brand-300' 
                      : 'bg-surface-800 text-surface-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Environment Pill & Settings */}
        <div className="p-3 border-t border-surface-800/80 space-y-2 bg-surface-950">
          <div 
            onClick={() => setIsEnvModalOpen(true)}
            className="p-2.5 rounded-xl bg-surface-900 border border-surface-800 hover:border-brand-500/40 cursor-pointer transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5 truncate">
              <span className="text-lg">{activeEnvironment.icon}</span>
              <div className="truncate">
                <p className="text-[10px] text-surface-400 font-medium uppercase tracking-wider">Active Venue</p>
                <p className="text-xs font-bold text-white truncate group-hover:text-brand-300 transition-colors">
                  {activeEnvironment.name}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-brand-400 underline">Change</span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-surface-400 px-2 py-1">
            <span className="font-mono">Engine: v2.4 (Simulated)</span>
            <span className="flex items-center gap-1 text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
