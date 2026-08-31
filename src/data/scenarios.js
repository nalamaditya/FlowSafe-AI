// Demo Scenarios for FlowSafe AI
export const DEMO_SCENARIOS = [
  {
    id: 'normal',
    name: '1. Normal Day',
    badge: 'Baseline Flow',
    description: 'Steady, predictable arrival patterns with balanced gate utilization and standard wait times.',
    multiplier: 0.75,
    surgeGate: null,
    riskLevel: 'LOW',
    eventTitle: 'Regular Operating Hours',
    eventTime: '12:00 PM - 8:00 PM',
    explainFactors: [
      'Standard distributed traffic across all public transport arrival points',
      'Average security processing speed of 24 visitors/minute per lane',
      'No scheduled mass transit disruptions or adverse weather'
    ]
  },
  {
    id: 'peak',
    name: '2. Peak Hour',
    badge: 'Rush Period',
    description: 'Standard daily rush hour. High footfall beginning to concentrate around primary entrances.',
    multiplier: 1.15,
    surgeGate: 'gate_b',
    riskLevel: 'MODERATE',
    eventTitle: 'Afternoon Inflow Surge',
    eventTime: '12:45 PM - 1:45 PM',
    explainFactors: [
      'Simultaneous transit shuttle dropoffs at Main Entrance',
      'Lunch hour concession and entry crossover traffic',
      'Minor scanner queue friction at primary turnstiles'
    ]
  },
  {
    id: 'major_event',
    name: '3. Major Event',
    badge: 'Championship / Headline',
    description: 'High-stakes event scenario with 20 minutes to kickoff. Gate B reaches 84%+ critical saturation.',
    multiplier: 1.55,
    surgeGate: 'gate_b',
    riskLevel: 'HIGH',
    eventTitle: 'Championship Match / Keynote',
    eventTime: 'Starts at 1:00 PM (T-20 mins)',
    explainFactors: [
      'Event starts in 20 minutes — rapid arrival compression',
      'Historical pattern shows +32% arrival rate spike before kickoff',
      'High ticket volume assigned specifically to East / Gate B entrance',
      'Nearby East parking deck has reached 94% capacity',
      'Gate B has lower service throughput (18/min vs 25/min average)'
    ]
  },
  {
    id: 'surge',
    name: '4. Unexpected Crowd Surge',
    badge: 'Sudden Influx',
    description: 'Unplanned bottleneck caused by delayed train arrivals and feeder shuttle simultaneous drop.',
    multiplier: 1.85,
    surgeGate: 'gate_b',
    riskLevel: 'CRITICAL',
    eventTitle: 'Multi-Transit Surge Overload',
    eventTime: 'Unscheduled Sudden Surge',
    explainFactors: [
      'Two delayed suburban transit trains arrived simultaneously',
      'Rainfall outside causing rapid crowding toward covered Gate B canopy',
      'Gate B queue spillover encroaching onto municipal roadway'
    ]
  },
  {
    id: 'emergency',
    name: '5. Emergency Simulation',
    badge: 'Incident Response',
    description: 'Simulated decision support scenario: Exit B obstructed, requiring automated dynamic evacuation redirection.',
    multiplier: 1.4,
    surgeGate: 'gate_b',
    riskLevel: 'CRITICAL',
    eventTitle: 'Zone 2 Obstructed Corridor Drill',
    eventTime: 'Active Incident Protocol',
    isEmergency: true,
    blockedExit: 'Exit B (East)',
    criticalZone: 'East Stand / Concourse B',
    explainFactors: [
      'Hazard sensor / manual report: Exit B corridor partially obstructed',
      'Immediate evacuation flow rerouting required for West & South Stand',
      'Real-time automated guidance to avoid lethal crowd crushing'
    ]
  }
];
