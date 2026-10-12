'use client';

import React from 'react';
import { useRecompensas } from './RecompensasContext';

const infoCards = [
  {
    emoji: '🛡️',
    title: 'Prevención de Anemia',
    description: 'El control CRED incluye dosaje de hemoglobina y suplementación oportuna con hierro para prevenir la anemia infantil, uno de los principales problemas de salud en Huánuco.',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    iconBg: '#059669',
  },
  {
    emoji: '📈',
    title: 'Vigilancia Antropométrica',
    description: 'Se controla el peso y la talla del niño según las curvas de la OMS para detectar y prevenir la desnutrición crónica infantil, que afecta el desarrollo físico y cognitivo.',
    bg: '#f0f9ff',
    border: '#bae6fd',
    iconBg: '#0284c7',
  },
  {
    emoji: '🧠',
    title: 'Estimulación Temprana',
    description: 'Se evalúa el desarrollo psicomotor y se orienta a los padres sobre crianza positiva, apego seguro y actividades de estimulación para potenciar el desarrollo integral del niño.',
    bg: '#fffbeb',
    border: '#fde68a',
    iconBg: '#d97706',
  },
];

const benefits = [
  { emoji: '🔍', text: 'Detectar oportunamente problemas nutricionales, retrasos psicomotores y enfermedades' },
  { emoji: '💉', text: 'Prevenir la anemia mediante dosaje de hemoglobina y suplementación con hierro' },
  { emoji: '⚖️', text: 'Vigilar peso y talla según curvas de la OMS para prevenir desnutrición crónica' },
  { emoji: '🤝', text: 'Orientar sobre estimulación temprana, crianza positiva y apego seguro' },
];

export default function ImportanciaCRED() {
  const { setActiveTab } = useRecompensas();

  return (
    <div className="space-y-6">
      {/* Main content card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5"
          style={{ background: '#e0f2fe', color: '#0369a1' }}>
          Fundamentación en Salud Pública
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 mb-4 leading-tight">
          ¿Por qué es vital el Control de Crecimiento y Desarrollo (CRED)?
        </h1>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-8">
          El <strong>Control de Crecimiento y Desarrollo (CRED)</strong> es la estrategia fundamental del Ministerio de Salud del Perú para garantizar la salud preventiva de los niños menores de 5 años en Huánuco. A través de visitas periódicas al centro de salud, los profesionales de salud pueden monitorear el desarrollo integral de cada niño y brindar orientación personalizada a las familias.
        </p>

        {/* Benefits list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {benefits?.map((b, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: '#f8fafc' }}>
              <span className="text-2xl shrink-0">{b?.emoji}</span>
              <p className="text-sm text-slate-700 leading-relaxed">{b?.text}</p>
            </div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {infoCards?.map((card, i) => (
            <div key={i} className="rounded-2xl p-6 border" style={{ background: card?.bg, borderColor: card?.border }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl mb-4"
                style={{ background: card?.iconBg }}>
                {card?.emoji}
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-2">{card?.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{card?.description}</p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { value: '5 años', label: 'Edad máxima de cobertura CRED' },
            { value: '12+', label: 'Controles en el primer año de vida' },
            { value: '500 pts', label: 'Por cada control asistido' },
            { value: '100%', label: 'Gratuito en centros de salud' },
          ]?.map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-2xl" style={{ background: '#f0fdf4' }}>
              <div className="text-2xl font-black text-emerald-700 mb-1">{stat?.value}</div>
              <div className="text-xs text-slate-500 leading-tight">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Dark CTA */}
        <div className="rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: '#0f172a' }}>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">El Rol de &quot;MiPequeCrece&quot; en Huánuco</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-lg">
              MiPequeCrece busca reducir la inasistencia al centro de salud y premiar el compromiso de los padres huanuqueños, convirtiendo cada control CRED en una oportunidad para ganar recompensas valiosas para el desarrollo de sus hijos.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('tienda')}
            className="px-5 py-3 rounded-xl font-bold text-white text-sm whitespace-nowrap hover:opacity-90 transition-opacity shadow-lg shrink-0"
            style={{ background: '#059669' }}
          >
            🛍️ Ver Recompensas
          </button>
        </div>
      </div>
    </div>
  );
}
