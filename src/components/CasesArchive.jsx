import React, { useState } from 'react';
import { cases } from '../data/cases';
import { Folder, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Stamp, Terminal, ChevronRight, Lock } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function CasesArchive() {
  const [selectedCaseId, setSelectedCaseId] = useState(cases[0].id);
  const [stampedCases, setStampedCases] = useState({});

  const activeCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  const handleSelectCase = (id) => {
    playSound('click');
    setSelectedCaseId(id);
  };

  const handleApplyStamp = (id) => {
    playSound('stamp');
    setStampedCases(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <section id="cases" className="py-24 bg-[#0c0d14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-red-950 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-4 h-4 text-red-500" />
              <span className="font-mono text-xs text-red-400 uppercase tracking-widest font-bold">
                ТЕРМИНАЛ РАССЛЕДОВАНИЙ • БАЗА ERPB
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              АРХИВ ДЕЛ И ВЕЩДОКОВ
            </h2>
          </div>
          <p className="text-xs font-mono text-gray-400 mt-2 md:mt-0">
            [ЗАКРЫТО ДЛЯ ПУБЛИЧНОГО ДОСТУПА • ОПЕРАТИВНАЯ СВОДКА]
          </p>
        </div>

        {/* Workstation layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Folders List */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-mono uppercase text-gray-400 font-bold tracking-wider mb-2">
              ПАПКИ СЛЕДСТВЕННЫХ ДЕЛ:
            </h3>
            {cases.map((item) => {
              const isSelected = item.id === selectedCaseId;
              const isStamped = stampedCases[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectCase(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-[#181a26] border-red-500/80 shadow-lg shadow-red-950/40'
                      : 'bg-[#12141c] border-white/5 hover:border-white/20 hover:bg-[#151722]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono text-red-400 font-bold uppercase">
                      {item.number}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      isStamped || item.status.includes('ЗАКРЫТО') 
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40' 
                        : 'bg-amber-950/80 text-amber-400 border border-amber-800/40'
                    }`}>
                      {isStamped ? 'ЗАКРЫТО' : item.status.split(' ')[0]}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-1 font-mono">
                    {item.school}
                  </p>

                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Case File View */}
          <div className="lg:col-span-8 bg-[#12141c] rounded-2xl border border-red-900/40 p-6 sm:p-8 relative shadow-2xl">
            {/* Folder Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-red-400 font-bold">
                    {activeCase.number}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-xs font-mono text-gray-400">
                    Дата открытия: {activeCase.date}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  {activeCase.title}
                </h3>
                <p className="text-xs text-amber-300 font-mono mt-1">
                  Объект расследования: {activeCase.school}
                </p>
              </div>

              {/* Status Stamp */}
              <div className="stamp-effect px-4 py-2 font-mono text-xs font-black uppercase text-center">
                {stampedCases[activeCase.id] || activeCase.status.includes('ЗАКРЫТО') 
                  ? 'ДЕЛО ЗАКРЫТО • ERPB' 
                  : 'В РАЗРАБОТКЕ'}
              </div>
            </div>

            {/* Inspectors Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#181a24] p-3.5 rounded-xl border border-white/5">
                <span className="text-[10px] font-mono uppercase text-gray-400 block mb-0.5">
                  Ведущий инспектор рейда:
                </span>
                <span className="text-sm font-bold text-white font-mono">
                  {activeCase.leadInspector}
                </span>
              </div>
              <div className="bg-[#181a24] p-3.5 rounded-xl border border-white/5">
                <span className="text-[10px] font-mono uppercase text-gray-400 block mb-0.5">
                  Оперативная поддержка:
                </span>
                <span className="text-sm font-bold text-white font-mono">
                  {activeCase.assistingInspector}
                </span>
              </div>
            </div>

            {/* Charges */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase text-gray-400 font-bold tracking-wider mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                ВЫЯВЛЕННЫЕ ПРАВОНАРУШЕНИЯ:
              </h4>
              <ul className="space-y-1.5 bg-[#0f1118] p-4 rounded-xl border border-white/5">
                {activeCase.charges.map((charge, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                    <span className="text-red-500 font-mono font-bold">[{idx + 1}]</span>
                    <span>{charge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Evidence items */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase text-gray-400 font-bold tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                ИЗЪЯТЫЕ ВЕЩЕСТВЕННЫЕ ДОКАЗАТЕЛЬСТВА:
              </h4>
              <div className="space-y-3">
                {activeCase.evidence.map((ev, idx) => (
                  <div key={idx} className="bg-[#181a24] p-4 rounded-xl border border-white/5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">
                        {ev.name}
                      </span>
                      <span className="text-[10px] font-mono bg-red-950/60 text-red-400 px-2 py-0.5 rounded border border-red-900/40 uppercase">
                        {ev.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {ev.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verdict */}
            <div className="bg-red-950/30 border border-red-800/40 p-5 rounded-xl mb-6">
              <h4 className="text-xs font-mono uppercase text-red-400 font-bold tracking-wider mb-1">
                ИТОГОВЫЙ ВЕРДИКТ И ПРИНЯТЫЕ МЕРЫ:
              </h4>
              <p className="text-xs sm:text-sm text-red-200 leading-relaxed font-medium">
                {activeCase.verdict}
              </p>
            </div>

            {/* Inspector Quote / Notes */}
            <div className="p-4 rounded-xl bg-[#0e1017] border-l-2 border-amber-500 italic text-xs text-amber-300 mb-6">
              {activeCase.inspectorNotes}
            </div>

            {/* Stamp action button */}
            <div className="flex justify-end">
              <button
                onClick={() => handleApplyStamp(activeCase.id)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-950/50 border border-red-400/30 transition-all cursor-pointer active:scale-95"
              >
                <Stamp className="w-4 h-4" />
                <span>Поставить гербовую печать Бюро</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
