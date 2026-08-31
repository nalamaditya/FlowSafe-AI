/**
 * FlowSafe AI — Deterministic Venue & Location Intelligence Data
 * 
 * Each environment and location has its own distinct hourly footfall curve,
 * capacity, service rate, explainable AI reasons, and smart recommendations.
 */

export const ENVIRONMENTS = [
  {
    id: 'campus',
    name: 'College Campus',
    icon: '🏫',
    tagline: 'Academic, Dining & Transit Infrastructure',
    description: 'Dynamic student flow between class blocks, lunch rush, and end-of-day bus departures.',
    locations: [
      {
        id: 'canteen',
        name: '🍔 Canteen & Cafeteria',
        icon: '🍔',
        capacity: 250,
        baselineWaitMin: 18,
        description: 'Main student food court and lunch counter.',
        // Hourly crowd curve (8:00 AM to 8:00 PM)
        hourly: {
          '08:00': 20, '08:30': 35, '09:00': 45, '09:30': 50,
          '10:00': 45, '10:30': 52, '11:00': 70, '11:30': 95,
          '12:00': 130, '12:30': 180, '13:00': 218, '13:30': 190,
          '14:00': 120, '14:30': 80, '15:00': 60, '15:30': 65,
          '16:00': 55, '16:30': 40, '17:00': 30, '17:30': 20,
          '18:00': 15, '19:00': 10, '20:00': 5
        },
        reasonsHigh: [
          'Historical lunch hour rush between 12:30 PM – 2:00 PM',
          'Classes across all academic departments end at 12:45 PM',
          'Previous data shows +45% surge during meal intervals',
          'Limited service counter throughput during peak ordering'
        ],
        reasonsLow: [
          'Outside of scheduled lunch hours',
          'Students attending active lecture periods in Main Block',
          'Ample seating and quick cashier turnaround'
        ],
        recommendationHigh: '⚠️ High congestion predicted at Canteen around 1:00 PM. Best time to visit: between 2:00 PM and 2:30 PM.',
        alternativeSuggestion: '💡 Alternative: The Library and Main Block currently have lower crowd and ample seating.'
      },
      {
        id: 'library',
        name: '📚 Central Library',
        icon: '📚',
        capacity: 200,
        baselineWaitMin: 2,
        description: 'Quiet study halls, reading zones, and digital archives.',
        hourly: {
          '08:00': 15, '08:30': 25, '09:00': 40, '09:30': 60,
          '10:00': 90, '10:30': 110, '11:00': 130, '11:30': 120,
          '12:00': 75, '12:30': 50, '13:00': 72, '13:30': 85,
          '14:00': 140, '14:30': 165, '15:00': 175, '15:30': 150,
          '16:00': 110, '16:30': 70, '17:00': 40, '17:30': 25,
          '18:00': 20, '19:00': 15, '20:00': 10
        },
        reasonsHigh: [
          'Peak self-study window between class lecture intervals',
          'Upcoming mid-term project submissions & assignment deadlines',
          'High demand for digital workstation computers'
        ],
        reasonsLow: [
          'Students attending scheduled morning/afternoon lectures',
          'Lunch break dispersal to campus dining areas'
        ],
        recommendationHigh: '📚 Library seating filling up for afternoon study. Best time: Visit between 12:00 PM – 1:30 PM or after 5:00 PM.',
        alternativeSuggestion: '💡 Alternative: Use Digital Reading Wing B or Open Quad benches.'
      },
      {
        id: 'main_block',
        name: '🏫 Main Academic Block',
        icon: '🏫',
        capacity: 300,
        baselineWaitMin: 5,
        description: 'Central lecture halls, faculty corridors, and administrative offices.',
        hourly: {
          '08:00': 30, '08:30': 110, '09:00': 240, '09:30': 160,
          '10:00': 120, '10:30': 130, '11:00': 210, '11:30': 150,
          '12:00': 130, '12:30': 180, '13:00': 145, '13:30': 160,
          '14:00': 220, '14:30': 140, '15:00': 130, '15:30': 190,
          '16:00': 150, '16:30': 90, '17:00': 40, '17:30': 20,
          '18:00': 10, '19:00': 5, '20:00': 5
        },
        reasonsHigh: [
          'Class transition bell intervals creating corridor crossover traffic',
          'Morning lecture batch arrivals between 8:45 AM – 9:15 AM',
          'Faculty advisory consultation queue'
        ],
        reasonsLow: [
          'Classes currently in session inside lecture theaters',
          'End of daily teaching schedule'
        ],
        recommendationHigh: '🚶 High corridor traffic during class changeover. Plan transit 10 minutes early.',
        alternativeSuggestion: '💡 Alternative: Use East Wing staircase to avoid central lobby bottleneck.'
      },
      {
        id: 'bus_area',
        name: '🚌 Bus & Transit Terminal',
        icon: '🚌',
        capacity: 350,
        baselineWaitMin: 15,
        description: 'College shuttle departures, city bus bays, and pickup points.',
        hourly: {
          '08:00': 150, '08:30': 180, '09:00': 70, '09:30': 30,
          '10:00': 20, '10:30': 15, '11:00': 15, '11:30': 20,
          '12:00': 25, '12:30': 35, '13:00': 62, '13:30': 40,
          '14:00': 30, '14:30': 35, '15:00': 45, '15:30': 60,
          '16:00': 120, '16:30': 220, '17:00': 295, '17:30': 210,
          '18:00': 80, '19:00': 25, '20:00': 10
        },
        reasonsHigh: [
          'College closing dismissal surge between 4:30 PM – 5:30 PM',
          'Simultaneous boarding for 12 suburban route buses',
          'Day scholar commuter concentration at main exit gate'
        ],
        reasonsLow: [
          'Midday operating lull while academic sessions are active',
          'Buses stationed in depot awaiting evening shift'
        ],
        recommendationHigh: '🚌 Bus area peaks heavily at 4:30 PM–5:15 PM. Best time: Board early before 4:15 PM or take 5:45 PM batch.',
        alternativeSuggestion: '💡 Alternative: Wait in Library study lounge until primary boarding wave clears.'
      },
      {
        id: 'auditorium',
        name: '🎤 Grand Auditorium',
        icon: '🎤',
        capacity: 500,
        baselineWaitMin: 12,
        description: 'University keynote hall, conventions, and cultural events.',
        hourly: {
          '08:00': 10, '08:30': 15, '09:00': 30, '09:30': 80,
          '10:00': 380, '10:30': 440, '11:00': 420, '11:30': 390,
          '12:00': 120, '12:30': 40, '13:00': 50, '13:30': 70,
          '14:00': 320, '14:30': 410, '15:00': 390, '15:30': 280,
          '16:00': 90, '16:30': 40, '17:00': 20, '17:30': 15,
          '18:00': 10, '19:00': 10, '20:00': 5
        },
        reasonsHigh: [
          'Scheduled Hackathon / Ideathon symposium keynote',
          'Guest speaker address with mandatory batch attendance',
          'Entry queue bottleneck at double-door lobby'
        ],
        reasonsLow: [
          'No plenary session scheduled in hall',
          'Auditorium doors closed for stage maintenance'
        ],
        recommendationHigh: '🎤 Event session starting soon. Balcony entrance recommended to avoid lobby choke.',
        alternativeSuggestion: '💡 Alternative: Watch live stream relay from Seminar Hall 2.'
      },
      {
        id: 'sports_ground',
        name: '🏃 Sports Ground & Stadium',
        icon: '🏃',
        capacity: 300,
        baselineWaitMin: 4,
        description: 'Athletic tracks, cricket ground, and basketball courts.',
        hourly: {
          '08:00': 40, '08:30': 30, '09:00': 15, '09:30': 10,
          '10:00': 10, '10:30': 15, '11:00': 20, '11:30': 25,
          '12:00': 30, '12:30': 40, '13:00': 35, '13:30': 30,
          '14:00': 25, '14:30': 30, '15:00': 40, '15:30': 75,
          '16:00': 160, '16:30': 230, '17:00': 265, '17:30': 210,
          '18:00': 130, '19:00': 40, '20:00': 15
        },
        reasonsHigh: [
          'After-class sports club practices and intramural tournament',
          'Cooler evening temperature encouraging outdoor activities',
          'Hostel students evening fitness routine'
        ],
        reasonsLow: [
          'Daytime class hours with high sun exposure',
          'Grounds reserved for groundskeeping'
        ],
        recommendationHigh: '🏃 Peak sports court utilization from 4:30 PM – 6:00 PM.',
        alternativeSuggestion: '💡 Alternative: Indoor badminton courts have open slots.'
      },
      {
        id: 'labs',
        name: '🧪 Science & AI Labs',
        icon: '🧪',
        capacity: 180,
        baselineWaitMin: 6,
        description: 'Specialized computing, AI workstation, and electronics labs.',
        hourly: {
          '08:00': 10, '08:30': 30, '09:00': 90, '09:30': 130,
          '10:00': 155, '10:30': 160, '11:00': 150, '11:30': 140,
          '12:00': 90, '12:30': 30, '13:00': 45, '13:30': 110,
          '14:00': 150, '14:30': 165, '15:00': 160, '15:30': 130,
          '16:00': 80, '16:30': 40, '17:00': 20, '17:30': 15,
          '18:00': 10, '19:00': 5, '20:00': 5
        },
        reasonsHigh: [
          'Scheduled 3-hour practical lab slots (9 AM–12 PM & 1:30 PM–4:30 PM)',
          'High demand for specialized GPU machine clusters',
          'Faculty lab evaluations in progress'
        ],
        reasonsLow: [
          'Lunch break lab maintenance window',
          'Theory lecture time blocks'
        ],
        recommendationHigh: '🧪 Core lab seats fully allocated for scheduled practicals.',
        alternativeSuggestion: '💡 Alternative: Open Coding Annex on 3rd floor has 40 free workstations.'
      },
      {
        id: 'main_entrance',
        name: '🚪 Campus Main Entrance Gate',
        icon: '🚪',
        capacity: 400,
        baselineWaitMin: 8,
        description: 'Perimeter turnstiles, security ID verification, and vehicle boom barrier.',
        hourly: {
          '08:00': 180, '08:30': 310, '09:00': 375, '09:30': 220,
          '10:00': 60, '10:30': 45, '11:00': 40, '11:30': 50,
          '12:00': 70, '12:30': 110, '13:00': 95, '13:30': 85,
          '14:00': 60, '14:30': 50, '15:00': 70, '15:30': 110,
          '16:00': 210, '16:30': 340, '17:00': 380, '17:30': 260,
          '18:00': 110, '19:00': 40, '20:00': 20
        },
        reasonsHigh: [
          'Morning entry gate rush (8:30 AM – 9:15 AM) with ID card scanning',
          'Evening exit dispersal surge (4:30 PM – 5:30 PM)',
          'Vehicle and pedestrian crossover friction'
        ],
        reasonsLow: [
          'Midday period with steady low pedestrian throughput',
          'Security processing operating with zero wait'
        ],
        recommendationHigh: '🚪 Main Gate turnstiles experience morning rush at 8:45 AM. Arrive by 8:30 AM to skip lines.',
        alternativeSuggestion: '💡 Alternative: Pedestrian North Turnstile Gate is clear.'
      }
    ]
  },
  {
    id: 'stadium',
    name: 'Sports Stadium',
    icon: '🏟️',
    tagline: 'Perimeter Gates & Concourse Access',
    description: 'High-surge entry and exit waves tied to match start times, halftime, and final whistle.',
    locations: [
      {
        id: 'gate_a',
        name: 'Gate A (North Entrance)',
        icon: '🚪',
        capacity: 4000,
        baselineWaitMin: 4,
        description: 'North access from rapid transit station.',
        hourly: {
          '10:00': 200, '11:00': 450, '12:00': 900, '12:30': 1100,
          '13:00': 1200, '13:30': 1300, '14:00': 700, '15:00': 400,
          '16:00': 300, '17:00': 1800, '18:00': 3500, '19:00': 600
        },
        reasonsHigh: ['Pre-match steady ingress', 'Transit train arrival wave'],
        reasonsLow: ['During active match play', 'Before gates open'],
        recommendationHigh: '🟢 Gate A has smooth flow (30% capacity). Preferred over Gate B.',
        alternativeSuggestion: '💡 Recommended for quick access to North Stand.'
      },
      {
        id: 'gate_b',
        name: 'Gate B (East Main Entrance)',
        icon: '🚨',
        capacity: 4500,
        baselineWaitMin: 22,
        description: 'Primary entrance connecting to main parking lot and bus terminal.',
        hourly: {
          '10:00': 400, '11:00': 1200, '12:00': 2800, '12:30': 3500,
          '13:00': 3800, '13:30': 4200, '14:00': 1100, '15:00': 500,
          '16:00': 600, '17:00': 3900, '18:00': 4400, '19:00': 800
        },
        reasonsHigh: [
          'High ticket allocation assigned to East turnstiles',
          'Adjacent parking structure has reached 94% full capacity',
          'Turnstile scanner processing lag at primary plaza'
        ],
        reasonsLow: ['During match play after kickoff'],
        recommendationHigh: '⚠️ Gate B is approaching critical choke (84%). Divert to Gate A or Gate C.',
        alternativeSuggestion: '💡 Alternative: Walk 2 minutes south to Gate C (only 4 min wait).'
      },
      {
        id: 'gate_c',
        name: 'Gate C (South Entrance)',
        icon: '🚪',
        capacity: 3500,
        baselineWaitMin: 5,
        description: 'South pedestrian promenade entrance.',
        hourly: {
          '10:00': 150, '11:00': 300, '12:00': 700, '12:30': 850,
          '13:00': 900, '13:30': 1100, '14:00': 500, '15:00': 300,
          '16:00': 250, '17:00': 1400, '18:00': 2800, '19:00': 500
        },
        reasonsHigh: ['Pre-match ingress wave'],
        reasonsLow: ['Underutilized access point with 74% free capacity'],
        recommendationHigh: '★ Top Recommended Ingress: Gate C currently has fastest security clearance.',
        alternativeSuggestion: '💡 Connects seamlessly to South and East tier concourses.'
      },
      {
        id: 'gate_d',
        name: 'Gate D (West Entrance)',
        icon: '🚪',
        capacity: 4000,
        baselineWaitMin: 9,
        description: 'West entrance serving VIP and premium seating decks.',
        hourly: {
          '10:00': 300, '11:00': 600, '12:00': 1500, '12:30': 1900,
          '13:00': 2100, '13:30': 2300, '14:00': 800, '15:00': 400,
          '16:00': 350, '17:00': 2200, '18:00': 3200, '19:00': 600
        },
        reasonsHigh: ['Steady pre-match arrivals'],
        reasonsLow: ['Nominal operating flow'],
        recommendationHigh: 'Gate D operating at moderate 52% occupancy with 9 min queue.',
        alternativeSuggestion: '💡 Ideal for West Stand and VIP box holders.'
      },
      {
        id: 'food_court',
        name: 'Concourse Food Court',
        icon: '🍕',
        capacity: 3000,
        baselineWaitMin: 18,
        description: 'Inner ring food kiosks and beverage stands.',
        hourly: {
          '10:00': 50, '11:00': 200, '12:00': 800, '12:30': 1400,
          '13:00': 900, '13:30': 600, '14:00': 2750, '14:30': 2850,
          '15:00': 700, '16:00': 400, '17:00': 600, '18:00': 2200
        },
        reasonsHigh: ['Halftime interval rush (14:00–14:30) when 8,000 fans exit seats at once'],
        reasonsLow: ['During active match gameplay'],
        recommendationHigh: '🍕 Extreme halftime rush expected at 2:15 PM. Order via mobile app early.',
        alternativeSuggestion: '💡 Alternative: Express drink kiosks on Upper Deck are uncrowded.'
      },
      {
        id: 'main_exit',
        name: 'Main Egress Plaza',
        icon: '🚶',
        capacity: 8000,
        baselineWaitMin: 15,
        description: 'Perimeter stadium discharge boulevard.',
        hourly: {
          '10:00': 10, '12:00': 50, '14:00': 100, '16:00': 200,
          '17:00': 1200, '17:30': 4500, '18:00': 7600, '18:30': 5200,
          '19:00': 1800, '19:30': 400, '20:00': 100
        },
        reasonsHigh: ['Final whistle stadium egress (18:00) with 15,000 fans leaving together'],
        reasonsLow: ['Throughout the game'],
        recommendationHigh: '🚶 Massive post-match exit wave at 6:00 PM. Stagger departure by 15 mins.',
        alternativeSuggestion: '💡 Alternative: Exit via North Footbridge to subway.'
      }
    ]
  },
  {
    id: 'hospital',
    name: 'Hospital & Healthcare',
    icon: '🏥',
    tagline: 'Outpatient, Emergency & Diagnostics',
    description: 'Patient arrival patterns driven by morning specialist clinics, pharmacy pickup, and urgent care.',
    locations: [
      {
        id: 'registration',
        name: 'Registration & Billing',
        icon: '📋',
        capacity: 150,
        baselineWaitMin: 22,
        description: 'Main hospital patient intake and token issuance.',
        hourly: {
          '07:00': 40, '08:00': 95, '08:30': 130, '09:00': 142,
          '09:30': 138, '10:00': 125, '10:30': 110, '11:00': 85,
          '12:00': 60, '13:00': 40, '14:00': 70, '15:00': 55,
          '16:00': 35, '17:00': 20, '18:00': 15, '20:00': 10
        },
        reasonsHigh: ['Morning outpatient appointment token rush (8:30 AM – 10:00 AM)'],
        reasonsLow: ['Afternoon and evening hours'],
        recommendationHigh: '📋 Registration queue peaks at 9:00 AM (22 min wait). Online check-in recommended.',
        alternativeSuggestion: '💡 Use automated self-service kiosks in East Wing.'
      },
      {
        id: 'opd',
        name: 'OPD Consultation Block',
        icon: '🩺',
        capacity: 250,
        baselineWaitMin: 30,
        description: 'Specialist doctor consultation chambers and waiting lobbies.',
        hourly: {
          '07:00': 20, '08:00': 60, '09:00': 180, '09:30': 225,
          '10:00': 238, '10:30': 240, '11:00': 210, '11:30': 180,
          '12:00': 130, '13:00': 60, '14:00': 110, '15:00': 140,
          '16:00': 90, '17:00': 40, '18:00': 20, '20:00': 10
        },
        reasonsHigh: ['Simultaneous morning doctor consultation slots across Cardiology & Orthopedics'],
        reasonsLow: ['Midday doctor rounds and evening closure'],
        recommendationHigh: '🩺 Peak doctor waiting delays (30 mins) between 9:30 AM – 11:00 AM.',
        alternativeSuggestion: '💡 Book afternoon appointments (2:00 PM – 4:00 PM) for &lt;10m wait.'
      },
      {
        id: 'emergency',
        name: 'Emergency & Trauma Bay',
        icon: '🚑',
        capacity: 80,
        baselineWaitMin: 0,
        description: 'Critical patient care and ambulance trauma bay.',
        hourly: {
          '07:00': 15, '08:00': 18, '09:00': 22, '10:00': 25,
          '12:00': 28, '14:00': 30, '16:00': 32, '18:00': 35,
          '19:00': 40, '20:00': 38, '22:00': 30, '00:00': 20
        },
        reasonsHigh: ['Unscheduled emergency triage arrivals'],
        reasonsLow: ['Normal emergency buffer maintained (Always Priority 1)'],
        recommendationHigh: '🚑 Emergency access operates with zero triage delay. Dedicated corridor kept 100% clear.',
        alternativeSuggestion: '💡 Non-emergency cases routed to Urgent Care Annex.'
      },
      {
        id: 'pharmacy',
        name: 'Central Pharmacy',
        icon: '💊',
        capacity: 120,
        baselineWaitMin: 18,
        description: 'Prescription dispensation and medication counseling.',
        hourly: {
          '07:00': 10, '08:00': 25, '09:00': 60, '10:00': 95,
          '10:30': 112, '11:00': 115, '11:30': 105, '12:00': 90,
          '13:00': 50, '14:00': 60, '15:00': 85, '16:00': 70,
          '17:00': 40, '18:00': 25, '20:00': 15
        },
        reasonsHigh: ['Post-consultation patient prescription wave between 10:30 AM – 12:00 PM'],
        reasonsLow: ['Early morning and evening shifts'],
        recommendationHigh: '💊 Pharmacy counter wait is 18 minutes. Request home delivery via hospital app.',
        alternativeSuggestion: '💡 Counter 4 (Senior Citizen & Express) is clear.'
      },
      {
        id: 'waiting_area',
        name: 'Main Atrium Waiting Lounge',
        icon: '🪑',
        capacity: 200,
        baselineWaitMin: 0,
        description: 'Visitor seating area with cafeteria access.',
        hourly: {
          '07:00': 20, '08:00': 50, '09:00': 120, '10:00': 175,
          '11:00': 185, '12:00': 140, '13:00': 90, '14:00': 110,
          '15:00': 130, '16:00': 95, '17:00': 60, '18:00': 35
        },
        reasonsHigh: ['Attendants waiting during inpatient visiting hours & lab test processing'],
        reasonsLow: ['Outside visiting hours'],
        recommendationHigh: '🪑 Main atrium at 88% capacity. Garden Courtyard has empty seating.',
        alternativeSuggestion: '💡 Cafeteria lounge has free seats and real-time token display.'
      }
    ]
  },
  {
    id: 'cinema',
    name: 'Movie Theatre',
    icon: '🎬',
    tagline: 'Multiplex Screens, Box Office & Concessions',
    description: 'Pulsing crowd spikes during movie show transitions, interval popcorn rush, and blockbuster premiere nights.',
    locations: [
      {
        id: 'ticket_counter',
        name: 'Box Office & Ticket Counter',
        icon: '🎟️',
        capacity: 100,
        baselineWaitMin: 12,
        description: 'Physical ticket booking and online voucher exchange.',
        hourly: {
          '10:00': 15, '11:00': 40, '12:00': 75, '13:00': 60,
          '14:00': 35, '15:00': 55, '16:00': 85, '17:00': 60,
          '18:00': 92, '19:00': 88, '20:00': 45, '21:00': 70
        },
        reasonsHigh: ['Pre-show ticket pickup surge 20 mins before showtime'],
        reasonsLow: ['Between show departures'],
        recommendationHigh: '🎟️ Use QR e-tickets directly at turnstiles to bypass box office lines.',
        alternativeSuggestion: '💡 Self-service QR kiosks in lobby have zero queue.'
      },
      {
        id: 'food_counter',
        name: 'Popcorn & Snack Counter',
        icon: '🍿',
        capacity: 150,
        baselineWaitMin: 16,
        description: 'Concession stands serving food and beverages.',
        hourly: {
          '10:00': 10, '11:00': 25, '12:15': 140, '13:00': 30,
          '14:00': 20, '15:15': 145, '16:00': 35, '17:00': 30,
          '18:15': 148, '19:00': 40, '20:15': 135, '21:00': 30
        },
        reasonsHigh: ['15-minute movie interval synchronized across Screen 1 & Screen 2 (12:15 PM, 3:15 PM, 6:15 PM)'],
        reasonsLow: ['During movie playback inside halls'],
        recommendationHigh: '🍿 Interval rush alert! Pre-order snacks via seat QR code before interval starts.',
        alternativeSuggestion: '💡 Express Drinks counter on left has 2 min wait.'
      },
      {
        id: 'screen_1',
        name: 'Screen 1 (IMAX Hall)',
        icon: '📽️',
        capacity: 350,
        baselineWaitMin: 8,
        description: 'Main flagship 350-seat IMAX theater.',
        hourly: {
          '10:00': 20, '11:00': 340, '12:00': 345, '13:00': 340,
          '14:00': 40, '15:00': 335, '16:00': 340, '17:00': 330,
          '18:00': 50, '19:00': 348, '20:00': 350, '21:00': 340
        },
        reasonsHigh: ['Blockbuster showtime in progress (100% housefull)'],
        reasonsLow: ['Between shows during 30-min cleaning sweep'],
        recommendationHigh: '📽️ Screen 1 is 98% booked. Arrive 15 mins early for door check.',
        alternativeSuggestion: '💡 Screen 2 has available recliner seating for 4:00 PM show.'
      },
      {
        id: 'screen_2',
        name: 'Screen 2 (Dolby Atmos)',
        icon: '🔊',
        capacity: 250,
        baselineWaitMin: 6,
        description: '250-seat premium audio auditorium.',
        hourly: {
          '10:00': 15, '11:30': 210, '12:30': 220, '13:30': 210,
          '14:30': 30, '15:30': 230, '16:30': 235, '17:30': 220,
          '18:30': 35, '19:30': 245, '20:30': 240, '21:30': 230
        },
        reasonsHigh: ['Active showtime in progress'],
        reasonsLow: ['Cleaning sweep interval'],
        recommendationHigh: '🔊 Smooth entry flow at Screen 2 doors.',
        alternativeSuggestion: '💡 Best seats available in Row F & G.'
      },
      {
        id: 'exit_hall',
        name: 'Multiplex Exit Lobby',
        icon: '🚪',
        capacity: 200,
        baselineWaitMin: 6,
        description: 'Corridor connecting cinema exits to mall parking.',
        hourly: {
          '10:00': 5, '11:45': 180, '12:00': 30, '13:45': 185,
          '14:00': 25, '15:45': 190, '16:00': 30, '17:45': 192,
          '18:00': 35, '19:45': 195, '20:00': 40, '21:45': 180
        },
        reasonsHigh: ['Synchronized show credits roll and escalator crowd surge'],
        reasonsLow: ['During active shows'],
        recommendationHigh: '🚪 Show exit wave at 1:45 PM. Use West corridor stairs to reach parking faster.',
        alternativeSuggestion: '💡 Elevator lobby has a 5-minute queue during show endings.'
      }
    ]
  },
  {
    id: 'mall',
    name: 'Shopping Mall',
    icon: '🛍️',
    tagline: 'Retail Atrium, Food Court & Parking',
    description: 'Weekend shopper footfall, evening dining rush, and anchor store sale events.',
    locations: [
      {
        id: 'food_court',
        name: 'Level 3 Grand Food Court',
        icon: '🍜',
        capacity: 600,
        baselineWaitMin: 22,
        description: 'Multi-cuisine dining area with 20 brand outlets.',
        hourly: {
          '11:00': 60, '12:00': 240, '12:30': 480, '13:00': 570,
          '13:30': 540, '14:00': 380, '15:00': 180, '16:00': 220,
          '17:00': 310, '18:00': 420, '19:00': 550, '20:00': 585,
          '21:00': 490, '22:00': 150
        },
        reasonsHigh: ['Lunch rush (1:00 PM) and Dinner rush (7:30 PM–9:00 PM) on weekends'],
        reasonsLow: ['Mid-afternoon tea hours (3:00 PM – 4:30 PM)'],
        recommendationHigh: '🍜 Food court occupancy at 95% with 22m ordering queues. Visit between 3:00 PM–5:00 PM.',
        alternativeSuggestion: '💡 Ground Floor open-air cafes have immediate table seating.'
      },
      {
        id: 'main_entrance',
        name: 'Boulevard Main Entrance',
        icon: '🚪',
        capacity: 500,
        baselineWaitMin: 6,
        description: 'Ground floor security bag screening and revolving doors.',
        hourly: {
          '11:00': 110, '12:00': 220, '13:00': 310, '14:00': 280,
          '15:00': 290, '16:00': 380, '17:00': 440, '18:00': 475,
          '19:00': 460, '20:00': 380, '21:00': 210, '22:00': 80
        },
        reasonsHigh: ['Evening shopper inflow and metal detector bag checks'],
        reasonsLow: ['Morning opening period'],
        recommendationHigh: '🚪 Main entrance bag check queues peak at 6:00 PM.',
        alternativeSuggestion: '💡 Enter via South Garage Level P2 for zero wait.'
      },
      {
        id: 'parking',
        name: 'Multi-Level Car Parking',
        icon: '🅿️',
        capacity: 800,
        baselineWaitMin: 14,
        description: 'Basement Levels B1–B3 parking bays.',
        hourly: {
          '11:00': 180, '12:00': 410, '13:00': 620, '14:00': 640,
          '15:00': 610, '16:00': 690, '17:00': 760, '18:00': 785,
          '19:00': 790, '20:00': 750, '21:00': 510, '22:00': 220
        },
        reasonsHigh: ['Weekend evening parking saturation (98% full)'],
        reasonsLow: ['Weekday morning hours'],
        recommendationHigh: '🅿️ Basement B1 & B2 are 98% full. Direct vehicles to Overflow Deck B3.',
        alternativeSuggestion: '💡 Valet parking service available at West Gate.'
      },
      {
        id: 'anchor_stores',
        name: 'Hypermarket & Fashion Anchor',
        icon: '👗',
        capacity: 450,
        baselineWaitMin: 10,
        description: 'Large retail anchor store and billing counters.',
        hourly: {
          '11:00': 80, '12:00': 190, '13:00': 260, '14:00': 240,
          '15:00': 270, '16:00': 340, '17:00': 390, '18:00': 425,
          '19:00': 410, '20:00': 360, '21:00': 240, '22:00': 90
        },
        reasonsHigh: ['Weekend promotional discount sales & evening billing rush'],
        reasonsLow: ['Weekday midday hours'],
        recommendationHigh: '👗 Billing counters have a 10-minute queue. Self-checkout kiosks recommended.',
        alternativeSuggestion: '💡 Express scan-and-go mobile checkout is available in aisle 4.'
      }
    ]
  }
];

export const FUTURE_EXPANSION_VENUES = [
  { name: 'Airport Terminals', icon: '✈️', description: 'Baggage drop, security lanes, and departure gate congestion management.' },
  { name: 'Railway Stations', icon: '🚉', description: 'Platform footbridges, ticket counters, and connecting train surge balancing.' },
  { name: 'Metro Rapid Transit', icon: '🚇', description: 'Turnstile gate lines, transfer tunnels, and rush hour platform crowd pacing.' },
  { name: 'Cultural Festivals & Melas', icon: '🎉', description: 'Open-air pedestrian flow across festival grounds and food avenues.' },
  { name: 'Religious Gatherings & Temples', icon: '🛕', description: 'Serpentine holding compartments and darshan queue clearance.' },
  { name: 'Amusement Parks & Resorts', icon: '🎡', description: 'Ride standby wait-time optimization and parade crowd vectors.' },
  { name: 'Government Civic Centers', icon: '🏛️', description: 'Public grievance halls, identity verification desks, and hearing galleries.' },
  { name: 'Concerts & Music Arenas', icon: '🎵', description: 'Standing pit surge prevention, turnstile access, and merch zones.' },
];
