import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { X, Building2, Sparkles, ShieldCheck } from 'lucide-react';

export default function CustomVenueModal() {
  const { isCustomVenueModalOpen, setIsCustomVenueModalOpen, addCustomVenue } = useAppState();

  const [formData, setFormData] = useState({
    name: 'Metropolis Expo Pavilion',
    type: 'Multi-purpose Arena',
    capacity: 18500,
    numGates: 4,
    numExits: 6,
    numZones: 4
  });

  if (!isCustomVenueModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomVenue(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-surface-900 border border-surface-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-surface-800 flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">Configure Custom Venue Topology</h2>
              <p className="text-xs text-surface-400">Instantiate FlowSafe's predictive engine for any layout.</p>
            </div>
          </div>

          <button
            onClick={() => setIsCustomVenueModalOpen(false)}
            className="p-2 rounded-lg bg-surface-800 hover:bg-surface-700 text-surface-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-surface-300 uppercase tracking-wider mb-1">
              Venue Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-surface-950 border border-surface-700 text-xs text-white placeholder-surface-500 focus:outline-none focus:border-brand-500 font-medium"
              placeholder="e.g. Apex Convention Center"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-surface-300 uppercase tracking-wider mb-1">
                Venue Type
              </label>
              <input
                type="text"
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-surface-950 border border-surface-700 text-xs text-white placeholder-surface-500 focus:outline-none focus:border-brand-500 font-medium"
                placeholder="e.g. Auditorium, Sports Arena"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-surface-300 uppercase tracking-wider mb-1">
                Total Capacity
              </label>
              <input
                type="number"
                min="500"
                max="100000"
                step="500"
                required
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl bg-surface-950 border border-surface-700 text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-surface-300 uppercase tracking-wider mb-1">
                Entrance Gates
              </label>
              <select
                value={formData.numGates}
                onChange={(e) => setFormData({ ...formData, numGates: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-surface-950 border border-surface-700 text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
              >
                <option value={2}>2 Gates</option>
                <option value={4}>4 Gates (Standard)</option>
                <option value={6}>6 Gates</option>
                <option value={8}>8 Gates</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-surface-300 uppercase tracking-wider mb-1">
                Emergency Exits
              </label>
              <select
                value={formData.numExits}
                onChange={(e) => setFormData({ ...formData, numExits: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-surface-950 border border-surface-700 text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
              >
                <option value={4}>4 Exits</option>
                <option value={6}>6 Exits</option>
                <option value={8}>8 Exits</option>
                <option value={12}>12 Exits</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-surface-300 uppercase tracking-wider mb-1">
                Internal Zones
              </label>
              <select
                value={formData.numZones}
                onChange={(e) => setFormData({ ...formData, numZones: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-surface-950 border border-surface-700 text-xs text-white focus:outline-none focus:border-brand-500 font-mono"
              >
                <option value={2}>2 Zones</option>
                <option value={3}>3 Zones</option>
                <option value={4}>4 Zones</option>
                <option value={6}>6 Zones</option>
              </select>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-surface-950/70 border border-surface-800 text-xs text-surface-400 space-y-1">
            <span className="text-brand-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Dynamic Ingestion Pipeline
            </span>
            <p className="text-[11px]">
              FlowSafe will auto-generate deterministic gate nodes, queue fluid baselines, and historical profiles based on these parameters.
            </p>
          </div>

          {/* Footer CTAs */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-surface-800">
            <button
              type="button"
              onClick={() => setIsCustomVenueModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-surface-800 hover:bg-surface-700 text-surface-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-teal-500 hover:from-brand-500 hover:to-teal-400 text-surface-950 text-xs font-bold shadow-lg shadow-brand-500/20 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instantiate Venue Engine</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
