import pptxgen from 'pptxgenjs';
import fs from 'fs';
import path from 'path';

async function generateDeck() {
  const pptx = new pptxgen();

  // Explicitly define standard 16:9 Widescreen (13.333 x 7.5 inches)
  pptx.defineLayout({ name: 'WIDESCREEN_16_9', width: 13.333, height: 7.5 });
  pptx.layout = 'WIDESCREEN_16_9';

  pptx.author = 'Synapse³';
  pptx.company = 'Ideathon 2K26';
  pptx.title = 'FlowSafe AI — Pitch Deck';
  pptx.subject = 'Predict. Prevent. Protect.';

  // Theme Colors
  const COLORS = {
    primary: '2563EB',      // Tech Blue
    primaryDark: '1E40AF',  // Deep Blue
    darkBg: '0F172A',       // Slate 900
    cardBg: 'F8FAFC',       // Slate 50
    cardBorder: 'E2E8F0',   // Slate 200
    textDark: '0F172A',     // Slate 900
    textMuted: '64748B',    // Slate 500
    emerald: '059669',      // Success Green
    amber: 'D97706',        // Warning Amber
    red: 'DC2626',          // Critical Red
    purple: '7C3AED',       // Purple Accent
    white: 'FFFFFF'
  };

  // Helper to add consistent Header to slides within safe boundaries
  function addSlideHeader(slide, badgeText, titleText, subtitleText) {
    // Top Badge
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 0.45, w: 2.2, h: 0.32,
      fill: { color: 'EFF6FF' },
      line: { color: 'BFDBFE', width: 1 },
      radius: 0.08
    });
    slide.addText(badgeText.toUpperCase(), {
      x: 0.8, y: 0.45, w: 2.2, h: 0.32,
      fontSize: 9, fontFace: 'Arial', bold: true, color: COLORS.primary,
      align: 'center', valign: 'middle'
    });

    // Sub-header right
    slide.addText('FlowSafe AI • Synapse³', {
      x: 8.5, y: 0.45, w: 4.0, h: 0.32,
      fontSize: 10, fontFace: 'Arial', color: COLORS.textMuted,
      align: 'right', valign: 'middle'
    });

    // Main Title
    slide.addText(titleText, {
      x: 0.8, y: 0.85, w: 11.7, h: 0.45,
      fontSize: 20, fontFace: 'Arial', bold: true, color: COLORS.textDark,
      valign: 'top'
    });

    // Subtitle
    slide.addText(subtitleText, {
      x: 0.8, y: 1.32, w: 11.7, h: 0.3,
      fontSize: 11, fontFace: 'Arial', color: COLORS.textMuted,
      valign: 'top'
    });

    // Divider line (cleanly within bounds)
    slide.addShape(pptx.ShapeType.line, {
      x: 0.8, y: 1.7, w: 11.7, h: 0,
      line: { color: 'E2E8F0', width: 1 }
    });
  }

  // ==========================================
  // SLIDE 1: Title Slide (Dark Tech Theme)
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: COLORS.darkBg };

    // Logo Icon Box
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 5.9, y: 1.1, w: 1.5, h: 1.5,
      fill: { color: COLORS.primary },
      radius: 0.25
    });
    slide.addText('F', {
      x: 5.9, y: 1.1, w: 1.5, h: 1.5,
      fontSize: 50, fontFace: 'Arial', bold: true, color: COLORS.white,
      align: 'center', valign: 'middle'
    });

    // Brand Name & Tagline
    slide.addText('FLOWSAFE.AI', {
      x: 1.0, y: 2.8, w: 11.33, h: 0.7,
      fontSize: 38, fontFace: 'Arial', bold: true, color: COLORS.white,
      align: 'center', valign: 'middle'
    });

    slide.addText('“Predict. Prevent. Protect.”', {
      x: 1.0, y: 3.55, w: 11.33, h: 0.45,
      fontSize: 20, fontFace: 'Arial', bold: true, color: '60A5FA',
      align: 'center', valign: 'middle'
    });

    slide.addText('Context-Aware AI Platform for Pre-Congestion Prediction & Proactive Safety', {
      x: 1.0, y: 4.05, w: 11.33, h: 0.35,
      fontSize: 12, fontFace: 'Arial', color: '94A3B8',
      align: 'center', valign: 'middle'
    });

    // Team Card
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 4.2, y: 4.7, w: 4.9, h: 1.5,
      fill: { color: '1E293B' },
      line: { color: '334155', width: 1 },
      radius: 0.15
    });
    slide.addText('TEAM: SYNAPSE³', {
      x: 4.2, y: 4.85, w: 4.9, h: 0.3,
      fontSize: 11, fontFace: 'Arial', bold: true, color: '38BDF8',
      align: 'center', valign: 'middle'
    });
    slide.addText('“Three Minds. One Intelligent Future.”\nIdeathon 2K26 Open Innovation Prototype', {
      x: 4.2, y: 5.2, w: 4.9, h: 0.8,
      fontSize: 11, fontFace: 'Arial', color: 'CBD5E1',
      align: 'center', valign: 'middle'
    });
  }

  // ==========================================
  // SLIDE 2: Problem Statement
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    addSlideHeader(slide, 'Problem Statement', 'The Dilemma of Reactive Crowd Management', 'Why current safety and monitoring systems fail to prevent congestion');

    // Central Callout Banner
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 1.9, w: 11.7, h: 0.65,
      fill: { color: 'FEF2F2' },
      line: { color: 'FECACA', width: 1 },
      radius: 0.12
    });
    slide.addText('🔴 CORE PROBLEM: “Most systems react AFTER overcrowding has already occurred.”', {
      x: 0.8, y: 1.9, w: 11.7, h: 0.65,
      fontSize: 13, fontFace: 'Arial', bold: true, color: '991B1B',
      align: 'center', valign: 'middle'
    });

    // 3 Problem Cards
    const problems = [
      {
        icon: '📹',
        title: '1. Blind Reactive CCTV',
        desc: 'Security cameras and turnstiles only detect crowds when queues are already jammed, leaving zero response window.'
      },
      {
        icon: '⏳',
        title: '2. Severe Time Waste',
        desc: 'Students and visitors lose 20–30 minutes in canteen, elevator, and gate lines with zero forward visibility.'
      },
      {
        icon: '🚨',
        title: '3. Sudden Surge Hazard',
        desc: 'Rain, bell intervals, or door delays cause instant human surges that escalate into dangerous stampede risks.'
      }
    ];

    problems.forEach((p, i) => {
      const xPos = 0.8 + i * 4.0;
      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos, y: 2.75, w: 3.7, h: 4.1,
        fill: { color: 'F8FAFC' },
        line: { color: 'E2E8F0', width: 1 },
        radius: 0.15
      });

      slide.addText(p.icon, {
        x: xPos + 0.3, y: 2.95, w: 3.1, h: 0.6,
        fontSize: 26, fontFace: 'Arial', valign: 'top'
      });

      slide.addText(p.title, {
        x: xPos + 0.3, y: 3.65, w: 3.1, h: 0.4,
        fontSize: 13, fontFace: 'Arial', bold: true, color: COLORS.textDark,
        valign: 'top'
      });

      slide.addText(p.desc, {
        x: xPos + 0.3, y: 4.15, w: 3.1, h: 2.4,
        fontSize: 11, fontFace: 'Arial', color: COLORS.textMuted,
        valign: 'top', lineSpacingMultiple: 1.25
      });
    });
  }

  // ==========================================
  // SLIDE 3: The Solution (Core Innovation)
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    addSlideHeader(slide, 'Our Solution', 'FlowSafe AI: Pre-Congestion Intelligence', 'Transforming crowd management from reactive panic to proactive prevention');

    // Tagline Banner
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 1.9, w: 11.7, h: 0.65,
      fill: { color: 'EFF6FF' },
      line: { color: 'BFDBFE', width: 1 },
      radius: 0.12
    });
    slide.addText('💡 PHILOSOPHY: “Don’t wait until a place becomes crowded. Know before you go.”', {
      x: 0.8, y: 1.9, w: 11.7, h: 0.65,
      fontSize: 13, fontFace: 'Arial', bold: true, color: COLORS.primaryDark,
      align: 'center', valign: 'middle'
    });

    // 3 Core Pillars
    const pillars = [
      {
        badge: 'QUESTION 1',
        badgeColor: COLORS.primary,
        badgeBg: 'DBEAFE',
        title: '1. What is happening now?',
        desc: 'Simulated real-time clock synchronization, zone occupancy status, and lookahead slope indicators (↗ / ↘ / →).'
      },
      {
        badge: 'QUESTION 2',
        badgeColor: COLORS.purple,
        badgeBg: 'F3E8FF',
        title: '2. What will happen at time T?',
        desc: 'Historical baseline footfall curves forecasting expected occupancy percentage and exact queue wait minutes.'
      },
      {
        badge: 'QUESTION 3',
        badgeColor: COLORS.emerald,
        badgeBg: 'D1FAE5',
        title: '3. What should we do?',
        desc: '4-pillar action guidance: Optimal visiting windows, low-crowd alternative zones, visitor advice, and operator directives.'
      }
    ];

    pillars.forEach((pil, i) => {
      const xPos = 0.8 + i * 4.0;
      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos, y: 2.75, w: 3.7, h: 4.1,
        fill: { color: 'FFFFFF' },
        line: { color: 'CBD5E1', width: 1.2 },
        radius: 0.15
      });

      // Badge
      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos + 0.3, y: 2.95, w: 1.5, h: 0.28,
        fill: { color: pil.badgeBg },
        radius: 0.08
      });
      slide.addText(pil.badge, {
        x: xPos + 0.3, y: 2.95, w: 1.5, h: 0.28,
        fontSize: 8.5, fontFace: 'Arial', bold: true, color: pil.badgeColor,
        align: 'center', valign: 'middle'
      });

      slide.addText(pil.title, {
        x: xPos + 0.3, y: 3.4, w: 3.1, h: 0.45,
        fontSize: 12.5, fontFace: 'Arial', bold: true, color: COLORS.textDark,
        valign: 'top'
      });

      slide.addText(pil.desc, {
        x: xPos + 0.3, y: 3.95, w: 3.1, h: 2.6,
        fontSize: 10.5, fontFace: 'Arial', color: COLORS.textMuted,
        valign: 'top', lineSpacingMultiple: 1.25
      });
    });
  }

  // ==========================================
  // SLIDE 4: Live Decision Matrix
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    addSlideHeader(slide, 'Live Intelligence', '“Can I Go Now, or Should I Wait?”', '4-state deterministic recommendation matrix answering the visitor decision dilemma');

    const matrix = [
      {
        status: '✅ Good to go now',
        condition: 'Low Crowd (< 45%)',
        desc: 'Immediate entry throughput and short waiting time (< 3 mins). Best time to visit.',
        border: '6EE7B7', bg: 'ECFDF5', text: '065F46'
      },
      {
        status: '⏳ Better in ~10 mins',
        condition: 'Crowd Decreasing (↘)',
        desc: 'Crowd is clearing out rapidly. Waiting approximately 10 minutes cuts queue delay by ~60%.',
        border: 'FDE68A', bg: 'FFFBEB', text: '92400E'
      },
      {
        status: "🚫 Don't go now",
        condition: 'Crowd Increasing (↗, ≥65%)',
        desc: 'Heavy bottleneck building up. Dynamic best upcoming time slot provided to avoid queue frustration.',
        border: 'FCA5A5', bg: 'FEF2F2', text: '991B1B'
      },
      {
        status: '🟡 Acceptable now',
        condition: 'Moderate & Stable (45%–65%)',
        desc: 'Steady manageable footfall. Safe to visit with standard queue processing latency.',
        border: 'E2E8F0', bg: 'F8FAFC', text: '334155'
      }
    ];

    matrix.forEach((m, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const xPos = 0.8 + col * 6.0;
      const yPos = 1.95 + row * 2.5;

      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos, y: yPos, w: 5.7, h: 2.3,
        fill: { color: m.bg },
        line: { color: m.border, width: 1.5 },
        radius: 0.15
      });

      slide.addText(m.status, {
        x: xPos + 0.3, y: yPos + 0.2, w: 3.5, h: 0.35,
        fontSize: 13.5, fontFace: 'Arial', bold: true, color: m.text,
        valign: 'middle'
      });

      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos + 3.8, y: yPos + 0.2, w: 1.6, h: 0.3,
        fill: { color: 'FFFFFF' },
        line: { color: m.border, width: 1 },
        radius: 0.08
      });
      slide.addText(m.condition, {
        x: xPos + 3.8, y: yPos + 0.2, w: 1.6, h: 0.3,
        fontSize: 8.5, fontFace: 'Arial', bold: true, color: m.text,
        align: 'center', valign: 'middle'
      });

      slide.addText(m.desc, {
        x: xPos + 0.3, y: yPos + 0.65, w: 5.1, h: 1.4,
        fontSize: 10.5, fontFace: 'Arial', color: COLORS.textDark,
        valign: 'top', lineSpacingMultiple: 1.25
      });
    });
  }

  // ==========================================
  // SLIDE 5: 4-Pillar Action Plan
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    addSlideHeader(slide, 'Action Intelligence', 'The 4-Pillar FlowSafe Action Plan', 'Turning crowd predictions into actionable relief for visitors and managers');

    const pillars = [
      {
        icon: '🕐',
        title: '1. Optimal Visiting Windows',
        desc: 'Calculates primary and secondary low-tide slots strictly within the venue’s operating hours (e.g. 10:30 AM & 2:15 PM for College).',
        highlight: 'Clamped strictly to 8:30 AM - 4:00 PM'
      },
      {
        icon: '🧭',
        title: '2. Alternative Low-Crowd Zones',
        desc: 'Surfaces nearby low-density areas (e.g. Library Annex or Sports Ground) with live available headroom to distribute footfall.',
        highlight: '1-Click Interactive Navigation'
      },
      {
        icon: '📱',
        title: '3. Visitor Action Guide',
        desc: 'Actionable visitor advice: Pre-order cafeteria meals via pass, transit via secondary stairwells, and stagger interval arrivals.',
        highlight: 'Saves 15-20 mins per person'
      },
      {
        icon: '🏢',
        title: '4. Management Directives',
        desc: 'Concrete operational directives: Open auxiliary counters, broadcast digital signage alerts, and station crowd marshals.',
        highlight: 'Eliminates Stampede Risks'
      }
    ];

    pillars.forEach((p, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const xPos = 0.8 + col * 6.0;
      const yPos = 1.95 + row * 2.5;

      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos, y: yPos, w: 5.7, h: 2.3,
        fill: { color: 'FFFFFF' },
        line: { color: 'CBD5E1', width: 1 },
        radius: 0.15
      });

      slide.addText(`${p.icon}  ${p.title}`, {
        x: xPos + 0.3, y: yPos + 0.2, w: 5.1, h: 0.35,
        fontSize: 12.5, fontFace: 'Arial', bold: true, color: COLORS.textDark,
        valign: 'middle'
      });

      slide.addText(p.desc, {
        x: xPos + 0.3, y: yPos + 0.65, w: 5.1, h: 1.0,
        fontSize: 10, fontFace: 'Arial', color: COLORS.textMuted,
        valign: 'top', lineSpacingMultiple: 1.2
      });

      slide.addText(`✓ ${p.highlight}`, {
        x: xPos + 0.3, y: yPos + 1.75, w: 5.1, h: 0.3,
        fontSize: 9, fontFace: 'Arial', bold: true, color: COLORS.primary,
        valign: 'middle'
      });
    });
  }

  // ==========================================
  // SLIDE 6: What-If Scenario Stress Lab
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    addSlideHeader(slide, 'Resilience Testing', '“What-If?” Scenario Stress Laboratory', 'Simulating unpredicted crowd spikes and proving proactive AI mitigation');

    // 3-Card Comparison Row
    const cards = [
      {
        title: '1. Baseline State',
        crowd: '140 / 300',
        occupancy: '47% Occupancy',
        wait: '4 min wait (Stable)',
        border: 'CBD5E1', bg: 'F8FAFC', text: '334155'
      },
      {
        title: '2. Unmanaged Surge (+125)',
        crowd: '265 / 300',
        occupancy: '88% Occupancy',
        wait: '24 min wait (CRITICAL)',
        border: 'FCA5A5', bg: 'FEF2F2', text: '991B1B'
      },
      {
        title: '3. With FlowSafe AI Mitigation',
        crowd: '185 / 300',
        occupancy: '62% Occupancy',
        wait: '6 min wait (-75% Reduction)',
        border: '6EE7B7', bg: 'ECFDF5', text: '065F46'
      }
    ];

    cards.forEach((c, i) => {
      const xPos = 0.8 + i * 4.0;
      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos, y: 1.95, w: 3.7, h: 2.3,
        fill: { color: c.bg },
        line: { color: c.border, width: 1.5 },
        radius: 0.15
      });

      slide.addText(c.title.toUpperCase(), {
        x: xPos + 0.2, y: 2.1, w: 3.3, h: 0.3,
        fontSize: 9.5, fontFace: 'Arial', bold: true, color: c.text,
        align: 'center'
      });

      slide.addText(c.crowd, {
        x: xPos + 0.2, y: 2.45, w: 3.3, h: 0.5,
        fontSize: 18, fontFace: 'Arial', bold: true, color: c.text,
        align: 'center'
      });

      slide.addText(`${c.occupancy}\n${c.wait}`, {
        x: xPos + 0.2, y: 3.05, w: 3.3, h: 0.9,
        fontSize: 10.5, fontFace: 'Arial', color: c.text,
        align: 'center', lineSpacingMultiple: 1.2
      });
    });

    // Proactive Mitigation Explanation Banner
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 4.45, w: 11.7, h: 2.35,
      fill: { color: 'FAF5FF' },
      line: { color: 'E9D5FF', width: 1 },
      radius: 0.15
    });

    slide.addText('⚡ PROACTIVE BALANCING & MITIGATION DIRECTIVES', {
      x: 1.1, y: 4.65, w: 11.1, h: 0.3,
      fontSize: 11, fontFace: 'Arial', bold: true, color: COLORS.purple
    });

    slide.addText('• Dynamic Redirection: Divert ~45% of incoming visitors to low-density zones (e.g. Library Annex or Sports Ground).\n• Operational Scaling: Open Auxiliary Counter 3 and deploy 2 floor marshals to maintain single-file flow.\n• Digital Broadcast: Push mobile timetable delay alerts to stagger incoming visitor intervals.', {
      x: 1.1, y: 5.05, w: 11.1, h: 1.5,
      fontSize: 10.5, fontFace: 'Arial', color: '581C87',
      lineSpacingMultiple: 1.3
    });
  }

  // ==========================================
  // SLIDE 7: Privacy-First Architecture
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    addSlideHeader(slide, 'Technology & Privacy', 'Hardware-Agnostic & Privacy-First Architecture', 'Seamless edge deployment with zero biometric tracking or facial recognition');

    const sensors = [
      {
        icon: '📹',
        title: 'CCTV Optical AI',
        desc: 'Lightweight edge bounding box person counts. Video frames processed in volatile RAM and discarded instantly.'
      },
      {
        icon: '📶',
        title: 'WiFi / BLE Probes',
        desc: 'Passive radio signal density tracking for broad corridor movement without capturing MAC addresses or PII.'
      },
      {
        icon: '🎟️',
        title: 'Turnstile APIs',
        desc: 'Live gate entry/exit scan throughput for high-accuracy headcount calibration per entrance portal.'
      },
      {
        icon: '📱',
        title: 'Context Signals',
        desc: 'Voluntary mobile timetable sync and schedule feeds to anticipate scheduled group dismissals.'
      }
    ];

    sensors.forEach((s, i) => {
      const xPos = 0.8 + i * 3.0;
      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos, y: 1.95, w: 2.75, h: 3.1,
        fill: { color: 'F8FAFC' },
        line: { color: 'E2E8F0', width: 1 },
        radius: 0.15
      });

      slide.addText(s.icon, {
        x: xPos + 0.2, y: 2.15, w: 2.35, h: 0.5,
        fontSize: 24, fontFace: 'Arial', align: 'center'
      });

      slide.addText(s.title, {
        x: xPos + 0.2, y: 2.75, w: 2.35, h: 0.4,
        fontSize: 11.5, fontFace: 'Arial', bold: true, color: COLORS.textDark,
        align: 'center'
      });

      slide.addText(s.desc, {
        x: xPos + 0.2, y: 3.2, w: 2.35, h: 1.7,
        fontSize: 9.5, fontFace: 'Arial', color: COLORS.textMuted,
        align: 'center', lineSpacingMultiple: 1.2
      });
    });

    // Privacy Guarantee Callout
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 5.25, w: 11.7, h: 1.5,
      fill: { color: 'EFF6FF' },
      line: { color: 'BFDBFE', width: 1 },
      radius: 0.15
    });

    slide.addText('🔒 100% PRIVACY COMPLIANT & EDGE-READY', {
      x: 1.1, y: 5.45, w: 11.1, h: 0.3,
      fontSize: 11, fontFace: 'Arial', bold: true, color: COLORS.primaryDark
    });

    slide.addText('Zero facial recognition • Zero biometric profiling • Zero personal data storage • Compatible with standard IP cameras', {
      x: 1.1, y: 5.85, w: 11.1, h: 0.6,
      fontSize: 10.5, fontFace: 'Arial', color: COLORS.primaryDark
    });
  }

  // ==========================================
  // SLIDE 8: Scalability Across 16 Venues
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    addSlideHeader(slide, 'Market Scope', 'Scalability Across 16 High-Footfall Ecosystems', 'Modular, plug-and-play parameter tuning for diverse human density topologies');

    const venues = [
      { icon: '🏫', name: 'Colleges & Campuses', desc: 'Canteens, Labs, Auditoriums, Gates' },
      { icon: '🏟️', name: 'Stadiums & Arenas', desc: 'Turnstile Gates, Concourse, Exits' },
      { icon: '🏥', name: 'Hospitals & Medical', desc: 'OPD Clinics, Pharmacy, Emergency' },
      { icon: '🎬', name: 'Theatres & Cinemas', desc: 'Box Office, Foyer, Concessions' },
      { icon: '🛍️', name: 'Malls & Retail Centers', desc: 'Food Courts, Anchor Stores, Parking' },
      { icon: '✈️', name: 'Airports & Terminals', desc: 'Security Screening & Baggage Drop' },
      { icon: '🚇', name: 'Metro & Railway Hubs', desc: 'Stairwells, Escalators, Platforms' },
      { icon: '🎪', name: 'Pilgrimage & Festivals', desc: 'Religious Shrines & Stampede Defense' },
    ];

    venues.forEach((v, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const xPos = 0.8 + col * 3.0;
      const yPos = 1.95 + row * 2.45;

      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos, y: yPos, w: 2.75, h: 2.25,
        fill: { color: 'FFFFFF' },
        line: { color: 'E2E8F0', width: 1 },
        radius: 0.15
      });

      slide.addText(`${v.icon} ${v.name}`, {
        x: xPos + 0.2, y: yPos + 0.2, w: 2.35, h: 0.45,
        fontSize: 10.5, fontFace: 'Arial', bold: true, color: COLORS.textDark,
        valign: 'top'
      });

      slide.addText(v.desc, {
        x: xPos + 0.2, y: yPos + 0.7, w: 2.35, h: 1.3,
        fontSize: 9.5, fontFace: 'Arial', color: COLORS.textMuted,
        valign: 'top', lineSpacingMultiple: 1.2
      });
    });
  }

  // ==========================================
  // SLIDE 9: Quantified ROI & Impact
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    addSlideHeader(slide, 'Measurable Impact', 'Quantified Value & Return on Investment', 'Real-world impact metrics proving the efficiency and safety of FlowSafe AI');

    const metrics = [
      {
        num: '-75%',
        label: 'Wait Time Reduction',
        desc: 'Peak queue frustration cut from 25 mins to under 6 mins with proactive arrival smoothing.',
        color: COLORS.emerald, bg: 'ECFDF5', border: 'A7F3D0'
      },
      {
        num: '100%',
        label: 'Pre-Congestion Warning',
        desc: '15 to 30 minute early prediction window allows managers to act before chokepoints clog.',
        color: COLORS.primary, bg: 'EFF6FF', border: 'BFDBFE'
      },
      {
        num: 'Zero',
        label: 'New Hardware Capex',
        desc: 'Integrates natively with existing IP cameras, turnstile gates, and timetable database APIs.',
        color: COLORS.purple, bg: 'FAF5FF', border: 'E9D5FF'
      }
    ];

    metrics.forEach((m, i) => {
      const xPos = 0.8 + i * 4.0;
      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos, y: 1.95, w: 3.7, h: 4.8,
        fill: { color: m.bg },
        line: { color: m.border, width: 1.5 },
        radius: 0.2
      });

      slide.addText(m.num, {
        x: xPos + 0.3, y: 2.35, w: 3.1, h: 0.9,
        fontSize: 40, fontFace: 'Arial', bold: true, color: m.color,
        align: 'center'
      });

      slide.addText(m.label.toUpperCase(), {
        x: xPos + 0.3, y: 3.35, w: 3.1, h: 0.4,
        fontSize: 12.5, fontFace: 'Arial', bold: true, color: COLORS.textDark,
        align: 'center'
      });

      slide.addText(m.desc, {
        x: xPos + 0.3, y: 3.9, w: 3.1, h: 2.5,
        fontSize: 10.5, fontFace: 'Arial', color: COLORS.textMuted,
        align: 'center', lineSpacingMultiple: 1.3
      });
    });
  }

  // ==========================================
  // SLIDE 10: Conclusion & Thank You (Dark Tech Theme)
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: COLORS.darkBg };

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 5.9, y: 1.2, w: 1.5, h: 1.5,
      fill: { color: COLORS.primary },
      radius: 0.25
    });
    slide.addText('F', {
      x: 5.9, y: 1.2, w: 1.5, h: 1.5,
      fontSize: 50, fontFace: 'Arial', bold: true, color: COLORS.white,
      align: 'center', valign: 'middle'
    });

    slide.addText('FLOWSAFE AI', {
      x: 1.0, y: 2.9, w: 11.33, h: 0.65,
      fontSize: 36, fontFace: 'Arial', bold: true, color: COLORS.white,
      align: 'center'
    });

    slide.addText('“Predict. Prevent. Protect.”', {
      x: 1.0, y: 3.6, w: 11.33, h: 0.45,
      fontSize: 20, fontFace: 'Arial', bold: true, color: '60A5FA',
      align: 'center'
    });

    slide.addText('Transforming how millions navigate high-density spaces safely, smartly, and smoothly.\nThank you! We are open for Questions & Feedback.', {
      x: 1.0, y: 4.2, w: 11.33, h: 0.75,
      fontSize: 12.5, fontFace: 'Arial', color: '94A3B8',
      align: 'center', lineSpacingMultiple: 1.3
    });

    // Team Pill
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 4.6, y: 5.2, w: 4.1, h: 0.7,
      fill: { color: '1E293B' },
      line: { color: '334155', width: 1 },
      radius: 0.15
    });
    slide.addText('Team: Synapse³  •  Ideathon 2K26 Finalist', {
      x: 4.6, y: 5.2, w: 4.1, h: 0.7,
      fontSize: 11, fontFace: 'Arial', bold: true, color: '38BDF8',
      align: 'center', valign: 'middle'
    });
  }

  // Save the PPTX file
  const outPathV2 = path.resolve('FlowSafe_AI_Pitch_Deck_v2.pptx');
  await pptx.writeFile({ fileName: outPathV2 });
  console.log(`✅ PowerPoint PPTX presentation perfectly formatted and saved at: ${outPathV2}`);

  try {
    const outPathMain = path.resolve('FlowSafe_AI_Ideathon_Pitch_Deck.pptx');
    await pptx.writeFile({ fileName: outPathMain });
    console.log(`✅ Also updated: ${outPathMain}`);
  } catch (err) {
    console.log('ℹ️ FlowSafe_AI_Ideathon_Pitch_Deck.pptx was currently open in PowerPoint. Saved as FlowSafe_AI_Pitch_Deck_v2.pptx');
  }
}

generateDeck().catch(console.error);
