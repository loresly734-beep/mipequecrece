'use client';

import React, { useState } from 'react';
import { useRecompensas } from './RecompensasContext';

interface Reward {
  id: number;
  name: string;
  description: string;
  points: number;
  emoji: string;
  bg: string;
}

const rewards: Reward[] = [
  { id: 1, name: 'Paquete de toallitas húmedas hipoalergénicas', description: 'Suaves y seguras para la piel del bebé', points: 1000, emoji: '🧴', bg: '#dcfce7' },
  { id: 2, name: 'Termómetro digital clínico flexible', description: 'Medición precisa y segura para niños', points: 2000, emoji: '🌡️', bg: '#e0f2fe' },
  { id: 3, name: 'Jarabe vitamínico de hierro infantil', description: 'Prevención de anemia en la primera infancia', points: 3000, emoji: '💊', bg: '#d1fae5' },
  { id: 4, name: 'Paquete familiar de pañales etapa 3 o 4', description: 'Comodidad y protección para tu bebé', points: 4000, emoji: '📦', bg: '#fef3c7' },
  { id: 5, name: 'Ropa térmica infantil para clima de Huánuco', description: 'Abrigo ideal para el frío andino', points: 5000, emoji: '👕', bg: '#ede9fe' },
  { id: 6, name: 'Juguete didáctico de encaje Montessori', description: 'Estimula la coordinación y el aprendizaje', points: 6000, emoji: '🧩', bg: '#f3e8ff' },
  { id: 7, name: 'Vaso entrenador anti-derrames libre de BPA', description: 'Transición segura del biberón al vaso', points: 7000, emoji: '🥤', bg: '#ffe4e6' },
  { id: 8, name: 'Kit de aseo e higiene dental infantil', description: 'Cepillo, pasta y hilo dental para niños', points: 8000, emoji: '🦷', bg: '#ccfbf1' },
  { id: 9, name: 'Cuento infantil ilustrado de desarrollo temprano', description: 'Fomenta la lectura y el vínculo afectivo', points: 9000, emoji: '📖', bg: '#dbeafe' },
  { id: 10, name: 'Zapatitos ergonómicos para primeros pasos', description: 'Soporte ideal para el desarrollo del pie', points: 10000, emoji: '👟', bg: '#cffafe' },
  { id: 11, name: 'Lonchera térmica escolar saludable', description: 'Mantiene los alimentos frescos y seguros', points: 11000, emoji: '🍱', bg: '#d1fae5' },
  { id: 12, name: 'Botiquín de primeros auxilios familiar básico', description: 'Preparación ante emergencias en el hogar', points: 12000, emoji: '🩺', bg: '#fee2e2' },
  { id: 13, name: 'Set de platos y cubiertos de bambú ecológico', description: 'Vajilla segura, ecológica y colorida', points: 13000, emoji: '🍽️', bg: '#fef3c7' },
  { id: 14, name: 'Mochila ergonómica portabebé frontal', description: 'Carga cómoda y segura para el bebé', points: 14000, emoji: '🎒', bg: '#e0e7ff' },
  { id: 15, name: 'Nebulizador portátil ultrasónico para el hogar', description: 'Tratamiento respiratorio en casa', points: 15000, emoji: '💨', bg: '#e0f2fe' },
  { id: 16, name: 'Bicicleta de equilibrio sin pedales para niños', description: 'Desarrolla el equilibrio y la coordinación', points: 16000, emoji: '🚲', bg: '#ede9fe' },
  { id: 17, name: 'Kit completo de estimulación temprana sensorial', description: 'Texturas, colores y sonidos para el desarrollo', points: 17000, emoji: '🧠', bg: '#fdf4ff' },
  { id: 18, name: 'Coche de paseo ligero y plegable compacto', description: 'Movilidad cómoda para toda la familia', points: 18000, emoji: '🛒', bg: '#d1fae5' },
];

interface ModalState {
  show: boolean;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

export default function TiendaPremios() {
  const { user, isLoggedIn, redeemReward, setShowAuthModal, setAuthMode } = useRecompensas();
  const [modal, setModal] = useState<ModalState>({ show: false, type: 'success', title: '', message: '' });

  const handleRedeem = (reward: Reward) => {
    if (!isLoggedIn) {
      setAuthMode('login');
      setShowAuthModal(true);
      return;
    }
    const result = redeemReward(reward.name, reward.points);
    if (result.success) {
      setModal({
        show: true,
        type: 'success',
        title: '¡Premio Canjeado! 🎉',
        message: `Has canjeado "${reward.name}". Tu código de recojo es: ${result.code}. Preséntalo en tu centro de salud.`,
      });
    } else {
      setModal({ show: true, type: 'error', title: 'Puntos Insuficientes', message: result.message });
    }
  };

  const currentPoints = user?.points ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800">Tienda de Recompensas MiPequeCrece</h1>
            <p className="text-slate-500 text-sm mt-1">Canjea tus puntos CRED por artículos certificados de cuidado infantil en Huánuco</p>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border shrink-0" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
            <span className="text-xl">👛</span>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tus Puntos Actuales</div>
              <div className="text-xl font-black text-emerald-700">{currentPoints.toLocaleString()} pts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rewards.map(reward => {
          const canAfford = currentPoints >= reward.points;
          return (
            <div key={reward.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: reward.bg }}>
                  {reward.emoji}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  canAfford ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {reward.points.toLocaleString()} pts
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1 leading-snug">{reward.name}</h3>
              <p className="text-xs text-slate-500 mb-4 flex-1">{reward.description}</p>
              <button
                onClick={() => handleRedeem(reward)}
                disabled={isLoggedIn && !canAfford}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  !isLoggedIn
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : canAfford
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {!isLoggedIn ? 'Iniciar Sesión para Canjear' : canAfford ? '🎁 Canjear Premio' : `Puntos Insuficientes (faltan ${(reward.points - currentPoints).toLocaleString()})`}
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(6px)' }}>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl ${
              modal.type === 'success' ? 'bg-emerald-100' : 'bg-rose-100'
            }`}>
              {modal.type === 'success' ? '✅' : '⚠️'}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{modal.title}</h3>
            <p className="text-sm text-slate-600 mb-6">{modal.message}</p>
            <button
              onClick={() => setModal(m => ({ ...m, show: false }))}
              className="w-full py-3 rounded-xl font-semibold text-white"
              style={{ background: '#1e293b' }}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
