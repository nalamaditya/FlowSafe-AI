import React from 'react';

export default function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  trendPositive = true,
  statusBadge,
  highlight = false,
  onClick
}) {
  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 ${
        highlight 
          ? 'bg-gradient-to-b from-surface-800 to-surface-900 border-brand-500/30 shadow-lg shadow-brand-500/5 hover:border-brand-500/50' 
          : 'bg-surface-900/70 border-surface-800 hover:border-surface-700 hover:bg-surface-900/90'
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Background ambient glow if highlighted */}
      {highlight && (
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />
      )}

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-surface-400 tracking-wide uppercase">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-white font-mono">{value}</h3>
            {trend && (
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                trendPositive 
                  ? 'bg-emerald-500/10 text-emerald-400' 
                  : 'bg-rose-500/10 text-rose-400'
              }`}>
                {trend}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-lg border ${
            highlight 
              ? 'bg-brand-500/10 border-brand-500/20 text-brand-400' 
              : 'bg-surface-800/80 border-surface-700/60 text-surface-300'
          }`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between pt-2 border-t border-surface-800/60 text-xs">
        <span className="text-surface-400 font-medium truncate">{subtitle}</span>
        {statusBadge}
      </div>
    </div>
  );
}
