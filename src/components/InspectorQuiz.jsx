import React, { useState } from 'react';
import { quizQuestions, quizResults } from '../data/quiz';
import { Shield, Award, RotateCcw, Copy, Check, Sparkles, User, CheckCircle2, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';

export default function InspectorQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [agentName, setAgentName] = useState('Агент ERPB');
  const [copied, setCopied] = useState(false);

  const handleSelectOption = (type) => {
    playSound('click');
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentStep + 1 < quizQuestions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate outcome
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    playSound('baton');
    // count frequencies
    const counts = { hwajin: 0, hanrim: 0, geundae: 0, gangseok: 0 };
    finalAnswers.forEach(ans => {
      counts[ans] = (counts[ans] || 0) + 1;
    });

    let topType = 'hwajin';
    let max = 0;
    Object.entries(counts).forEach(([t, cnt]) => {
      if (cnt > max) {
        max = cnt;
        topType = t;
      }
    });

    setResult(quizResults[topType]);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e50914', '#f59e0b', '#ffffff', '#b91c1c']
      });
    } catch (e) {
      console.debug('Confetti error:', e);
    }
  };

  const handleReset = () => {
    playSound('click');
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  const handleCopyBadge = () => {
    if (!result) return;
    playSound('access');
    const text = `🎖️ ОФИЦИАЛЬНОЕ УДОСТОВЕРЕНИЕ ИНСПЕКТОРА ERPB\n` +
      `Имя инспектора: ${agentName}\n` +
      `Квалификация: ${result.title}\n` +
      `Звание: ${result.rank}\n` +
      `Позывной: ${result.code}\n` +
      `Спецснаряжение: ${result.signatureItem}\n` +
      `Допуск: Утверждено Министерством Образования РК\n` +
      `Пройди тест фаната дорамы «Истинное образование»!`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const q = quizQuestions[currentStep];

  return (
    <section id="quiz" className="py-24 bg-[#090a0f] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-red-500 font-mono font-bold tracking-widest text-xs uppercase px-3 py-1 bg-red-950/40 rounded-full border border-red-800/40">
            АТТЕСТАЦИЯ КАДРОВ
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-3 mb-4">
            ТЕСТ: КАКОЙ ТЫ ИНСПЕКТОР БЮРО?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Определите свой метод восстановления порядка в школах и получите персональное 
            цифровое удостоверение сотрудника ERPB с допуском к спецоперациям.
          </p>
        </div>

        {!result ? (
          /* Active Question Card */
          <div className="bg-[#12141c] rounded-2xl border border-red-900/40 p-6 sm:p-10 shadow-2xl relative">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs font-mono text-gray-400 mb-2">
                <span className="text-red-400 font-bold uppercase">
                  КЕЙС {currentStep + 1} ИЗ {quizQuestions.length}
                </span>
                <span>Прогресс: {Math.round(((currentStep + 1) / quizQuestions.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {q.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.type)}
                  className="w-full p-4 sm:p-5 rounded-xl bg-[#171924] hover:bg-gradient-to-r hover:from-red-950/60 hover:to-[#1f2233] border border-white/5 hover:border-red-500/50 text-left transition-all flex items-start gap-4 group cursor-pointer"
                >
                  <span className="w-7 h-7 rounded-lg bg-black/60 border border-white/10 group-hover:border-red-500/60 font-mono text-xs font-bold text-gray-300 group-hover:text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-200 group-hover:text-white leading-relaxed">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result & Inspector ID Card */
          <div className="space-y-8 animate-fadeIn">
            {/* Name Input Bar */}
            <div className="bg-[#12141c] p-4 sm:p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-auto">
                <label className="text-xs font-mono uppercase text-gray-400 font-bold block mb-1">
                  Имя / Позывной инспектора на удостоверении:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-red-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="Введите ваше имя"
                    className="bg-black/60 border border-white/10 focus:border-red-500 rounded-xl px-10 py-2.5 text-sm text-white w-full sm:w-80 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCopyBadge}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-red-900/30"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Скопировано!' : 'Скопировать бейдж'}</span>
                </button>
                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  title="Пройти заново"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Digital Inspector Badge (Holographic Card) */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-red-500/80 shadow-2xl bg-gradient-to-br from-[#181a26] via-[#10121a] to-black p-6 sm:p-10">
              {/* Card Holographic Glow effect */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full filter blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />

              {/* Card Header with Logos */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-900/40 pb-6 mb-6">
                <div className="flex items-center gap-3">
                  <img 
                    src="./images/erpb-seal.svg" 
                    alt="ERPB Seal" 
                    className="w-14 h-14 object-contain drop-shadow" 
                  />
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-red-400 uppercase font-bold">
                      МИНИСТЕРСТВО ОБРАЗОВАНИЯ РЕСПУБЛИКИ КОРЕЯ
                    </div>
                    <div className="text-xl font-black text-white tracking-wider uppercase font-mono">
                      СЛУЖЕБНОЕ УДОСТОВЕРЕНИЕ ERPB
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      교권보호국 특별사법경찰관 신분증
                    </div>
                  </div>
                </div>

                <div className="stamp-effect px-4 py-1 text-xs font-mono font-black uppercase">
                  АТТЕСТОВАН
                </div>
              </div>

              {/* Card Core Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
                {/* ID Photo Box */}
                <div className="md:col-span-4 bg-[#090a0f] p-3 rounded-2xl border border-white/10 flex flex-col items-center text-center">
                  <div className="w-full h-48 rounded-xl overflow-hidden relative bg-black mb-3">
                    <img 
                      src="./images/na-hwajin.jpg" 
                      alt="Inspector Photo" 
                      className="w-full h-full object-cover object-top filter grayscale contrast-125" 
                    />
                    <div className="absolute inset-0 scanline-overlay opacity-50" />
                    <div className="absolute bottom-2 left-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-red-400 font-bold">
                      {result.code}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-400 uppercase">ФИО СОТРУДНИКА:</span>
                  <span className="text-base font-black text-white font-mono uppercase tracking-wider">
                    {agentName || 'ИНСПЕКТОР'}
                  </span>
                </div>

                {/* Details */}
                <div className="md:col-span-8 space-y-4">
                  <div>
                    <span className="text-xs font-mono uppercase text-red-400 font-bold block mb-1">
                      КВАЛИФИКАЦИОННЫЙ ПРОФИЛЬ:
                    </span>
                    <h4 className="text-2xl font-black text-white uppercase tracking-tight">
                      {result.title}
                    </h4>
                    <p className="text-xs text-amber-400 font-mono font-semibold mt-0.5">
                      {result.rank}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5">
                    {result.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="bg-[#12141c] p-3 rounded-lg border border-white/5">
                      <span className="text-gray-400 block text-[10px] uppercase">Сильные стороны:</span>
                      <span className="text-white font-bold">{result.strengths}</span>
                    </div>
                    <div className="bg-[#12141c] p-3 rounded-lg border border-white/5">
                      <span className="text-gray-400 block text-[10px] uppercase">Табельное оружие:</span>
                      <span className="text-amber-300 font-bold">{result.signatureItem}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Bar */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-gray-400">
                <span>СЕРИЙНЫЙ НОМЕР: ERPB-2026-{Math.floor(100000 + Math.random() * 900000)}</span>
                <span className="text-red-400">ПРАВО СИЛОВОГО ВМЕШАТЕЛЬСТВА: ПОДТВЕРЖДЕНО</span>
                <span>СЕУЛ, РЕСПУБЛИКА КОРЕЯ</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
