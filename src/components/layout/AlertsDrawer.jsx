import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { X, Bell, AlertTriangle, TrendingUp, CheckCircle, Flame, ArrowRight, ShieldCheck } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function AlertsDrawer() {
  const { isAlertsOpen, setIsAlertsOpen, setActivePage, setSelectedGateId } = useAppState();

  if (!isAlertsOpen) return null;

  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'HIGH CONGESTION PREDICTED',
      location: 'Gate B (East Entrance)',
      time: 'T - 12 mins',
      message: 'Critical density expected in 12 minutes (84% → 96%). Turnstile backlog expanding.',
      badge: 'URGENT INTERVENTION',
      level: 'critical',
      targetPage: 'recommendations',
      gateId: 'gate_b'
    },
    {
      id: 2,
      type: 'warning',
      title: 'QUEUE BUILDUP FORECAST',
      location: 'Gate D (West Entrance)',
      time: 'T - 25 mins',
      message: 'Wait time expected to increase by 40% (9m → 15m) due to shuttle arrival compression.',
      badge: 'QUEUE ADVISORY',
      level: 'high',
      targetPage: 'predictions',
      gateId: 'gate_d'
    },
    {
      id: 3,
      type: 'recommendation',
      title: 'OPTIMAL INGRESS AVAILABLE',
      location: 'Gate C (South Entrance)',
      time: 'Real-time',
      message: 'Gate C currently has lowest predicted wait (4 min) and 74% unused processing capacity.',
      badge: 'REDISTRIBUTION TARGET',
      level: 'low',
      targetPage: 'redistribution',
      gateId: 'gate_c'
    },
    {
      id: 4,
      type: 'event',
      title: 'EVENT IMPACT SURGE DETECTED',
      location: 'Perimeter East Corridor',
      time: 'T - 20 mins to kickoff',
      message: 'Expected visitor surge: +32% above standard baseline. Pre-kickoff arrival wave peaking.',
      badge: 'EVENT DYNAMICS',
      level: 'moderate',
      targetPage: 'simulator',
      gateId: 'gate_b'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-surface-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="fixed inset-0"
        onClick={() => setIsAlertsOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-900 border-l border-surface-700/80 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 border-b border-surface-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Bell className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Intelligent Alert Center</h3>
                <p className="text-[11px] text-surface-400">Proactive signals generated before bottlenecks materialize</p>
              </div>
            </div>

            <button
              onClick={() => setIsAlertsOpen(false)}
              className="p-1.5 rounded-lg bg-surface-800 hover:bg-surface-700 text-surface-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Alert List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {alerts.map((alert) => {
              const isCritical = alert.level === 'critical';

              return (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isCritical
                      ? 'bg-rose-950/20 border-rose-500/40 shadow-lg shadow-rose-500/5'
                      : alert.level === 'high'
                      ? 'bg-orange-950/15 border-orange-500/30'
                      : alert.level === 'moderate'
                      ? 'bg-amber-950/15 border-amber-500/30'
                      : 'bg-emerald-950/15 border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-surface-300">
                      {alert.title}
                    </span>
                    <StatusBadge status={alert.badge} level={alert.level} pulse={isCritical} />
                  </div>

                  <p className="text-xs font-bold text-white mt-1">{alert.location}</p>
                  <p className="text-xs text-surface-300 mt-1 leading-relaxed">{alert.message}</p>

                  <div className="mt-3 pt-2.5 border-t border-surface-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-surface-400 font-mono">{alert.time}</span>
                    <button
                      onClick={() => {
                        setSelectedGateId(alert.gateId);
                        setActivePage(alert.targetPage);
                        setIsAlertsOpen(false);
                      }}
                      className="inline-flex items-center gap-1 font-semibold text-brand-300 hover:text-brand-200 transition-colors"
                    >
                      <span>Take Action</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-surface-800 bg-surface-950 text-xs text-surface-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
              Automated Signal Stream
            </span>
            <button
              onClick={() => {
                setActivePage('recommendations');
                setIsAlertsOpen(false);
              }}
              className="font-semibold text-brand-400 hover:underline"
            >
              View All Recommendations &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
