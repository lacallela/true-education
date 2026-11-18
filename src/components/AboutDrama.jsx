import React, { useState } from 'react';
import { Shield, BookOpen, Film, Check, AlertCircle, Sparkles, Scale, Swords, Target, Eye } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function AboutDrama() {
  const [activeTab, setActiveTab] = useState('drama');

  const pillars = [
    {
      icon: Swords,
      title: "Кулак против кулака",
      desc: "Хулиганы не уважают увещевания и психологические беседы. Они уважают только силу, превосходящую их собственную."
    },
    {
      icon: Scale,
      title: "Нулевой иммунитет",
      desc: "Богатство родителей, депутатские мандаты и связи в прокуратуре теряют всякую силу при встрече со спецмандатом Бюро."
    },
    {
      icon: Target,
      title: "Неприкосновенность учителя",
      desc: "Учитель — фундамент нации. Любой, кто поднимает руку или угрожает педагогу, подлежит жесткой нейтрализации."
    },
    {
      icon: Eye,
      title: "Неотвратимость кары",
      desc: "Спрятаться за спинами адвокатов не выйдет. Урок На Хваджина усваивается с первого раза и навсегда."
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#090a0f] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-900/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-500 font-mono font-bold tracking-widest text-xs uppercase px-3 py-1 bg-red-950/40 rounded-full border border-red-800/40">
            ВСЕЛЕННАЯ ПРОЕКТА
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-3 mb-4">
            ПРАВОСУДИЕ С ТРОСТЬЮ В РУКАХ
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            От культового вебтуна платформы Naver до флагманской экшен-дорамы Netflix — история о том, 
            как одно правительственное агентство объявило войну школьному террору.
          </p>
        </div>

        {/* Feature Grid with HQ Picture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#12141c] p-6 sm:p-8 rounded-2xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-600 to-amber-600" />
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6 text-red-500" />
                Что такое ERPB (Бюро по защите прав учителей)?
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                В результате череды трагических инцидентов и потери педагогами всякого контроля над учебным процессом, 
                Парламент Республики Корея принял экстренный закон. 
                Было создано <strong className="text-white">Бюро по защите прав учителей (교권보호국 / ERPB)</strong> 
                при Министерстве образования.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Инспекторы Бюро наделены беспрецедентными полномочиями: прямым правом силового задержания, 
                конфискации улик без санкции суда на месте преступления, а также отстранения руководства школ, 
                покрывающего буллеров и коррупцию.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="bg-[#10121a] p-5 rounded-xl border border-white/5 hover:border-red-900/40 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-800/40 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4 text-red-400" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5">{pillar.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* HQ Image Showcase: ERPB Headquarters */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-red-900/40 shadow-2xl shadow-red-950/50">
              <img 
                src="./images/erpb-hq.jpg" 
                alt="Штаб-квартира ERPB в Сеуле" 
                className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              
              {/* Badge overlay */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-red-600/40 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-[11px] font-mono font-bold text-red-300 uppercase tracking-wider">
                  СЕУЛ • ОПЕРАТИВНЫЙ ШТАБ ERPB
                </span>
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0e1017]/85 backdrop-blur-md border border-white/10">
                <p className="text-xs font-mono text-amber-400 font-bold uppercase mb-1">
                  Сектор 04 • Центральный Сеул
                </p>
                <p className="text-xs text-gray-300 leading-snug">
                  Оперативный центр координации выездных инспекций. Отсюда аналитический отдел Пона отслеживает камеры наблюдения 
                  и сигналы тревоги со всех 450 школ столичного округа.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison: Webtoon vs Drama */}
        <div className="bg-[#12141c] rounded-2xl p-6 sm:p-10 border border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                МАНХВА vs ДОРАМА: В ЧЕМ РАЗНИЦА?
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Как адаптация Netflix обогатила оригинальную вселенную Чхве Ён Тэка и Хан Га Рама
              </p>
            </div>

            {/* Switcher Buttons */}
            <div className="flex bg-[#0b0c12] p-1 rounded-xl border border-white/10 self-start sm:self-center">
              <button
                onClick={() => {
                  playSound('click');
                  setActiveTab('drama');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'drama' 
                    ? 'bg-red-600 text-white shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Дорама (Netflix)</span>
              </button>
              <button
                onClick={() => {
                  playSound('click');
                  setActiveTab('webtoon');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'webtoon' 
                    ? 'bg-red-600 text-white shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Вебтун (Naver / YLAB)</span>
              </button>
            </div>
          </div>

          {/* Tab content */}
          {activeTab === 'drama' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="bg-[#181a24] p-5 rounded-xl border border-red-900/30">
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4 text-red-400" />
                    Звездный актерский ансамбль
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Ким Му Ёль («Сетка», «Ювенальный суд») воплотил На Хваджина с невероятной харизмой и точностью движений. 
                    Джин Ки Джу привнесла в образ Им Ханрим настоящую боевую мощь, а ветеран Ли Сон Мин придал фигуре Министра монументальный авторитет.
                  </p>
                </div>

                <div className="bg-[#181a24] p-5 rounded-xl border border-red-900/30">
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4 text-red-400" />
                    Новый ключевой персонаж — Пон Гын Дэ
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Специально для дорамы был введен персонаж аналитика Пона (Пё Джи Хун). Это позволило раскрыть кибер-составляющую преступлений: 
                    даркнет-стримы, хакерские атаки и криптовалютные тотализаторы.
                  </p>
                </div>

                <div className="bg-[#181a24] p-5 rounded-xl border border-red-900/30">
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4 text-red-400" />
                    Глубокий акцент на социальной драме
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Сценаристы Ли Нам Гю и Ким Да Хи сгладили спорные моменты первоисточника, сделав упор на реальные системные проблемы 
                    корейского образования, защите учителей от родительского террора и психологической поддержке пострадавших детей.
                  </p>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-xl">
                <img 
                  src="./images/tactical-action.jpg" 
                  alt="Дорама Netflix: На Хваджин и Им Ханрим" 
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-mono text-red-400 font-bold uppercase">Netflix Original</span>
                  <p className="text-sm font-bold text-white">Кадр из 6-го эпизода «Кровавая лестница»</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="bg-[#181a24] p-5 rounded-xl border border-amber-900/30">
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Вселенная Super String (YLAB)
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Оригинальный вебтун «참교육» входит в единую грандиозную мультивселенную корейских супергероев Super String 
                    (наряду с «Террористом», «Островом» и «Возрождением»). Действия На Хваджина влияют на смежные серии комиксов.
                  </p>
                </div>

                <div className="bg-[#181a24] p-5 rounded-xl border border-amber-900/30">
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Безумная динамика и фирменный рисунок Хан Га Рама
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Фирменный визуальный почерк художника Хан Га Рама — агрессивный ракурс «рыбий глаз», 
                    детализированная анатомия ударов и фирменная саркастичная ухмылка Хваджина перед сокрушительным ударом.
                  </p>
                </div>

                <div className="bg-[#181a24] p-5 rounded-xl border border-amber-900/30">
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Более 150 глав бескомпромиссного экшена
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    В вебтуне представлены десятки уникальных школьных инцидентов, включая секты, нелегальные бойцовские клубы 
                    и противостояние иностранным криминальным синдикатам в приграничных городах.
                  </p>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-xl">
                <img 
                  src="./images/webtoon-art.jpg" 
                  alt="Оригинальный арт манхвы Истинное образование" 
                  className="w-full h-80 object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">Naver Webtoon Original</span>
                  <p className="text-sm font-bold text-white">Оригинальный арт На Хваджина (Художник: Хан Га Рам)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
