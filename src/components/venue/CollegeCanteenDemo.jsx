import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  RefreshCw, 
  TrendingDown, 
  Utensils, 
  Coffee, 
  Check,
  HeartHandshake,
  EyeOff,
  UserCheck,
  Info
} from 'lucide-react';

export default function CollegeCanteenDemo() {
  // Time slider / preset: '11:30' | '12:45' | '13:15'
  const [selectedTime, setSelectedTime] = useState('12:45');
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [safetyStatus, setSafetyStatus] = useState('idle'); // 'idle' | 'ok' | 'assisted'
  const [assistedTime, setAssistedTime] = useState('');

  // Time state values
  const timeStates = {
    '11:30': {
      label: '11:30 AM',
      density: 'Low 🟢',
      densityLevel: 'low',
      crowdCount: '180 / 1,500',
      occupancyPct: 12,
      waitMin: 3,
      counter1: { name: 'Counter 1 (Main Meals)', wait: '3 min', status: 'Free 🟢', pct: 15 },
      counter2: { name: 'Counter 2 (Snacks & Juices)', wait: '2 min', status: 'Free 🟢', pct: 10 },
      counter3: { name: 'Counter 3 (Quick Grab & Go)', wait: '1 min', status: 'Free 🟢', pct: 8 },
      aiPrediction: 'Crowd will remain low for the next 45 minutes. Great time for early lunch!',
      bestTime: 'Right Now (11:30 AM)',
      alternative: 'All 3 counters are clear with under 3 min wait.',
      showSafetyPrompt: false,
    },
    '12:45': {
      label: '12:45 PM (Peak Rush)',
      density: 'High 🔴',
      densityLevel: 'critical',
      crowdCount: '1,420 / 1,500',
      occupancyPct: 95,
      waitMin: 20,
      counter1: { name: 'Counter 1 (Main Meals)', wait: '20 min', status: 'Choked 🔴', pct: 95 },
      counter2: { name: 'Counter 2 (Snacks & Juices)', wait: '16 min', status: 'Choked 🔴', pct: 90 },
      counter3: { name: 'Counter 3 (Quick Grab & Go)', wait: '4 min', status: 'Fast 🟢', pct: 35 },
      aiPrediction: 'Crowd levels are expected to decrease in approximately 30 minutes. Consider visiting after 1:15 PM.',
      bestTime: 'Visit after 1:15 PM or 2:00 PM',
      alternative: 'Use Counter 3 (Quick Grab - 4m wait) or South Food Court 2 (3m wait).',
      showSafetyPrompt: true,
    },
    '13:15': {
      label: '1:15 PM (Post-Surge Relief)',
      density: 'Moderate 🟢',
      densityLevel: 'low',
      crowdCount: '620 / 1,500',
      occupancyPct: 41,
      waitMin: 4,
      counter1: { name: 'Counter 1 (Main Meals)', wait: '5 min', status: 'Free 🟢', pct: 38 },
      counter2: { name: 'Counter 2 (Snacks & Juices)', wait: '4 min', status: 'Free 🟢', pct: 30 },
      counter3: { name: 'Counter 3 (Quick Grab & Go)', wait: '2 min', status: 'Free 🟢', pct: 20 },
      aiPrediction: 'Crowd has cleared significantly. Normal dining seating is now widely available.',
      bestTime: 'Right Now (1:15 PM - Optimal)',
      alternative: 'Main Meals counter has dropped from 20m down to 5m wait.',
      showSafetyPrompt: false,
    }
  };

  const currentData = timeStates[selectedTime];

  const handleSafetyChoice = (choice) => {
    if (choice === 'ok') {
      setSafetyStatus('ok');
    } else if (choice === 'help') {
      setSafetyStatus('assisted');
      setAssistedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
    setIsSafetyModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Primary Ideathon Demo Scenario Banner */}
      <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍔</span>
              <h2 className="text-lg font-extrabold text-slate-900">
                Primary Demo Scenario: College Canteen Flow
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Demonstrating the exact Ideathon flow: <strong>11:30 AM (Low) ➔ 12:45 PM (High Peak) ➔ 1:15 PM (AI Guided Relief)</strong>.
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 self-start sm:self-auto">
            Ideathon 2K26 Demo
          </span>
        </div>

        {/* 1-Click Interactive Timeline Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
          <button
            onClick={() => setSelectedTime('11:30')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedTime === '11:30'
                ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400/30 shadow-sm'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">🕙 11:30 AM</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                🟢 Low Crowd
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Estimated wait: <strong>3 minutes</strong>
            </p>
          </button>

          <button
            onClick={() => setSelectedTime('12:45')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedTime === '12:45'
                ? 'bg-red-50 border-red-500 ring-2 ring-red-400/30 shadow-sm'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">🕛 12:45 PM</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 animate-pulse">
                🔴 High Crowd (Peak)
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Estimated wait: <strong className="text-red-600">20 minutes</strong>
            </p>
          </button>

          <button
            onClick={() => setSelectedTime('13:15')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedTime === '13:15'
                ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-400/30 shadow-sm'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">🕐 1:15 PM</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                🟢 Post-Surge Relief
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              FlowSafe predicted wait: <strong>4 minutes</strong>
            </p>
          </button>
        </div>
      </div>

      {/* AI Prediction & Best Time Recommendation Highlight */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600">
              🤖 FLOWSAFE AI PREDICTIVE GUIDANCE
            </span>
            <h3 className="text-base font-extrabold text-slate-900 leading-snug">
              “{currentData.aiPrediction}”
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              3️⃣ Best-Time Recommendation
            </span>
            <p className="text-sm font-bold text-slate-900 font-mono">{currentData.bestTime}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
              4️⃣ Alternative Suggestions
            </span>
            <p className="text-xs text-slate-700 font-medium">{currentData.alternative}</p>
          </div>
        </div>
      </div>

      {/* 2D Canteen Layout & Counter Wait Times */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">
            Canteen Service Counters: Live Queue & Density
          </h3>
          <span className="text-xs font-mono text-slate-500">
            Occupancy: <strong>{currentData.occupancyPct}%</strong> ({currentData.crowdCount})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Counter 1 */}
          <div className={`p-4 rounded-xl border space-y-2 ${
            currentData.counter1.pct >= 80 ? 'bg-red-50/50 border-red-300 ring-2 ring-red-400/20' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">{currentData.counter1.name}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                currentData.counter1.pct >= 80 ? 'bg-red-100 text-red-800 border-red-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}>
                {currentData.counter1.status}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 font-mono pt-1">
              <span>Queue Wait:</span>
              <strong className={currentData.counter1.pct >= 80 ? 'text-red-600 font-bold' : 'text-slate-900'}>
                {currentData.counter1.wait}
              </strong>
            </div>
          </div>

          {/* Counter 2 */}
          <div className={`p-4 rounded-xl border space-y-2 ${
            currentData.counter2.pct >= 80 ? 'bg-red-50/50 border-red-300 ring-2 ring-red-400/20' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">{currentData.counter2.name}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                currentData.counter2.pct >= 80 ? 'bg-red-100 text-red-800 border-red-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}>
                {currentData.counter2.status}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 font-mono pt-1">
              <span>Queue Wait:</span>
              <strong className={currentData.counter2.pct >= 80 ? 'text-red-600 font-bold' : 'text-slate-900'}>
                {currentData.counter2.wait}
              </strong>
            </div>
          </div>

          {/* Counter 3 (Quick Grab Alternative) */}
          <div className="p-4 rounded-xl border bg-emerald-50/40 border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">{currentData.counter3.name}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                {currentData.counter3.status}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 font-mono pt-1">
              <span>Queue Wait:</span>
              <strong className="text-emerald-700 font-bold">
                {currentData.counter3.wait}
              </strong>
            </div>
            {selectedTime === '12:45' && (
              <span className="text-[10px] text-emerald-700 font-bold block pt-1">
                ★ Recommended Fast Alternative!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 5️⃣ & 6️⃣ Safety Check-In & Privacy-First Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Feature 5: Safety Check-in Interactive Sandbox */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              5️⃣ Voluntary Safety Check-In
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
              User-Controlled
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            When high density or unusual conditions are detected (like 12:45 PM rush), FlowSafe triggers a quick, voluntary safety prompt on the student’s mobile pass:
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <p className="text-xs font-bold text-slate-900">“Are you okay?”</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleSafetyChoice('ok')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  safetyStatus === 'ok'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white hover:bg-emerald-50 text-emerald-700 border border-slate-200'
                }`}
              >
                ✓ I'm Okay
              </button>

              <button
                onClick={() => handleSafetyChoice('help')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  safetyStatus === 'assisted'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-white hover:bg-red-50 text-red-600 border border-slate-200'
                }`}
              >
                ⚠️ Need Assistance
              </button>
            </div>
          </div>

          {safetyStatus === 'assisted' && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 space-y-1 animate-in fade-in">
              <p className="font-bold">✓ Assistance Request Sent to Campus Desk</p>
              <p className="text-[11px] text-red-600">Location: Main Canteen • Time: {assistedTime} • Campus marshals notified.</p>
            </div>
          )}

          {safetyStatus === 'ok' && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-semibold animate-in fade-in">
              ✓ Check-in recorded: You're safe!
            </div>
          )}
        </div>

        {/* Feature 6: Privacy-First Design */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <span className="text-xs font-bold text-slate-900 uppercase flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-600" />
            6️⃣ Privacy-First Guarantee
          </span>

          <p className="text-xs text-slate-600 leading-relaxed">
            FlowSafe AI is built with zero intrusive surveillance:
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-slate-700 font-medium"><strong>No Unnecessary Personal Tracking</strong> — Users are not continuously GPS tracked.</span>
            </div>

            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-slate-700 font-medium"><strong>Aggregated Density Only</strong> — Calculations use anonymous headcounts.</span>
            </div>

            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-slate-700 font-medium"><strong>User-Controlled Safety</strong> — Safety signals are 100% voluntary and opt-in.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
