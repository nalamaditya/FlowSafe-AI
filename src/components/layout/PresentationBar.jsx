import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Sliders,
  Play,
  RotateCcw
} from 'lucide-react';

export default function PresentationBar() {
  const { 
    activePage, 
    setActivePage, 
    setSelectedGateId, 
    triggerPrediction, 
    activeScenarioId, 
    setActiveScenarioId,
    setIsEnvModalOpen 
  } = useAppState();

  const demoSteps = [
    {
      id: 'step1',
      title: '1. The Problem',
      subtitle: 'Gate B is choking (84%)',
      icon: AlertTriangle,
      color: 'text-rose-400 border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20',
      activeColor: 'bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/30',
      action: () => {
        setActivePage('live_venue');
        setSelectedGateId('gate_b');
        setActiveScenarioId('major_event');
      }
    },
    {
      id: 'step2',
      title: '2. AI Prediction',
      subtitle: '96% danger in 12 min',
      icon: Sparkles,
      color: 'text-amber-400 border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20',
      activeColor: 'bg-amber-500 text-surface-950 font-bold shadow-lg shadow-amber-500/30',
      action: () => {
        triggerPrediction();
        setSelectedGateId('gate_b');
        setActivePage('predictions');
      }
    },
    {
      id: 'step3',
      title: '3. Smart Redistribution',
      subtitle: 'Reroute crowd to Gate C',
      icon: ArrowRight,
      color: 'text-brand-300 border-brand-500/40 bg-brand-500/10 hover:bg-brand-500/20',
      activeColor: 'bg-brand-500 text-surface-950 font-bold shadow-lg shadow-brand-500/30',
      action: () => {
        setActivePage('redistribution');
      }
    },
    {
      id: 'step4',
      title: '4. What-If Sandbox',
      subtitle: 'Add +800 visitors live',
      icon: Sliders,
      color: 'text-indigo-300 border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20',
      activeColor: 'bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/30',
      action: () => {
        setActivePage('simulator');
      }
    },
    {
      id: 'step5',
      title: '5. Works Anywhere',
      subtitle: '16 High-Footfall Venues',
      icon: Layers,
      color: 'text-teal-300 border-teal-500/40 bg-teal-500/10 hover:bg-teal-500/20',
      activeColor: 'bg-teal-500 text-surface-950 font-bold shadow-lg shadow-teal-500/30',
      action: () => {
        setIsEnvModalOpen(true);
      }
    }
  ];

  return (
    <div className="w-full rounded-2xl bg-surface-900 border border-brand-500/30 p-3 shadow-xl mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-2 mb-2 border-b border-surface-800">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-brand-500/20 text-brand-400 font-bold text-[10px] font-mono">
            JUDGE DEMO BAR
          </span>
          <span className="text-xs font-bold text-white">Click any step to demonstrate FlowSafe in 60 seconds:</span>
        </div>

        <span className="text-[11px] text-surface-400 font-mono hidden sm:inline">
          Team Synapse³ • Ideathon 2K26
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {demoSteps.map((step) => {
          const Icon = step.icon;
          return (
            <button
              key={step.id}
              onClick={step.action}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group active:scale-95 ${step.color}`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold font-mono tracking-tight">{step.title}</span>
                <Icon className="w-3.5 h-3.5 shrink-0 opacity-80 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[10px] text-surface-300 opacity-90 mt-1 block truncate">
                {step.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
