import React, { useState } from 'react';
import { VENUE_DETAILS } from '../data/venueDetails';
import GenericVenueLayout from '../components/venue/GenericVenueLayout';
import { Plus, ArrowRight, Sparkles, Building2, Layers } from 'lucide-react';

export default function VenuesPage({ onNavigateToForecast }) {
  const [selectedVenueKey, setSelectedVenueKey] = useState(null);
  const [customVenues, setCustomVenues] = useState([]);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customForm, setCustomForm] = useState({ name: 'Tech Expo Arena', type: 'Convention Center', capacity: 15000 });

  const handleAddCustomVenue = (e) => {
    e.preventDefault();
    const newV = {
      id: `custom_${Date.now()}`,
      name: customForm.name,
      icon: '🏢',
      tagline: `${customForm.type} Topology`,
      summary: `Custom ${customForm.type} configured with ${Number(customForm.capacity).toLocaleString()} capacity.`,
      capacity: Number(customForm.capacity) || 10000,
      unitName: 'Occupants',
      zones: [
        { id: 'z1', name: 'Main Entrance Hall', current: Math.round(customForm.capacity * 0.45), capacity: Math.round(customForm.capacity * 0.5), pct: 90, wait: '16 min', status: 'Choked', level: 'critical' },
        { id: 'z2', name: 'Side Wing Entry B', current: Math.round(customForm.capacity * 0.15), capacity: Math.round(customForm.capacity * 0.4), pct: 37, wait: '3 min', status: 'Free', level: 'low' },
      ],
      redistribution: {
        problem: 'Main entrance is 90% full with arriving crowds.',
        solution: 'Direct 40% of incoming visitors to Side Wing Entry B.',
        beforeRisk: 90,
        afterRisk: 62,
        beforeWait: '16 mins',
        afterWait: '5 mins'
      }
    };

    setCustomVenues([...customVenues, newV]);
    VENUE_DETAILS[newV.id] = newV;
    setSelectedVenueKey(newV.id);
    setShowCustomModal(false);
  };

  const allVenuesList = [
    VENUE_DETAILS.campus,
    VENUE_DETAILS.stadium,
    VENUE_DETAILS.airport,
    VENUE_DETAILS.metro,
    VENUE_DETAILS.hospital,
    VENUE_DETAILS.mall,
    VENUE_DETAILS.railway,
    VENUE_DETAILS.concert,
    VENUE_DETAILS.exhibition,
    VENUE_DETAILS.festival,
    VENUE_DETAILS.religious,
    VENUE_DETAILS.amusement,
    VENUE_DETAILS.government,
    VENUE_DETAILS.bus_terminal,
    VENUE_DETAILS.tourist,
    ...customVenues
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* If a specific venue is selected, show its layout */}
      {selectedVenueKey ? (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedVenueKey(null)}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
          >
            &larr; Back to All 16 Venues
          </button>

          <GenericVenueLayout venue={VENUE_DETAILS[selectedVenueKey] || VENUE_DETAILS.airport} />
        </div>
      ) : (
        <>
          {/* Top Header */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌐</span>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    16 Supported High-Footfall Environments
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    The same core intelligence engine adapts to any venue topology using its unique footfall curves.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCustomModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Create Custom Venue</span>
            </button>
          </div>

          {/* Grid of 16 Venues */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {allVenuesList.map((venue) => {
              if (!venue) return null;

              return (
                <div
                  key={venue.id}
                  onClick={() => setSelectedVenueKey(venue.id)}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer space-y-2.5 group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{venue.icon}</div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {venue.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {venue.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400 flex justify-between items-center">
                    <span>{venue.capacity?.toLocaleString()} Cap</span>
                    <span className="text-blue-600 font-bold group-hover:underline flex items-center gap-0.5">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Core Philosophy Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-blue-200">
              <Sparkles className="w-4 h-4 text-blue-300" />
              <span>CORE PHILOSOPHY</span>
            </div>

            <h3 className="text-lg md:text-xl font-extrabold tracking-tight">
              “Don’t wait until a place becomes crowded. Know before you go.”
            </h3>

            {/* 4-Step Diagram */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 text-xs font-semibold">
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-center">
                <span className="text-blue-200 block text-[10px] uppercase font-mono">Step 1</span>
                <span>Live Crowd Detection</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-center">
                <span className="text-blue-200 block text-[10px] uppercase font-mono">Step 2</span>
                <span>Historical Pattern Analysis</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-center">
                <span className="text-blue-200 block text-[10px] uppercase font-mono">Step 3</span>
                <span>AI Congestion Prediction</span>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-500/30 backdrop-blur-sm border border-emerald-400/40 text-center text-emerald-200">
                <span className="text-emerald-300 block text-[10px] uppercase font-mono">Step 4</span>
                <span className="text-white font-bold">Prevent Congestion</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Custom Venue Creator Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xl max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-slate-900">Configure Custom Venue Topology</h3>
            <form onSubmit={handleAddCustomVenue} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Venue Name</label>
                <input
                  type="text"
                  required
                  value={customForm.name}
                  onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Venue Type</label>
                <input
                  type="text"
                  required
                  value={customForm.type}
                  onChange={(e) => setCustomForm({ ...customForm, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Capacity</label>
                <input
                  type="number"
                  min="500"
                  step="500"
                  required
                  value={customForm.capacity}
                  onChange={(e) => setCustomForm({ ...customForm, capacity: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Instantiate Venue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
