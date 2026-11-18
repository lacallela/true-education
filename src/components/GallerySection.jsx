import React, { useState } from 'react';
import { Eye, Download, X, Maximize2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { playSound } from '../utils/audio';

export default function GallerySection() {
  const [activeMedia, setActiveMedia] = useState(null);

  const galleryItems = [
    {
      id: 1,
      src: './images/hero-banner.jpg',
      title: 'Официальный постер Netflix',
      tag: 'Постер 1 сезона',
      desc: 'На Хваджин в школьном коридоре перед началом урока'
    },
    {
      id: 2,
      src: './images/tactical-action.jpg',
      title: 'Ночной рейд инспекторов',
      tag: 'Кадр из дорамы',
      desc: 'На Хваджин и Им Ханрим на улицах Сеула'
    },
    {
      id: 3,
      src: './images/erpb-hq.jpg',
      title: 'Штаб-квартира ERPB',
      tag: 'Локация',
      desc: 'Центральное оперативное управление Бюро в Сеуле'
    },
    {
      id: 4,
      src: './images/na-hwajin.jpg',
      title: 'Инспектор На Хваджин',
      tag: 'Портрет',
      desc: 'Ким Му Ёль в роли непреклонного учителя'
    },
    {
      id: 5,
      src: './images/im-hanrim.jpg',
      title: 'Инспектор Им Ханрим',
      tag: 'Портрет',
      desc: 'Джин Ки Джу — мастер боевых искусств'
    },
    {
      id: 6,
      src: './images/bong-geundae.jpg',
      title: 'Аналитик Пон Гын Дэ',
      tag: 'Портрет',
      desc: 'Пё Джи Хун — мозг кибер-разведки Бюро'
    },
    {
      id: 7,
      src: './images/choi-gangseok.jpg',
      title: 'Министр Чхве Ган Сок',
      tag: 'Портрет',
      desc: 'Ли Сон Мин — создатель и покровитель агентства'
    },
    {
      id: 8,
      src: './images/webtoon-art.jpg',
      title: 'Оригинальный арт манхвы',
      tag: 'Вебтун Naver',
      desc: 'Иллюстрация Хан Га Рама из вселенной Super String'
    }
  ];

  const handleOpen = (item) => {
    playSound('click');
    setActiveMedia(item);
  };

  return (
    <section id="gallery" className="py-24 bg-[#090a0f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-red-500 font-mono font-bold tracking-widest text-xs uppercase px-3 py-1 bg-red-950/40 rounded-full border border-red-800/40">
            ФОТО И МЕДИАМАТЕРИАЛЫ
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-3 mb-4">
            ГАЛЕРЕЯ ДОРАМЫ И ВЕБТУНА
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Эксклюзивные промо-постеры, официальные кадры со съемочной площадки 
            и оригинальные графические материалы манхвы в высоком разрешении.
          </p>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpen(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#12141c] border border-white/5 hover:border-red-600/50 transition-all duration-300 cursor-pointer shadow-lg"
            >
              <div className="aspect-[4/3] sm:aspect-square w-full overflow-hidden">
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 filter contrast-105" 
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase bg-red-600/90 text-white px-2 py-0.5 rounded font-bold">
                    {item.tag}
                  </span>
                  <div className="p-1.5 rounded-full bg-black/60 text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">{item.title}</h4>
                  <p className="text-xs text-gray-300 line-clamp-1">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
            <div className="relative max-w-5xl w-full bg-[#12141c] rounded-2xl border border-red-600/40 shadow-2xl overflow-hidden">
              {/* Top Bar */}
              <div className="flex items-center justify-between p-4 bg-black/60 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-red-400 font-bold uppercase">
                    [{activeMedia.tag}]
                  </span>
                  <h3 className="text-sm font-bold text-white">{activeMedia.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={activeMedia.src}
                    download
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    title="Скачать изображение"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setActiveMedia(null)}
                    className="p-2 text-gray-300 hover:text-white hover:bg-red-600/40 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Picture View */}
              <div className="max-h-[75vh] flex items-center justify-center bg-black/80 p-2 overflow-hidden">
                <img 
                  src={activeMedia.src} 
                  alt={activeMedia.title} 
                  className="max-h-[70vh] w-auto object-contain rounded-lg"
                />
              </div>

              {/* Bottom Caption */}
              <div className="p-4 bg-[#0a0b10] border-t border-white/5 text-xs text-gray-300 flex justify-between items-center">
                <span>{activeMedia.desc}</span>
                <span className="font-mono text-red-400">ERPB MEDIA ARCHIVE</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
