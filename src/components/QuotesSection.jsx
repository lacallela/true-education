import React, { useState } from 'react';
import { quotes } from '../data/quotes';
import { Quote, Sparkles, Copy, Check, ChevronRight, Shuffle } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function QuotesSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeQuote = quotes[currentIdx];

  const handleNext = () => {
    playSound('click');
    setCurrentIdx((prev) => (prev + 1) % quotes.length);
  };

  const handleRandom = () => {
    playSound('click');
    let nextIdx = Math.floor(Math.random() * quotes.length);
    if (nextIdx === currentIdx) {
      nextIdx = (nextIdx + 1) % quotes.length;
    }
    setCurrentIdx(nextIdx);
  };

  const handleCopy = () => {
    playSound('access');
    navigator.clipboard.writeText(`«${activeQuote.text}» — ${activeQuote.speaker} (Дорама "Истинное образование")`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-[#0c0d14] relative border-y border-red-950/40 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase text-red-400 font-bold tracking-widest px-3 py-1 bg-red-950/60 rounded-full border border-red-800/40">
            ДИСЦИПЛИНАРНЫЙ КОДЕКС
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-2">
            УРОКИ И ЦИТАТЫ НА ХВАДЖИНА
          </h2>
        </div>

        {/* Quote Interactive Display Box */}
        <div className="relative bg-gradient-to-br from-[#151722] to-[#0f1018] rounded-3xl p-8 sm:p-12 border border-red-900/40 shadow-2xl">
          <Quote className="w-16 h-16 text-red-600/20 absolute top-6 left-6 pointer-events-none" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold bg-amber-950/40 px-3 py-1 rounded-full border border-amber-800/40 mb-6">
              {activeQuote.category}
            </span>

            <blockquote className="text-xl sm:text-3xl font-extrabold text-white leading-relaxed mb-6 italic">
              «{activeQuote.text}»
            </blockquote>

            <div className="mb-8">
              <span className="text-base font-bold text-red-400 font-mono uppercase block">
                — {activeQuote.speaker}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {activeQuote.context}
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-red-900/40"
              >
                <span>Следующий урок</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleRandom}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <Shuffle className="w-4 h-4" />
                <span>Случайная цитата</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1d202e] hover:bg-[#25283a] text-gray-300 hover:text-white border border-white/10 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Скопировано!' : 'Скопировать'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
