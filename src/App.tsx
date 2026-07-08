import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Users, ShieldAlert, Award, Droplets, Terminal, Sparkles,
  MessageSquare, Compass, Leaf, Eye, Settings, HelpCircle, RefreshCw, AlertTriangle
} from 'lucide-react';

import { Role, AgentId, AIAgent, Incident, DecisionSupport, AgentLog, KPIMetrics, VolunteerTask, ChatMessage } from './types';
import DigitalTwin from './components/DigitalTwin';
import AIAgentLogs from './components/AIAgentLogs';
import CommandCenter from './components/CommandCenter';
import CCTVPanel from './components/CCTVPanel';
import FanConcierge from './components/FanConcierge';
import SustainabilityMonitor from './components/SustainabilityMonitor';
import VolunteerDesk from './components/VolunteerDesk';
import AIChat from './components/AIChat';

// -----------------------------------------------------------------------------
// INITIAL CONSTANTS
// -----------------------------------------------------------------------------
const INITIAL_AGENTS: AIAgent[] = [
  { id: AgentId.NAVIGATION, name: 'Navigation Agent', role: 'Routing', avatar: '📍', color: 'text-indigo-400', status: 'idle', description: 'Real-time routing, indoor navigation, family/wheelchair pathways.' },
  { id: AgentId.CROWD, name: 'Crowd Agent', role: 'Density', avatar: '📊', color: 'text-amber-400', status: 'idle', description: 'Pedestrian flowlines, queue predictions, bottleneck routing.' },
  { id: AgentId.EMERGENCY, name: 'Emergency Agent', role: 'SOS Responders', avatar: '🚨', color: 'text-red-400', status: 'idle', description: 'Medical dispatches, crisis coordination, evacuation routing.' },
  { id: AgentId.SECURITY, name: 'Security Agent', role: 'Surveillance', avatar: '🔒', color: 'text-rose-400', status: 'idle', description: 'CCTV weapon/unattended bag detection, perimeter clearance.' },
  { id: AgentId.SUSTAINABILITY, name: 'Sustainability Agent', role: 'Resource Opt', avatar: '🌿', color: 'text-emerald-400', status: 'idle', description: 'Solar auxiliary supply grids, HVAC setpoint optimizations.' },
  { id: AgentId.TRANSPORT, name: 'Transportation Agent', role: 'Transit Hub', avatar: '🚌', color: 'text-cyan-400', status: 'idle', description: 'NJ Transit dispatches, parking Lots G/K capacities.' },
  { id: AgentId.ACCESSIBILITY, name: 'Accessibility Agent', role: 'Inclusion', avatar: '♿', color: 'text-teal-400', status: 'idle', description: 'Audio-guidance, step-free navigation, helper dispatches.' },
  { id: AgentId.ORGANIZER, name: 'Organizer Agent', role: 'KPI Analyst', avatar: '📈', color: 'text-indigo-500', status: 'idle', description: 'Performance reporting, 5-minute Executive briefings.' },
];

const INITIAL_KPIS: KPIMetrics = {
  crowdCount: 77716,
  capacityMax: 82500,
  avgQueueTimeMin: 8,
  securityRiskScore: 12,
  activeIncidents: 0,
  activeVolunteers: 450,
  energyOptimization: 84,
  carbonFootprintKg: 14200,
  waterGridPressure: 58,
  recyclingRate: 78,
  parkingOccupancy: 86,
  shuttleFrequencyMin: 10,
  egressPaceScore: 88,
  revenueUsd: 182000,
};

const INITIAL_DECISIONS: DecisionSupport[] = [
  {
    id: 'dec-101',
    title: 'Deploy 10 Volunteer Guides to Gate C Turnstiles',
    description: 'Surge sensors indicate ingress queue wait has exceeded 30 minutes at Gate C. Dispatching physical staff will streamline ticket scans.',
    category: 'crowd',
    proposedBy: AgentId.CROWD,
    impacts: { crowdCongestion: -15, avgQueueTimeMin: -10, revenue: 4200 },
    status: 'pending',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'dec-102',
    title: 'Activate Lot K Secondary Shuttle Line 4',
    description: 'Parking Lot G is full (96%). Remaining vehicles are routed to Lot K. Increase transit shuttle frequencies to secure fast stadium transfers.',
    category: 'transport',
    proposedBy: AgentId.TRANSPORT,
    impacts: { transitDelay: -6 },
    status: 'pending',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'dec-103',
    title: 'Optimize VIP Suite HVAC Setpoint to 23.5°C',
    description: 'Solar reserve outputs are at 84%. Raising suite setpoints slightly will balance the auxiliary grid without reducing fan comfort.',
    category: 'sustainability',
    proposedBy: AgentId.SUSTAINABILITY,
    impacts: { energyEfficiency: 12, carbonFootprintKg: -450 },
    status: 'pending',
    timestamp: new Date().toISOString(),
  },
];

const INITIAL_VOLUNTEER_TASKS: VolunteerTask[] = [
  {
    id: 'task-01',
    title: 'Assist wheelchair guest at East Turnstiles',
    description: 'Guest-309 is entering with standard family wheelchair and requires a physical helper to Level 2 elevators.',
    location: 'Gate 3 Turnstile #12',
    urgency: 'high',
    status: 'pending',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'task-02',
    title: 'Monitor Sector D Composting Bins',
    description: 'Bin sensor indicates Sector D concessions compost bin is at 78% capacity. Check for overflows.',
    location: 'Sector D Grandstands',
    urgency: 'medium',
    status: 'pending',
    timestamp: new Date().toISOString(),
  },
];

const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm-1', sender: 'agent', agentId: AgentId.NAVIGATION, text: "📍 **Welcome to StadiumMind Navigation.** I can guide you from any entry gate to your exact seat. Ask me 'How do I find Sector C Seat A22?'", timestamp: new Date().toISOString() },
  { id: 'm-2', sender: 'agent', agentId: AgentId.CROWD, text: "📊 **Crowd Intelligence Online.** Monitor gate queues and find concessions. Ask me: 'Which entrance has the shortest queue?'", timestamp: new Date().toISOString() },
  { id: 'm-3', sender: 'agent', agentId: AgentId.EMERGENCY, text: "🚨 **Emergency Agent standing by.** Report medical issues or SOS dispatches. Ask me: 'Where is the nearest first-aid tent?'", timestamp: new Date().toISOString() },
  { id: 'm-4', sender: 'agent', agentId: AgentId.SECURITY, text: "🔒 **CCTV Surveillance Suite Active.** Ask me 'CCTV #04 detects left bag!' to inspect object target locks.", timestamp: new Date().toISOString() },
  { id: 'm-5', sender: 'agent', agentId: AgentId.SUSTAINABILITY, text: "🌿 **Auxiliary Green Grid active.** Ask me: 'What is the solar canopy output today?'", timestamp: new Date().toISOString() },
  { id: 'm-6', sender: 'agent', agentId: AgentId.TRANSPORT, text: "🚌 **Transportation Hub ready.** Ask me: 'NJ Transit Secaucus depart times?'", timestamp: new Date().toISOString() },
  { id: 'm-7', sender: 'agent', agentId: AgentId.ACCESSIBILITY, text: "♿ **Accessibility Assistance active.** Ask me: 'Where is the Sensory Calm Suite?'", timestamp: new Date().toISOString() },
  { id: 'm-8', sender: 'agent', agentId: AgentId.ORGANIZER, text: "📈 **Organizer Console ready.** Ask me: 'Draft the matchday operational report.'", timestamp: new Date().toISOString() },
];

export default function App() {
  const [role, setRole] = useState<Role>(Role.ORGANIZER);
  const [activeAgentId, setActiveAgentId] = useState<AgentId>(AgentId.NAVIGATION);
  const [metrics, setMetrics] = useState<KPIMetrics>(INITIAL_KPIS);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [decisions, setDecisions] = useState<DecisionSupport[]>(INITIAL_DECISIONS);
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [tasks, setTasks] = useState<VolunteerTask[]>(INITIAL_VOLUNTEER_TASKS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [agents, setAgents] = useState<AIAgent[]>(INITIAL_AGENTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'warning' | 'info'>('info');

  const triggerToast = (msg: string, type: 'success' | 'warning' | 'info' = 'info') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // -----------------------------------------------------------------------------
  // MULTI-AGENT COLLABORATION STREAMER (INCIDENT SIMULATION)
  // -----------------------------------------------------------------------------
  const streamAgentCollaboration = (incident: Incident) => {
    // Staggered log entries representing agentic chain-of-thought collaboration
    const dispatches: Array<{ agentId: AgentId; message: string; type: 'info' | 'warning' | 'alert' | 'action'; delay: number }> = [];

    if (incident.type === 'security') {
      dispatches.push(
        { agentId: AgentId.SECURITY, message: `🔒 CCTV Target acquired: Object detection on Camera #04 shows an unattended black backpack left near Sector B Gate 2 corridor. Confidence 98.4%.`, type: 'alert', delay: 0 },
        { agentId: AgentId.CROWD, message: `📊 Crowd feedback loop: Area Sector B density is at 96%. Any cordon will cause immediate ingress backpressure.`, type: 'warning', delay: 1500 },
        { agentId: AgentId.EMERGENCY, message: `🚨 Medical dispatch: Placing Team Charlie Bravo-3 on standby near elevator #4 in case of escalated egress.`, type: 'info', delay: 3000 },
        { agentId: AgentId.ORGANIZER, message: `📈 Recommendation generated: Dispatch 3 physical security guards for baggage clearance. Raise Gate 1 turnstile flowlines.`, type: 'action', delay: 4500 }
      );
    } else if (incident.type === 'congestion') {
      dispatches.push(
        { agentId: AgentId.CROWD, message: `📊 Bottleneck Detected: Gate C turnstiles experiencing transit-surge egress bottleneck. Average gate queue time is now 35 minutes!`, type: 'alert', delay: 0 },
        { agentId: AgentId.NAVIGATION, message: `📍 Navigation override: Dynamic rerouting pushed to fan devices. Guiding incoming fans North to Gate A (4-minute wait).`, type: 'action', delay: 1500 },
        { agentId: AgentId.ACCESSIBILITY, message: `♿ Wheelchair warning: Elevators near Gate C are experiencing high queues. Step-free routing is updated via North Elevators.`, type: 'warning', delay: 3000 },
        { agentId: AgentId.TRANSPORT, message: `🚌 transit dispatcher: NJ Transit bus dispatch frequency increased by 20% to Lot K to relieve turnstile pressure.`, type: 'info', delay: 4500 }
      );
    } else if (incident.type === 'medical') {
      dispatches.push(
        { agentId: AgentId.EMERGENCY, message: `🚨 SOS Beacon Triggered: Fan SOS received from GPS coordinates Row 12, Seat A22 (Sector C Grandstands). Potential fall/injury.`, type: 'alert', delay: 0 },
        { agentId: AgentId.SECURITY, message: `🔒 CCTV Verification: Bounding box target locked on Row 12 Seat A22. First Aid Team Bravo-3 dispatched. ETA: 1m 45s.`, type: 'action', delay: 1500 },
        { agentId: AgentId.ACCESSIBILITY, message: `♿ Accessibility response: Clearing step-free elevator #4 for priority paramedic transfer if required.`, type: 'info', delay: 3000 }
      );
    } else if (incident.type === 'sustainability') {
      dispatches.push(
        { agentId: AgentId.SUSTAINABILITY, message: `🌿 Sensor Alarm: Concession Stall #12 in Sector A concourse reports smart water grid drop (down 25 PSI). Potential plumbing leak.`, type: 'warning', delay: 0 },
        { agentId: AgentId.ORGANIZER, message: `📈 Dispatch Task: Generating high-priority clean-up task for Sector A volunteers. Maintenance notified.`, type: 'action', delay: 1500 }
      );
    } else {
      dispatches.push(
        { agentId: AgentId.ORGANIZER, message: `📈 Security System Report: Crowd anomaly anomaly score spiked slightly in Sector D seating. Monitoring CCTV #02.`, type: 'info', delay: 0 },
        { agentId: AgentId.SECURITY, message: `🔒 Security dispatch: Target zoom active on Camera #02. Fan behavior rated standard celebratory; defcon stable.`, type: 'info', delay: 1800 }
      );
    }

    // Set agents status to active/analyzing
    setAgents(prev => prev.map(a => {
      const isAssigned = incident.assignedAgentIds.includes(a.id);
      return isAssigned ? { ...a, status: 'acting' } : a;
    }));

    // Stagger log execution to feel live and agentic
    dispatches.forEach((dispatch) => {
      setTimeout(() => {
        setLogs(prev => [
          {
            id: `log-${Math.random()}`,
            timestamp: new Date().toISOString(),
            agentId: dispatch.agentId,
            message: dispatch.message,
            type: dispatch.type,
            relatedIncidentId: incident.id,
          },
          ...prev,
        ]);

        // Revert agent status to idle after completion
        if (dispatch.delay === 4500) {
          setAgents(prevAgents => prevAgents.map(a => ({ ...a, status: 'idle' })));
        }
      }, dispatch.delay);
    });
  };

  // -----------------------------------------------------------------------------
  // RE-ACTIVE INCIDENT TRIGGER INJECTOR
  // -----------------------------------------------------------------------------
  const handleTriggerIncident = (type: 'security' | 'medical' | 'sustainability' | 'congestion' | 'system') => {
    let title = "Unattended Baggage";
    let desc = "Camera #04 detected left backpack near Sector B Corridor.";
    let loc = "Sector B Corridor Gate 2";
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'high';
    let assigned: AgentId[] = [AgentId.SECURITY, AgentId.CROWD, AgentId.EMERGENCY, AgentId.ORGANIZER];

    if (type === 'congestion') {
      title = "Gate C Egress Overflow";
      desc = "Egress wait-time spiked over 35 minutes at South turnstiles.";
      loc = "Gate C South Entrance";
      severity = 'critical';
      assigned = [AgentId.CROWD, AgentId.NAVIGATION, AgentId.TRANSPORT, AgentId.ACCESSIBILITY];
    } else if (type === 'medical') {
      title = "Medical SOS Alert";
      desc = "Heart distress/fall reported at Sector C Row 12 Seat A22.";
      loc = "Sector C grandstand row 12";
      severity = 'critical';
      assigned = [AgentId.EMERGENCY, AgentId.SECURITY, AgentId.ACCESSIBILITY];
    } else if (type === 'sustainability') {
      title = "Smart Water Grid Leak";
      desc = "Main supply line pressure drop in F&B concessions #12.";
      loc = "F&B Sector A concourse";
      severity = 'medium';
      assigned = [AgentId.SUSTAINABILITY, AgentId.ORGANIZER];
    } else if (type === 'system') {
      title = "Crowd Anomaly Spike";
      desc = "Vibration sensors indicate high structural loads in Sector D stands.";
      loc = "Sector D North Stand";
      severity = 'low';
      assigned = [AgentId.ORGANIZER, AgentId.SECURITY];
    }

    // Check if incident already active
    if (incidents.some(i => i.title === title)) {
      triggerToast(`Alarm "${title}" is already active and being cleared.`, 'info');
      return;
    }

    const newIncident: Incident = {
      id: `inc-${Date.now()}`,
      title,
      type,
      severity,
      location: loc,
      timestamp: new Date().toISOString(),
      status: 'reported',
      description: desc,
      assignedAgentIds: assigned,
    };

    setIncidents(prev => [newIncident, ...prev]);

    // Dynamically adjust KPI metrics to show live reactive dashboard
    setMetrics(prev => {
      const next = { ...prev };
      next.activeIncidents += 1;
      if (type === 'congestion') {
        next.avgQueueTimeMin = 35;
        next.egressPaceScore = 22;
        next.securityRiskScore = Math.min(100, next.securityRiskScore + 18);
      } else if (type === 'security') {
        next.securityRiskScore = Math.min(100, next.securityRiskScore + 32);
      } else if (type === 'medical') {
        next.securityRiskScore = Math.min(100, next.securityRiskScore + 12);
      } else if (type === 'sustainability') {
        next.waterGridPressure = 32;
      }
      return next;
    });

    triggerToast(`🚨 INCIDENT ASSIGNED: "${title}" • AI agents coordinating dispatches.`, 'warning');
    streamAgentCollaboration(newIncident);

    // If sustainability pipe leak, auto-generate volunteer task
    if (type === 'sustainability') {
      const newTask: VolunteerTask = {
        id: `task-${Date.now()}`,
        title: 'Check plumbing leak at F&B Stall #12',
        description: 'Water pressure valve has dropped to 32 PSI. Deploy cleaning cones and notify engineering.',
        location: 'Sector A Concourse F&B 12',
        urgency: 'medium',
        status: 'pending',
        timestamp: new Date().toISOString(),
      };
      setTasks(prev => [newTask, ...prev]);
    }
  };

  // -----------------------------------------------------------------------------
  // DECISION SUPPORT APPROVE & REJECT ACTIONS
  // -----------------------------------------------------------------------------
  const handleApproveDecision = (id: string) => {
    const dec = decisions.find(d => d.id === id);
    if (!dec) return;

    // Update state status
    setDecisions(prev => prev.map(d => d.id === id ? { ...d, status: 'approved' } : d));

    // Apply Impacts instantly on live KPIs!
    setMetrics(prev => {
      const next = { ...prev };
      if (dec.impacts.crowdCongestion) {
        next.avgQueueTimeMin = Math.max(4, next.avgQueueTimeMin + dec.impacts.avgQueueTimeMin!);
        next.egressPaceScore = Math.min(100, next.egressPaceScore + 15);
      }
      if (dec.impacts.securityRisk) {
        next.securityRiskScore = Math.max(10, next.securityRiskScore + dec.impacts.securityRisk);
      }
      if (dec.impacts.energyEfficiency) {
        next.energyOptimization = Math.min(100, next.energyOptimization + dec.impacts.energyEfficiency);
      }
      if (dec.impacts.transitDelay) {
        next.shuttleFrequencyMin = Math.max(4, next.shuttleFrequencyMin - 3);
      }
      if (dec.impacts.revenue) {
        next.revenueUsd += dec.impacts.revenue;
      }
      return next;
    });

    // Clear corresponding incidents if decision matches
    if (dec.category === 'crowd') {
      setIncidents(prev => prev.filter(i => i.type !== 'congestion'));
      setMetrics(prev => ({ ...prev, activeIncidents: Math.max(0, prev.activeIncidents - 1) }));
    }

    triggerToast(`Approved: "${dec.title}" • Dynamic operational metrics optimized.`, 'success');

    // Append to collaboration logs
    setLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        agentId: dec.proposedBy,
        message: `✅ APPROVED BY ORGANIZER: Dispatch instruction "${dec.title}" has been successfully broadcast to workforce channels.`,
        type: 'action',
      },
      ...prev,
    ]);
  };

  const handleRejectDecision = (id: string) => {
    setDecisions(prev => prev.map(d => d.id === id ? { ...d, status: 'rejected' } : d));
    triggerToast(`Recommendation dismissed.`, 'info');
  };

  // -----------------------------------------------------------------------------
  // VOLUNTEER TASK DECK COMPONENT BINDINGS
  // -----------------------------------------------------------------------------
  const handleAcceptTask = (id: string, name: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'active', assignedTo: name } : t));
    triggerToast(`Task claimed. AI navigation path routed.`, 'success');
  };

  const handleCompleteTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'completed' } : t));
    triggerToast(`Task completed and cleared from AI dispatch board.`, 'success');

    // If it was the plumbing task, restore water pressure!
    const completedTask = tasks.find(t => t.id === id);
    if (completedTask?.title.includes('plumbing') || completedTask?.location.includes('F&B 12')) {
      setIncidents(prev => prev.filter(i => i.type !== 'sustainability'));
      setMetrics(prev => ({
        ...prev,
        waterGridPressure: 58,
        activeIncidents: Math.max(0, prev.activeIncidents - 1),
      }));
    }
  };

  // -----------------------------------------------------------------------------
  // CHAT SENDER (CLIENT-SIDE WITH SERVER-SIDE API FALLBACK)
  // -----------------------------------------------------------------------------
  const handleSendMessage = async (text: string, agentId: AgentId) => {
    const userMsg: ChatMessage = {
      id: `chat-usr-${Date.now()}`,
      sender: 'user',
      agentId,
      text,
      timestamp: new Date().toISOString(),
    };

    setChatMessages(prev => [...prev, userMsg]);

    // Send to our backend Express API proxy
    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, agentId }),
      });
      const data = await response.json();

      const agentMsg: ChatMessage = {
        id: `chat-agt-${Date.now()}`,
        sender: 'agent',
        agentId,
        text: data.text,
        timestamp: new Date().toISOString(),
      };
      setChatMessages(prev => [...prev, agentMsg]);
    } catch (err) {
      console.error("Failed to query Gemini chat API:", err);
      // Fail gracefully with simulated response
      triggerToast("AI server unavailable; launching client-side offline responder.", 'info');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col font-sans">
      
      {/* Dynamic Ambient Blur Globes */}
      <div className="absolute top-12 left-1/4 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[420px] h-[420px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Global Success/Alert Toast */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded border shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-300 ${
          toastType === 'success' ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/30 glow-green' :
          toastType === 'warning' ? 'bg-red-950/90 text-red-300 border-red-500/30 glow-red' :
          'bg-slate-900/95 text-cyan-300 border-cyan-500/30 glow-cyan'
        }`}>
          <Sparkles className="w-4 h-4 shrink-0" />
          <span className="text-xs font-semibold leading-relaxed">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/65 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center glow-cyan">
            <span className="font-display font-black text-white text-sm">SM</span>
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full border border-slate-950 animate-pulse" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-white text-sm tracking-tight flex items-center gap-1">
              StadiumMind AI
              <span className="bg-indigo-600/25 text-indigo-400 border border-indigo-500/20 text-[8px] px-1.5 py-0.2 rounded font-mono font-bold uppercase tracking-widest">
                FIFA 2026 OS
              </span>
            </h1>
            <p className="text-[9px] text-gray-500 font-mono">STADIUM COMMAND LAYER • ACTIVE</p>
          </div>
        </div>

        {/* Global Persona Selector Buttons */}
        <div className="flex bg-slate-900/60 border border-white/5 rounded p-1 shrink-0 overflow-x-auto no-scrollbar">
          {[
            { id: Role.ORGANIZER, label: 'Command Center', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
            { id: Role.FAN, label: 'Fan Concierge', icon: <Users className="w-3.5 h-3.5" /> },
            { id: Role.SECURITY, label: 'CCTV Security', icon: <Eye className="w-3.5 h-3.5" /> },
            { id: Role.VOLUNTEER, label: 'Volunteer Portal', icon: <Award className="w-3.5 h-3.5" /> },
            { id: Role.SUSTAINABILITY, label: 'Green Grid', icon: <Leaf className="w-3.5 h-3.5" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setRole(item.id)}
              className={`px-3 py-1.5 rounded text-[10px] font-medium transition flex items-center gap-1.5 shrink-0 ${
                role === item.id
                  ? 'bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-indigo-500/30 text-white font-semibold shadow-inner'
                  : 'text-gray-400 hover:text-gray-200 border border-transparent'
              }`}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4 text-xs font-mono">
          <span className="text-gray-500">NY/NJ • METLIFE</span>
          <span className="text-green-500 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            CORE ONLINE
          </span>
        </div>
      </header>

      {/* Main Body Layout */}
      <main className="flex-1 p-6 space-y-6 max-w-[1500px] mx-auto w-full relative z-10">
        
        {/* Row 1: Digital Twin & Live Multi-Agent Collaboration Terminal (Organizer & Security & General Views) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <DigitalTwin
              incidents={incidents}
              onTriggerIncident={handleTriggerIncident}
              activeIncidentId={null}
              setActiveIncidentId={() => {}}
            />
          </div>

          <div className="xl:col-span-1">
            <AIAgentLogs logs={logs} agents={agents} />
          </div>
        </div>

        {/* Row 2: Selected Role-Specific Modules */}
        <div className="border-t border-white/5 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-display font-semibold text-white flex items-center gap-2">
                {role === Role.ORGANIZER && <LayoutDashboard className="w-4 h-4 text-indigo-400" />}
                {role === Role.FAN && <Compass className="w-4 h-4 text-indigo-400" />}
                {role === Role.SECURITY && <Eye className="w-4 h-4 text-indigo-400" />}
                {role === Role.VOLUNTEER && <Award className="w-4 h-4 text-indigo-400" />}
                {role === Role.SUSTAINABILITY && <Leaf className="w-4 h-4 text-indigo-400" />}
                Active Workspace: {role === Role.ORGANIZER ? 'Operations CommandCenter' : role === Role.FAN ? 'AI Fan Concierge' : role === Role.SECURITY ? 'Computer Vision Suite' : role === Role.VOLUNTEER ? 'Volunteer Desk' : 'Sustainability Monitor'}
              </h2>
              <p className="text-[11px] text-gray-500 font-mono">ROLE-SPECIFIC ANALYTICS AND COMMAND CONTROLS</p>
            </div>
            
            <div className="text-[10px] font-mono text-gray-500 uppercase">
              SECTOR GRID: ACTIVE
            </div>
          </div>

          {/* Conditional Workspace Rendering */}
          <div className="space-y-6 animate-in fade-in duration-300">
            {role === Role.ORGANIZER && (
              <CommandCenter
                metrics={metrics}
                decisions={decisions}
                onApproveDecision={handleApproveDecision}
                onRejectDecision={handleRejectDecision}
                incidents={incidents}
              />
            )}

            {role === Role.FAN && (
              <FanConcierge />
            )}

            {role === Role.SECURITY && (
              <CCTVPanel incidents={incidents} />
            )}

            {role === Role.VOLUNTEER && (
              <VolunteerDesk
                tasks={tasks}
                onAcceptTask={handleAcceptTask}
                onCompleteTask={handleCompleteTask}
              />
            )}

            {role === Role.SUSTAINABILITY && (
              <SustainabilityMonitor />
            )}
          </div>
        </div>

        {/* Floating AI Concierge Terminal (Available at bottom in full view width) */}
        <div className="border-t border-white/5 pt-6 grid grid-cols-1 gap-6">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-display font-semibold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                Query Smart-Stadium Multi-Agent Concierge
              </h3>
              <span className="text-[10px] font-mono text-gray-500">DIRECT INTEGRATION: GEMINI 3.5</span>
            </div>
            <AIChat
              agents={agents}
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              activeAgentId={activeAgentId}
              setActiveAgentId={setActiveAgentId}
            />
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-6 px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono mt-12 shrink-0">
        <div className="text-gray-500">
          © 2026 StadiumMind AI • FIFA World Cup 2026 Smart Stadium OS. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-gray-500">
          <span>MetLife Arena Command Deck</span>
          <span>•</span>
          <span className="text-indigo-400">Ver 4.10.2</span>
        </div>
      </footer>

    </div>
  );
}
