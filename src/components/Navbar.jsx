import React, { useState } from 'react';
import { Shield, Menu, X, Volume2, AlertTriangle, FileText, Users, Tv, Award, Compass, MessageSquare } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function Navbar({ activeSection, scrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'about', label: 'О Дораме', icon: Tv },
    { id: 'dossiers', label: 'Досье Бюро', icon: Users },
    { id: 'episodes', label: 'Гид по Сериям', icon: FileText },
    { id: 'cases', label: 'Архив Дел', icon: Shield },
    { id: 'quiz', label: 'Тест Инспектора', icon: Award },
    { id: 'gallery', label: 'Медиа', icon: Compass },
    { id: 'community', label: 'Фан-зона', icon: MessageSquare }
  ];

  const handleNavClick = (id) => {
    playSound('click');
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#090a0f]/95 backdrop-blur-md border-b border-red-900/30">
      {/* Top emergency bulletin bar */}
      <div className="bg-gradient-to-r from-red-950 via-red-900 to-black text-xs text-red-200 px-4 py-1.5 border-b border-red-700/40 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="font-mono font-bold tracking-wider text-red-400 uppercase">ERPB СТАТУС:</span>
          <span className="text-gray-300 truncate">
            Чрезвычайный мандат активирован • Все спецотряды в режиме полной боевой готовности
          </span>
        </div>
        <div className="hidden md:flex items-center gap-3 font-mono text-[11px] text-gray-400">
          <span>ГОРЯЧАЯ ЛИНИЯ: 117</span>
          <span className="text-red-500">|</span>
          <span className="text-amber-400">СЕУЛ, РЕСПУБЛИКА КОРЕЯ</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 relative flex items-center justify-center rounded-lg bg-gradient-to-br from-red-900/80 to-black border border-red-600/50 group-hover:border-red-500 shadow-lg shadow-red-950/50 transition-all">
            <img 
              src="./images/erpb-seal.svg" 
              alt="ERPB Seal" 
              className="w-9 h-9 object-contain drop-shadow" 
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wider text-white group-hover:text-red-400 transition-colors uppercase font-mono">
                ИСТИННОЕ ОБРАЗОВАНИЕ
              </span>
              <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded tracking-tighter">
                참교육
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-mono tracking-widest uppercase">
              Бюро по защите прав учителей • ERPB
            </p>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-red-600/20 text-red-400 border border-red-500/40 shadow-sm shadow-red-500/20' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-400' : 'text-gray-400'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => {
              playSound('baton');
            }}
            title="Проверить аудио-эффекты ERPB"
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg border border-transparent hover:border-red-900/40 transition-colors cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => handleNavClick('quiz')}
            className="bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg border border-red-400/30 shadow-lg shadow-red-600/20 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Аттестация</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-red-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0e15] border-b border-red-900/40 px-4 pt-2 pb-5 space-y-1 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-red-950/40 border border-transparent hover:border-red-800/40"
              >
                <Icon className="w-4 h-4 text-red-400" />
                <span>{link.label}</span>
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('quiz')}
              className="w-full py-2.5 bg-red-600 text-white font-bold text-center rounded-lg uppercase tracking-wider text-xs"
            >
              Пройти тест инспектора ERPB
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
