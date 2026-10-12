'use client';

import React, { useState } from 'react';

interface Video {
  id: number;
  title: string;
  modalTitle: string;
  category: string;
  description: string;
  thumbnailColor: string;
  categoryBg: string;
  categoryColor: string;
  buttonBg: string;
  buttonColor: string;
  buttonHover: string;
  emoji: string;
}

const videos: Video[] = [
  {
    id: 1,
    title: 'Alimentos ricos en hierro y prevención de anemia infantil',
    modalTitle: 'Nutrición y Prevención de Anemia en Huánuco',
    category: 'Nutrición',
    description: 'Aprende sobre papillas fortificadas, productos locales de Huánuco y estrategias para prevenir la anemia en tu bebé.',
    thumbnailColor: '#059669',
    categoryBg: '#dcfce7',
    categoryColor: '#15803d',
    buttonBg: '#f0fdf4',
    buttonColor: '#15803d',
    buttonHover: '#dcfce7',
    emoji: '🥦',
  },
  {
    id: 2,
    title: 'Ejercicios sencillos de estimulación temprana de 0 a 12 meses',
    modalTitle: 'Estimulación Temprana en el Hogar',
    category: 'Desarrollo',
    description: 'Actividades para las áreas motora y sensorial usando elementos del hogar. Potencia el desarrollo de tu bebé cada día.',
    thumbnailColor: '#0284c7',
    categoryBg: '#e0f2fe',
    categoryColor: '#0369a1',
    buttonBg: '#f0f9ff',
    buttonColor: '#0369a1',
    buttonHover: '#e0f2fe',
    emoji: '🤸',
  },
  {
    id: 3,
    title: '¿Cuándo acudir de emergencia al Centro de Salud?',
    modalTitle: 'Señales de Alerta en el Primer Año',
    category: 'Salud Infantil',
    description: 'Identifica signos respiratorios de alarma, fiebre prolongada y deshidratación. Actúa a tiempo para proteger a tu hijo.',
    thumbnailColor: '#d97706',
    categoryBg: '#fef3c7',
    categoryColor: '#92400e',
    buttonBg: '#fffbeb',
    buttonColor: '#92400e',
    buttonHover: '#fef3c7',
    emoji: '🚨',
  },
];

export default function EducacionVideos() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800">Sección Educativa para Padres</h1>
            <p className="text-slate-500 text-sm mt-1">Guías audiovisuales elaboradas por profesionales de salud de Huánuco</p>
          </div>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border shrink-0"
            style={{ background: '#f0fdf4', color: '#15803d', borderColor: '#bbf7d0' }}>
            ▶ 5 Videos Disponibles
          </span>
        </div>
      </div>

      {/* Video Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(video => (
          <div key={video.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col group">
            {/* Thumbnail */}
            <div
              className="relative aspect-video flex items-center justify-center cursor-pointer overflow-hidden"
              style={{ background: video.thumbnailColor }}
              onClick={() => setActiveVideo(video)}
            >
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
                  <span className="text-2xl ml-1">▶</span>
                </div>
              </div>
              <span className="absolute bottom-3 left-3 text-4xl opacity-60">{video.emoji}</span>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 w-fit"
                style={{ background: video.categoryBg, color: video.categoryColor }}>
                {video.category}
              </span>
              <h3 className="text-base font-bold text-slate-800 mb-2 leading-snug">{video.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-2">{video.description}</p>
              <button
                onClick={() => setActiveVideo(video)}
                className="w-full py-2.5 rounded-xl text-xs font-bold transition-colors duration-200"
                style={{ background: video.buttonBg, color: video.buttonColor }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = video.buttonHover}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = video.buttonBg}
              >
                ▶ Ver Video Educativo
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Coming soon cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { title: 'Lactancia Materna Exclusiva', desc: 'Beneficios y técnicas para los primeros 6 meses', emoji: '🤱' },
          { title: 'Vacunación Infantil en Huánuco', desc: 'Calendario de vacunas y su importancia preventiva', emoji: '💉' },
        ].map((v, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-dashed border-slate-200 flex items-center gap-4 opacity-60">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-slate-100 shrink-0">{v.emoji}</div>
            <div>
              <div className="text-sm font-bold text-slate-600">{v.title}</div>
              <div className="text-xs text-slate-400">{v.desc}</div>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-500 font-semibold">Próximamente</span>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4" style={{ background: '#0f172a' }}>
              <h3 className="text-sm font-bold text-white pr-4">{activeVideo.modalTitle}</h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Simulated player */}
            <div className="aspect-video flex flex-col items-center justify-center gap-4" style={{ background: '#020617' }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center animate-pulse"
                style={{ background: 'rgba(5,150,105,0.3)' }}>
                <span className="text-3xl text-emerald-400 ml-1">▶</span>
              </div>
              <div className="text-center">
                <p className="text-slate-400 text-sm font-semibold">{activeVideo.category}</p>
                <p className="text-slate-500 text-xs mt-1">Reproductor educativo MiPequeCrece</p>
              </div>
            </div>

            {/* Modal footer */}
            <div className="p-5 border-t border-slate-100">
              <p className="text-sm font-bold text-slate-800 mb-1">{activeVideo.title}</p>
              <p className="text-xs text-slate-500">{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
