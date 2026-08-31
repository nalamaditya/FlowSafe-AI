// 16 Supported High-Footfall Environments for FlowSafe AI
export const ENVIRONMENTS = [
  {
    id: 'stadium',
    name: 'Stadium',
    icon: '🏟️',
    category: 'Sports & Entertainment',
    tagline: 'Primary Demo Scenario',
    description: 'High-density sporting arenas with multi-gate perimeter access and concourse bottlenecks.',
    capacity: 16000,
    unitName: 'Spectators',
    gateLabel: 'Gate',
    zoneLabel: 'Stand',
    gates: [
      { id: 'gate_a', name: 'Gate A', direction: 'North Entrance', capacity: 4000, defaultCurrent: 1200, defaultWait: 4, baselineServiceRate: 25 },
      { id: 'gate_b', name: 'Gate B', direction: 'East Entrance', capacity: 4500, defaultCurrent: 3800, defaultWait: 14, baselineServiceRate: 18 },
      { id: 'gate_c', name: 'Gate C', direction: 'South Entrance', capacity: 3500, defaultCurrent: 900, defaultWait: 5, baselineServiceRate: 24 },
      { id: 'gate_d', name: 'Gate D', direction: 'West Entrance', capacity: 4000, defaultCurrent: 2100, defaultWait: 9, baselineServiceRate: 22 },
    ],
    zones: [
      { id: 'zone_north', name: 'North Stand', capacity: 4200, current: 1300 },
      { id: 'zone_east', name: 'East Stand (Vulnerable)', capacity: 4800, current: 4100 },
      { id: 'zone_south', name: 'South Stand', capacity: 3600, current: 950 },
      { id: 'zone_west', name: 'West Stand', capacity: 4400, current: 2250 },
    ],
    riskContexts: [
      'Pre-match turnstile surge (20 mins to kickoff)',
      'East parking lot shuttle dropoff concentration',
      'Turnstile scanner calibration lag at Gate B',
      'VIP security screening buffer delay'
    ]
  },
  {
    id: 'concert',
    name: 'Concert & Arena',
    icon: '🎵',
    category: 'Entertainment',
    tagline: 'Live Music & Arena Shows',
    description: 'Sudden surge profiles during headliner doors opening and merchandise zones.',
    capacity: 14000,
    unitName: 'Attendees',
    gateLabel: 'Portal',
    zoneLabel: 'Tier / Floor',
    gates: [
      { id: 'gate_a', name: 'Portal 1 (VIP & Pit)', direction: 'Main Front', capacity: 3000, defaultCurrent: 950, defaultWait: 3, baselineServiceRate: 28 },
      { id: 'gate_b', name: 'Portal 2 (General Admission)', direction: 'Plaza Entrance', capacity: 5500, defaultCurrent: 4900, defaultWait: 19, baselineServiceRate: 16 },
      { id: 'gate_c', name: 'Portal 3 (Upper Deck)', direction: 'Side Concourse', capacity: 3000, defaultCurrent: 780, defaultWait: 4, baselineServiceRate: 26 },
      { id: 'gate_d', name: 'Portal 4 (Fast Track)', direction: 'Rear Concourse', capacity: 2500, defaultCurrent: 1100, defaultWait: 6, baselineServiceRate: 22 },
    ],
    zones: [
      { id: 'zone_pit', name: 'Standing Pit', capacity: 4000, current: 3600 },
      { id: 'zone_tier1', name: 'Lower Bowl', capacity: 5000, current: 3800 },
      { id: 'zone_tier2', name: 'Upper Balcony', capacity: 5000, current: 2100 },
    ],
    riskContexts: [
      'General admission rush prior to opening act',
      'Bag checks slowing main plaza entry points',
      'Merchandise booth queue spillover'
    ]
  },
  {
    id: 'airport',
    name: 'Airport Terminal',
    icon: '✈️',
    category: 'Transportation',
    tagline: 'International & Domestic Hubs',
    description: 'Multi-tiered passenger processing from baggage drop to security checkpoint lines.',
    capacity: 22000,
    unitName: 'Passengers',
    gateLabel: 'Security Checkpoint',
    zoneLabel: 'Concourse',
    gates: [
      { id: 'gate_a', name: 'Checkpoint Alpha (T1)', direction: 'North Wing', capacity: 5000, defaultCurrent: 1400, defaultWait: 6, baselineServiceRate: 24 },
      { id: 'gate_b', name: 'Checkpoint Bravo (Central)', direction: 'Main Atrium', capacity: 7000, defaultCurrent: 6100, defaultWait: 22, baselineServiceRate: 15 },
      { id: 'gate_c', name: 'Checkpoint Charlie (T2)', direction: 'South Pier', capacity: 5000, defaultCurrent: 1200, defaultWait: 5, baselineServiceRate: 25 },
      { id: 'gate_d', name: 'Checkpoint Delta (Biometric)', direction: 'Express Pier', capacity: 5000, defaultCurrent: 2300, defaultWait: 8, baselineServiceRate: 28 },
    ],
    zones: [
      { id: 'zone_concourse_a', name: 'Concourse A (Gates 1-20)', capacity: 6000, current: 2800 },
      { id: 'zone_concourse_b', name: 'Concourse B (Gates 21-45)', capacity: 8000, current: 6900 },
      { id: 'zone_duty_free', name: 'Duty Free Central Hall', capacity: 5000, current: 3100 },
    ],
    riskContexts: [
      'Synchronized wide-body international flight departures',
      'TSA lane automated tray return bottleneck',
      'Connecting flight passenger influx'
    ]
  },
  {
    id: 'railway',
    name: 'Railway Station',
    icon: '🚉',
    category: 'Transportation',
    tagline: 'Intercity Rail Terminals',
    description: 'High burst passenger discharge during train arrivals and footbridge crossings.',
    capacity: 18000,
    unitName: 'Commuters',
    gateLabel: 'Concourse Entry',
    zoneLabel: 'Platform Deck',
    gates: [
      { id: 'gate_a', name: 'North Overbridge Entry', direction: 'North Approach', capacity: 4500, defaultCurrent: 1500, defaultWait: 4, baselineServiceRate: 26 },
      { id: 'gate_b', name: 'Main Central Portico', direction: 'City Center Link', capacity: 5500, defaultCurrent: 4900, defaultWait: 17, baselineServiceRate: 18 },
      { id: 'gate_c', name: 'South Footbridge', direction: 'South Parking Link', capacity: 4000, defaultCurrent: 1100, defaultWait: 3, baselineServiceRate: 27 },
      { id: 'gate_d', name: 'Metro Interchange Gate', direction: 'Underground Concourse', capacity: 4000, defaultCurrent: 2400, defaultWait: 9, baselineServiceRate: 20 },
    ],
    zones: [
      { id: 'zone_p1_4', name: 'Platforms 1-4 (Express)', capacity: 6000, current: 4800 },
      { id: 'zone_p5_8', name: 'Platforms 5-8 (Regional)', capacity: 6000, current: 2900 },
      { id: 'zone_hall', name: 'Central Ticket Concourse', capacity: 6000, current: 3800 },
    ],
    riskContexts: [
      'Dual Superfast train simultaneous arrival',
      'Stairway congestion at Platform 2 footbridge',
      'Escalator maintenance outage at Main Portico'
    ]
  },
  {
    id: 'metro',
    name: 'Metro Station',
    icon: '🚇',
    category: 'Urban Transit',
    tagline: 'Rapid Transit Interchange',
    description: 'High-frequency pulsing commuter volume with tight turnstile queue tolerances.',
    capacity: 12000,
    unitName: 'Passengers',
    gateLabel: 'AFC Gate Line',
    zoneLabel: 'Line Interchange',
    gates: [
      { id: 'gate_a', name: 'Gate 1 (Street North)', direction: 'Financial District', capacity: 3000, defaultCurrent: 900, defaultWait: 2, baselineServiceRate: 35 },
      { id: 'gate_b', name: 'Gate 2 (Transfer Tunnel)', direction: 'Line 1 to Line 3 Link', capacity: 4000, defaultCurrent: 3650, defaultWait: 13, baselineServiceRate: 22 },
      { id: 'gate_c', name: 'Gate 3 (Mall Direct)', direction: 'Shopping Arcade', capacity: 2500, defaultCurrent: 600, defaultWait: 2, baselineServiceRate: 32 },
      { id: 'gate_d', name: 'Gate 4 (Bus Hub Link)', direction: 'Transit Terminus', capacity: 2500, defaultCurrent: 1400, defaultWait: 5, baselineServiceRate: 28 },
    ],
    zones: [
      { id: 'zone_blue', name: 'Blue Line Platform (Eastbound)', capacity: 4000, current: 3400 },
      { id: 'zone_red', name: 'Red Line Platform (Northbound)', capacity: 4000, current: 1800 },
      { id: 'zone_mezzanine', name: 'Mezzanine Interchange Hall', capacity: 4000, current: 2200 },
    ],
    riskContexts: [
      'Peak rush hour office departure surge',
      'Card tap NFC gate reader slowdown',
      'Interchange stairway crossover collision point'
    ]
  },
  {
    id: 'hospital',
    name: 'Hospital & Healthcare',
    icon: '🏥',
    category: 'Healthcare Facility',
    tagline: 'Emergency & Outpatient Medical Hubs',
    description: 'Critical triage and non-emergency patient crowd segregation with zero-choke tolerance.',
    capacity: 8000,
    unitName: 'Visitors & Patients',
    gateLabel: 'Wing Reception',
    zoneLabel: 'Clinical Block',
    gates: [
      { id: 'gate_a', name: 'Wing A (Outpatient Dept)', direction: 'Specialist Clinic', capacity: 2000, defaultCurrent: 700, defaultWait: 5, baselineServiceRate: 15 },
      { id: 'gate_b', name: 'Wing B (Central Triage/OPD)', direction: 'Main Hospital Atrium', capacity: 2500, defaultCurrent: 2150, defaultWait: 26, baselineServiceRate: 10 },
      { id: 'gate_c', name: 'Wing C (Diagnostic & Lab)', direction: 'Diagnostics Center', capacity: 2000, defaultCurrent: 550, defaultWait: 4, baselineServiceRate: 18 },
      { id: 'gate_d', name: 'Wing D (Emergency/Trauma)', direction: 'Ambulance Bay Link', capacity: 1500, defaultCurrent: 820, defaultWait: 8, baselineServiceRate: 16 },
    ],
    zones: [
      { id: 'zone_opd', name: 'Outpatient Waiting Lounge', capacity: 2500, current: 2200 },
      { id: 'zone_diagnostic', name: 'Radiology & Pathology Wing', capacity: 2500, current: 950 },
      { id: 'zone_inpatient', name: 'Inpatient Visiting Corridor', capacity: 3000, current: 1200 },
    ],
    riskContexts: [
      'Morning OPD consultation doctor queue peak',
      'Pharmacy dispensation desk backlog',
      'Visiting hours elevator cluster'
    ]
  },
  {
    id: 'mall',
    name: 'Shopping Mall',
    icon: '🛍️',
    category: 'Retail & Commercial',
    tagline: 'Multi-Level Retail Hubs',
    description: 'Atrium anchor stores, cinema wings, and food court peak congestion management.',
    capacity: 15000,
    unitName: 'Shoppers',
    gateLabel: 'Plaza Entry',
    zoneLabel: 'Arcade Level',
    gates: [
      { id: 'gate_a', name: 'Plaza North (Cinema Deck)', direction: 'Entertainment Promenade', capacity: 3500, defaultCurrent: 1100, defaultWait: 3, baselineServiceRate: 26 },
      { id: 'gate_b', name: 'Main Boulevard Entry', direction: 'Central Atrium / Valet', capacity: 5000, defaultCurrent: 4300, defaultWait: 15, baselineServiceRate: 18 },
      { id: 'gate_c', name: 'Plaza South (Hypermarket)', direction: 'Retail Anchor', capacity: 3500, defaultCurrent: 850, defaultWait: 4, baselineServiceRate: 24 },
      { id: 'gate_d', name: 'Parking Level 2 Link', direction: 'Garage East', capacity: 3000, defaultCurrent: 1600, defaultWait: 6, baselineServiceRate: 22 },
    ],
    zones: [
      { id: 'zone_foodcourt', name: 'Level 4 Food Court', capacity: 4000, current: 3500 },
      { id: 'zone_cinema', name: 'Multiplex Lobby', capacity: 4000, current: 2800 },
      { id: 'zone_atrium', name: 'Ground Floor Event Atrium', capacity: 7000, current: 3900 },
    ],
    riskContexts: [
      'Weekend flash sale promotion at Anchor Store',
      'Food court dinner service rush (7 PM - 9 PM)',
      'Multiplex blockbuster show interval exit flow'
    ]
  },
  {
    id: 'campus',
    name: 'College & University Campus',
    icon: '🏫',
    category: 'Education & Institutional',
    tagline: 'Academic, Auditorium & Dining Complexes',
    description: 'Class turnover surges, convocation hall gatherings, and cafeteria rush mitigation.',
    capacity: 12000,
    unitName: 'Students & Faculty',
    gateLabel: 'Campus Gate',
    zoneLabel: 'Academic Quad',
    gates: [
      { id: 'gate_a', name: 'Gate 1 (Academic Complex)', direction: 'Engineering & Science Quad', capacity: 3000, defaultCurrent: 850, defaultWait: 3, baselineServiceRate: 30 },
      { id: 'gate_b', name: 'Gate 2 (Central Main Gate)', direction: 'Administrative Ave', capacity: 4000, defaultCurrent: 3500, defaultWait: 14, baselineServiceRate: 18 },
      { id: 'gate_c', name: 'Gate 3 (Hostel & Sports)', direction: 'Residential Sector', capacity: 2500, defaultCurrent: 600, defaultWait: 2, baselineServiceRate: 28 },
      { id: 'gate_d', name: 'Gate 4 (Auditorium Link)', direction: 'Convention Center', capacity: 2500, defaultCurrent: 1250, defaultWait: 7, baselineServiceRate: 22 },
    ],
    zones: [
      { id: 'zone_auditorium', name: 'Grand Convocation Auditorium', capacity: 3500, current: 3100 },
      { id: 'zone_dining', name: 'Student Central Dining Hall', capacity: 3500, current: 2400 },
      { id: 'zone_library', name: 'Digital Knowledge Center', capacity: 5000, current: 1800 },
    ],
    riskContexts: [
      'Annual Ideathon & Hackathon registration surge',
      'Convocation ceremony parent arrival rush',
      'Class interchange interval across central courtyard'
    ]
  },
  {
    id: 'exhibition',
    name: 'Exhibition & Expo Center',
    icon: '🎪',
    category: 'Events & Trade',
    tagline: 'B2B Trade Shows & Conventions',
    description: 'Badge scanner check-ins, keynote hall overflows, and demonstration booth crowds.',
    capacity: 25000,
    unitName: 'Delegates',
    gateLabel: 'Hall Registration',
    zoneLabel: 'Pavilion',
    gates: [
      { id: 'gate_a', name: 'Hall 1 Express Entry', direction: 'North Promenade', capacity: 6000, defaultCurrent: 1700, defaultWait: 4, baselineServiceRate: 28 },
      { id: 'gate_b', name: 'Main Expo Dome Entry', direction: 'Central Plaza', capacity: 8000, defaultCurrent: 7100, defaultWait: 21, baselineServiceRate: 16 },
      { id: 'gate_c', name: 'Hall 3 International Gate', direction: 'East Corridor', capacity: 5500, defaultCurrent: 1400, defaultWait: 5, baselineServiceRate: 25 },
      { id: 'gate_d', name: 'Hall 4 B2B Badge Gate', direction: 'South Annex', capacity: 5500, defaultCurrent: 2600, defaultWait: 8, baselineServiceRate: 24 },
    ],
    zones: [
      { id: 'zone_hall_a', name: 'Hall A (AI & Robotics Pavilion)', capacity: 8000, current: 7200 },
      { id: 'zone_keynote', name: 'Plenary Keynote Theater', capacity: 7000, current: 4800 },
      { id: 'zone_hall_c', name: 'Hall C (Startup Village)', capacity: 10000, current: 4200 },
    ],
    riskContexts: [
      'Celebrity CEO keynote registration crunch',
      'Lanyard badge QR dispenser printer jam',
      'Catering lunch voucher queue overlap'
    ]
  },
  {
    id: 'festival',
    name: 'Cultural Festival & Mela',
    icon: '🎉',
    category: 'Public Celebrations',
    tagline: 'Open-Air Cultural Celebrations',
    description: 'Dynamic pedestrian paths across open grounds, food zones, and stage arenas.',
    capacity: 35000,
    unitName: 'Visitors',
    gateLabel: 'Archway Entry',
    zoneLabel: 'Ground Sector',
    gates: [
      { id: 'gate_a', name: 'Arch 1 (Green Gate)', direction: 'Riverfront Side', capacity: 8000, defaultCurrent: 2400, defaultWait: 5, baselineServiceRate: 30 },
      { id: 'gate_b', name: 'Arch 2 (Main City Gate)', direction: 'Grand Avenue Link', capacity: 12000, defaultCurrent: 10600, defaultWait: 28, baselineServiceRate: 15 },
      { id: 'gate_c', name: 'Arch 3 (Crafts Bazaar)', direction: 'East Walkway', capacity: 8000, defaultCurrent: 2100, defaultWait: 4, baselineServiceRate: 28 },
      { id: 'gate_d', name: 'Arch 4 (Parking Shuttles)', direction: 'West Grounds', capacity: 7000, defaultCurrent: 3600, defaultWait: 9, baselineServiceRate: 22 },
    ],
    zones: [
      { id: 'zone_mainstage', name: 'Main Cultural Stage Grounds', capacity: 15000, current: 13200 },
      { id: 'zone_food', name: 'Traditional Food Street', capacity: 10000, current: 7400 },
      { id: 'zone_artisan', name: 'Craft & Heritage Pavilion', capacity: 10000, current: 3800 },
    ],
    riskContexts: [
      'Evening headline cultural performance rush',
      'Fireworks display viewing bottleneck',
      'Narrow egress point between food stalls'
    ]
  },
  {
    id: 'religious',
    name: 'Religious Gathering & Temple',
    icon: '🛕',
    category: 'Pilgrimage & Faith',
    tagline: 'High-Density Pilgrimage Complexes',
    description: 'Continuous serpentine queues, sanctum darshan holding areas, and prasad distribution.',
    capacity: 30000,
    unitName: 'Devotees',
    gateLabel: 'Gopuram / Portal',
    zoneLabel: 'Pradakshina Tier',
    gates: [
      { id: 'gate_a', name: 'North Gopuram', direction: 'North Outer Parikrama', capacity: 7000, defaultCurrent: 2100, defaultWait: 6, baselineServiceRate: 22 },
      { id: 'gate_b', name: 'East Maha Raja Gopuram', direction: 'Sacred Plaza Entrance', capacity: 10000, defaultCurrent: 9100, defaultWait: 34, baselineServiceRate: 12 },
      { id: 'gate_c', name: 'South Gopuram', direction: 'South Approach Pathway', capacity: 7000, defaultCurrent: 1800, defaultWait: 5, baselineServiceRate: 24 },
      { id: 'gate_d', name: 'West Special Darshan Gate', direction: 'West Queuing Annex', capacity: 6000, defaultCurrent: 3200, defaultWait: 12, baselineServiceRate: 20 },
    ],
    zones: [
      { id: 'zone_inner_sanctum', name: 'Inner Sanctum Queue Complex', capacity: 8000, current: 7400 },
      { id: 'zone_queue_complex', name: 'Serpentine Holding Compartments', capacity: 12000, current: 9800 },
      { id: 'zone_outer_parikrama', name: 'Outer Circumambulation Path', capacity: 10000, current: 4100 },
    ],
    riskContexts: [
      'Aarti / Morning Darshan auspicious surge',
      'Footwear counter collection choke point',
      'Sanctum exit barricade narrowing'
    ]
  },
  {
    id: 'amusement',
    name: 'Amusement & Theme Park',
    icon: '🎡',
    category: 'Recreation',
    tagline: 'Theme Parks & Water Resorts',
    description: 'Front turnstiles, flagship ride standby queues, and evening parade crowd paths.',
    capacity: 20000,
    unitName: 'Visitors',
    gateLabel: 'Turnstile Plaza',
    zoneLabel: 'Themed Land',
    gates: [
      { id: 'gate_a', name: 'North Turnstile (Resort Hotel)', direction: 'Monorail Hub', capacity: 4500, defaultCurrent: 1200, defaultWait: 4, baselineServiceRate: 28 },
      { id: 'gate_b', name: 'Main Fantasy Boulevard', direction: 'Central Entrance Park', capacity: 7000, defaultCurrent: 5900, defaultWait: 18, baselineServiceRate: 18 },
      { id: 'gate_c', name: 'South FastPass Portal', direction: 'Express Walkway', capacity: 4500, defaultCurrent: 1100, defaultWait: 3, baselineServiceRate: 30 },
      { id: 'gate_d', name: 'West Group Entry Gate', direction: 'Tour Bus Plaza', capacity: 4000, defaultCurrent: 2100, defaultWait: 8, baselineServiceRate: 22 },
    ],
    zones: [
      { id: 'zone_thrill', name: 'Hyper-Coaster Plaza', capacity: 7000, current: 6100 },
      { id: 'zone_parade', name: 'Main Promenade / Castle View', capacity: 8000, current: 5200 },
      { id: 'zone_water', name: 'Adventure Splash Lagoon', capacity: 5000, current: 2400 },
    ],
    riskContexts: [
      'Park opening rope-drop surge to flagship roller coaster',
      'Nightly fireworks parade route barricade pressure',
      'Security metal detector queue crossover'
    ]
  },
  {
    id: 'government',
    name: 'Government Facility & Civic Center',
    icon: '🏛️',
    category: 'Public Sector',
    tagline: 'Secretariats, Courthouses & Civic Hubs',
    description: 'High-security multi-factor identity checkpoints and public hearing chambers.',
    capacity: 10000,
    unitName: 'Citizens & Visitors',
    gateLabel: 'Security Post',
    zoneLabel: 'Civic Chamber',
    gates: [
      { id: 'gate_a', name: 'Post 1 (Judicial Annex)', direction: 'Courtroom Walkway', capacity: 2500, defaultCurrent: 750, defaultWait: 4, baselineServiceRate: 22 },
      { id: 'gate_b', name: 'Main Secretariat Gate', direction: 'Public Grievance Hall', capacity: 3500, defaultCurrent: 3100, defaultWait: 24, baselineServiceRate: 12 },
      { id: 'gate_c', name: 'Post 3 (Employee & Press)', direction: 'Media Concourse', capacity: 2000, defaultCurrent: 450, defaultWait: 3, baselineServiceRate: 26 },
      { id: 'gate_d', name: 'Post 4 (Civic Services Wing)', direction: 'Licensing Bureau', capacity: 2000, defaultCurrent: 1100, defaultWait: 9, baselineServiceRate: 18 },
    ],
    zones: [
      { id: 'zone_hearing', name: 'Central Assembly & Hearing Hall', capacity: 3500, current: 2900 },
      { id: 'zone_services', name: 'Public Document Processing Center', capacity: 3500, current: 2850 },
      { id: 'zone_press', name: 'Press & Dignitary Gallery', capacity: 3000, current: 950 },
    ],
    riskContexts: [
      'Public hearing petition submission morning deadline',
      'Multi-level biometric document verification queue',
      'Press conference media cluster'
    ]
  },
  {
    id: 'bus_terminal',
    name: 'Bus Terminal & Transit Hub',
    icon: '🚌',
    category: 'Transportation',
    tagline: 'Interstate & City Bus Interchanges',
    description: 'Bay boarding clusters, overhead skywalk crossings, and weekend exodus traffic.',
    capacity: 14000,
    unitName: 'Travelers',
    gateLabel: 'Terminal Bay Entrance',
    zoneLabel: 'Bay Sector',
    gates: [
      { id: 'gate_a', name: 'Bay Gate A (Interstate North)', direction: 'Express Highway Bay', capacity: 3500, defaultCurrent: 1050, defaultWait: 4, baselineServiceRate: 25 },
      { id: 'gate_b', name: 'Central Concourse Entry', direction: 'City Bus Terminus Deck', capacity: 4500, defaultCurrent: 3950, defaultWait: 16, baselineServiceRate: 17 },
      { id: 'gate_c', name: 'Bay Gate C (Regional South)', direction: 'South Corridor Bay', capacity: 3000, defaultCurrent: 800, defaultWait: 3, baselineServiceRate: 26 },
      { id: 'gate_d', name: 'Bay Gate D (Metro Transfer)', direction: 'Subway Footbridge Link', capacity: 3000, defaultCurrent: 1650, defaultWait: 7, baselineServiceRate: 22 },
    ],
    zones: [
      { id: 'zone_interstate', name: 'Bays 1-15 (Interstate Long Distance)', capacity: 5000, current: 4300 },
      { id: 'zone_feeder', name: 'Bays 16-30 (Local City Feeder)', capacity: 5000, current: 2900 },
      { id: 'zone_hall_bus', name: 'Central Ticketing & Waiting Lounge', capacity: 4000, current: 2450 },
    ],
    riskContexts: [
      'Friday evening weekend exodus boarding surge',
      'Rainstorm causing outdoor commuters to rush into central bay',
      'Luggage screening delay at long-distance bays'
    ]
  },
  {
    id: 'tourist',
    name: 'Tourist Attraction & Monument',
    icon: '🏖️',
    category: 'Heritage & Tourism',
    tagline: 'Iconic Landmarks & Heritage Sites',
    description: 'Ticket turnstiles, heritage security screening, and viewpoint observation platforms.',
    capacity: 12000,
    unitName: 'Visitors',
    gateLabel: 'Monument Portal',
    zoneLabel: 'Heritage Courtyard',
    gates: [
      { id: 'gate_a', name: 'Portal A (Gardens Gate)', direction: 'North Promenade', capacity: 3000, defaultCurrent: 850, defaultWait: 4, baselineServiceRate: 24 },
      { id: 'gate_b', name: 'Main Heritage Gate', direction: 'Central Monument Gateway', capacity: 4500, defaultCurrent: 3900, defaultWait: 20, baselineServiceRate: 14 },
      { id: 'gate_c', name: 'Portal C (Museum Annex)', direction: 'East Gallery Link', capacity: 2500, defaultCurrent: 620, defaultWait: 3, baselineServiceRate: 26 },
      { id: 'gate_d', name: 'Portal D (Online QR Gate)', direction: 'South Shuttle Bay', capacity: 2000, defaultCurrent: 1150, defaultWait: 6, baselineServiceRate: 28 },
    ],
    zones: [
      { id: 'zone_viewpoint', name: 'Main Observation Platform', capacity: 4000, current: 3600 },
      { id: 'zone_gardens', name: 'Historic Terraced Gardens', capacity: 5000, current: 2100 },
      { id: 'zone_museum', name: 'Heritage Relic Museum', capacity: 3000, current: 1400 },
    ],
    riskContexts: [
      'Sunset viewpoint photo opportunity rush',
      'Foreign tourist physical passport manual validation line',
      'Audio guide return booth queue crossover'
    ]
  },
  {
    id: 'custom',
    name: 'Custom Venue',
    icon: '➕',
    category: 'User Configured',
    tagline: 'Dynamic Custom Facility',
    description: 'Configurable custom layout with user-defined capacities, zones, and entrance gates.',
    capacity: 10000,
    unitName: 'Occupants',
    gateLabel: 'Access Point',
    zoneLabel: 'Designated Zone',
    gates: [
      { id: 'gate_a', name: 'Access Point 1', direction: 'North Perimeter', capacity: 2500, defaultCurrent: 800, defaultWait: 4, baselineServiceRate: 25 },
      { id: 'gate_b', name: 'Access Point 2', direction: 'Main Atrium', capacity: 3500, defaultCurrent: 2900, defaultWait: 15, baselineServiceRate: 18 },
      { id: 'gate_c', name: 'Access Point 3', direction: 'East Corridor', capacity: 2000, defaultCurrent: 600, defaultWait: 3, baselineServiceRate: 26 },
      { id: 'gate_d', name: 'Access Point 4', direction: 'West Promenade', capacity: 2000, defaultCurrent: 1100, defaultWait: 6, baselineServiceRate: 22 },
    ],
    zones: [
      { id: 'zone_1', name: 'Main Hall', capacity: 4000, current: 3200 },
      { id: 'zone_2', name: 'Secondary Wing', capacity: 3500, current: 1600 },
      { id: 'zone_3', name: 'Public Concourse', capacity: 2500, current: 1100 },
    ],
    riskContexts: [
      'Custom user simulated surge factor',
      'Turnstile throughput limitation',
      'Perimeter pedestrian flow divergence'
    ]
  }
];
