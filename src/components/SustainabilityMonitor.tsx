import React from 'react';
import { Leaf, Sun, Zap, Droplets, Trash2, Battery, Thermometer, Sparkles } from 'lucide-react';

export default function SustainabilityMonitor() {
  const energyMetrics = {
    solarGen: 420, // kW
    gridOffset: 15, // percent
    batteryStorage: 84, // percent (4.2 MWh)
    hvacSet: 22.5, // celsius
    hvacSaving: 12, // percent
    carbonSaved: 14.2, // tons today
  };

  const wasteBins = [
    { id: 'Bin C-1', location: 'Sector C Concourse', fullness: 90, type: 'compost', urgent: true },
    { id: 'Bin B-2', location: 'Sector B Gate 2 Entrance', fullness: 42, type: 'plastic recycling', urgent: false },
    { id: 'Bin A-4', location: 'Sector A Restroom Area', fullness: 15, type: 'landfill', urgent: false },
    { id: 'Bin D-3', location: 'Sector D Grandstands', fullness: 78, type: 'compost', urgent: false },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Renewable energy smart grid stats */}
      <div className="glass-panel p-6 relative overflow-hidden flex flex-col justify-between border-emerald-500/10">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-display font-semibold text-white flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-emerald-400" />
              Solar Canopy & Smart Grid
            </h3>
            <span className="text-[9px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              LIVE GRID FEED
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-950/60 border border-white/5 rounded p-3">
              <div className="text-[8px] font-mono text-gray-500 uppercase">Solar Output</div>
              <div className="text-lg font-display font-bold text-emerald-400 mt-1">{energyMetrics.solarGen} kW</div>
              <div className="text-[8px] font-mono text-gray-400 mt-1">Auxiliary supply active</div>
            </div>

            <div className="bg-slate-950/60 border border-white/5 rounded p-3">
              <div className="text-[8px] font-mono text-gray-500 uppercase">Battery Reserve</div>
              <div className="text-lg font-display font-bold text-emerald-400 mt-1 flex items-center gap-1">
                <Battery className="w-4 h-4" /> {energyMetrics.batteryStorage}%
              </div>
              <div className="text-[8px] font-mono text-gray-400 mt-1">4.2 MWh storage reserve</div>
            </div>
          </div>

          <div className="space-y-3.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Stadium Grid self-sufficiency:</span>
              <span className="font-semibold text-white">+{energyMetrics.gridOffset}% offset</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: `${energyMetrics.gridOffset}%` }} />
            </div>

            <div className="flex justify-between items-center text-xs mt-3">
              <span className="text-gray-400">CO2 Emissions Abated today:</span>
              <span className="font-semibold text-emerald-400">-{energyMetrics.carbonSaved} Tons</span>
            </div>
          </div>
        </div>

        <div className="text-[8px] font-mono text-gray-500 text-center border-t border-white/5 pt-4 mt-6">
          Auxiliary energy matches FIFA stadium operations goals.
        </div>
      </div>

      {/* Smart HVAC suite controls */}
      <div className="glass-panel p-6 relative overflow-hidden flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-display font-semibold text-white mb-1 flex items-center gap-1.5">
            <Thermometer className="w-4 h-4 text-orange-400" />
            AI Climate & Water Pressures
          </h3>
          <p className="text-[10px] text-gray-400 mb-4">
            Localized smart thermostat zones automatically decrease HVAC cooling inside unused suites, optimizing storage power.
          </p>

          <div className="space-y-4">
            <div className="bg-slate-950/60 border border-white/5 rounded p-3.5 flex justify-between items-center">
              <div>
                <div className="text-xs font-semibold text-white">VIP Suite average setpoint</div>
                <div className="text-[9px] text-orange-400 font-mono mt-0.5">Optimized dynamically • Saving {energyMetrics.hvacSaving}% load</div>
              </div>
              <div className="text-right text-lg font-display font-bold text-white">{energyMetrics.hvacSet}°C</div>
            </div>

            <div className="bg-slate-950/60 border border-white/5 rounded p-3.5 flex justify-between items-center">
              <div>
                <div className="text-xs font-semibold text-white">Smart Water grid pressure</div>
                <div className="text-[9px] text-cyan-400 font-mono mt-0.5">Low-flush sensor network active</div>
              </div>
              <div className="text-right text-lg font-display font-bold text-cyan-400 flex items-center gap-1 justify-end">
                <Droplets className="w-4 h-4" /> 58 <span className="text-xs text-gray-500 font-sans">PSI</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-950/15 border border-emerald-500/20 rounded p-3 text-[10px] text-emerald-300 font-mono flex items-center gap-2 mt-4">
          <Leaf className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>**AI Energy Suggestion:** HVAC setpoints can be raised by 0.5°C in Sectors A and B to save an additional 32kW of peak power.</span>
        </div>
      </div>

      {/* Waste recycling predictors */}
      <div className="glass-panel p-6 relative overflow-hidden flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-display font-semibold text-white mb-1 flex items-center gap-1.5">
            <Trash2 className="w-4 h-4 text-purple-400" />
            Smart Waste & Compost Sensors
          </h3>
          <p className="text-[10px] text-gray-400 mb-4">
            Predicted organic compost volume: 1.2 Tons. Bins report volume levels in real-time to organize cleaning runs.
          </p>

          <div className="space-y-3.5">
            {wasteBins.map((bin) => (
              <div key={bin.id} className="bg-slate-950/40 border border-white/5 rounded p-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    {bin.id}
                    <span className="text-[8px] font-mono uppercase bg-slate-900 border border-white/5 px-1.5 rounded text-gray-400">
                      {bin.type}
                    </span>
                  </div>
                  <div className="text-[9px] text-gray-400 mt-1">{bin.location}</div>
                </div>

                <div className="text-right shrink-0">
                  <div className={`text-xs font-mono font-bold mb-1 ${bin.urgent ? 'text-red-400' : 'text-gray-300'}`}>
                    {bin.fullness}% Full
                  </div>
                  <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${bin.fullness > 80 ? 'bg-red-500 animate-pulse' : 'bg-purple-500'}`} style={{ width: `${bin.fullness}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[9px] text-gray-500 font-mono text-center border-t border-white/5 pt-3.5 mt-4">
          Organic compost bins reduce carbon landfills by 92% per tournament matchday.
        </div>
      </div>

    </div>
  );
}
