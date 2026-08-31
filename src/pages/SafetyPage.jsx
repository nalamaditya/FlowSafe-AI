import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  EyeOff, 
  Lock, 
  Clock, 
  MapPin, 
  UserCheck, 
  HelpCircle,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';

export default function SafetyPage() {
  const { safetyState, handleSafetyAction, selectedGate } = useAppState();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-wide">
              Safety Intelligence & Voluntary Check-In
            </h1>
          </div>
          <p className="text-xs text-surface-400 mt-1">
            Voluntary, privacy-preserving attendee assistance triggered exclusively by environmental density thresholds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            Zero Continuous Tracking
          </span>
        </div>
      </div>

      {/* Primary Principle Card */}
      <div className="rounded-2xl border border-brand-500/20 bg-brand-950/20 p-5 backdrop-blur-md space-y-2">
        <div className="flex items-center gap-2 text-brand-300 font-bold text-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>Core Safety Principle</span>
        </div>
        <p className="text-xs md:text-sm text-surface-200 leading-relaxed">
          FlowSafe provides <strong>optional, user-controlled safety assistance</strong> based on aggregate crowd conditions and voluntary user input. It does not guess emotional state or perform non-consensual tracking.
        </p>
      </div>

      {/* Main Interactive Safety Check-In Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7 cols): High Density Zone Trigger Card */}
        <div className="lg:col-span-7 rounded-2xl border border-surface-800 bg-surface-900/90 p-5 md:p-6 shadow-2xl space-y-5">
          <div className="flex items-start justify-between pb-3 border-b border-surface-800">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                HIGH DENSITY ZONE TRIGGER
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                Gate B Perimeter (East Stand Access)
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">
              Density: 94%
            </span>
          </div>

          <div className="p-4 rounded-xl bg-surface-950 border border-surface-800 space-y-3">
            <p className="text-sm text-surface-200 leading-relaxed font-medium">
              “You’re entering a highly congested area. Would you like to enable a quick safety check-in?”
            </p>
            <p className="text-xs text-surface-400">
              This prompt appears on attendee mobile passes when aggregate optical sensors detect &gt;85% perimeter compaction.
            </p>
          </div>

          {/* Interactive Check-In Buttons */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleSafetyAction('ok')}
                className={`p-3.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95 ${
                  safetyState.status === 'ok'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                    : 'bg-surface-800 hover:bg-surface-700 text-emerald-400 border-surface-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>I'm Okay</span>
              </button>

              <button
                onClick={() => handleSafetyAction('assistance')}
                className={`p-3.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95 ${
                  safetyState.status === 'assistance_requested'
                    ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-500/20 animate-pulse'
                    : 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border-rose-500/40'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Need Assistance</span>
              </button>
            </div>

            {safetyState.status !== 'idle' && (
              <button
                onClick={() => handleSafetyAction('reset')}
                className="w-full text-center text-xs text-surface-500 hover:text-surface-300 transition-colors flex items-center justify-center gap-1 pt-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Check-In State</span>
              </button>
            )}
          </div>
        </div>

        {/* Right (5 cols): Live Dispatch & Status Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-surface-800 bg-surface-900/90 p-5 md:p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-surface-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Dispatch Telemetry Log
            </h3>
            <span className="text-[10px] font-mono text-surface-400">REAL-TIME DISPATCH</span>
          </div>

          {safetyState.status === 'assistance_requested' ? (
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                  Assistance Request Created
                </span>
                <span className="text-[10px] font-mono font-bold text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded">
                  {safetyState.ticketId}
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-mono pt-1">
                <div className="flex justify-between py-1 border-b border-rose-500/20">
                  <span className="text-surface-400">Location:</span>
                  <strong className="text-white">Gate B (East Stand)</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-rose-500/20">
                  <span className="text-surface-400">Time:</span>
                  <strong className="text-white">{safetyState.timestamp || '12:48 PM'}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-rose-500/20">
                  <span className="text-surface-400">Status:</span>
                  <strong className="text-rose-400">Assistance Requested</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-surface-400">Field Marshals:</span>
                  <strong className="text-emerald-400">2 Stewards Dispatched</strong>
                </div>
              </div>
            </div>
          ) : safetyState.status === 'ok' ? (
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2 text-xs animate-in fade-in duration-300">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Attendee Check-in Recorded Safe
              </span>
              <p className="text-surface-300 font-mono">
                Zone: Gate B | Status: Safe | Timestamp: {safetyState.timestamp}
              </p>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-surface-950 border border-surface-800 text-center space-y-2">
              <UserCheck className="w-8 h-8 mx-auto text-surface-600" />
              <p className="text-xs text-surface-400">
                Awaiting attendee action on density trigger prompt.
              </p>
              <span className="text-[10px] text-surface-500 font-mono">Click a response button to simulate</span>
            </div>
          )}

          {/* Privacy Note Box */}
          <div className="p-3.5 rounded-xl bg-surface-950/80 border border-surface-800 text-xs space-y-2">
            <span className="font-bold text-brand-300 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <EyeOff className="w-3.5 h-3.5 text-brand-400" />
              Privacy Assurance Policy
            </span>
            <p className="text-[11px] text-surface-400 leading-relaxed">
              FlowSafe does not continuously track individuals. Safety features are strictly voluntary and user-controlled. No biometric profiling or facial recognition cameras are employed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
