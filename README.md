# FlowSafe AI — Predictive Crowd Intelligence Platform

> **Tagline:** *Predict. Prevent. Protect.*  
> **Team:** *Synapse³*  
> **Event:** *IDEATHON 2K26*

---

## 🚀 Overview

**FlowSafe AI** is a general-purpose, AI-powered predictive crowd intelligence platform designed for high-footfall environments. Rather than relying on traditional reactive camera counting (*DETECT → ALERT → REACT*), FlowSafe AI projects future queue curves 15–30 minutes in advance to prevent dangerous bottlenecks (*PREDICT → RECOMMEND → REDISTRIBUTE → PREVENT*).

---

## 🌟 Key Capabilities

1. **Multi-Environment Adaptability (16+ Venues)**:
   - 🏟️ Stadiums (Primary Demo Scenario with 4 Gates)
   - 🎵 Concerts & Arenas
   - ✈️ Airport Terminals
   - 🚉 Railway Stations
   - 🚇 Metro Stations
   - 🏥 Hospitals & Healthcare Facilities
   - 🛍️ Shopping Malls
   - 🏫 College & University Campuses
   - 🎪 Exhibitions & Trade Centers
   - 🎉 Cultural Festivals & Melas
   - 🛕 Religious Gatherings & Pilgrimage Sites
   - 🎡 Amusement & Theme Parks
   - 🏛️ Government Facilities & Civic Centers
   - 🚌 Bus Terminals & Transit Hubs
   - 🏖️ Tourist Attractions & Monuments
   - ➕ **Custom Venue Builder** (Dynamic user-configured capacity, gates & zones)

2. **Interactive 2D Spatial Telemetry**:
   - Stylized SVG/HTML 4-gate radar with live occupancy indicators, heat halos, and gate inspection modals.

3. **Deterministic Multi-Horizon AI Forecasting**:
   - 15m, 30m, and 60m fluid queue projections with 87% prototype model confidence.
   - **Explainable AI (XAI)** decomposing predictions into 5 contextual causal drivers.

4. **Predictive Crowd Redistribution**:
   - Head-to-head comparison (*Without FlowSafe* 96% choke vs *With FlowSafe* 71% balanced load).
   - Reduces average wait times from 24 min down to 11 min.

5. **"What Happens If?" Interactive Sandbox**:
   - Real-time adjustment of visitor surplus (+0–2000), event types, gate closures, and service speeds.

6. **Privacy-First Safety Intelligence**:
   - Voluntary, user-controlled check-ins triggered by aggregate density (no facial recognition, no continuous personal tracking).

7. **Emergency Decision Support Drill**:
   - Dynamic evacuation re-routing around obstructed exit corridors.

8. **Venue Intelligence Analytics**:
   - 6 comprehensive Recharts visualizations and automated AI insight synthesis.

9. **2-Minute Ideathon Pitch Assistant**:
   - Built-in synchronized 10-step presenter guide with live UI navigation.

---

## 🛠️ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Launch development server
npm run dev

# 3. Build for production
npm run build
```

---

## 🏛️ Architecture

```
src/
├── services/
│   └── predictionService.js      # Deterministic AI prediction & recommendation engine
├── context/
│   └── AppStateContext.jsx        # Global reactive state management
├── data/
│   ├── environments.js           # 16 High-footfall venue configurations
│   ├── scenarios.js              # 5 Demo scenario presets
│   └── crowdData.js              # Historical baseline & analytics data
├── components/
│   ├── common/                   # Reusable badges, metric cards, concept banners
│   ├── layout/                   # Sidebar, Header, Modals, Drawers & Pitch Guide
│   └── venue/                    # 2D Stadium Map & Generic Venue layouts
└── pages/                        # 9 Dedicated feature dashboards
```

---

## 👥 Team Synapse³ — Ideathon 2K26
*Predict. Prevent. Protect.*
