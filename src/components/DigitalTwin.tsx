import React, { useState } from 'react';
import { ShieldAlert, Users, Flame, Thermometer, Droplets, MapPin, Play, Pause, RefreshCw } from 'lucide-react';
import { Incident } from '../types';

interface DigitalTwinProps {
  incidents: Incident[];
  onTriggerIncident: (type: 'security' | 'medical' | 'sustainability' | 'congestion' | 'system') => void;
  activeIncidentId: string | null;
  setActiveIncidentId: (id: string | null) => void;
}

export default function DigitalTwin({
  incidents,
  onTriggerIncident,
  activeIncidentId,
  setActiveIncidentId,
}: DigitalTwinProps) {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  // Sector Stats based on active incidents
  const getSectorStats = (sector: string) => {
    const isCongested = incidents.some(i => i.location.includes(sector) && i.type === 'congestion');
    const isEmergency = incidents.some(i => i.location.includes(sector) && i.type === 'medical');
    const isSecurity = incidents.some(i => i.location.includes(sector) && i.type === 'security');
    const isUtility = incidents.some(i => i.location.includes(sector) && i.type === 'sustainability');

    let baseOccupancy = 94;
    let temp = 22.5;
    let desc = "Normal Matchday Conditions";
    let status: 'nominal' | 'warning' | 'critical' = 'nominal';

    if (sector === 'Sector A') {
      if (isUtility) {
        temp = 25.1;
        desc = "Water line leakage detected in F&B stall #12";
        status = 'warning';
      } else {
        baseOccupancy = 88;
      }
    } else if (sector === 'Sector B') {
      if (isSecurity) {
        baseOccupancy = 98;
        desc = "Unattended bag near Gate 2 under inspection";
        status = 'critical';
      } else {
        baseOccupancy = 96;
      }
    } else if (sector === 'Sector C') {
      if (isEmergency) {
        baseOccupancy = 99;
        desc = "Medical dispatch active for Seat A22";
        status = 'critical';
      } else {
        baseOccupancy = 95;
      }
    } else if (sector === 'Sector D') {
      if (isCongested) {
        baseOccupancy = 100;
        desc = "Severe crowd bottleneck active at Gate C egress";
        status = 'critical';
      } else {
        baseOccupancy = 92;
      }
    }

    return { occupancy: baseOccupancy, temp, desc, status };
  };

  return (
    <div className="glass-panel p-6 relative overflow-hidden" id="digital-twin-panel">
      {/* Visual background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06),transparent)] pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <h2 className="text-xl font-display font-semibold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse glow-cyan" />
            AI Digital Twin Arena
          </h2>
          <p className="text-xs text-gray-400">MetLife Stadium, NY/NJ • Live 3D Operational Hologram</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-3 py-1.5 rounded border transition-all ${
              showHeatmap
                ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500/50'
                : 'bg-slate-800/50 text-gray-400 border-slate-700'
            }`}
          >
            {showHeatmap ? '🔥 Heatmap: Active' : '🗺️ Map Mode'}
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded bg-slate-800 border border-slate-700 text-gray-300 hover:bg-slate-700 transition"
            title={isPlaying ? "Pause Simulation" : "Resume Simulation"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <span className="text-gray-500 font-mono text-[10px]">FPS: 60 • LATCH: SECURE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
        {/* Stadium Interactive Visualizer */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center bg-slate-950/60 stadium-grid rounded border border-white/5 p-4 relative min-h-[360px]">
          
          {/* Legend */}
          <div className="absolute top-3 left-3 bg-slate-900/90 border border-white/5 rounded-lg p-2.5 text-[10px] space-y-1 z-20">
            <div className="text-gray-400 font-medium mb-1 border-b border-white/5 pb-0.5">MAP LEGEND</div>
            <div className="flex items-center gap-1.5 text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Normal (Egress &lt;3m)
            </div>
            <div className="flex items-center gap-1.5 text-yellow-400">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Caution (Queue &gt;15m)
            </div>
            <div className="flex items-center gap-1.5 text-red-400 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Critical Incident Alert
            </div>
          </div>

          {/* Interactive SVG Stadium */}
          <svg
            viewBox="0 0 600 450"
            className="w-full max-w-[480px] h-auto drop-shadow-[0_10px_35px_rgba(99,102,241,0.12)] transition-all duration-500"
          >
            {/* Ambient Outer Ring */}
            <circle cx="300" cy="225" r="210" fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="6" strokeDasharray="5,10" />

            {/* Parking Lots and Exterior Elements */}
            <g opacity="0.6">
              {/* Lot G (North) */}
              <rect x="250" y="5" width="100" height="30" rx="4" fill="rgba(30,41,59,0.5)" stroke="rgba(255,255,255,0.05)" />
              <text x="300" y="22" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">LOT G (PRIME)</text>
              
              {/* Lot D (West) */}
              <rect x="10" y="210" width="40" height="80" rx="4" fill="rgba(30,41,59,0.5)" stroke="rgba(255,255,255,0.05)" />
              <text x="30" y="255" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace" transform="rotate(-90 30 255)">LOT D</text>
            </g>

            {/* Stadium Exterior Wall */}
            <ellipse cx="300" cy="225" rx="190" ry="160" fill="rgba(15,23,42,0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />

            {/* Heatmap Layer */}
            {showHeatmap && (
              <g opacity="0.15">
                {/* Global Ambient Glow */}
                <ellipse cx="300" cy="225" rx="180" ry="150" fill="url(#blueGlow)" />
                {/* Gate C congestion heat glow */}
                {incidents.some(i => i.type === 'congestion') && (
                  <circle cx="480" cy="250" r="80" fill="url(#redGlow)" />
                )}
                {/* Sector C medical emergency heat glow */}
                {incidents.some(i => i.type === 'medical') && (
                  <circle cx="380" cy="140" r="50" fill="url(#orangeGlow)" />
                )}
              </g>
            )}

            {/* Entry Gates Markers with dynamic coloring */}
            {/* Gate 1 (North) */}
            <g transform="translate(300, 50)" className="cursor-pointer group">
              <circle r="12" fill={incidents.some(i => i.location.includes('Gate 1')) ? '#ef4444' : '#22c55e'} opacity="0.2" className="animate-ping" />
              <circle r="8" fill={incidents.some(i => i.location.includes('Gate 1')) ? '#ef4444' : '#22c55e'} stroke="white" strokeWidth="1" />
              <text y="3" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">G1</text>
              <text y="-12" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="monospace">GATE 1 (NORTH)</text>
            </g>

            {/* Gate 2 (West) */}
            <g transform="translate(100, 225)" className="cursor-pointer group">
              <circle r="12" fill={incidents.some(i => i.location.includes('Gate 2')) ? '#ef4444' : '#eab308'} opacity="0.2" className="animate-ping" />
              <circle r="8" fill={incidents.some(i => i.location.includes('Gate 2')) ? '#ef4444' : '#eab308'} stroke="white" strokeWidth="1" />
              <text y="3" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">G2</text>
              <text x="-35" y="3" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="monospace">GATE 2 (WEST)</text>
            </g>

            {/* Gate 3 (East) */}
            <g transform="translate(500, 225)" className="cursor-pointer group">
              <circle r="12" fill={incidents.some(i => i.location.includes('Gate 3')) ? '#ef4444' : '#22c55e'} opacity="0.2" className="animate-ping" />
              <circle r="8" fill={incidents.some(i => i.location.includes('Gate 3')) ? '#ef4444' : '#22c55e'} stroke="white" strokeWidth="1" />
              <text y="3" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">G3</text>
              <text x="35" y="3" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="monospace">GATE 3 (EAST)</text>
            </g>

            {/* Gate 4 (South / Gate C congestion) */}
            <g transform="translate(300, 400)" className="cursor-pointer group">
              <circle r="16" fill={incidents.some(i => i.location.includes('Gate C')) ? '#ef4444' : '#22c55e'} opacity="0.3" className="animate-ping" />
              <circle r="8" fill={incidents.some(i => i.location.includes('Gate C')) ? '#ef4444' : '#22c55e'} stroke="white" strokeWidth="1" />
              <text y="3" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">G4</text>
              <text y="14" fill="#ef4444" fontSize="7" textAnchor="middle" fontFamily="monospace" fontWeight="bold">GATE 4 (SOUTH/GATE C)</text>
            </g>

            {/* SECTORS / GRANDSTAND SEATING (Path structures) */}
            {/* Sector A - Top Left */}
            <path
              d="M 170,120 A 150,120 0 0,1 280,70 L 285,115 A 100,80 0 0,0 205,150 Z"
              fill={hoveredSector === 'Sector A' ? 'rgba(99,102,241,0.45)' : (showHeatmap && incidents.some(i => i.location.includes('Sector A')) ? 'rgba(239,68,68,0.35)' : 'rgba(30,41,59,0.45)')}
              stroke={incidents.some(i => i.location.includes('Sector A')) ? '#ef4444' : '#3b82f6'}
              strokeWidth="1.5"
              className="transition-all duration-200 cursor-pointer"
              onMouseEnter={() => setHoveredSector('Sector A')}
              onMouseLeave={() => setHoveredSector(null)}
            />
            <text x="215" y="105" fill="white" fontSize="10" fontWeight="600" pointerEvents="none">SECTOR A</text>

            {/* Sector B - Top Right */}
            <path
              d="M 320,70 A 150,120 0 0,1 430,120 L 395,150 A 100,80 0 0,0 315,115 Z"
              fill={hoveredSector === 'Sector B' ? 'rgba(99,102,241,0.45)' : (showHeatmap && incidents.some(i => i.location.includes('Sector B')) ? 'rgba(239,68,68,0.35)' : 'rgba(30,41,59,0.45)')}
              stroke={incidents.some(i => i.location.includes('Sector B')) ? '#ef4444' : '#3b82f6'}
              strokeWidth="1.5"
              className="transition-all duration-200 cursor-pointer"
              onMouseEnter={() => setHoveredSector('Sector B')}
              onMouseLeave={() => setHoveredSector(null)}
            />
            <text x="385" y="105" fill="white" fontSize="10" fontWeight="600" pointerEvents="none">SECTOR B</text>

            {/* Sector C - Bottom Right */}
            <path
              d="M 430,330 A 150,120 0 0,1 320,380 L 315,335 A 100,80 0 0,0 395,300 Z"
              fill={hoveredSector === 'Sector C' ? 'rgba(99,102,241,0.45)' : (showHeatmap && incidents.some(i => i.location.includes('Sector C')) ? 'rgba(239,68,68,0.35)' : 'rgba(30,41,59,0.45)')}
              stroke={incidents.some(i => i.location.includes('Sector C')) ? '#ef4444' : '#3b82f6'}
              strokeWidth="1.5"
              className="transition-all duration-200 cursor-pointer"
              onMouseEnter={() => setHoveredSector('Sector C')}
              onMouseLeave={() => setHoveredSector(null)}
            />
            <text x="385" y="345" fill="white" fontSize="10" fontWeight="600" pointerEvents="none">SECTOR C</text>

            {/* Sector D - Bottom Left */}
            <path
              d="M 280,380 A 150,120 0 0,1 170,330 L 205,300 A 100,80 0 0,0 285,335 Z"
              fill={hoveredSector === 'Sector D' ? 'rgba(99,102,241,0.45)' : (showHeatmap && incidents.some(i => i.location.includes('Sector D')) ? 'rgba(239,68,68,0.35)' : 'rgba(30,41,59,0.45)')}
              stroke={incidents.some(i => i.location.includes('Sector D')) ? '#ef4444' : '#3b82f6'}
              strokeWidth="1.5"
              className="transition-all duration-200 cursor-pointer"
              onMouseEnter={() => setHoveredSector('Sector D')}
              onMouseLeave={() => setHoveredSector(null)}
            />
            <text x="215" y="345" fill="white" fontSize="10" fontWeight="600" pointerEvents="none">SECTOR D</text>

            {/* Executive VIP Suites Center Rings */}
            <ellipse cx="300" cy="225" rx="110" ry="88" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
            <ellipse cx="300" cy="225" rx="100" ry="80" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            <text x="300" y="152" fill="#818cf8" fontSize="8" textAnchor="middle" fontWeight="bold" fontFamily="monospace">SUITE TIER L3</text>

            {/* Soccer Pitch Center Field */}
            <g transform="translate(230, 185)">
              <rect width="140" height="80" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" />
              {/* Pitch Markings */}
              <circle cx="70" cy="40" r="15" fill="none" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" />
              <line x1="70" y1="0" x2="70" y2="80" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" />
              <rect x="0" y="20" width="12" height="40" fill="none" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" />
              <rect x="128" y="20" width="12" height="40" fill="none" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" />
              {/* Glowing Ball */}
              <circle cx="70" cy="40" r="2.5" fill="#eab308" className="animate-pulse glow-cyan" />
            </g>

            {/* Simulated Pedestrians Movement Dots */}
            {isPlaying && (
              <g opacity="0.8">
                {/* Flow lines particles */}
                <circle cx="150" cy="190" r="2" fill="#22d3ee" className="animate-ping" />
                <circle cx="450" cy="180" r="1.5" fill="#f43f5e" />
                <circle cx="340" cy="300" r="2" fill="#10b981" />
                <circle cx="260" cy="130" r="1.5" fill="#a855f7" />
              </g>
            )}

            {/* Active Incident Warning Badges Pinpointed */}
            {incidents.map((incident) => {
              let coords = { x: 300, y: 225 };
              if (incident.location.includes('Gate C') || incident.location.includes('Gate 4')) coords = { x: 300, y: 380 };
              else if (incident.location.includes('Gate 2')) coords = { x: 120, y: 225 };
              else if (incident.location.includes('Sector A')) coords = { x: 220, y: 130 };
              else if (incident.location.includes('Sector B')) coords = { x: 380, y: 130 };
              else if (incident.location.includes('Sector C')) coords = { x: 380, y: 310 };
              else if (incident.location.includes('Sector D')) coords = { x: 220, y: 310 };

              return (
                <g
                  key={incident.id}
                  transform={`translate(${coords.x}, ${coords.y})`}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIncidentId(incident.id === activeIncidentId ? null : incident.id);
                  }}
                >
                  <circle r="18" fill="#ef4444" opacity="0.3" className="animate-ping" />
                  <circle r="10" fill="#ef4444" stroke="white" strokeWidth="1.5" className="glow-red" />
                  <path
                    d="M 0,-4 L 0,1 M 0,3 L 0,4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}

            {/* Definitions / Gradients */}
            <defs>
              <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="redGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="orangeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* Dynamic Sector Hover HUD Card */}
          {hoveredSector && (
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 border border-white/10 rounded-xl p-3 flex items-center justify-between z-20 animate-in fade-in slide-in-from-bottom-2 duration-150">
              <div className="flex items-center gap-2.5">
                <span className={`p-1.5 rounded-lg ${getSectorStats(hoveredSector).status === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-indigo-400'}`}>
                  <Users className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-display font-medium text-white text-xs">{hoveredSector} telemetry</h4>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5">{getSectorStats(hoveredSector).desc}</p>
                </div>
              </div>
              <div className="text-right font-mono">
                <div className="text-xs font-semibold text-white">{getSectorStats(hoveredSector).occupancy}% Density</div>
                <div className="text-[10px] text-gray-400 flex items-center gap-0.5 justify-end mt-0.5">
                  <Thermometer className="w-3 h-3 text-orange-400" /> {getSectorStats(hoveredSector).temp}°C
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Real-time Manual Simulation Injector Controls */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="bg-slate-900/55 rounded-xl border border-white/5 p-4">
            <h3 className="text-xs font-display font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              Simulation Trigger Panel
            </h3>
            <p className="text-[10px] text-gray-400 mb-4">
              Inject incidents into the venue network to evaluate how the StadiumMind AI multi-agent platform coordinates dispatches.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => onTriggerIncident('congestion')}
                className="w-full text-left p-2.5 rounded-lg bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 text-[11px] font-medium text-red-200 transition flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  Egress Overflow (Gate C)
                </span>
                <Users className="w-3.5 h-3.5 text-red-400" />
              </button>

              <button
                onClick={() => onTriggerIncident('security')}
                className="w-full text-left p-2.5 rounded-lg bg-amber-950/20 hover:bg-amber-950/40 border border-amber-500/20 text-[11px] font-medium text-amber-200 transition flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Unattended Baggage (Gate 2)
                </span>
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              </button>

              <button
                onClick={() => onTriggerIncident('medical')}
                className="w-full text-left p-2.5 rounded-lg bg-rose-950/20 hover:bg-rose-950/40 border border-rose-500/20 text-[11px] font-medium text-rose-200 transition flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                  Medical SOS (Sector C)
                </span>
                <Flame className="w-3.5 h-3.5 text-rose-400" />
              </button>

              <button
                onClick={() => onTriggerIncident('sustainability')}
                className="w-full text-left p-2.5 rounded-lg bg-cyan-950/20 hover:bg-cyan-950/40 border border-cyan-500/20 text-[11px] font-medium text-cyan-200 transition flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Water Pipe Leak (Sector A)
                </span>
                <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              </button>

              <button
                onClick={() => onTriggerIncident('system')}
                className="w-full text-left p-2.5 rounded-lg bg-purple-950/20 hover:bg-purple-950/40 border border-purple-500/20 text-[11px] font-medium text-purple-200 transition flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  Crowd Anomaly (Sector D)
                </span>
                <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
              </button>
            </div>
          </div>

          {/* Active Incidents Mini Feed */}
          <div className="bg-slate-900/40 rounded-xl border border-white/5 p-4 flex-1 flex flex-col justify-between">
            <div>
              <h4 className="text-[11px] font-display font-semibold text-gray-300 uppercase tracking-wider mb-2.5">
                Active Alarms ({incidents.length})
              </h4>
              <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                {incidents.length === 0 ? (
                  <div className="text-[10px] text-gray-500 py-3 text-center border border-dashed border-white/5 rounded-lg">
                    ✅ All stadium sectors green
                  </div>
                ) : (
                  incidents.map((incident) => (
                    <div
                      key={incident.id}
                      onClick={() => setActiveIncidentId(incident.id === activeIncidentId ? null : incident.id)}
                      className={`p-2 rounded-lg border transition cursor-pointer text-[10px] flex items-center justify-between ${
                        activeIncidentId === incident.id
                          ? 'bg-red-500/20 border-red-500 text-white'
                          : 'bg-slate-950/80 border-white/5 hover:border-white/10 text-gray-300'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="font-semibold">{incident.title}</span>
                        <div className="text-[9px] text-gray-400 truncate mt-0.5">{incident.location}</div>
                      </div>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono shrink-0 ${
                        incident.severity === 'high' || incident.severity === 'critical'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {incident.severity.toUpperCase()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border-t border-white/5 pt-3 mt-3 text-[9px] text-gray-500 flex items-center justify-between">
              <span>Holographic Calibration</span>
              <span className="text-green-500 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                ONLINE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
