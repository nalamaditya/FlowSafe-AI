import { ENVIRONMENTS } from '../data/environmentsData';

/**
 * Calculates deterministic crowd status and semantic badge colors based on occupancy %
 */
export function calculateStatus(occupancyPct) {
  if (occupancyPct >= 85) {
    return {
      label: 'CRITICAL',
      level: 'critical',
      dot: '🔴',
      color: '#ef4444',
      badgeClass: 'bg-red-50 text-red-700 border-red-300 font-bold',
      pillClass: 'bg-red-500 text-white'
    };
  } else if (occupancyPct >= 65) {
    return {
      label: 'HIGH',
      level: 'high',
      dot: '🟠',
      color: '#f97316',
      badgeClass: 'bg-orange-50 text-orange-700 border-orange-300 font-bold',
      pillClass: 'bg-orange-500 text-white'
    };
  } else if (occupancyPct >= 45) {
    return {
      label: 'MODERATE',
      level: 'moderate',
      dot: '🟡',
      color: '#f59e0b',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-300 font-medium',
      pillClass: 'bg-amber-500 text-white'
    };
  } else {
    return {
      label: 'LOW',
      level: 'low',
      dot: '🟢',
      color: '#10b981',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-medium',
      pillClass: 'bg-emerald-500 text-white'
    };
  }
}

/**
 * Converts a time string (e.g. "13:00", "1:00 PM", "16:45") to a decimal hour (e.g. 13.0, 16.75)
 */
export function timeStringToDecimal(timeStr) {
  if (!timeStr) return 13.0;

  const isPM = /pm/i.test(timeStr);
  const isAM = /am/i.test(timeStr);

  const clean = timeStr.replace(/[^0-9:]/g, '');
  const parts = clean.split(':');
  let hours = parseInt(parts[0], 10) || 12;
  const minutes = parseInt(parts[1], 10) || 0;

  if (isPM && hours < 12) hours += 12;
  if (isAM && hours === 12) hours = 0;

  return hours + (minutes / 60);
}

/**
 * Converts decimal hour to formatted 12-hour string (e.g. 13.5 -> "1:30 PM")
 */
export function decimalToTimeString(decimal) {
  let hours = Math.floor(decimal);
  let minutes = Math.round((decimal - hours) * 60);
  if (minutes === 60) {
    hours += 1;
    minutes = 0;
  }
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${displayHours}:${displayMinutes} ${ampm}`;
}

/**
 * Smoothly interpolates the crowd for a given location at any decimal hour
 */
export function interpolateCrowd(location, decimalHour, extraVisitors = 0) {
  const hourly = location.hourly || {};
  const keys = Object.keys(hourly).sort((a, b) => timeStringToDecimal(a) - timeStringToDecimal(b));

  if (!keys.length) return { crowd: 50, occupancyPct: 25, waitMin: 2, status: calculateStatus(25) };

  let prevKey = keys[0];
  let nextKey = keys[keys.length - 1];

  for (let i = 0; i < keys.length; i++) {
    const kDec = timeStringToDecimal(keys[i]);
    if (kDec <= decimalHour) {
      prevKey = keys[i];
    }
    if (kDec >= decimalHour && nextKey === keys[keys.length - 1]) {
      nextKey = keys[i];
    }
  }

  const t1 = timeStringToDecimal(prevKey);
  const t2 = timeStringToDecimal(nextKey);
  const v1 = hourly[prevKey];
  const v2 = hourly[nextKey];

  let rawCrowd = v1;
  if (t2 > t1) {
    const ratio = (decimalHour - t1) / (t2 - t1);
    rawCrowd = v1 + (v2 - v1) * ratio;
  }

  const baseCrowd = Math.round(rawCrowd);
  const totalCrowd = Math.max(5, baseCrowd + Number(extraVisitors));
  const capacity = location.capacity || 200;
  const occupancyPct = Math.round((totalCrowd / capacity) * 100);

  let waitMin = Math.round((occupancyPct / 100) * (location.baselineWaitMin || 15));
  if (occupancyPct < 30) waitMin = Math.max(1, Math.round(waitMin * 0.3));

  const status = calculateStatus(occupancyPct);

  return {
    crowd: totalCrowd,
    capacity,
    occupancyPct,
    waitMin,
    status
  };
}

/**
 * Calculates live crowd trend and real-time recommendation ("Can I go there now, or should I wait?")
 */
export function calculateLiveRecommendation(location, decimalHour) {
  const current = interpolateCrowd(location, decimalHour);
  const next10m = interpolateCrowd(location, Math.min(20.0, decimalHour + 10 / 60));
  const next20m = interpolateCrowd(location, Math.min(20.0, decimalHour + 20 / 60));

  // Determine trend
  const diff20 = next20m.crowd - current.crowd;
  const diffPct = (diff20 / location.capacity) * 100;

  let trend = {
    label: 'Stable',
    symbol: '→',
    direction: 'stable',
    textClass: 'text-slate-600 font-semibold',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  if (diffPct >= 3.0) {
    trend = {
      label: 'Increasing',
      symbol: '↗',
      direction: 'up',
      textClass: 'text-red-600 font-bold',
      badgeClass: 'bg-red-50 text-red-700 border-red-200'
    };
  } else if (diffPct <= -3.0) {
    trend = {
      label: 'Decreasing',
      symbol: '↘',
      direction: 'down',
      textClass: 'text-emerald-600 font-bold',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    };
  }

  // Look ahead 15 to 120 mins to find best upcoming time
  const forwardOffsets = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
  const upcomingSlots = forwardOffsets
    .map(offset => {
      const h = Math.min(20.0, decimalHour + offset);
      const stat = interpolateCrowd(location, h);
      return {
        hour: h,
        offsetMinutes: Math.round(offset * 60),
        timeFormatted: decimalToTimeString(h),
        ...stat
      };
    })
    .sort((a, b) => a.occupancyPct - b.occupancyPct);

  const bestSlot = upcomingSlots[0] || {
    hour: decimalHour + 1.0,
    offsetMinutes: 60,
    timeFormatted: decimalToTimeString(decimalHour + 1.0),
    occupancyPct: 35
  };

  let action = {
    statusText: 'Good to go now',
    statusIcon: '✅',
    style: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    titleColor: 'text-emerald-700',
    explanation: 'Low crowd and short waiting time.',
    bestTime: null,
    waitMinutes: null
  };

  // Case 1: Low crowd (< 45%)
  if (current.occupancyPct < 45) {
    action = {
      statusText: 'Good to go now',
      statusIcon: '✅',
      style: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      titleColor: 'text-emerald-700',
      explanation: 'Low crowd and short waiting time.',
      bestTime: null,
      waitMinutes: null
    };
  }
  // Case 2: Crowd is high/moderate but decreasing (>= 45% & decreasing)
  else if (current.occupancyPct >= 45 && trend.direction === 'down') {
    const mins = Math.min(15, Math.max(5, bestSlot.offsetMinutes || 10));
    action = {
      statusText: `Better in ~${mins} minutes`,
      statusIcon: '⏳',
      style: 'bg-amber-50 text-amber-900 border-amber-200',
      titleColor: 'text-amber-700',
      explanation: 'Crowd is currently decreasing. Expected crowd will be lower shortly.',
      bestTime: bestSlot.timeFormatted,
      waitMinutes: mins
    };
  }
  // Case 3: Crowd is high and increasing (>= 65% & increasing)
  else if (current.occupancyPct >= 65 && trend.direction === 'up') {
    const waitMins = Math.max(15, Math.min(45, bestSlot.offsetMinutes || 20));
    action = {
      statusText: "Don't go now",
      statusIcon: '🚫',
      style: 'bg-red-50 text-red-900 border-red-200',
      titleColor: 'text-red-600',
      explanation: 'Crowd is expected to increase over the next 10–20 minutes.',
      bestTime: bestSlot.timeFormatted,
      waitMinutes: waitMins
    };
  }
  // Case 3B: High crowd and stable (>= 75% & stable)
  else if (current.occupancyPct >= 75) {
    const waitMins = Math.max(15, Math.min(45, bestSlot.offsetMinutes || 20));
    action = {
      statusText: "Don't go now",
      statusIcon: '🚫',
      style: 'bg-red-50 text-red-900 border-red-200',
      titleColor: 'text-red-600',
      explanation: 'Heavy queue congestion currently active. Consider visiting later.',
      bestTime: bestSlot.timeFormatted,
      waitMinutes: waitMins
    };
  }
  // Case 4: Moderate crowd (45% – 65% and stable/slow)
  else {
    action = {
      statusText: 'Acceptable now',
      statusIcon: '🟡',
      style: 'bg-amber-50/70 text-amber-900 border-amber-200',
      titleColor: 'text-amber-800',
      explanation: 'Moderate crowd. You can go now, but waiting time may be slightly higher.',
      bestTime: null,
      waitMinutes: null
    };
  }

  return {
    trend,
    action
  };
}

/**
 * Gets the simulated real-time crowd status for all locations in an environment
 */
export function getEnvironmentLiveNow(environmentId, decimalHour) {
  const env = ENVIRONMENTS.find(e => e.id === environmentId) || ENVIRONMENTS[0];

  const locationsData = env.locations.map(loc => {
    const stats = interpolateCrowd(loc, decimalHour);
    const liveInsight = calculateLiveRecommendation(loc, decimalHour);

    return {
      ...loc,
      ...stats,
      trend: liveInsight.trend,
      liveRecommendation: liveInsight.action
    };
  });

  const totalCrowd = locationsData.reduce((sum, l) => sum + l.crowd, 0);
  const totalCapacity = locationsData.reduce((sum, l) => sum + l.capacity, 0);
  const avgWait = Math.round(locationsData.reduce((sum, l) => sum + l.waitMin, 0) / locationsData.length);

  return {
    environment: env,
    locations: locationsData,
    totalCrowd,
    totalCapacity,
    avgWait,
    overallOccupancy: Math.round((totalCrowd / totalCapacity) * 100)
  };
}

/**
 * Generates an Explainable AI future forecast for a specific location and selected time,
 * including a comprehensive multi-pillar recommendation plan.
 */
export function getFutureForecast(environmentId, locationId, selectedTimeStr, dateStr = 'Tomorrow') {
  const env = ENVIRONMENTS.find(e => e.id === environmentId) || ENVIRONMENTS[0];
  const location = env.locations.find(l => l.id === locationId) || env.locations[0];

  const decimalHour = timeStringToDecimal(selectedTimeStr);
  const stats = interpolateCrowd(location, decimalHour);

  const isHigh = stats.occupancyPct >= 65;
  const reasons = isHigh ? location.reasonsHigh : location.reasonsLow;

  // Find alternative locations in the same environment that have low/moderate crowd
  const alternatives = env.locations
    .filter(l => l.id !== location.id)
    .map(l => {
      const altStats = interpolateCrowd(l, decimalHour);
      return {
        id: l.id,
        name: l.name,
        icon: l.icon,
        description: l.description,
        ...altStats
      };
    })
    .sort((a, b) => a.occupancyPct - b.occupancyPct);

  // Find optimal time windows (hours with occupancy < 50%)
  const testHours = [9.0, 10.5, 11.5, 12.5, 13.5, 14.5, 15.5, 16.5, 17.5, 18.5];
  const optimalSlots = testHours
    .map(h => ({
      hour: h,
      timeFormatted: decimalToTimeString(h),
      ...interpolateCrowd(location, h)
    }))
    .filter(slot => slot.occupancyPct < 55 && Math.abs(slot.hour - decimalHour) >= 0.75)
    .sort((a, b) => a.occupancyPct - b.occupancyPct);

  const primaryBestSlot = optimalSlots[0] || { timeFormatted: '2:00 PM', waitMin: 4, occupancyPct: 35 };
  const secondaryBestSlot = optimalSlots[1] || { timeFormatted: '11:00 AM', waitMin: 3, occupancyPct: 28 };

  // Calculate estimated savings if following recommendation
  const savedWaitTime = Math.max(0, stats.waitMin - primaryBestSlot.waitMin);
  const timeSavedPct = stats.waitMin > 0 ? Math.round((savedWaitTime / stats.waitMin) * 100) : 0;

  // Specific venue guidance items
  let visitorTips = [];
  let managerActions = [];

  if (env.id === 'campus') {
    visitorTips = [
      '📱 Use mobile cafeteria pass to pre-order meals and bypass queue lines.',
      '🚶 Transit via the East Corridor staircase to avoid central lobby congestion.',
      '⏱️ Arrive 15 minutes before lecture intervals or wait 20 minutes post-bell.'
    ];
    managerActions = [
      '🚪 Open Auxiliary Counter 3 and Food Court 2 Annex 15 mins before rush.',
      '📢 Broadcast digital signage alerts directing students to uncrowded wings.',
      '🛡️ Station 2 student marshals at Canteen entry to maintain one-way movement.'
    ];
  } else if (env.id === 'stadium') {
    visitorTips = [
      '🚪 Enter via Gate C or Gate A — security processing is 70% faster than Gate B.',
      '📱 Have digital tickets loaded in Apple/Google Wallet before reaching turnstiles.',
      '🍕 Purchase halftime refreshments 10 mins before the first-half whistle.'
    ];
    managerActions = [
      '🔄 Reroute incoming parking shuttle buses to drop passengers at Gate C perimeter.',
      '📢 Display real-time gate wait-time boards on highway approach screens.',
      '⚡ Activate 4 additional portable ticket scanners at Gate B entrance.'
    ];
  } else if (env.id === 'hospital') {
    visitorTips = [
      '📋 Complete digital registration & token check-in online prior to arrival.',
      '🪑 Use Garden Courtyard Waiting Area for comfortable, quiet seating.',
      '💊 Opt for home prescription delivery to skip the main pharmacy queue.'
    ];
    managerActions = [
      '🩺 Stagger OPD appointment batches by 20-minute consultation windows.',
      '🚑 Ensure Emergency triage red-corridor remains 100% physically unobstructed.',
      '⚡ Open 2 express billing counters in West Wing during 9 AM–11 AM peak.'
    ];
  } else if (env.id === 'cinema') {
    visitorTips = [
      '🎟️ Scan QR codes directly at turnstiles to skip the box office line.',
      '🍿 Pre-order interval popcorn and drinks from seat QR menu before the movie starts.',
      '🚪 Use West corridor stairs upon credits roll to access parking quickly.'
    ];
    managerActions = [
      '⏱️ Stagger Screen 1 and Screen 2 interval times by 10 minutes to prevent concession clash.',
      '⚡ Open express beverage-only pickup lane on lobby left side.',
      '🚪 Hold exit double-doors open 5 mins prior to show ending.'
    ];
  } else {
    visitorTips = [
      '🅿️ Park on Level B3 or use Valet service to avoid garage entry bottleneck.',
      '🍜 Dine during off-peak hours (3:00 PM – 5:00 PM) for immediate table seating.',
      '👗 Utilize self-checkout scan-and-go in store aisles for zero wait.'
    ];
    managerActions = [
      '📢 Update digital mall directory kiosks with live food court table availability.',
      '⚡ Open secondary security screening archways at Boulevard Entrance.',
      '🚗 Direct parking guidance LED indicators to available basement decks.'
    ];
  }

  return {
    environment: env,
    location,
    targetTime: decimalHour,
    targetTimeFormatted: decimalToTimeString(decimalHour),
    dateStr,
    expectedCrowd: stats.crowd,
    capacity: stats.capacity,
    expectedOccupancy: stats.occupancyPct,
    expectedWaitTime: stats.waitMin,
    congestionStatus: stats.status,
    confidence: 87,
    reasons: reasons || [
      'Historical crowd trajectory for this time window',
      'Arrival rate patterns detected from prior schedules',
      'Venue capacity limits and service throughput'
    ],
    // Rich recommendation suite
    recommendations: {
      summary: isHigh 
        ? `⚠️ High congestion predicted at ${location.name} around ${decimalToTimeString(decimalHour)} (${stats.occupancyPct}% occupancy, ${stats.waitMin} min wait).`
        : `🟢 Optimal conditions predicted at ${location.name} around ${decimalToTimeString(decimalHour)} (${stats.occupancyPct}% occupancy, ${stats.waitMin} min wait).`,
      primarySlot: {
        time: primaryBestSlot.timeFormatted,
        waitMin: primaryBestSlot.waitMin,
        occupancy: primaryBestSlot.occupancyPct,
        desc: `Shift arrival to ${primaryBestSlot.timeFormatted} to reduce wait time to only ${primaryBestSlot.waitMin} mins.`
      },
      secondarySlot: {
        time: secondaryBestSlot.timeFormatted,
        waitMin: secondaryBestSlot.waitMin,
        occupancy: secondaryBestSlot.occupancyPct,
        desc: `Early window at ${secondaryBestSlot.timeFormatted} (${secondaryBestSlot.waitMin} min wait).`
      },
      timeSavedPct,
      savedWaitTime,
      alternatives: alternatives.slice(0, 3),
      visitorTips,
      managerActions
    }
  };
}

/**
 * Generates a 24-point daytime continuous curve for Recharts
 */
export function getTimeSeriesForGraph(environmentId, locationId, currentDecimal, selectedDecimal) {
  const env = ENVIRONMENTS.find(e => e.id === environmentId) || ENVIRONMENTS[0];
  const location = env.locations.find(l => l.id === locationId) || env.locations[0];

  const hours = [
    8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5,
    12.0, 12.5, 13.0, 13.5, 14.0, 14.5, 15.0, 15.5,
    16.0, 16.5, 17.0, 17.5, 18.0, 19.0, 20.0
  ];

  return hours.map(h => {
    const stats = interpolateCrowd(location, h);
    const label = decimalToTimeString(h);

    const isNearCurrent = Math.abs(h - currentDecimal) <= 0.25;
    const isNearSelected = Math.abs(h - selectedDecimal) <= 0.25;

    return {
      time: label,
      rawHour: h,
      historicalCrowd: stats.crowd,
      currentCrowdMarker: isNearCurrent ? stats.crowd : null,
      predictedCrowdMarker: isNearSelected ? stats.crowd : null,
      capacity: location.capacity
    };
  });
}

/**
 * Runs a simple "What-If" simulation adding extra visitors
 */
export function runWhatIfSimulation(environmentId, locationId, selectedTimeStr, additionalVisitors = 100) {
  const env = ENVIRONMENTS.find(e => e.id === environmentId) || ENVIRONMENTS[0];
  const location = env.locations.find(l => l.id === locationId) || env.locations[0];

  const decimalHour = timeStringToDecimal(selectedTimeStr);
  const original = interpolateCrowd(location, decimalHour, 0);
  const scenario = interpolateCrowd(location, decimalHour, additionalVisitors);

  const isOverload = scenario.occupancyPct >= 85;

  return {
    environment: env,
    location,
    targetTimeFormatted: decimalToTimeString(decimalHour),
    additionalVisitors: Number(additionalVisitors),
    original: {
      crowd: original.crowd,
      occupancy: original.occupancyPct,
      wait: original.waitMin,
      status: original.status
    },
    scenario: {
      crowd: scenario.crowd,
      occupancy: scenario.occupancyPct,
      wait: scenario.waitMin,
      status: scenario.status
    },
    isOverload,
    recommendation: isOverload
      ? `⚠️ Adding +${additionalVisitors} people pushes ${location.name} into ${scenario.status.label} (${scenario.occupancyPct}%). FlowSafe suggests activating secondary service counters or diverting traffic to alternative areas.`
      : `✓ ${location.name} has enough headroom to absorb +${additionalVisitors} people safely (${scenario.occupancyPct}% occupancy).`
  };
}
