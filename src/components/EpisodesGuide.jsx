import React, { useState } from 'react';
import { episodes } from '../data/episodes';
import { Play, Star, Clock, Tag, ChevronDown, CheckCircle, Sparkles, X, ShieldAlert } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function EpisodesGuide() {
  const [filter, setFilter] = useState('all');
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const filters = [
    { id: 'all', label: 'Все серии (10)' },
    { id: 'bullying', label: 'Школьный буллинг' },
    { id: 'crime', label: 'Синдикаты & Клубы' },
    { id: 'corruption', label: 'Коррупция элит' },
    { id: 'lore', label: 'Лор & Прошлое' }
  ];

  const filtered = filter === 'all' 
    ? episodes 
    : episodes.filter(ep => ep.theme === filter);

  const handleOpenEpisode = (ep) => {
    playSound('access');
    setSelectedEpisode(ep);
  };

  return (
    <section id="episodes" className="py-24 bg-[#090a0f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-red-500 font-mono font-bold tracking-widest text-xs uppercase px-3 py-1 bg-red-950/40 rounded-full border border-red-800/40">
            NETFLIX 1 СЕЗОН • 10 ЭПИЗОДОВ
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-3 mb-4">
            ГИД ПО СЕРИЯМ И УРОКАМ
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Хроника самых громких рейдов Бюро по защите прав учителей: от школьных банд 
            до министерских синдикатов и нелегальных гладиаторских боев.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => {
                  playSound('click');
                  setFilter(f.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  filter === f.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/40 border border-red-500'
                    : 'bg-[#12141c] text-gray-400 hover:text-white border border-white/5 hover:border-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Episodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ep) => (
            <div
              key={ep.id}
              className="bg-[#12141c] rounded-2xl border border-white/5 hover:border-red-600/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-lg"
            >
              <div>
                {/* Thumbnail Header */}
                <div className="relative h-48 w-full overflow-hidden bg-black">
                  <img 
                    src={ep.image} 
                    alt={ep.titleRu} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-transparent to-black/60" />
                  
                  {/* Top Bar on image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-red-600/90 text-white font-mono text-[11px] font-bold uppercase tracking-wider">
                      {ep.tag}
                    </span>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-amber-400 font-mono text-xs font-bold">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{ep.rating}</span>
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  <button
                    onClick={() => handleOpenEpisode(ep)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </button>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 font-mono text-[11px] text-gray-300 bg-black/60 px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3 text-red-400" />
                    <span>{ep.duration}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5">
                  <div className="text-[11px] font-mono text-red-400 font-bold uppercase mb-1">
                    {ep.titleKr}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-red-400 transition-colors">
                    {ep.titleRu}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-3">
                    {ep.summary}
                  </p>
                </div>
              </div>

              {/* Lesson Footer */}
              <div className="p-5 pt-0">
                <div className="p-3 rounded-xl bg-[#171923] border-l-2 border-amber-500 text-xs text-amber-200/90 italic leading-snug mb-4">
                  {ep.lesson}
                </div>

                <button
                  onClick={() => handleOpenEpisode(ep)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-red-600/20 text-gray-300 hover:text-white border border-white/10 hover:border-red-500/40 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Материалы дела</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Episode Detail Modal */}
        {selectedEpisode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-[#12141c] rounded-2xl border border-red-600/40 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="relative h-60 w-full overflow-hidden">
                <img 
                  src={selectedEpisode.image} 
                  alt={selectedEpisode.titleRu} 
                  className="w-full h-full object-cover filter brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-black/40 to-transparent" />
                
                <button
                  onClick={() => setSelectedEpisode(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-bold uppercase">
                      {selectedEpisode.tag}
                    </span>
                    <span className="font-mono text-xs text-gray-300">
                      Хронометраж: {selectedEpisode.duration} • Оценка: ⭐ {selectedEpisode.rating}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    {selectedEpisode.titleRu}
                  </h3>
                  <div className="text-xs font-mono text-red-400 font-bold">
                    {selectedEpisode.titleKr} ({selectedEpisode.titleEn})
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase text-gray-400 font-bold tracking-wider mb-2">
                    ОПЕРАТИВНАЯ СВОДКА СЕРИИ:
                  </h4>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {selectedEpisode.summary}
                  </p>
                </div>

                {/* Lesson */}
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/40">
                  <span className="text-[11px] font-mono uppercase text-red-400 font-bold block mb-1">
                    Главный дисциплинарный урок инспектора На:
                  </span>
                  <p className="text-sm text-red-200 italic font-medium">
                    {selectedEpisode.lesson}
                  </p>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-xs font-mono uppercase text-gray-400 font-bold tracking-wider mb-3">
                    КЛЮЧЕВЫЕ МОМЕНТЫ ЭПИЗОДА:
                  </h4>
                  <ul className="space-y-2">
                    {selectedEpisode.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedEpisode(null)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Закрыть
                  </button>
                  <a
                    href="https://www.netflix.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Смотреть на Netflix
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
