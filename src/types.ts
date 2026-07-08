export enum Role {
  ORGANIZER = 'organizer',
  FAN = 'fan',
  SECURITY = 'security',
  VOLUNTEER = 'volunteer',
  SUSTAINABILITY = 'sustainability',
}

export enum AgentId {
  NAVIGATION = 'navigation',
  CROWD = 'crowd',
  EMERGENCY = 'emergency',
  SECURITY = 'security_agent',
  SUSTAINABILITY = 'sustainability_agent',
  TRANSPORT = 'transportation',
  ACCESSIBILITY = 'accessibility',
  ORGANIZER = 'organizer_agent',
}

export interface AIAgent {
  id: AgentId;
  name: string;
  role: string;
  avatar: string;
  color: string;
  status: 'idle' | 'analyzing' | 'acting' | 'alerting';
  description: string;
}

export interface Incident {
  id: string;
  title: string;
  type: 'security' | 'medical' | 'sustainability' | 'congestion' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  timestamp: string;
  status: 'reported' | 'investigating' | 'dispatched' | 'resolved';
  description: string;
  assignedAgentIds: AgentId[];
  cctvFeedId?: string;
}

export interface DecisionSupport {
  id: string;
  title: string;
  description: string;
  category: 'crowd' | 'security' | 'sustainability' | 'transport' | 'emergency';
  proposedBy: AgentId;
  impacts: {
    crowdCongestion?: number; // e.g. -15%
    securityRisk?: number; // e.g. -20%
    energyEfficiency?: number; // e.g. +10%
    transitDelay?: number; // e.g. -5 min
    revenue?: number; // e.g. +$12,000
    avgQueueTimeMin?: number;
    carbonFootprintKg?: number;
  };
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

export interface AgentLog {
  id: string;
  timestamp: string;
  agentId: AgentId;
  message: string;
  type: 'info' | 'warning' | 'alert' | 'action';
  relatedIncidentId?: string;
}

export interface KPIMetrics {
  crowdCount: number;
  capacityMax: number;
  avgQueueTimeMin: number;
  securityRiskScore: number;
  activeIncidents: number;
  activeVolunteers: number;
  energyOptimization: number; // percentage
  carbonFootprintKg: number;
  waterGridPressure: number; // PSI
  recyclingRate: number; // percentage
  parkingOccupancy: number; // percentage
  shuttleFrequencyMin: number;
  egressPaceScore: number; // 1-100
  revenueUsd: number;
}

export interface VolunteerTask {
  id: string;
  title: string;
  description: string;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'active' | 'completed';
  assignedTo?: string; // Volunteer Name
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  agentId?: AgentId;
  text: string;
  timestamp: string;
  isTranslation?: boolean;
  translatedText?: string;
}
