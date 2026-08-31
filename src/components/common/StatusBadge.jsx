import React from 'react';

export default function StatusBadge({ status, level = 'low', size = 'sm', pulse = false }) {
  const getStyles = () => {
    switch (level?.toLowerCase()) {
      case 'critical':
      case 'critical risk':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'high':
        return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
      case 'moderate':
      case 'medium':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'low':
      case 'nominal':
      default:
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    }
  };

  const getDotColor = () => {
    switch (level?.toLowerCase()) {
      case 'critical':
      case 'critical risk':
        return 'bg-rose-400';
      case 'high':
        return 'bg-orange-400';
      case 'moderate':
      case 'medium':
        return 'bg-amber-400';
      case 'low':
      case 'nominal':
      default:
        return 'bg-emerald-400';
    }
  };

  const sizeClasses = size === 'lg' ? 'px-3 py-1.5 text-xs font-semibold' : 'px-2.5 py-1 text-[11px] font-medium';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border backdrop-blur-sm ${sizeClasses} ${getStyles()}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${getDotColor()} ${pulse || level === 'critical' ? 'animate-ping-slow' : ''}`} />
      <span>{status}</span>
    </span>
  );
}
