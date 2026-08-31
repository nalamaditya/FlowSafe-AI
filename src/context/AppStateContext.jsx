import React, { createContext, useContext, useState, useMemo } from 'react';
import { ENVIRONMENTS } from '../data/environments';
import { DEMO_SCENARIOS } from '../data/scenarios';
import { predictCrowd, generateRecommendation, simulateRedistribution } from '../services/predictionService';

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  // Environments & active environment
  const [environments, setEnvironments] = useState(ENVIRONMENTS);
  const [activeEnvId, setActiveEnvId] = useState('stadium');
  
  // Active demo scenario (defaults to 'major_event' for vivid demo with Gate B at 84%)
  const [activeScenarioId, setActiveScenarioId] = useState('major_event');
  
  // Selected gate for deep inspection
  const [selectedGateId, setSelectedGateId] = useState('gate_b');
  
  // Prediction trigger counter (forces fresh re-evaluation animations)
  const [predictionRunTime, setPredictionRunTime] = useState(Date.now());
  const [isPredicting, setIsPredicting] = useState(false);

  // Active page navigation
  const [activePage, setActivePage] = useState('overview');

  // Modals & Drawers
  const [isEnvModalOpen, setIsEnvModalOpen] = useState(false);
  const [isCustomVenueModalOpen, setIsCustomVenueModalOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isPitchGuideOpen, setIsPitchGuideOpen] = useState(false);
  const [pitchStep, setPitchStep] = useState(0);

  // Safety voluntary assistance state
  const [safetyState, setSafetyState] = useState({
    status: 'idle', // 'idle' | 'ok' | 'assistance_requested'
    zone: 'Gate B (East Stand)',
    timestamp: null,
    ticketId: null
  });

  // Active Environment object
  const activeEnvironment = useMemo(() => {
    return environments.find(e => e.id === activeEnvId) || environments[0];
  }, [environments, activeEnvId]);

  // Active Scenario object
  const activeScenario = useMemo(() => {
    return DEMO_SCENARIOS.find(s => s.id === activeScenarioId) || DEMO_SCENARIOS[2];
  }, [activeScenarioId]);

  // Processed live gates with predictions
  const liveGates = useMemo(() => {
    return activeEnvironment.gates.map(gate => {
      const isSurge = activeScenario.surgeGate === gate.id;
      return predictCrowd(gate, activeScenario.multiplier, 0, isSurge);
    });
  }, [activeEnvironment, activeScenario, predictionRunTime]);

  // Active selected gate object
  const selectedGate = useMemo(() => {
    return liveGates.find(g => g.gateId === selectedGateId) || liveGates[1] || liveGates[0];
  }, [liveGates, selectedGateId]);

  // Recommendation based on active gates
  const activeRecommendation = useMemo(() => {
    return generateRecommendation(activeEnvironment.gates, activeScenario);
  }, [activeEnvironment, activeScenario, predictionRunTime]);

  // Redistribution scenario
  const redistributionData = useMemo(() => {
    return simulateRedistribution(activeScenarioId);
  }, [activeScenarioId]);

  // Total venue current crowd
  const totalCrowd = useMemo(() => {
    return liveGates.reduce((acc, g) => acc + g.current, 0);
  }, [liveGates]);

  // Average wait time
  const averageWaitTime = useMemo(() => {
    if (!liveGates.length) return 0;
    const sum = liveGates.reduce((acc, g) => acc + g.waitCurrentMin, 0);
    return Math.round(sum / liveGates.length);
  }, [liveGates]);

  // Trigger prediction run with smooth loading feedback
  const triggerPrediction = () => {
    setIsPredicting(true);
    setTimeout(() => {
      setPredictionRunTime(Date.now());
      setIsPredicting(false);
    }, 450);
  };

  // Add custom venue
  const addCustomVenue = (newVenue) => {
    const venueObj = {
      id: `custom_${Date.now()}`,
      name: newVenue.name || 'Custom Venue',
      icon: '🏢',
      category: 'User Custom Venue',
      tagline: `${newVenue.type} with ${newVenue.numGates || 4} Gates`,
      description: `Custom facility with ${newVenue.capacity} capacity and ${newVenue.numZones || 3} zones.`,
      capacity: Number(newVenue.capacity) || 10000,
      unitName: 'Occupants',
      gateLabel: 'Gate / Entry',
      zoneLabel: 'Zone',
      gates: Array.from({ length: Number(newVenue.numGates) || 4 }, (_, i) => ({
        id: `gate_${String.fromCharCode(97 + i)}`,
        name: `Gate ${String.fromCharCode(65 + i)}`,
        direction: `Perimeter Sector ${i + 1}`,
        capacity: Math.round((Number(newVenue.capacity) || 10000) / (Number(newVenue.numGates) || 4)),
        defaultCurrent: Math.round(((Number(newVenue.capacity) || 10000) / (Number(newVenue.numGates) || 4)) * (i === 1 ? 0.84 : 0.35)),
        defaultWait: i === 1 ? 14 : 4,
        baselineServiceRate: 22
      })),
      zones: Array.from({ length: Number(newVenue.numZones) || 3 }, (_, i) => ({
        id: `zone_${i + 1}`,
        name: `Zone ${i + 1}`,
        capacity: Math.round((Number(newVenue.capacity) || 10000) / (Number(newVenue.numZones) || 3)),
        current: Math.round(((Number(newVenue.capacity) || 10000) / (Number(newVenue.numZones) || 3)) * (i === 1 ? 0.8 : 0.4))
      })),
      riskContexts: [
        'Custom simulated peak arrival rate',
        'Turnstile reader throughput constraints',
        'Corridor pedestrian diversion required'
      ]
    };

    setEnvironments(prev => [...prev, venueObj]);
    setActiveEnvId(venueObj.id);
    setSelectedGateId(venueObj.gates[1]?.id || venueObj.gates[0]?.id);
    setIsCustomVenueModalOpen(false);
  };

  const handleSafetyAction = (actionType) => {
    if (actionType === 'assistance') {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setSafetyState({
        status: 'assistance_requested',
        zone: selectedGate.gateName,
        timestamp: timeString,
        ticketId: `SAFE-${Math.floor(1000 + Math.random() * 9000)}`
      });
    } else if (actionType === 'ok') {
      setSafetyState({
        status: 'ok',
        zone: selectedGate.gateName,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ticketId: null
      });
    } else {
      setSafetyState({
        status: 'idle',
        zone: 'Gate B',
        timestamp: null,
        ticketId: null
      });
    }
  };

  const value = {
    environments,
    activeEnvId,
    setActiveEnvId,
    activeEnvironment,
    activeScenarioId,
    setActiveScenarioId,
    activeScenario,
    selectedGateId,
    setSelectedGateId,
    selectedGate,
    liveGates,
    totalCrowd,
    averageWaitTime,
    activeRecommendation,
    redistributionData,
    activePage,
    setActivePage,
    isPredicting,
    triggerPrediction,
    isEnvModalOpen,
    setIsEnvModalOpen,
    isCustomVenueModalOpen,
    setIsCustomVenueModalOpen,
    isAlertsOpen,
    setIsAlertsOpen,
    isPitchGuideOpen,
    setIsPitchGuideOpen,
    pitchStep,
    setPitchStep,
    safetyState,
    handleSafetyAction,
    addCustomVenue
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
}
