import React, { useState } from 'react';
import {
  TrendingUp, Users, ShieldAlert, Award, Droplets, CreditCard, Sparkles, AlertCircle, Check, X, RefreshCw
} from 'lucide-react';
import { KPIMetrics, DecisionSupport, Incident, AgentId } from '../types';

interface CommandCenterProps {
  metrics: KPIMetrics;
  decisions: DecisionSupport[];
  onApproveDecision: (id: string) => void;
  onRejectDecision: (id: string) => void;
  incidents: Incident[];
}

export default function CommandCenter({
  metrics,
  decisions,
  onApproveDecision,
  onRejectDecision,
  incidents,
}: CommandCenterProps) {
  const [briefingLoading, setBriefingLoading] = useState(false);
  const [briefingText, setBriefingText] = useState<string[]>(() => [
    "🏆 StadiumMind Arena status is STABLE. Current occupancy is at 94.2% (77,716 fans in-seat).",
    "⚡ Local Smart Grid: Generating 420kW from solar roofing, matching 100% of auxiliary HVAC load.",
    "🚇 Transportation: NJ Transit dispatch is running at peak, carrying 60% of stadium outbound traffic.",
    "🥗 Sustainability: Smart cleaning is dispatched to Section D; F&B compost recycling rate is at 78.4%.",
    "💼 Overall matching efficiency is 98.4%. Standard defcon metrics nominal."
  ]);

  const handleRegenerateBriefing = () => {
    setBriefingLoading(true);
    setTimeout(() => {
      // Create a contextual report based on active incidents
      const activeSec = incidents.filter(i => i.type === 'security');
      const activeMed = incidents.filter(i => i.type === 'medical');
      const activeCong = incidents.filter(i => i.type === 'congestion');

      const reports = [];
      reports.push(`🏆 Match is live. Current stadium occupancy is ${metrics.crowdCount.toLocaleString()} / ${metrics.capacityMax.toLocaleString()} fans.`);
      
      if (activeCong.length > 0) {
        reports.push(`⚠️ Crowd Alert: Bottlenecks detected at Gate C. Entry delay is currently ${metrics.avgQueueTimeMin} minutes. Rerouting is dispatched.`);
      } else {
        reports.push(`🚇 Transport & Egress: Average gate queue is down to a comfortable ${metrics.avgQueueTimeMin} minutes.`);
      }

      if (activeSec.length > 0) {
        reports.push(`🔒 Security Dispatch active: CCTV alert SEC-402 (Unattended luggage) is being cleared by Team Charlie.`);
      } else {
        reports.push(`🔒 Security Defcon is rated nominal. Active risks score is low (${metrics.securityRiskScore}/100).`);
      }

      reports.push(`🌿 Smart Solar canopy yields are at ${metrics.energyOptimization}% efficiency. HVAC setpoints optimal.`);
      reports.push(`💼 Gross matches concessions revenue calculated at $${metrics.revenueUsd.toLocaleString()} USD.`);

      setBriefingText(reports);
      setBriefingLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        
        {/* KPI: In-Seat Crowd */}
        <div className="glass-panel p-4 relative overflow-hidden flex flex-col justify-between h-28 border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Crowd Capacity</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <div className="text-xl font-display font-bold text-white leading-tight">
              {metrics.crowdCount.toLocaleString()}
            </div>
            <div className="text-[9px] text-gray-500 font-mono mt-1 flex items-center justify-between">
              <span>MAX: {metrics.capacityMax.toLocaleString()}</span>
              <span className="text-indigo-400">94.2%</span>
            </div>
          </div>
        </div>

        {/* KPI: Avg Entry Queue */}
        <div className="glass-panel p-4 relative overflow-hidden flex flex-col justify-between h-28 border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Gate wait time</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse glow-cyan" />
          </div>
          <div>
            <div className="text-xl font-display font-bold text-white leading-tight">
              {metrics.avgQueueTimeMin} <span className="text-xs font-sans text-gray-400">min</span>
            </div>
            <div className="text-[9px] text-gray-500 font-mono mt-1">
              AVG EGRESS PACE: {metrics.egressPaceScore}/100
            </div>
          </div>
        </div>

        {/* KPI: Threat Score */}
        <div className="glass-panel p-4 relative overflow-hidden flex flex-col justify-between h-28 border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Threat Level</span>
            <ShieldAlert className={`w-4 h-4 ${metrics.securityRiskScore > 40 ? 'text-rose-500 animate-bounce' : 'text-emerald-400'}`} />
          </div>
          <div>
            <div className={`text-xl font-display font-bold leading-tight ${metrics.securityRiskScore > 40 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {metrics.securityRiskScore} <span className="text-xs font-sans text-gray-400">/ 100</span>
            </div>
            <div className="text-[9px] text-gray-500 font-mono mt-1 uppercase">
              {metrics.securityRiskScore > 40 ? '⚠️ Spiked' : '✅ Stable Risk'}
            </div>
          </div>
        </div>

        {/* KPI: Solar Power auxiliary */}
        <div className="glass-panel p-4 relative overflow-hidden flex flex-col justify-between h-28 border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Solar Smart Grid</span>
            <Droplets className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-xl font-display font-bold text-white leading-tight">
              {metrics.energyOptimization}%
            </div>
            <div className="text-[9px] text-gray-500 font-mono mt-1 flex items-center justify-between">
              <span>CARBON: -14.2t</span>
              <span className="text-emerald-400">Grid feeding</span>
            </div>
          </div>
        </div>

        {/* KPI: Active volunteers */}
        <div className="glass-panel p-4 relative overflow-hidden flex flex-col justify-between h-28 border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Volunteers</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-xl font-display font-bold text-white leading-tight">
              {metrics.activeVolunteers}
            </div>
            <div className="text-[9px] text-gray-500 font-mono mt-1">
              HOURLY TASKS: 42 COMPLETED
            </div>
          </div>
        </div>

        {/* KPI: Food Concessions Revenue */}
        <div className="glass-panel p-4 relative overflow-hidden flex flex-col justify-between h-28 border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Concessions Revenue</span>
            <CreditCard className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <div className="text-xl font-display font-bold text-indigo-300 leading-tight">
              ${(metrics.revenueUsd / 1000).toFixed(0)}k
            </div>
            <div className="text-[9px] text-gray-500 font-mono mt-1">
              YIELD RATE: +12.4% MATCHDAY
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visual KPI Trend Grid Graph (Relatively custom SVG area graph, works 100% reliably in React 19 without third-party compiling bugs) */}
        <div className="lg:col-span-2 glass-panel p-6 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-display font-semibold text-white">Live Operations Traffic Analysis</h3>
              <span className="flex items-center gap-1 text-[10px] font-mono text-indigo-400">
                <TrendingUp className="w-3.5 h-3.5" />
                Live Ingress Metrics
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mb-6">Real-time comparison of Crowd Inflow pace against Entry Queue Delays over the preceding 6 hours.</p>
          </div>

          <div className="relative w-full h-44 mt-2">
            {/* Custom SVG Line Chart */}
            <svg viewBox="0 0 500 150" className="w-full h-full">
              {/* Grid Lines */}
              <line x1="0" y1="25" x2="500" y2="25" stroke="rgba(255,255,255,0.03)" />
              <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.03)" />
              <line x1="0" y1="125" x2="500" y2="125" stroke="rgba(255,255,255,0.03)" />

              {/* Area 1: Fan capacity inflow (Indigo Glow) */}
              <path
                d="M 0,130 Q 80,110 120,80 T 240,60 T 360,35 T 500,25 L 500,150 L 0,150 Z"
                fill="url(#indigoAreaGlow)"
                opacity="0.3"
              />
              <path
                d="M 0,130 Q 80,110 120,80 T 240,60 T 360,35 T 500,25"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Area 2: Entry Queue Delays (Cyan Glow) */}
              <path
                d="M 0,140 Q 60,110 100,110 T 220,120 T 340,90 T 500,135 L 500,150 L 0,150 Z"
                fill="url(#cyanAreaGlow)"
                opacity="0.15"
              />
              <path
                d="M 0,140 Q 60,110 100,110 T 220,120 T 340,90 T 500,135"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />

              {/* Hover Indicator Nodes */}
              <circle cx="360" cy="35" r="4.5" fill="#6366f1" stroke="white" strokeWidth="1.5" />
              <circle cx="340" cy="90" r="4.5" fill="#06b6d4" stroke="white" strokeWidth="1.5" />

              {/* Chart Gradients definitions */}
              <defs>
                <linearGradient id="indigoAreaGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="cyanAreaGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Custom Tooltip Overlay */}
            <div className="absolute top-2 right-44 bg-slate-950/90 border border-indigo-500/30 rounded p-2 text-[9px] font-mono leading-tight shadow-xl">
              <div className="text-white font-semibold">T-60 MIN PEAK ARRIVAL</div>
              <div className="text-indigo-400 mt-0.5">👥 Capacity: 74,200 fans</div>
              <div className="text-cyan-400">⏳ Wait time: 14 mins</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono border-t border-white/5 pt-4 mt-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-indigo-500 rounded-full" /> In-seat Capacity (Live)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-cyan-500 rounded-full" strokeDasharray="2,2" /> Entry Gate Delays (Min)
            </span>
            <span>Update interval: 10s</span>
          </div>
        </div>

        {/* AI Executive Briefing Column */}
        <div className="glass-panel p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-3 pointer-events-none">
            <Sparkles className="w-12 h-12 text-indigo-500/10" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <h3 className="text-xs font-display font-semibold text-white uppercase tracking-wider">AI Executive Briefing</h3>
              </div>
              <button
                onClick={handleRegenerateBriefing}
                disabled={briefingLoading}
                className="p-1 text-gray-400 hover:text-white transition disabled:opacity-50"
                title="Regenerate Executive Report"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${briefingLoading ? 'animate-spin text-indigo-400' : ''}`} />
              </button>
            </div>

            <div className="bg-slate-950/60 rounded border border-white/5 p-4 min-h-[170px] flex flex-col justify-center">
              {briefingLoading ? (
                <div className="flex flex-col items-center justify-center py-6 text-gray-500 space-y-2">
                  <div className="w-5 h-5 rounded border-2 border-indigo-500 border-t-transparent animate-spin" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-indigo-300">Compiling feeds...</span>
                </div>
              ) : (
                <ul className="space-y-3">
                  {briefingText.map((line, idx) => (
                    <li key={idx} className="text-[10px] text-gray-300 font-mono flex items-start gap-2 leading-relaxed">
                      <span className="text-indigo-400 mt-0.5 font-semibold shrink-0">›</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="border-t border-white/5 pt-3.5 mt-4 text-[9px] text-gray-500 flex items-center justify-between font-mono">
            <span>COMPILED FOR: METLIFE OPERATIONS</span>
            <span>VER: 4.10.2</span>
          </div>
        </div>

      </div>

      {/* Decision Support Board */}
      <div className="glass-panel p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
          <div>
            <h3 className="text-sm font-display font-semibold text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              Generative AI Decision Support Panel
            </h3>
            <p className="text-[10px] text-gray-400">Autonomous intelligence triggers recommendations based on live sensor updates. Approve to apply directly.</p>
          </div>
          <span className="text-[10px] font-mono text-gray-500 bg-slate-950 border border-white/5 px-2.5 py-1 rounded-full">
            PENDING RECS: {decisions.filter(d => d.status === 'pending').length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {decisions.filter(d => d.status === 'pending').length === 0 ? (
            <div className="md:col-span-2 py-8 text-center text-gray-500 border border-dashed border-white/5 rounded-xl bg-slate-950/20 font-mono text-xs flex flex-col items-center justify-center">
              <span>✅ All active recommendations have been reviewed.</span>
              <span className="text-[10px] text-gray-600 mt-1">Systems matching stadium optimization parameters perfectly.</span>
            </div>
          ) : (
            decisions.filter(d => d.status === 'pending').map((rec) => (
              <div
                key={rec.id}
                className="bg-slate-950/40 border border-white/5 rounded-xl p-4 flex flex-col justify-between transition-all hover:border-white/15 hover:shadow-lg relative"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                      rec.category === 'emergency' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      rec.category === 'security' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      rec.category === 'crowd' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      rec.category === 'transport' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {rec.category.toUpperCase()} RECOMMENDED
                    </span>
                    <span className="text-[9px] text-gray-500 font-mono">Proposed by: {rec.proposedBy.toUpperCase()}</span>
                  </div>

                  <h4 className="font-display font-semibold text-white text-xs mb-1">{rec.title}</h4>
                  <p className="text-[10px] text-gray-400 leading-relaxed mb-4">{rec.description}</p>
                </div>

                <div className="border-t border-white/5 pt-3 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-x-2 text-[9px] font-mono text-emerald-400">
                    {Object.entries(rec.impacts).map(([key, val]) => (
                      <span key={key}>
                        {key === 'crowdCongestion' ? `👥 Inflow: ${val}%` :
                         key === 'securityRisk' ? `🛡️ Risk: ${val}%` :
                         key === 'energyEfficiency' ? `⚡ Solar Auxiliary: +${val}%` :
                         key === 'transitDelay' ? `🚌 Wait: ${val}m` :
                         `💰 Concessions: +$${val}`}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onRejectDecision(rec.id)}
                      className="p-1.5 rounded-lg bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 text-red-400 transition"
                      title="Reject Recommendation"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onApproveDecision(rec.id)}
                      className="p-1.5 rounded-lg bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 transition flex items-center gap-1 text-[10px] font-medium"
                    >
                      <Check className="w-3.5 h-3.5" /> Approve
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Audit Log history list */}
        {decisions.some(d => d.status === 'approved') && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-2">Approved Operational Dispatches</h4>
            <div className="flex flex-wrap gap-2">
              {decisions.filter(d => d.status === 'approved').map(d => (
                <div key={d.id} className="bg-slate-950/80 border border-emerald-500/20 rounded-lg px-2.5 py-1 text-[9px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{d.title} [ACTIVE]</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
