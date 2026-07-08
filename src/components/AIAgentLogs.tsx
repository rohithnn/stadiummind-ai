import React from 'react';
import { AgentLog, AgentId, AIAgent } from '../types';
import { Cpu, Terminal, Sparkles, Send } from 'lucide-react';

interface AIAgentLogsProps {
  logs: AgentLog[];
  agents: AIAgent[];
}

export default function AIAgentLogs({ logs, agents }: AIAgentLogsProps) {
  const getAgentColor = (agentId: AgentId) => {
    const agent = agents.find(a => a.id === agentId);
    return agent ? agent.color : 'text-gray-400';
  };

  const getAgentAvatar = (agentId: AgentId) => {
    const agent = agents.find(a => a.id === agentId);
    return agent ? agent.avatar : '🤖';
  };

  const getAgentName = (agentId: AgentId) => {
    const agent = agents.find(a => a.id === agentId);
    return agent ? agent.name : 'Unknown Agent';
  };

  return (
    <div className="glass-panel p-6 relative overflow-hidden flex flex-col h-full min-h-[400px]">
      {/* Visual top border line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />

      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600/10 rounded border border-indigo-500/20 text-indigo-400">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-display font-semibold text-white flex items-center gap-1.5">
              Multi-Agent Collaboration Engine
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            </h2>
            <p className="text-[10px] text-gray-400 font-mono">L3 AGENTIC THREADS: ACTIVE</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950/80 rounded px-2.5 py-1 border border-white/5 text-[9px] font-mono">
          <Terminal className="w-3 h-3 text-cyan-400" />
          <span className="text-gray-400">THREADS: 8 CO-ORDS</span>
        </div>
      </div>

      {/* Agents Status Subheader Grid */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-1.5 mb-4 shrink-0">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-slate-950/40 border border-white/5 rounded p-1.5 text-center transition hover:border-white/10"
          >
            <div className="text-sm mb-1">{agent.avatar}</div>
            <div className="text-[8px] font-mono truncate text-gray-300">{agent.name.split(' ')[0]}</div>
            <div className="mt-1 flex items-center justify-center gap-1">
              <span className={`w-1 h-1 rounded-full ${
                agent.status === 'alerting' ? 'bg-red-500 animate-ping' :
                agent.status === 'acting' ? 'bg-amber-400 animate-pulse' :
                agent.status === 'analyzing' ? 'bg-cyan-400 animate-pulse' : 'bg-green-500'
              }`} />
              <span className="text-[7px] text-gray-400 font-mono uppercase">{agent.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Terminal Logs Feed */}
      <div className="flex-1 overflow-y-auto bg-slate-950/60 rounded border border-white/5 p-4 font-mono text-[11px] space-y-3.5 max-h-[300px]">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <Cpu className="w-8 h-8 opacity-25 mb-2 animate-spin text-indigo-400" />
            <span className="font-mono text-xs">Waiting for agent dispatches...</span>
          </div>
        ) : (
          logs.map((log) => {
            const date = new Date(log.timestamp);
            const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

            return (
              <div
                key={log.id}
                className={`p-2.5 rounded border leading-relaxed transition-all ${
                  log.type === 'alert'
                    ? 'bg-rose-950/20 border-rose-500/20 text-rose-200'
                    : log.type === 'warning'
                    ? 'bg-amber-950/10 border-amber-500/20 text-amber-200'
                    : log.type === 'action'
                    ? 'bg-indigo-950/20 border-indigo-500/20 text-indigo-200'
                    : 'bg-slate-900/35 border-white/5 text-gray-300'
                } hover:border-white/10`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-white/5 text-[9px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-gray-400">{formattedTime}</span>
                    <span className="text-gray-600">•</span>
                    <span className={`font-semibold ${getAgentColor(log.agentId)}`}>
                      {getAgentAvatar(log.agentId)} {getAgentName(log.agentId).toUpperCase()}
                    </span>
                  </span>
                  <span className={`uppercase font-mono font-bold text-[8px] px-1 py-0.2 rounded ${
                    log.type === 'alert' ? 'bg-red-500/20 text-red-400' :
                    log.type === 'warning' ? 'bg-amber-500/20 text-amber-400' :
                    log.type === 'action' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-gray-400'
                  }`}>
                    {log.type}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed select-all">{log.message}</p>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-3 shrink-0 flex items-center justify-between text-[10px] text-indigo-400/80 bg-indigo-950/15 p-2 rounded border border-indigo-500/10 font-mono">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" />
          Autonomous Agentic Sync Rate: 100%
        </span>
        <span className="text-[9px] text-gray-500">Protocol SECURE-X</span>
      </div>
    </div>
  );
}
