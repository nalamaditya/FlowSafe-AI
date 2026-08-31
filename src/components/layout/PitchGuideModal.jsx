import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  X, 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Play,
  Volume2
} from 'lucide-react';

export default function PitchGuideModal() {
  const { 
    isPitchGuideOpen, 
    setIsPitchGuideOpen, 
    pitchStep, 
    setPitchStep, 
    setActivePage, 
    setActiveEnvId, 
    setSelectedGateId, 
    triggerPrediction,
    setIsEnvModalOpen
  } = useAppState();

  if (!isPitchGuideOpen) return null;

  const steps = [
    {
      step: 1,
      title: "Introduction & Value Proposition",
      time: "0:00 - 0:15",
      page: "overview",
      action: () => {
        setActivePage('overview');
        setActiveEnvId('stadium');
      },
      script: '“Judges, FlowSafe AI is a predictive crowd intelligence platform for high-footfall environments. Unlike traditional systems that merely detect stampedes after they happen, FlowSafe predicts congestion 15 to 30 minutes in advance to prevent choke points entirely.”'
    },
    {
      step: 2,
      title: "Select Demo Environment: Stadium",
      time: "0:15 - 0:25",
      page: "live_venue",
      action: () => {
        setActiveEnvId('stadium');
        setActivePage('live_venue');
        setSelectedGateId('gate_b');
      },
      script: '“To demonstrate the intelligence engine, we are looking at our primary demo scenario: a 16,000 capacity stadium configured with four perimeter access gates.”'
    },
    {
      step: 3,
      title: "Perimeter Telemetry & Gate B Inflow",
      time: "0:25 - 0:40",
      page: "live_venue",
      action: () => {
        setActivePage('live_venue');
        setSelectedGateId('gate_b');
      },
      script: '“Looking at our live telemetry, Gates A and C are at low occupancy (~30%), but Gate B at the East Entrance is already approaching 84% capacity with a 14-minute queue.”'
    },
    {
      step: 4,
      title: "Run Deterministic AI Prediction Engine",
      time: "0:40 - 0:55",
      page: "predictions",
      action: () => {
        triggerPrediction();
        setSelectedGateId('gate_b');
        setActivePage('predictions');
      },
      script: '“When we run our prediction engine, FlowSafe projects that in just 12 to 15 minutes, Gate B will cross 96% critical saturation with a dangerous 25-minute bottleneck.”'
    },
    {
      step: 5,
      title: "Explainable AI (Causal Factors)",
      time: "0:55 - 1:10",
      page: "predictions",
      action: () => {
        setActivePage('predictions');
      },
      script: '“Why is this happening? FlowSafe decomposes the causal drivers: the event starts in 20 minutes, historical patterns show a +32% arrival spike, and the East parking deck is overflowing.”'
    },
    {
      step: 6,
      title: "Smart Proactive Recommendations",
      time: "1:10 - 1:25",
      page: "recommendations",
      action: () => {
        setActivePage('recommendations');
      },
      script: '“FlowSafe does not just sound an alarm—it generates proactive recommendations. It immediately identifies Gate C with 74% unused headroom and directs incoming traffic redirection.”'
    },
    {
      step: 7,
      title: "Crowd Redistribution (Core Innovation)",
      time: "1:25 - 1:40",
      page: "redistribution",
      action: () => {
        setActivePage('redistribution');
      },
      script: '“Here is the core difference: Without FlowSafe, Gate B hits 96% critical choke with a 24-minute wait. With FlowSafe proactive redistribution, risk drops to 71% and average wait plummets to 11 minutes.”'
    },
    {
      step: 8,
      title: "What-If Simulation Sandbox",
      time: "1:40 - 1:50",
      page: "simulator",
      action: () => {
        setActivePage('simulator');
      },
      script: '“Operators can simulate dynamic scenarios in our What-If sandbox—such as injecting +800 unexpected visitors or closing a damaged gate—and see FlowSafe automatically rebalance the flow.”'
    },
    {
      step: 9,
      title: "Privacy-First Safety Assistance",
      time: "1:50 - 1:55",
      page: "safety",
      action: () => {
        setActivePage('safety');
      },
      script: '“We also provide voluntary, privacy-conscious safety check-ins and emergency routing without any intrusive facial recognition or individual tracking.”'
    },
    {
      step: 10,
      title: "Platform Generalization & Conclusion",
      time: "1:55 - 2:00",
      page: "overview",
      action: () => {
        setActivePage('overview');
        setIsEnvModalOpen(true);
      },
      script: '“The same unified engine powers airports, railway stations, hospitals, metro hubs, festivals, and campuses. FlowSafe AI: Predict. Prevent. Protect. Thank you!”'
    }
  ];

  const current = steps[pitchStep] || steps[0];

  const handleNext = () => {
    if (pitchStep < steps.length - 1) {
      const nextIdx = pitchStep + 1;
      setPitchStep(nextIdx);
      steps[nextIdx].action();
    }
  };

  const handlePrev = () => {
    if (pitchStep > 0) {
      const prevIdx = pitchStep - 1;
      setPitchStep(prevIdx);
      steps[prevIdx].action();
    }
  };

  const handleJump = (idx) => {
    setPitchStep(idx);
    steps[idx].action();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-surface-900 border border-indigo-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-indigo-950/80 to-surface-900 border-b border-indigo-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-wide">2-Minute Ideathon Pitch Assistant</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                  Step {pitchStep + 1} of 10
                </span>
              </div>
              <p className="text-[11px] text-indigo-200/80">Synchronized presenter script and live UI steering</p>
            </div>
          </div>

          <button
            onClick={() => setIsPitchGuideOpen(false)}
            className="p-1.5 rounded-lg bg-surface-800 hover:bg-surface-700 text-surface-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="px-5 pt-3 flex items-center gap-1">
          {steps.map((s, idx) => (
            <div
              key={s.step}
              onClick={() => handleJump(idx)}
              className={`h-1.5 flex-1 rounded-full cursor-pointer transition-all ${
                idx === pitchStep
                  ? 'bg-indigo-400 ring-2 ring-indigo-400/30'
                  : idx < pitchStep
                  ? 'bg-brand-500'
                  : 'bg-surface-800'
              }`}
              title={`Step ${s.step}: ${s.title}`}
            />
          ))}
        </div>

        {/* Current Step Content */}
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider font-mono">
              STEP {current.step} — {current.title}
            </span>
            <span className="text-[11px] font-mono text-surface-400 bg-surface-800 px-2 py-0.5 rounded">
              ⏱ {current.time}
            </span>
          </div>

          {/* Script Box */}
          <div className="p-4 rounded-xl bg-surface-950 border border-indigo-500/30 space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
              <Volume2 className="w-4 h-4 text-indigo-400" />
              <span>What to Say to the Judges:</span>
            </div>
            <p className="text-sm text-surface-100 leading-relaxed font-sans italic">
              {current.script}
            </p>
          </div>

          {/* Jump / Execute action trigger */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-850 border border-surface-700/60 text-xs">
            <div className="flex items-center gap-2 text-surface-300">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Target View: <strong className="text-white font-mono">{current.page.toUpperCase()}</strong></span>
            </div>
            <button
              onClick={() => current.action()}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 border border-brand-500/30 font-semibold transition-all"
            >
              <Play className="w-3 h-3 fill-brand-300" />
              <span>Sync UI View</span>
            </button>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="p-4 bg-surface-950 border-t border-surface-800 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={pitchStep === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-800 hover:bg-surface-700 text-xs font-semibold text-surface-300 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <span className="text-xs text-surface-400 font-mono">
            {pitchStep + 1} / {steps.length}
          </span>

          {pitchStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition-all"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsPitchGuideOpen(false)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Finish Pitch Demo</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
