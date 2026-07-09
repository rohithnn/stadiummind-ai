import React, { useState, useEffect } from 'react';
import { Eye, ShieldAlert, Languages, Camera, Scan, Sparkles, RefreshCw } from 'lucide-react';
import { Incident } from '../types';

interface CCTVPanelProps {
  incidents: Incident[];
}

export default function CCTVPanel({ incidents }: CCTVPanelProps) {
  const [selectedFeed, setSelectedFeed] = useState('feed-04');
  const [visionBoxActive, setVisionBoxActive] = useState(true);
  const [ocrText, setOcrText] = useState('ENTRADA PROHIBIDA - TRABAJADORES SÓLO');
  const [ocrLang, setOcrLang] = useState('Spanish');
  const [ocrResult, setOcrResult] = useState('');
  const [ocrTranslating, setOcrTranslating] = useState(false);

  // Auto-set selected feed if a corresponding incident is triggered
  useEffect(() => {
    if (incidents.some(i => i.type === 'security')) {
      setSelectedFeed('feed-04'); // Unattended bag
    } else if (incidents.some(i => i.type === 'medical')) {
      setSelectedFeed('feed-03'); // Sector C Seating
    } else if (incidents.some(i => i.type === 'congestion')) {
      setSelectedFeed('feed-01'); // Gate 4 Ingress
    }
  }, [incidents]);

  const handleTranslateSign = () => {
    setOcrTranslating(true);
    setTimeout(() => {
      if (ocrLang === 'Spanish') {
        setOcrResult("🚫 **English Translation:** ENTRY FORBIDDEN - WORKERS ONLY\n🗣️ **Phonetic Pronunciation:** en-TRAH-dah pro-ee-BEE-dah");
      } else if (ocrLang === 'German') {
        setOcrResult("⚠️ **English Translation:** CAUTION: EMERGENCY ACCESS ROUTE - KEEP CLEAR\n🗣️ **Phonetic Pronunciation:** RECH-toong: noht-ahzg-ahng");
      } else if (ocrLang === 'French') {
        setOcrResult("🚪 **English Translation:** EMERGENCY EXIT - ALARM WILL SOUND ON OPENING\n🗣️ **Phonetic Pronunciation:** sohr-TEE deh seh-KOOR");
      }
      setOcrTranslating(false);
    }, 900);
  };

  const handleSignPresetChange = (preset: string) => {
    if (preset === 'spanish') {
      setOcrText('ENTRADA PROHIBIDA - TRABAJADORES SÓLO');
      setOcrLang('Spanish');
    } else if (preset === 'german') {
      setOcrText('ACHTUNG: NOTAUSGANG - FREIHALTEN');
      setOcrLang('German');
    } else if (preset === 'french') {
      setOcrText('SORTIE DE SECOURS - ALARME EN CAS D\'OUVERTURE');
      setOcrLang('French');
    }
    setOcrResult('');
  };

  // Find if incident matches currently selected feed
  const activeSec = incidents.find(i => i.type === 'security');
  const activeMed = incidents.find(i => i.type === 'medical');
  const activeCong = incidents.find(i => i.type === 'congestion');

  return (
    <div className="glass-panel p-6 relative overflow-hidden h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-5">
        <div>
          <h2 className="text-sm font-display font-semibold text-white flex items-center gap-2">
            <Scan className="text-rose-400 w-4 h-4 animate-pulse" />
            AI Computer Vision Security Suite
          </h2>
          <p className="text-[10px] text-gray-400 font-mono">LIVE FEED ENCRYPTION: SHA-256 SECURED</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setVisionBoxActive(!visionBoxActive)}
            aria-label={visionBoxActive ? 'Disable computer vision target bounding boxes' : 'Enable computer vision target bounding boxes'}
            className={`px-3 py-1 rounded border text-[10px] transition ${
              visionBoxActive
                ? 'bg-rose-500/10 text-rose-300 border-rose-500/40'
                : 'bg-slate-900 text-gray-400 border-white/5'
            }`}
          >
            {visionBoxActive ? '🟢 Target BBoxes: Active' : '⚪ Static CCTV'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CCTV Viewport */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-black aspect-video rounded border border-white/10 relative overflow-hidden shadow-2xl">
            {/* Visual Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none" />

            {/* Simulated Live Label Overlay */}
            <div className="absolute top-3 left-3 bg-black/70 border border-white/10 px-2.5 py-1 rounded text-[9px] font-mono flex items-center gap-2 z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>CCTV-{selectedFeed.toUpperCase()}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">FPS: 30.00</span>
            </div>

            <div className="absolute top-3 right-3 bg-black/70 border border-white/10 px-2.5 py-1 rounded text-[9px] font-mono z-10">
              CDT 2026-07-08T02:55:00
            </div>

            {/* Simulated CCTV Visual Renderer */}
            <div className="w-full h-full flex flex-col items-center justify-center relative">
              {selectedFeed === 'feed-04' && (
                <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center relative p-4">
                  {/* Backdrop artwork details */}
                  <div className="text-center">
                    <Camera className="w-10 h-10 text-gray-600 mx-auto mb-2" />
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">GATE 2 CORRIDOR</div>
                    <div className="text-[10px] text-gray-600 font-mono mt-1">PROMENADE egress line #04</div>
                  </div>

                  {/* Dynamic Bounding Box Overlay for Unattended Bag */}
                  {activeSec && visionBoxActive && (
                    <div className="absolute top-[40%] left-[35%] w-32 h-32 border-2 border-red-500 bg-red-500/10 rounded flex flex-col justify-between p-1.5 animate-in fade-in zoom-in duration-200">
                      <div className="text-[9px] font-mono font-bold bg-red-500 text-white px-1 rounded self-start">
                        BAGGAGE_ALERT (98%)
                      </div>
                      <div className="text-[8px] font-mono text-red-300 bg-black/80 p-1 rounded">
                        ID: UNATTENDED_PACK<br />DWELL: 5m 12s
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedFeed === 'feed-01' && (
                <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center relative p-4">
                  <div className="text-center">
                    <Camera className="w-10 h-10 text-gray-600 mx-auto mb-2" />
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">GATE 4 SOUTH ACCESS</div>
                    <div className="text-[10px] text-gray-600 font-mono mt-1">MAIN INGRESS TUNNELS</div>
                  </div>

                  {/* Dynamic Bounding Box Overlay for Gate Congestion */}
                  {activeCong && visionBoxActive && (
                    <div className="absolute top-[20%] left-[20%] right-[20%] bottom-[20%] border-2 border-amber-500 bg-amber-500/5 rounded flex flex-col justify-between p-2">
                      <div className="text-[9px] font-mono font-bold bg-amber-500 text-white px-1.5 rounded self-start">
                        CONGESTION_HOTSPOT (92%)
                      </div>
                      <div className="text-[8px] font-mono text-amber-300 bg-black/85 p-1 rounded max-w-sm">
                        GATE C bottleneck • Egress Speed: &lt;0.2m/s • Recommendation: Dispatch helpers
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedFeed === 'feed-03' && (
                <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center relative p-4">
                  <div className="text-center">
                    <Camera className="w-10 h-10 text-gray-600 mx-auto mb-2" />
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">SECTOR C LOWER GRANDSTANDS</div>
                    <div className="text-[10px] text-gray-600 font-mono mt-1">SEATS A10 - A50 CAMERA</div>
                  </div>

                  {/* Dynamic Bounding Box Overlay for Medical crisis */}
                  {activeMed && visionBoxActive && (
                    <div className="absolute top-[45%] left-[50%] w-24 h-24 border-2 border-rose-500 bg-rose-500/10 rounded flex flex-col justify-between p-1.5">
                      <div className="text-[8px] font-mono font-bold bg-rose-500 text-white px-1 rounded self-start">
                        ACCIDENT_DETECT (94%)
                      </div>
                      <div className="text-[8px] font-mono text-rose-300 bg-black/80 p-1 rounded">
                        Row 12, Seat A22 • FALL_ALERT
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedFeed === 'feed-05' && (
                <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center relative p-4">
                  <div className="text-center">
                    <Camera className="w-10 h-10 text-gray-600 mx-auto mb-2" />
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">F&B SECTOR A CONCESSIONS</div>
                    <div className="text-[10px] text-gray-600 font-mono mt-1">MAIN PROMENADE RESTROOM CORRIDOR</div>
                  </div>
                </div>
              )}
            </div>

            {/* Bounding box visual target indicators */}
            <div className="absolute bottom-3 left-3 flex gap-2 text-[9px] font-mono bg-black/80 px-2 py-1 rounded border border-white/5 text-gray-400">
              <span>SCANNER: ACTIVE</span>
              <span>•</span>
              <span className="text-emerald-400">AI DETECT: OK</span>
            </div>
          </div>

          {/* Feeds Switcher Grid */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'feed-01', name: 'G4 Ingress', icon: '👤', alert: !!activeCong },
              { id: 'feed-04', name: 'G2 Corridor', icon: '🎒', alert: !!activeSec },
              { id: 'feed-03', name: 'Sector C Grand', icon: '🚑', alert: !!activeMed },
              { id: 'feed-05', name: 'Sector A Con', icon: '🍔', alert: false },
            ].map((feed) => (
              <button
                key={feed.id}
                onClick={() => setSelectedFeed(feed.id)}
                aria-label={`Switch to CCTV feed ${feed.name}`}
                className={`p-2.5 rounded border text-left transition relative ${
                  selectedFeed === feed.id
                    ? 'bg-indigo-600/20 border-indigo-500 text-white font-medium'
                    : 'bg-slate-900 border-white/5 hover:border-white/10 text-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs" role="img" aria-label={`${feed.name} icon`}>{feed.icon}</span>
                  {feed.alert && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping absolute top-2 right-2" />
                  )}
                </div>
                <div className="text-[9px] font-mono mt-1 truncate">{feed.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* OCR Signboard Translation Card */}
        <div className="bg-slate-900/55 rounded border border-white/5 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Languages className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-display font-semibold text-white uppercase tracking-wider">AI Signboard OCR Translator</h3>
            </div>
            <p className="text-[10px] text-gray-400 mb-4">
              Select a foreign language sign captured by camera. The Vision AI OCR will translate it immediately to assist fans and staff.
            </p>

            {/* Presets buttons */}
            <div className="grid grid-cols-3 gap-1.5 mb-4">
              <button
                onClick={() => handleSignPresetChange('spanish')}
                aria-label="Preset sign Spanish"
                className={`py-1.5 rounded border text-[9px] font-mono font-medium transition ${
                  ocrLang === 'Spanish' ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' : 'bg-slate-950/40 text-gray-400 border-white/5'
                }`}
              >
                🇪🇸 Spanish
              </button>
              <button
                onClick={() => handleSignPresetChange('german')}
                aria-label="Preset sign German"
                className={`py-1.5 rounded border text-[9px] font-mono font-medium transition ${
                  ocrLang === 'German' ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' : 'bg-slate-950/40 text-gray-400 border-white/5'
                }`}
              >
                🇩🇪 German
              </button>
              <button
                onClick={() => handleSignPresetChange('french')}
                aria-label="Preset sign French"
                className={`py-1.5 rounded border text-[9px] font-mono font-medium transition ${
                  ocrLang === 'French' ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' : 'bg-slate-950/40 text-gray-400 border-white/5'
                }`}
              >
                🇫🇷 French
              </button>
            </div>

            {/* Visual crop box simulation */}
            <div className="bg-slate-950 border border-white/10 rounded p-3.5 relative overflow-hidden mb-4">
              <div className="absolute top-1 left-1 border-t-2 border-l-2 border-cyan-400 w-3 h-3" />
              <div className="absolute top-1 right-1 border-t-2 border-r-2 border-cyan-400 w-3 h-3" />
              <div className="absolute bottom-1 left-1 border-b-2 border-l-2 border-cyan-400 w-3 h-3" />
              <div className="absolute bottom-1 right-1 border-b-2 border-r-2 border-cyan-400 w-3 h-3" />
              
              <div className="text-center font-display font-bold text-xs text-white uppercase tracking-wider py-4 select-all">
                "{ocrText}"
              </div>
            </div>

            <button
              onClick={handleTranslateSign}
              disabled={ocrTranslating}
              aria-label="Translate active sign board using OCR"
              className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs rounded transition flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {ocrTranslating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Performing OCR...
                </>
              ) : (
                <>
                  <Languages className="w-3.5 h-3.5" /> Translate Sign Board
                </>
              )}
            </button>
          </div>

          {/* OCR Translation Result Panel */}
          {ocrResult && (
            <div className="bg-slate-950/80 border border-cyan-500/20 rounded p-3 mt-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest mb-1 font-semibold">OCR TARGET CAPTURED</div>
              <div className="text-[10px] text-gray-300 leading-relaxed font-mono whitespace-pre-wrap">
                {ocrResult.split('\n')[0]}
              </div>
              <div className="text-[9px] text-gray-400 mt-1 bg-slate-900 p-1.5 rounded font-mono border border-white/5">
                {ocrResult.split('\n')[1]}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
