import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LiveNowPage from './pages/LiveNowPage';
import ForecastPage from './pages/ForecastPage';
import SimulatorPage from './pages/SimulatorPage';
import FutureScopePage from './pages/FutureScopePage';
import PitchDeckPage from './pages/PitchDeckPage';
import { ENVIRONMENTS } from './data/environmentsData';
import { 
  getEnvironmentLiveNow, 
  getFutureForecast, 
  decimalToTimeString 
} from './services/predictionEngine';

export default function App() {
  // 4 Focused Sub-pages: 'live' | 'forecast' | 'simulator' | 'future'
  const [activePage, setActivePage] = useState('live');

  // Environment Selection (College Campus, Stadium, Hospital, Movie Theatre, Shopping Mall)
  const [selectedEnvId, setSelectedEnvId] = useState('campus');

  // Real-world Browser Time & Scrubber State
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

  // Location selection for Future Forecast
  const activeEnv = ENVIRONMENTS.find(e => e.id === selectedEnvId) || ENVIRONMENTS[0];
  const [selectedLocationId, setSelectedLocationId] = useState(activeEnv.locations[0].id);

  // Sync selected location when environment changes
  const handleSelectEnv = (envId) => {
    setSelectedEnvId(envId);
    const newEnv = ENVIRONMENTS.find(e => e.id === envId) || ENVIRONMENTS[0];
    setSelectedLocationId(newEnv.locations[0].id);
  };

  // Future Forecast selectors
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

  // Handler to jump from a Live Card straight to Forecast page with that location pre-selected
  const handleSelectLocationForForecast = (locId) => {
    setSelectedLocationId(locId);
    setActivePage('forecast');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Sleek Top Navbar */}
      <Header
        activePage={activePage}
        onSelectPage={setActivePage}
        currentTimeFormatted={currentTimeFormatted}
        isLiveSimulatedTime={isLiveSimulatedTime}
        onResetToRealTime={handleResetToRealTime}
      />

      {/* Main Page Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3.5 sm:p-5 md:p-6 space-y-4 sm:space-y-6">

        {/* 1. LIVE NOW PAGE (WHAT IS HAPPENING NOW?) */}
        {activePage === 'live' && (
          <LiveNowPage
            selectedEnvId={selectedEnvId}
            onSelectEnv={handleSelectEnv}
            liveData={liveData}
            onSelectLocationForForecast={handleSelectLocationForForecast}
            currentDecimalHour={currentDecimalHour}
            onTimeChange={handleTimeScrubberChange}
            currentTimeFormatted={currentTimeFormatted}
            isLiveSimulatedTime={isLiveSimulatedTime}
          />
        )}

        {/* 2. FUTURE FORECAST & SMART RECOMMENDATIONS PAGE (WHAT WILL HAPPEN & WHAT TO DO) */}
        {activePage === 'forecast' && (
          <ForecastPage
            selectedEnvId={selectedEnvId}
            onSelectEnv={handleSelectEnv}
            selectedLocationId={selectedLocationId}
            onSelectLocation={setSelectedLocationId}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            selectedTimeStr={selectedTimeStr}
            onSelectTime={setSelectedTimeStr}
            forecastData={forecastData}
            currentDecimalHour={currentDecimalHour}
          />
        )}

        {/* 3. WHAT-IF SIMULATOR & SCENARIO STRESS LAB */}
        {activePage === 'simulator' && (
          <SimulatorPage />
        )}

        {/* 4. FUTURE SCOPE & HIGH-FOOTFALL ENVIRONMENTS */}
        {activePage === 'future' && (
          <FutureScopePage />
        )}

        {/* 5. INTERACTIVE PITCH PRESENTATION DECK */}
        {activePage === 'deck' && (
          <PitchDeckPage onBackToLive={() => setActivePage('live')} />
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
