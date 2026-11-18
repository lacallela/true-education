import React, { useState } from 'react';
import { Shield, Play, FileText, ChevronRight, Award, Flame, Users, CheckCircle2, X } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function Hero({ scrollToSection }) {
  const [trailerOpen, setTrailerOpen] = useState(false);

  const handleTrailer = () => {
    playSound('baton');
    setTrailerOpen(true);
  };

  return (
    <div id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Poster Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="./images/hero-banner.jpg" 
          alt="Истинное образование - Главный постер" 
          className="w-full h-full object-cover object-center filter brightness-65 contrast-125 scale-105 transform hover:scale-100 transition-transform duration-1000"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090a0f] via-[#090a0f]/50 to-transparent" />
        <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col items-start text-left">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-600/30 text-red-300 border border-red-500/50 backdrop-blur-md">
            <Flame className="w-3.5 h-3.5 text-red-400" />
            Netflix Original Series • 2026
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            YLAB Super String Universe
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40 backdrop-blur-md">
            ⭐ IMDb 8.9 / Kinopoisk 8.8
          </span>
        </div>

        {/* Main Title with Korean Typography */}
        <div className="mb-4">
          <p className="text-red-500 font-mono font-bold tracking-[0.3em] uppercase text-sm sm:text-base mb-1">
            ПРЯМАЯ АДАПТАЦИЯ КУЛЬТОВОГО ВЕБТУНА
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-none drop-shadow-2xl">
            ИСТИННОЕ <br />
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              ОБРАЗОВАНИЕ
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 font-light italic mt-2">
            «Пусть послужит вам уроком» • <span className="font-semibold text-red-400 not-italic">참교육</span> (Teach You a Lesson)
          </p>
        </div>

        {/* Premise Description */}
        <p className="max-w-2xl text-base sm:text-lg text-gray-300 leading-relaxed mb-8 drop-shadow">
          Когда школьное насилие выходит из-под контроля, а закон парализует учителей — правительство Республики Корея 
          создает <strong>Бюро по защите прав учителей (ERPB)</strong>. В классы заходит главный инспектор 
          <strong> На Хваджин</strong> с деревянной тростью, и правила игры меняются навсегда.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-14">
          <button
            onClick={handleTrailer}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-red-900/40 border border-red-400/40 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Смотреть трейлер дорамы</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              scrollToSection('dossiers');
            }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm uppercase tracking-wider backdrop-blur-md border border-white/20 transition-all cursor-pointer"
          >
            <Users className="w-4 h-4 text-red-400" />
            <span>Досье инспекторов</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              scrollToSection('quiz');
            }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-200 font-semibold text-sm uppercase tracking-wider border border-red-700/50 backdrop-blur-md transition-all cursor-pointer"
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Тест инспектора</span>
            <ChevronRight className="w-4 h-4 text-red-400" />
          </button>
        </div>

        {/* Stats Strip */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 max-w-4xl">
          <div className="bg-[#12141c]/60 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">10 СЕРИЙ</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Полный 1-й сезон Netflix</div>
          </div>
          <div className="bg-[#12141c]/60 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-red-400 font-mono">№1 В МИРЕ</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Global Non-English TV</div>
          </div>
          <div className="bg-[#12141c]/60 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">100%</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Раскрываемость дел ERPB</div>
          </div>
          <div className="bg-[#12141c]/60 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">YLAB</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Оригинальная манхва</div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {trailerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#10121a] rounded-2xl border border-red-600/40 shadow-2xl overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-red-950 via-[#10121a] to-black border-b border-red-900/40">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <h3 className="text-base font-bold text-white font-mono tracking-wider uppercase">
                  ОФИЦИАЛЬНЫЙ ТИЗЕР-ТРЕЙЛЕР ДОРАМЫ • NETFLIX
                </h3>
              </div>
              <button
                onClick={() => setTrailerOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video preview / Simulated Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img 
                src="./images/tactical-action.jpg" 
                alt="Кадр из трейлера" 
                className="w-full h-full object-cover filter brightness-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
              
              <div className="absolute text-center px-6 max-w-xl">
                <div className="inline-block p-4 rounded-full bg-red-600/80 text-white shadow-2xl border border-red-400 mb-4 animate-bounce">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <h4 className="text-2xl font-black text-white uppercase tracking-tight">
                  «ТЕПЕРЬ УЧИТЬ ВАС БУДУ Я»
                </h4>
                <p className="text-sm text-gray-300 mt-2">
                  Режиссер Хон Джон-чхан (<em>«Ювенальный суд»</em>). В главных ролях: Ким Му Ёль, Джин Ки Джу, Ли Сон Мин, Пё Джи Хун.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <a
                    href="https://www.netflix.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Смотреть на Netflix
                  </a>
                  <button
                    onClick={() => setTrailerOpen(false)}
                    className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-all"
                  >
                    Закрыть плеер
                  </button>
                </div>
              </div>
            </div>

            {/* Synopsis Footer in modal */}
            <div className="p-5 bg-[#0b0c12] border-t border-white/5 text-xs text-gray-400 leading-relaxed">
              <span className="font-bold text-red-400">Справка: </span>
              Сериал адаптирует ключевые арки оригинального вебтуна Naver, фокусируясь на бескомпромиссном противостоянии
              школьным бандам, коррупции попечительских советов и восстановлении статуса педагогов. Все 10 эпизодов доступны в дубляже и с субтитрами.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
