import React from 'react';
import { useAppState } from '../context/AppStateContext';
import StadiumMap from '../components/venue/StadiumMap';
import GenericVenueMap from '../components/venue/GenericVenueMap';
import GateDetailModal from '../components/venue/GateDetailModal';
import PresentationBar from '../components/layout/PresentationBar';
import { Sparkles, MapPin, Activity, ArrowRight, ShieldAlert, Zap } from 'lucide-react';

export default function LiveVenuePage() {
  const { 
    activeEnvironment, 
    activeEnvId, 
    liveGates, 
    selectedGateId, 
    setSelectedGateId, 
    triggerPrediction, 
    isPredicting,
    setActivePage 
  } = useAppState();

  const isStadium = activeEnvId === 'stadium';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1-Click Judge Demo Bar */}
      <PresentationBar />

      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2">
            <span>{activeEnvironment.icon}</span>
            <span>Live Venue Perimeter Radar</span>
          </h1>
          <p className="text-xs text-surface-400 mt-0.5">
            Real-time status of all perimeter entrance gates. See where the crowd is piling up.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              triggerPrediction();
              setActivePage('predictions');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-surface-950 font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>2. See AI Prediction &rarr;</span>
          </button>

          <button
            onClick={() => setActivePage('redistribution')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-surface-950 font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Zap className="w-4 h-4" />
            <span>3. Fix with Redistribution &rarr;</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 2D Venue Layout & Gate Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stadium Map */}
        <div className="lg:col-span-8 space-y-4">
          {isStadium ? <StadiumMap /> : <GenericVenueMap />}
        </div>

        {/* Selected Gate Quick Inspector */}
        <div className="lg:col-span-4 space-y-4">
          <GateDetailModal />
        </div>
      </div>
    </div>
  );
}
