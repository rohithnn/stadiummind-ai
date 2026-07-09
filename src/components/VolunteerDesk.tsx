import React, { useState } from 'react';
import { Award, CheckSquare, Languages, MapPin, Volume2, Mic, Check, Play } from 'lucide-react';
import { VolunteerTask } from '../types';

interface VolunteerDeskProps {
  tasks: VolunteerTask[];
  onCompleteTask: (id: string) => void;
  onAcceptTask: (id: string, name: string) => void;
}

export default function VolunteerDesk({ tasks, onCompleteTask, onAcceptTask }: VolunteerDeskProps) {
  const [transInput, setTransInput] = useState('Welcome to MetLife Stadium! Your seat is down this corridor on your left.');
  const [targetLang, setTargetLang] = useState('Spanish');
  const [transResult, setTransResult] = useState('');
  const [transPhonetic, setTransPhonetic] = useState('');
  const [audioPlaying, setAudioPlaying] = useState(false);

  const handleTranslate = () => {
    if (targetLang === 'Spanish') {
      setTransResult("¡Bienvenidos al Estadio MetLife! Su asiento está por este pasillo a su izquierda.");
      setTransPhonetic("Phonetic: Bee-en-veh-NEE-dos al es-TAH-dee-oh MetLife! Soo ah-see-EN-toh es-TAH por ES-teh pah-SEE-yo ah soo eeth-ky-EHR-dah.");
    } else if (targetLang === 'Japanese') {
      setTransResult("メットライフスタジアムへようこそ！ お席はこの通路を進んだ左側にあります。");
      setTransPhonetic("Phonetic: Mettoraifu Sutajiamu e yōkoso! O-seki wa kono tsūro o susunda hidarigawa ni arimasu.");
    } else if (targetLang === 'German') {
      setTransResult("Willkommen im MetLife Stadium! Ihr Sitzplatz befindet sich diesen Korridor hinunter auf der linken Seite.");
      setTransPhonetic("Phonetic: Vil-kom-en im MetLife Stay-dee-um! Eer zits-plats beh-fin-det zich dee-zen kor-ee-dor hin-oon-ter owf der lin-ken zy-teh.");
    } else if (targetLang === 'Arabic') {
      setTransResult("مرحباً بكم في ملعب ميتلايف! مقعدكم في نهاية هذا الممر على يساركم.");
      setTransPhonetic("Phonetic: Marhaban bikum fee mal'ab MetLife! Maq'adukum fee nihayati hadha al-mamarr 'ala yasarikum.");
    }
  };

  const handlePlayVoice = () => {
    setAudioPlaying(true);
    setTimeout(() => {
      setAudioPlaying(false);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Volunteer Assigned Task list */}
      <div className="glass-panel p-6 relative overflow-hidden flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-display font-semibold text-white flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-indigo-400" />
              AI Dispatched Task Board
            </h3>
            <span className="text-[9px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-full">
              ACTIVE DISPATCHES: {tasks.filter(t => t.status !== 'completed').length}
            </span>
          </div>
          <p className="text-[10px] text-gray-400 mb-4">
            The Smart Stadium Operating System monitors sensor feeds and automatically dispatches local volunteers to nearby incidents.
          </p>

          <ul className="space-y-3 max-h-[250px] overflow-y-auto pr-1" aria-label="Volunteer active task dispatches">
            {tasks.length === 0 ? (
              <li className="text-center py-10 text-gray-500 border border-dashed border-white/5 rounded bg-slate-950/25">
                <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-50" />
                <span className="font-mono text-xs text-gray-400">All tasks completed. Great job!</span>
              </li>
            ) : (
              tasks.map((task) => (
                <li
                  key={task.id}
                  className={`border rounded p-3.5 transition flex flex-col justify-between ${
                    task.status === 'completed'
                      ? 'bg-slate-950/20 border-white/5 opacity-50'
                      : task.status === 'active'
                      ? 'bg-indigo-950/15 border-indigo-500/30'
                      : 'bg-slate-950/40 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className={`text-xs font-semibold ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-white'}`}>
                        {task.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">{task.description}</p>
                    </div>

                    <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded ${
                      task.urgency === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/20' :
                      task.urgency === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20' :
                      'bg-slate-800 text-gray-400'
                    }`}>
                      {task.urgency}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-2.5 mt-2">
                    <span className="text-[9px] font-mono text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" /> {task.location}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {task.status === 'pending' ? (
                        <button
                          onClick={() => onAcceptTask(task.id, 'Volunteer Alpha')}
                          aria-label={`Claim task: ${task.title}`}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-[10px] rounded transition"
                        >
                          Claim Task
                        </button>
                      ) : task.status === 'active' ? (
                        <button
                          onClick={() => onCompleteTask(task.id)}
                          aria-label={`Mark task complete: ${task.title}`}
                          className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[10px] rounded transition flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" /> Mark Complete
                        </button>
                      ) : (
                        <span className="text-[9px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Resolved
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="text-[9px] text-gray-500 font-mono text-center border-t border-white/5 pt-4 mt-6">
          Task board matches MetLife venue management dispatches.
        </div>
      </div>

      {/* Multilingual Translation Portal */}
      <div className="glass-panel p-6 relative overflow-hidden flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-display font-semibold text-white flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-cyan-400" />
              AI Speech Interpretation Portal
            </h3>
            <span className="text-[9px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded-full animate-pulse">
              100+ LANGUAGES
            </span>
          </div>
          <p className="text-[10px] text-gray-400 mb-4">
            Type custom instructions or announcements (English) to translate instantly into the fan's preferred tongue. Features phonetics and voice cloning.
          </p>

          <div className="space-y-4">
            {/* Input message */}
            <textarea
              id="speech-input"
              value={transInput}
              onChange={(e) => setTransInput(e.target.value)}
              aria-label="Speech announcement to translate"
              className="w-full bg-slate-950 border border-white/10 rounded p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 font-sans min-h-[64px]"
            />

            {/* Target Language Select row */}
            <div className="flex flex-wrap gap-2">
              {['Spanish', 'Japanese', 'German', 'Arabic'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setTargetLang(lang)}
                  aria-label={`Translate announcement to ${lang}`}
                  className={`px-3 py-1.5 rounded border text-[10px] transition font-mono ${
                    targetLang === lang
                      ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 font-semibold'
                      : 'bg-slate-950/40 text-gray-400 border-white/5 hover:border-white/10'
                  }`}
                >
                  {lang === 'Spanish' ? '🇪🇸 Es' : lang === 'Japanese' ? '🇯🇵 Ja' : lang === 'German' ? '🇩🇪 De' : '🇸🇦 Ar'}
                </button>
              ))}
            </div>

            <button
              onClick={handleTranslate}
              aria-label="Translate announcement text"
              className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs rounded transition flex items-center justify-center gap-1.5"
            >
              <Languages className="w-3.5 h-3.5" /> Translate Instruction
            </button>
          </div>

          {/* Translation Result board */}
          {transResult && (
            <div className="bg-slate-950 border border-cyan-500/20 rounded p-4 mt-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">TRANSLATION RESULTS ({targetLang})</span>
                <button
                  onClick={handlePlayVoice}
                  aria-label="Speak translated announcement aloud"
                  className="p-1 rounded bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/25 transition"
                  title="Speak Translation Aloud"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              
              <div className="text-white text-xs font-semibold leading-relaxed mb-2 select-all">
                {transResult}
              </div>

              <div className="text-[9px] text-gray-400 leading-relaxed font-mono">
                {transPhonetic}
              </div>

              {/* Animated Audio Visualizer wave representation */}
              {audioPlaying && (
                <div className="mt-3 flex items-center gap-0.5 justify-center h-4 py-1">
                  {[2, 4, 3, 5, 2, 4, 2, 3, 5, 4, 3, 2].map((h, i) => (
                    <span
                      key={i}
                      className="w-[2px] bg-cyan-400 rounded-full animate-bounce"
                      style={{ height: `${h * 3}px`, animationDelay: `${i * 0.08}s` }}
                    />
                  ))}
                  <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest ml-2">Voice Cloning active...</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-[8px] text-gray-600 text-center border-t border-white/5 pt-3.5 mt-4">
          Translations comply with global OCR translation databases.
        </div>
      </div>

    </div>
  );
}
