import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Cpu, Volume2, Globe, ArrowRight } from 'lucide-react';
import { ChatMessage, AgentId, AIAgent } from '../types';

interface AIChatProps {
  agents: AIAgent[];
  messages: ChatMessage[];
  onSendMessage: (text: string, agentId: AgentId) => void;
  activeAgentId: AgentId;
  setActiveAgentId: (id: AgentId) => void;
}

export default function AIChat({
  agents,
  messages,
  onSendMessage,
  activeAgentId,
  setActiveAgentId,
}: AIChatProps) {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeAgent = agents.find(a => a.id === activeAgentId) || agents[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(inputText, activeAgentId);
    setInputText('');
  };

  // Helper chips to click and pre-populate prompts
  const getAgentSuggestions = (agentId: AgentId) => {
    switch (agentId) {
      case 'navigation':
        return ["How do I find Sector C Seat A22?", "Where is the nearest wheelchair ramp?", "Which gate is closest to South Parking?"];
      case 'crowd':
        return ["Is Gate C overcrowded?", "Which entrance has the shortest queue?", "What concessions have a short line?"];
      case 'emergency':
        return ["MEDIC SOS: Heart pain at Seat A22!", "Where is the primary first-aid tent?", "What is the fire evacuation route?"];
      case 'security_agent':
        return ["CCTV #04 detects left bag!", "Is access restricted near the VIP lounge?", "Report suspicious activity at West gate"];
      case 'sustainability_agent':
        return ["What is the solar canopy output?", "How are concessions recycling composting?", "How do I use smart thermostat?"];
      case 'transportation':
        return ["NJ Transit Secaucus depart times?", "Is Lot G full?", "Where is the rideshare pick-up zone?"];
      case 'accessibility':
        return ["Request wheelchair helper at East Gate", "Where is the Sensory Calm Suite?", "Is there audio-guidance for blind fans?"];
      case 'organizer_agent':
      default:
        return ["Draft the matchday operational report", "Review concession revenue KPIs", "Check volunteer allocation status"];
    }
  };

  return (
    <div className="glass-panel p-6 relative overflow-hidden flex flex-col h-[520px]">
      {/* Glow highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-cyan-400/40 via-indigo-500/40 to-purple-400/40" />

      {/* Dynamic Agent Selector bar */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4 shrink-0 overflow-x-auto select-none no-scrollbar py-1">
        {agents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setActiveAgentId(agent.id)}
            aria-label={`Select agent ${agent.name}`}
            className={`px-3 py-1.5 rounded border flex items-center gap-1.5 transition shrink-0 ${
              activeAgentId === agent.id
                ? 'bg-indigo-600/20 text-indigo-200 border-indigo-500/50'
                : 'bg-slate-900/50 text-gray-400 border-white/5 hover:border-white/10'
            }`}
          >
            <span className="text-xs" role="img" aria-label={`${agent.name} avatar`}>{agent.avatar}</span>
            <span className="text-[10px] font-medium font-mono">{agent.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Active Agent Info Bar */}
      <div className="bg-slate-950/60 border border-white/5 rounded p-3 mb-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-xl" role="img" aria-label={`${activeAgent.name} indicator`}>{activeAgent.avatar}</span>
          <div>
            <h3 className="text-xs font-display font-semibold text-white flex items-center gap-1.5">
              {activeAgent.name}
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </h3>
            <p className="text-[9px] text-gray-400">{activeAgent.description}</p>
          </div>
        </div>
        <div className="text-right text-[8px] font-mono text-gray-500 uppercase">
          MODEL: GEMINI-3.5-FLASH
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 mb-4">
        {messages.filter(m => m.agentId === activeAgentId).length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 py-10">
            <Cpu className="w-10 h-10 text-indigo-500/20 mb-3 animate-pulse" />
            <span className="text-xs font-mono">Initiate operational query with {activeAgent.name}.</span>
            <p className="text-[10px] text-gray-600 max-w-xs mt-1">Ask questions about MetLife stadium seating, ticket dispatches, crowd queue waits, solar grids, or accessibility rooms.</p>
          </div>
        ) : (
          messages
             .filter(m => m.agentId === activeAgentId)
             .map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Bubble Avatar */}
                <div className={`w-7 h-7 rounded flex items-center justify-center shrink-0 border text-xs ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600/10 border-indigo-500/20 text-indigo-400'
                    : 'bg-slate-950 border-white/5 text-gray-300'
                }`}>
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <span role="img" aria-label={activeAgent.name}>{activeAgent.avatar}</span>}
                </div>

                {/* Bubble Body */}
                <div className={`p-3 rounded border leading-relaxed text-xs relative ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600/15 border-indigo-500/20 text-white rounded-tr-none'
                    : 'bg-slate-950/60 border-white/5 text-gray-300 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  <span className="text-[8px] text-gray-500 font-mono block text-right mt-1.5 uppercase">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* pre-filled contextual suggestions */}
      <div className="shrink-0 mb-3 flex flex-wrap gap-1.5 select-none">
        {getAgentSuggestions(activeAgentId).map((sug, i) => (
          <button
            key={i}
            onClick={() => setInputText(sug)}
            aria-label={`Use suggestion: ${sug}`}
            className="text-[9px] font-mono bg-slate-950/80 hover:bg-slate-900 text-gray-400 hover:text-white border border-white/5 rounded px-2.5 py-1.5 transition text-left flex items-center gap-1 shrink-0"
          >
            <span>{sug}</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </button>
        ))}
      </div>

      {/* Chat Form panel */}
      <form onSubmit={handleSubmit} className="shrink-0 flex gap-2 border-t border-white/5 pt-3">
        <input
          id="chat-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Query ${activeAgent.name.split(' ')[0]}... (e.g. seat, queue, emergency, etc.)`}
          aria-label={`Ask ${activeAgent.name}`}
          className="flex-1 bg-slate-950 border border-white/10 rounded px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition font-sans"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          aria-label="Send query"
          className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
