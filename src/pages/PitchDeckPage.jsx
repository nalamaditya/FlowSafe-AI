import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Maximize2, 
  Printer, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Sliders, 
  Cpu, 
  Users, 
  Building, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  Play
} from 'lucide-react';

export default function PitchDeckPage({ onBackToLive }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // SLIDE 1: Title
    {
      id: 1,
      badge: 'IDEATHON 2K26 PITCH DECK',
      title: 'FLOWSAFE AI',
      subtitle: 'Predict. Prevent. Protect.',
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-6 sm:py-10">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-4xl sm:text-5xl shadow-xl shadow-blue-500/20">
            F
          </div>

          <div className="space-y-2 max-w-2xl">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              FLOWSAFE<span className="text-blue-600">.AI</span>
            </h1>
            <p className="text-lg sm:text-2xl font-extrabold text-blue-600 tracking-tight">
              “Predict. Prevent. Protect.”
            </p>
            <p className="text-xs sm:text-sm text-slate-500 font-medium pt-2">
              Context-Aware AI Platform for Pre-Congestion Prediction & Proactive Crowd Safety
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 max-w-md w-full text-center space-y-1">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">TEAM</div>
            <div className="text-base font-black text-slate-900">Synapse³</div>
            <div className="text-[11px] text-slate-500 font-medium italic">“Three Minds. One Intelligent Future.”</div>
          </div>
        </div>
      )
    },

    // SLIDE 2: The Problem
    {
      id: 2,
      badge: 'THE CHALLENGE',
      title: 'The Hidden Danger of Crowd Congestion',
      subtitle: 'Why existing systems fail to keep people moving safely',
      content: (
        <div className="space-y-6 py-2">
          <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200 text-red-950 space-y-1 text-center">
            <span className="font-extrabold text-xs uppercase tracking-wider text-red-700 font-mono">CORE DILEMMA</span>
            <p className="text-base sm:text-lg font-bold">
              “Most safety solutions react AFTER overcrowding has already occurred.”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-2xl">📹</div>
              <h3 className="text-sm font-bold text-slate-900">1. Blind Reactive Monitoring</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard cameras and turnstiles only tell managers when a chokepoint is already jammed, leaving zero window for prevention.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-2xl">⏳</div>
              <h3 className="text-sm font-bold text-slate-900">2. Massive Productive Time Loss</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Students and visitors waste 20–30 minutes waiting in canteen, elevator, and gate queues simply because they lack forward visibility.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-2xl">⚠️</div>
              <h3 className="text-sm font-bold text-slate-900">3. Sudden Surge Vulnerability</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sudden rain, lecture dismissals, or gate closures create instantaneous surges that trigger dangerous stampede risks.
              </p>
            </div>
          </div>
        </div>
      )
    },

    // SLIDE 3: The Solution
    {
      id: 3,
      badge: 'OUR SOLUTION',
      title: 'FlowSafe AI: Pre-Congestion Intelligence',
      subtitle: 'From reactive response to proactive prevention',
      content: (
        <div className="space-y-6 py-2">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md text-center space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-200">CORE PRINCIPLE</span>
            <h3 className="text-xl sm:text-2xl font-extrabold">
              “Don’t wait until a place becomes crowded. Know before you go.”
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border-2 border-blue-200 space-y-2 shadow-xs">
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">1. LIVE STATUS</span>
              <h4 className="text-sm font-bold text-slate-900">What is happening now?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Real-time browser time synchronization with lookahead trend slope (↗ / ↘ / →) and actionable visit guidance.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border-2 border-indigo-200 space-y-2 shadow-xs">
              <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">2. FUTURE FORECAST</span>
              <h4 className="text-sm font-bold text-slate-900">What will happen at time T?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Historical baseline modeling projecting expected crowd, occupancy percentage, and exact queue wait times.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border-2 border-emerald-200 space-y-2 shadow-xs">
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">3. ACTION INTELLIGENCE</span>
              <h4 className="text-sm font-bold text-slate-900">What should we do?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated 4-pillar action plan: Best arrival slots, low-crowd alternative zones, and physical venue operator directives.
              </p>
            </div>
          </div>
        </div>
      )
    },

    // SLIDE 4: Live Decision Engine
    {
      id: 4,
      badge: 'LIVE ENGINE',
      title: '“Can I Go Now, or Should I Wait?”',
      subtitle: 'Deterministic 4-State Live Recommendation Matrix',
      content: (
        <div className="space-y-4 py-2">
          <p className="text-xs text-slate-600 font-medium">
            FlowSafe continuously calculates look-ahead slope over the upcoming 10m–30m window to classify each zone:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-xl border border-emerald-300 bg-emerald-50/50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-emerald-900">✅ Good to go now</span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">&lt; 45% Occupancy</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Low crowd density and immediate service throughput. No queue delay expected.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-amber-300 bg-amber-50/50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-amber-900">⏳ Better in ~10 minutes</span>
                <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Decreasing ↘</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Crowd is clearing out rapidly. Waiting 10 minutes cuts queue delay by up to 60%.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-red-300 bg-red-50/50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-red-900">🚫 Don’t go now</span>
                <span className="text-[10px] font-mono font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">Increasing ↗ (≥65%)</span>
              </div>
              <p className="text-xs text-red-800 leading-relaxed">
                High queue bottleneck building up. Dynamic best time slot and alternative routing provided.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-300 bg-slate-50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900">🟡 Acceptable now</span>
                <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-full">45% – 65% Stable →</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Moderate steady crowd. Visiting is viable with standard processing latency.
              </p>
            </div>
          </div>
        </div>
      )
    },

    // SLIDE 5: 4-Pillar Action Plan
    {
      id: 5,
      badge: 'ACTION INTELLIGENCE',
      title: 'The 4-Pillar Action Plan',
      subtitle: 'Turning predictive insights into measurable crowd relief',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase">
              <Clock className="w-4 h-4" />
              <span>1. Optimal Visiting Windows</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Finds primary and secondary low-tide windows strictly within the venue’s operating hours (e.g. 10:30 AM & 2:15 PM for College).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase">
              <Navigation className="w-4 h-4" />
              <span>2. Uncrowded Alternative Zones</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instantly surfaces nearby uncrowded zones (e.g. Library Annex or Sports Ground) with live available headroom.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase">
              <Users className="w-4 h-4" />
              <span>3. Visitor / Student Action Guide</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Actionable advice: Mobile meal pre-ordering, secondary stairwell transit, and staggered interval arrivals.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase">
              <Building className="w-4 h-4" />
              <span>4. Venue Management Directives</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Operational directives: Auxiliary counter openings, digital signage alerts, and security marshal deployments.
            </p>
          </div>
        </div>
      )
    },

    // SLIDE 6: What-If Simulator
    {
      id: 6,
      badge: 'RESILIENCE TESTING',
      title: '“What-If?” Scenario Stress Laboratory',
      subtitle: 'Proactive capacity simulation before real-world events unfold',
      content: (
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 block uppercase">1. Baseline State</span>
              <span className="text-base font-black text-slate-900 font-mono">140 / 300 (47%)</span>
              <span className="text-[10px] text-emerald-600 font-bold block">4 min wait • Stable</span>
            </div>

            <div className="p-3.5 rounded-xl border border-red-300 bg-red-50/50 space-y-1">
              <span className="text-[11px] font-bold text-red-700 block uppercase">2. Unmanaged Surge (+125)</span>
              <span className="text-base font-black text-red-700 font-mono">265 / 300 (88%)</span>
              <span className="text-[10px] text-red-600 font-bold block">24 min wait • CRITICAL</span>
            </div>

            <div className="p-3.5 rounded-xl border-2 border-emerald-400 bg-emerald-50/50 space-y-1">
              <span className="text-[11px] font-bold text-emerald-800 block uppercase">3. With FlowSafe AI</span>
              <span className="text-base font-black text-emerald-800 font-mono">185 / 300 (62%)</span>
              <span className="text-[10px] text-emerald-700 font-bold block">6 min wait • -75% REDUCTION</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 text-xs text-purple-950 space-y-1">
            <span className="font-bold uppercase tracking-wider text-purple-700 text-[10px] block font-mono">PROACTIVE BALANCING FORMULA</span>
            <p className="leading-relaxed font-medium">
              FlowSafe computes exact diversion quotas (e.g. 45% offload to low-density zones) to prevent the bottleneck from ever materializing.
            </p>
          </div>
        </div>
      )
    },

    // SLIDE 7: Privacy-First Architecture
    {
      id: 7,
      badge: 'ARCHITECTURE',
      title: 'Hardware-Agnostic & Privacy-First Tech',
      subtitle: 'Zero facial recognition. Zero PII storage. 100% compliant.',
      content: (
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 text-center">
              <div className="text-2xl">📹</div>
              <h4 className="text-xs font-bold text-slate-900">CCTV Edge AI</h4>
              <p className="text-[10px] text-slate-500">Lightweight anonymous bounding box counts.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 text-center">
              <div className="text-2xl">📶</div>
              <h4 className="text-xs font-bold text-slate-900">WiFi / BLE Probes</h4>
              <p className="text-[10px] text-slate-500">Macro density without tracking device IDs.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 text-center">
              <div className="text-2xl">🎟️</div>
              <h4 className="text-xs font-bold text-slate-900">Turnstile APIs</h4>
              <p className="text-[10px] text-slate-500">Live throughput calibration per gate.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 text-center">
              <div className="text-2xl">📱</div>
              <h4 className="text-xs font-bold text-slate-900">Context Signals</h4>
              <p className="text-[10px] text-slate-500">Voluntary schedule & timetable sync.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 flex items-center gap-3 text-xs text-blue-900 font-medium">
            <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
            <span>
              <strong>Edge Computing Design:</strong> All video frames are processed locally in RAM and discarded instantly. Only aggregated numeric counts are fed into the prediction model.
            </span>
          </div>
        </div>
      )
    },

    // SLIDE 8: Scalability
    {
      id: 8,
      badge: 'MARKET EXPANSION',
      title: 'Scalability Across 16 High-Footfall Domains',
      subtitle: 'One core prediction engine adapting to any venue topology',
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-2 text-xs">
          {[
            { icon: '🏫', name: 'Colleges & Universities', tag: 'Canteen, Labs, Gates' },
            { icon: '🏟️', name: 'Stadiums & Arenas', tag: 'Turnstiles & Concourse' },
            { icon: '🏥', name: 'Hospitals & Medical', tag: 'OPD & Pharmacy' },
            { icon: '🎬', name: 'Theatres & Cinemas', tag: 'Foyer & Concessions' },
            { icon: '🛍️', name: 'Malls & Retail', tag: 'Food Courts & Parking' },
            { icon: '✈️', name: 'Airports & Terminals', tag: 'Security & Baggage' },
            { icon: '🚇', name: 'Metro & Railways', tag: 'Platforms & Escalators' },
            { icon: '🎪', name: 'Festivals & Temples', tag: 'Stampede Prevention' },
          ].map((v, i) => (
            <div key={i} className="p-3 rounded-xl border border-slate-200 bg-white space-y-1 hover:border-blue-300 transition-colors">
              <div className="text-xl">{v.icon}</div>
              <h5 className="font-bold text-slate-900 text-xs leading-snug">{v.name}</h5>
              <p className="text-[10px] text-slate-500 font-mono">{v.tag}</p>
            </div>
          ))}
        </div>
      )
    },

    // SLIDE 9: Business Impact & Metrics
    {
      id: 9,
      badge: 'MEASURABLE IMPACT',
      title: 'Quantified Real-World Value',
      subtitle: 'Why FlowSafe AI is a game-changer for venues and people',
      content: (
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono">-75%</span>
              <h4 className="text-xs font-bold text-slate-900 uppercase">Wait Time Reduction</h4>
              <p className="text-[11px] text-slate-600">Smoother customer flow and zero peak queue frustration.</p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-blue-700 font-mono">100%</span>
              <h4 className="text-xs font-bold text-slate-900 uppercase">Pre-Congestion Notice</h4>
              <p className="text-[11px] text-slate-600">15–30 minute early warning window before crowds form.</p>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-indigo-700 font-mono">Zero</span>
              <h4 className="text-xs font-bold text-slate-900 uppercase">Hardware Replacement</h4>
              <p className="text-[11px] text-slate-600">Plugs directly into existing infrastructure.</p>
            </div>
          </div>
        </div>
      )
    },

    // SLIDE 10: Conclusion
    {
      id: 10,
      badge: 'THE FUTURE',
      title: 'FlowSafe AI: The Intelligent Future of Crowd Flow',
      subtitle: 'Thank you! We are ready for questions.',
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-6 sm:py-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-3xl sm:text-4xl shadow-lg">
            F
          </div>

          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              FlowSafe AI
            </h2>
            <p className="text-base sm:text-lg font-bold text-blue-600">
              “Predict. Prevent. Protect.”
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium pt-2">
              Transforming how millions navigate high-density environments safely, smartly, and smoothly.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-mono text-xs font-bold border border-slate-200">
              Team: Synapse³
            </div>
            <div className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 font-mono text-xs font-bold border border-blue-200">
              Ideathon 2K26 Finalist
            </div>
          </div>
        </div>
      )
    }
  ];

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Presentation Top Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToLive}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-xs font-bold flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit Presentation</span>
          </button>

          <span className="text-xs font-mono font-bold text-slate-500">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>

        {/* Slide navigation buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            disabled={currentSlide === 0}
            onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 text-xs font-bold text-slate-700 transition-all flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <button
            disabled={currentSlide === slides.length - 1}
            onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
            className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-xs font-bold text-white shadow-sm transition-all flex items-center gap-1"
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => window.print()}
            className="p-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold"
            title="Print / Save Slides as PDF"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 16:9 Slide Canvas */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-10 shadow-lg min-h-[500px] sm:min-h-[560px] flex flex-col justify-between space-y-6">
        {/* Slide Header */}
        <div className="space-y-1.5 pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              {slide.badge}
            </span>
            <span className="text-[10px] font-mono text-slate-400">FlowSafe AI • Synapse³</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            {slide.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {slide.subtitle}
          </p>
        </div>

        {/* Slide Body */}
        <div className="flex-1 flex flex-col justify-center">
          {slide.content}
        </div>

        {/* Slide Footer with Dots */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-[10px] sm:text-xs">
            Use &larr; &rarr; arrow keys to navigate
          </span>

          {/* Dots */}
          <div className="flex items-center gap-1">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentSlide ? 'w-6 bg-blue-600' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>

          <span className="font-mono font-bold text-slate-900 text-xs">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>
    </div>
  );
}
