import React from 'react';
import { Shield, ArrowUp, Heart, Film, ExternalLink, AlertTriangle } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function Footer({ scrollToSection }) {
  const scrollToTop = () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07080c] border-t border-red-950/60 pt-16 pb-12 text-gray-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Bureau info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="./images/erpb-seal.svg" 
                alt="ERPB Seal" 
                className="w-10 h-10 object-contain" 
              />
              <div>
                <span className="text-white font-extrabold text-base tracking-wider block font-sans uppercase">
                  ИСТИННОЕ ОБРАЗОВАНИЕ
                </span>
                <span className="text-red-400 text-[11px] font-mono tracking-widest uppercase">
                  Бюро по защите прав учителей • ERPB
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-md">
              Некоммерческий интерактивный фан-сайт, посвященный оригинальному вебтуну «참교육» 
              (Chae Yong-taek & Han Ga-ram / YLAB) и южнокорейской дораме «Teach You a Lesson» (Netflix).
            </p>

            <div className="p-3 rounded-xl bg-red-950/30 border border-red-900/40 text-[11px] text-red-300 font-sans">
              <strong>Мандат безопасности: </strong> 
              Любые проявления насилия и буллинга в школах недопустимы. В случае реальной опасности звоните на горячую линию поддержки.
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-3">
              Разделы сайта:
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  О Дораме и Вебтуне
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('dossiers')} 
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  Досье инспекторов ERPB
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('episodes')} 
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  Гид по 10 эпизодам
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('cases')} 
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  Архив закрытых дел
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('quiz')} 
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  Аттестационный тест
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('community')} 
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  Теории и отзывы сообщества
                </button>
              </li>
            </ul>
          </div>

          {/* External Links & Credits */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-3">
              Первоисточники:
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://comic.naver.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Naver Webtoon (Оригинал)</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a 
                  href="http://ylabplex.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5"
                >
                  <span>YLAB Super String Universe</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.netflix.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5"
                >
                  <span>Netflix Series Page</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer border border-white/10"
              >
                <ArrowUp className="w-3.5 h-3.5 text-red-400" />
                <span>Наверх страницы</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <div>
            © 2026 ERPB Fan Portal • Создано для фанатов дорамы «Истинное образование»
          </div>
          <div className="flex items-center gap-1">
            <span>Готов к деплою (Vercel / Netlify / GitHub Pages / Docker)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
