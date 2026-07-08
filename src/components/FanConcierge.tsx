import React, { useState } from 'react';
import { Ticket, MapPin, Compass, Search, Smile, Coffee, Clock } from 'lucide-react';

export default function FanConcierge() {
  const [dietFilter, setDietFilter] = useState<'all' | 'halal' | 'vegan' | 'gluten-free'>('all');
  const [navStep, setNavStep] = useState(0);

  const concessions = [
    { name: 'Liberty Halal Grill', wait: 3, sector: 'Sector B Concourse', tags: ['halal', 'gluten-free'], menu: 'Shawarma, Falafel Platter' },
    { name: 'Veggie Goal Post', wait: 2, sector: 'Sector A Promenade', tags: ['vegan', 'halal'], menu: 'Chipotle Jackfruit Sliders, Nachos' },
    { name: 'El Azteca Tacos', wait: 5, sector: 'Sector C Level 2', tags: ['gluten-free'], menu: 'Asada Bowls, Corn Elote' },
    { name: 'Big Apple Stadium Dogs', wait: 14, sector: 'Sector D Grandstands', tags: [], menu: 'Footlong Chili Dogs, Pretzels' },
  ];

  const filteredConcessions = concessions.filter(c => 
    dietFilter === 'all' || c.tags.includes(dietFilter)
  );

  const navigationSteps = [
    { title: 'Approach Gate 3 (East Gate)', desc: 'Scan your mobile World Cup QR ticket at the fast turnstile. Step-free lines active in turnstile #12.' },
    { title: 'Ascend Sector C Escalator', desc: 'Move past the primary concourse and follow signs to Level 2 seating via the escalator.' },
    { title: 'Turn Right at Sector C Entrance', desc: 'Walk past Concession Stall #14. Your seat block is Row 12, Seat A22, situated directly on the middle tier.' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Visual FIFA Ticket and seat finder */}
      <div className="glass-panel p-6 relative overflow-hidden flex flex-col justify-between border-indigo-500/10">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950 px-2.5 py-1 rounded-full border border-indigo-500/25 uppercase">
              FIFA World Cup 2026 Ticket
            </span>
            <Ticket className="w-5 h-5 text-indigo-400" />
          </div>

          {/* Golden/Indigo Styled Ticket */}
          <div className="bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-500/30 rounded p-4 shadow-xl relative overflow-hidden mb-6">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl" />
            <div className="text-[9px] font-mono text-indigo-300">MATCH 14 • GROUP STAGE</div>
            <h3 className="font-display font-extrabold text-white text-base mt-1">USA vs ARGENTINA</h3>
            <p className="text-[10px] text-gray-400 font-mono mt-0.5">MetLife Stadium • NY/NJ</p>

            <div className="border-t border-dashed border-indigo-500/30 my-3.5" />

            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="bg-black/50 p-1.5 rounded border border-white/5">
                <div className="text-[8px] text-gray-500">SECTOR</div>
                <div className="text-xs font-bold text-indigo-300">C</div>
              </div>
              <div className="bg-black/50 p-1.5 rounded border border-white/5">
                <div className="text-[8px] text-gray-500">ROW</div>
                <div className="text-xs font-bold text-indigo-300">12</div>
              </div>
              <div className="bg-black/50 p-1.5 rounded border border-white/5">
                <div className="text-[8px] text-gray-500">SEAT</div>
                <div className="text-xs font-bold text-indigo-300">A22</div>
              </div>
            </div>

            {/* Simulated barcode */}
            <div className="mt-4 flex flex-col items-center">
              <div className="h-7 w-full bg-[repeating-linear-gradient(90deg,#fff,#fff_2px,#000_2px,#000_5px)] opacity-85" />
              <div className="text-[8px] font-mono text-gray-500 mt-1">CODE: 89965E8B146C</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-display font-semibold text-white mb-2 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-indigo-400" />
            Dynamic Routing Guide
          </h4>
          
          <div className="bg-slate-950/80 border border-white/5 rounded p-3.5">
            <div className="flex justify-between text-[9px] text-indigo-400 font-mono mb-2">
              <span>STEP {navStep + 1} OF 3</span>
              <span>EST: 4 mins walk</span>
            </div>
            
            <div className="text-xs font-semibold text-white mb-1">
              {navigationSteps[navStep].title}
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed mb-3">
              {navigationSteps[navStep].desc}
            </p>

            <div className="flex gap-1.5 justify-end">
              <button
                disabled={navStep === 0}
                onClick={() => setNavStep(s => s - 1)}
                className="px-2.5 py-1 rounded bg-slate-900 border border-white/5 hover:border-white/10 text-[9px] text-gray-300 font-mono transition disabled:opacity-40"
              >
                PREV
              </button>
              <button
                disabled={navStep === navigationSteps.length - 1}
                onClick={() => setNavStep(s => s + 1)}
                className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-[9px] text-white font-mono transition disabled:opacity-40"
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Restroom occupancy checks */}
      <div className="glass-panel p-6 relative overflow-hidden flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-display font-semibold text-white mb-1 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-cyan-400" />
            AI Restroom Wait Optimization
          </h3>
          <p className="text-[10px] text-gray-400 mb-4">
            Live occupancy tracking from IoT pressure valves. Fans are automatically routed to low-load options.
          </p>

          <div className="space-y-3.5">
            {[
              { loc: 'Sector C Level 2 (Nearest)', load: 88, wait: '8 min wait', color: 'bg-rose-500' },
              { loc: 'Sector B Upper Deck', load: 12, wait: '0 min wait', color: 'bg-emerald-500' },
              { loc: 'Sector A Concourse', load: 45, wait: '2 min wait', color: 'bg-yellow-500' },
              { loc: 'Sector D North Access', load: 60, wait: '4 min wait', color: 'bg-yellow-500' },
            ].map((rr, idx) => (
              <div key={idx} className="bg-slate-950/40 border border-white/5 rounded p-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">{rr.loc}</div>
                  <div className="text-[9px] text-gray-500 font-mono mt-0.5">{rr.wait}</div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-mono font-bold text-white mb-1">{rr.load}% Occupied</div>
                  {/* Progress bar */}
                  <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${rr.color}`} style={{ width: `${rr.load}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-cyan-950/15 border border-cyan-500/20 rounded p-3 text-[10px] text-cyan-300 font-mono flex items-center gap-2 mt-4">
          <Smile className="w-4 h-4 shrink-0" />
          <span>**AI Recommendation:** Avoid Sector C lower toilets during halftime. Sector B suites toilets are cleared for public access.</span>
        </div>
      </div>

      {/* Concession Stand F&B Diet filters */}
      <div className="glass-panel p-6 relative overflow-hidden flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-display font-semibold text-white mb-1 flex items-center gap-1.5">
            <Coffee className="w-4 h-4 text-emerald-400" />
            AI Concession Wait-Times
          </h3>
          <p className="text-[10px] text-gray-400 mb-4">
            Order ahead via StadiumMind App. Filter by dietary guidelines to find compliant stalls.
          </p>

          {/* Diet select tabs */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {[
              { id: 'all', label: 'All Stalls' },
              { id: 'halal', label: 'Halal 🟢' },
              { id: 'vegan', label: 'Vegan 🌿' },
              { id: 'gluten-free', label: 'Gluten-Free 🥖' },
            ].map((diet) => (
              <button
                key={diet.id}
                onClick={() => setDietFilter(diet.id as any)}
                className={`px-2 py-1 rounded border text-[9px] font-mono transition ${
                  dietFilter === diet.id
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-950/40 text-gray-400 border-white/5 hover:border-white/10'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>

          <div className="space-y-3.5 max-h-[175px] overflow-y-auto pr-1">
            {filteredConcessions.map((item, idx) => (
              <div key={idx} className="bg-slate-950/40 border border-white/5 rounded p-3 flex justify-between items-center hover:border-white/10 transition">
                <div>
                  <div className="text-xs font-semibold text-white">{item.name}</div>
                  <div className="text-[9px] text-gray-400 mt-0.5">{item.menu}</div>
                  <div className="text-[8px] text-gray-500 font-mono mt-1">{item.sector}</div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" /> {item.wait} mins
                  </div>
                  <div className="flex gap-1 justify-end mt-1.5">
                    {item.tags.map(t => (
                      <span key={t} className="text-[7px] font-mono bg-emerald-950 text-emerald-300 px-1 py-0.2 rounded border border-emerald-500/20 uppercase">
                        {t === 'gluten-free' ? 'GF' : t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[9px] text-gray-500 font-mono text-center border-t border-white/5 pt-3.5 mt-4">
          All water concessions are 100% complimentary today via water-grid offsets.
        </div>
      </div>

    </div>
  );
}
