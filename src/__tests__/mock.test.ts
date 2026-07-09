import { describe, it, expect } from 'vitest';
import { Role, AgentId } from '../types';

describe('StadiumMind AI Types & Role Mappings', () => {
  it('should verify the correct list of system personas / roles', () => {
    expect(Role.ORGANIZER).toBe('organizer');
    expect(Role.FAN).toBe('fan');
    expect(Role.SECURITY).toBe('security');
    expect(Role.VOLUNTEER).toBe('volunteer');
    expect(Role.SUSTAINABILITY).toBe('sustainability');
  });

  it('should verify the list of AI Agent IDs', () => {
    expect(AgentId.NAVIGATION).toBe('navigation');
    expect(AgentId.CROWD).toBe('crowd');
    expect(AgentId.EMERGENCY).toBe('emergency');
    expect(AgentId.SECURITY).toBe('security_agent');
    expect(AgentId.SUSTAINABILITY).toBe('sustainability_agent');
    expect(AgentId.TRANSPORT).toBe('transportation');
    expect(AgentId.ACCESSIBILITY).toBe('accessibility');
    expect(AgentId.ORGANIZER).toBe('organizer_agent');
  });
});
