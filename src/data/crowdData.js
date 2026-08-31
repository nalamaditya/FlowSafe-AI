// Baseline historical, analytics, and Explainable AI contextual data
export const HOURLY_ANALYTICS_DATA = [
  { time: '08:00', actual: 450, predicted: 420, capacity: 16000, waitTime: 2 },
  { time: '09:00', actual: 980, predicted: 1020, capacity: 16000, waitTime: 3 },
  { time: '10:00', actual: 2100, predicted: 2050, capacity: 16000, waitTime: 5 },
  { time: '11:00', actual: 3800, predicted: 3750, capacity: 16000, waitTime: 7 },
  { time: '12:00', actual: 6400, predicted: 6200, capacity: 16000, waitTime: 11 },
  { time: '12:30', actual: 7800, predicted: 7600, capacity: 16000, waitTime: 14 },
  { time: '13:00 (Peak)', actual: 11200, predicted: 11050, capacity: 16000, waitTime: 22 },
  { time: '13:30', actual: 9400, predicted: 9600, capacity: 16000, waitTime: 16 },
  { time: '14:00', actual: 6800, predicted: 7100, capacity: 16000, waitTime: 9 },
  { time: '15:00', actual: 4200, predicted: 4400, capacity: 16000, waitTime: 6 },
  { time: '16:00', actual: 3100, predicted: 3000, capacity: 16000, waitTime: 4 },
  { time: '17:00', actual: 2400, predicted: 2350, capacity: 16000, waitTime: 3 },
];

export const GATE_DISTRIBUTION_ANALYTICS = [
  { name: 'Gate A (North)', percentage: 15, avgWait: 4.2, totalProcessed: 3240, color: '#10b981' },
  { name: 'Gate B (East)', percentage: 48, avgWait: 18.5, totalProcessed: 8960, color: '#ef4444' },
  { name: 'Gate C (South)', percentage: 12, avgWait: 3.8, totalProcessed: 2810, color: '#10b981' },
  { name: 'Gate D (West)', percentage: 25, avgWait: 9.1, totalProcessed: 5120, color: '#f59e0b' },
];

export const CONGESTION_INCIDENTS_HISTORY = [
  { day: 'Mon', incidentsAvoided: 4, unmitigatedBottlenecks: 0, avgWaitSavedMin: 12.4 },
  { day: 'Tue', incidentsAvoided: 6, unmitigatedBottlenecks: 1, avgWaitSavedMin: 14.1 },
  { day: 'Wed', incidentsAvoided: 5, unmitigatedBottlenecks: 0, avgWaitSavedMin: 11.8 },
  { day: 'Thu', incidentsAvoided: 8, unmitigatedBottlenecks: 0, avgWaitSavedMin: 16.5 },
  { day: 'Fri', incidentsAvoided: 12, unmitigatedBottlenecks: 1, avgWaitSavedMin: 19.2 },
  { day: 'Sat (Event)', incidentsAvoided: 18, unmitigatedBottlenecks: 0, avgWaitSavedMin: 23.4 },
  { day: 'Sun (Event)', incidentsAvoided: 15, unmitigatedBottlenecks: 0, avgWaitSavedMin: 21.0 },
];

export const AI_INSIGHT_HIGHLIGHTS = [
  {
    id: 1,
    type: 'trend',
    title: 'Peak Congestion Window Identified',
    content: 'Gate B consistently experiences peak congestion between 12:40 PM and 1:20 PM prior to scheduled 1:00 PM kickoff.',
    badge: 'Recurring Pattern',
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    icon: 'Clock'
  },
  {
    id: 2,
    type: 'correlation',
    title: 'Event Arrival Rate Spike',
    content: 'Historical arrival volume surges +32% above baseline when regional transit lines operate on express schedule.',
    badge: '32% Surge Factor',
    badgeColor: 'border-rose-500/40 text-rose-400 bg-rose-500/10',
    icon: 'TrendingUp'
  },
  {
    id: 3,
    type: 'efficiency',
    title: 'Most Efficient Alternative Path',
    content: 'Gate C currently has 74% unused processing capacity with an average wait under 5 minutes.',
    badge: 'Optimal Redirection',
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    icon: 'CheckCircle'
  },
  {
    id: 4,
    type: 'optimization',
    title: 'Dynamic Service Throughput',
    content: 'Enabling 2 additional mobile bag-check lanes at Gate B would reduce peak queue tail by 380 meters.',
    badge: 'Actionable Suggestion',
    badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
    icon: 'Zap'
  }
];
