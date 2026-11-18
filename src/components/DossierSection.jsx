import React, { useState } from 'react';
import { characters } from '../data/characters';
import { Shield, Award, Crosshair, AlertOctagon, Terminal, Volume2, UserCheck, CheckCircle2 } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function DossierSection() {
  const [selectedId, setSelectedId] = useState(characters[0].id);
  const activeChar = characters.find(c => c.id === selectedId) || characters[0];

  const handleSelect = (id) => {
    playSound('access');
    setSelectedId(id);
  };

  const statLabels = {
    combat: { label: 'Боевая мощь / Рукопашный бой', color: 'from-red-600 to-rose-500' },
    tactics: { label: 'Тактическое планирование', color: 'from-amber-500 to-yellow-400' },
    intimidation: { label: 'Психологическое устрашение', color: 'from-purple-600 to-red-500' },
    psychology: { label: 'Анализ поведения подростков', color: 'from-blue-500 to-cyan-400' },
    authority: { label: 'Государственные полномочия', color: 'from-emerald-500 to-teal-400' }
  };

  return (
    <section id="dossiers" className="py-24 bg-[#0c0d14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-red-950 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
              <span className="font-mono text-xs text-red-400 uppercase tracking-widest font-bold">
                СЕКРЕТНЫЙ АРХИВ ERPB • УРОВЕНЬ ДОПУСКА 4
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              ЛИЧНЫЕ ДОСЬЕ ИНСПЕКТОРОВ
            </h2>
          </div>
          <p className="text-xs font-mono text-gray-400 mt-2 md:mt-0">
            [СТАТУС: АВТОРИЗОВАНО МИНИСТЕРСТВОМ ОБРАЗОВАНИЯ РК]
          </p>
        </div>

        {/* Character Tabs Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {characters.map((char) => {
            const isSelected = char.id === selectedId;
            return (
              <button
                key={char.id}
                onClick={() => handleSelect(char.id)}
                className={`relative p-3 sm:p-4 rounded-xl border text-left transition-all cursor-pointer overflow-hidden ${
                  isSelected 
                    ? 'bg-gradient-to-r from-red-950/80 to-[#151722] border-red-500/80 shadow-lg shadow-red-900/30' 
                    : 'bg-[#12141c] border-white/5 hover:border-red-900/40 hover:bg-[#161824]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={char.photo} 
                    alt={char.nameRu} 
                    className={`w-12 h-12 rounded-lg object-cover border transition-all ${
                      isSelected ? 'border-red-500 scale-105' : 'border-white/10 opacity-70'
                    }`}
                  />
                  <div>
                    <h4 className={`text-sm font-bold uppercase transition-colors ${
                      isSelected ? 'text-white' : 'text-gray-300'
                    }`}>
                      {char.nameRu}
                    </h4>
                    <span className="text-[10px] font-mono text-red-400 font-semibold block">
                      {char.nameKr}
                    </span>
                    <span className="text-[10px] text-gray-400 line-clamp-1">
                      {char.dossier.callsign}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <div className="absolute top-0 right-0 w-8 h-8 bg-red-600 flex items-center justify-center transform translate-x-2 -translate-y-2 rotate-45">
                    <UserCheck className="w-3 h-3 text-white -rotate-45" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Character Dossier Display Card */}
        <div className="bg-[#12141c] rounded-2xl border border-red-900/40 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Photo & Badges Column */}
            <div className="lg:col-span-5 relative bg-[#090a0f] flex flex-col">
              <div className="relative h-[480px] lg:h-full w-full overflow-hidden">
                <img 
                  src={activeChar.photo} 
                  alt={activeChar.nameRu} 
                  className="w-full h-full object-cover object-top filter contrast-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-transparent to-transparent lg:hidden" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#12141c] hidden lg:block" />

                {/* Stamp overlay */}
                <div className="absolute top-6 left-6 stamp-effect px-4 py-1.5 font-mono text-xs font-black uppercase">
                  ERPB VERIFIED
                </div>

                {/* Actor badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                  <div className="text-[10px] font-mono uppercase text-red-400 tracking-wider">
                    В экранизации Netflix:
                  </div>
                  <div className="text-base font-bold text-white mt-0.5">
                    {activeChar.actor}
                  </div>
                  <div className="text-xs text-gray-400 font-mono mt-1">
                    Позывной: <span className="text-amber-400 font-bold">{activeChar.dossier.callsign}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Information Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-white/5 pb-4">
                  <div>
                    <span className="text-xs font-mono uppercase font-bold text-amber-400 tracking-widest">
                      {activeChar.status}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
                      {activeChar.nameRu} <span className="text-xl text-gray-500 font-light">({activeChar.nameEn})</span>
                    </h3>
                  </div>
                  <div className="px-3 py-1 bg-red-950/60 rounded-lg border border-red-800/40 font-mono text-xs text-red-300 font-bold">
                    {activeChar.nameKr}
                  </div>
                </div>

                {/* Quote Box */}
                <div className="bg-[#181a24] p-4 sm:p-5 rounded-xl border-l-4 border-red-600 mb-6 italic text-gray-200 text-sm sm:text-base leading-relaxed">
                  «{activeChar.quote}»
                </div>

                {/* Background & Weapon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#161822] p-4 rounded-xl border border-white/5">
                    <span className="text-[11px] font-mono uppercase text-gray-400 block mb-1">
                      Спецснаряжение / Оружие:
                    </span>
                    <p className="text-xs text-amber-200 font-medium">
                      {activeChar.weapon}
                    </p>
                  </div>
                  <div className="bg-[#161822] p-4 rounded-xl border border-white/5">
                    <span className="text-[11px] font-mono uppercase text-gray-400 block mb-1">
                      Уровень допуска:
                    </span>
                    <p className="text-xs text-red-300 font-medium font-mono">
                      {activeChar.dossier.clearance}
                    </p>
                  </div>
                </div>

                {/* Biography Text */}
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  {activeChar.background}
                </p>

                {/* Stats Bars */}
                <div className="space-y-3 mb-6 bg-[#0f1118] p-5 rounded-xl border border-white/5">
                  <h4 className="text-xs font-mono uppercase font-bold text-gray-400 tracking-wider mb-2 flex items-center gap-1.5">
                    <Crosshair className="w-3.5 h-3.5 text-red-500" />
                    Тактико-технические показатели инспектора:
                  </h4>
                  {Object.entries(activeChar.stats).map(([key, val]) => {
                    const info = statLabels[key] || { label: key, color: 'from-red-600 to-red-400' };
                    return (
                      <div key={key}>
                        <div className="flex justify-between text-xs font-mono mb-1">
                          <span className="text-gray-300">{info.label}</span>
                          <span className="text-white font-bold">{val} / 100</span>
                        </div>
                        <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-white/5">
                          <div 
                            className={`h-full bg-gradient-to-r ${info.color} rounded-full transition-all duration-700`}
                            style={{ width: `${val}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Webtoon difference note */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200">
                  <span className="font-bold text-amber-400 uppercase font-mono block mb-0.5">
                    В оригинальном вебтуне Naver:
                  </span>
                  {activeChar.webtoonDifference}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
