import React, { useState } from 'react';
import CampusHeatmap from '../components/venue/CampusHeatmap';
import StadiumMapLight from '../components/venue/StadiumMapLight';
import { Map, Layers, Sparkles } from 'lucide-react';

export default function MapsPage() {
  const [activeMapType, setActiveMapType] = useState('campus'); // 'campus' | 'stadium'
  const [isStadiumBalanced, setIsStadiumBalanced] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner with Sub-tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🗺️</span>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Interactive 2D Venue Maps & Heatmaps
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Visual floorplans with real-time zone occupancy, heat overlays, and 1-click proactive flow balancing.
                </p>
              </div>
            </div>
          </div>

          {/* Sub-map selector pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setActiveMapType('campus')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeMapType === 'campus'
                  ? 'bg-white text-blue-600 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🏫 College Campus Heatmap</span>
            </button>

            <button
              onClick={() => setActiveMapType('stadium')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeMapType === 'stadium'
                  ? 'bg-white text-blue-600 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🏟️ Stadium 4-Gate Radar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Render Selected Map */}
      {activeMapType === 'campus' ? (
        <CampusHeatmap />
      ) : (
        <div className="space-y-6">
          <StadiumMapLight 
            isBalanced={isStadiumBalanced}
            onToggleBalance={() => setIsStadiumBalanced(!isStadiumBalanced)}
          />
        </div>
      )}
    </div>
  );
}
