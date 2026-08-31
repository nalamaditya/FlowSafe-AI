import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LiveNowGrid from './components/LiveNowGrid';
import FutureForecastSection from './components/FutureForecastSection';
import WhatIfSandbox from './components/WhatIfSandbox';
import FutureExpansion from './components/FutureExpansion';
import { ENVIRONMENTS } from './data/environmentsData';
import { 
  getEnvironmentLiveNow, 
  getFutureForecast, 
  decimalToTimeString 
} from './services/predictionEngine';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Target } from 'lucide-react';

export default function App() {
  // 1. Environment Selection
  const [selectedEnvId, setSelectedEnvId] = useState('campus');

  // 2. Real-world Browser Time & Scrubber State
  const getBrowserDecimalTime = () => {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60;
  };

  const [realWorldDecimal, setRealWorldDecimal] = useState(getBrowserDecimalTime());
  const [currentDecimalHour, setCurrentDecimalHour] = useState(getBrowserDecimalTime());
  const [isLiveSimulatedTime, setIsLiveSimulatedTime] = useState(false);

  // Update real-world clock every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const live = getBrowserDecimalTime();
      setRealWorldDecimal(live);
      if (!isLiveSimulatedTime) {
        setCurrentDecimalHour(live);
      }
    }, 30000);
    return () => clearInterval(timer);
  }, [isLiveSimulatedTime]);

  const handleResetToRealTime = () => {
    const live = getBrowserDecimalTime();
    setCurrentDecimalHour(live);
    setIsLiveSimulatedTime(false);
  };

  const handleTimeScrubberChange = (decimal) => {
    setCurrentDecimalHour(decimal);
    setIsLiveSimulatedTime(true);
  };

  // 3. Location selection for Future Forecast
  const activeEnv = ENVIRONMENTS.find(e => e.id === selectedEnvId) || ENVIRONMENTS[0];
  const [selectedLocationId, setSelectedLocationId] = useState(activeEnv.locations[0].id);

  // Sync selected location when environment changes
  const handleSelectEnv = (envId) => {
    setSelectedEnvId(envId);
    if (envId !== 'expansion') {
      const newEnv = ENVIRONMENTS.find(e => e.id === envId) || ENVIRONMENTS[0];
      setSelectedLocationId(newEnv.locations[0].id);
    }
  };

  // 4. Future Forecast selectors
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTimeStr, setSelectedTimeStr] = useState('1:00 PM');

  // Compute live data and forecast
  const liveData = getEnvironmentLiveNow(selectedEnvId, currentDecimalHour);
  const forecastData = getFutureForecast(
    selectedEnvId,
    selectedLocationId,
    selectedTimeStr,
    selectedDate
  );

  const currentTimeFormatted = decimalToTimeString(currentDecimalHour);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Sleek Top Navbar */}
      <Header
        selectedEnvId={selectedEnvId}
        onSelectEnv={handleSelectEnv}
        currentTimeFormatted={currentTimeFormatted}
        isLiveSimulatedTime={isLiveSimulatedTime}
        onResetToRealTime={handleResetToRealTime}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 space-y-6">

        {/* 3 Core Questions Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{activeEnv.icon}</span>
                <h2 className="text-base font-extrabold text-slate-900">
                  {activeEnv.name} Crowd Intelligence
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {activeEnv.locations?.length} Monitored Zones
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeEnv.description}
              </p>
            </div>

            {/* Tagline */}
            <div className="text-left md:text-right">
              <span className="text-[11px] font-mono text-blue-600 font-bold block">
                “PREDICT. PREVENT. PROTECT.”
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Don’t wait until it’s crowded. Know before you go.
              </span>
            </div>
          </div>

          {/* 3 Questions Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100 text-xs">
            <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <strong className="text-slate-900 block font-bold">What is happening now?</strong>
                <span className="text-slate-500 text-[11px]">Real-time live footfall & queue delays</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <strong className="text-slate-900 block font-bold">What will happen at a selected time?</strong>
                <span className="text-slate-500 text-[11px]">Historical pattern congestion forecast</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <strong className="text-slate-900 block font-bold">What should we do?</strong>
                <span className="text-slate-500 text-[11px]">Smart proactive recommendations</span>
              </div>
            </div>
          </div>
        </div>

        {/* VIEW 1: EXPANSION / FUTURE SCOPE VIEW */}
        {selectedEnvId === 'expansion' ? (
          <FutureExpansion onSelectEnvironment={handleSelectEnv} />
        ) : (
          <>
            {/* 1. LIVE NOW GRID (WHAT IS HAPPENING NOW?) */}
            <LiveNowGrid
              liveData={liveData}
              onSelectLocationForForecast={(locId) => {
                setSelectedLocationId(locId);
                // Smooth scroll to forecast section
                const el = document.getElementById('future-forecast-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              currentDecimalHour={currentDecimalHour}
              onTimeChange={handleTimeScrubberChange}
              currentTimeFormatted={currentTimeFormatted}
              isLiveSimulatedTime={isLiveSimulatedTime}
            />

            {/* 2 & 3. FUTURE FORECAST & SMART RECOMMENDATION SECTION */}
            <div id="future-forecast-section">
              <FutureForecastSection
                selectedEnv={activeEnv}
                selectedLocationId={selectedLocationId}
                onSelectLocation={setSelectedLocationId}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                selectedTimeStr={selectedTimeStr}
                onSelectTime={setSelectedTimeStr}
                forecastData={forecastData}
                currentDecimalHour={currentDecimalHour}
              />
            </div>

            {/* WHAT-IF SIMULATOR */}
            <WhatIfSandbox
              selectedEnv={activeEnv}
              selectedLocationId={selectedLocationId}
              selectedTimeStr={selectedTimeStr}
            />

            {/* FUTURE EXPANSION SHOWCASE */}
            <FutureExpansion onSelectEnvironment={handleSelectEnv} />
          </>
        )}

      </main>

      {/* Clean Light Footer */}
      <footer className="py-5 text-center text-xs text-slate-400 border-t border-slate-200 bg-white mt-auto space-y-1">
        <p className="font-semibold text-slate-600">
          FLOWSAFE AI • Predict. Prevent. Protect. • Ideathon 2K26 Prototype
        </p>
        <p className="text-[11px] text-slate-400">
          Context-Aware Crowd Intelligence Engine • Deterministic Simulated Prototype Data
        </p>
      </footer>
    </div>
  );
}
