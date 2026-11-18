import React, { useState, useEffect } from 'react';
import { initialTheories } from '../data/theories';
import { Star, MessageSquare, Send, ThumbsUp, Flame, Tag, Check, Sparkles, AlertCircle } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function CommunitySection() {
  const [theories, setTheories] = useState(() => {
    try {
      const saved = localStorage.getItem('erpb_fan_theories');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.debug('Error loading theories:', e);
    }
    return initialTheories;
  });

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('#ТеорииВторойСезон');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('erpb_fan_theories', JSON.stringify(theories));
    } catch (e) {
      console.debug('Error saving theories:', e);
    }
  }, [theories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    playSound('baton');

    const newTheory = {
      id: 'user-' + Date.now(),
      author: author.trim(),
      rating: Number(rating),
      tag: tag,
      date: 'Сегодня',
      content: content.trim()
    };

    setTheories([newTheory, ...theories]);
    setAuthor('');
    setContent('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const availableTags = [
    '#ТеорииВторойСезон',
    '#АдаптацияШедевр',
    '#НаХваджинТоп',
    '#ИмХанримЛучшая',
    '#МанхваVsДорама',
    '#SuperString'
  ];

  return (
    <section id="community" className="py-24 bg-[#0c0d14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-500 font-mono font-bold tracking-widest text-xs uppercase px-3 py-1 bg-red-950/40 rounded-full border border-red-800/40">
            ФАНАТСКОЕ СООБЩЕСТВО
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-3 mb-4">
            ОТЗЫВЫ И ТЕОРИИ 2 СЕЗОНА
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Делитесь впечатлениями от сериала, обсуждайте пасхалки к вселенной Super String 
            и стройте догадки о следующих спецоперациях инспекторов Бюро.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form to submit review/theory */}
          <div className="lg:col-span-5 bg-[#12141c] rounded-2xl border border-red-900/40 p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                Оставить отзыв / теорию
              </h3>
            </div>

            {submitted && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-800/50 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ваш отзыв успешно опубликован в ленте сообщества!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-gray-400 font-bold block mb-1">
                  Ваш никнейм / Имя:
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Например: Seoul_Watcher"
                  className="w-full bg-[#0a0b10] border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-gray-400 font-bold block mb-1">
                  Тематический тег:
                </label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full bg-[#0a0b10] border border-white/10 focus:border-red-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none cursor-pointer"
                >
                  {availableTags.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-gray-400 font-bold block mb-1">
                  Ваша оценка дораме:
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setRating(s)}
                      className="p-1 text-gray-500 hover:text-amber-400 cursor-pointer transition-colors"
                    >
                      <Star className={`w-6 h-6 ${s <= rating ? 'text-amber-400 fill-current' : ''}`} />
                    </button>
                  ))}
                  <span className="text-xs font-mono text-gray-400 ml-2">
                    {rating} из 5 звезд
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-gray-400 font-bold block mb-1">
                  Ваш отзыв или теория:
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Что вам больше всего понравилось в игре Ким Му Ёля? Какие арки вебтуна ждете во втором сезоне?"
                  className="w-full bg-[#0a0b10] border border-white/10 focus:border-red-500 rounded-xl p-3.5 text-sm text-white outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-950/40 border border-red-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Опубликовать отзыв</span>
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-mono uppercase text-gray-400 font-bold tracking-wider">
                ПОСЛЕДНИЕ СООБЩЕНИЯ ({theories.length}):
              </h3>
              <span className="text-xs font-mono text-red-400">
                СИНХРОНИЗАЦИЯ: ОНЛАЙН
              </span>
            </div>

            {theories.map((t) => (
              <div
                key={t.id}
                className="bg-[#12141c] rounded-2xl border border-white/5 p-5 sm:p-6 hover:border-red-900/40 transition-colors shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-800 to-black border border-red-500/40 flex items-center justify-center font-mono font-bold text-xs text-white uppercase">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-none">
                        {t.author}
                      </h4>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {t.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 ${
                          idx < t.rating ? 'text-amber-400 fill-current' : 'text-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded bg-red-950/60 text-red-400 border border-red-900/40 text-[10px] font-mono font-bold mb-3">
                  {t.tag}
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {t.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
