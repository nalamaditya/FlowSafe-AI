// Simple-language data for all 16 venues
export const VENUE_DETAILS = {
  campus: {
    id: 'campus',
    name: 'College & University Campus',
    icon: '🏫',
    tagline: 'Student Flow & Zone Heatmap',
    capacity: 8000,
    unitName: 'Students & Faculty',
    currentCrowd: 5420,
    summary: 'Predicts student rush between classes, canteen lunchtime crowding, and auditorium event overflows.',
    zones: [
      { id: 'canteen', name: 'Main Canteen / Cafeteria', current: 1420, capacity: 1500, pct: 95, wait: '18 min', status: 'Choked', level: 'critical', x: 220, y: 150, width: 160, height: 110, pred15: 1490, predNote: 'Lunch break rush peaking in 10 mins' },
      { id: 'auditorium', name: 'Grand Auditorium', current: 1850, capacity: 2000, pct: 92, wait: '15 min', status: 'Choked', level: 'critical', x: 440, y: 150, width: 180, height: 120, pred15: 1980, predNote: 'Hackathon / Ideathon keynote starting soon' },
      { id: 'library', name: 'Central Digital Library', current: 450, capacity: 1500, pct: 30, wait: '0 min', status: 'Free', level: 'low', x: 220, y: 320, width: 150, height: 100, pred15: 520, predNote: 'Lots of empty seating & study space' },
      { id: 'labs', name: 'Engineering & AI Labs', current: 620, capacity: 1200, pct: 51, wait: '2 min', status: 'Normal', level: 'moderate', x: 450, y: 320, width: 160, height: 100, pred15: 680, predNote: 'Lab sessions operating normally' },
      { id: 'gate_main', name: 'Campus Main Gate', current: 1080, capacity: 1800, pct: 60, wait: '5 min', status: 'Normal', level: 'moderate', x: 330, y: 470, width: 140, height: 70, pred15: 1250, predNote: 'Buses arriving with day scholars' },
    ],
    redistribution: {
      problem: 'Main Canteen is 95% choked and Auditorium entrance has a 15-minute bottleneck.',
      solution: 'Divert 450 students to South Food Court 2 and open Auditorium Side Doors 15 minutes before keynote.',
      beforeRisk: 95,
      afterRisk: 68,
      beforeWait: '18 mins',
      afterWait: '6 mins'
    }
  },
  stadium: {
    id: 'stadium',
    name: 'Sports Stadium',
    icon: '🏟️',
    tagline: 'Match Day Perimeter & Entrances',
    capacity: 16000,
    unitName: 'Spectators',
    currentCrowd: 8000,
    summary: 'Balances fan arrivals across 4 perimeter gates to prevent turnstile bottlenecks before kickoff.',
    zones: [
      { id: 'gate_a', name: 'Gate A (North Entrance)', current: 1200, capacity: 4000, pct: 30, wait: '4 min', status: 'Free', level: 'low' },
      { id: 'gate_b', name: 'Gate B (East Entrance)', current: 3800, capacity: 4500, pct: 84, wait: '14 min', status: 'Choked', level: 'critical' },
      { id: 'gate_c', name: 'Gate C (South Entrance)', current: 900, capacity: 3500, pct: 26, wait: '5 min', status: 'Free', level: 'low' },
      { id: 'gate_d', name: 'Gate D (West Entrance)', current: 2100, capacity: 4000, pct: 52, wait: '9 min', status: 'Normal', level: 'moderate' },
    ],
    redistribution: {
      problem: 'Gate B is at 84% and will hit 96% critical choke in 12 minutes.',
      solution: 'Reroute 1,125 arriving spectators to Gate A and Gate C which have 70%+ empty capacity.',
      beforeRisk: 96,
      afterRisk: 71,
      beforeWait: '24 mins',
      afterWait: '11 mins'
    }
  },
  airport: {
    id: 'airport',
    name: 'Airport Terminal',
    icon: '✈️',
    tagline: 'Security Checkpoints & Boarding Gates',
    capacity: 18000,
    unitName: 'Passengers',
    currentCrowd: 9200,
    summary: 'Predicts passenger buildup at baggage drop, TSA security lines, and terminal piers.',
    zones: [
      { id: 'sec_main', name: 'Main Security Checkpoint A', current: 4200, capacity: 4500, pct: 93, wait: '28 min', status: 'Choked', level: 'critical' },
      { id: 'sec_fast', name: 'Express Checkpoint B (T2)', current: 1100, capacity: 3500, pct: 31, wait: '6 min', status: 'Free', level: 'low' },
      { id: 'concourse_a', name: 'Gates 1–25 Boarding Concourse', current: 2400, capacity: 5000, pct: 48, wait: '4 min', status: 'Normal', level: 'moderate' },
      { id: 'duty_free', name: 'Duty Free Central Lounge', current: 1500, capacity: 5000, pct: 30, wait: '0 min', status: 'Free', level: 'low' },
    ],
    redistribution: {
      problem: 'Checkpoint A has a 28-minute queue due to 3 simultaneous international flights.',
      solution: 'Direct passengers via mobile app and digital flight boards to Checkpoint B (6 min wait).',
      beforeRisk: 93,
      afterRisk: 62,
      beforeWait: '28 mins',
      afterWait: '8 mins'
    }
  },
  metro: {
    id: 'metro',
    name: 'Metro Station',
    icon: '🚇',
    tagline: 'Turnstiles & Interchange Platforms',
    capacity: 10000,
    unitName: 'Commuters',
    currentCrowd: 6800,
    summary: 'Manages peak rush hour interchange crowds between train lines.',
    zones: [
      { id: 'transfer_tunnel', name: 'Line 1 ➔ Line 2 Transfer Tunnel', current: 3600, capacity: 3800, pct: 94, wait: '12 min', status: 'Choked', level: 'critical' },
      { id: 'main_turnstiles', name: 'Main Street AFC Turnstiles', current: 1800, capacity: 3000, pct: 60, wait: '5 min', status: 'Normal', level: 'moderate' },
      { id: 'platform_blue', name: 'Eastbound Platform Deck', current: 900, capacity: 2000, pct: 45, wait: '3 min', status: 'Free', level: 'low' },
      { id: 'exit_mall', name: 'Mall Direct Underground Exit', current: 500, capacity: 1200, pct: 41, wait: '1 min', status: 'Free', level: 'low' },
    ],
    redistribution: {
      problem: 'Transfer tunnel stairs are jammed with a 12-minute bottleneck during office rush hour.',
      solution: 'Direct transferring commuters to the North Escalator walkway to balance movement.',
      beforeRisk: 94,
      afterRisk: 65,
      beforeWait: '12 mins',
      afterWait: '4 mins'
    }
  },
  hospital: {
    id: 'hospital',
    name: 'Hospital & Healthcare Hub',
    icon: '🏥',
    tagline: 'OPD, Pharmacy & Emergency Corridors',
    capacity: 6000,
    unitName: 'Patients & Visitors',
    currentCrowd: 3800,
    summary: 'Prevents waiting room crowding while keeping emergency ambulance paths 100% clear.',
    zones: [
      { id: 'opd_hall', name: 'Central OPD Waiting Hall', current: 1900, capacity: 2000, pct: 95, wait: '35 min', status: 'Choked', level: 'critical' },
      { id: 'pharmacy', name: 'Main Pharmacy Dispensation Counter', current: 950, capacity: 1200, pct: 79, wait: '18 min', status: 'Busy', level: 'high' },
      { id: 'diagnostics', name: 'Diagnostics & Lab Waiting Lounge', current: 450, capacity: 1400, pct: 32, wait: '4 min', status: 'Free', level: 'low' },
      { id: 'emergency_bay', name: 'Emergency & Ambulance Bay', current: 500, capacity: 1400, pct: 35, wait: '0 min', status: 'Clear 🟢', level: 'low' },
    ],
    redistribution: {
      problem: 'OPD hall is 95% full with 35-minute doctor consultation delays.',
      solution: 'Stagger token call numbers and redirect waiting patients to the East Atrium Lounge.',
      beforeRisk: 95,
      afterRisk: 60,
      beforeWait: '35 mins',
      afterWait: '12 mins'
    }
  },
  mall: {
    id: 'mall',
    name: 'Shopping Mall',
    icon: '🛍️',
    tagline: 'Food Court & Atrium Walkways',
    capacity: 12000,
    unitName: 'Shoppers',
    currentCrowd: 7400,
    summary: 'Reduces food court rush and cinema interval crowd bottlenecks.',
    zones: [
      { id: 'food_court', name: 'Level 4 Food Court', current: 3600, capacity: 3800, pct: 94, wait: '22 min', status: 'Choked', level: 'critical' },
      { id: 'multiplex', name: 'Cinema Lobby & Box Office', current: 1400, capacity: 2500, pct: 56, wait: '6 min', status: 'Normal', level: 'moderate' },
      { id: 'atrium', name: 'Ground Floor Event Atrium', current: 1500, capacity: 3500, pct: 42, wait: '2 min', status: 'Free', level: 'low' },
      { id: 'anchor_store', name: 'Hypermarket Anchor Wing', current: 900, capacity: 2200, pct: 40, wait: '3 min', status: 'Free', level: 'low' },
    ],
    redistribution: {
      problem: 'Level 4 Food Court has reached 94% capacity with long ordering lines.',
      solution: 'Send mobile offers for Ground Floor cafes and open Level 3 seating.',
      beforeRisk: 94,
      afterRisk: 64,
      beforeWait: '22 mins',
      afterWait: '8 mins'
    }
  },
  railway: {
    id: 'railway',
    name: 'Railway Station',
    icon: '🚉',
    tagline: 'Platforms & Overhead Footbridges',
    capacity: 15000,
    unitName: 'Passengers',
    currentCrowd: 9100,
    summary: 'Manages platform footbridge congestion when two express trains arrive at once.',
    zones: [
      { id: 'bridge_central', name: 'Main Platform 1–4 Footbridge', current: 4400, capacity: 4600, pct: 95, wait: '16 min', status: 'Choked', level: 'critical' },
      { id: 'bridge_south', name: 'South Overbridge Walkway', current: 1200, capacity: 4000, pct: 30, wait: '2 min', status: 'Free', level: 'low' },
      { id: 'ticket_hall', name: 'Central Ticket Concourse', current: 2100, capacity: 3500, pct: 60, wait: '7 min', status: 'Normal', level: 'moderate' },
      { id: 'platform_5_8', name: 'Platforms 5–8 (Regional Lines)', current: 1400, capacity: 2900, pct: 48, wait: '3 min', status: 'Normal', level: 'moderate' },
    ],
    redistribution: {
      problem: 'Main footbridge is crowded to 95% as passengers rush for connecting trains.',
      solution: 'Display dynamic overhead signs directing commuters to the South Overbridge.',
      beforeRisk: 95,
      afterRisk: 58,
      beforeWait: '16 mins',
      afterWait: '4 mins'
    }
  },
  concert: {
    id: 'concert',
    name: 'Concert & Arena',
    icon: '🎵',
    tagline: 'Standing Pit & General Entry',
    capacity: 14000,
    unitName: 'Music Fans',
    currentCrowd: 8500,
    summary: 'Prevents front-stage surge and balances entry turnstiles during headliner doors opening.',
    zones: [
      { id: 'pit', name: 'Front Standing Pit', current: 3800, capacity: 4000, pct: 95, wait: '20 min', status: 'Choked', level: 'critical' },
      { id: 'entry_main', name: 'Plaza Main Entrance', current: 2800, capacity: 4500, pct: 62, wait: '12 min', status: 'Normal', level: 'moderate' },
      { id: 'balcony', name: 'Upper Tier Seating', current: 1100, capacity: 3500, pct: 31, wait: '3 min', status: 'Free', level: 'low' },
      { id: 'merch', name: 'Merchandise Booth Plaza', current: 800, capacity: 2000, pct: 40, wait: '5 min', status: 'Free', level: 'low' },
    ],
    redistribution: {
      problem: 'Front Standing Pit is nearing maximum limit with intense forward crowd pressure.',
      solution: 'Temporarily close Pit entry gate and open side holding barriers with security marshals.',
      beforeRisk: 95,
      afterRisk: 70,
      beforeWait: '20 mins',
      afterWait: '7 mins'
    }
  },
  exhibition: {
    id: 'exhibition',
    name: 'Exhibition & Expo Center',
    icon: '🎪',
    tagline: 'Trade Pavilions & Keynotes',
    capacity: 20000,
    unitName: 'Delegates',
    currentCrowd: 11000,
    summary: 'Distributes attendee traffic across robotics, tech, and startup exhibition halls.',
    zones: [
      { id: 'hall_ai', name: 'Hall 1: AI & Robotics Pavilion', current: 5200, capacity: 5500, pct: 94, wait: '18 min', status: 'Choked', level: 'critical' },
      { id: 'keynote', name: 'Main Keynote Theater', current: 3200, capacity: 6000, pct: 53, wait: '6 min', status: 'Normal', level: 'moderate' },
      { id: 'startup_village', name: 'Hall 3: Startup Village', current: 1600, capacity: 5000, pct: 32, wait: '2 min', status: 'Free', level: 'low' },
      { id: 'reg_desk', name: 'Registration & Badge Counters', current: 1000, capacity: 3500, pct: 28, wait: '3 min', status: 'Free', level: 'low' },
    ],
    redistribution: {
      problem: 'Hall 1 is crowded with attendees queuing for demo booths.',
      solution: 'Announce live product showcases in Hall 3 to draw footfall across the venue.',
      beforeRisk: 94,
      afterRisk: 65,
      beforeWait: '18 mins',
      afterWait: '6 mins'
    }
  },
  festival: {
    id: 'festival',
    name: 'Cultural Festival & Mela',
    icon: '🎉',
    tagline: 'Open Grounds & Food Street',
    capacity: 25000,
    unitName: 'Visitors',
    currentCrowd: 14500,
    summary: 'Guides open-air festival crowds away from narrow food alleys and stage chokes.',
    zones: [
      { id: 'food_street', name: 'Central Food Stall Street', current: 7100, capacity: 7500, pct: 94, wait: '25 min', status: 'Choked', level: 'critical' },
      { id: 'main_stage', name: 'Main Cultural Stage Lawn', current: 4500, capacity: 10000, pct: 45, wait: '4 min', status: 'Free', level: 'low' },
      { id: 'crafts', name: 'Handicraft & Art Pavilion', current: 1900, capacity: 5000, pct: 38, wait: '2 min', status: 'Free', level: 'low' },
      { id: 'gate_west', name: 'West Shuttle Parking Gate', current: 1000, capacity: 2500, pct: 40, wait: '3 min', status: 'Free', level: 'low' },
    ],
    redistribution: {
      problem: 'Narrow food street is packed with a 25-minute queue at food counters.',
      solution: 'Activate the East Lawn Food Court and guide crowds through LED directional boards.',
      beforeRisk: 94,
      afterRisk: 62,
      beforeWait: '25 mins',
      afterWait: '8 mins'
    }
  },
  religious: {
    id: 'religious',
    name: 'Religious Gathering & Temple',
    icon: '🛕',
    tagline: 'Darshan Queue Complex',
    capacity: 22000,
    unitName: 'Devotees',
    currentCrowd: 13800,
    summary: 'Manages serpentine holding compartments and darshan sanctum flow smoothly.',
    zones: [
      { id: 'sanctum', name: 'Inner Sanctum Queue Corridor', current: 5800, capacity: 6000, pct: 96, wait: '45 min', status: 'Choked', level: 'critical' },
      { id: 'holding_bay', name: 'Serpentine Holding Sheds', current: 4800, capacity: 8000, pct: 60, wait: '15 min', status: 'Normal', level: 'moderate' },
      { id: 'outer_path', name: 'Outer Circumambulation Walk', current: 2100, capacity: 5000, pct: 42, wait: '5 min', status: 'Free', level: 'low' },
      { id: 'prasad_counter', name: 'Prasad Distribution Hall', current: 1100, capacity: 3000, pct: 36, wait: '4 min', status: 'Free', level: 'low' },
    ],
    redistribution: {
      problem: 'Inner Sanctum line is 96% saturated with a 45-minute wait time.',
      solution: 'Regulate batch releases from Serpentine Compartment 2 to maintain smooth non-stop movement.',
      beforeRisk: 96,
      afterRisk: 69,
      beforeWait: '45 mins',
      afterWait: '18 mins'
    }
  },
  amusement: {
    id: 'amusement',
    name: 'Amusement & Theme Park',
    icon: '🎡',
    tagline: 'Ride Standby Lines & Parades',
    capacity: 16000,
    unitName: 'Park Visitors',
    currentCrowd: 9800,
    summary: 'Balances queue wait times across rollercoasters and theme lands.',
    zones: [
      { id: 'rollercoaster', name: 'Hyper-Coaster Standby Line', current: 3800, capacity: 4000, pct: 95, wait: '50 min', status: 'Choked', level: 'critical' },
      { id: 'water_ride', name: 'Water Splash Adventure', current: 1400, capacity: 3500, pct: 40, wait: '10 min', status: 'Free', level: 'low' },
      { id: 'castle_plaza', name: 'Main Promenade & Castle Plaza', current: 2800, capacity: 5000, pct: 56, wait: '5 min', status: 'Normal', level: 'moderate' },
      { id: 'kiddie_land', name: 'Fantasy Kids Kingdom', current: 1800, capacity: 3500, pct: 51, wait: '8 min', status: 'Normal', level: 'moderate' },
    ],
    redistribution: {
      problem: 'Hyper-Coaster line is 50 minutes long while Water Splash is nearly empty.',
      solution: 'Send park mobile app push notifications with Fast-Pass discounts to the Water Splash zone.',
      beforeRisk: 95,
      afterRisk: 65,
      beforeWait: '50 mins',
      afterWait: '20 mins'
    }
  },
  government: {
    id: 'government',
    name: 'Government Civic Center',
    icon: '🏛️',
    tagline: 'Public Grievance & Licensing Halls',
    capacity: 6000,
    unitName: 'Citizens & Visitors',
    currentCrowd: 3600,
    summary: 'Prevents crowded waiting lines for civic document and license processing.',
    zones: [
      { id: 'doc_hall', name: 'Public Document Processing Hall', current: 1850, capacity: 2000, pct: 92, wait: '30 min', status: 'Choked', level: 'critical' },
      { id: 'sec_gate', name: 'Main Entrance Biometric Check', current: 900, capacity: 1500, pct: 60, wait: '8 min', status: 'Normal', level: 'moderate' },
      { id: 'hearing_room', name: 'Public Hearing Gallery', current: 500, capacity: 1500, pct: 33, wait: '2 min', status: 'Free', level: 'low' },
      { id: 'annex', name: 'Citizen Help Annex', current: 350, capacity: 1000, pct: 35, wait: '2 min', status: 'Free', level: 'low' },
    ],
    redistribution: {
      problem: 'Document Processing Hall is 92% packed with a 30-minute queue.',
      solution: 'Open 4 supplementary counters in Citizen Help Annex and direct token numbers 150–220 there.',
      beforeRisk: 92,
      afterRisk: 58,
      beforeWait: '30 mins',
      afterWait: '9 mins'
    }
  },
  bus_terminal: {
    id: 'bus_terminal',
    name: 'Bus Terminal Hub',
    icon: '🚌',
    tagline: 'Interstate Bays & Concourse',
    capacity: 10000,
    unitName: 'Travelers',
    currentCrowd: 6200,
    summary: 'Prevents passenger pileups at departure bays during Friday evening weekend rush.',
    zones: [
      { id: 'interstate_bays', name: 'Interstate Long-Distance Bays 1–10', current: 3700, capacity: 4000, pct: 92, wait: '18 min', status: 'Choked', level: 'critical' },
      { id: 'city_bays', name: 'City Feeder Local Bus Bays', current: 1200, capacity: 3000, pct: 40, wait: '4 min', status: 'Free', level: 'low' },
      { id: 'waiting_hall', name: 'Central Ticketing Waiting Hall', current: 1300, capacity: 3000, pct: 43, wait: '5 min', status: 'Normal', level: 'moderate' },
    ],
    redistribution: {
      problem: 'Interstate Bays are 92% full with passenger queues blocking the pedestrian walkway.',
      solution: 'Shift 3 departure buses to auxiliary Bays 15–18 and update terminal announcement screens.',
      beforeRisk: 92,
      afterRisk: 61,
      beforeWait: '18 mins',
      afterWait: '6 mins'
    }
  },
  tourist: {
    id: 'tourist',
    name: 'Tourist Attraction & Monument',
    icon: '🏖️',
    tagline: 'Monument Gates & Viewpoints',
    capacity: 8000,
    unitName: 'Tourists',
    currentCrowd: 4800,
    summary: 'Manages ticket turnstile lines and observation deck crowding.',
    zones: [
      { id: 'viewpoint', name: 'Main Observation Viewpoint Deck', current: 2800, capacity: 3000, pct: 93, wait: '24 min', status: 'Choked', level: 'critical' },
      { id: 'ticket_gate', name: 'Main Heritage Gate Turnstiles', current: 1100, capacity: 2500, pct: 44, wait: '6 min', status: 'Normal', level: 'moderate' },
      { id: 'gardens', name: 'Terraced Heritage Gardens Walk', current: 900, capacity: 2500, pct: 36, wait: '0 min', status: 'Free', level: 'low' },
    ],
    redistribution: {
      problem: 'Observation Viewpoint is 93% full with tourists waiting 24 minutes to take photos.',
      solution: 'Direct arriving visitors to start with the Heritage Gardens walk and visit the deck in 20 mins.',
      beforeRisk: 93,
      afterRisk: 60,
      beforeWait: '24 mins',
      afterWait: '8 mins'
    }
  }
};
