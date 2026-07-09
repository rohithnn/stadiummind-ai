import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import AIChat from '../components/AIChat';
import CCTVPanel from '../components/CCTVPanel';
import CommandCenter from '../components/CommandCenter';
import { AgentId, AIAgent, ChatMessage, KPIMetrics, DecisionSupport, Incident } from '../types';

// Mock scrollIntoView since jsdom doesn't implement it
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('Smart Stadium Accessibility & Component Rendering', () => {
  const mockAgents: AIAgent[] = [
    {
      id: AgentId.NAVIGATION,
      name: 'Navigation Agent',
      role: 'Routing',
      avatar: '📍',
      color: 'text-indigo-400',
      status: 'idle',
      description: 'Real-time routing, indoor navigation pathways.'
    }
  ];

  const mockMessages: ChatMessage[] = [
    {
      id: 'msg-1',
      sender: 'agent',
      agentId: AgentId.NAVIGATION,
      text: 'Welcome to StadiumMind Navigation.',
      timestamp: new Date().toISOString()
    }
  ];

  it('renders AIChat with inputs, suggestions, and proper labels', () => {
    const mockOnSendMessage = vi.fn();
    const mockSetActiveAgentId = vi.fn();

    render(
      <AIChat
        agents={mockAgents}
        messages={mockMessages}
        onSendMessage={mockOnSendMessage}
        activeAgentId={AgentId.NAVIGATION}
        setActiveAgentId={mockSetActiveAgentId}
      />
    );

    // Verify the selector button aria label
    const agentSelectorBtn = screen.getByRole('button', { name: /select agent navigation agent/i });
    expect(agentSelectorBtn).toBeTruthy();

    // Verify active agent description is present
    expect(screen.getByText('Real-time routing, indoor navigation pathways.')).toBeTruthy();

    // Verify chat input is labeled and styled correctly
    const chatInput = screen.getByRole('textbox', { name: /ask navigation agent/i });
    expect(chatInput).toBeTruthy();
    expect(chatInput.id).toBe('chat-input');

    // Verify send button aria label
    const sendBtn = screen.getByRole('button', { name: /send query/i });
    expect(sendBtn).toBeTruthy();
  });

  it('renders CCTVPanel feeds and language translation presets', () => {
    const mockIncidents: Incident[] = [];

    render(<CCTVPanel incidents={mockIncidents} />);

    // Verify computer vision control button accessibility label
    const visionToggleBtn = screen.getByRole('button', { name: /disable computer vision target/i });
    expect(visionToggleBtn).toBeTruthy();

    // Verify translation preset button accessibility labels
    const spanishPresetBtn = screen.getByRole('button', { name: /preset sign spanish/i });
    expect(spanishPresetBtn).toBeTruthy();
  });

  it('renders CommandCenter KPIs and executive briefing controls', () => {
    const mockMetrics: KPIMetrics = {
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

    const mockDecisions: DecisionSupport[] = [
      {
        id: 'dec-101',
        title: 'Deploy 10 Volunteer Guides to Gate C Turnstiles',
        description: 'Surge sensors indicate ingress queue wait has exceeded 30 minutes at Gate C.',
        category: 'crowd',
        proposedBy: AgentId.CROWD,
        impacts: { crowdCongestion: -15, avgQueueTimeMin: -10, revenue: 4200 },
        status: 'pending',
        timestamp: new Date().toISOString(),
      }
    ];

    const mockIncidents: Incident[] = [];
    const mockApprove = vi.fn();
    const mockReject = vi.fn();

    render(
      <CommandCenter
        metrics={mockMetrics}
        decisions={mockDecisions}
        onApproveDecision={mockApprove}
        onRejectDecision={mockReject}
        incidents={mockIncidents}
      />
    );

    // Verify key metrics render
    expect(screen.getByText('77,716')).toBeTruthy();

    // Verify regenerate briefing action button has proper labels
    const briefingRegenBtn = screen.getByRole('button', { name: /regenerate executive briefing/i });
    expect(briefingRegenBtn).toBeTruthy();

    // Verify recommendation card render and approve/reject labels
    expect(screen.getByText('Deploy 10 Volunteer Guides to Gate C Turnstiles')).toBeTruthy();
    expect(screen.getByRole('button', { name: /approve recommendation: deploy 10 volunteer guides/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /reject recommendation: deploy 10 volunteer guides/i })).toBeTruthy();
  });
});
