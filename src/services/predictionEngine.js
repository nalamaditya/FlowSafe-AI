import { ENVIRONMENTS } from '../data/environmentsData';

/**
 * Calculates deterministic crowd status and semantic badge colors based on occupancy %
 */
export function calculateStatus(occupancyPct, isClosed = false) {
  if (isClosed) {
    return {
      label: 'CLOSED',
      level: 'closed',
      dot: '⚪',
      color: '#94a3b8',
      badgeClass: 'bg-slate-100 text-slate-600 border-slate-300 font-bold',
      pillClass: 'bg-slate-400 text-white'
    };
  }

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
 * Strict Venue Operating Hours Matrix
 * - College Campus: Opens 7:30 AM, Classes start 9:00 AM, Ends 4:00 PM, Few stay till 6:00 PM, After 6:00 PM CLOSED.
 * - Hospital: Open 24/7 (Never Closed).
 * - Stadium: 10:00 AM to 11:00 PM.
 * - Movie Theatre: 10:00 AM to 11:30 PM.
 * - Shopping Mall: 10:00 AM to 11:00 PM.
 */
export const VENUE_OPERATING_HOURS = {
  campus: {
    name: 'College Campus',
    open: 7.5,        // Opens at 7:30 AM
    close: 18.0,      // Closes at 6:00 PM (Ends at 4:00 PM, few stay till 6:00 PM, after 6:00 PM CLOSED)
    coreStart: 9.0,   // Classes start at 9:00 AM (mostly students come at 9)
    coreEnd: 16.0,    // Classes end at 4:00 PM
    openStr: '7:30 AM',
    closeStr: '6:00 PM',
    is24_7: false,
    activeSlots: [9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 13.0, 14.0, 14.5, 15.0, 15.5]
  },
  hospital: {
    name: 'Hospital & Healthcare',
    open: 0.0,        // Open 24/7
    close: 24.0,
    coreStart: 0.0,
    coreEnd: 24.0,
    openStr: 'Open 24/7',
    closeStr: 'Open 24/7',
    is24_7: true,
    activeSlots: [8.5, 9.0, 10.0, 11.0, 11.5, 14.0, 14.5, 15.5, 17.0, 19.0, 21.0]
  },
  stadium: {
    name: 'Sports Stadium',
    open: 10.0,       // 10:00 AM
    close: 23.0,      // 11:00 PM
    coreStart: 14.0,
    coreEnd: 21.0,
    openStr: '10:00 AM',
    closeStr: '11:00 PM',
    is24_7: false,
    activeSlots: [11.0, 12.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.5, 20.0, 21.0]
  },
  cinema: {
    name: 'Movie Theatre',
    open: 10.0,       // 10:00 AM
    close: 23.5,      // 11:30 PM
    coreStart: 11.0,
    coreEnd: 23.0,
    openStr: '10:00 AM',
    closeStr: '11:30 PM',
    is24_7: false,
    activeSlots: [11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0]
  },
  mall: {
    name: 'Shopping Mall',
    open: 10.0,       // 10:00 AM
    close: 23.0,      // 11:00 PM
    coreStart: 11.0,
    coreEnd: 21.5,
    openStr: '10:00 AM',
    closeStr: '11:00 PM',
    is24_7: false,
    activeSlots: [10.5, 11.0, 12.0, 14.0, 15.0, 16.0, 17.0, 18.5, 20.0, 21.0]
  }
};

/**
 * Smoothly interpolates the crowd for a given location at any decimal hour,
 * strictly respecting venue operating hours.
 */
export function interpolateCrowd(location, decimalHour, extraVisitors = 0, environmentId = 'campus') {
  const venueHours = VENUE_OPERATING_HOURS[environmentId] || VENUE_OPERATING_HOURS.campus;
  const capacity = location.capacity || 200;

  // Check if venue is closed
  const isClosed = !venueHours.is24_7 && (decimalHour < venueHours.open || decimalHour > venueHours.close);

  if (isClosed) {
    return {
      crowd: 0,
      capacity,
      occupancyPct: 0,
      waitMin: 0,
      isClosed: true,
      status: calculateStatus(0, true)
    };
  }

  const hourly = location.hourly || {};
  const keys = Object.keys(hourly).sort((a, b) => timeStringToDecimal(a) - timeStringToDecimal(b));

  if (!keys.length) {
    return { 
      crowd: 50, 
      capacity, 
      occupancyPct: 25, 
      waitMin: 2, 
      isClosed: false, 
      status: calculateStatus(25, false) 
    };
  }

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
  if (t2 > t1 && decimalHour >= t1 && decimalHour <= t2) {
    const ratio = (decimalHour - t1) / (t2 - t1);
    rawCrowd = v1 + (v2 - v1) * ratio;
  } else if (decimalHour < t1) {
    const ratio = Math.max(0.1, (decimalHour - venueHours.open) / (t1 - venueHours.open || 1));
    rawCrowd = Math.round(v1 * ratio);
  } else if (decimalHour > t2) {
    const ratio = Math.max(0.05, (venueHours.close - decimalHour) / (venueHours.close - t2 || 1));
    rawCrowd = Math.round(v2 * ratio);
  }

  const baseCrowd = Math.round(rawCrowd);
  const totalCrowd = Math.max(2, baseCrowd + Number(extraVisitors));
  const occupancyPct = Math.min(100, Math.round((totalCrowd / capacity) * 100));

  let waitMin = Math.round((occupancyPct / 100) * (location.baselineWaitMin || 15));
  if (occupancyPct < 30) waitMin = Math.max(1, Math.round(waitMin * 0.3));

  const status = calculateStatus(occupancyPct, false);

  return {
    crowd: totalCrowd,
    capacity,
    occupancyPct,
    waitMin,
    isClosed: false,
    status
  };
}

/**
 * Calculates live crowd trend and real-time recommendation ("Can I go there now, or should I wait?")
 */
export function calculateLiveRecommendation(location, decimalHour, environmentId = 'campus') {
  const venueHours = VENUE_OPERATING_HOURS[environmentId] || VENUE_OPERATING_HOURS.campus;
  const isClosed = !venueHours.is24_7 && (decimalHour < venueHours.open || decimalHour > venueHours.close);

  if (isClosed) {
    const trend = {
      label: 'Closed',
      symbol: '—',
      direction: 'closed',
      textClass: 'text-slate-400 font-medium',
      badgeClass: 'bg-slate-100 text-slate-500 border-slate-200'
    };
    const action = {
      statusText: 'Venue Closed',
      statusIcon: '🔒',
      style: 'bg-slate-50 text-slate-700 border-slate-200',
      titleColor: 'text-slate-700',
      explanation: `Venue is currently closed. Operating hours are ${venueHours.openStr} – ${venueHours.closeStr}.`,
      bestTime: venueHours.openStr,
      waitMinutes: null
    };
    return { trend, action, isClosed: true };
  }

  const current = interpolateCrowd(location, decimalHour, 0, environmentId);
  const next10m = interpolateCrowd(location, Math.min(venueHours.close, decimalHour + 10 / 60), 0, environmentId);
  const next20m = interpolateCrowd(location, Math.min(venueHours.close, decimalHour + 20 / 60), 0, environmentId);

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

  // Look ahead 15 to 120 mins strictly within venue operating hours
  const forwardOffsets = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
  const upcomingSlots = forwardOffsets
    .map(offset => {
      const h = decimalHour + offset;
      if (h > venueHours.close || h < venueHours.open) return null;
      const stat = interpolateCrowd(location, h, 0, environmentId);
      return {
        hour: h,
        offsetMinutes: Math.round(offset * 60),
        timeFormatted: decimalToTimeString(h),
        ...stat
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.occupancyPct - b.occupancyPct);

  const fallbackHour = Math.min(venueHours.close, Math.max(venueHours.open, decimalHour + 0.5));
  const bestSlot = upcomingSlots[0] || {
    hour: fallbackHour,
    offsetMinutes: 30,
    timeFormatted: decimalToTimeString(fallbackHour),
    occupancyPct: 30
  };

  let action;

  // Special Case A: Campus early opening window (7:30 AM to 8:45 AM before 9:00 AM college start)
  if (environmentId === 'campus' && decimalHour >= 7.5 && decimalHour < 8.75) {
    action = {
      statusText: 'Good to go now (Early Window)',
      statusIcon: '✅',
      style: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      titleColor: 'text-emerald-700',
      explanation: 'Campus opened at 7:30 AM. Classes start at 9:00 AM. Near-zero crowds right now.',
      bestTime: null,
      waitMinutes: null
    };
  }
  // Special Case B: Campus evening after-classes window (4:00 PM to 6:00 PM)
  else if (environmentId === 'campus' && decimalHour >= 16.0 && decimalHour <= 18.0) {
    action = {
      statusText: 'Good to go now (Evening Lull)',
      statusIcon: '✅',
      style: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      titleColor: 'text-emerald-700',
      explanation: 'Classes ended at 4:00 PM. Few students remaining. Campus closes at 6:00 PM.',
      bestTime: null,
      waitMinutes: null
    };
  }
  // Case 1: Low crowd (< 45%)
  else if (current.occupancyPct < 45) {
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
    action,
    isClosed: false
  };
}

/**
 * Gets the simulated real-time crowd status for all locations in an environment
 */
export function getEnvironmentLiveNow(environmentId, decimalHour) {
  const env = ENVIRONMENTS.find(e => e.id === environmentId) || ENVIRONMENTS[0];

  const locationsData = env.locations.map(loc => {
    const stats = interpolateCrowd(loc, decimalHour, 0, environmentId);
    const liveInsight = calculateLiveRecommendation(loc, decimalHour, environmentId);

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
  const stats = interpolateCrowd(location, decimalHour, 0, environmentId);
  const venueHours = VENUE_OPERATING_HOURS[env.id] || VENUE_OPERATING_HOURS.campus;

  const isHigh = stats.occupancyPct >= 65;
  const reasons = isHigh ? location.reasonsHigh : location.reasonsLow;

  // Find alternative locations in the same environment that have low/moderate crowd
  const alternatives = env.locations
    .filter(l => l.id !== location.id)
    .map(l => {
      const altStats = interpolateCrowd(l, decimalHour, 0, environmentId);
      return {
        id: l.id,
        name: l.name,
        icon: l.icon,
        description: l.description,
        ...altStats
      };
    })
    .sort((a, b) => a.occupancyPct - b.occupancyPct);

  // Find optimal time windows strictly within the venue's active operating hours
  const testHours = venueHours.activeSlots;
  const optimalSlots = testHours
    .filter(h => h >= venueHours.open && h <= venueHours.close && Math.abs(h - decimalHour) >= 0.75)
    .map(h => ({
      hour: h,
      timeFormatted: decimalToTimeString(h),
      ...interpolateCrowd(location, h, 0, environmentId)
    }))
    .filter(slot => slot.occupancyPct < 55)
    .sort((a, b) => a.occupancyPct - b.occupancyPct);

  const defaultSlot1 = env.id === 'campus'
    ? { timeFormatted: '10:30 AM', waitMin: 2, occupancyPct: 18 }
    : { timeFormatted: '2:30 PM', waitMin: 4, occupancyPct: 35 };

  const defaultSlot2 = env.id === 'campus'
    ? { timeFormatted: '2:15 PM', waitMin: 3, occupancyPct: 24 }
    : { timeFormatted: '11:30 AM', waitMin: 3, occupancyPct: 28 };

  const primaryBestSlot = optimalSlots[0] || defaultSlot1;
  const secondaryBestSlot = optimalSlots[1] || defaultSlot2;

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
      '⏱️ Arrive 15 minutes before 9:00 AM class start or wait 20 minutes post-bell.'
    ];
    managerActions = [
      '🚪 Open Auxiliary Counter 3 and Food Court 2 Annex 15 mins before lunch rush.',
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
      '🚑 Ensure Emergency triage red-corridor remains 100% physically unobstructed 24/7.',
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

  // Summary message with closed state handling
  let summaryMsg = isHigh 
    ? `⚠️ High congestion predicted at ${location.name} around ${decimalToTimeString(decimalHour)} (${stats.occupancyPct}% occupancy, ${stats.waitMin} min wait).`
    : `🟢 Optimal conditions predicted at ${location.name} around ${decimalToTimeString(decimalHour)} (${stats.occupancyPct}% occupancy, ${stats.waitMin} min wait).`;

  if (stats.isClosed) {
    summaryMsg = `🔒 ${location.name} is scheduled to be CLOSED at ${decimalToTimeString(decimalHour)}. Operating hours are ${venueHours.openStr} – ${venueHours.closeStr}.`;
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
    isClosed: stats.isClosed,
    confidence: 87,
    reasons: stats.isClosed
      ? [`Venue is closed outside operating hours (${venueHours.openStr} – ${venueHours.closeStr})`, 'No active classes or scheduled sessions during this window', 'Security perimeter locked']
      : (reasons || [
          'Historical crowd trajectory for this time window',
          'Arrival rate patterns detected from prior schedules',
          'Venue capacity limits and service throughput'
        ]),
    recommendations: {
      summary: summaryMsg,
      primarySlot: {
        time: primaryBestSlot.timeFormatted,
        waitMin: primaryBestSlot.waitMin,
        occupancy: primaryBestSlot.occupancyPct,
        desc: stats.isClosed 
          ? `Venue opens at ${venueHours.openStr}. Best low-crowd visiting window is at ${primaryBestSlot.timeFormatted}.`
          : `Shift arrival to ${primaryBestSlot.timeFormatted} to reduce wait time to only ${primaryBestSlot.waitMin} mins.`
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
 * Generates a high-resolution time series dataset for Recharts area graph
 */
export function getTimeSeriesForGraph(environmentId, locationId, currentDecimalHour, targetDecimalHour) {
  const env = ENVIRONMENTS.find(e => e.id === environmentId) || ENVIRONMENTS[0];
  const location = env.locations.find(l => l.id === locationId) || env.locations[0];

  const points = [];
  for (let h = 0; h < 24; h += 0.5) {
    const stats = interpolateCrowd(location, h, 0, environmentId);
    points.push({
      hourDecimal: h,
      time: decimalToTimeString(h),
      crowd: stats.crowd,
      historicalCrowd: stats.crowd,
      capacity: stats.capacity,
      occupancyPct: stats.occupancyPct,
      waitMin: stats.waitMin,
      isClosed: stats.isClosed,
      statusLabel: stats.status.label,
      statusColor: stats.status.color,
      isTarget: Math.abs(h - targetDecimalHour) < 0.25,
      isLive: Math.abs(h - currentDecimalHour) < 0.25
    });
  }
  return points;
}

/**
 * Generates a 24-point continuous curve for Recharts (0:00 to 23:00)
 */
export function generate24HourCurve(location, environmentId = 'campus') {
  const points = [];
  for (let h = 0; h < 24; h += 1) {
    const stats = interpolateCrowd(location, h, 0, environmentId);
    points.push({
      hourDecimal: h,
      timeFormatted: decimalToTimeString(h),
      crowd: stats.crowd,
      capacity: stats.capacity,
      occupancyPct: stats.occupancyPct,
      waitMin: stats.waitMin,
      isClosed: stats.isClosed,
      statusLabel: stats.status.label,
      statusColor: stats.status.color
    });
  }
  return points;
}

/**
 * What-If scenario simulation engine
 */
export function runWhatIfSimulation(environmentId, locationId, baseDecimalHour, addedSurgeCount = 0) {
  const env = ENVIRONMENTS.find(e => e.id === environmentId) || ENVIRONMENTS[0];
  const location = env.locations.find(l => l.id === locationId) || env.locations[0];

  const originalStats = interpolateCrowd(location, baseDecimalHour, 0, environmentId);
  const scenarioStats = interpolateCrowd(location, baseDecimalHour, addedSurgeCount, environmentId);

  const deltaCrowd = scenarioStats.crowd - originalStats.crowd;
  const deltaOccupancy = scenarioStats.occupancyPct - originalStats.occupancyPct;
  const deltaWait = scenarioStats.waitMin - originalStats.waitMin;

  const isOverload = scenarioStats.occupancyPct >= 85;
  const isCritical = scenarioStats.occupancyPct >= 100;

  // Find lowest density alternative
  const otherLocations = env.locations
    .filter(l => l.id !== location.id)
    .map(l => ({
      ...l,
      ...interpolateCrowd(l, baseDecimalHour, 0, environmentId)
    }))
    .sort((a, b) => a.occupancyPct - b.occupancyPct);

  const bestAlt = otherLocations[0] || null;
  const divertCount = Math.round(Number(addedSurgeCount) * 0.45);
  const mitigatedCrowd = Math.max(originalStats.crowd, scenarioStats.crowd - divertCount);
  const mitigatedOccupancy = Math.min(100, Math.round((mitigatedCrowd / location.capacity) * 100));
  const mitigatedWait = Math.max(originalStats.waitMin, Math.round((mitigatedOccupancy / 100) * (location.baselineWaitMin || 15)));
  const mitigatedStatus = calculateStatus(mitigatedOccupancy, scenarioStats.isClosed);

  let physicalDirectives = [];
  if (isCritical) {
    physicalDirectives = [
      `🚨 Implement Emergency Metering: Hold ingress at turnstiles for 90-second pulse intervals.`,
      `📢 Digital Redirection: Flash directional LED guidance diverting ${divertCount} visitors to ${bestAlt ? bestAlt.name : 'auxiliary areas'}.`,
      `🛡️ Deploy 3 floor marshals to maintain one-way circulation and keep fire exit aisles clear.`
    ];
  } else if (isOverload) {
    physicalDirectives = [
      `⚡ Open 2 auxiliary service counters immediately to increase throughput.`,
      `📢 Broadcast mobile alerts advising arriving visitors of a ${scenarioStats.waitMin}-minute delay.`,
      `🚶 Stagger incoming group batches by 15 minutes.`
    ];
  } else {
    physicalDirectives = [
      `🟢 Standard Flow: Current infrastructure safely absorbs this influx with ${100 - scenarioStats.occupancyPct}% headroom buffer.`,
      `📊 Continuous Monitoring: Keep secondary entry gates on standby.`
    ];
  }

  return {
    environment: env,
    location,
    baseHour: baseDecimalHour,
    baseHourFormatted: decimalToTimeString(baseDecimalHour),
    addedSurgeCount: Number(addedSurgeCount),
    original: originalStats,
    scenario: scenarioStats,
    mitigated: {
      crowd: mitigatedCrowd,
      occupancy: mitigatedOccupancy,
      wait: mitigatedWait,
      status: mitigatedStatus,
      timeSavedPct: scenarioStats.waitMin > 0 ? Math.round(((scenarioStats.waitMin - mitigatedWait) / scenarioStats.waitMin) * 100) : 0
    },
    deltaCrowd,
    deltaOccupancy,
    deltaWait,
    isOverload,
    isCritical,
    bestAlternative: bestAlt,
    divertCount,
    physicalDirectives,
    recommendation: isOverload
      ? `🚨 SURGE HAZARD: +${addedSurgeCount} visitors pushes ${location.name} to ${scenarioStats.occupancyPct}% capacity (${scenarioStats.waitMin} min wait). Active FlowSafe balancing offloads ${divertCount} people to ${bestAlt ? bestAlt.name : 'other zones'} to restore safe 62% density.`
      : `🟢 RESILIENT: Added surge of +${addedSurgeCount} is safely accommodated at ${scenarioStats.occupancyPct}% occupancy with ${scenarioStats.waitMin} min queue.`
  };
}
