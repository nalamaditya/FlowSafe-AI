import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { X, Plus, Check, Search, ShieldCheck } from 'lucide-react';

export default function EnvironmentModal() {
  const { 
    environments, 
    activeEnvId, 
    setActiveEnvId, 
    isEnvModalOpen, 
    setIsEnvModalOpen,
    setIsCustomVenueModalOpen
  } = useAppState();

  const [searchTerm, setSearchTerm] = React.useState('');

  if (!isEnvModalOpen) return null;

  const filteredEnvironments = environments.filter(env => 
    env.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    env.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    env.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-surface-900 border border-surface-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-surface-800 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🌐</span>
              <h2 className="text-lg font-bold text-white tracking-wide">Where do you need to manage crowds?</h2>
            </div>
            <p className="text-xs text-surface-400 mt-1">
              FlowSafe AI powers unified predictive crowd intelligence across high-footfall venues with zero architectural changes.
            </p>
          </div>

          <button
            onClick={() => setIsEnvModalOpen(false)}
            className="p-2 rounded-lg bg-surface-800 hover:bg-surface-700 text-surface-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Custom Venue trigger bar */}
        <div className="p-4 border-b border-surface-800/60 bg-surface-950/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search environments (e.g. airport, metro)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-surface-900 border border-surface-700 text-xs text-white placeholder-surface-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <button
            onClick={() => {
              setIsEnvModalOpen(false);
              setIsCustomVenueModalOpen(true);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-semibold transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Custom Venue</span>
          </button>
        </div>

        {/* Environments Grid */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filteredEnvironments.map((env) => {
            const isActive = activeEnvId === env.id;

            return (
              <div
                key={env.id}
                onClick={() => {
                  setActiveEnvId(env.id);
                  setIsEnvModalOpen(false);
                }}
                className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                  isActive
                    ? 'bg-gradient-to-b from-brand-950/40 to-surface-900 border-brand-400 shadow-lg shadow-brand-500/10 scale-[1.02]'
                    : 'bg-surface-850/80 border-surface-700/60 hover:border-surface-600 hover:bg-surface-800'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="text-2xl mb-2">{env.icon}</span>
                    {isActive && (
                      <span className="p-1 rounded-full bg-brand-500 text-surface-950">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-white group-hover:text-brand-300 transition-colors">
                    {env.name}
                  </h4>
                  <p className="text-[10px] text-brand-400 font-mono mt-0.5">{env.category}</p>
                  <p className="text-[11px] text-surface-400 mt-1 line-clamp-2">{env.description}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-surface-800/80 flex items-center justify-between text-[10px] text-surface-400 font-mono">
                  <span>Cap: {env.capacity?.toLocaleString()}</span>
                  <span>{env.gates?.length || 4} Gates</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer note */}
        <div className="p-4 border-t border-surface-800 bg-surface-950 flex items-center justify-between text-xs text-surface-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            16 Pre-configured venue topologies + user defined custom geometry
          </span>
          <button
            onClick={() => setIsEnvModalOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-surface-800 hover:bg-surface-700 text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
